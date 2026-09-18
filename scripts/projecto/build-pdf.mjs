#!/usr/bin/env node

/**
 * Gera o dossier do projecto "Quadro de Recordações de Viagem" em HTML e PDF.
 *
 * Fonte de verdade: scripts/projecto/spec.mjs
 * Saída:            docs/projecto/quadro-recordacoes.html
 *                   docs/projecto/Projecto-Quadro-Recordacoes.pdf
 *
 * Uso: node scripts/projecto/build-pdf.mjs
 */

import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

import {
  NOTAS,
  Q,
  CAMADAS,
  LISTA_CORTE,
  FERRAGENS,
  FONTES,
  DISTRIBUICAO,
  MAIOR_LARGURA,
  MAIOR_ALTURA,
  LUGARES,
  celulaH,
  grelhaW,
  grelhaH,
  painelW,
  painelH,
  vistaW,
  vistaH,
  abaVisivel,
  exteriorW,
  exteriorH,
  espessuraTotalCamadas,
  posicaoJanela,
  pesoEstimado,
} from './spec.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT_DIR = join(ROOT, 'docs', 'projecto');
const HTML_PATH = join(OUT_DIR, 'quadro-recordacoes.html');
const PDF_PATH = join(OUT_DIR, 'Projecto-Quadro-Recordacoes.pdf');
const CHROME = process.env.CHROME_BIN || '/opt/pw-browsers/chromium';

const DATA = 'Setembro de 2026';

// --- helpers ---------------------------------------------------------------

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Formata número em pt: vírgula decimal, sem zeros inúteis. */
const num = (v, casas = 0) =>
  Number(v)
    .toFixed(casas)
    .replace('.', ',')
    .replace(/,0+$/, '');

/**
 * Formata coordenadas SVG. Usa ponto decimal — ao contrário de `num()`, que
 * formata para leitura em português e produziria SVG inválido.
 */
const sn = (v) => String(Number(Number(v).toFixed(3)));

const byId = (id) => NOTAS.find((n) => n.id === id);
const peso = pesoEstimado();

/**
 * Embute as imagens em data URI. O Chromium não carrega sub-recursos file://
 * dentro de <image> de um SVG em linha, e assim o HTML fica auto-contido.
 */
const _cacheURI = new Map();
function dataURI(rel) {
  if (!_cacheURI.has(rel)) {
    const abs = join(ROOT, 'public', 'projecto', rel);
    const b64 = readFileSync(abs).toString('base64');
    _cacheURI.set(rel, `data:image/jpeg;base64,${b64}`);
  }
  return _cacheURI.get(rel);
}

/** Lugares da grelha: nota atribuída ou vazio. */
const LUGARES_GRELHA = Array.from({ length: LUGARES }, (_, i) =>
  DISTRIBUICAO[i] ? byId(DISTRIBUICAO[i]) : null
);

// --- desenhos SVG ----------------------------------------------------------

/**
 * Linha de cota com marcas nas extremidades e texto ao centro.
 * `t` é a meia-altura das marcas e escala-se com o desenho.
 */
function cota(x1, y1, x2, y2, texto, { lado = 'baixo', t = 9, afast = 18 } = {}) {
  const horizontal = y1 === y2;
  const marca = (x, y) =>
    horizontal
      ? `<line x1="${x}" y1="${sn(y - t)}" x2="${x}" y2="${sn(y + t)}"/>`
      : `<line x1="${sn(x - t)}" y1="${y}" x2="${sn(x + t)}" y2="${y}"/>`;
  const tx = horizontal ? (x1 + x2) / 2 : x1 + (lado === 'direita' ? afast : -afast);
  const ty = horizontal ? y1 + (lado === 'cima' ? -afast : afast) : (y1 + y2) / 2;
  const rot = horizontal ? '' : ` transform="rotate(-90 ${sn(tx)} ${sn(ty)})"`;
  return `
    <g class="cota">
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>
      ${marca(x1, y1)}${marca(x2, y2)}
      <text x="${sn(tx)}" y="${sn(ty)}"${rot}>${esc(texto)}</text>
    </g>`;
}

/**
 * Desenho técnico — alçado frontal cotado.
 * Referencial: canto exterior do quadro. O painel começa a `abaVisivel` mm
 * do bordo exterior, porque a aba da moldura sobrepõe-se-lhe.
 */
function svgAlcado() {
  const pad = 112; // topo e esquerda
  const padB = 146; // baixo e direita: levam duas linhas de cota
  const vb = `${-pad} ${-pad} ${exteriorW + pad + padB} ${exteriorH + pad + padB}`;
  const f = Q.perfilLargura;
  const o = abaVisivel; // origem do painel, medida do canto exterior

  let janelas = '';
  for (let i = 0; i < LUGARES; i++) {
    const { x, y } = posicaoJanela(i);
    const jx = o + x;
    const jy = o + y;
    janelas += `<rect class="janela" x="${jx}" y="${jy}" width="${Q.janelaW}" height="${Q.janelaH}"/>`;
    const px = jx + (Q.janelaW - Q.placaW) / 2;
    const py = jy + Q.janelaH + (Q.placaFaixa - Q.placaH) / 2;
    janelas += `<rect class="placa" x="${px}" y="${py}" width="${Q.placaW}" height="${Q.placaH}"/>`;
    janelas += `<text class="idx" x="${jx + Q.janelaW / 2}" y="${jy + Q.janelaH / 2 + 7}">${i + 1}</text>`;
  }

  const p0 = posicaoJanela(0);
  const p1 = posicaoJanela(1);
  const p4 = posicaoJanela(4);
  const tituloW = 240;
  const tituloH = 30;

  return `
<svg class="desenho" viewBox="${vb}" role="img" aria-label="Alçado frontal cotado do quadro">
  <rect class="exterior" x="0" y="0" width="${exteriorW}" height="${exteriorH}"/>
  <rect class="painel" x="${o}" y="${o}" width="${painelW}" height="${painelH}"/>
  <rect class="vista" x="${f}" y="${f}" width="${vistaW}" height="${vistaH}"/>
  <rect class="titulo" x="${o + (painelW - tituloW) / 2}" y="${o + (Q.faixaTitulo - tituloH) / 2}" width="${tituloW}" height="${tituloH}"/>
  ${janelas}

  ${cota(0, exteriorH + 44, exteriorW, exteriorH + 44, `${exteriorW} mm — exterior`)}
  ${cota(o, exteriorH + 92, o + painelW, exteriorH + 92, `${painelW} mm — painel (rebaixo)`)}
  ${cota(exteriorW + 44, 0, exteriorW + 44, exteriorH, `${exteriorH} mm — exterior`, { lado: 'direita' })}
  ${cota(exteriorW + 92, f, exteriorW + 92, f + vistaH, `${vistaH} mm — vão visível`, { lado: 'direita' })}

  ${cota(o + p0.x, o + p0.y - 30, o + p0.x + Q.janelaW, o + p0.y - 30, `${Q.janelaW}`, { lado: 'cima' })}
  ${cota(o + p0.x + Q.janelaW, o + p0.y - 30, o + p1.x, o + p0.y - 30, `${Q.intervaloX}`, { lado: 'cima' })}
  ${cota(o - 44, o + p0.y, o - 44, o + p0.y + Q.janelaH, `${Q.janelaH}`)}
  ${cota(o - 44, o + p0.y + Q.janelaH, o - 44, o + p4.y, `${Q.placaFaixa}+${Q.intervaloY}`)}
  ${cota(o - 92, o, o - 92, o + Q.faixaTitulo, `${Q.faixaTitulo}`)}
  ${cota(0, -44, f, -44, `${f}`, { lado: 'cima' })}
</svg>`;
}

/** Simulação do aspecto final, com os recortes reais da fotografia. */
function svgSimulacao() {
  const f = Q.perfilLargura;
  const o = abaVisivel;
  let celulas = '';

  LUGARES_GRELHA.forEach((nota, i) => {
    const { x, y } = posicaoJanela(i);
    const jx = o + x;
    const jy = o + y;
    celulas += `<rect class="s-janela" x="${jx}" y="${jy}" width="${Q.janelaW}" height="${Q.janelaH}"/>`;

    if (nota) {
      // nota à escala real, centrada na janela
      const nx = jx + (Q.janelaW - nota.w) / 2;
      const ny = jy + (Q.janelaH - nota.h) / 2;
      // o recorte da foto pode cobrir só uma faixa da nota: centra-o
      const ih = nota.w / nota.cropAR;
      const iy = ny + (nota.h - ih) / 2;
      celulas += `
        <g>
          <rect x="${nx}" y="${ny}" width="${nota.w}" height="${nota.h}" fill="${nota.cor}" rx="1.5"/>
          <image href="${dataURI(`notas/${nota.crop}`)}" x="${nx}" y="${iy}" width="${nota.w}" height="${sn(ih)}"
                 preserveAspectRatio="none"/>
          <rect class="s-nota" x="${nx}" y="${ny}" width="${nota.w}" height="${nota.h}" rx="1.5"/>
        </g>`;
      const px = jx + Q.janelaW / 2;
      const py = jy + Q.janelaH + Q.placaFaixa / 2;
      celulas += `
        <rect class="s-placa" x="${px - Q.placaW / 2}" y="${py - Q.placaH / 2}" width="${Q.placaW}" height="${Q.placaH}" rx="1"/>
        <text class="s-pais" x="${px}" y="${py + 1.2}">${esc(nota.pais.toUpperCase())}</text>
        <text class="s-den" x="${px}" y="${py + 6.8}">${esc(nota.denominacao)}</text>`;
    } else {
      celulas += `<text class="s-livre" x="${jx + Q.janelaW / 2}" y="${jy + Q.janelaH / 2 + 4}">livre</text>`;
    }
  });

  return `
<svg class="simulacao" viewBox="-6 -6 ${exteriorW + 12} ${exteriorH + 12}" role="img"
     aria-label="Simulação do aspecto final do quadro com as notas colocadas">
  <defs>
    <linearGradient id="madeira" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#9c5f35"/>
      <stop offset="0.5" stop-color="#844d29"/>
      <stop offset="1" stop-color="#6d3e20"/>
    </linearGradient>
    <linearGradient id="sombra" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#000" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#000" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${exteriorW}" height="${exteriorH}" fill="url(#madeira)" rx="3"/>
  <rect x="${f}" y="${f}" width="${vistaW}" height="${vistaH}" fill="#5d5445"/>
  <rect x="${f}" y="${f}" width="${vistaW}" height="60" fill="url(#sombra)"/>
  <rect class="s-titulo" x="${o + (painelW - 240) / 2}" y="${o + (Q.faixaTitulo - 30) / 2}" width="240" height="30" rx="1.5"/>
  <text class="s-titulo-txt" x="${o + painelW / 2}" y="${o + Q.faixaTitulo / 2 + 4}">AS MINHAS VIAGENS</text>
  ${celulas}
</svg>`;
}

/**
 * Corte vertical pelo perfil da moldura, com as camadas ampliadas.
 * Eixos do desenho: X cresce para dentro do quadro, Y cresce da frente para trás.
 * A face da moldura ocupa X de -perfil a 0; o painel encaixa a partir de X = -aba.
 */
function svgCorte() {
  const f = Q.perfilLargura;
  const d = Q.perfilProfundidade;
  const rl = Q.rebaixoLargura;
  const rp = Q.rebaixoProfundidade;
  const k = 5; // ampliação do desenho
  const W = 230; // largura desenhada da pilha de camadas
  const lipY = (d - rp) * k; // espessura da aba: onde começa o rebaixo
  const perfilH = d * k;
  const x0 = -rl * k; // bordo do painel: encaixa sob a aba

  const camadas = [
    { e: Q.espAcrilico, nome: `Acrílico ${Q.espAcrilico} mm`, cor: '#d4e5ec' },
    { e: Q.espMascara, nome: `Máscara ${Q.espMascara} mm, com as ${LUGARES} janelas`, cor: '#ece5d6' },
    { e: Q.espFundo, nome: `Fundo ${Q.espFundo} mm, forrado a linho`, cor: '#bdb199' },
    { e: Q.espCostas, nome: `Costas ${Q.espCostas} mm, amovíveis`, cor: '#a09884' },
  ];

  // As camadas são finas de mais para as legendas caberem ao lado umas das
  // outras: espalham-se em coluna e ligam-se por chamadas quebradas.
  const legX = W + 96;
  const legY0 = 24;
  const legPasso = 38;
  const chamada = (deY, i) =>
    `<polyline class="chamada" fill="none" points="${W},${sn(deY)} ${W + 40},${sn(deY)} ${W + 78},${legY0 + i * legPasso} ${legX - 6},${legY0 + i * legPasso}"/>`;

  let z = 0;
  let pilha = '';
  let legendas = '';
  camadas.forEach((c, i) => {
    const y = lipY + z * k;
    const h = c.e * k;
    const meio = y + h / 2;
    pilha += `<rect class="camada" x="${sn(x0)}" y="${sn(y)}" width="${sn(W - x0)}" height="${sn(h)}" fill="${c.cor}"/>`;
    legendas += chamada(meio, i);
    legendas += `<text class="leg" x="${legX}" y="${legY0 + i * legPasso + 5}">${i + 1}. ${esc(c.nome)}</text>`;
    z += c.e;
  });

  // a nota é fina de mais para ter espessura no desenho: marca-se com uma linha
  const yNota = lipY + (Q.espAcrilico + Q.espMascara) * k;
  pilha += `<line class="nota-linha" x1="${sn(x0 + 10)}" y1="${sn(yNota)}" x2="${W - 10}" y2="${sn(yNota)}"/>`;
  legendas += chamada(yNota, 4);
  legendas += `<text class="leg destaque" x="${legX}" y="${legY0 + 4 * legPasso + 5}">A nota, entre a máscara e o fundo</text>`;

  const fimCamadas = lipY + z * k;

  return `
<svg class="corte" viewBox="-378 -68 ${378 + legX + 268} ${68 + perfilH + 116}" role="img"
     aria-label="Corte vertical do quadro mostrando o perfil da moldura e as cinco camadas">
  <path class="perfil" d="M 0 0 H ${sn(-f * k)} V ${sn(perfilH)} H ${sn(x0)}
        V ${sn(lipY)} H 0 Z"/>
  ${pilha}
  ${legendas}

  ${cota(-f * k - 34, 0, -f * k - 34, perfilH, `${d} mm`, { t: 7, afast: 17 })}
  ${cota(-f * k - 96, lipY, -f * k - 96, fimCamadas, `${espessuraTotalCamadas} mm`, { t: 7, afast: 17 })}
  ${cota(-f * k, -28, 0, -28, `${f} mm — face da moldura`, { lado: 'cima', t: 7, afast: 16 })}
  ${cota(x0, perfilH + 30, 0, perfilH + 30, `aba ${rl}`, { t: 7, afast: 16 })}

  <text class="leg peq-svg" x="${sn(-f * k)}" y="${sn(perfilH + 74)}">Frente do quadro em cima · rebaixo ${rl} × ${rp} mm · desenho ampliado ${k}×</text>
</svg>`;
}

// --- páginas ---------------------------------------------------------------

const pagina = (n, titulo, corpo, { capa = false } = {}) => `
<section class="page${capa ? ' capa' : ''}">
  ${capa ? '' : `<header class="cab"><span class="cab-t">${esc(titulo)}</span><span class="cab-p">${n}</span></header>`}
  <div class="corpo">${corpo}</div>
  ${capa ? '' : `<footer class="rodape">Quadro de Recordações de Viagem · Projecto de execução · ${DATA}</footer>`}
</section>`;

function fichaNota(n, i) {
  return `
  <article class="ficha">
    <div class="ficha-img"><img src="${dataURI(`notas/${n.crop}`)}" alt="Recorte da nota de ${esc(n.denominacao)}"></div>
    <div class="ficha-txt">
      <div class="ficha-cab">
        <span class="ficha-n">${String(i + 1).padStart(2, '0')}</span>
        <h3>${esc(n.pais)}</h3>
        <span class="ficha-den">${esc(n.denominacao)}</span>
      </div>
      <dl>
        <dt>Dimensão real</dt><dd class="mono forte">${n.w} × ${n.h} mm</dd>
        <dt>Emissor</dt><dd>${esc(n.emissor)}</dd>
        <dt>Série</dt><dd>${esc(n.serie)}</dd>
        <dt>Face na foto</dt><dd>${esc(n.face)} — ${esc(n.motivo)}</dd>
      </dl>
    </div>
  </article>`;
}

function tabelaCorte() {
  const linhas = LISTA_CORTE.map(
    (p) => `
    <tr>
      <td class="mono ref">${esc(p.ref)}</td>
      <td><strong>${esc(p.peca)}</strong><br><span class="peq">${esc(p.material)}</span></td>
      <td class="mono">${esc(p.medida)}</td>
      <td class="mono cen">${p.qt}</td>
      <td class="peq">${esc(p.nota)}</td>
      <td class="preco"></td>
    </tr>`
  ).join('');
  return `
  <table class="tab corte">
    <thead>
      <tr><th>Ref.</th><th>Peça e material</th><th>Medida de corte</th><th>Qt.</th><th>Observações</th><th>Preço (a preencher)</th></tr>
    </thead>
    <tbody>${linhas}</tbody>
  </table>`;
}

function tabelaFuracao() {
  let linhas = '';
  for (let i = 0; i < LUGARES; i++) {
    const { x, y, col, lin } = posicaoJanela(i);
    const nota = LUGARES_GRELHA[i];
    linhas += `
      <tr>
        <td class="mono cen">${i + 1}</td>
        <td class="mono cen">${lin + 1} / ${col + 1}</td>
        <td class="mono cen forte">${x}</td>
        <td class="mono cen forte">${y}</td>
        <td class="mono cen">${x + Q.janelaW}</td>
        <td class="mono cen">${y + Q.janelaH}</td>
        <td>${nota ? esc(nota.pais) : '<span class="peq">livre</span>'}</td>
      </tr>`;
  }
  return `
  <table class="tab furacao">
    <thead>
      <tr>
        <th rowspan="2">Janela</th><th rowspan="2">Linha / Coluna</th>
        <th colspan="2">Canto superior esquerdo</th><th colspan="2">Canto inferior direito</th>
        <th rowspan="2">Destino</th>
      </tr>
      <tr><th>X (mm)</th><th>Y (mm)</th><th>X (mm)</th><th>Y (mm)</th></tr>
    </thead>
    <tbody>${linhas}</tbody>
  </table>`;
}

const PASSOS = [
  [
    'Conferir as notas e as medidas',
    `Medir as sete notas antes de cortar. As medidas deste projecto são as oficiais de cada banco emissor, mas uma nota muito usada pode ter um ou dois milímetros a menos. A janela de ${Q.janelaW} × ${Q.janelaH} mm tem folga suficiente para todas.`,
  ],
  [
    'Cortar e maquinar a moldura',
    `Preparar o perfil ${Q.perfilLargura} × ${Q.perfilProfundidade} mm e abrir o rebaixo de ${Q.rebaixoLargura} × ${Q.rebaixoProfundidade} mm a toda a volta. Cortar as quatro peças a 45°, conferindo as medidas exteriores de ${exteriorW} e ${exteriorH} mm.`,
  ],
  [
    'Montar e reforçar as esquadrias',
    'Colar a 45° com cola branca e grampos de esquadria. Depois de seca, reforçar cada canto com gramponete ou cavilha. Lixar até 220 e aplicar o acabamento antes de montar os painéis.',
  ],
  [
    'Cortar a máscara e abrir as janelas',
    `Cortar o painel de ${painelW} × ${painelH} mm e abrir as ${LUGARES} janelas pelas coordenadas do mapa de furação. O corte a laser ou CNC dá o melhor resultado; à mão, usar tupia com guia. Lacar a mate depois de abrir.`,
  ],
  [
    'Forrar o fundo',
    'Cortar o MDF de 6 mm, esticar o linho sobre ele sem vincos, dobrar 25 mm para trás e agrafar. É esta superfície que aparece por trás de cada nota.',
  ],
  [
    'Colocar as notas',
    'Marcar a lápis, no verso do fundo, o centro de cada janela. Fixar cada nota com quatro cantos transparentes de arquivo. Nunca colar, agrafar ou plastificar uma nota — o valor de recordação perde-se.',
  ],
  [
    'Fechar o quadro',
    'Pela ordem: acrílico, máscara, fundo com as notas, costas. Prender as costas com as molas viráveis — nunca com pregos — para que se possa abrir sempre que houver uma viagem nova.',
  ],
  [
    'Aplicar as placas e pendurar',
    'Colar as placas gravadas com fita dupla-face fina, alinhadas pelo centro de cada janela. Fixar o sarrafo francês no quadro e o outro meio na parede, bem nivelado e com buchas adequadas.',
  ],
];

// --- documento -------------------------------------------------------------

const CSS = `
:root{
  --papel:#FBF8F3; --tinta:#1B1916; --suave:#6E665A; --fio:#DCD3C4;
  --madeira:#9A5A31; --latao:#B08D57; --escuro:#221F1B; --realce:#F3EDE1;
}
@page{ size:A4; margin:0; }
*{ box-sizing:border-box; }
html,body{ margin:0; padding:0; }
body{
  background:var(--papel); color:var(--tinta);
  font-family:"DejaVu Sans","Liberation Sans",sans-serif;
  font-size:9.2pt; line-height:1.5;
  -webkit-print-color-adjust:exact; print-color-adjust:exact;
}
h1,h2,h3,h4{ font-family:"Liberation Serif","DejaVu Serif",serif; font-weight:700; margin:0; }
.mono{ font-family:"DejaVu Sans Mono","Liberation Mono",monospace; }

.page{
  width:210mm; height:297mm; position:relative; overflow:hidden;
  page-break-after:always; break-after:page;
  padding:14mm 16mm 12mm; display:flex; flex-direction:column;
}
.page:last-child{ page-break-after:auto; break-after:auto; }
.corpo{ flex:1; min-height:0; }

.cab{
  display:flex; justify-content:space-between; align-items:baseline;
  border-bottom:0.5pt solid var(--fio); padding-bottom:2.5mm; margin-bottom:6mm;
}
.cab-t{ font-size:7.4pt; letter-spacing:0.18em; text-transform:uppercase; color:var(--suave); }
.cab-p{ font-family:"Liberation Serif",serif; font-size:12pt; color:var(--madeira); }
.rodape{
  border-top:0.5pt solid var(--fio); padding-top:2.5mm; margin-top:5mm;
  font-size:6.8pt; letter-spacing:0.08em; color:var(--suave); text-transform:uppercase;
}

/* --- capa --- */
.capa{ background:var(--escuro); color:#F4EFE6; padding:0; }
.capa .corpo{ display:flex; flex-direction:column; height:100%; }
.capa-topo{ padding:18mm 18mm 0; }
.capa-etiq{ font-size:7.4pt; letter-spacing:0.3em; text-transform:uppercase; color:var(--latao); }
.capa h1{
  font-size:34pt; line-height:1.06; margin:7mm 0 0; letter-spacing:-0.01em; color:#FBF7EF;
}
.capa h1 em{ font-style:normal; color:var(--latao); display:block; font-size:25pt; margin-top:2mm; }
.capa-sub{ margin-top:6mm; font-size:10pt; color:#C9BFAE; max-width:120mm; line-height:1.55; }
.capa-foto{ flex:1; margin:10mm 18mm 0; position:relative; min-height:0; display:flex; align-items:center; justify-content:center; }
.capa-foto img{ max-height:100%; max-width:100%; object-fit:contain; box-shadow:0 4mm 12mm rgba(0,0,0,.45); }
.capa-rodape{
  padding:8mm 18mm 14mm; display:flex; justify-content:space-between; align-items:flex-end;
  border-top:0.5pt solid rgba(255,255,255,.16); margin:8mm 18mm 0; padding:5mm 0 14mm;
}
.capa-rodape div{ font-size:8pt; color:#C9BFAE; }
.capa-rodape strong{ display:block; font-size:11pt; color:#F4EFE6; font-family:"Liberation Serif",serif; }

/* --- títulos de secção --- */
.h-sec{ font-size:19pt; line-height:1.14; margin-bottom:2.5mm; }
.h-sec + .lead{ font-size:9.6pt; color:var(--suave); max-width:150mm; margin-bottom:6mm; line-height:1.6; }
.h-sub{ font-size:11pt; margin:6mm 0 2.5mm; }
.h-sub:first-child{ margin-top:0; }
p{ margin:0 0 3mm; }
.peq{ font-size:7.6pt; color:var(--suave); line-height:1.4; }
.forte{ font-weight:700; }
.cen{ text-align:center; }

/* --- citação do pedido --- */
.citacao{
  background:var(--realce); border-left:2.5pt solid var(--madeira);
  padding:6mm 7mm; margin:0 0 6mm; font-size:9.2pt; line-height:1.62;
}
.citacao p{ margin:0 0 2.5mm; }
.citacao p:last-child{ margin:0; }
.citacao .fonte{ font-size:7.4pt; color:var(--suave); margin-top:3.5mm; letter-spacing:0.06em; text-transform:uppercase; }

.requisitos{ list-style:none; margin:0; padding:0; }
.requisitos li{ display:flex; gap:4mm; padding:3mm 0; border-bottom:0.5pt solid var(--fio); }
.requisitos li:last-child{ border-bottom:0; }
.requisitos .r-n{ font-family:"Liberation Serif",serif; font-size:12pt; color:var(--madeira); min-width:7mm; }
.requisitos .r-t{ flex:1; }
.requisitos .r-t strong{ display:block; margin-bottom:0.8mm; }

/* --- fichas das notas --- */
.ficha{
  display:flex; gap:7mm; align-items:center;
  padding:5.5mm 0; border-bottom:0.5pt solid var(--fio);
}
.ficha:last-child{ border-bottom:0; }
.ficha-img{ width:82mm; flex:none; }
.ficha-img img{ width:100%; display:block; border:0.5pt solid var(--fio); box-shadow:0 1mm 3mm rgba(0,0,0,.14); }
.ficha-txt{ flex:1; min-width:0; }
.ficha-cab{ display:flex; align-items:baseline; gap:3mm; margin-bottom:2mm; }
.ficha-n{ font-family:"DejaVu Sans Mono",monospace; font-size:8pt; color:var(--latao); }
.ficha-cab h3{ font-size:13pt; }
.ficha-den{ font-size:8.4pt; color:var(--suave); }
.ficha dl{ display:grid; grid-template-columns:23mm 1fr; gap:0.8mm 3mm; margin:0; font-size:8.2pt; }
.ficha dt{ color:var(--suave); font-size:7.4pt; text-transform:uppercase; letter-spacing:0.08em; padding-top:0.3mm; }
.ficha dd{ margin:0; }

/* --- caixas --- */
.caixa{ background:var(--realce); padding:5mm 6mm; border-radius:1.5mm; }
.caixa.escura{ background:var(--escuro); color:#EFE9DD; }
.caixa.escura .k-v{ color:#EFE9DD; }
.caixa h4{ font-size:10pt; margin-bottom:2.5mm; }
.caixa.escura h4{ color:var(--latao); }
.grid2{ display:grid; grid-template-columns:1fr 1fr; gap:6mm; }
.grid3{ display:grid; grid-template-columns:repeat(3,1fr); gap:5mm; }

.numeros{ display:grid; grid-template-columns:repeat(4,1fr); gap:4mm; margin:5mm 0; }
.num-c{ border-top:1.2pt solid var(--madeira); padding-top:2.5mm; }
.num-v{ font-family:"Liberation Serif",serif; font-size:17pt; line-height:1; }
.num-v small{ font-size:9pt; color:var(--suave); }
.num-l{ font-size:7.2pt; text-transform:uppercase; letter-spacing:0.1em; color:var(--suave); margin-top:1.5mm; }

/* --- tabelas --- */
.tab{ width:100%; border-collapse:collapse; font-size:8pt; }
.tab th{
  text-align:left; font-size:6.9pt; letter-spacing:0.1em; text-transform:uppercase;
  color:var(--suave); font-weight:400; border-bottom:1pt solid var(--tinta);
  padding:0 2mm 1.8mm; vertical-align:bottom;
}
.tab td{ padding:2.2mm 2mm; border-bottom:0.5pt solid var(--fio); vertical-align:top; }
.tab tbody tr:nth-child(even){ background:rgba(0,0,0,.022); }
.tab .ref{ color:var(--madeira); font-weight:700; }
.tab .mono{ white-space:nowrap; }
.tab .preco{ border-bottom:0.5pt solid var(--fio); min-width:26mm; background:rgba(154,90,49,.05); }
.furacao th{ text-align:center; }
.furacao th:last-child, .furacao td:last-child{ text-align:left; }

/* --- desenhos --- */
.desenho, .simulacao, .corte{ width:100%; height:auto; display:block; }
.desenho{ width:88%; margin:0 auto; }
.desenho .exterior{ fill:#fff; stroke:var(--tinta); stroke-width:2.2; }
.desenho .painel{ fill:#F6F1E7; stroke:var(--suave); stroke-width:1; stroke-dasharray:9 6; }
.desenho .vista{ fill:none; stroke:var(--tinta); stroke-width:1.6; }
.desenho .janela{ fill:#fff; stroke:var(--madeira); stroke-width:1.6; }
.desenho .placa{ fill:#E4DACA; stroke:none; }
.desenho .titulo{ fill:#E4DACA; stroke:var(--suave); stroke-width:0.8; }
.desenho .idx{ font-family:"DejaVu Sans",sans-serif; font-size:15px; fill:#B9AF9C; text-anchor:middle; }
.cota line{ stroke:var(--madeira); stroke-width:1.1; }
.cota text{
  font-family:"DejaVu Sans Mono",monospace; font-size:17px; fill:var(--madeira);
  text-anchor:middle; dominant-baseline:middle;
}
.simulacao .s-janela{ fill:#4E4638; stroke:#3C362B; stroke-width:0.8; }
.simulacao .s-nota{ fill:none; stroke:rgba(0,0,0,.25); stroke-width:0.5; }
.simulacao .s-placa{ fill:#C9A46A; }
.simulacao .s-pais{ font-family:"DejaVu Sans",sans-serif; font-size:4.4px; font-weight:700; fill:#2B2318; text-anchor:middle; letter-spacing:0.3px; }
.simulacao .s-den{ font-family:"DejaVu Sans",sans-serif; font-size:3.6px; fill:#5A4A31; text-anchor:middle; }
.simulacao .s-livre{ font-family:"DejaVu Sans",sans-serif; font-size:7px; fill:#7C7361; text-anchor:middle; letter-spacing:0.6px; }
.simulacao .s-titulo{ fill:#C9A46A; }
.simulacao .s-titulo-txt{ font-family:"Liberation Serif",serif; font-size:11px; font-weight:700; fill:#2B2318; text-anchor:middle; letter-spacing:1.6px; }
.corte .perfil{ fill:#C79A6E; stroke:var(--tinta); stroke-width:1.6; }
.corte .camada{ stroke:var(--tinta); stroke-width:1; }
.corte .nota-linha{ stroke:var(--madeira); stroke-width:2.4; }
.corte .chamada{ stroke:var(--suave); stroke-width:0.9; }
.corte .leg{ font-family:"DejaVu Sans",sans-serif; font-size:13px; fill:var(--tinta); }
.corte .leg.destaque{ fill:var(--madeira); font-weight:700; }
.corte .leg.peq-svg{ font-size:11px; fill:var(--suave); }
.corte .cota line{ stroke-width:1; }
.corte .cota text{ font-size:12.5px; }
.corte{ width:100%; margin:0 auto; }

/* --- passos --- */
.passos{ counter-reset:p; list-style:none; margin:0; padding:0; }
.passos li{ display:flex; gap:4.5mm; padding:3.2mm 0; border-bottom:0.5pt solid var(--fio); }
.passos li:last-child{ border-bottom:0; }
.passos li::before{
  counter-increment:p; content:counter(p,decimal-leading-zero);
  font-family:"Liberation Serif",serif; font-size:13pt; color:var(--latao); min-width:9mm; line-height:1;
}
.passos strong{ display:block; font-size:9.6pt; margin-bottom:1mm; }
.passos p{ margin:0; font-size:8.4pt; color:#3D382F; }

.aviso{ border:0.8pt solid var(--madeira); padding:4mm 5mm; border-radius:1.5mm; font-size:8.4pt; }
.aviso strong{ color:var(--madeira); }
.k-v{ display:flex; justify-content:space-between; gap:4mm; padding:1.6mm 0; border-bottom:0.5pt dotted rgba(0,0,0,.18); font-size:8.4pt; }
.caixa.escura .k-v{ border-bottom-color:rgba(255,255,255,.18); }
.k-v:last-child{ border-bottom:0; }
.k-v span:last-child{ font-family:"DejaVu Sans Mono",monospace; white-space:nowrap; }
.fontes{ list-style:none; margin:0; padding:0; font-size:7.6pt; color:var(--suave); }
.fontes li{ padding:1.6mm 0; border-bottom:0.5pt solid var(--fio); }
.fontes li:last-child{ border-bottom:0; }
`;

// --- conteúdo das páginas --------------------------------------------------

const p1 = pagina(1, '', `
  <div class="capa-topo">
    <div class="capa-etiq">Projecto de execução para marcenaria</div>
    <h1>Quadro de Recordações<em>de Viagem</em></h1>
    <p class="capa-sub">Uma nota de cada país visitado, com o nome do país — em madeira,
      acrílico e linho. Desenho completo, medidas e lista de corte prontos para oficina.</p>
  </div>
  <div class="capa-foto"><img src="${dataURI(`coleccao-original.jpg`)}" alt="A colecção de notas fotografada pelo cliente"></div>
  <div class="capa-rodape">
    <div>Preparado para<strong>Professor Hwang Jorge</strong></div>
    <div>Data<strong>${DATA}</strong></div>
    <div>Lugares<strong>${LUGARES} países</strong></div>
  </div>`, { capa: true });

const p2 = pagina(2, 'O pedido', `
  <h2 class="h-sec">O que foi pedido</h2>
  <p class="lead">O ponto de partida é a publicação do Professor Hwang Jorge e a fotografia
    que a acompanha. Tudo neste dossier deriva desses dois elementos.</p>

  <div class="citacao">
    <p>«Quero criar um quadro de recordações das minhas viagens, onde possa colocar uma nota
      de cada país que já visitei, com o respectivo nome do país.</p>
    <p>A ideia é fazer algo bonito e moderno, em madeira, acrílico, metal ou outro material,
      para colocar na parede de casa ou do escritório.»</p>
    <p class="fonte">Professor Hwang Jorge · publicação original</p>
  </div>

  <h3 class="h-sub">Como traduzimos isso em projecto</h3>
  <ol class="requisitos">
    <li><span class="r-n">1</span><span class="r-t"><strong>Uma nota por país, com o nome do país</strong>
      Cada lugar tem a sua janela e a sua placa gravada com o nome do país e a denominação da nota.</span></li>
    <li><span class="r-n">2</span><span class="r-t"><strong>Bonito e moderno</strong>
      Moldura de madeira maciça, máscara lacada mate, fundo de linho natural e placas gravadas.
      A grelha regular é o que dá o ar contemporâneo: as notas têm tamanhos diferentes, as janelas não.</span></li>
    <li><span class="r-n">3</span><span class="r-t"><strong>Madeira, acrílico ou metal</strong>
      Usamos os três: madeira na moldura, acrílico à frente e nas placas, com opção de latão gravado.</span></li>
    <li><span class="r-n">4</span><span class="r-t"><strong>Para a parede de casa ou do escritório</strong>
      ${exteriorW} × ${exteriorH} mm, cerca de ${num(peso.total, 0)} kg, pendurado em sarrafo francês —
      encosta à parede, fica a direito e aguenta.</span></li>
    <li><span class="r-n">5</span><span class="r-t"><strong>As viagens não acabaram</strong>
      São ${LUGARES} lugares. Sete estão ocupados hoje; os outros ${LUGARES - DISTRIBUICAO.length} ficam
      à espera. As costas abrem sem desmontar nada.</span></li>
  </ol>

  <div class="aviso" style="margin-top:6mm">
    <strong>Nota sobre as imagens deste dossier.</strong> Todas as imagens de notas que aparecem
    aqui são recortes da fotografia enviada pelo Professor — são as notas dele, não reproduções
    desenhadas. As medidas de cada nota são as oficiais dos respectivos bancos emissores
    (fontes na última página). Nada foi inventado nem redesenhado.
  </div>`);

const p3 = pagina(3, 'A colecção · 1 de 2', `
  <h2 class="h-sec">As notas identificadas</h2>
  <p class="lead">Sete notas, seis países. Cada uma foi identificada na fotografia e confrontada
    com as dimensões oficiais do banco emissor — são essas medidas que definem o tamanho da janela.</p>
  ${NOTAS.slice(0, 4).map((n, i) => fichaNota(n, i)).join('')}`);

const p4 = pagina(4, 'A colecção · 2 de 2', `
  ${NOTAS.slice(4).map((n, i) => fichaNota(n, i + 4)).join('')}

  <div class="grid2" style="margin-top:6mm">
    <div class="caixa escura">
      <h4>A medida que manda no projecto</h4>
      <div class="k-v"><span>Nota mais larga — Estados Unidos</span><span>${MAIOR_LARGURA} mm</span></div>
      <div class="k-v"><span>Nota mais alta — Botsuana</span><span>${MAIOR_ALTURA} mm</span></div>
      <div class="k-v"><span>Janela universal adoptada</span><span>${Q.janelaW} × ${Q.janelaH} mm</span></div>
      <div class="k-v"><span>Folga mínima em redor</span><span>${num((Q.janelaW - MAIOR_LARGURA) / 2, 1)} / ${num((Q.janelaH - MAIOR_ALTURA) / 2, 1)} mm</span></div>
      <p class="peq" style="color:#B7AE9E;margin:3mm 0 0">Uma janela igual para todos serve qualquer nota
        da colecção e praticamente qualquer nota do mundo — a esmagadora maioria não passa de 160 × 80 mm.
        As viagens futuras já cabem.</p>
    </div>
    <div class="caixa">
      <h4>Dois países, duas notas</h4>
      <p>A Coreia do Sul aparece com duas notas (50 000 e 5 000 Won) e a África do Sul também
        (200 e 100 Rand). O pedido fala em <em>uma nota de cada país</em>.</p>
      <p><strong>A proposta:</strong> mostrar as duas de cada. A placa leva o nome do país e a
        denominação, por isso não há confusão, e o quadro fica mais rico.</p>
      <p class="peq" style="margin:0">Se preferir uma só por país, basta deixar essas duas janelas
        livres para outros destinos — não muda nada no fabrico.</p>
    </div>
  </div>`);

const p5 = pagina(5, 'Conceito', `
  <h2 class="h-sec">O conceito</h2>
  <p class="lead">Uma grelha de ${Q.linhas} × ${Q.colunas} janelas iguais sobre fundo de linho,
    dentro de uma moldura de madeira maciça. O que se vê é o ritmo das janelas; o que muda dentro
    delas é a viagem.</p>

  <div class="numeros">
    <div class="num-c"><div class="num-v">${exteriorW} <small>× ${exteriorH} mm</small></div><div class="num-l">Medida exterior</div></div>
    <div class="num-c"><div class="num-v">${LUGARES}</div><div class="num-l">Lugares para países</div></div>
    <div class="num-c"><div class="num-v">${Q.perfilProfundidade} <small>mm</small></div><div class="num-l">Profundidade da moldura</div></div>
    <div class="num-c"><div class="num-v">≈ ${num(peso.total, 0)} <small>kg</small></div><div class="num-l">Peso estimado</div></div>
  </div>

  <div class="grid3" style="margin-top:2mm">
    <div class="caixa">
      <h4>Janela igual, nota diferente</h4>
      <p class="peq">As notas variam entre ${Math.min(...NOTAS.map((n) => n.w))} e ${MAIOR_LARGURA} mm
      de largura. Se cada janela fosse à medida, o quadro ficava desalinhado. Com a janela única
      de ${Q.janelaW} × ${Q.janelaH} mm, a grelha fica perfeita e cada nota respira ao centro.</p>
    </div>
    <div class="caixa">
      <h4>Abre-se por trás</h4>
      <p class="peq">As costas prendem-se com molas viráveis, não com pregos. Uma viagem nova
      resolve-se em cinco minutos: abrir, colocar a nota com cantos de arquivo, colar a placa, fechar.</p>
    </div>
    <div class="caixa">
      <h4>Materiais com razão de ser</h4>
      <p class="peq">Madeira maciça na moldura (umbila, chanfuta ou similar), acrílico à frente
      porque é leve e não estilhaça, linho no fundo porque dá textura sem competir com as notas,
      e placas gravadas para os nomes.</p>
    </div>
  </div>

  <h3 class="h-sub" style="margin-top:7mm">Distribuição proposta dos países</h3>
  <p style="max-width:160mm">Moçambique ocupa o primeiro lugar, em cima à esquerda — é onde se
    começa a ler o quadro. Seguem-se os vizinhos da região austral, depois a Ásia e a América.
    A ordem não tem consequência técnica: qualquer nota entra em qualquer janela.</p>

  <table class="tab" style="margin-top:3mm">
    <thead><tr><th>Lugar</th><th>País</th><th>Nota</th><th>Dimensão real</th><th>Estado</th></tr></thead>
    <tbody>
      ${LUGARES_GRELHA.map((n, i) => `
        <tr>
          <td class="mono cen">${i + 1}</td>
          <td>${n ? `<strong>${esc(n.pais)}</strong>` : '<span class="peq">— por atribuir —</span>'}</td>
          <td>${n ? esc(n.denominacao) : ''}</td>
          <td class="mono">${n ? `${n.w} × ${n.h} mm` : ''}</td>
          <td class="peq">${n ? 'Já na colecção' : 'Reservado a viagem futura'}</td>
        </tr>`).slice(0, 10).join('')}
      <tr><td class="mono cen">11–${LUGARES}</td><td colspan="4" class="peq">Restantes ${LUGARES - 10} lugares reservados a viagens futuras.</td></tr>
    </tbody>
  </table>`);

const p6 = pagina(6, 'Desenho técnico', `
  <h2 class="h-sec">Alçado frontal cotado</h2>
  <p class="lead">Medidas em milímetros. As janelas estão numeradas de 1 a ${LUGARES}, da esquerda
    para a direita e de cima para baixo — a mesma numeração do mapa de furação.</p>
  ${svgAlcado()}
  <div class="grid2" style="margin-top:6mm">
    <div class="caixa">
      <h4>Como se chega a estas medidas</h4>
      <div class="k-v"><span>Janela + faixa da placa</span><span>${Q.janelaW} × ${celulaH} mm</span></div>
      <div class="k-v"><span>Intervalo entre janelas</span><span>${Q.intervaloX} / ${Q.intervaloY} mm</span></div>
      <div class="k-v"><span>Grelha completa</span><span>${grelhaW} × ${grelhaH} mm</span></div>
      <div class="k-v"><span>+ margens → painel</span><span>${painelW} × ${painelH} mm</span></div>
      <div class="k-v"><span>− aba (${Q.rebaixoLargura}/lado) → vão visível</span><span>${vistaW} × ${vistaH} mm</span></div>
      <div class="k-v"><span>+ face (${Q.perfilLargura}/lado) → exterior</span><span class="forte">${exteriorW} × ${exteriorH} mm</span></div>
    </div>
    <div class="caixa">
      <h4>Tolerâncias</h4>
      <p class="peq">Acrílico, máscara e fundo levam todos ${painelW} × ${painelH} mm. Cortar 1 mm a menos
        em cada dimensão se o rebaixo ficar justo — a moldura esconde a folga.</p>
      <p class="peq" style="margin:0">As costas levam menos 2 mm em cada dimensão, de propósito:
        têm de entrar e sair com facilidade sempre que houver nota nova.</p>
    </div>
  </div>`);

const p7 = pagina(7, 'Aspecto final', `
  <h2 class="h-sec">Simulação do quadro montado</h2>
  <p class="lead">As sete notas do Professor, à escala real, nos seus lugares. As imagens são
    recortes da fotografia original — é o quadro dele, com o dinheiro dele.</p>
  ${svgSimulacao()}
  <p class="peq" style="margin-top:4mm">Simulação a partir da fotografia enviada; a cor da madeira e
    do linho é indicativa e define-se na escolha de acabamento (página 11). As diferenças de tamanho
    entre notas que se vêem dentro das janelas são reais e estão à escala.</p>

  <div class="grid3" style="margin-top:6mm">
    <div class="caixa">
      <h4>Lê-se como um texto</h4>
      <p class="peq">Da esquerda para a direita, de cima para baixo. Moçambique abre, os vizinhos
        seguem-se, depois a Ásia e a América. Quem chega ao escritório percebe o percurso sem explicação.</p>
    </div>
    <div class="caixa">
      <h4>O vazio faz parte</h4>
      <p class="peq">As ${LUGARES - DISTRIBUICAO.length} janelas livres não são um defeito: são o convite.
        Um quadro de viagens cheio no primeiro dia seria um quadro de viagens acabadas.</p>
    </div>
    <div class="caixa">
      <h4>Onde pendurar</h4>
      <p class="peq">Com ${exteriorW} × ${exteriorH} mm, pede uma parede livre de pelo menos 1,2 m.
        A altura correcta é com o centro do quadro a ${'\u2248'} 1,55 m do chão — a altura dos olhos.</p>
    </div>
  </div>`);

const p8 = pagina(8, 'Corte e camadas', `
  <h2 class="h-sec">Corte vertical</h2>
  <p class="lead">Cinco camadas dentro de um rebaixo de ${Q.rebaixoProfundidade} mm. O desenho está
    ampliado para se ver a espessura de cada uma.</p>
  ${svgCorte()}

  <table class="tab" style="margin-top:7mm">
    <thead><tr><th>#</th><th>Camada</th><th>Espessura</th><th>Medida</th><th>Função</th></tr></thead>
    <tbody>
      ${CAMADAS.map((c) => `
        <tr>
          <td class="mono cen ref">${c.n}</td>
          <td><strong>${esc(c.nome)}</strong></td>
          <td class="mono">${num(c.esp, 1)} mm</td>
          <td class="mono">${c.dim === 'variável' ? 'variável' : `${esc(c.dim)} mm`}</td>
          <td class="peq">${esc(c.papel)}</td>
        </tr>`).join('')}
    </tbody>
  </table>

  <div class="grid2" style="margin-top:6mm">
    <div class="caixa">
      <h4>A conta do rebaixo</h4>
      <div class="k-v"><span>Soma das camadas rígidas</span><span>${espessuraTotalCamadas} mm</span></div>
      <div class="k-v"><span>Folga de montagem</span><span>${Q.rebaixoProfundidade - espessuraTotalCamadas} mm</span></div>
      <div class="k-v"><span>Rebaixo a executar</span><span class="forte">${Q.rebaixoProfundidade} mm</span></div>
      <div class="k-v"><span>Profundidade total do perfil</span><span>${Q.perfilProfundidade} mm</span></div>
    </div>
    <div class="caixa escura">
      <h4>Peso estimado, por material</h4>
      <div class="k-v"><span>Moldura de madeira</span><span>${num(peso.moldura, 1)} kg</span></div>
      <div class="k-v"><span>Acrílico 3 mm</span><span>${num(peso.acrilico, 1)} kg</span></div>
      <div class="k-v"><span>Fundo + costas (MDF)</span><span>${num(peso.fundo + peso.costas, 1)} kg</span></div>
      <div class="k-v"><span>Máscara</span><span>${num(peso.mascara, 1)} kg</span></div>
      <div class="k-v"><span class="forte">Total</span><span class="forte">≈ ${num(peso.total, 1)} kg</span></div>
      <p class="peq" style="color:#B7AE9E;margin:3mm 0 0">Cálculo a partir das densidades correntes
        (madeira 620, MDF 750, acrílico 1190 kg/m³). Dimensionar a fixação para 15 kg.</p>
    </div>
  </div>`);

const p9 = pagina(9, 'Mapa de furação', `
  <h2 class="h-sec">Mapa de furação da máscara</h2>
  <p class="lead">Coordenadas das ${LUGARES} janelas no painel de ${painelW} × ${painelH} mm, medidas a partir
    do canto superior esquerdo do painel. Serve para corte a laser, CNC ou marcação manual.</p>
  ${tabelaFuracao()}
  <div class="aviso" style="margin-top:6mm">
    <strong>Atenção ao referencial.</strong> Estas coordenadas são do <em>painel</em>
    (${painelW} × ${painelH} mm), não do quadro acabado. Se preferir marcar sobre a moldura já montada,
    somar ${Q.perfilLargura} mm a X e a Y.
  </div>
  <div class="grid2" style="margin-top:5mm">
    <div class="caixa">
      <h4>Placas de identificação</h4>
      <p class="peq">Cada placa (${Q.placaW} × ${Q.placaH} mm) fica centrada na largura da janela,
        ${num((Q.placaFaixa - Q.placaH) / 2, 1)} mm abaixo do bordo inferior dela. Em coordenadas do painel:
        X = X<sub>janela</sub> + ${num((Q.janelaW - Q.placaW) / 2, 0)}, Y = Y<sub>janela</sub> + ${num(Q.janelaH + (Q.placaFaixa - Q.placaH) / 2, 0)}.</p>
    </div>
    <div class="caixa">
      <h4>Placa de título</h4>
      <p class="peq">240 × 30 mm, centrada na faixa superior: X = ${num((painelW - 240) / 2, 0)},
        Y = ${num((Q.faixaTitulo - 30) / 2, 0)}. O texto fica ao critério do Professor —
        na simulação usámos «AS MINHAS VIAGENS».</p>
    </div>
  </div>`);

const p10 = pagina(10, 'Lista de corte', `
  <h2 class="h-sec">Lista de corte</h2>
  <p class="lead">Tudo o que a oficina precisa de cortar. A coluna de preço fica em branco de
    propósito — os valores devem ser cotados localmente, não estimados à distância.</p>
  ${tabelaCorte()}
  <div class="aviso" style="margin-top:5mm">
    <strong>Antes de cortar.</strong> Confirmar a profundidade real do perfil de madeira disponível.
    Se vier com menos de ${Q.perfilProfundidade} mm, o rebaixo de ${Q.rebaixoProfundidade} mm continua
    a ser o mínimo — é o que as cinco camadas ocupam. Nesse caso reduz-se a face, nunca o rebaixo.
  </div>`);

const p11 = pagina(11, 'Materiais e acabamento', `
  <h2 class="h-sec">Ferragens, madeiras e acabamento</h2>
  <p class="lead">O que se compra além da madeira e dos painéis, e as escolhas de acabamento que
    ficam ao critério do Professor.</p>

  <table class="tab">
    <thead><tr><th>Ferragens e consumíveis</th><th>Quantidade</th><th>Preço (a preencher)</th></tr></thead>
    <tbody>
      ${FERRAGENS.map((f) => `<tr><td>${esc(f.item)}</td><td class="mono">${esc(f.qt)}</td><td class="preco"></td></tr>`).join('')}
      <tr><td class="forte">Mão-de-obra</td><td class="peq">a acordar</td><td class="preco"></td></tr>
      <tr><td class="forte">Total do projecto</td><td class="peq">corte + ferragens + mão-de-obra</td><td class="preco"></td></tr>
    </tbody>
  </table>

  <div class="grid2" style="margin-top:6mm">
    <div class="caixa">
      <h4>Madeiras sugeridas</h4>
      <div class="k-v"><span>Umbila</span><span>castanho quente</span></div>
      <div class="k-v"><span>Chanfuta</span><span>castanho escuro</span></div>
      <div class="k-v"><span>Pau-preto (só filete)</span><span>quase preto</span></div>
      <p class="peq" style="margin:3mm 0 0">Todas estáveis e correntes em Moçambique. Acabamento em
        óleo-cera mate — realça o veio sem o brilho de plástico do verniz. O pau-preto fica caro em
        perfil inteiro; como filete de 5 mm a contornar a moldura, custa pouco e destaca-se muito.</p>
    </div>
    <div class="caixa">
      <h4>Fixação à parede</h4>
      <p class="peq">Sarrafo francês (corte a 45° ao meio de um pinho 20 × 60 mm): meia peça
        aparafusada às costas do quadro a cerca de 100 mm do topo, a outra metade na parede,
        nivelada. Encaixa por gravidade, distribui o peso ao longo de 600 mm e ainda deixa acertar
        o quadro na horizontal depois de pendurado.</p>
      <p class="peq" style="margin:0">Em parede de tijolo, buchas de 8 mm. Dimensionar para 15 kg,
        com folga sobre os ${num(peso.total, 1)} kg calculados.</p>
    </div>
  </div>

  <div class="aviso" style="margin-top:6mm">
    <strong>Conservação — o ponto que mais importa.</strong> As notas nunca devem ser coladas,
    plastificadas, agrafadas nem perfuradas: só cantos transparentes de arquivo. Uma nota colada
    perde o valor de recordação e não se recupera. Evitar parede com sol directo, que tira a cor;
    se houver acrílico com filtro UV disponível, é a escolha certa.
  </div>`);

const p12 = pagina(12, 'Execução', `
  <h2 class="h-sec">Montagem, passo a passo</h2>
  <p class="lead">A ordem importa: a moldura acaba-se antes de entrarem os painéis, e as notas
    entram em último lugar, com as mãos limpas.</p>
  <ol class="passos">
    ${PASSOS.map(([t, d]) => `<li><div><strong>${esc(t)}</strong><p>${esc(d)}</p></div></li>`).join('')}
  </ol>`);

const p13 = pagina(13, 'Encerramento', `
  <h2 class="h-sec">Crescer com as viagens</h2>
  <p class="lead">O quadro nasce com ${DISTRIBUICAO.length} notas e ${LUGARES - DISTRIBUICAO.length} lugares
    vazios. Essa é a ideia: não é um quadro acabado, é um quadro a meio.</p>

  <div class="grid3">
    <div class="caixa">
      <h4>Acrescentar um país</h4>
      <p class="peq">Abrir as costas, colocar a nota com os cantos de arquivo, colar a placa gravada
        e fechar. Sem ferramentas especiais, sem desmontar a moldura.</p>
    </div>
    <div class="caixa">
      <h4>Quando os ${LUGARES} lugares acabarem</h4>
      <p class="peq">Um segundo quadro igual, ao lado do primeiro, fica melhor do que um quadro maior.
        As medidas deste dossier repetem-se tal e qual.</p>
    </div>
    <div class="caixa">
      <h4>Variantes possíveis</h4>
      <p class="peq">Grelha ${Q.linhas} × 5 (20 lugares) alarga o quadro para ${exteriorW + Q.janelaW + Q.intervaloX} mm.
        Placas em latão gravado em vez de acrílico. Fundo preto mate em vez de linho.</p>
    </div>
  </div>

  <h3 class="h-sub" style="margin-top:7mm">Resumo para a oficina</h3>
  <div class="grid2">
    <div class="caixa escura">
      <div class="k-v"><span>Medida exterior</span><span>${exteriorW} × ${exteriorH} mm</span></div>
      <div class="k-v"><span>Painel (acrílico, máscara, fundo)</span><span>${painelW} × ${painelH} mm</span></div>
      <div class="k-v"><span>Vão visível</span><span>${vistaW} × ${vistaH} mm</span></div>
      <div class="k-v"><span>Perfil da moldura</span><span>${Q.perfilLargura} × ${Q.perfilProfundidade} mm</span></div>
      <div class="k-v"><span>Rebaixo</span><span>${Q.rebaixoLargura} × ${Q.rebaixoProfundidade} mm</span></div>
      <div class="k-v"><span>Janelas</span><span>${LUGARES} × (${Q.janelaW} × ${Q.janelaH} mm)</span></div>
      <div class="k-v"><span>Peso estimado</span><span>≈ ${num(peso.total, 1)} kg</span></div>
    </div>
    <div class="caixa">
      <h4>O que falta decidir</h4>
      <p class="peq" style="margin-bottom:2mm">Quatro escolhas, todas do Professor:</p>
      <div class="k-v"><span>Madeira da moldura</span><span>umbila / chanfuta</span></div>
      <div class="k-v"><span>Fundo</span><span>linho / preto mate</span></div>
      <div class="k-v"><span>Placas</span><span>acrílico / latão</span></div>
      <div class="k-v"><span>Texto da placa de título</span><span>a definir</span></div>
    </div>
  </div>

  <h3 class="h-sub" style="margin-top:7mm">Fontes das dimensões das notas</h3>
  <ul class="fontes">
    ${FONTES.map((f) => `<li>${esc(f)}</li>`).join('')}
    <li>As imagens das notas são recortes da fotografia enviada pelo cliente. Não foram
      produzidas nem reproduzidas imagens de moeda para este dossier.</li>
  </ul>`);

const html = `<!DOCTYPE html>
<html lang="pt-MZ">
<head>
<meta charset="utf-8">
<title>Quadro de Recordações de Viagem — Projecto de execução</title>
<meta name="description" content="Projecto de execução de um quadro para expor uma nota de cada país visitado, preparado para o Professor Hwang Jorge.">
<style>${CSS}</style>
</head>
<body>
${p1}${p2}${p3}${p4}${p5}${p6}${p7}${p8}${p9}${p10}${p11}${p12}${p13}
</body>
</html>`;

// --- escrita e renderização ------------------------------------------------

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(HTML_PATH, html, 'utf8');
console.log(`HTML  → ${HTML_PATH.replace(ROOT + '/', '')} (${(html.length / 1024).toFixed(1)} KB)`);

if (!existsSync(CHROME)) {
  console.error(`\nChromium não encontrado em ${CHROME}. Defina CHROME_BIN para gerar o PDF.`);
  process.exit(1);
}

execFileSync(
  CHROME,
  [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    '--no-pdf-header-footer',
    '--allow-file-access-from-files',
    '--virtual-time-budget=20000',
    `--print-to-pdf=${PDF_PATH}`,
    pathToFileURL(HTML_PATH).href,
  ],
  { stdio: ['ignore', 'inherit', 'inherit'] }
);

console.log(`PDF   → ${PDF_PATH.replace(ROOT + '/', '')}`);
