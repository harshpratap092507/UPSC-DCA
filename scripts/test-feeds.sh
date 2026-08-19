#!/usr/bin/env bash
# Smoke-test live feed ingestion and key routes.
set -euo pipefail
BASE="${1:-http://localhost:3000}"

echo "== Refresh =="
REFRESH=$(curl -s "$BASE/api/feeds/refresh")
echo "$REFRESH" | python3 -m json.tool 2>/dev/null || echo "$REFRESH"

COUNT=$(echo "$REFRESH" | python3 -c "import sys,json; print(json.load(sys.stdin).get('articleCount',0))")
ERRORS=$(echo "$REFRESH" | python3 -c "import sys,json; print(len(json.load(sys.stdin).get('sourceErrors',{})))")

echo ""
echo "== Routes =="
for path in / /prelims /mains /gs-1 /gs-2 /gs-3 /gs-4 /sources /saved /daily; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE$path")
  echo "$code $path"
done

echo ""
echo "== Working sources (expect items > 0) =="
WORKING="pib rbi mea supreme-court prs cag wto downtoearth un isro cse imd law-commission indiabudget doe dfs ndma"
for id in $WORKING; do
  resp=$(curl -s "$BASE/api/feeds/$id")
  n=$(echo "$resp" | python3 -c "import sys,json; d=json.load(sys.stdin); print(len(d.get('items',[])))")
  err=$(echo "$resp" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('error','')[:50])")
  echo "$id: $n items ${err:+($err)}"
done

echo ""
echo "Summary: $COUNT articles cached, $ERRORS sources with errors"
if [ "$COUNT" -lt 50 ]; then
  echo "FAIL: expected at least 50 articles"
  exit 1
fi
echo "PASS"
