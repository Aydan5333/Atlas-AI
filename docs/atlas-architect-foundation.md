# Atlas Architect Foundation

Atlas Architect is the technical strategy and innovation agent for Atlas and The Street Collective.

Its job is not to chase every new tool. Its job is to watch what changes, judge whether it matters, and turn useful updates into small experiments, roadmap changes, and build tasks.

## Current alignment

- TSC is the parent mission and culture layer.
- Atlas is the operating system.
- Atlas Architect is the CTO-style agent that keeps the system pointed at the edge of innovation without losing the plot.
- Atlas stays the head; domain agents become designated lanes.

## Agent lanes

The first designated lanes are:

- Atlas Architect: tech radar, architecture, roadmap, experiments.
- TSC Agent: brand, content, events, sponsors, drops, and culture.
- School Agent: classes, assignments, study flow, math, chemistry, writing.
- Garage Agent: vehicles, diagnostics, parts, tools, FSAE, build checklists.
- Content Agent: reels, scripts, shot lists, captions, posting rhythm.
- Family Agent: routines, chores, schedules, and family operating flow.
- Finance Agent: bills, grants, job opportunities, business runway.
- Memory Agent: quote library, project context, lessons, decisions, and review checkpoints.

## Decision tags

Every new tech update should be tagged as one of:

- ignore
- watch
- research
- prototype
- integrate
- strategic_priority

## First live endpoints

The backend now exposes:

- `GET /health`
- `GET /system/status`
- `GET /architect/briefing`

## First frontend surfaces

The frontend now includes:

- `/` Dashboard
- `/architect` Atlas Architect briefing page
- `/chat` Command Router placeholder
- `/notes`
- `/profile`
- `/scheduler`
- `/system`

## Build guardrails

- Keep frontend code in JS/JSX.
- Keep changes small and reviewable.
- Work from branches, not risky direct edits to main.
- Use commit prefixes such as `feat:`, `fix:`, `docs:`, `chore:`, and `ci:`.
- If a build step fails, create an issue with the failure and next actions.
- Privacy/security rules stay locked even as the user's life and needs change.

## Next experiments

1. Add an Atlas HUD page for smart-glasses-sized cards.
2. Add an Innovation Radar table to store tech updates, impact, tags, and next moves.
3. Add agent cards for TSC, School, Garage, Content, Family, Finance, and Memory.
4. Connect the Chat page to a backend command router.
5. Add Supabase persistence for agent tasks and memory logs.

## Quote library anchors

- Keep your hands on the wheel.
- No more asi dejalo.
- We finish what we start.
