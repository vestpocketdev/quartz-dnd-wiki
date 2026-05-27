#!/usr/bin/env bash
# publish.sh — builds the wiki from the Obsidian vault and optionally deploys.
#
# Usage:
#   ./scripts/publish.sh          # build only
#   ./scripts/publish.sh --deploy # build + push to GitHub Pages

set -euo pipefail
cd "$(dirname "$0")/.."

# Quartz requires Node >= 22
export NVM_DIR="$HOME/.nvm"
# shellcheck disable=SC1091
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh" && nvm use 22 --silent 2>/dev/null || true

echo "▸ Generating wiki data from vault..."
node scripts/generate-wiki-data.mjs

echo "▸ Building site..."
npx quartz build

# Quartz slugifies index.html → public/index (no extension). Copy it back so
# the HTTP server can serve it for the root URL.
echo "▸ Restoring homepage..."
cp content/index.html public/index.html

if [[ "${1:-}" == "--deploy" ]]; then
  echo "▸ Deploying to GitHub Pages..."
  npx quartz sync
  echo "✓ Deployed."
else
  echo "✓ Build complete. Run with --deploy to publish."
fi
