import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Tile from "../components/Tile";
import StatusPill from "../components/StatusPill";
import { BASE } from "../lib/api";

const atlasModules = [
  {
    title: "Workflow Router",
    subtitle: "Brain behind the flyer",
    body: "Routes taps from TSC into projects, contacts, assets, tasks, connector steps, and approval-ready actions.",
    tag: "CORE"
  },
  {
    title: "Creator Bridge",
    subtitle: "Future app layer",
    body: "Plans safe paths for Ableton, FL Studio, Serato, Canva, Shopify, Drive, Gmail, Calendar, GitHub, and future creator tools.",
    tag: "BRIDGE"
  },
  {
    title: "Contact + Capability Map",
    subtitle: "Network intelligence",
    body: "Maps people by skills, resources, pillar fit, project fit, proof needed, and respectful collaboration paths.",
    tag: "MAP"
  },
  {
    title: "Approval Wall",
    subtitle: "Safety guardrail",
    body: "Atlas can draft and organize, but sending, publishing, charging, posting, or committing externally requires approval.",
    tag: "PROTECT"
  }
];

const systemRules = [
  "TSC is the public face. Atlas is the operating system behind it.",
  "The flyer stays iconic; Atlas adds routing, memory, and execution structure.",
  "Every connector starts as planned/file-based before deeper control is explored.",
  "No private records or live external actions in the public repo."
];

export default function AtlasBrain(){
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
            <span className="pill pill-hot">ATLAS BRAIN</span>
            <span className="pill pill-live">WORKFLOW ROUTER</span>
            <span className="pill border-white/10 bg-white/[.045] text-white/70">TSC RUNS ON TOP</span>
          </div>
          <h1 className="h1 glow-text">Atlas powers the flyer.</h1>
          <p className="mt-5 max-w-3xl text-sm md:text-base leading-7 text-white/76">
            The public taps TSC. Atlas organizes what happens next: projects, contacts, assets, tasks, connectors, schedules, files, drafts, and approvals.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a className="btn btn-primary" href="/">Open TSC Flyer</a>
            <a className="btn" href="/hud">HUD Layer</a>
            <a className="btn" href="/architect">Architect Radar</a>
          </div>
        </div>
      </header>

      <section className="mb-7 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <Tile title="System Pulse" subtitle="Internal cockpit" right={<StatusPill ok={ok===true} />}>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="kicker">Backend</div>
              <div className="mt-2 text-2xl font-black">{ok===null ? "..." : ok ? "ON" : "OFF"}</div>
              <div className="mt-1 text-xs text-white/55">{BASE || "same origin"}</div>
            </div>
            <div className="rounded-2xl border border-orange-400/20 bg-orange-500/[.06] p-4">
              <div className="kicker">Mode</div>
              <div className="mt-2 text-2xl font-black">ROUTE</div>
              <div className="mt-1 text-xs text-white/55">tap to workflow</div>
            </div>
            <div className="rounded-2xl border border-lime-300/20 bg-lime-300/[.06] p-4">
              <div className="kicker">Surface</div>
              <div className="mt-2 text-2xl font-black">TSC</div>
              <div className="mt-1 text-xs text-white/55">public flyer</div>
            </div>
          </div>
        </Tile>

        <Tile title="North Star" subtitle="System boundary">
          <p className="text-sm leading-7 text-white/82">
            Keep the brand face clean, keep the brain useful, and never let automation outrun approval.
          </p>
          <div className="accent-line my-4" />
          <p className="text-sm font-semibold text-white/88">TSC is the world. Atlas is the operating system behind the world.</p>
        </Tile>
      </section>

      <section className="mb-7 grid gap-5 lg:grid-cols-4">
        {atlasModules.map((module)=> (
          <Tile key={module.title} title={module.title} subtitle={module.subtitle}>
            <span className="pill pill-hot mb-4">{module.tag}</span>
            <p className="text-sm leading-7 text-white/76">{module.body}</p>
          </Tile>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
        <Tile title="System Rules" subtitle="How the split works">
          <ol className="space-y-3 text-sm text-white/84">
            {systemRules.map((item, index)=>(
              <li key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-orange-400/35 bg-orange-500/10 text-xs font-black text-orange-200">{index + 1}</span>
                <span className="leading-6">{item}</span>
              </li>
            ))}
          </ol>
        </Tile>

        <Tile title="Next Build Layer" subtitle="Connector Hub path">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4 text-sm leading-6 text-white/74">Planned connector cards for Canva, Shopify, Drive, Gmail, Calendar, GitHub, Ableton, FL Studio, and Serato.</div>
            <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4 text-sm leading-6 text-white/74">Music Studio workflows for beat ideas, DJ sets, sample packs, and event soundtracks.</div>
            <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4 text-sm leading-6 text-white/74">Pillar workspaces that collect ideas, projects, contacts, assets, tasks, and opportunities.</div>
            <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4 text-sm leading-6 text-white/74">Profile dossier that pulls from every pillar and keeps public/private boundaries clean.</div>
          </div>
        </Tile>
      </section>
    </Layout>
  );
}
