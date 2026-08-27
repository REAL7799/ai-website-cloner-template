#!/usr/bin/env bash
# Downloads the AI-generated media for the Fátima Cake site and optimizes it:
# images -> WebP (max 1280px wide), hero video -> H.264 MP4 (720p, muted, faststart).
# Runs in CI (GitHub Actions ubuntu-latest: ImageMagick + ffmpeg preinstalled).
set -euo pipefail

BASE="https://d8j0ntlcm91z4.cloudfront.net/user_3BlNR1tTudwayR6jBqhHKdoGXvL"
IMG_DIR="public/images"
EXP_DIR="public/images/explosao"
VID_DIR="public/videos"
mkdir -p "$IMG_DIR" "$EXP_DIR" "$VID_DIR"

declare -A IMAGES=(
  [hero-cake]="hf_20260827_143855_4a21c9d9-bcd7-4206-ab0c-2a6b91dddcf5"
  [sobre-pasteleira]="hf_20260827_142817_08a6d74c-128b-4d58-bb54-30a773243cf9"
  [bolo-aniversario-azul]="hf_20260827_142817_ee45f9d7-f48e-49e7-9317-aa9959cb97f7"
  [bolo-casamento]="hf_20260827_142817_dbbb1e72-39ff-4632-a4d0-b5b6e4c43cee"
  [bolo-chocolate]="hf_20260827_142817_e8597c0d-c60f-4787-b0af-0cb0244ad1c6"
  [cheesecake-mirtilo]="hf_20260827_142817_8782eb0a-cfbf-4f20-8b01-f0538e9509d2"
  [bolo-cenoura]="hf_20260827_142817_dc211862-09f4-464e-97d3-453bcec825e5"
  [tarte-limao]="hf_20260827_142817_dbcba1f8-6cc0-426a-85e8-4563936f67e0"
  [tarte-amendoa]="hf_20260827_142817_fa00ee90-1096-48cd-b221-95aa076386f1"
  [tarte-frutos-silvestres]="hf_20260827_142817_e552e285-96a7-42ce-8f1d-35991a28d4b9"
  [pasteis-de-nata]="hf_20260827_142817_e18ec96c-109c-4dc4-9ff5-a1f5614e404b"
  [naked-cake]="hf_20260827_142817_f9d0f2ce-187d-4587-bf07-1a76cf3a484b"
)

# Imagens da secção "explosão de chocolate" (com fundo transparente).
declare -A EXPLOSAO=(
  [bolo-chocolate-cutout]="hf_20260827_144948_10aa5466-3af0-4ae3-8a9c-9cc7d4e7fe75"
  [chocolate-pedacos]="hf_20260827_144948_f26a4f65-8bc9-404f-968f-305c1bfe7f27"
  [framboesas]="hf_20260827_144948_a34f6647-52b0-4433-952d-ee6269529d3a"
  [avelas]="hf_20260827_144948_b51d1bc9-e4ec-4d0f-a135-1897fb5dc393"
  [chocolate-calda]="hf_20260827_144948_d4461f56-d960-4bcb-a1d8-11edd2d2081a"
  [chocolate-caracois]="hf_20260827_144948_419b47e9-076e-40d1-a908-8468b5e85380"
)

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

for name in "${!IMAGES[@]}"; do
  echo "Fetching $name..."
  curl -fsSL --retry 3 -o "$tmp/$name.png" "$BASE/${IMAGES[$name]}.png"
  ffmpeg -y -loglevel error -i "$tmp/$name.png" \
    -vf "scale='min(1280,iw)':-2" -c:v libwebp -q:v 80 "$IMG_DIR/$name.webp"
done

for name in "${!EXPLOSAO[@]}"; do
  echo "Fetching explosao/$name..."
  curl -fsSL --retry 3 -o "$tmp/exp-$name.png" "$BASE/${EXPLOSAO[$name]}.png"
  ffmpeg -y -loglevel error -i "$tmp/exp-$name.png" \
    -vf "scale='min(960,iw)':-2" -c:v libwebp -q:v 82 "$EXP_DIR/$name.webp"
done

echo "Fetching hero video..."
curl -fsSL --retry 3 -o "$tmp/hero.mp4" "$BASE/hf_20260827_144235_bc21bdbe-2686-4274-9577-12223e6cb1d3.mp4"
ffmpeg -y -loglevel error -i "$tmp/hero.mp4" -an -vf "scale=1600:-2" -c:v libx264 -crf 25 \
  -preset slow -pix_fmt yuv420p -movflags +faststart "$VID_DIR/hero-bolo.mp4"

ls -la "$IMG_DIR" "$EXP_DIR" "$VID_DIR"
