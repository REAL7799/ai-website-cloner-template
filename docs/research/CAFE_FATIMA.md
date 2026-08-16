# Café Fátima — fontes e pontos por confirmar

Notas de origem dos dados usados no site. Serve de checklist para a reunião com
o proprietário antes de pôr o site online.

## Fonte dos dados

| Dado | Origem | Estado |
| --- | --- | --- |
| Nome, morada, plus code | Ficha do Google Maps | Confirmado |
| Avaliação 4,0 · 207 críticas | Ficha do Google Maps | Confirmado (muda com o tempo) |
| Preço médio 10 – 15 € / pessoa | Ficha do Google Maps | Confirmado |
| Horário 08:00 – 00:00, sete dias | Ficha do Google Maps | Confirmado |
| Serviço "comer no local" | Ficha do Google Maps | Confirmado |
| "desde 1952" | Logótipo da carta impressa | Confirmado |
| Ementa completa e preços | Fotografias da carta impressa (2026) | Ver secção seguinte |
| Alergénios 1–14 | Mapa de alergénios da carta | Confirmado |

O Google Maps **não tem telefone nem website** associados ao Café Fátima. Ambos
os campos estão preparados no código (`src/content/site.ts`) e aparecem no site
assim que forem preenchidos.

## Por confirmar com o proprietário

1. **Telefone.** Está `+351 xxxxxxxxx` como marcador visível, a pedido. Assim
   que houver o número real, substituir `site.phone` e pôr
   `site.phoneIsPlaceholder: false` — só aí é que o número passa a link de
   chamada e entra nos dados estruturados. Enquanto for marcador, fica texto
   simples: um `tel:` para um número falso é pior do que não ter link nenhum.
2. **Domínio.** `site.url` está com `https://cafefatima.pt` como valor de
   trabalho — trocar pelo domínio real antes do lançamento, porque alimenta o
   canonical, o sitemap e os dados estruturados.
3. **Preços com leitura ambígua.** Marcados no código com `needsCheck: true`:
   - Chá / English tea — 2,00 €
   - Chá com leite / Tea w/ milk — 2,50 €
   - Água com gás 1,5 l — 4,50 €
   - Bacalhau à Brás — 12,00 € (preço tapado por reflexo na fotografia)
   - Branco do Alentejo — 15,00 € (a carta lê-se "Vinho Tinto - Alentejo /
     White Wine"; assumiu-se branco)
4. **Sandes de atum na secção "vegetarianas".** É assim que está na carta
   impressa. Foi mantido igual para não contradizer o menu do café, mas vale a
   pena corrigir na próxima reimpressão — atum não é vegetariano e um cliente
   com essa exigência pode reclamar.
5. **Fotografias dos pratos — recriadas, não reais.** As 68 imagens em
   `public/images/pratos/` foram geradas por IA a partir da carta impressa, a
   pedido do cliente. Correspondem aos pratos e às porções da casa, mas **não
   são fotografias da comida que sai desta cozinha**. O site assinala-as como
   "fotografia ilustrativa" junto de cada uma.

   Isto é aceitável como ponto de partida e é prática corrente na restauração,
   mas convém substituí-las por fotografias verdadeiras assim que possível —
   um cliente que compare o prato com a imagem nota a diferença, e a confiança
   de um café com setenta e quatro anos vale mais do que a comodidade.

   Ficam a faltar, e essas não se recriam: **fachada, interior, balcão e
   esplanada**. São um lugar real e concreto; qualquer imagem gerada seria uma
   invenção. O layout tem espaço reservado para elas.

   As imagens estão **recortadas**, com fundo transparente, para o prato
   assentar sobre qualquer cor do site — creme nos destaques, disco claro no
   hero, como na carta impressa. A primeira ronda tinha cenários de café atrás
   e erros de conteúdo (a sandes de fiambre saiu em pão de forma quando numa
   casa portuguesa vem em papo-seco); ambos corrigidos com prompts específicos
   por prato em `scripts/dish-images/prompts.mjs`.

   Para regenerar ou acrescentar imagens: o nome do ficheiro é
   `<id-da-seccao>--<nome-do-prato>.webp` (ver `src/lib/dish-slug.ts`) e a
   lista do que existe está em `src/content/dish-images.ts`, gerada
   automaticamente. Um item sem ficheiro não fica partido — mostra um marcador
   gráfico e deixa de ser clicável.
6. **Password do Wi-Fi.** Está impressa na carta, mas não foi para o site —
   publicá-la na internet é diferente de a dar a quem se senta. O site anuncia
   apenas "Wi-Fi grátis".

## Estrutura do site

- `/pt` e `/en` — mesma estrutura, conteúdo traduzido.
- `/` redireciona conforme o `Accept-Language` do visitante, via `redirects()`
  no `next.config.ts`. Não é um `proxy.ts` de propósito: em Next 16 o Proxy
  corre sempre no runtime Node, e adaptadores como o OpenNext para Cloudflare
  Workers não suportam middleware Node. Como redirect de configuração,
  funciona em qualquer alojamento.
- `/[lang]/menu` — carta completa, com nome do prato na língua escolhida e a
  tradução em itálico por baixo, como na carta impressa.
- Dados estruturados `CafeOrCoffeeShop` + `Menu` (`src/components/json-ld.tsx`),
  para o café aparecer melhor nas pesquisas locais e nos assistentes de IA.
