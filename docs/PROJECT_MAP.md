# Atlas Project Map

## Purpose

This document maps what exists in the current Atlas repo and what needs to be built next.

Atlas is being organized as the operating system for TSC and the family-safe Atlas mission:

- family continuity, survival, and legacy planning
- TSC business operations
- TSC Culture Garage events
- TSC Academy curriculum and skill-building
- grants, sponsors, property, contacts, and proof projects
- future local/offline AI tools

## Current repository structure

Known structure as of this clean sweep:

```text
app/
  api/
  notes/
  profiles/
  atlas.py
  config.py
  main.py
  supabase_client.py
frontend/
  package.json
migrations/
  001_profiles.sql
  002_notes.sql
tests/
.github/workflows/
requirements.txt
README.md
```

## Current technical foundation

- Backend: FastAPI
- Database/service layer: Supabase client helper
- Current API route: `/health`
- Current service modules: notes and profiles
- Frontend: Next.js + React + TypeScript package scaffold

## Immediate gaps

- no complete Atlas dashboard yet
- no Survival Mode module yet
- no Legacy Mode module yet
- no TSC Culture Garage module yet
- no Academy curriculum module yet
- no contact/sponsor/grant/property tracker module yet
- no document vault security boundary yet
- no private/offline data strategy implemented yet

## Build order

1. Finish documentation foundation.
2. Define safe public vs private data boundaries.
3. Build Atlas Command Center v0.
4. Add tracker data models.
5. Add Survival + Legacy structure.
6. Add TSC Culture Garage event planning screens.
7. Add Academy curriculum screens.
8. Add contact pipeline and sponsor tracking.
9. Add offline/local vault strategy later.

## Repo safety note

This repository is public. Do not store real family data, addresses, legal files, API keys, financial records, ChatGPT exports, or private survival plans here.
