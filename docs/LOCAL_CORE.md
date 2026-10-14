# Atlas Operational Core v0.1

This branch turns the existing prototype into a single-owner, local workspace. It is not a deployed cloud service and does not activate external integrations.

## Run on the existing Mac first

Prerequisites: Python 3.12+, Node.js 22+, npm.

From the repository root:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements-dev.txt
python scripts/setup_local.py
python -m app.api.run
```

In a second terminal:

```bash
cd frontend
npm ci
npm run dev -- --hostname 127.0.0.1
```

Open `http://localhost:3000/workspace`. Unlock with the `ATLAS_ACCESS_TOKEN` from the local `.env` file. Do not paste this token into chat or commit it. Setup generates matching server-only configuration in `.env` and `frontend/.env.local`, with restrictive file permissions. It refuses to overwrite existing configuration.

If configuration already exists, add a random token of at least 32 characters as `ATLAS_ACCESS_TOKEN` in both files. Set `ATLAS_API_URL=http://127.0.0.1:8000` in `frontend/.env.local` and `ATLAS_DB_PATH=data/atlas.sqlite3` in `.env`. Keep credentials out of `NEXT_PUBLIC_*` variables.

## Verified behavior

- Notes: save, list, search, delete; corrected frontend argument and response mismatches.
- Profile: single local owner, save and retrieve.
- Workspace: create/edit/delete tasks, projects, contacts, and manual innovation entries.
- Tasks: status changes, completion and reopening.
- Contacts: skills, tools/resources, project links. Project deletion is rejected while linked records exist.
- Command intake: save a command as a task or note; keyword-based lane suggestion. No AI response is fabricated.
- Briefing API: open tasks, counts, blockers.
- JSON export: records and profile; includes a schema version. Import/restore UI is not implemented.
- Authentication: backend bearer credential and server-side frontend proxy; HttpOnly SameSite cookie, 8-hour session; no browser token storage.
- Capability registry explicitly labels all third-party connections as not connected.

## Storage and deployment boundary

SQLite is local and unencrypted. Use ordinary project metadata only. This is not the Survival/Legacy vault. Protect the Mac with disk encryption and backups. Do not use this build for sensitive family, legal, medical, or financial records.

To back up, stop the backend and copy `data/atlas.sqlite3` to protected storage. The JSON export is a readable copy, not an encrypted backup.

The default API runner binds to loopback. Remote/mobile access requires a separate private deployment step: managed identity, HTTPS, platform rate limits, durable backend disk or a properly scoped managed database, tested backups, and the matching server-side environment settings. Do not put SQLite on a temporary hosting filesystem. The old Supabase helpers remain unused; this build does not apply those SQL migrations or assume their access policies are ready.

## Implemented vs planned

| Feature | Status | Activation path |
|---|---|---|
| Notes, tasks, projects, contacts, profile | Implemented locally | Run and unlock `/workspace` |
| Manual innovation radar, briefing, export | Implemented locally | Save records / call authenticated API |
| Chat / domain agents | Capture works; AI not implemented | Choose provider, add server-side credentials, implement retrieval/tool approvals, verify responses |
| Gmail / Calendar / Drive / GitHub sync | Not connected in Atlas | Implement scoped OAuth and connector services; ChatGPT app connections do not transfer automatically |
| Canva / Shopify / payments | Planned | Official APIs, credentials, approval and transaction boundaries |
| Ableton / FL Studio / Serato | Planned | File exchange first; separately installed local bridge later |
| HUD / voice / glasses | Existing visual prototype | Connect saved tasks/capture, then device-specific support |
| CAD / LiDAR processing | Planned | File ingestion, conversion and tested tool pipeline |
| Survival / Legacy vault | Planned | Separate encrypted vault with verified backup/recovery |

## Next milestone

Recommendation: private daily-use release on the Mac, followed by authenticated phone access and one working AI conversation flow. No delivery date is committed by this document.

Keep the open TSC design PR separate. This branch preserves the current main design and does not merge the experimental public website or rewrite the agreed Atlas/TSC split.

## Checks

```bash
python -m pytest
cd frontend
npm run build
```

CI now executes backend tests and builds the frontend rather than skipping validation. Existing workflow heartbeat commits are telemetry, not implemented features.
