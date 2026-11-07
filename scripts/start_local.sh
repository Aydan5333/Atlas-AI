#!/usr/bin/env bash
# Run from any folder. Keep this terminal open; Ctrl-C stops both services.
set -euo pipefail
cd "$(dirname "$0")/.."
command -v python3 >/dev/null || { echo 'Install Python 3.12 or newer first.'; exit 1; }
command -v npm >/dev/null || { echo 'Install Node.js 22 or newer first.'; exit 1; }
python3 -c 'import sys; assert sys.version_info >= (3,12), "Python 3.12+ required"'
node -e 'if (Number(process.versions.node.split(".")[0]) < 22) throw Error("Node.js 22+ required")'
if [ ! -d .venv ]; then python3 -m venv .venv; fi
.venv/bin/python -m pip install -r requirements-dev.txt
if [ ! -f .env ] && [ ! -f frontend/.env.local ]; then .venv/bin/python scripts/setup_local.py; fi
if [ ! -f .env ] || [ ! -f frontend/.env.local ]; then echo 'Configuration is incomplete. See docs/LOCAL_CORE.md; existing files were preserved.'; exit 1; fi
(cd frontend && npm ci)
# Fail before launching if the standard ports are occupied; never stop another app.
.venv/bin/python - <<'PY'
import socket
for port in (8000, 3000):
    with socket.socket() as sock:
        try:
            sock.bind(('127.0.0.1', port))
        except OSError:
            raise SystemExit(f'Port {port} is already in use. Stop the previous Atlas session or that service first.')
PY
api_pid=''
ui_pid=''
cleanup() {
  if [ -n "$ui_pid" ]; then kill "$ui_pid" 2>/dev/null || true; fi
  if [ -n "$api_pid" ]; then kill "$api_pid" 2>/dev/null || true; fi
}
trap cleanup EXIT
trap 'exit 130' INT TERM
.venv/bin/python -m app.api.run &
api_pid=$!
(cd frontend && exec node node_modules/next/dist/bin/next dev --hostname 127.0.0.1) &
ui_pid=$!
.venv/bin/python - <<'PY'
import time, urllib.request, webbrowser
for _ in range(90):
    try:
        with urllib.request.urlopen('http://127.0.0.1:3000/today', timeout=2) as response:
            if response.status == 200:
                print('Atlas is ready: http://127.0.0.1:3000/today')
                print('Unlock using your access token from .env. Keep it private.')
                webbrowser.open('http://127.0.0.1:3000/today')
                break
    except Exception:
        time.sleep(1)
else:
    raise SystemExit('Atlas did not start in time. Check the server messages above.')
PY
while kill -0 "$api_pid" 2>/dev/null && kill -0 "$ui_pid" 2>/dev/null; do sleep 2; done
echo 'An Atlas service stopped. Both services are now stopping; check the messages above.'
exit 1
