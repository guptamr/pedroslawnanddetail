#!/usr/bin/env bash
# scripts/process-images.sh — resize + copy Pedro's photos into images/
# Requires: sips (macOS built-in). No external installs.
set -euo pipefail

SRC="$HOME/Downloads/peter"
DST="images"
MAX_WIDTH=1400
JPEG_QUALITY=82

mkdir -p "$DST/hero" "$DST/lawn" "$DST/detailing"

copy_resize() {
  local src="$1" dst="$2"
  cp "$src" "$dst"
  sips --resampleWidth "$MAX_WIDTH" "$dst" --out "$dst" >/dev/null
  sips --setProperty formatOptions "$JPEG_QUALITY" "$dst" --out "$dst" >/dev/null
}

# Hero
copy_resize "$SRC/Image (13).jpeg"     "$DST/hero/hero-lawn-transformation.jpg"

# Lawn gallery
copy_resize "$SRC/Image (13).jpeg"     "$DST/lawn/yard-overgrown-cleanup-before-after.jpg"
copy_resize "$SRC/Image (9).jpeg"      "$DST/lawn/lawn-front-hedge-before-after.jpg"
copy_resize "$SRC/Image (15).jpeg"     "$DST/lawn/garden-border-mulch-before-after.jpg"
copy_resize "$SRC/Image (16).jpeg"     "$DST/lawn/garden-bed-iris-before-after.jpg"

# Detailing gallery
copy_resize "$SRC/Image (17).jpeg"     "$DST/detailing/car-rear-floor-before-after.jpg"
copy_resize "$SRC/Image (10).jpeg"     "$DST/detailing/car-passenger-mat-before-after.jpg"
copy_resize "$SRC/Image (12).jpeg"     "$DST/detailing/car-driver-mat-before-after.jpg"

echo "✅ Images processed → $DST"
