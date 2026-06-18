# OpenJarvis Integration Review

## Purpose

This document records how Atlas should treat the OpenJarvis project before any code is copied, forked, or adapted.

OpenJarvis is relevant because it is a local-first personal AI framework that already thinks in the same direction Atlas needs: personal devices, local agents, scheduled agents, research tools, skills, memory, and orchestration.

## License finding

The OpenJarvis repository uses the Apache License 2.0.

Practical meaning for Atlas:

- We can study it.
- We can fork it.
- We can use it as a reference architecture.
- We can copy or adapt compatible portions if we follow Apache 2.0 requirements.
- We can use it in commercial work if we comply with the license.

This is not legal advice. Before Atlas becomes a revenue product or investor-backed platform, review licensing with an attorney or qualified open-source advisor.

## Apache 2.0 obligations

If Atlas copies or distributes OpenJarvis code or derivative code, we must:

1. Include a copy of the Apache 2.0 license.
2. Keep copyright, patent, trademark, and attribution notices that apply.
3. Mark modified files with clear notices that Atlas changed them.
4. Include any NOTICE file if the upstream project includes one.
5. Avoid using OpenJarvis names, logos, trademarks, or product names as if Atlas is endorsed by them.
6. Accept that the software is provided as-is, without warranty.

## Current NOTICE check

A NOTICE file was not found during the initial repository check.

If that changes later, Atlas must include the required notices when redistributing any derivative work.

## What Atlas should not do yet

Do not merge OpenJarvis directly into Atlas right now.

Do not place private family data, kids' data, ChatGPT exports, legal documents, API keys, or TSC private business documents into an OpenJarvis fork or experiment.

Do not rename Atlas into OpenJarvis or imply endorsement.

Do not make OpenJarvis the soul of Atlas.

## Recommended approach

### Phase 1: Study only

Use OpenJarvis as a reference for:

- local-first architecture
- agent orchestration
- skills/tools design
- scheduled agents
- research agents
- code agents
- local/cloud routing
- trace and memory patterns
- evaluation thinking around cost, latency, energy, and accuracy

### Phase 2: Lab fork

Create a separate lab repo later:

```text
atlas-lab-openjarvis
```

Rules for the lab repo:

- no family data
- no private vault data
- no API keys
- no legal documents
- no sponsor/investor private info
- no ChatGPT exports
- no production deployment until reviewed

### Phase 3: Pattern extraction

Pull ideas into Atlas as our own modules only after review.

Possible patterns:

- Agent registry
- Tool registry
- Skill registry
- Scheduled monitor agent
- Morning briefing agent
- Deep research agent
- Code assistant agent
- Local-first model router
- Trace/memory storage pattern
- Evaluation dashboard

### Phase 4: Production decision

Later, decide whether Atlas should:

1. stay independent and only borrow patterns,
2. vendor small Apache 2.0 components with attribution,
3. use OpenJarvis as a separate local runtime layer,
4. or fork a customized Atlas version in a private/internal repo.

## Atlas mapping

| OpenJarvis idea | Atlas translation |
| --- | --- |
| local-first personal AI | Atlas Core and Atlas Go Kit |
| scheduled morning digest | Atlas daily family/TSC briefing |
| deep research | Grants, properties, sponsors, academy research |
| code assistant | Atlas Dev Agent using GitHub/Codex/Claude |
| skills | Atlas skill packs for survival, TSC, academy, FSAE, content |
| orchestrator | Atlas Chief of Staff |
| continuous monitor | Grant/property/sponsor/event watchlists |
| local trace history | private Atlas memory, with privacy boundaries |

## Privacy boundary

OpenJarvis may be useful, but Atlas has a stricter family mission.

Atlas privacy rules override tool convenience.

The public Atlas repo can describe OpenJarvis integration strategy. The private vault holds family, legal, survival, and legacy details.

## Recommendation

In the current clean sweep, incorporate OpenJarvis as:

- a documented reference architecture
- a future lab/fork candidate
- a pattern source for local-first agents
- not a production dependency yet

The next step is not copying code. The next step is creating an Atlas issue later: `Review OpenJarvis architecture and propose Atlas-safe integration options`.
