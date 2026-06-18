# OpenJarvis License Review

## Purpose

This document records how Atlas should treat OpenJarvis before any fork, import, or integration work.

The goal is to learn from OpenJarvis and possibly use parts of it later without risking Atlas privacy, security, or licensing mistakes.

## Repository reviewed

- Repository: `open-jarvis/OpenJarvis`
- Visibility: public
- License file: Apache License 2.0
- Copyright line in license: `Copyright 2025 The OpenJarvis Authors`

## What OpenJarvis is useful for

OpenJarvis is relevant to Atlas because it is a local-first personal AI framework.

Its README describes OpenJarvis as a framework for local-first personal AI built around:

- shared primitives for building on-device agents
- evaluations that consider energy, FLOPs, latency, cost, and accuracy
- a learning loop that improves models using local trace data
- local-by-default operation with cloud calls only when necessary

OpenJarvis also includes patterns relevant to future Atlas work:

- local-first personal AI
- agent presets
- skills
- scheduled agents
- continuous monitoring agents
- local document research
- code assistant behavior
- tool use
- memory/retrieval patterns

## License summary

OpenJarvis is licensed under the Apache License, Version 2.0.

Practical meaning for Atlas:

- Atlas can study it.
- Atlas can fork it.
- Atlas can modify it.
- Atlas can use portions of it.
- Atlas can redistribute derivative work if the license requirements are followed.
- Atlas can use it in commercial or business-related work if the license requirements are followed.

This is not legal advice. Before major commercial release, investor use, or redistribution, confirm licensing with a qualified attorney.

## Main requirements

If Atlas forks, modifies, distributes, or includes OpenJarvis code, Atlas must:

1. include a copy of the Apache 2.0 license
2. retain copyright, patent, trademark, and attribution notices from OpenJarvis
3. mark modified files with prominent notices saying they were changed
4. include any required NOTICE file if OpenJarvis later adds one
5. avoid implying endorsement by OpenJarvis authors, Stanford, contributors, or related institutions
6. respect trademarks and project names

## Patent note

Apache 2.0 includes a patent license from contributors, but it also has a patent retaliation clause. If a user starts patent litigation claiming the work infringes a patent, the patent license can terminate.

## Trademark note

Apache 2.0 does not grant permission to use trade names, trademarks, service marks, or product names except as needed to describe the origin of the work.

For Atlas, that means:

- do not brand Atlas as OpenJarvis
- do not imply OpenJarvis endorses Atlas
- describe it as reference/fork/inspiration only if used

## Recommended Atlas approach

Do not merge OpenJarvis directly into Atlas right now.

Use a staged approach:

### Stage 1: Reference only

Study OpenJarvis architecture and document relevant patterns.

No private data.
No family docs.
No TSC secrets.
No Atlas live production dependency.

### Stage 2: Lab fork

If needed, create a separate private or public lab repo such as:

`atlas-lab-openjarvis`

This repo should be used only for experiments.

### Stage 3: Pattern extraction

Pull ideas into Atlas docs and architecture:

- local-first principle
- agent primitives
- skills catalog idea
- scheduled digest patterns
- deep research patterns
- local memory/retrieval approach
- benchmark/evaluation mindset

### Stage 4: Controlled integration

Only after Atlas Command Center v0 is stable should any code-level integration be considered.

## What Atlas should not do yet

- Do not put Atlas private family data into OpenJarvis.
- Do not connect survival/legacy files to an experimental fork.
- Do not make OpenJarvis the core identity of Atlas.
- Do not replace the Atlas roadmap with OpenJarvis defaults.
- Do not ship copied code without license and attribution compliance.
- Do not call the final product OpenJarvis.

## How Atlas can incorporate the idea now

In the current Atlas draft, OpenJarvis should be incorporated as:

- a reference architecture
- a future lab/fork candidate
- a local-first/offline inspiration source
- a possible future engine layer
- not the main Atlas identity

Atlas remains:

> Dad's family legacy system, TSC's operating system, and the culture-to-career engine.

OpenJarvis may later support parts of the engine, but it does not define the soul of Atlas.

## Clean sweep backlog additions

Future issues should include:

- Review OpenJarvis architecture in detail
- Decide whether to fork `open-jarvis/OpenJarvis`
- Create `atlas-lab-openjarvis` if approved
- Add Apache 2.0 attribution file if code is used
- Compare OpenJarvis agents to Atlas agent system
- Evaluate local-first patterns for Atlas Survival + Legacy Mode
- Evaluate whether OpenJarvis skills can support TSC Academy workflows

## Decision for now

Approved for study and architecture reference.

Not approved yet for direct code merge into Atlas Core.

Not approved for use with private family/survival data until privacy, security, and local storage boundaries are proven.
