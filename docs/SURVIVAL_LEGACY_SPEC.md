# Atlas Survival + Legacy Spec

## Purpose

Atlas is not only a productivity app.

At its core, Atlas is intended to preserve guidance, planning, emergency readiness, and family legacy so the children are never left without a map.

Core sentence:

> Atlas was built so my kids would always have a map.

## Modes

### Survival Mode

Survival Mode is for immediate emergencies and stressful situations.

It should help users answer:

- Is anyone hurt?
- Who do we call first?
- Do we stay or leave?
- Where are documents?
- Where are supplies?
- What is the next safe step?

Survival Mode should be direct, calm, short, and checklist-driven.

### Legacy Mode

Legacy Mode is for family continuity, fatherly guidance, Mama J memory, letters, lessons, school support, and life direction.

It should feel like:

> Dad organized this so you would never feel alone or lost.

## Atlas Go Kit

Atlas must not depend only on a giant PC.

The portable version should include:

- encrypted rugged SSD or USB
- printed START HERE guide
- emergency contacts
- family document map
- offline survival documents
- school/help documents
- letters from Dad
- Mama J memory section
- Atlas instructions
- power bank and charging cables
- weather-resistant pouch or case
- optional Faraday-style storage for critical electronics

## Paper binder

Paper is the no-battery backup.

The binder should include:

- START HERE
- emergency contacts
- trusted adults
- medical basics
- school information
- family meeting places
- document map
- how to access Atlas Go Kit
- first letters/instructions
- basic emergency checklists

## Folder structure

Recommended private vault folder structure:

```text
ATLAS_SURVIVAL_LEGACY_VAULT/
  00_START_HERE/
  01_IF_DAD_IS_NOT_AROUND/
  02_EMERGENCY_CONTACTS/
  03_FAMILY_DOCUMENTS/
  04_LETTERS_FROM_DAD/
  05_MAMA_J/
  06_SURVIVAL_SKILLS/
  07_FIRST_AID/
  08_WATER_FOOD_POWER/
  09_MAPS_ROUTES/
  10_VEHICLES_REPAIRS/
  11_SCHOOL_HELP/
  12_TSC_LEGACY/
  13_ATLAS_INSTRUCTIONS/
  14_CHATGPT_EXPORT_ARCHIVE/
  15_BACKUPS/
```

## First documents to create

1. START HERE
2. If Dad Is Not Around
3. Emergency Contacts
4. Family Documents Map
5. Atlas Go Kit Checklist
6. Kids Letter Index
7. Survival Skills Index
8. Printed Binder Table of Contents

## START HERE draft

Kids, start here.

Take a breath. You are not alone.

Dad made this so you would always have a plan.

If anyone is hurt or in danger, call 911.

If you cannot reach Dad, call the trusted adults listed in the emergency contacts.

Stay together. Do not panic. Open the checklist that matches what is happening.

Atlas has Dad's letters, family documents, school help, emergency plans, and survival instructions.

## Safety behavior rules

Survival Mode should:

- use short ordered steps
- tell users to call 911 when anyone is hurt, in danger, or unsafe
- avoid dangerous internet hacks
- cite official sources for medical, water, fire, weather, and emergency guidance
- show last synced date for offline information
- avoid pretending to know current conditions without internet access
- prioritize trusted adults and local emergency services
- use kid-safe language

## Public repo boundary

This spec can live in the public Atlas repo because it is structural.

Do not commit:

- real names of children beyond approved public-safe references
- birthdays
- addresses
- school records
- legal documents
- private family letters
- medical details
- ChatGPT exports
- emergency routes
- private contact lists
- financial documents

Those belong in the private encrypted vault, not GitHub.

## Future Atlas features

Atlas should eventually support:

- emergency big-button interface
- trusted contacts module
- document map without exposing documents publicly
- offline package export
- printed binder generator
- kids letter index
- survival checklist library
- last-synced indicator
- private/public data labels
- encrypted backup reminders

## Build priority

1. create private vault outside GitHub
2. write START HERE
3. create emergency contacts/document map
4. create Atlas Go Kit checklist
5. build Survival/Legacy tabs in Atlas Command Center
6. connect local/offline vault later
