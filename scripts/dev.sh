#!/usr/bin/env bash
# dev.sh — builds the wiki and starts a local preview server.
#
# Usage:
#   ./scripts/dev.sh        # build once, then serve at http://localhost:8080
#   ./scripts/dev.sh --watch  # also watch for .md changes and auto-rebuild
#
# To see changes: save files in Obsidian, then ctrl-C, re-run, or use --watch.

set -euo pipefail
cd "$(dirname "$0")/.."

# Quartz requires Node >= 22
export NVM_DIR="$HOME/.nvm"
# shellcheck disable=SC1091
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh" && nvm use 22 --silent 2>/dev/null || true

# Full build: generate wiki data → Quartz build → restore index.html
echo "▸ Generating wiki data..."
node scripts/generate-wiki-data.mjs

echo "▸ Building site..."
npx quartz build

echo "▸ Restoring homepage..."
cp content/index.html public/index.html

if [[ "${1:-}" == "--watch" ]]; then
  if command -v inotifywait &>/dev/null; then
    echo "▸ Watching vault for .md changes (rebuilds automatically)..."
    (
      while inotifywait -rqe modify,create,delete --include='\.md$' content/ 2>/dev/null; do
        echo "▸ Vault changed — rebuilding..."
        node scripts/generate-wiki-data.mjs
        npx quartz build
        cp content/index.html public/index.html
        echo "▸ Done. Refresh your browser."
      done
    ) &
    WATCHER_PID=$!
    trap "kill $WATCHER_PID 2>/dev/null" EXIT
  else
    echo "  (install inotify-tools for auto-rebuild: sudo apt install inotify-tools)"
  fi
fi

echo ""
echo "▸ Serving at http://localhost:8080 — press ctrl-C to stop."
npx serve public -l 8080 --no-clipboard
