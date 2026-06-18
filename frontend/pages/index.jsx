import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatusPill from "../components/StatusPill";
import { BASE } from "../lib/api";

const zones = {
  profile: {
    label: "TSC",
    eyebrow: "Profile / command dossier",
    title: "The Street Collective profile",
    body: "The public sees TSC. Atlas runs behind it, pulling from every pillar, project, contact, asset, connector, and roadmap item.",
    bullets: ["TSC public identity", "Atlas internal memory", "Pillar summaries", "Command profile for the whole platform"]
  },
  art: {
    label: "ART",
    eyebrow: "Visual studio",
    title: "Art opens the visual work environment",
    body: "Murals, graphics, logos, flyer systems, art references, live art plans, and artist collaboration records live here.",
    bullets: ["Visual ideas and references", "Flyers, graphics, and marks", "Artist contacts", "Canva and Drive routing later"]
  },
  music: {
    label: "MUSIC",
    eyebrow: "Sound studio",
    title: "Music opens the sound work environment",
    body: "Sessions, DJ sets, beats, samples, event sound, artist ideas, and future Serato / Ableton / FL Studio workflows live here.",
    bullets: ["Beat and song ideas", "DJ set prep", "Stems and sample folders", "Creator Bridge roadmap"]
  },
  fashion: {
    label: "FASHION",
    eyebrow: "Product studio",
    title: "Fashion opens the product work environment",
    body: "Drops, blanks, mockups, samples, vendor notes, Shopify paths, and product launch plans live here.",
    bullets: ["Hat and shirt concepts", "Sample checklist", "Vendor records", "Storefront planning"]
  },
  auto: {
    label: "AUTO",
    eyebrow: "Garage studio",
    title: "Auto opens the garage work environment",
    body: "Builds, car features, audio, fabrication, FSAE learning, detailing/service ideas, and motion content live here.",
    bullets: ["Build documentation", "Shoot and meet prep", "Builder/vendor contacts", "Performance and fabrication learning"]
  },
  tech: {
    label: "TECH",
    eyebrow: "Atlas layer",
    title: "Tech opens the Atlas work environment",
    body: "Tech is where Atlas, Creator Bridge, connectors, GitHub, HUD, Architect, app linking, and workflow routing are built.",
    bullets: ["Atlas Creator Bridge", "Connector registry", "GitHub roadmap", "Approval wall"]
  },
  connect: {
    label: "CONNECT",
    eyebrow: "Follow @thestreetcollective.us",
    title: "Connect pulls down public links and contact paths",
    body: "This zone becomes the public doorway for socials, email, website, shop, updates, and contact preferences.",
    bullets: ["Instagram / Facebook / web links", "Follow the build", "Update list", "Interest tags for future routing"]
  },
  collaborate: {
    label: "COLLABORATE",
    eyebrow: "Work with TSC",
    title: "Collaborate collects structured partner info",
    body: "This zone becomes the intake path for artists, builders, vendors, sponsors, brands, clients, and future collaborators.",
    bullets: ["Who they are", "What they do", "Pillar fit", "Follow-up and capability map later"]
  },
  create: {
    label: "CREATE",
    eyebrow: "Bring an idea",
    title: "Create turns ideas into project drafts",
    body: "This zone becomes the path for people who want to build something with TSC: product, event, song, build, content, design, or tech idea.",
    bullets: ["Idea intake", "Pillar tags", "Asset needs", "Draft before approval"]
  }
};

const topTiles = [
  { key: "art", name: "ART", meta: "Visual language" },
  { key: "music", name: "MUSIC", meta: "Sound + story" },
  { key: "fashion", name: "FASHION", meta: "Product proof" },
  { key: "auto", name: "AUTO", meta: "Build + motion" }
];

const actionTiles = ["connect", "collaborate", "create"];

function Dot(){ return <span className="mx-3 inline-block h-2.5 w-2.5 rounded-full bg-[var(--orange)] align-middle" />; }

function Globe({ className = "" }){
  return (
    <span className={`globe-mark ${className}`}>
      <span className="globe-lines" />
    </span>
  );
}

export default function Dashboard(){
  const [active, setActive] = useState("profile");
  const [ok, setOk] = useState(null);
  const selected = zones[active];

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
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_410px]">
        <div className="flyer-page p-4 sm:p-6 lg:p-8">
          <div className="flyer-inner">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="pill pill-hot">THE FLYER IS THE PAGE</span>
                <span className="pill border-white/10 bg-white/[.04] text-white/68">ATLAS RUNS BEHIND IT</span>
              </div>
              <StatusPill ok={ok===true} />
            </div>

            <div className="flyer-photo-grid">
              {topTiles.map((tile, index)=> (
                <button
                  key={tile.key}
                  type="button"
                  onClick={()=>setActive(tile.key)}
                  className={`flyer-photo-tile text-left ${active === tile.key ? "ring-2 ring-orange-500/70" : ""}`}
                >
                  {index === 0 && <span className="flyer-king" />}
                  <span className="flyer-hand">{tile.name}</span>
                  <span className="absolute bottom-4 left-4 z-[1] text-[10px] uppercase tracking-[.22em] text-white/54">{tile.meta}</span>
                </button>
              ))}
            </div>

            <button type="button" onClick={()=>setActive("profile")} className="mt-5 block w-full text-center">
              <div className="relative mx-auto grid min-h-[285px] place-items-center overflow-hidden rounded-[34px] border border-white/10 bg-black/35 px-4 py-6 transition-all hover:border-orange-400/50 hover:bg-orange-500/[.055]">
                <Globe className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 text-white/18" />
                <div className="relative z-10">
                  <div className="tsc-mark">TSC</div>
                  <div className="mt-3 flex items-center justify-center gap-3 text-[var(--orange)]">
                    <span className="h-[2px] w-24 bg-[var(--orange)]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--orange)]" />
                    <span className="h-[2px] w-24 bg-[var(--orange)]" />
                  </div>
                  <div className="tsc-condensed mt-2 text-3xl font-black uppercase leading-none tracking-[.24em] sm:text-5xl">
                    The Street Collective
                  </div>
                </div>
              </div>
            </button>

            <div className="orange-slab mx-auto mt-5 max-w-4xl rounded-none px-4 py-4 text-center text-xl font-black uppercase tracking-[.24em] sm:text-2xl">
              ART <Dot /> MUSIC <Dot /> FASHION <Dot /> AUTO
            </div>

            <button
              type="button"
              onClick={()=>setActive("tech")}
              className={`flyer-zone ${active === "tech" ? "active" : ""} mx-auto mt-4 block w-full max-w-4xl rounded-[22px] p-4 text-center`}
            >
              <div className="text-xs font-black uppercase tracking-[.28em] text-orange-100/70">Powered by</div>
              <div className="mt-1 text-2xl font-black uppercase tracking-[.18em]">TECH / ATLAS WORKFLOW ROUTER</div>
            </button>

            <div className="mx-auto mt-5 max-w-5xl text-center text-3xl font-black uppercase leading-tight tracking-[.24em] sm:text-4xl">
              A culture brand built for<br className="hidden sm:block" /> creators, builders, and the streets
            </div>

            <div className="flyer-orange-rail mx-auto mt-8 max-w-4xl rounded-none px-4 py-5 text-center">
              <Globe className="mr-4 inline-grid h-10 w-10 align-middle text-white" />
              {actionTiles.map((key, index)=> (
                <span key={key}>
                  <button
                    type="button"
                    onClick={()=>setActive(key)}
                    className={`font-black uppercase tracking-[.24em] text-white transition hover:text-orange-200 ${active === key ? "text-orange-200" : ""}`}
                  >
                    {zones[key].label}
                  </button>
                  {index < actionTiles.length - 1 && <Dot />}
                </span>
              ))}
              <Globe className="ml-4 inline-grid h-10 w-10 align-middle text-white" />
            </div>

            <div className="flyer-follow mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-4 rounded-none px-5 py-4 text-center">
              <Globe className="h-12 w-12 text-black" />
              <div className="text-xl font-black sm:text-2xl">Follow @thestreetcollective.us</div>
              <div className="hidden h-10 w-px bg-black/45 sm:block" />
              <div className="flex gap-2">
                <span className="social-dot">f</span>
                <span className="social-dot">◎</span>
                <span className="social-dot">⌾</span>
              </div>
            </div>
          </div>
        </div>

        <aside className="flyer-panel rounded-[32px] p-5 sm:p-6 xl:sticky xl:top-8 xl:self-start">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <div className="kicker">Selected interactive zone</div>
              <h2 className="mt-2 text-4xl font-black uppercase tracking-tighter">{selected.label}</h2>
            </div>
            <span className="pill pill-hot">LIVE</span>
          </div>

          <div className="accent-line mb-5" />

          <div className="rounded-[26px] border border-white/10 bg-white/[.04] p-5">
            <div className="kicker text-orange-100/72">{selected.eyebrow}</div>
            <h3 className="mt-2 text-2xl font-black tracking-tight">{selected.title}</h3>
            <p className="mt-4 text-sm leading-7 text-white/74">{selected.body}</p>
          </div>

          <div className="mt-5 space-y-3">
            {selected.bullets.map((item)=> (
              <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-3 text-sm leading-6 text-white/75">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--orange)] shadow-[0_0_18px_rgba(255,106,0,.8)]" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-[26px] border border-lime-300/20 bg-lime-300/[.06] p-5">
            <div className="kicker text-lime-100/72">Atlas brain</div>
            <p className="mt-3 text-sm leading-7 text-white/72">
              The flyer stays TSC. Atlas turns taps into records, projects, contacts, assets, connector steps, and approval-ready actions.
            </p>
            <a className="btn btn-live mt-4" href="/atlas">Open Atlas Brain</a>
          </div>
        </aside>
      </section>
    </Layout>
  );
}
