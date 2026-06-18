import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatusPill from "../components/StatusPill";
import { BASE } from "../lib/api";

const zones = {
  atlas: {
    label: "ENTER ATLAS",
    eyebrow: "Brain behind the flyer",
    title: "Atlas runs the workflow underneath TSC.",
    body: "Atlas organizes projects, contacts, tasks, assets, connectors, reminders, approvals, and future creator app workflows while TSC stays the public face.",
    bullets: ["Workflow router", "Connector hub", "Approval wall", "Internal command center"]
  },
  profile: {
    label: "PROFILE",
    eyebrow: "Command dossier",
    title: "Aydan / TSC / Atlas profile layer",
    body: "Profile pulls from every pillar: identity, legacy, projects, capabilities, network, assets, roadmap, and connected apps.",
    bullets: ["Founder / builder / student / father", "TSC platform identity", "Atlas OS profile memory", "Pillar activity summary"]
  },
  art: {
    label: "ART",
    eyebrow: "Visual studio",
    title: "Visual art, design, photography, and creative expression.",
    body: "The Art studio holds visual ideas, references, brand marks, flyer systems, live art plans, and creative assets.",
    bullets: ["Moodboards and references", "Flyer and logo concepts", "Artist contacts", "Canva / Drive asset routing"]
  },
  music: {
    label: "MUSIC",
    eyebrow: "Sound studio",
    title: "Beats, lyrics, performance, and sound engineering.",
    body: "The Music studio prepares artist ideas, beats, DJ sets, samples, event sound, and future Ableton / FL / Serato workflows.",
    bullets: ["Beat and song ideas", "DJ set prep", "Serato / Ableton / FL roadmap", "Session notes and stems"]
  },
  fashion: {
    label: "FASHION",
    eyebrow: "Product studio",
    title: "Clothing, streetwear, brands, and creative fashion culture.",
    body: "The Fashion studio turns concepts into samples, vendor tasks, Canva mockups, Shopify draft paths, and launch plans.",
    bullets: ["Hat and tee concepts", "Sample checklists", "Vendor notes", "Shopify / payment path planning"]
  },
  auto: {
    label: "AUTO",
    eyebrow: "Garage studio",
    title: "Cars, builds, racing, and automotive lifestyle.",
    body: "The Auto studio organizes builds, car features, audio, fabrication ideas, FSAE learning, and content proof.",
    bullets: ["Build documentation", "Shoot and event prep", "Builder/vendor contacts", "Garage tasks and proof assets"]
  },
  tech: {
    label: "TECH",
    eyebrow: "Atlas studio",
    title: "Technology, AI, digital tools, and innovation.",
    body: "The Tech studio holds Atlas, Architect, HUD, connector registry, GitHub, app integrations, and workflow automation plans.",
    bullets: ["Atlas Creator Bridge", "Connector Hub", "GitHub roadmap", "Approval wall and safe routing"]
  },
  connect: {
    label: "CONNECT",
    eyebrow: "Link up",
    title: "Link up. Network. Stay connected across the world.",
    body: "Connect opens the public doorway: socials, email, shop, website, community, update list, and contact preferences.",
    bullets: ["Social links", "Email and website", "Shop and update list", "Interest tags for future follow-up"]
  },
  collaborate: {
    label: "COLLABORATE",
    eyebrow: "Build together",
    title: "Build together. Create together. Grow together.",
    body: "Collaborate collects structured info from artists, brands, builders, vendors, sponsors, and clients, then Atlas organizes it.",
    bullets: ["Who they are", "What they do", "Pillar fit", "Follow-up task and contact record"]
  },
  create: {
    label: "CREATE",
    eyebrow: "Where it begins",
    title: "Turn ideas into reality. This is where it begins.",
    body: "Create turns raw ideas into project drafts, pillar tags, asset needs, connector suggestions, and next-step checklists.",
    bullets: ["Product, event, content, song, build, or design", "Assets and help needed", "Pillar selection", "Draft before approval"]
  }
};

const pillarOrder = ["art", "music", "fashion", "auto", "tech"];
const actionOrder = ["connect", "collaborate", "create"];

const pillarIcons = {
  art: "✎",
  music: "▥",
  fashion: "⌁",
  auto: "⌾",
  tech: "</>"
};

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
      <section className="flyer-page p-3 sm:p-5 lg:p-7">
        <div className="flyer-inner">
          <div className="mb-4 grid gap-3 lg:grid-cols-[170px_1fr_220px]">
            <button type="button" onClick={()=>setActive("profile")} className="hidden rounded-[28px] border border-white/10 bg-black/35 p-5 text-left lg:block">
              <div className="text-4xl font-black uppercase leading-[.82] tracking-tighter text-orange-500">THE</div>
              <div className="mt-2 text-6xl font-black uppercase leading-[.82] tracking-tighter text-white/90">STREET</div>
              <div className="mt-2 text-3xl font-black uppercase leading-none text-orange-500">COLLECTIVE</div>
              <div className="mt-2 flex items-center gap-2 text-xl font-black uppercase text-white/82">◎ WORLDWIDE</div>
              <p className="mt-8 text-[11px] font-semibold uppercase leading-5 tracking-[.08em] text-white/72">Uniting artists, creators, builders and visionaries worldwide.</p>
              <div className="mt-6 h-10 w-28 border-y border-white/25 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,.85)_0_2px,transparent_2px_6px)] opacity-80" />
            </button>

            <div className="rounded-[30px] border border-white/10 bg-black/28 p-5 sm:p-7">
              <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="kicker text-white/75">Culture. Creativity. Connection.</div>
                  <div className="text-sm font-black uppercase tracking-[.24em] text-orange-500">We are The Street Collective.</div>
                </div>
                <div className="text-right">
                  <div className="kicker text-white/62">EST</div>
                  <div className="text-2xl font-black text-orange-500">2024</div>
                </div>
              </div>

              <button type="button" onClick={()=>setActive("profile")} className="group block w-full text-left">
                <div className="relative overflow-hidden rounded-[34px] border border-white/12 bg-white/[.035] p-5 sm:p-8 transition-all group-hover:border-orange-400/45 group-hover:bg-orange-500/[.06]">
                  <div className="absolute inset-x-10 top-0 h-44 rounded-full border border-white/10 opacity-70" />
                  <div className="relative mx-auto mb-2 h-16 w-40 rounded-t-full border border-white/25 opacity-60" />
                  <div className="relative text-center text-4xl font-black text-orange-500">♕</div>
                  <div className="tsc-mark relative text-center">TSC</div>
                  <div className="relative text-center text-2xl font-black uppercase tracking-tight sm:text-4xl">THE STREET COLLECTIVE</div>
                  <div className="tsc-script relative mt-3 text-center text-xl font-black text-orange-500 sm:text-2xl">More than a movement, it&apos;s a takeover</div>
                  <div className="relative mx-auto mt-5 inline-flex w-full max-w-xl items-center justify-center border border-white/55 bg-black/35 px-4 py-3 text-sm font-black uppercase tracking-[.18em] text-white/86">
                    ART <span className="mx-2 text-orange-500">×</span> MUSIC <span className="mx-2 text-orange-500">×</span> FASHION <span className="mx-2 text-orange-500">×</span> AUTO <span className="mx-2 text-orange-500">×</span> TECH
                  </div>
                </div>
              </button>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-black/30 p-4">
              <button type="button" onClick={()=>setActive("atlas")} className="mb-3 flex w-full items-center justify-between border border-orange-500/75 bg-black/55 px-4 py-3 text-sm font-black uppercase tracking-[.14em] text-white hover:bg-orange-500 hover:text-black">
                Enter Atlas <span>›</span>
              </button>
              <div className="mb-3 flex justify-end"><Globe className="h-14 w-14 text-white/85" /></div>
              <div className="grid gap-3">
                <button type="button" onClick={()=>setActive("music")} className="min-h-[118px] rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_35%_20%,rgba(255,255,255,.28),transparent_24%),linear-gradient(135deg,rgba(255,255,255,.10),rgba(0,0,0,.65))] p-4 text-left">
                  <div className="text-xs uppercase tracking-[.2em] text-orange-400">Live crowd / sound</div>
                </button>
                <button type="button" onClick={()=>setActive("auto")} className="min-h-[118px] rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_70%_70%,rgba(255,106,0,.38),transparent_18%),linear-gradient(135deg,rgba(255,255,255,.08),rgba(0,0,0,.68))] p-4 text-left">
                  <div className="text-xs uppercase tracking-[.2em] text-orange-400">City / build / motion</div>
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-5">
            {pillarOrder.map((key)=> {
              const zone = zones[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={()=>setActive(key)}
                  className={`flyer-zone ${active === key ? "active" : ""} min-h-[275px] rounded-[8px] p-4 text-center`}
                >
                  <div className="mb-5 h-20 rounded-xl border border-white/10 bg-[radial-gradient(circle_at_30%_15%,rgba(255,255,255,.22),transparent_22%),linear-gradient(135deg,rgba(255,255,255,.10),rgba(0,0,0,.72))]" />
                  <div className="text-5xl font-black uppercase tracking-tighter text-white/90">{zone.label}</div>
                  <div className="mt-4 text-3xl font-black text-orange-500">{pillarIcons[key]}</div>
                  <p className="mx-auto mt-4 max-w-[180px] text-[11px] font-semibold uppercase leading-5 tracking-[.08em] text-white/75">{zone.title}</p>
                  <div className="mx-auto mt-4 w-28 border border-orange-500 px-4 py-2 text-xs font-black uppercase text-orange-400">Enter</div>
                </button>
              );
            })}
          </div>

          <div className="orange-slab my-3 grid gap-0 rounded-[3px] md:grid-cols-3">
            {actionOrder.map((key)=> {
              const zone = zones[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={()=>setActive(key)}
                  className={`flyer-action ${active === key ? "active" : ""} border-black/30 p-5 text-left md:border-r`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-5xl text-black/80">{key === "connect" ? "↗" : key === "collaborate" ? "◇" : "✺"}</div>
                    <div>
                      <div className="text-3xl font-black uppercase tracking-tight text-black">{zone.label}</div>
                      <p className="mt-3 text-xs font-black uppercase leading-5 tracking-[.08em] text-black/82">{zone.title}</p>
                      <div className="mt-4 inline-flex items-center gap-3 bg-black px-4 py-2 text-xs font-black uppercase tracking-[.12em] text-white">{zone.label} <span className="text-orange-500">›</span></div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
            <button type="button" onClick={()=>setActive("profile")} className="rounded-[30px] border border-white/10 bg-black/30 p-5 text-left">
              <div className="grid gap-5 md:grid-cols-[.72fr_1fr]">
                <div>
                  <div className="text-4xl font-black uppercase leading-none tracking-tight">THE<br/>STREET<br/>COLLECTIVE</div>
                  <div className="mt-2 h-1 w-24 bg-orange-500" />
                  <p className="mt-5 text-sm uppercase leading-6 tracking-[.07em] text-white/70">A global collective of visionaries, creators, and leaders building the future of culture.</p>
                  <p className="mt-5 text-sm uppercase leading-6 tracking-[.07em] text-white/70">Respect the culture. Represent the movement. Leave a legacy.</p>
                  <div className="mt-5 text-sm font-black uppercase tracking-[.14em] text-orange-500">TSC Worldwide.</div>
                </div>
                <div className="min-h-[260px] rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,.16),transparent_22%),radial-gradient(circle_at_50%_50%,transparent_0_100px,rgba(255,255,255,.10)_102px_103px,transparent_105px),linear-gradient(135deg,rgba(255,106,0,.18),rgba(0,0,0,.62))]" />
              </div>
            </button>

            <button type="button" onClick={()=>setActive("profile")} className="rounded-[30px] border border-white/10 bg-black/30 p-5 text-left">
              <div className="grid gap-5 sm:grid-cols-[170px_1fr]">
                <div className="min-h-[210px] rounded-[3px] border-4 border-orange-500 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,.28),transparent_20%),linear-gradient(135deg,rgba(255,255,255,.12),rgba(0,0,0,.74))]" />
                <div>
                  <div className="text-5xl font-black uppercase leading-none tracking-tighter">PROFILE</div>
                  <div className="mt-2 text-xl font-black uppercase tracking-[.08em] text-orange-500">Command Dossier ↗</div>
                  <p className="mt-5 text-xs uppercase leading-6 tracking-[.09em] text-white/70">View my journey, projects, accomplishments, skills and impact.</p>
                  <ul className="mt-5 space-y-1 text-sm uppercase tracking-[.08em] text-white/75">
                    <li><span className="text-orange-500">✓</span> Management</li>
                    <li><span className="text-orange-500">✓</span> Brand Architect</li>
                    <li><span className="text-orange-500">✓</span> Creative Director</li>
                    <li><span className="text-orange-500">✓</span> AI Systems Architect</li>
                    <li><span className="text-orange-500">✓</span> Entrepreneur</li>
                  </ul>
                  <div className="mt-5 inline-flex border border-orange-500 px-5 py-3 text-xs font-black uppercase tracking-[.16em] text-white">View Profile</div>
                </div>
              </div>
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 text-xs font-black uppercase tracking-[.18em] text-white/65">
            <div className="flex gap-4 text-orange-500"><span>◎</span><span>▶</span><span>♪</span><span>𝕏</span><span>✉</span></div>
            <div>◎ TSC Worldwide</div>
            <div className="text-orange-500">Built different. Built to last.</div>
          </div>

          <div className="flyer-panel fixed inset-x-3 bottom-3 z-30 rounded-[28px] p-4 shadow-2xl lg:inset-auto lg:bottom-8 lg:right-8 lg:w-[390px]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="kicker text-orange-100/72">Selected zone</div>
                <h2 className="mt-1 text-3xl font-black uppercase tracking-tighter">{selected.label}</h2>
              </div>
              <StatusPill ok={ok===true} />
            </div>
            <div className="accent-line my-4" />
            <div className="kicker text-white/55">{selected.eyebrow}</div>
            <h3 className="mt-2 text-xl font-black tracking-tight">{selected.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/74">{selected.body}</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {selected.bullets.map((item)=> (
                <div key={item} className="flex gap-2 text-xs uppercase leading-5 tracking-[.06em] text-white/68">
                  <span className="text-orange-500">✓</span><span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
