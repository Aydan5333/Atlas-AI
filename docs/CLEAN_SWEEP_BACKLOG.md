# Clean Sweep Backlog

## Purpose

This backlog defines what must be done before Atlas moves into heavier feature work.

The clean sweep goal is:

> One organized brain, one safe repo, one clear TSC strategy, one build path.

## Current foundation

Already started:

- FastAPI backend skeleton
- Supabase client helper
- profiles service
- notes service
- `/health` route
- Next.js frontend package scaffold
- migrations for profiles and notes
- clean-sweep documentation branch

## Safety status

Backup branch:

- `backup/pre-clean-sweep-2026-06-18`

Working branch:

- `docs/tsc-culture-garage-academy-clean-sweep`

Main branch should not be edited directly.

## Phase 1: Documentation foundation

- [x] Clean README
- [x] Add `.env.example`
- [x] Add project map
- [x] Add Atlas mission doc
- [x] Add agent system doc
- [x] Add TSC event and academy strategy
- [x] Add academy curriculum
- [x] Add contact pipeline
- [x] Add proof projects
- [x] Add survival and legacy spec
- [x] Add security rules
- [x] Add clean sweep backlog

## Phase 2: Repo hygiene

- [ ] Review existing `requirements.txt` for duplicate packages
- [ ] Confirm app entry point: `python -m app.main`
- [ ] Confirm API health route works locally
- [ ] Confirm frontend starts from `frontend/`
- [ ] Confirm migrations match service code
- [ ] Add basic issue templates
- [ ] Add pull request template
- [ ] Add public/private data warning to contributor docs
- [ ] Add tests for health endpoint if not already stable

## Phase 3: Atlas Command Center v0

Build a simple dashboard with tabs:

- [ ] Home
- [ ] Survival
- [ ] Legacy
- [ ] TSC
- [ ] Culture Garage
- [ ] Academy
- [ ] Contacts
- [ ] Sponsors
- [ ] Grants
- [ ] Properties
- [ ] Tasks

Goal: clickable cockpit before complex automation.

## Phase 4: Data models

Future tables/models to design:

- [ ] contacts
- [ ] sponsors
- [ ] grants
- [ ] properties
- [ ] tasks
- [ ] proof_projects
- [ ] academy_modules
- [ ] event_checklists
- [ ] survival_checklists
- [ ] legacy_index
- [ ] documents_index

Every model should include a public/private flag where appropriate.

## Phase 5: TSC Culture Garage 001

- [ ] Create one-page event concept
- [ ] Create Brian / Stormtrooper / B2 feature plan
- [ ] Create shot list
- [ ] Create sponsor recap template
- [ ] Create event run-of-show
- [ ] Create safety checklist
- [ ] Create sim racing leaderboard plan
- [ ] Create live art station plan
- [ ] Create apparel sample checklist
- [ ] Create Atlas station checklist

## Phase 6: TSC Academy

- [ ] Create academy overview one-pager
- [ ] Choose first micro-workshop topic
- [ ] Build first 60-90 minute workshop outline
- [ ] Create student/member feedback form
- [ ] Create mentor/contact list
- [ ] Create CNM-to-UNM / FSAE skill roadmap
- [ ] Create safety and supervision rules before youth programming

## Phase 7: Outreach pipeline

- [ ] Contact CNM SBDC
- [ ] Contact WESST
- [ ] Contact Brian / Stormtrooper
- [ ] Request UNM FSAE tour / skill prep guidance
- [ ] Build TSC one-page concept sheet
- [ ] Build 10-slide mini deck
- [ ] Build proof reel after Culture Garage 001
- [ ] Contact B2 / paint brands / media only after proof assets exist

## Phase 8: Survival + Legacy Vault

This work happens outside the public repo.

- [ ] Create private `ATLAS_SURVIVAL_LEGACY_VAULT` folder
- [ ] Create START HERE doc
- [ ] Create If Dad Is Not Around doc
- [ ] Create Emergency Contacts doc
- [ ] Create Family Documents Map
- [ ] Create Atlas Go Kit checklist
- [ ] Create Kids Letter Index
- [ ] Create Survival Skills Index
- [ ] Create printed binder table of contents
- [ ] Export ChatGPT history and store privately
- [ ] Do not commit private files to GitHub

## Phase 9: Agents and automation later

Do not start these until phases 1-4 are stable:

- [ ] n8n / Zapier / Make automations
- [ ] call agents
- [ ] OpenJarvis fork review
- [ ] local LLM server
- [ ] offline Atlas Go Kit software package
- [ ] event check-in automation
- [ ] sponsor email automation

## Definition of done for clean sweep

Clean sweep is complete when:

- docs exist and are reviewed
- no secrets are committed
- README is clean
- Atlas mission is clear
- TSC Culture Garage and Academy are represented
- contact pipeline exists
- proof projects are defined
- survival/legacy boundaries are clear
- next build issues can be created from backlog

## North star

TSC Culture Garage gets people in the room.
TSC Academy teaches them how to build.
FSAE and engineering pathways prove the skill is real.
Atlas runs the whole system.
