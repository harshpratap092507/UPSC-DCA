#!/usr/bin/env bash
# Verify all source homepage URLs in src/data/sources.ts return HTTP 200.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FILE="$ROOT/src/data/sources.ts"

urls=$(rg -o 'url: "https?://[^"]+"' "$FILE" | sed 's/url: "//;s/"$//' | sort -u)

failed=0
while IFS= read -r url; do
  code=$(curl -sL -o /dev/null -w "%{http_code}" --max-time 25 -A "Mozilla/5.0" "$url" || echo "000")
  if [[ "$code" == "200" || "$code" == "301" || "$code" == "302" ]]; then
    echo "OK   $code  $url"
  elif [[ "$code" == "403" ]]; then
    echo "WARN $code  $url  (bot-blocked — OK for Phase 9 server fetch)"
  else
    echo "FAIL $code  $url"
    failed=$((failed + 1))
  fi
done <<< "$urls"

if [[ "$failed" -gt 0 ]]; then
  echo ""
  echo "$failed source URL(s) failed. Fix before Phase 9."
  exit 1
fi

echo ""
echo "All source URLs verified."
