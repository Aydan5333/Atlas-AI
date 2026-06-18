import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Tile from "../components/Tile";
import StatusPill from "../components/StatusPill";
import { BASE } from "../lib/api";

const pillarMatrix = [
  { name: "ART", status: "Visual language", next: "Legal panels, brand marks, recap assets" },
  { name: "MUSIC", status: "Sound + story", next: "Producer/DJ lanes, event cues, audio identity" },
  { name: "FASHION", status: "Product proof", next: "Cap, Pro Club tee, sticker pack, sample logic" },
  { name: "AUTO", status: "Craft + motion", next: "Build documentation, sim racing, fabrication skill" },
  { name: "TECH / ATLAS", status: "Operating system", next: "Cockpit, HUD, Architect, agent lanes" },
  { name: "EDUCATION", status: "Culture to skill", next: "Academy workshop and FSAE learning path" }
];

const commandModules = [
  {
    title: "Contact + Capability Map",
    subtitle: "Network intelligence",
    body: "People are not leads. Atlas maps skills, tools, resources, project fit, proof needed, and respectful collaboration paths.",
    tag: "NEXT BUILD"
  },
  {
    title: "Culture Garage 001",
    subtitle: "Proof event",
    body: "One controlled proof room where the pillars show up together: cars, audio, art, music, fashion, sim, Academy, and Atlas ops.",
    tag: "PROOF"
  },
  {
    title: "Atlas Architect",
    subtitle: "Innovation radar",
    body: "Tracks useful tech, filters hype, and turns the right updates into roadmap moves, experiments, and GitHub issues.",
    tag: "WATCH"
  },
  {
    title: "Wearable HUD",
    subtitle: "Glasses layer",
    body: "Atlas stays the engine. The HUD becomes the windshield for school, garage, TSC, capture, and next-step focus.",
    tag: "HUD"
  }
];

const proofPriorities = [
  "Make the UI feel like TSC, not generic software.",
  "Build Contact + Capability Map v0 with safe demo records.",
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
    return ()=>{ ignore=true; };
  },[]);

  return (
    <Layout>
      <header className="hero-shell mb-7 p-6 md:p-9">
        <div className="relative z-10 max-w-4xl">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="pill pill-hot">ATLAS / TSC</span>
            <span className="pill pill-live">COMMAND CENTER V0</span>
            <span className="pill border-white/10 bg-white/[.045] text-white/70">PUBLIC-SAFE BUILD</span>
          </div>
          <h1 className="h1 glow-text">Build the proof. Protect the mission.</h1>
          <p className="mt-5 max-w-3xl text-sm md:text-base leading-7 text-white/76">
            TSC is the platform. The pillars are the engine. Culture Garage is one proof event. Academy is the teaching system. Atlas is the operating system.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a className="btn btn-primary" href="/hud">Open HUD Layer</a>
            <a className="btn" href="/architect">Architect Radar</a>
            <a className="btn" href="/notes">Capture Notes</a>
          </div>
        </div>
      </header>

      <section className="mb-7 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <Tile title="System Pulse" subtitle="Live cockpit" right={<StatusPill ok={ok===true} />}>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="kicker">Backend</div>
              <div className="mt-2 text-2xl font-black">{ok===null ? "..." : ok ? "ON" : "OFF"}</div>
              <div className="mt-1 text-xs text-white/55">{BASE || "same origin"}</div>
            </div>
            <div className="rounded-2xl border border-orange-400/20 bg-orange-500/[.06] p-4">
              <div className="kicker">Focus</div>
              <div className="mt-2 text-2xl font-black">UI</div>
              <div className="mt-1 text-xs text-white/55">identity pass</div>
            </div>
            <div className="rounded-2xl border border-lime-300/20 bg-lime-300/[.06] p-4">
              <div className="kicker">Mode</div>
              <div className="mt-2 text-2xl font-black">BUILD</div>
              <div className="mt-1 text-xs text-white/55">one branch at a time</div>
            </div>
          </div>
        </Tile>

        <Tile title="North Star" subtitle="Mission guardrail">
          <p className="text-sm leading-7 text-white/82">
            Keep every pillar alive, map every useful relationship with respect, and protect the mission from noise.
          </p>
          <div className="accent-line my-4" />
          <p className="text-sm font-semibold text-white/88">Keep your hands on the wheel. No more asi dejalo.</p>
        </Tile>
      </section>

      <section className="mb-7">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <div className="kicker">TSC Pillar Matrix</div>
            <h2 className="h2 mt-1">Six lanes. One platform.</h2>
          </div>
          <div className="hidden rounded-full border border-white/10 bg-white/[.035] px-4 py-2 text-xs uppercase tracking-[.18em] text-white/55 sm:block">
            balanced by design
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pillarMatrix.map((pillar)=> (
            <section key={pillar.name} className="card p-5 transition-all duration-300 hover:border-orange-400/30">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-2xl font-black tracking-tight">{pillar.name}</div>
                  <div className="mt-1 text-xs uppercase tracking-[.2em] text-lime-100/65">{pillar.status}</div>
                </div>
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--lime)] shadow-[0_0_22px_rgba(183,255,60,.8)]" />
              </div>
              <p className="mt-5 text-sm leading-6 text-white/72">{pillar.next}</p>
            </section>
          ))}
        </div>
      </section>

      <section className="mb-7 grid gap-5 lg:grid-cols-4">
        {commandModules.map((module)=> (
          <Tile key={module.title} title={module.title} subtitle={module.subtitle}>
            <span className="pill pill-hot mb-4">{module.tag}</span>
            <p className="text-sm leading-7 text-white/76">{module.body}</p>
          </Tile>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
        <Tile title="Execution Order" subtitle="Next moves">
          <ol className="space-y-3 text-sm text-white/84">
            {proofPriorities.map((item, index)=>(
              <li key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-orange-400/35 bg-orange-500/10 text-xs font-black text-orange-200">{index + 1}</span>
                <span className="leading-6">{item}</span>
              </li>
            ))}
          </ol>
        </Tile>

        <Tile title="Build Rules" subtitle="Safety wall">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4 text-sm leading-6 text-white/74">Use placeholder demo content until the data model is ready.</div>
            <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4 text-sm leading-6 text-white/74">Keep protected planning materials outside this public codebase.</div>
            <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4 text-sm leading-6 text-white/74">No agent sends messages, publishes, or makes commitments without approval.</div>
            <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4 text-sm leading-6 text-white/74">Atlas documents structure here. Sensitive records stay separate.</div>
          </div>
        </Tile>
      </section>
    </Layout>
  );
}
