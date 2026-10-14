# Operational Core verification — 2026-10-07

Story: unlock a local Atlas workspace, save a record through the Next.js proxy and authenticated FastAPI routes to SQLite, retrieve it, export it, delete it, and lock the session.

| Boundary | Result | Evidence |
|---|---|---|
| Backend behavior | Passed | 7 pytest tests including existing hello test |
| Persistence | Passed | Record survives a new API client; each operation opens a new SQLite connection |
| Access control | Passed | Missing/wrong credentials rejected; missing token configuration fails closed |
| Relationships | Passed | Contact/project links validated; linked projects cannot be deleted |
| Tasks | Passed | Blocked → done → active changes reflected in briefing |
| Frontend compilation | Passed | Next.js production build compiles all routes |
| Live frontend → API → database | Passed | HTTP check saved/read/exported/deleted a temporary note through the proxy |
| Session cookie / origin | Passed | HttpOnly and SameSite=Strict; cross-origin login denied; logout removes access |
| Browser clicks / rendering | Not verified | Chromium was unavailable; browser download failed in this environment |
| Remote deployment | Not performed | Local single-owner build only |
| AI and external connector execution | Not implemented | Capability registry marks these as planned / not connected |

Run `python -m pytest` for backend checks. With both local servers running, run `python scripts/verify_http.py` for the proxy data path. This HTTP check expects development-mode cookies on loopback, not a production HTTPS host.

Optional browser check: install Playwright into the frontend with `npm install --prefix frontend --no-save --package-lock=false playwright`, install its Chromium browser, then run `node scripts/verify_browser.cjs`. This script remains unverified here; it creates and removes a temporary task.

A passing compile or HTTP request is not evidence of visual/mobile usability. Complete browser and private deployment checks before treating this as a phone-ready release.
