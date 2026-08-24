# Animação do Hero — Google Flow (Veo)

O hero do site já está preparado para vídeo: mostra a imagem `public/images/hero.webp`
e, assim que existir o ficheiro `public/videos/hero.mp4`, passa a reproduzi-lo
automaticamente (autoplay, sem som, em loop, com fallback para a imagem).

## Prompt principal (colar no Google Flow)

> Cinematic macro beauty shot in slow motion. Elegant female hands with flawless
> nude almond-shaped gel nails rest gently on flowing ivory silk fabric. The silk
> ripples softly as if touched by a gentle breeze; a few delicate white orchid
> petals drift slowly across the frame. Warm champagne-gold bokeh lights shimmer
> and float in the softly blurred background. The camera performs a very slow,
> smooth dolly-in with subtle parallax. Golden-hour side lighting, soft shadows,
> luxurious minimal spa aesthetic, editorial beauty commercial style,
> photorealistic, shallow depth of field. Calm, serene, premium mood.
> Composition weighted to the right half of the frame, with the left side as
> softly out-of-focus silk. No text, no logos, no faces. The scene ends in almost
> the same composition as it starts, so it can loop seamlessly.

### Notas para o Flow

- **Formato:** 16:9 (paisagem), 1080p, 8 segundos.
- **Imagem de referência:** se o Flow permitir "ingredients"/imagem inicial, usa
  a própria `public/images/hero.webp` — o vídeo fica coerente com o site.
- **Composição à direita:** o texto do site fica à esquerda; o prompt já pede o
  motivo principal à direita para não ficar atrás do texto.
- **Loop:** gera 2–3 variações e escolhe a que começa e acaba mais parecida.

## Variação (se quiseres um plano diferente)

> Slow cinematic close-up inside a luxurious beauty salon. A manicurist's hand
> glides a fine brush of nude gel polish over an almond nail in extreme slow
> motion. Warm champagne bokeh glows in the background, dust motes float in
> golden window light. Very slow camera drift to the right. Editorial beauty
> commercial, photorealistic, serene premium mood, no text, no logos.

## Depois de gerar

1. Descarrega o MP4 do Flow.
2. Comprime para a web (mantém-no de preferência abaixo de ~6–8 MB):

   ```bash
   ffmpeg -i flow.mp4 -an -vcodec libx264 -crf 26 -preset slow \
     -movflags +faststart -vf "scale=1920:-2" public/videos/hero.mp4
   ```

   (`-an` remove o áudio — o hero reproduz sempre sem som.)
3. Guarda como `public/videos/hero.mp4`, faz commit e publica. Mais nada a mudar.
