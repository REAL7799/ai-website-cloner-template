# Fátima Cake 🎂

Site da pastelaria artesanal **Fátima Cake** — bolos de aniversário, bolos de
casamento e tartes tradicionais por encomenda via WhatsApp.

Construído com **Next.js 16** (App Router, React 19, TypeScript strict),
**Tailwind CSS v4** (tokens oklch), **shadcn/ui (Base UI)** e **GSAP**
(ScrollTrigger) para as animações de scroll.

## Destaques

- **Hero** com vídeo do bolo a girar (1080p, 736 KB), fonte manuscrita Caveat
  e parallax de scroll
- **Vitrine** com 10 produtos, filtros por categoria e encomenda direta pelo
  WhatsApp com mensagem pré-preenchida
- **Explosão de chocolate** — secção com ingredientes que "explodem" do bolo
  ao fazer scroll
- Separadores em forma de cobertura a escorrer entre secções
- SEO completo: metadata OG/Twitter, JSON-LD (`Bakery`), `sitemap.xml`,
  `robots.txt`, `llms.txt`
- Acessibilidade: `prefers-reduced-motion` respeitado em todas as animações
  (incluindo o vídeo), contrastes AA, navegação por teclado

## Comandos

```bash
npm run dev        # Servidor de desenvolvimento
npm run build      # Build de produção
npm run check      # Lint + typecheck + build
```

## Personalização

| O quê                       | Onde                                   |
| --------------------------- | -------------------------------------- |
| Contactos, morada, WhatsApp | `src/lib/site.ts` (⚠️ dados fictícios) |
| Produtos e preços           | `src/lib/products.ts`                  |
| Paleta de cores             | `src/app/globals.css` (tokens oklch)   |
| Secções da página           | `src/components/site/`                 |

### Analytics (opcional)

Define as variáveis de ambiente para ativar o rastreamento:

- `NEXT_PUBLIC_GA_ID` — Google Analytics 4 (ex.: `G-XXXXXXXXXX`)
- `NEXT_PUBLIC_META_PIXEL_ID` — Meta Pixel

### Assets gerados

As imagens e o vídeo foram gerados por IA (Higgsfield) e otimizados
(WebP/H.264) pelo workflow `.github/workflows/fetch-assets.yml`, que corre o
`scripts/fetch-assets.sh` e faz commit do resultado em `public/`. Podes
removê-los quando já não for preciso regenerar mídia.

---

Baseado no template [ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template) (MIT).
