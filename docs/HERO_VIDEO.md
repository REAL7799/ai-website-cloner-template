# Animação do Hero — Google Flow (Veo)

> ✅ **Vídeo instalado.** O take "Woman interlaces fingers on towel" gerado no
> Flow está ativo no hero como loop perfeito de 16s (ida e volta), em duas
> versões: `public/videos/hero.webm` (VP9, preferida) e `public/videos/hero.mp4`
> (H.264, fallback). Para trocar o vídeo, gera um novo no Flow e repete os
> comandos abaixo.

O hero mostra a imagem `public/images/hero.webp` e sobrepõe o vídeo com fade
assim que ele consegue reproduzir (autoplay, sem som, em loop; com
`prefers-reduced-motion` fica só a imagem).

## Prompt principal (colar no Google Flow)

> Cinematic close-up in gentle slow motion. The elegant hands of a Black woman
> with deep brown skin and glossy nude-pink gel nails rest on a folded ivory
> linen towel on a light stone counter. She slowly turns her hands and softly
> interlaces her fingers, admiring her fresh manicure. Natural window daylight,
> true-to-life muted colors, realistic skin with visible natural texture, calm
> authentic mood like a documentary beauty film for a small local salon — not
> a glossy advert. No heavy retouching, no glow, no bokeh light effects. Very
> slow, smooth camera drift-in. Composition weighted to the right half of the
> frame, left side calm and soft-focus. No text, no logos, no faces. The scene
> ends close to the starting composition so it can loop seamlessly.

### Notas para o Flow

- **Formato:** 16:9 (paisagem), 1080p, 8 segundos.
- **Imagem de referência:** se o Flow permitir "ingredients"/imagem inicial,
  usa a própria `public/images/hero.webp` — o vídeo fica coerente com o site.
- **Composição à direita:** o texto do site fica à esquerda; o prompt já pede
  o motivo principal à direita para não ficar atrás do texto.
- **Aspeto natural:** evita variações que acrescentem brilhos, partículas ou
  fundos dourados desfocados — quanto mais parecido com uma filmagem real,
  melhor se integra no site.
- **Loop:** gera 2–3 variações e escolhe a que começa e acaba mais parecida.

## Variação (plano alternativo)

> Slow cinematic close-up inside a small real beauty salon. A manicurist gently
> files and polishes the nails of a dark-skinned client at a white table by a
> window, natural daylight, candid documentary style, true-to-life colors,
> realistic skin texture, very slow camera drift to the right. No text, no
> logos.

## Depois de gerar (comandos usados na instalação atual)

1. Descarrega o MP4 do Flow.
2. Cria o loop perfeito (palíndromo: o vídeo avança e recua, sem salto) e as
   duas versões comprimidas:

   ```bash
   # MP4 (H.264) — compatível com todos os browsers
   ffmpeg -i flow.mp4 \
     -filter_complex "[0:v]split[a][b];[b]reverse,trim=start_frame=1[r];[a][r]concat=n=2:v=1[v]" \
     -map "[v]" -an -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p \
     -movflags +faststart public/videos/hero.mp4

   # WebM (VP9) — mais leve, carregado primeiro
   ffmpeg -i flow.mp4 \
     -filter_complex "[0:v]split[a][b];[b]reverse,trim=start_frame=1[r];[a][r]concat=n=2:v=1[v]" \
     -map "[v]" -an -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 -pix_fmt yuv420p \
     public/videos/hero.webm
   ```

   (`-an` remove o áudio — o hero reproduz sempre sem som.)
3. Faz commit dos dois ficheiros e publica. Mais nada a mudar.
