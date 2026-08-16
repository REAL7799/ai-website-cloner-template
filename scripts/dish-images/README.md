# Fotografias dos pratos

Gera uma imagem por item da carta e recorta-lhe o fundo, para o prato assentar
sobre qualquer cor do site.

## Correr

```bash
# tudo: gerar + recortar
GEMINI_API_KEY=... node --experimental-strip-types scripts/dish-images/build.mjs

# só uma secção, para iterar depressa num prato que ficou mal
GEMINI_API_KEY=... node --experimental-strip-types scripts/dish-images/build.mjs --only sandes

# recortar outra vez sem gastar créditos (usa o que está em .dish-images-raw/)
node --experimental-strip-types scripts/dish-images/build.mjs --cutout-only
```

A chave nunca entra no repositório: vem do ambiente. `.dish-images-raw/` guarda
os PNG originais e está no `.gitignore` — serve de cache, por isso uma segunda
corrida não volta a pagar pelas imagens que já existem. Para forçar a repetição
de um prato, apaga o ficheiro correspondente dessa pasta.

## Como funciona

1. **A carta é a fonte única.** `src/content/menu.ts` dá a lista; cada item
   produz `public/images/pratos/<seccao>--<nome-do-prato>.webp`. A secção entra
   na chave porque "Omelete simples" existe duas vezes na carta — a sandes a
   5,90 € e o prato a 12,00 € — e sem isso partilhavam a mesma foto.

2. **Os prompts são específicos, não genéricos.** Estão em `prompts.mjs`, um
   por prato. Isto não é zelo excessivo: pedir "ham sandwich" a um modelo
   generalista devolve pão de forma americano, quando num café português a
   sandes vem em **papo-seco**. O mesmo vale para o galão no copo alto, o
   bitoque com arroz *e* batata, ou o arroz de pato com rodelas de chouriço e
   gomos de laranja. Ao acrescentar um prato à carta, acrescenta aqui a
   descrição — sem ela o resultado sai plausível mas errado.

3. **O fundo sai por flood fill a partir das bordas**, não por "apagar tudo o
   que é claro". A distinção importa: o arroz, a clara do ovo e a louça branca
   são claros e têm de ficar. Só o branco ligado à moldura é fundo. A fronteira
   leva um anel de meia-transparência para não serrilhar.

4. **Se o recorte falhar, a imagem é guardada na mesma**, com fundo, e o script
   avisa. Mais vale uma foto com fundo do que um buraco no site.

## Depois de gerar

`src/content/dish-images.ts` é reescrito com a lista do que existe. Um item da
carta sem ficheiro não fica partido: o site desenha um marcador gráfico e a
linha deixa de ser clicável.

## Modelo

Por omissão usa `gemini-2.5-flash-image` — o modelo a que a Google chama
**Nano Banana**. Trocar com `GEMINI_MODEL`:

| Modelo | Quando usar |
| --- | --- |
| `gemini-2.5-flash-image` | omissão. Nano Banana. Barato e suficiente |
| `gemini-3.1-flash-image` | geração mais recente da mesma classe |
| `gemini-3-pro-image` | Nano Banana **Pro**. Mais caro, melhor detalhe fino |

```bash
GEMINI_MODEL=gemini-3-pro-image GEMINI_API_KEY=... \
  node --experimental-strip-types scripts/dish-images/build.mjs
```

## Custo e limites

Cerca de 0,04 € por imagem no modelo por omissão — uns 2,70 € pela carta
completa. O Pro anda pelos 0,13–0,24 € por imagem, ou seja 9 a 16 € pela carta.

Se os créditos pré-pagos acabarem, **todos** os modelos de imagem respondem
`429 RESOURCE_EXHAUSTED` com "prepayment credits are depleted" — o limite é do
saldo da conta, não do modelo, por isso trocar de modelo não contorna nada. O
script pára com essa mensagem em vez de insistir e gastar tempo. Carregar em
<https://ai.studio/projects>.

## Nota sobre estas imagens

São recriações a partir da carta impressa, não fotografias dos pratos que saem
desta cozinha — o site assinala-as como "fotografia ilustrativa". Servem para
lançar, mas devem dar lugar a fotografias reais assim que existirem. Fachada,
interior e balcão nunca devem ser gerados: são um lugar concreto e qualquer
imagem inventada seria falsa.
