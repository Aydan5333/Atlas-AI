import pytest
from fastapi.testclient import TestClient
from app import app


@pytest.fixture
def client(tmp_path, monkeypatch):
    monkeypatch.setenv('ATLAS_DB_PATH', str(tmp_path / 'atlas.sqlite3'))
    monkeypatch.setenv('ATLAS_ACCESS_TOKEN', 'test-token-' + 'x' * 48)
    with TestClient(app, headers={'Authorization': 'Bearer test-token-' + 'x' * 48}) as client:
        yield client


def test_private_routes_fail_closed(client, monkeypatch):
    assert client.get('/workspace/items', headers={'Authorization': ''}).status_code == 401
    assert client.get('/workspace/export', headers={'Authorization': 'Bearer wrong'}).status_code == 401
    monkeypatch.delenv('ATLAS_ACCESS_TOKEN')
    assert client.get('/notes/list').status_code == 503


def test_notes_round_trip_and_new_client(client):
    note = client.post('/notes/add', json={'text': 'Torque spec checklist'}).json()['item']
    assert client.get('/notes/search?q=TORQUE').json()['items'][0]['text'] == 'Torque spec checklist'
    with TestClient(app, headers=dict(client.headers)) as restarted:
        assert restarted.get('/notes/list').json()['items'][0]['id'] == note['id']
    assert client.get('/notes/list?user_id=someone-else').status_code == 403
    assert client.post('/notes/delete', json={'note_id': note['id']}).status_code == 200
    assert client.get('/notes/list').json()['items'] == []


def test_contact_project_link_and_safe_delete(client):
    project = client.post('/workspace/items', json={'kind': 'project', 'title': 'Workshop'}).json()['item']
    contact = client.post('/workspace/items', json={'kind': 'contact', 'title': 'Example fabricator', 'skills': ['welding'], 'resources': ['CNC'], 'project_id': project['id']}).json()['item']
    assert client.delete('/workspace/items/' + project['id']).status_code == 409
    assert client.delete('/workspace/items/' + contact['id']).status_code == 200
    assert client.delete('/workspace/items/' + project['id']).status_code == 200
    assert client.post('/workspace/items', json={'kind': 'task', 'title': 'test', 'project_id': 'missing'}).status_code == 422


def test_tasks_complete_reopen_and_briefing(client):
    record = {'kind': 'task', 'title': 'Verify API', 'status': 'blocked'}
    item = client.post('/workspace/items', json=record).json()['item']
    assert client.get('/briefing').json()['blockers'][0]['id'] == item['id']
    assert client.put('/workspace/items/' + item['id'], json={**record, 'status': 'done'}).status_code == 200
    assert client.get('/briefing').json()['next_tasks'] == []
    assert client.put('/workspace/items/' + item['id'], json={**record, 'status': 'active'}).status_code == 200
    assert len(client.get('/briefing').json()['next_tasks']) == 1
    assert client.put('/workspace/items/' + item['id'], json={'kind': 'project', 'title': 'changed'}).status_code == 422


def test_validation_and_parameterized_search(client):
    assert client.post('/workspace/items', json={'kind': 'task', 'title': '   '}).status_code == 422
    assert client.post('/workspace/items', json={'kind': 'unknown', 'title': 'test'}).status_code == 422
    assert client.post('/workspace/items', json={'kind': 'task', 'title': 'x' * 201}).status_code == 422
    assert client.get('/workspace/items', params={'q': "' OR 1=1--"}).json()['items'] == []


def test_profile_export_and_honest_capabilities(client):
    assert client.post('/profiles/upsert', json={'display_name': 'Local owner'}).status_code == 200
    assert client.get('/profiles/get').json()['display_name'] == 'Local owner'
    client.post('/workspace/items', json={'kind': 'innovation', 'title': 'Evaluate display'})
    export = client.get('/workspace/export').json()
    assert export['schema_version'] == 1 and len(export['items']) == 1
    assert export['profile']['display_name'] == 'Local owner'
    assert 'token' not in str(export)
    caps = client.get('/capabilities').json()
    assert all(c['status'] == 'not_connected' for c in caps['connectors'])
    assert 'AI conversation and agent execution' in caps['planned']


def test_daily_plan_persists_priorities_review_and_export(client):
    task = client.post('/workspace/items', json={'kind': 'task', 'title': 'Quote a paid job', 'due_date': '2026-10-20', 'lane': 'TSC'}).json()['item']
    future = client.post('/workspace/items', json={'kind': 'task', 'title': 'Future task', 'due_date': '2026-10-23'}).json()['item']
    plan = {'focus_ids': [task['id']], 'commitments': '10 AM supplier meeting', 'review': 'Sent the quote; follow up tomorrow.'}
    result = client.put('/daily/2026-10-21', json=plan)
    assert result.status_code == 200
    summary = result.json()
    assert [t['id'] for t in summary['overdue']] == [task['id']]
    assert future['id'] not in summary['spoken_text']
    assert '10 AM supplier meeting' in summary['spoken_text']
    assert summary['completed_focus'] == 0
    client.put('/workspace/items/' + task['id'], json={**task, 'status': 'done'})
    with TestClient(app, headers=dict(client.headers)) as restarted:
        saved = restarted.get('/daily/2026-10-21').json()
        assert saved['plan'] == plan
        assert saved['completed_focus'] == 1
        assert saved['overdue'] == []
        assert restarted.get('/daily/2026-10-22').json()['plan']['focus_ids'] == []
        assert restarted.get('/workspace/export').json()['days'][0]['review'] == plan['review']
    assert client.get('/daily/2026-10-21', headers={'Authorization': ''}).status_code == 401


def test_daily_validation_and_local_calendar_date(client):
    ids = [client.post('/workspace/items', json={'kind': 'task', 'title': f'Task {i}', 'due_date': '2026-10-21'}).json()['item']['id'] for i in range(4)]
    assert len(client.get('/daily/2026-10-21').json()['due']) == 4
    assert len(client.get('/daily/2026-10-22').json()['overdue']) == 4
    assert client.put('/daily/2026-10-21', json={'focus_ids': ids}).status_code == 422
    assert client.put('/daily/2026-10-21', json={'focus_ids': [ids[0], ids[0]]}).status_code == 422
    assert client.put('/daily/2026-10-21', json={'focus_ids': ['missing']}).status_code == 422
    project = client.post('/workspace/items', json={'kind': 'project', 'title': 'Example'}).json()['item']
    assert client.put('/daily/2026-10-21', json={'focus_ids': [project['id']]}).status_code == 422
    assert client.get('/daily/2026-02-30').status_code == 422
    assert client.post('/workspace/items', json={'kind': 'task', 'title': 'Invalid date', 'due_date': 'not-a-date'}).status_code == 422


def test_blueprint_round_trip_and_linked_execution(client):
    blueprint = {'stage': 'local_proof', 'offer': 'Document a paid detail', 'economics': 'Record materials and labor before setting a target margin', 'proof': 'No paid pilot yet', 'next_action': 'Cost the pilot'}
    project = client.post('/workspace/items', json={'kind': 'project', 'title': 'TSC pilot', 'lane': 'TSC', 'blueprint': blueprint}).json()['item']
    task = client.post('/workspace/items', json={'kind': 'task', 'title': blueprint['next_action'], 'project_id': project['id']}).json()['item']
    exported = client.get('/workspace/export').json()
    saved = next(i for i in exported['items'] if i['id'] == project['id'])
    assert saved['blueprint']['proof'] == 'No paid pilot yet'
    assert task['project_id'] == project['id']
    assert client.delete('/workspace/items/' + project['id']).status_code == 409
    assert client.post('/workspace/items', json={'kind': 'project', 'title': 'Bad', 'blueprint': {'stage': 'worldwide_success'}}).status_code == 422


def test_deleted_priority_does_not_break_saved_day(client):
    task = client.post('/workspace/items', json={'kind': 'task', 'title': 'Temporary priority'}).json()['item']
    client.put('/daily/2026-10-21', json={'focus_ids': [task['id']], 'review': 'Keep this review'})
    assert client.delete('/workspace/items/' + task['id']).status_code == 200
    saved = client.get('/daily/2026-10-21').json()
    assert saved['focus'] == [] and saved['plan']['focus_ids'] == []
    assert saved['plan']['review'] == 'Keep this review'
    assert client.put('/daily/2026-10-21', json=saved['plan']).status_code == 200
