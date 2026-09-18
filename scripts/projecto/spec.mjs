/**
 * Quadro de Recordações de Viagem — Professor Hwang Jorge
 * Fonte única de verdade do projecto: notas identificadas, geometria do quadro,
 * lista de corte e materiais. Todos os desenhos e tabelas do PDF derivam daqui.
 *
 * Unidades: milímetros (mm), salvo indicação em contrário.
 */

// ---------------------------------------------------------------------------
// 1. A colecção fotografada — notas identificadas
//    `crop` é um recorte da fotografia original do cliente (nada é recriado).
//    `w`/`h` são as dimensões reais de cada nota, conforme fontes citadas.
// ---------------------------------------------------------------------------

export const NOTAS = [
  {
    id: 'mz-100',
    pais: 'Moçambique',
    iso: 'MZ',
    moeda: 'Metical',
    denominacao: '100 Meticais',
    w: 144,
    h: 65,
    serie: 'Série 2011 · polímero',
    face: 'Verso',
    motivo: 'Família de girafas na savana; legenda «CEM METICAIS»',
    emissor: 'Banco de Moçambique',
    cor: '#c2624f',
    crop: 'mz-100.jpg',
    cropAR: 3.041, // proporção do recorte da foto (pode ser parcial)
  },
  {
    id: 'za-200',
    pais: 'África do Sul',
    iso: 'ZA',
    moeda: 'Rand',
    denominacao: '200 Rand',
    w: 152,
    h: 70,
    serie: 'Série Mandela',
    face: 'Frente',
    motivo: 'Retrato de Nelson Mandela; «TWO HUNDRED RAND»',
    emissor: 'South African Reserve Bank',
    cor: '#d98634',
    crop: 'za-200.jpg',
    cropAR: 2.653, // proporção do recorte da foto (pode ser parcial)
  },
  {
    id: 'za-100',
    pais: 'África do Sul',
    iso: 'ZA',
    moeda: 'Rand',
    denominacao: '100 Rand',
    w: 146,
    h: 70,
    serie: 'Série Mandela',
    face: 'Frente',
    motivo: 'Retrato de Nelson Mandela; «ONE HUNDRED RAND»',
    emissor: 'South African Reserve Bank',
    cor: '#5b6fae',
    crop: 'za-100.jpg',
    cropAR: 2.59, // proporção do recorte da foto (pode ser parcial)
  },
  {
    id: 'bw-100',
    pais: 'Botsuana',
    iso: 'BW',
    moeda: 'Pula',
    denominacao: '100 Pula',
    w: 150,
    h: 75,
    serie: 'Série 2009 e seguintes',
    face: 'Frente',
    motivo: 'Os três Dikgosi (Khama III, Sebele I, Bathoen I)',
    emissor: 'Bank of Botswana',
    cor: '#6fa8c4',
    crop: 'bw-100.jpg',
    cropAR: 3.449, // proporção do recorte da foto (pode ser parcial)
  },
  {
    id: 'kr-50000',
    pais: 'Coreia do Sul',
    iso: 'KR',
    moeda: 'Won',
    denominacao: '50 000 Won',
    w: 154,
    h: 68,
    serie: 'Emitida desde 2009',
    face: 'Frente',
    motivo: 'Retrato de Shin Saimdang',
    emissor: 'Bank of Korea',
    cor: '#e6c15a',
    crop: 'kr-50000.jpg',
    cropAR: 2.265, // proporção do recorte da foto (pode ser parcial)
  },
  {
    id: 'kr-5000',
    pais: 'Coreia do Sul',
    iso: 'KR',
    moeda: 'Won',
    denominacao: '5 000 Won',
    w: 142,
    h: 68,
    serie: 'Emitida desde 2006',
    face: 'Frente',
    motivo: 'Retrato de Yi I (Yulgok)',
    emissor: 'Bank of Korea',
    cor: '#e39a86',
    crop: 'kr-5000.jpg',
    cropAR: 2.338, // proporção do recorte da foto (pode ser parcial)
  },
  {
    id: 'us-1',
    pais: 'Estados Unidos',
    iso: 'US',
    moeda: 'Dólar',
    denominacao: '1 Dólar',
    w: 156,
    h: 66,
    serie: 'Federal Reserve Note',
    face: 'Frente',
    motivo: 'Retrato de George Washington',
    emissor: 'Federal Reserve',
    cor: '#9fae8e',
    crop: 'us-1.jpg',
    cropAR: 2.36, // proporção do recorte da foto (pode ser parcial)
  },
];

// ---------------------------------------------------------------------------
// 2. Geometria do quadro — tudo derivado das dimensões reais das notas
// ---------------------------------------------------------------------------

/** Maior largura e maior altura de toda a colecção. Define a janela universal. */
export const MAIOR_LARGURA = Math.max(...NOTAS.map((n) => n.w)); // 156 (EUA)
export const MAIOR_ALTURA = Math.max(...NOTAS.map((n) => n.h)); // 75 (Botsuana)

export const Q = {
  // Janela universal — serve qualquer nota da colecção e praticamente
  // qualquer nota do mundo (a esmagadora maioria mede <= 160 x 80 mm).
  janelaW: 166,
  janelaH: 86,

  // Faixa da placa de identificação, por baixo de cada janela
  placaFaixa: 22,
  placaW: 62,
  placaH: 14,

  // Grelha
  colunas: 4,
  linhas: 4,
  intervaloX: 20,
  intervaloY: 22,

  // Margens dentro do vão visível
  margemLateral: 48,
  faixaTitulo: 96, // topo, para a placa de título
  margemInferior: 56,

  // Perfil da moldura
  perfilLargura: 45,
  perfilProfundidade: 38,
  rebaixoLargura: 12,
  rebaixoProfundidade: 20,

  // Camadas, da frente para trás
  espAcrilico: 3,
  espMascara: 3,
  espFundo: 6,
  espCostas: 6,
};

export const celulaW = Q.janelaW;
export const celulaH = Q.janelaH + Q.placaFaixa; // 108

export const grelhaW = Q.colunas * celulaW + (Q.colunas - 1) * Q.intervaloX; // 724
export const grelhaH = Q.linhas * celulaH + (Q.linhas - 1) * Q.intervaloY; // 498

/**
 * Painel = medida do acrílico, da máscara e do fundo. É também a medida do
 * rebaixo, porque é dentro do rebaixo que os painéis assentam.
 */
export const painelW = grelhaW + 2 * Q.margemLateral; // 820
export const painelH = grelhaH + Q.faixaTitulo + Q.margemInferior; // 650

/**
 * Vão visível (sight size) = o que realmente se vê. É menor que o painel,
 * porque a aba da moldura cobre `rebaixoLargura` mm em cada bordo.
 */
export const vistaW = painelW - 2 * Q.rebaixoLargura; // 796
export const vistaH = painelH - 2 * Q.rebaixoLargura; // 626

/**
 * Exterior = vão visível + a largura da face da moldura dos dois lados.
 * Equivale a painel + 2 x (perfil - aba), porque a aba sobrepõe-se ao painel.
 */
export const exteriorW = vistaW + 2 * Q.perfilLargura; // 886
export const exteriorH = vistaH + 2 * Q.perfilLargura; // 716

/** Quanto a moldura avança para dentro do painel, de cada lado. */
export const abaVisivel = Q.perfilLargura - Q.rebaixoLargura; // 33

export const LUGARES = Q.colunas * Q.linhas; // 16

/** Canto superior esquerdo de cada janela, medido no painel do vão visível. */
export function posicaoJanela(indice) {
  const col = indice % Q.colunas;
  const lin = Math.floor(indice / Q.colunas);
  return {
    x: Q.margemLateral + col * (celulaW + Q.intervaloX),
    y: Q.faixaTitulo + lin * (celulaH + Q.intervaloY),
    col,
    lin,
  };
}

/** Distribuição proposta: Moçambique em lugar de honra, depois a região austral. */
export const DISTRIBUICAO = ['mz-100', 'za-200', 'za-100', 'bw-100', 'kr-50000', 'kr-5000', 'us-1'];

// ---------------------------------------------------------------------------
// 3. Materiais, lista de corte e ferragens
// ---------------------------------------------------------------------------

export const CAMADAS = [
  {
    n: 1,
    nome: 'Acrílico transparente (ou vidro)',
    esp: Q.espAcrilico,
    dim: `${painelW} × ${painelH}`,
    papel: 'Protege as notas do pó e do manuseamento. Acrílico é mais leve e não estilhaça.',
  },
  {
    n: 2,
    nome: 'Máscara / passe-partout',
    esp: Q.espMascara,
    dim: `${painelW} × ${painelH}`,
    papel: `MDF lacado mate ou cartão de museu, com ${LUGARES} janelas de ${Q.janelaW} × ${Q.janelaH} mm.`,
  },
  {
    n: 3,
    nome: 'As notas',
    esp: 0.1,
    dim: 'variável',
    papel: 'Fixadas ao fundo com cantos transparentes de arquivo — nunca com cola ou fita.',
  },
  {
    n: 4,
    nome: 'Fundo forrado',
    esp: Q.espFundo,
    dim: `${painelW} × ${painelH}`,
    papel: 'MDF forrado a linho natural (ou lacado mate). É o fundo que se vê nas janelas.',
  },
  {
    n: 5,
    nome: 'Costas amovíveis',
    esp: Q.espCostas,
    dim: `${painelW - 2} × ${painelH - 2}`,
    papel: 'MDF preso por molas de quadro viráveis — abre para trocar ou acrescentar notas.',
  },
];

export const espessuraTotalCamadas =
  Q.espAcrilico + Q.espMascara + Q.espFundo + Q.espCostas; // 18

export const LISTA_CORTE = [
  {
    ref: 'A1',
    peca: 'Travessas da moldura (superior e inferior)',
    material: `Madeira maciça, perfil ${Q.perfilLargura} × ${Q.perfilProfundidade} mm com rebaixo ${Q.rebaixoLargura} × ${Q.rebaixoProfundidade} mm`,
    medida: `${exteriorW} mm (medida exterior)`,
    qt: 2,
    nota: 'Esquadria a 45° nas duas pontas.',
  },
  {
    ref: 'A2',
    peca: 'Montantes da moldura (laterais)',
    material: `Madeira maciça, mesmo perfil`,
    medida: `${exteriorH} mm (medida exterior)`,
    qt: 2,
    nota: 'Esquadria a 45° nas duas pontas.',
  },
  {
    ref: 'B',
    peca: 'Vidro de protecção',
    material: 'Acrílico transparente 3 mm (preferível) ou vidro 3 mm',
    medida: `${painelW} × ${painelH} mm`,
    qt: 1,
    nota: 'Cantos ligeiramente boleados se for acrílico.',
  },
  {
    ref: 'C',
    peca: 'Máscara com janelas',
    material: 'MDF 3 mm lacado mate, ou cartão de museu 3 mm',
    medida: `${painelW} × ${painelH} mm`,
    qt: 1,
    nota: `${LUGARES} janelas de ${Q.janelaW} × ${Q.janelaH} mm (ver mapa de furação).`,
  },
  {
    ref: 'D',
    peca: 'Fundo',
    material: 'MDF 6 mm, forrado a linho natural',
    medida: `${painelW} × ${painelH} mm`,
    qt: 1,
    nota: 'Forrar antes de montar; dobrar o tecido para trás e agrafar.',
  },
  {
    ref: 'E',
    peca: 'Costas amovíveis',
    material: 'MDF 6 mm',
    medida: `${painelW - 2} × ${painelH - 2} mm`,
    qt: 1,
    nota: '1 mm de folga em cada lado para entrar e sair sem esforço.',
  },
  {
    ref: 'F',
    peca: 'Sarrafo francês de parede',
    material: 'Pinho 20 × 60 mm, cortado ao meio a 45° no comprimento',
    medida: '600 mm',
    qt: 2,
    nota: 'Uma metade no quadro, a outra na parede.',
  },
  {
    ref: 'G',
    peca: 'Placas de identificação dos países',
    material: 'Acrílico 2 mm gravado a laser (ou latão gravado)',
    medida: `${Q.placaW} × ${Q.placaH} mm`,
    qt: LUGARES,
    nota: 'Nome do país + denominação. Coladas com fita dupla-face fina.',
  },
  {
    ref: 'H',
    peca: 'Placa de título',
    material: 'Mesmo material das placas G',
    medida: '240 × 30 mm',
    qt: 1,
    nota: 'Centrada na faixa superior.',
  },
];

export const FERRAGENS = [
  { item: 'Molas de quadro viráveis + parafusos 10 mm', qt: '12 un.' },
  { item: 'Cantos transparentes de arquivo para as notas', qt: `${LUGARES * 4} un. (1 caixa)` },
  { item: 'Cola branca PVA para as esquadrias', qt: '1 un.' },
  { item: 'Gramponetes ou cavilhas de reforço das esquadrias', qt: '4 un.' },
  { item: 'Linho natural para forrar o fundo', qt: '1,00 × 0,80 m' },
  { item: 'Fita dupla-face fina para as placas', qt: '1 rolo' },
  { item: 'Óleo-cera ou verniz mate para a madeira', qt: '250 ml' },
  { item: 'Parafusos e buchas para o sarrafo de parede', qt: '4 un.' },
];

/** Densidades usadas no cálculo do peso (kg/m³). */
const DENS = { acrilico: 1190, mdf: 750, madeira: 620 };

/** Peso estimado, calculado a partir dos materiais e dimensões acima. */
export function pesoEstimado() {
  const m2 = (painelW / 1000) * (painelH / 1000);
  const areaJanelas = (LUGARES * (Q.janelaW / 1000) * (Q.janelaH / 1000));
  const acrilico = m2 * (Q.espAcrilico / 1000) * DENS.acrilico;
  const mascara = (m2 - areaJanelas) * (Q.espMascara / 1000) * DENS.mdf;
  const fundo = m2 * (Q.espFundo / 1000) * DENS.mdf;
  const costas = m2 * (Q.espCostas / 1000) * DENS.mdf;
  const perimetro = (2 * (exteriorW + exteriorH)) / 1000;
  const seccao =
    (Q.perfilLargura * Q.perfilProfundidade - Q.rebaixoLargura * Q.rebaixoProfundidade) / 1e6;
  const moldura = perimetro * seccao * DENS.madeira;
  const total = acrilico + mascara + fundo + costas + moldura;
  return { acrilico, mascara, fundo, costas, moldura, total };
}

// ---------------------------------------------------------------------------
// 4. Fontes das dimensões das notas (verificáveis, nada foi inventado)
// ---------------------------------------------------------------------------

export const FONTES = [
  'Moçambique, 100 Meticais (2011, polímero) — 144 × 65 mm. Catálogo SCWPM #151 / TBB #B236a.',
  'África do Sul, 100 e 200 Rand (série Mandela) — 146 × 70 mm e 152 × 70 mm. South African Reserve Bank.',
  'Botsuana, 100 Pula (série 2009) — 150 × 75 mm. Bank of Botswana / catálogos numismáticos.',
  'Coreia do Sul, 50 000 e 5 000 Won — 154 × 68 mm e 142 × 68 mm. Bank of Korea.',
  'Estados Unidos, 1 Dólar — 156 × 66,3 mm (6,14 × 2,61 pol.). Bureau of Engraving and Printing.',
];
