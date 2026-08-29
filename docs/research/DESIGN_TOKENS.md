# Kitty Flowers — Design Tokens

Landing page criada de raiz para a marca **Kitty Flowers** (Lisboa · Prior Velho),
a partir da identidade visual do Instagram [@kittyflowers20](https://instagram.com/kittyflowers20).

## Direção visual

Paleta **rosa e branco** derivada do logo da marca (círculo rosa blush com serif
rosewood), com um acento **dourado** inspirado nas borboletas metálicas usadas nos
buquês. Estilo: romântico, delicado, premium-artesanal.

## Cores (oklch)

| Token | Valor | Uso |
| --- | --- | --- |
| `--background` | `oklch(0.994 0.006 350)` | Fundo geral (branco quente rosado) |
| `--foreground` | `oklch(0.3 0.06 355)` | Texto principal (ameixa profundo) |
| `--primary` | `oklch(0.62 0.17 3)` | CTA rosa vivo |
| `--primary-foreground` | `oklch(0.99 0.01 350)` | Texto sobre CTA |
| `--secondary` / `--muted` | `oklch(0.955 0.022 350)` | Secções blush |
| `--muted-foreground` | `oklch(0.5 0.05 355)` | Texto secundário |
| `--accent-gold` | `oklch(0.78 0.11 85)` | Borboletas, detalhes dourados |
| `--border` | `oklch(0.91 0.025 350)` | Bordas suaves |
| `--rose-deep` | `oklch(0.48 0.14 5)` | Títulos de destaque (rosewood) |

## Tipografia (Google Fonts via next/font)

| Papel | Fonte | Notas |
| --- | --- | --- |
| Display / títulos | **Playfair Display** | Serif elegante, ecoa o serif do logo |
| Palavras-flourish | **Great Vibes** | Script caligráfico para acentos românticos |
| Corpo / UI | **Poppins** | 300–600, legível e suave |

## Espaçamento e forma

- Secções: `py-20 md:py-28`; container `max-w-6xl`
- Radius: cards `rounded-3xl`, botões `rounded-full` (pill)
- Sombras: rosadas e difusas — `shadow-[0_20px_60px_-15px_oklch(0.62_0.17_3/0.25)]`

## Animações (leves, CSS-first)

- Pétalas a cair no hero (transform GPU, 10 elementos, `prefers-reduced-motion` respeitado)
- Reveal on-scroll via IntersectionObserver (fade + translateY 24px)
- Marquee contínuo de palavras da marca
- Float suave nos cards do hero e borboletas
- Carrossel com scroll-snap + auto-play pausável

## Assets reais

17 fotografias reais dos buquês extraídas do Instagram da marca
(`public/images/*.webp`, 370–388×517) + logo circular (`logo-kitty-flowers.png`).

## Contactos da marca

- WhatsApp: **+351 931 420 039** → `https://wa.me/351931420039`
- Instagram: **@kittyflowers20**
- Facebook: **Larissa Cambaza**
- Local: **Lisboa — Prior Velho** (encomendas por DM)
