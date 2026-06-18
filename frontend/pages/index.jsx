import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Tile from "../components/Tile";
import StatusPill from "../components/StatusPill";
import { BASE } from "../lib/api";

const commandModules = [
  {
    title: "TSC Pillars",
    subtitle: "Platform health",
    body: "ART, MUSIC, FASHION, AUTO, TECH / ATLAS, and EDUCATION stay visible so one lane never swallows the whole mission.",
    next: "Next: create pillar project cards."
  },
  {
    title: "Culture Garage",
    subtitle: "Proof event",
    body: "The first proof-of-world activation: cars, audio, art, music, fashion, sim racing, Academy, and Atlas ops in one controlled room.",
    next: "Next: build Culture Garage 001 proof package."
  },
  {
    title: "Academy",
    subtitle: "Culture to skill",
    body: "Workshops turn the pillars into real skills: fabrication, CAD, audio, fashion, art, music, content, business, and AI workflow.",
    next: "Next: choose first micro-workshop."
  },
  {
    title: "Atlas Architect",
    subtitle: "Innovation radar",
    body: "Tracks new tech, filters hype, and turns useful updates into experiments, roadmap changes, and GitHub issues.",
    next: "Next: weekly innovation brief template."
  },
  {
    title: "Wearable HUD",
    subtitle: "Glasses layer",
    body: "Atlas Core stays the brain. The HUD becomes the windshield for builders, creators, students, routines, and TSC operations.",
    next: "Next: prototype HUD v0.1."
  },
  {
    title: "Survival + Legacy",
    subtitle: "Protected planning",
    body: "The repo documents structure only. Personal records and sensitive planning materials belong outside the public codebase.",
    next: "Next: keep the vault separate from GitHub."
  },
  {
    title: "Contact + Capability Map",
    subtitle: "Network intelligence",
    body: "Map people, skills, tools, resources, project fit, proof needed, and respectful ways different circles can work together.",
    next: "Next: define contact fields and project connections."
  },
  {
    title: "Grants + Property",
    subtitle: "Business foundation",
    body: "Track assistance programs, live/work property options, lender questions, investor prep, deadlines, and needed documents.",
    next: "Next: create public-safe tracker models."
  }
];

const proofPriorities = [
  "Review and merge clean-sweep PR manually if GitHub allows it.",
  "Build Command Center v0 as the visible cockpit.",
  "Build the Contact + Capability Map as Atlas network memory.",
  "Prototype Atlas HUD v0.1 as the wearable lane.",
  "Turn Culture Garage 001 into a sponsor-safe proof package.",
  "Keep Atlas Architect watching the edge without chasing hype."
];

export default function Dashboard(){
  const [ok, setOk] = useState(null);

  useEffect(()=>{
    let ignore=false;
    (async ()=>{
      try{
        const r = await fetch(`${BASE}/health`, { cache:"no-store" });
        const j = await r.json();
        if(!ignore) setOk(!!j?.ok);
      }catch{ if(!ignore) setOk(false); }
    })();
    return ()=>{ ignore=true; }
  },[]);

  return (
    <Layout>
      <header className="mb-6">
        <div className="kicker mb-2">Atlas / TSC Command Center v0</div>
        <h1 className="h1">One organized brain. One clear build path.</h1>
        <p className="mt-3 max-w-3xl text-sm md:text-base text-white/75">
          TSC is the platform. The pillars are the engine. Culture Garage is one proof event. Academy is the teaching system. Atlas is the operating system.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr] mb-6">
        <Tile title="System Status" subtitle="Repo-safe cockpit" right={<StatusPill ok={ok===true} />}>
          <div className="text-sm text-white/80">
            {ok===null ? "Checking backend health..." : ok ? "Backend reachable." : "Backend not reachable from this environment."}
          </div>
          <div className="kicker mt-2">Using: {BASE}</div>
          <div className="mt-4 flex flex-wrap gap-2">
            <a className="btn btn-primary" href="/hud">Open HUD Prototype</a>
            <a className="btn" href="/notes">Notes</a>
            <a className="btn" href="/scheduler">Scheduler</a>
            <a className="btn" href="/system">System</a>
          </div>
        </Tile>

        <Tile title="Current North Star" subtitle="Mission guardrail">
          <div className="text-sm leading-6 text-white/85">
            Keep every pillar alive, map every useful relationship with respect, and protect the mission from noise.
          </div>
          <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/80">
            Keep your hands on the wheel. No more asi dejalo.
          </div>
        </Tile>
      </div>

      <section className="mb-6">
        <div className="mb-3 flex items-end justify-between gap-4">
          <div>
            <div className="kicker">Modules</div>
            <h2 className="text-xl font-semibold tracking-tight">Atlas cockpit cards</h2>
          </div>
          <div className="kicker hidden sm:block">Placeholder data only</div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {commandModules.map((module)=>(
            <Tile key={module.title} title={module.title} subtitle={module.subtitle}>
              <p className="text-sm leading-6 text-white/80">{module.body}</p>
              <div className="mt-4 rounded-lg border border-white/10 bg-white/[.03] p-3 text-xs leading-5 text-white/70">
                {module.next}
              </div>
            </Tile>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <Tile title="Execution Order" subtitle="Next moves">
          <ol className="space-y-3 text-sm text-white/85">
            {proofPriorities.map((item, index)=>(
              <li key={item} className="flex gap-3">
                <span className="pill border-white/10 bg-white/[.03] text-white/70">{index + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </Tile>

        <Tile title="Safety Wall" subtitle="Build rules">
          <ul className="space-y-2 text-sm leading-6 text-white/80">
            <li>Use placeholder demo content until the data model is ready.</li>
            <li>Keep protected planning materials outside this public codebase.</li>
            <li>No agent sends messages, publishes, or makes commitments without approval.</li>
            <li>Atlas documents the structure here. Sensitive records stay separate.</li>
          </ul>
        </Tile>
      </section>
    </Layout>
  );
}
