#!/usr/bin/env bash
# Downloads the first slide of a Google Slides deck as the Product Studio carousel image.
# The deck must be shared as "Anyone with the link can view".
#
# Usage: scripts/fetch-deck-cover.sh <google-slides-url> <last-arcade|techno-bowl>
set -euo pipefail

if [ $# -ne 2 ]; then
  echo "Usage: $0 <google-slides-url> <last-arcade|techno-bowl>" >&2
  exit 1
fi

url="$1"
name="$2"
id=$(printf '%s' "$url" | sed -nE 's#.*/presentation/d/([a-zA-Z0-9_-]+).*#\1#p')

if [ -z "$id" ]; then
  echo "Could not find a deck ID in: $url" >&2
  exit 1
fi

out="$(cd "$(dirname "$0")/.." && pwd)/images/product-studio/${name}-cover.jpg"
curl -fsSL "https://docs.google.com/presentation/d/${id}/export/jpeg" -o "$out"

if ! file "$out" | grep -q "JPEG"; then
  rm -f "$out"
  echo "Google did not return an image. Check that the deck is shared publicly." >&2
  exit 1
fi

echo "Saved $out"
