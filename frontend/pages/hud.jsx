import Layout from "../components/Layout";
import Tile from "../components/Tile";

const modeChips = ["Now", "Capture", "Build", "TSC", "School", "Garage"];

const activeMode = {
  mode: "Build",
  title: "Command Center v0",
  status: "Identity pass active",
  steps: [
    "Keep the cockpit readable.",
    "Make the HUD feel current.",
    "Use safe placeholder data only."
  ]
};

const sideCards = [
  { label: "TSC", value: "Proof > hype" },
  { label: "Contact Map", value: "Skills + resources" },
  { label: "School", value: "One concept" },
  { label: "Garage", value: "Safety first" }
];

export default function HudPrototype(){
  return (
    <Layout>
      <header className="mb-6">
        <div className="kicker mb-2">Atlas Wearable HUD v0.1</div>
        <h1 className="h1 glow-text">The glasses are the windshield.</h1>
        <p className="mt-4 max-w-2xl text-sm md:text-base leading-7 text-white/74">
          A web-first HUD prototype for glanceable Atlas cards: calm, useful, hands-free minded, and rooted in the TSC command language.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[440px_1fr]">
        <div className="hud-frame mx-auto w-full max-w-[440px] p-4">
          <div className="mb-4 flex items-center justify-between rounded-full border border-white/10 bg-black/32 px-4 py-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--lime)] shadow-[0_0_20px_rgba(183,255,60,.9)]" />
              <span className="text-xs font-black uppercase tracking-[.2em] text-white/78">Atlas HUD</span>
            </div>
            <span className="text-xs text-white/50">demo / safe</span>
          </div>

          <div className="hud-card mb-4 p-5">
            <div className="kicker">Now card</div>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Keep the build moving.</h2>
            <p className="mt-3 text-sm leading-6 text-white/74">
              Priority: make Atlas feel like TSC before adding heavier features.
            </p>
            <div className="accent-line my-4" />
            <p className="text-sm font-semibold text-lime-100/90">Keep your hands on the wheel.</p>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {modeChips.map((mode)=> (
              <span key={mode} className={`pill ${mode === activeMode.mode ? "pill-hot" : "border-white/10 bg-white/[.04] text-white/60"}`}>
                {mode}
              </span>
            ))}
          </div>

          <div className="hud-card p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="kicker">Active mode / {activeMode.mode}</div>
                <h3 className="mt-1 text-xl font-black tracking-tight">{activeMode.title}</h3>
              </div>
              <span className="pill pill-live">LIVE</span>
            </div>
            <p className="mt-3 text-sm text-white/60">{activeMode.status}</p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-white/78">
              {activeMode.steps.map((step)=> (
                <li key={step} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--orange)]" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {sideCards.map((card)=> (
              <div key={card.label} className="rounded-2xl border border-white/10 bg-white/[.035] p-3 text-center">
                <div className="text-[10px] uppercase tracking-[.16em] text-white/38">{card.label}</div>
                <div className="mt-1 text-[11px] font-bold leading-4 text-white/74">{card.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <button className="btn btn-primary justify-center">Capture</button>
            <button className="btn justify-center">Next</button>
            <button className="btn justify-center">Done</button>
          </div>
        </div>

        <div className="grid content-start gap-5">
          <Tile title="HUD principle" subtitle="Glance, don't drown">
            <p className="text-sm leading-7 text-white/76">
              The HUD should show the next useful card, not the whole app. It is a windshield, not the engine bay.
            </p>
          </Tile>
          <Tile title="Privacy boundary" subtitle="No creepy behavior">
            <p className="text-sm leading-7 text-white/76">
              Demo data only. No always-on recording, no face recognition, no hidden capture, and no protected family records in the public repo.
            </p>
          </Tile>
          <Tile title="Future inputs" subtitle="Later connection points">
            <div className="flex flex-wrap gap-2">
              <span className="pill border-white/10 bg-white/[.04] text-white/62">voice</span>
              <span className="pill border-white/10 bg-white/[.04] text-white/62">gesture</span>
              <span className="pill border-white/10 bg-white/[.04] text-white/62">tasks</span>
              <span className="pill border-white/10 bg-white/[.04] text-white/62">notes</span>
              <span className="pill border-white/10 bg-white/[.04] text-white/62">projects</span>
              <span className="pill border-white/10 bg-white/[.04] text-white/62">contacts</span>
            </div>
          </Tile>
        </div>
      </section>
    </Layout>
  );
}
