# Atlas Wearable HUD

## Purpose

Atlas Wearable HUD is the lightweight display layer for smart glasses, wearable displays, and future spatial interfaces.

The glasses are not the brain. Atlas Core stays the brain. The wearable HUD is the windshield.

## Product sentence

> Atlas turns wearable displays into a real-world command center for builders, creators, students, families, and TSC operations.

## Why this matters

Atlas is meant to support real life while the user is moving, building, studying, filming, networking, parenting, and solving problems.

A phone dashboard is useful, but a wearable HUD can make Atlas available in the moment without forcing the user to stop, unlock a phone, and dig through apps.

## First version: Atlas HUD v0.1

Do not start with the full Iron Man suit.

Start with a tiny, useful HUD:

1. Now
2. Capture
3. Build Mode
4. TSC Mode
5. School Mode
6. Garage Mode

## Screen 1: Now

Shows:

- current priority
- next event
- next task
- urgent reminder
- one grounding message

Example:

> Next: Math review block. After that: pickup. Keep your hands on the wheel.

## Screen 2: Capture

Allows quick capture of:

- idea
- voice note
- content shot idea
- contact follow-up
- part/tool note
- school question

Capture should be fast and low-friction.

## Screen 3: Build Mode

For physical projects.

Shows:

- active project
- current step
- tool list
- safety note
- next/back navigation
- photo or proof capture reminder

## Screen 4: TSC Mode

For content, events, and brand moves.

Shows:

- shot list
- caption seed
- sponsor tags
- people to talk to
- proof assets needed
- follow-up reminders

## Screen 5: School Mode

For learning and studying.

Shows:

- formula card
- problem-solving steps
- assignment reminder
- study timer
- one concept at a time

School Mode should explain without overwhelming the user.

## Screen 6: Garage Mode

For auto, audio, fabrication, and FSAE prep.

Shows:

- checklist step
- torque/spec note when available
- diagnostic question
- measurement reminder
- photo proof prompt
- safety reminder

## Input principles

The HUD should support:

- voice commands
- simple tap/gesture navigation when available
- phone fallback controls
- minimal text entry
- no complex menus

## Design principles

- glanceable
- calm
- low text
- high contrast
- one decision per screen
- no clutter
- no private family details on public screens
- no always-recording behavior

## Privacy rules

Atlas Wearable HUD must not support creepy behavior.

Do not build:

- face recognition
- bystander identification
- always-on recording
- secret recording
- public display of private family data
- private emergency routes in a public repo

Allowed:

- user-initiated capture
- task reminders
- project checklists
- shot lists
- school prompts
- event operations
- opt-in notes

## Technical direction

The first implementation should be a normal web/PWA-style interface before deeper native integration.

Recommended first build:

- `/frontend/pages/hud.jsx`
- a card-based HUD layout
- mocked data first
- later connect to Atlas tasks, notes, contacts, projects, and calendar

## Acceptance criteria for HUD v0.1

HUD v0.1 is done when:

- there is a dedicated HUD page
- it has the six core modes
- each mode has simple placeholder cards
- layout works on a narrow display
- no secrets or private data are used
- it can be demoed from the frontend

## Long-term vision

Future versions may connect to:

- Atlas Daily Briefing
- TSC pillar dashboard
- event run-of-show
- contact pipeline
- garage checklists
- FSAE learning path
- academy lessons
- offline Atlas Go Kit

## North star

Atlas stays the operating system. The wearable HUD helps Atlas show up in real life, right when the next move matters.