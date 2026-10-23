#!/bin/sh
# Launcher, so the agent runs one command whatever is installed: web.mjs on Node 22+, otherwise
# python/web.py. Both take the same arguments and print the same output and exit codes.
# WEB_SEARCH_RUNTIME=node or python forces one.
dir=$(cd "$(dirname "$0")" && pwd)

# Older Node has no global WebSocket, which web.mjs needs.
node_ok() {
  command -v node >/dev/null 2>&1 &&
    [ "$(node -p 'process.versions.node.split(".")[0]' 2>/dev/null)" -ge 22 ] 2>/dev/null
}

python_ok() {
  command -v python3 >/dev/null 2>&1 &&
    python3 -c 'import sys; sys.exit(sys.version_info < (3, 9))' 2>/dev/null
}

case "${WEB_SEARCH_RUNTIME:-}" in
  node) exec node "$dir/web.mjs" "$@" ;;
  python) exec python3 "$dir/python/web.py" "$@" ;;
  '') ;;
  *)
    echo "WEB_SEARCH_RUNTIME must be node or python, not '$WEB_SEARCH_RUNTIME'" >&2
    exit 1
    ;;
esac

if node_ok; then exec node "$dir/web.mjs" "$@"; fi
if python_ok; then exec python3 "$dir/python/web.py" "$@"; fi
echo 'web-search needs Node 22 or newer, or Python 3.9 or newer' >&2
exit 1
