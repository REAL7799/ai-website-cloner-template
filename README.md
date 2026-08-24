# Annelux — Estética e Bem-Estar

Site institucional da **Annelux**, salão de estética especializado em unhas e
pestanas em Fátima (Ourém, Portugal). Construído com Next.js 16, React 19,
Tailwind CSS v4 e TypeScript.

## Desenvolvimento

```bash
npm install
npm run dev        # servidor de desenvolvimento
npm run check      # lint + typecheck + build
```

## Onde editar conteúdo

- **Todo o conteúdo** (nome, contactos, horários, serviços, depoimentos, FAQ,
  galeria) está centralizado em `src/lib/site-config.ts`.
- **Cores e tipografia** em `src/app/globals.css` (tokens oklch) e
  `src/app/layout.tsx` (fontes Google: Cormorant Garamond + Jost).
- **Imagens** em `public/images/` (geradas por IA — substituir por fotos reais
  do salão quando disponíveis, mantendo os mesmos nomes de ficheiro).

## Antes de publicar

- [ ] Confirmar os **horários** em `src/lib/site-config.ts` (valores provisórios).
- [ ] Substituir os **depoimentos de exemplo** por avaliações reais do Google Maps.
- [ ] Atualizar o **Instagram** (`instagramUrl`/`instagramHandle`) com o perfil real.
- [ ] Trocar `url` pelo domínio final quando existir.
- [ ] (Opcional) Adicionar o vídeo do hero — ver `docs/HERO_VIDEO.md`.

## Vídeo do hero

O hero usa `public/images/hero.webp` como fallback e reproduz automaticamente
`public/videos/hero.mp4` quando o ficheiro existir. O prompt para gerar o vídeo
no Google Flow (Veo) está em [`docs/HERO_VIDEO.md`](docs/HERO_VIDEO.md).

## Deploy

Pensado para a [Vercel](https://vercel.com): importar o repositório e publicar —
sem variáveis de ambiente necessárias.
