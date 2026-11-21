"""Generate matching server-only credentials once. Never prints the token."""
import os
import secrets
from pathlib import Path

root = Path(__file__).resolve().parents[1]
backend = root / '.env'
frontend = root / 'frontend' / '.env.local'
if backend.exists() or frontend.exists():
    raise SystemExit('Environment already exists. Preserve it; see docs/LOCAL_CORE.md for manual setup.')
token = secrets.token_urlsafe(48)
for path, content in ((backend, f'ATLAS_ACCESS_TOKEN={token}\nATLAS_DB_PATH=data/atlas.sqlite3\n'), (frontend, f'ATLAS_ACCESS_TOKEN={token}\nATLAS_API_URL=http://127.0.0.1:8000\n')):
    fd = os.open(path, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
    with os.fdopen(fd, 'w') as stream:
        stream.write(content)
print('Local configuration created. Retrieve the access token from .env privately to unlock Atlas.')
