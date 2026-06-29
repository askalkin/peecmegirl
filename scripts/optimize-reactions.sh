#!/usr/bin/env bash
# Convert dropped PNG/JPG reaction layers to optimized WebP.
# Usage: drop source files as raw-1..raw-9.(png|jpg) into the reactions/
# folder (or any name), then run this script. It outputs reaction-N.webp.
set -euo pipefail
DIR="$(cd "$(dirname "$0")/.." && pwd)/public/recovered/lun-hr-brand/reactions"
cd "$DIR"
shopt -s nullglob
i=0
for f in raw-*.png raw-*.jpg raw-*.jpeg; do
  i=$((i+1))
  n="${f#raw-}"; n="${n%.*}"
  out="reaction-${n}.webp"
  # Cap longest edge at 1600px, quality 82 (matches optimize-media.sh).
  cwebp -quiet -q 82 -resize 1600 0 -mt "$f" -o "$out" 2>/dev/null \
    || cwebp -quiet -q 82 -mt "$f" -o "$out"
  echo "→ $out ($(du -h "$out" | cut -f1))"
done
echo "Done: $i layer(s)."
