# Atlas Security + Privacy Rules

## Purpose

Atlas is tied to family, business, survival, property, sponsors, grants, and future AI tools.

That means the security rule is not optional:

> Public code can describe the system. Private vaults hold the life details.

## Repo visibility warning

This repository is currently public.

Public repos are appropriate for:

- code scaffolding
- non-sensitive architecture docs
- public roadmap
- placeholder environment examples
- generic specifications
- non-private project planning

Public repos are not appropriate for family records, API keys, addresses, legal files, private letters, or ChatGPT exports.

## Never commit

Do not commit any of the following:

- `.env` files
- real API keys
- GitHub tokens
- Supabase service role keys
- OpenAI API keys
- passwords
- passkeys
- private keys
- SSH keys
- recovery codes
- personal legal documents
- court documents
- children’s school records
- medical information
- Social Security numbers
- bank statements
- tax documents
- investor private terms
- private family letters
- ChatGPT export archives
- exact emergency routes or private safe locations
- home addresses or private contact lists

## Safe to commit

Generally safe:

- `.env.example` with placeholder values
- public-safe docs
- code without secrets
- generic checklists
- abstract architecture
- public brand strategy without private addresses
- issue templates
- README instructions

## Environment files

`.env.example` should contain placeholders only.

Example:

```text
SUPABASE_URL=your_supabase_project_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

Real values belong in:

- local `.env`
- hosting provider secret manager
- Replit secrets
- Vercel / Render / Supabase environment settings
- password manager

## Public vs private data boundary

| Data type | Location |
| --- | --- |
| Atlas source code | GitHub repo |
| Public-safe roadmap | GitHub docs |
| Family documents | encrypted private vault |
| Legacy letters | encrypted private vault / printed binder |
| Emergency contacts | private vault / printed binder |
| Sponsor public list | repo or tracker, if non-sensitive |
| Active investor terms | private vault |
| Grant deadlines | tracker/docs |
| Real API keys | secret manager only |

## Agent rules

No agent should autonomously:

- send sensitive emails
- publish family information
- make phone calls
- share private documents
- change API keys
- alter security settings
- commit secret files
- make financial commitments
- claim official partnerships
- contact schools or minors without approval

## Call agent rules

Call agents are later-stage only.

Before any call agent is used, Atlas needs:

- approved scripts
- disclosure rules
- human approval before calls
- call log storage
- no cold spam policy
- no private family data sharing
- human takeover path

## OpenJarvis rule

OpenJarvis or similar frameworks should be treated as lab/reference systems until Atlas architecture is stable.

Do not place private Atlas data into forked or experimental repos.

## Backup rules

Before major edits:

1. create backup branch
2. create working branch
3. make edits in working branch
4. review diff
5. open pull request
6. merge only after approval

## Atlas Go Kit rule

Portable Atlas media should be encrypted and weather-protected.

Recommended layers:

- encrypted SSD/USB
- printed binder
- separate backup copy
- waterproof pouch
- power bank
- local/offline instructions

## Emergency content warning

Emergency, medical, water, fire, and safety instructions should be based on official and verified sources.

Atlas should never present random internet hacks as safety guidance.

## Immediate security tasks

- keep `.env` out of GitHub
- keep repo docs public-safe
- create private encrypted Atlas Survival + Legacy Vault outside GitHub
- use placeholders in `.env.example`
- add public/private labels to future data models
- review repo for accidental secrets before deploying
