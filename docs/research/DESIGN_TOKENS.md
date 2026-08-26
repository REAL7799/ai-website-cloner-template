# Doce Alma — Design Tokens

Site original (não é clone). Tokens definidos em `src/app/globals.css` (oklch).

## Cores (v2 — palco escuro)

O site assume o tema escuro como identidade: um palco de carvão quente onde a
fotografia dos doces é a protagonista.

| Token | Valor (oklch) | Uso |
|---|---|---|
| `--background` | `0.165 0.012 55` | Fundo — carvão quente, quase preto |
| `--foreground` | `0.945 0.014 85` | Texto — creme |
| `--card` | `0.205 0.016 55` | Cartões |
| `--primary` | `0.755 0.095 70` | Caramelo dourado — botões, destaques |
| `--secondary` | `0.24 0.02 55` | Faixas de secção, chips |
| `--muted-foreground` | `0.68 0.028 75` | Texto secundário |
| `--accent` | `0.7 0.088 10` | Baga clara — badges "Favorito" |
| `--border` | `1 0 0 / 12%` | Linhas e contornos |

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
