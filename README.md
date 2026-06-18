# Atlas-AI

Atlas is the operating system for TSC: The Street Collective.

It is being built as a family-safe command center, survival and legacy vault, TSC business dashboard, event operating system, academy planning system, and balanced pillar tracker for ART, MUSIC, FASHION, AUTO, TECH, and EDUCATION. The long-term goal is to help organize life, family continuity, creative projects, property acquisition, sponsors, grants, education, and community-building without losing the core mission.

## Current repo status

This repository currently contains an early Atlas skeleton:

- FastAPI backend
- Supabase client helpers
- basic profiles and notes services
- health check route
- Next.js frontend package
- database migration files
- tests and workflow scaffolding

This repo is public. Do not commit private family documents, personal records, real addresses, API keys, passwords, `.env` files, financial documents, legal documents, or ChatGPT exports.

## Local setup

1. Copy `.env.example` to `.env` and fill in your local secrets.
2. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Run the API:

   ```bash
   python -m app.main
   ```

4. Check the health endpoint:

   ```bash
   http://localhost:8000/health
   ```

## Frontend setup

From the `frontend` folder:

```bash
npm install
npm run dev
```

## Database migrations

Run these in the Supabase SQL Editor when setting up a new database:

- `migrations/001_profiles.sql`
- `migrations/002_notes.sql`

## Clean sweep docs

The first priority is documentation and structure before major feature work. See:

- `docs/PROJECT_MAP.md`
- `docs/ATLAS_MISSION.md`
- `docs/TSC_PILLARS_STRATEGY.md`
- `docs/AGENT_SYSTEM.md`
- `docs/TSC_EVENT_ACADEMY_STRATEGY.md`
- `docs/ACADEMY_CURRICULUM.md`
- `docs/CONTACT_PIPELINE.md`
- `docs/TSC_PROOF_PROJECTS.md`
- `docs/SURVIVAL_LEGACY_SPEC.md`
- `docs/SECURITY_RULES.md`
- `docs/OPENJARVIS_LICENSE_REVIEW.md`
- `docs/CLEAN_SWEEP_BACKLOG.md`

## OpenJarvis status

OpenJarvis is approved for study and architecture reference only at this stage. It is not approved for direct Atlas Core integration or private family/survival data until license, privacy, security, and local storage boundaries are fully reviewed.

## Working principle

TSC is the platform. The pillars are the engine. Culture Garage is one proof event. Academy is the teaching system. Atlas is the operating system.
