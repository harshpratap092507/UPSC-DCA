#!/usr/bin/env bash
# Verify all article URLs in src/data/articles.ts return HTTP 200.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FILE="$ROOT/src/data/articles.ts"

urls=$(rg -o 'url: "https?://[^"]+"' "$FILE" | sed 's/url: "//;s/"$//')

failed=0
while IFS= read -r url; do
  code=$(curl -sL -o /dev/null -w "%{http_code}" --max-time 20 "$url" || echo "000")
  if [[ "$code" == "200" ]]; then
    echo "OK   $url"
  else
    echo "FAIL $code  $url"
    failed=$((failed + 1))
  fi
done <<< "$urls"

if [[ "$failed" -gt 0 ]]; then
  echo ""
  echo "$failed broken link(s). Fix before committing."
  exit 1
fi

echo ""
echo "All article links verified."
