# Café Fátima — fontes e pontos por confirmar

Notas de origem dos dados usados no site. Serve de checklist para a reunião com
o proprietário antes de pôr o site online.

## Fonte dos dados

| Dado | Origem | Estado |
| --- | --- | --- |
| Nome, morada, plus code | Ficha do Google Maps | Confirmado |
| Avaliação 4,0 · 207 críticas | Ficha do Google Maps | Confirmado (muda com o tempo) |
| Preço médio 10 – 15 € / pessoa | Ficha do Google Maps | Confirmado |
| Fecho às 00:00 | Ficha do Google Maps | Confirmado |
| Serviço "comer no local" | Ficha do Google Maps | Confirmado |
| "desde 1952" | Logótipo da carta impressa | Confirmado |
| Ementa completa e preços | Fotografias da carta impressa (2026) | Ver secção seguinte |
| Alergénios 1–14 | Mapa de alergénios da carta | Confirmado |

O Google Maps **não tem telefone nem website** associados ao Café Fátima. Ambos
os campos estão preparados no código (`src/content/site.ts`) e aparecem no site
assim que forem preenchidos.

## Por confirmar com o proprietário

1. **Hora de abertura.** Só o fecho (00:00) está confirmado. O gráfico de horas
   populares do Maps sugere movimento a partir das 06:00, mas não serve de prova.
   Campo: `site.hours.opens`.
2. **Telefone.** Campo: `site.phone` (`null` esconde o cartão de contacto).
3. **Domínio.** `site.url` está com `https://cafefatima.pt` como valor de
   trabalho — trocar pelo domínio real antes do lançamento, porque alimenta o
   canonical, o sitemap e os dados estruturados.
4. **Preços com leitura ambígua.** Marcados no código com `needsCheck: true`:
   - Chá / English tea — 2,00 €
   - Chá com leite / Tea w/ milk — 2,50 €
   - Água com gás 1,5 l — 4,50 €
   - Bacalhau à Brás — 12,00 € (preço tapado por reflexo na fotografia)
   - Branco do Alentejo — 15,00 € (a carta lê-se "Vinho Tinto - Alentejo /
     White Wine"; assumiu-se branco)
5. **Sandes de atum na secção "vegetarianas".** É assim que está na carta
   impressa. Foi mantido igual para não contradizer o menu do café, mas vale a
   pena corrigir na próxima reimpressão — atum não é vegetariano e um cliente
   com essa exigência pode reclamar.
6. **Fotografias.** O site foi desenhado sem fotos de pratos de propósito: só
   existem as fotos da carta plastificada e não se devem inventar imagens de
   comida que não é a da casa. Com meia dúzia de fotos reais (fachada, balcão,
   arroz de pato, bitoque, esplanada) a homepage ganha muito.
7. **Password do Wi-Fi.** Está impressa na carta, mas não foi para o site —
   publicá-la na internet é diferente de a dar a quem se senta. O site anuncia
   apenas "Wi-Fi grátis".

## Estrutura do site

- `/pt` e `/en` — mesma estrutura, conteúdo traduzido.
- `/` redireciona conforme o `Accept-Language` do visitante (`src/proxy.ts`).
- `/[lang]/menu` — carta completa, com nome do prato na língua escolhida e a
  tradução em itálico por baixo, como na carta impressa.
- Dados estruturados `CafeOrCoffeeShop` + `Menu` (`src/components/json-ld.tsx`),
  para o café aparecer melhor nas pesquisas locais e nos assistentes de IA.
