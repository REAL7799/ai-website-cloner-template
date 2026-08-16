#!/usr/bin/env node
/**
 * Gera as fotografias dos pratos e recorta-lhes o fundo.
 *
 *   GEMINI_API_KEY=... node scripts/dish-images/build.mjs
 *   GEMINI_API_KEY=... node scripts/dish-images/build.mjs --only sandes
 *   node scripts/dish-images/build.mjs --cutout-only
 *
 * A carta em src/content/menu.ts é a fonte única: cada item dá origem a um
 * ficheiro `<seccao>--<nome>.webp` em public/images/pratos, e a lista do que
 * existe é escrita em src/content/dish-images.ts.
 */
import { readdir, mkdir, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

import { menu } from "../../src/content/menu.ts";
import { promptFor } from "./prompts.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const RAW = join(ROOT, ".dish-images-raw");
const DEST = join(ROOT, "public", "images", "pratos");
const MANIFEST = join(ROOT, "src", "content", "dish-images.ts");
const MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash-image";
const SIZE = 900;
const CONCURRENCY = 5;

const args = process.argv.slice(2);
const only = args.includes("--only") ? args[args.indexOf("--only") + 1] : null;
const cutoutOnly = args.includes("--cutout-only");

const slugify = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[/+]/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const jobs = menu
  .filter((section) => !only || section.id === only)
  .flatMap((section) =>
    section.items.map((item) => ({
      slug: `${section.id}--${slugify(item.pt)}`,
      prompt: promptFor(section.id, item.pt, item.en),
    }))
  );

async function generate(job) {
  const out = join(RAW, `${job.slug}.png`);
  if (existsSync(out) && (await stat(out)).size > 10_000) return "cache";

  const body = JSON.stringify({
    contents: [{ parts: [{ text: job.prompt }] }],
  });

  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY ?? "",
        },
        body,
      }
    );

    if (!res.ok) {
      const detail = await res.text();
      // 429 por créditos esgotados não melhora com nova tentativa.
      if (detail.includes("credits are depleted")) {
        throw new Error(
          "Créditos da API Gemini esgotados — carregar em https://ai.studio/projects"
        );
      }
      if (attempt < 2) continue;
      return `erro ${res.status}`;
    }

    const payload = await res.json();
    for (const candidate of payload.candidates ?? []) {
      for (const part of candidate.content?.parts ?? []) {
        const inline = part.inlineData ?? part.inline_data;
        if (inline?.data) {
          await writeFile(out, Buffer.from(inline.data, "base64"));
          return "ok";
        }
      }
    }
    if (attempt === 2) return "sem imagem";
  }
  return "falhou";
}

/**
 * Torna transparente o fundo branco por flood fill a partir das bordas.
 * Não basta apagar os pixels claros: o arroz, a clara do ovo e a louça são
 * brancos e têm de ficar. Só o branco ligado à moldura é fundo.
 */
function keyOutBackground(data, width, height) {
  const total = width * height;
  const isBackground = new Uint8Array(total);
  const stack = [];

  const isPale = (i) => {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return min > 218 && max - min < 26;
  };

  for (let x = 0; x < width; x++) stack.push(x, (height - 1) * width + x);
  for (let y = 0; y < height; y++) stack.push(y * width, y * width + width - 1);

  while (stack.length) {
    const i = stack.pop();
    if (isBackground[i] || !isPale(i)) continue;
    isBackground[i] = 1;
    const x = i % width;
    const y = (i - x) / width;
    if (x > 0) stack.push(i - 1);
    if (x < width - 1) stack.push(i + 1);
    if (y > 0) stack.push(i - width);
    if (y < height - 1) stack.push(i + width);
  }

  // Meia-transparência num anel de um pixel, para não deixar serrilhado.
  for (let i = 0; i < total; i++) {
    if (!isBackground[i]) continue;
    const x = i % width;
    const y = (i - x) / width;
    let touchesSubject = false;
    for (let dy = -1; dy <= 1 && !touchesSubject; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        if (!isBackground[ny * width + nx]) {
          touchesSubject = true;
          break;
        }
      }
    }
    data[i * 4 + 3] = touchesSubject ? 90 : 0;
  }
  return data;
}

async function cutout(slug) {
  const source = join(RAW, `${slug}.png`);
  if (!existsSync(source)) return false;

  const { data, info } = await sharp(source)
    .resize(SIZE, SIZE, { fit: "inside" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const keyed = keyOutBackground(data, info.width, info.height);
  let image = sharp(keyed, {
    raw: { width: info.width, height: info.height, channels: 4 },
  });

  const trimmed = await image
    .trim({ threshold: 1 })
    .toBuffer()
    .catch(() => null);
  if (trimmed) image = sharp(trimmed);

  const meta = await image.metadata();
  // Recorte que come quase tudo significa fundo mal detetado: guarda o original.
  if (!meta.width || !meta.height || meta.width < 120 || meta.height < 120) {
    await sharp(source)
      .resize(SIZE, SIZE, { fit: "inside" })
      .webp({ quality: 80 })
      .toFile(join(DEST, `${slug}.webp`));
    return "sem recorte";
  }

  await image
    .resize(SIZE, SIZE, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .extend({
      top: 40,
      bottom: 40,
      left: 40,
      right: 40,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .webp({ quality: 80, alphaQuality: 90 })
    .toFile(join(DEST, `${slug}.webp`));
  return true;
}

async function pool(items, worker, size) {
  const queue = [...items];
  const runners = Array.from({ length: size }, async () => {
    while (queue.length) {
      const item = queue.shift();
      await worker(item);
    }
  });
  await Promise.all(runners);
}

await mkdir(RAW, { recursive: true });
await mkdir(DEST, { recursive: true });

if (!cutoutOnly) {
  if (!process.env.GEMINI_API_KEY) {
    console.error("Falta GEMINI_API_KEY no ambiente.");
    process.exit(1);
  }
  let done = 0;
  await pool(
    jobs,
    async (job) => {
      const result = await generate(job);
      done++;
      if (result !== "ok" && result !== "cache") {
        console.error(`${job.slug}: ${result}`);
      }
      if (done % 10 === 0) console.log(`geradas ${done}/${jobs.length}`);
    },
    CONCURRENCY
  );
}

const produced = [];
for (const job of jobs) {
  const result = await cutout(job.slug);
  if (result) produced.push(job.slug);
  if (result === "sem recorte") {
    console.warn(`${job.slug}: fundo não detetado, guardado sem recorte`);
  }
}

// O manifesto tem de listar tudo o que está na pasta, não só o desta corrida.
const all = (await readdir(DEST))
  .filter((file) => file.endsWith(".webp"))
  .map((file) => file.replace(/\.webp$/, ""))
  .sort();

await writeFile(
  MANIFEST,
  `// Ficheiro gerado por scripts/dish-images/build.mjs — não editar à mão.
export const dishImages = new Set<string>([
${all.map((slug) => `  "${slug}",`).join("\n")}
]);
`,
  "utf8"
);

console.log(`recortadas ${produced.length}, manifesto com ${all.length}`);
