import { useEffect, useState } from "react";
import StatusPill from "../components/StatusPill";
import { BASE } from "../lib/api";

const pillars = [
  {
    id: "art",
    name: "Art",
    kicker: "Visual language",
    body: "Flyers, marks, murals, graphics, photography, visual identity, and creative direction.",
    items: ["Brand marks", "Flyer systems", "Artist network"]
  },
  {
    id: "music",
    name: "Music",
    kicker: "Sound + story",
    body: "Artists, producers, DJs, sessions, sets, samples, event sound, and future creator app workflows.",
    items: ["Serato", "Ableton", "FL Studio"]
  },
  {
    id: "fashion",
    name: "Fashion",
    kicker: "Product proof",
    body: "Streetwear, blanks, caps, samples, drops, lookbooks, vendors, and storefront paths.",
    items: ["Samples", "Drops", "Shopify path"]
  },
  {
    id: "auto",
    name: "Auto",
    kicker: "Garage culture",
    body: "Cars, builds, audio, fabrication, racing, detailing, features, and motion content.",
    items: ["Builds", "Audio", "Fabrication"]
  },
  {
    id: "tech",
    name: "Tech",
    kicker: "Atlas layer",
    body: "Atlas, creator bridge, connected apps, GitHub, workflows, HUD, and innovation tracking.",
    items: ["Atlas", "Connectors", "Automation"]
  }
];

const actions = [
  {
    name: "Connect",
    id: "connect",
    body: "Follow the build, find the links, and stay tapped into TSC updates."
  },
  {
    name: "Collaborate",
    id: "collaborate",
    body: "For artists, builders, brands, sponsors, vendors, and people who want to work with us."
  },
  {
    name: "Create",
    id: "create",
    body: "Bring an idea into the system and turn it into a project, product, event, build, or piece of content."
  }
];

const proofCards = [
  "Culture Garage 001",
  "TSC apparel samples",
  "Creator app bridge",
  "Contact + Capability Map"
];

export default function TSCHome(){
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
    <main className="min-h-screen overflow-hidden bg-[#050505] text-[var(--ivory)]">
      <section className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,106,0,.22),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,.08),transparent_25%),linear-gradient(180deg,rgba(255,255,255,.04),rgba(0,0,0,.6))]" />
        <div className="absolute inset-0 opacity-[.24] bg-[linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:44px_44px]" />

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center border border-orange-500/70 bg-orange-500/10 text-sm font-black text-orange-200">TSC</span>
            <span>
              <span className="block text-xs uppercase tracking-[.28em] text-white/48">The Street</span>
              <span className="block text-xl font-black uppercase tracking-tight">Collective</span>
            </span>
          </a>

          <div className="hidden items-center gap-6 text-xs font-black uppercase tracking-[.18em] text-white/62 lg:flex">
            <a href="#pillars" className="hover:text-orange-400">Pillars</a>
            <a href="#proof" className="hover:text-orange-400">Proof</a>
            <a href="#connect" className="hover:text-orange-400">Connect</a>
            <a href="/atlas" className="hover:text-orange-400">Atlas</a>
          </div>

          <a href="/atlas" className="btn btn-primary">Enter Atlas</a>
        </nav>

        <div id="top" className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.12fr_.88fr] lg:pb-28 lg:pt-24">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="pill pill-hot">TSC WORLDWIDE</span>
              <span className="pill border-white/10 bg-white/[.04] text-white/68">ART / MUSIC / FASHION / AUTO / TECH</span>
            </div>

            <h1 className="max-w-5xl text-6xl font-black uppercase leading-[.82] tracking-[-.08em] sm:text-8xl lg:text-9xl">
              The Street<br />Collective
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
              A culture brand built for creators, builders, and visionaries. TSC is the public face. Atlas is the brain behind the work.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a className="btn btn-primary" href="#connect">Connect</a>
              <a className="btn" href="#collaborate">Collaborate</a>
              <a className="btn" href="#create">Create</a>
            </div>
          </div>

          <div className="relative min-h-[460px] rounded-[36px] border border-white/10 bg-white/[.04] p-5 shadow-[0_30px_90px_rgba(0,0,0,.55)]">
            <div className="absolute inset-5 rounded-[30px] border border-orange-500/20" />
            <div className="relative grid h-full gap-4">
              <div className="rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,.18),transparent_24%),linear-gradient(135deg,rgba(255,106,0,.18),rgba(0,0,0,.55))] p-6">
                <div className="text-xs font-black uppercase tracking-[.26em] text-orange-300">Current direction</div>
                <div className="mt-5 text-4xl font-black uppercase leading-none tracking-[-.04em]">Culture<br/>Garage<br/>System</div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-black/35 p-5">
                  <div className="text-xs uppercase tracking-[.22em] text-white/45">Engine</div>
                  <div className="mt-2 text-3xl font-black">Atlas</div>
                  <StatusPill ok={ok===true} />
                </div>
                <div className="rounded-[24px] border border-white/10 bg-black/35 p-5">
                  <div className="text-xs uppercase tracking-[.22em] text-white/45">Rule</div>
                  <div className="mt-2 text-3xl font-black">Approve</div>
                  <p className="mt-2 text-xs leading-5 text-white/55">No sending, publishing, posting, or charging without review.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pillars" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="kicker">The pillars</div>
            <h2 className="mt-2 text-4xl font-black uppercase leading-none tracking-[-.05em] sm:text-6xl">Five lanes. One culture.</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/62">
            Each pillar becomes a work environment later. The public site stays clean. Atlas does the routing behind it.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {pillars.map((pillar)=> (
            <article key={pillar.id} className="group min-h-[360px] rounded-[28px] border border-white/10 bg-white/[.035] p-5 transition hover:-translate-y-1 hover:border-orange-500/45 hover:bg-orange-500/[.06]">
              <div className="mb-6 h-28 rounded-[22px] border border-white/10 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,.2),transparent_20%),linear-gradient(135deg,rgba(255,106,0,.16),rgba(0,0,0,.62))]" />
              <div className="text-xs font-black uppercase tracking-[.22em] text-orange-300">{pillar.kicker}</div>
              <h3 className="mt-2 text-4xl font-black uppercase tracking-[-.06em]">{pillar.name}</h3>
              <p className="mt-4 text-sm leading-7 text-white/66">{pillar.body}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {pillar.items.map((item)=> <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[.12em] text-white/55">{item}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="proof" className="border-y border-white/10 bg-white/[.025]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <div className="kicker">Proof over hype</div>
            <h2 className="mt-2 text-4xl font-black uppercase leading-none tracking-[-.05em] sm:text-6xl">Build the proof. Protect the mission.</h2>
            <p className="mt-6 text-sm leading-7 text-white/64">
              TSC should look like a real brand people can trust. Atlas should quietly turn interest into organized projects, contacts, assets, and next steps.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {proofCards.map((card, index)=> (
              <div key={card} className="rounded-[26px] border border-white/10 bg-black/30 p-5">
                <div className="text-sm font-black text-orange-400">0{index + 1}</div>
                <div className="mt-8 text-2xl font-black uppercase leading-none tracking-[-.04em]">{card}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          {actions.map((action)=> (
            <div key={action.name} id={action.id} className="orange-slab block rounded-[30px] p-7 text-black transition hover:-translate-y-1">
              <div className="text-4xl font-black uppercase tracking-[-.05em]">{action.name}</div>
              <p className="mt-5 text-sm font-black uppercase leading-6 tracking-[.08em] text-black/75">{action.body}</p>
              <button type="button" className="mt-8 inline-flex bg-black px-5 py-3 text-xs font-black uppercase tracking-[.16em] text-white">Open {action.name}</button>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 text-xs font-black uppercase tracking-[.18em] text-white/55">
          <div className="text-orange-400">The Street Collective</div>
          <div>Powered by Atlas</div>
          <div>Built different. Built to last.</div>
        </div>
      </footer>
    </main>
  );
}
