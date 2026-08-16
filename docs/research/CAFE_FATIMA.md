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
5. **Fotografias.** O site foi desenhado sem fotos de pratos de propósito: só
   existem as fotos da carta plastificada e não se devem inventar imagens de
   comida que não é a da casa. Com meia dúzia de fotos reais (fachada, balcão,
   arroz de pato, bitoque, esplanada) a homepage ganha muito.
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
