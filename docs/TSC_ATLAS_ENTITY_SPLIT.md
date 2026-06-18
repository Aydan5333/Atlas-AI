# TSC / Atlas Entity Split

## Decision

TSC and Atlas should be separate surfaces inside one system.

They should not be disconnected. They should be intentionally layered.

> TSC is the face. Atlas is the brain.

## Public Surface

The public-facing surface is TSC.

Primary route:

- `/`

This route should look and feel like the TSC flyer.

The flyer is not a background. The flyer is the interface.

It should preserve the reference language:

- TSC
- THE STREET COLLECTIVE
- ART • MUSIC • FASHION • AUTO
- A CULTURE BRAND BUILT FOR CREATORS, BUILDERS, AND THE STREETS
- CONNECT • COLLABORATE • CREATE
- Follow @thestreetcollective.us

Each part of the flyer should be interactive.

## Internal Surface

The internal operating system surface is Atlas.

Primary route:

- `/atlas`

Atlas should organize:

- workflow routing
- connector registry
- projects
- contacts
- assets
- tasks
- notes
- calendar logic
- creator bridge
- approval wall
- profile dossier
- roadmap

## Why This Split Works

TSC stays clean as the brand, platform, and culture-facing interface.

Atlas stays powerful as the internal intelligence layer.

The public does not need to see the machinery first. They should feel the brand.

The user/admin can open Atlas to run the system behind the brand.

## Routing Model

Public / brand routes:

- `/`
- `/art` later
- `/music` later
- `/fashion` later
- `/auto` later
- `/connect` later
- `/collaborate` later
- `/create` later

Internal / Atlas routes:

- `/atlas`
- `/profile`
- `/hud`
- `/architect`
- `/notes`
- `/scheduler`
- `/chat`
- `/system`

## Workflow Model

The flyer receives the action.

Atlas routes the action.

Connected apps execute after approval.

Flow:

> TSC tap -> Atlas route -> project/contact/asset/task record -> connector suggestion -> approval -> action

## Safety Rule

Atlas can prepare drafts, plans, folders, tasks, and connector suggestions.

Atlas should require approval before:

- sending messages
- publishing content
- publishing products
- charging money
- modifying important files
- contacting collaborators
- making commitments

## Visual Rule

The TSC flyer page should stay iconic and brand-first.

Atlas should not visually overpower the public page.

TSC owns the face.

Atlas owns the operating system.
