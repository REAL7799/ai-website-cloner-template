# Doce Alma — Design Tokens

Site original (não é clone). Tokens definidos em `src/app/globals.css` (oklch).

## Cores

| Token | Valor (oklch) | Uso |
|---|---|---|
| `--background` | `0.966 0.014 85` | Fundo creme quente |
| `--foreground` | `0.31 0.04 48` | Texto — castanho chocolate |
| `--card` | `0.986 0.01 88` | Cartões, quase branco quente |
| `--primary` | `0.52 0.092 58` | Caramelo — botões, links, destaques |
| `--secondary` | `0.928 0.022 84` | Faixas de secção, chips |
| `--muted-foreground` | `0.5 0.038 55` | Texto secundário |
| `--accent` | `0.545 0.085 8` | Baga/rosa seco — badges "Favorito" |
| `--border` | `0.885 0.022 80` | Linhas e contornos |

Verde WhatsApp `#25D366` usado apenas nos CTAs de WhatsApp.

## Tipografia

- **Títulos**: Fraunces (via `next/font/google`, eixo `opsz`), `--font-heading`, aplicada a h1–h3.
- **Corpo**: Inter, `--font-sans`.
- Eyebrows: 14px, semibold, tracking 0.18em, uppercase, cor primary.

## Forma e espaço

- `--radius: 0.8rem`; cartões usam `rounded-3xl`/`rounded-4xl`, CTAs `rounded-full`.
- Secções: `py-20 sm:py-28`; container `max-w-6xl px-4 sm:px-6`.
- Sombras suaves com tinta primária (`shadow-primary/10`).

## Movimento

- Entrada ao scroll: `.reveal` (IntersectionObserver em `components/site/reveal.tsx`),
  translateY 22px + fade 0.7s, escalonado com `--reveal-delay`.
- Hero: `animate-in` (tw-animate-css). Hovers: lift −4px + zoom de imagem 1.04.
- `prefers-reduced-motion` desativa tudo.

## Imagens

- Ilustrações editoriais coesas em `public/images/` (paleta acima).
- Substituíveis por fotografia IA com `npm run images:ai` (ver `scripts/generate-images.mjs`) —
  mesmos nomes de ficheiro, o código não muda.
