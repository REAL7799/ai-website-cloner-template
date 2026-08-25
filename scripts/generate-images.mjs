#!/usr/bin/env node
/**
 * Gera as fotografias do site com IA (Gemini / "Nano Banana") e grava em
 * public/images/, substituindo as ilustrações de reserva pelos mesmos nomes.
 *
 * Uso:
 *   GEMINI_API_KEY=... npm run images:ai            # todas as imagens
 *   GEMINI_API_KEY=... npm run images:ai -- hero    # só uma (por nome)
 *   GEMINI_API_KEY=... npm run images:ai -- --pro   # modelo Pro (mais detalhe)
 *
 * A chave também pode estar num ficheiro gemini_api_key.txt na raiz do projeto.
 * Obtém-se em https://aistudio.google.com (requer faturação ativa).
 * Custo aproximado: ~US$0,04/imagem (default) · ~US$0,13–0,24 (Pro).
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "public", "images");
const API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const DEFAULT_MODEL = "gemini-2.5-flash-image";
const PRO_MODEL = "gemini-3-pro-image-preview";

const STYLE =
  "Realistic editorial food photography, soft diffused natural window light, " +
  "muted authentic colors, no oversaturation, no harsh highlights, shallow " +
  "depth of field, warm neutral tones, artisan Portuguese pastry shop setting.";

const IMAGES = [
  {
    name: "hero",
    aspectRatio: "16:9",
    prompt:
      "Artisan pastry shop counter with a cream layer cake on a ceramic stand in the center, a fresh fruit tart on a plate to the left, and three Portuguese pastéis de nata stacked on a small plate to the right, light oak wooden counter, cream wall background.",
  },
  {
    name: "bolo-chocolate",
    aspectRatio: "1:1",
    prompt:
      "Rustic dark chocolate layer cake with glossy ganache drips on a ceramic cake stand, chocolate curls and a few red berries on top, linen tablecloth.",
  },
  {
    name: "bolo-festa",
    aspectRatio: "1:1",
    prompt:
      "Elegant two-tier ivory celebration cake with piped cream rosettes and fresh berries with a green leaf on top, ceramic cake stand on a marble table.",
  },
  {
    name: "bolo-aniversario",
    aspectRatio: "1:1",
    prompt:
      "Festive single-tier birthday cake with soft ivory buttercream and a caramel base, five thin elegant candles, a few subtle confetti pieces on the table, wooden cake plate.",
  },
  {
    name: "tarte-frutos",
    aspectRatio: "1:1",
    prompt:
      "Fresh seasonal red fruit tart with strawberry halves, blueberries and kiwi arranged in concentric rings over pastry cream in a golden fluted shortcrust, on a white ceramic plate.",
  },
  {
    name: "tarte-amendoa",
    aspectRatio: "1:1",
    prompt:
      "Homemade Portuguese almond tart with toasted sliced almonds and a light caramel glaze, one slice cut and plated beside it, rustic wooden table.",
  },
  {
    name: "pastel-nata",
    aspectRatio: "1:1",
    prompt:
      "Three Portuguese pastéis de nata custard tarts with caramelized tops dusted with cinnamon on a rustic ceramic plate, flaky golden pastry visible.",
  },
  {
    name: "doces-finos",
    aspectRatio: "1:1",
    prompt:
      "Assorted artisan petit fours on a dark slate board: three macarons in muted rose, pistachio and cream tones, two cocoa-dusted chocolate truffles and one mini chocolate éclair, staggered diagonal arrangement.",
  },
  {
    name: "pasteleiro",
    aspectRatio: "4:5",
    prompt:
      "Portrait of a pastry chef in his 40s wearing a white chef jacket and caramel apron, piping cream onto a cake in a small artisan bakery kitchen, concentrated warm expression, documentary photography style.",
  },
  {
    name: "bancada",
    aspectRatio: "16:9",
    prompt:
      "Pastry workbench still life without people: wooden rolling pin, rolled-out dough disc, a half-assembled apple tart with spiraled slices, ceramic bowl and two glass jars in the background, light flour dust on the wooden bench.",
  },
  {
    name: "interior",
    aspectRatio: "16:9",
    prompt:
      "Cozy artisan pastry shop interior without people: glass display case with rows of cakes, tarts and pastéis de nata, wooden counter, two warm pendant lamps, dark menu board on the wall, hanging plant.",
  },
];

function findApiKey() {
  const env = (process.env.GEMINI_API_KEY ?? "").trim();
  if (env) return env;
  const keyFile = join(ROOT, "gemini_api_key.txt");
  if (existsSync(keyFile)) {
    const key = readFileSync(keyFile, "utf8").trim();
    if (key) return key;
  }
  return null;
}

async function generate(image, { apiKey, model }) {
  const body = {
    contents: [{ parts: [{ text: `${image.prompt} ${STYLE}` }] }],
    generationConfig: {
      responseModalities: ["IMAGE", "TEXT"],
      imageConfig: { aspectRatio: image.aspectRatio },
    },
  };
  const res = await fetch(`${API_BASE}/${model}:generateContent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const detail = await res.text();
    let message = detail;
    try {
      message = JSON.parse(detail)?.error?.message ?? detail;
    } catch {
      /* mantém o texto bruto */
    }
    throw new Error(`API ${res.status}: ${message}`);
  }
  const data = await res.json();
  for (const candidate of data.candidates ?? []) {
    for (const part of candidate.content?.parts ?? []) {
      const blob = part.inlineData ?? part.inline_data;
      if (blob?.data) return Buffer.from(blob.data, "base64");
    }
  }
  throw new Error("a resposta não trouxe imagem (prompt recusado?)");
}

const args = process.argv.slice(2);
const pro = args.includes("--pro");
const only = args.filter((a) => !a.startsWith("--"));
const model = pro ? PRO_MODEL : DEFAULT_MODEL;

const apiKey = findApiKey();
if (!apiKey) {
  console.error(
    "ERRO: chave API não encontrada.\n" +
      "Define GEMINI_API_KEY ou cria gemini_api_key.txt na raiz do projeto.\n" +
      "Obtém a chave em https://aistudio.google.com (requer faturação ativa)."
  );
  process.exit(2);
}

const queue = only.length
  ? IMAGES.filter((image) => only.includes(image.name))
  : IMAGES;
if (!queue.length) {
  console.error(
    `Nenhuma imagem corresponde a "${only.join(", ")}". ` +
      `Nomes válidos: ${IMAGES.map((image) => image.name).join(", ")}`
  );
  process.exit(2);
}

mkdirSync(OUT_DIR, { recursive: true });
let failures = 0;
for (const image of queue) {
  const out = join(OUT_DIR, `${image.name}.png`);
  process.stdout.write(`→ ${image.name} (${image.aspectRatio}, ${model})… `);
  try {
    const bytes = await generate(image, { apiKey, model });
    writeFileSync(out, bytes);
    console.log(`ok (${Math.round(bytes.length / 1024)} kB)`);
  } catch (error) {
    failures += 1;
    console.log(`FALHOU — ${error.message}`);
  }
}

if (failures) {
  console.error(`\n${failures} imagem(ns) falharam. Volta a correr só essas, p.ex.: npm run images:ai -- hero`);
  process.exit(1);
}
console.log("\nFeito. Vê o resultado com: npm run dev");
