#!/usr/bin/env bash
#
# Optimize every raster image and video under public/ to WebP / WebM.
#
#   images:  .png .jpg .jpeg          -> .webp
#   videos:  .mp4 .mov               -> .webm   (audio stripped — they're muted)
#   gifs:    .gif                    -> .webm   (animated, treated as video)
#
# Originals are deleted only after a conversion succeeds. Already-optimized
# files (.webp / .webm) are left untouched. The code already references the
# .webp / .webm paths, so the site is correct once this finishes.
#
# Prereq: ffmpeg (VP9 video) + cwebp (images). Install on macOS:
#   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
#   brew install ffmpeg webp
#
# Usage:  bash scripts/optimize-media.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIR="$ROOT/public"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "error: ffmpeg not found. Install it first (see header of this script)." >&2
  exit 1
fi
# Homebrew's ffmpeg ships without libwebp, so images go through cwebp instead.
if ! command -v cwebp >/dev/null 2>&1; then
  echo "error: cwebp not found. Run: brew install webp" >&2
  exit 1
fi

IMG_QUALITY=82   # WebP quality for still images (0-100)
VIDEO_CRF=32     # VP9 quality for video (lower = better/larger)

converted=0
saved_before=0
saved_after=0

filesize() { stat -f%z "$1" 2>/dev/null || stat -c%s "$1" 2>/dev/null || echo 0; }

# --- still images -> webp ---------------------------------------------------
while IFS= read -r -d '' src; do
  out="${src%.*}.webp"
  [ -f "$out" ] && { echo "skip (exists): $out"; continue; }
  before=$(filesize "$src")
  if cwebp -quiet -q "$IMG_QUALITY" "$src" -o "$out"; then
    after=$(filesize "$out")
    rm -f "$src"
    converted=$((converted + 1)); saved_before=$((saved_before + before)); saved_after=$((saved_after + after))
    echo "image  $src -> $out  ($((before/1024))K -> $((after/1024))K)"
  else
    echo "FAILED: $src" >&2
  fi
done < <(find "$DIR" -mindepth 2 -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) -print0)

# --- video -> webm ----------------------------------------------------------
while IFS= read -r -d '' src; do
  out="${src%.*}.webm"
  [ -f "$out" ] && { echo "skip (exists): $out"; continue; }
  before=$(filesize "$src")
  if ffmpeg -nostdin -loglevel error -y -i "$src" -c:v libvpx-vp9 -b:v 0 -crf "$VIDEO_CRF" -an "$out"; then
    after=$(filesize "$out")
    rm -f "$src"
    converted=$((converted + 1)); saved_before=$((saved_before + before)); saved_after=$((saved_after + after))
    echo "video  $src -> $out  ($((before/1024))K -> $((after/1024))K)"
  else
    echo "FAILED: $src" >&2
  fi
done < <(find "$DIR" -mindepth 2 -type f \( -iname '*.mp4' -o -iname '*.mov' -o -iname '*.gif' \) -print0)

echo "----------------------------------------------------------------"
echo "converted $converted file(s):  $((saved_before/1024/1024))MB -> $((saved_after/1024/1024))MB"
