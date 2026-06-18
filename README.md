# Atlas-AI

Atlas is the personal operating system for The Street Collective, school, family, garage projects, content, and life operations.

TSC is the parent mission and culture layer. Atlas is the operating system. Agents are the designated lanes that help execute the work.

## Current milestone

Atlas Architect Foundation

This milestone adds the first CTO-style agent lane for tracking emerging technology, protecting the Atlas/TSC vision, and turning useful updates into small experiments and roadmap moves.

## Stack

- Frontend: Next.js in `/frontend`
- Frontend language: JS/JSX
- Backend: FastAPI in `/app`
- Database target: Supabase
- Deployment targets: Vercel frontend and Render backend

## How to run locally

1. Create `.env` from `.env.example` and fill keys.
2. Install backend dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Run the API:

   ```bash
   python -m app.api.run
   ```

4. Open the API health check:

   ```text
   http://localhost:8000/health
   ```

5. Install and run the frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Current API routes

- `GET /health`
- `GET /system/status`
- `GET /architect/briefing`

## Current frontend pages

- `/` Dashboard
- `/architect` Atlas Architect
- `/chat` Command Router
- `/notes`
- `/profile`
- `/scheduler`
- `/system`

## Database migrations

Run these in the Supabase SQL Editor when ready:

- `migrations/001_profiles.sql`
- `migrations/002_notes.sql`

## Repo rules

- Keep frontend code in JS/JSX.
- Use small branches and small commits.
- Preferred commit prefixes: `feat:`, `fix:`, `docs:`, `chore:`, `ci:`.
- Do not hard-code secrets.
- If a build step fails, open a GitHub issue with logs and next actions.
- Atlas is the head; tools and agents are extensions.

## Next build moves

1. Add an Atlas HUD page for smart-glasses-sized cards.
2. Add an Innovation Radar table for tech updates and build decisions.
3. Add agent cards for TSC, School, Garage, Content, Family, Finance, and Memory.
4. Connect `/chat` to a backend command router.
5. Add persistence for agent tasks and memory logs.

## Quote library

> Keep your hands on the wheel.

> No more asi dejalo. We finish what we start.
