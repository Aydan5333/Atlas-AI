import Layout from "../components/Layout";
import Tile from "../components/Tile";

const hudModes = [
  {
    mode: "Now",
    title: "Today Card",
    lines: [
      "Priority: keep Atlas clean-sweep moving.",
      "Next: review PR #2 status.",
      "Grounding: keep your hands on the wheel."
    ]
  },
  {
    mode: "Capture",
    title: "Quick Note",
    lines: [
      "Save idea.",
      "Save shot concept.",
      "Save follow-up."
    ]
  },
  {
    mode: "Build Mode",
    title: "Active Project",
    lines: [
      "Project: Atlas Command Center v0.",
      "Step: cockpit cards first.",
      "Proof: screenshot when demo-ready."
    ]
  },
  {
    mode: "TSC Mode",
    title: "Content Prompt",
    lines: [
      "Show the mission.",
      "Show the build path.",
      "Show the proof, not the hype."
    ]
  },
  {
    mode: "School Mode",
    title: "Study Prompt",
    lines: [
      "One concept at a time.",
      "Write the steps.",
      "Connect it to real building."
    ]
  },
  {
    mode: "Garage Mode",
    title: "Checklist",
    lines: [
      "Safety first.",
      "Tools ready.",
      "Next step only."
    ]
  }
];

export default function HudPrototype(){
  return (
    <Layout>
      <header className="mb-6">
        <div className="kicker mb-2">Atlas Wearable HUD v0.1</div>
        <h1 className="h1">The glasses are the windshield. Atlas is the engine.</h1>
        <p className="mt-3 max-w-2xl text-sm md:text-base text-white/75">
          This is a web-first prototype for a future glasses-friendly display layer. Keep it glanceable, calm, and useful.
        </p>
      </header>

      <div className="mx-auto max-w-sm rounded-[2rem] border border-white/10 bg-black/30 p-4 shadow-2xl">
        <div className="mb-4 rounded-2xl border border-white/10 bg-[#101114] p-4">
          <div className="kicker">HUD status</div>
          <div className="mt-1 text-lg font-semibold">Atlas HUD online</div>
          <div className="mt-2 text-xs leading-5 text-white/65">
            Demo data only. No always-on recording. No creepy behavior. User-initiated capture only.
          </div>
        </div>

        <div className="space-y-3">
          {hudModes.map((card)=>(
            <section key={card.mode} className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="kicker">{card.mode}</div>
                  <h2 className="text-base font-semibold">{card.title}</h2>
                </div>
                <span className="pill border-white/10 bg-black/20 text-white/70">HUD</span>
              </div>
              <ul className="mt-3 space-y-1 text-sm leading-6 text-white/80">
                {card.lines.map((line)=>(
                  <li key={line}>• {line}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <section className="mt-6 grid gap-5 md:grid-cols-2">
        <Tile title="Input principle" subtitle="Simple controls">
          <p className="text-sm leading-6 text-white/80">
            Start with a web page and mocked cards. Later, connect voice, gestures, tasks, notes, projects, contacts, and calendar.
          </p>
        </Tile>
        <Tile title="Build boundary" subtitle="Do not overbuild">
          <p className="text-sm leading-6 text-white/80">
            HUD v0.1 should prove the layout and the feeling first. Native glasses integration comes after the cockpit is stable.
          </p>
        </Tile>
      </section>
    </Layout>
  );
}
