#!/usr/bin/env bash
# Downloads the AI-generated media for the Fátima Cake site and optimizes it:
# images -> WebP (max 1280px wide), hero video -> H.264 MP4 (720p, muted, faststart).
# Runs in CI (GitHub Actions ubuntu-latest: ImageMagick + ffmpeg preinstalled).
set -euo pipefail

BASE="https://d8j0ntlcm91z4.cloudfront.net/user_3BlNR1tTudwayR6jBqhHKdoGXvL"
IMG_DIR="public/images"
VID_DIR="public/videos"
mkdir -p "$IMG_DIR" "$VID_DIR"

declare -A IMAGES=(
  [hero-cake]="hf_20260827_142817_b78451dc-85cd-4b19-94b3-2b72a52935a3"
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

MAGICK=magick
command -v magick >/dev/null 2>&1 || MAGICK=convert

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

for name in "${!IMAGES[@]}"; do
  echo "Fetching $name..."
  curl -fsSL --retry 3 -o "$tmp/$name.png" "$BASE/${IMAGES[$name]}.png"
  "$MAGICK" "$tmp/$name.png" -resize '1280x1280>' -quality 82 "$IMG_DIR/$name.webp"
done

echo "Fetching hero video..."
curl -fsSL --retry 3 -o "$tmp/hero.mp4" "$BASE/hf_20260827_142920_57b33ce7-0ef0-4eaf-8ec8-a3bd91412d31.mp4"
ffmpeg -y -i "$tmp/hero.mp4" -an -vf "scale=1280:-2" -c:v libx264 -crf 26 -preset slow \
  -pix_fmt yuv420p -movflags +faststart "$VID_DIR/hero-bolo.mp4"

ls -la "$IMG_DIR" "$VID_DIR"
