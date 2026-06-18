import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatusPill from "../components/StatusPill";
import { BASE } from "../lib/api";

const zones = {
  profile: {
    label: "PROFILE",
    eyebrow: "Command dossier",
    title: "Aydan / TSC / Atlas",
    body: "Profile pulls from every pillar: identity, legacy, projects, capabilities, network, assets, roadmap, and connected apps.",
    bullets: ["Founder / builder / student / father", "TSC platform identity", "Atlas OS profile memory", "Pillar activity summary"]
  },
  art: {
    label: "ART",
    eyebrow: "Visual studio",
    title: "Graphics, murals, marks, motion",
    body: "The Art studio holds visual ideas, references, brand marks, flyer systems, live art plans, and creative assets.",
    bullets: ["Moodboards and references", "Flyer and logo concepts", "Artist contacts", "Canva / Drive asset routing"]
  },
  music: {
    label: "MUSIC",
    eyebrow: "Sound studio",
    title: "Sessions, sets, samples, stories",
    body: "The Music studio prepares artist ideas, beats, DJ sets, samples, event sound, and future Ableton / FL / Serato workflows.",
    bullets: ["Beat and song ideas", "DJ set prep", "Serato / Ableton / FL roadmap", "Session notes and stems"]
  },
  fashion: {
    label: "FASHION",
    eyebrow: "Product studio",
    title: "Drops, blanks, mockups, samples",
    body: "The Fashion studio turns concepts into samples, vendor tasks, Canva mockups, Shopify draft paths, and launch plans.",
    bullets: ["Hat and tee concepts", "Sample checklists", "Vendor notes", "Shopify / payment path planning"]
  },
  auto: {
    label: "AUTO",
    eyebrow: "Garage studio",
    title: "Builds, features, fabrication, motion",
    body: "The Auto studio organizes builds, car features, audio, fabrication ideas, FSAE learning, and content proof.",
    bullets: ["Build documentation", "Shoot and event prep", "Builder/vendor contacts", "Garage tasks and proof assets"]
  },
  tech: {
    label: "TECH",
    eyebrow: "Atlas studio",
    title: "Brain, bridge, HUD, workflow router",
    body: "The Tech studio holds Atlas, Architect, HUD, connector registry, GitHub, app integrations, and workflow automation plans.",
    bullets: ["Atlas Creator Bridge", "Connector Hub", "GitHub roadmap", "Approval wall and safe routing"]
  },
  connect: {
    label: "CONNECT",
    eyebrow: "Follow the build",
    title: "Socials, links, updates, contact paths",
    body: "Connect opens the public doorway: socials, email, shop, website, community, update list, and contact preferences.",
    bullets: ["Social links", "Email and website", "Shop and update list", "Interest tags for future follow-up"]
  },
  collaborate: {
    label: "COLLABORATE",
    eyebrow: "Work with us",
    title: "Partnership and capability intake",
    body: "Collaborate collects structured info from artists, brands, builders, vendors, sponsors, and clients, then Atlas organizes it.",
    bullets: ["Who they are", "What they do", "Pillar fit", "Follow-up task and contact record"]
  },
  create: {
    label: "CREATE",
    eyebrow: "Bring the idea",
    title: "Idea-to-project intake",
    body: "Create turns raw ideas into project drafts, pillar tags, asset needs, connector suggestions, and next-step checklists.",
    bullets: ["Product, event, content, song, build, or design", "Assets and help needed", "Pillar selection", "Draft before approval"]
  }
};

const pillarOrder = ["art", "music", "fashion", "auto", "tech"];
const actionOrder = ["connect", "collaborate", "create"];

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
      <section className="flyer-page p-4 sm:p-6 lg:p-8">
        <div className="flyer-inner">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="pill pill-hot">INTERACTIVE FLYER OS</span>
              <span className="pill border-white/10 bg-white/[.04] text-white/68">ATLAS RUNS UNDERNEATH</span>
              <span className="pill pill-live">TSC FACE</span>
            </div>
            <StatusPill ok={ok===true} />
          </div>

          <div className="grid gap-5 xl:grid-cols-[1fr_420px]">
            <div className="min-h-[680px] rounded-[32px] border border-white/10 bg-black/30 p-4 sm:p-6 lg:p-8">
              <div className="grid gap-5 lg:grid-cols-[150px_1fr_150px]">
                <div className="hidden lg:flex items-stretch justify-center rounded-[28px] border border-white/10 bg-white/[.035] p-4">
                  <div className="flyer-microtype text-xs font-black uppercase text-white/42">Art Music Fashion Auto Tech</div>
                </div>

                <div>
                  <div className="orange-slab mb-4 inline-flex -rotate-1 px-5 py-2 text-xs font-black uppercase tracking-[.28em]">
                    The Street Collective
                  </div>

                  <button
                    type="button"
                    onClick={()=>setActive("profile")}
                    className={`group block w-full text-left ${active === "profile" ? "opacity-100" : "opacity-90"}`}
                  >
                    <div className="relative overflow-hidden rounded-[34px] border border-white/12 bg-white/[.035] p-5 sm:p-7 transition-all group-hover:border-orange-400/45 group-hover:bg-orange-500/[.06]">
                      <div className="kicker mb-3">Profile / command dossier</div>
                      <div className="tsc-mark">TSC</div>
                      <div className="mt-2 text-2xl font-black uppercase tracking-tight sm:text-4xl">
                        Atlas powered. Culture facing.
                      </div>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
                        Tap the flyer. Each mark opens a studio, intake, connector path, or profile layer. Atlas stays the brain in the background.
                      </p>
                    </div>
                  </button>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                    {pillarOrder.map((key)=> {
                      const zone = zones[key];
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={()=>setActive(key)}
                          className={`flyer-zone ${active === key ? "active" : ""} min-h-[150px] rounded-[26px] p-4 text-left`}
                        >
                          <div className="text-2xl font-black uppercase tracking-tight sm:text-3xl">{zone.label}</div>
                          <div className="mt-2 text-[10px] uppercase tracking-[.22em] text-orange-100/70">{zone.eyebrow}</div>
                          <p className="mt-5 text-xs leading-5 text-white/64">{zone.title}</p>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-3">
                    {actionOrder.map((key)=> {
                      const zone = zones[key];
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={()=>setActive(key)}
                          className={`flyer-action ${active === key ? "active" : ""} orange-slab rounded-[26px] p-4 text-left`}
                        >
                          <div className="text-2xl font-black uppercase tracking-tight">{zone.label}</div>
                          <div className="mt-2 text-[10px] font-black uppercase tracking-[.24em] text-black/64">{zone.eyebrow}</div>
                          <p className="mt-4 text-xs font-semibold leading-5 text-black/75">{zone.title}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="hidden lg:flex items-stretch justify-center rounded-[28px] border border-white/10 bg-white/[.035] p-4">
                  <div className="flyer-microtype text-xs font-black uppercase text-white/42">Connect Collaborate Create</div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-4">
                <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                  <div className="kicker">Engine</div>
                  <div className="mt-2 text-xl font-black">Atlas</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                  <div className="kicker">Face</div>
                  <div className="mt-2 text-xl font-black">TSC</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                  <div className="kicker">Flow</div>
                  <div className="mt-2 text-xl font-black">Studios</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                  <div className="kicker">Rule</div>
                  <div className="mt-2 text-xl font-black">Approve</div>
                </div>
              </div>
            </div>

            <aside className="flyer-panel rounded-[32px] p-5 sm:p-6 lg:sticky lg:top-8 lg:self-start">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <div className="kicker">Selected zone</div>
                  <h2 className="mt-2 text-4xl font-black uppercase tracking-tighter">{selected.label}</h2>
                </div>
                <span className="pill pill-hot">TAP LIVE</span>
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
                <div className="kicker text-lime-100/72">Atlas routing</div>
                <p className="mt-3 text-sm leading-7 text-white/72">
                  This panel is still demo-safe. Later, each tap routes into project records, contact records, assets, tasks, connected apps, and an approval wall.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
