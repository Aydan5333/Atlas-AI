"""Verify running local frontend proxy → backend → disk without logging credentials."""
from pathlib import Path
from dotenv import dotenv_values
import httpx

root = Path(__file__).resolve().parents[1]
token = dotenv_values(root / '.env')['ATLAS_ACCESS_TOKEN']
with httpx.Client(base_url='http://127.0.0.1:3000', timeout=60, trust_env=False) as client:
    assert client.get('/workspace').status_code == 200
    assert client.get('/api/atlas/workspace/items').status_code == 401
    assert client.post('/api/atlas/session', json={'token': []}).status_code == 401
    assert client.post('/api/atlas/session', json={'token': token}, headers={'Origin': 'https://untrusted.example'}).status_code == 403
    login = client.post('/api/atlas/session', json={'token': token})
    assert login.status_code == 200
    assert 'HttpOnly' in login.headers['set-cookie'] and 'SameSite=Strict' in login.headers['set-cookie']
    note = client.post('/api/atlas/notes/add', json={'text': 'Temporary live proxy verification'}).json()['item']
    try:
        assert any(n['id'] == note['id'] for n in client.get('/api/atlas/notes/list').json()['items'])
        export = client.get('/api/atlas/workspace/export').json()
        assert any(n['id'] == note['id'] for n in export['items'])
        assert all(c['status'] == 'not_connected' for c in client.get('/api/atlas/capabilities').json()['connectors'])
        assert client.get('/api/atlas/unknown').status_code == 404
    finally:
        assert client.post('/api/atlas/notes/delete', json={'note_id': note['id']}).status_code == 200
    assert client.delete('/api/atlas/session').status_code == 200
    assert client.get('/api/atlas/workspace/export').status_code == 401
print('PASS: page HTTP 200, login, cookie protections, unauthorized denial, CSRF denial, live proxy note save/read/export/delete, connector status, logout')
