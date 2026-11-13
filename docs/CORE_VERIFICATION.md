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

## Daily release update — 2026-10-21

- 11 backend tests pass, including authenticated daily plans, maximum three unique task priorities, local-date due/overdue calculation, persisted evening reviews, deletion of selected tasks, business blueprint persistence, linked execution tasks, and export inclusion.
- Next.js production build passes with `/today` and `/business` routes.
- Live frontend proxy → backend → SQLite verification passes: login, cookie/origin controls, record save/read/export/delete and logout.
- `bash -n scripts/start_local.sh` passes. The launcher has not been exercised on the owner's Mac.
- Browser test `scripts/verify_daily_browser.cjs` was added for the new workflow. Execution remains blocked here: the standard Chromium download was invalid, and an alternate packaged Chromium exited before a page could open. Browser/mobile rendering and real audible speech playback remain unverified. The test stubs speech to check wiring only; it cannot certify audible output.
- No deployment, automatic wake-up, telephone call, AI inference or connector sync was performed. PR changes are not automatically active in the existing hosted service.

## Creator Bridge and content-to-cash update — 2026-10-22

- 13 backend tests pass. New checks cover content plan persistence, channel and result validation, project linkage, briefing counts and JSON export.
- Next.js production build passes and includes `/bridge`.
- Creator Bridge records content purpose/audience/pillars/channels/CTA/source asset, manual post URLs, date, entered reach/inquiry/paid-project/revenue results, and a follow-up task.
- No social API, posting, artist discovery, outreach, analytics sync, payment, or revenue verification was activated. This is still local-only and unmerged until the PR is reviewed and merged.
- Browser/mobile UI and platform login flows remain unverified in this environment; the previous Chromium launch failure still blocks visual/end-to-end checks. The new page was compile-checked but not exercised in a real browser.
