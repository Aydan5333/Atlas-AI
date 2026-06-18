import { useMemo, useState } from "react";
import Layout from "../components/Layout";
import Tile from "../components/Tile";

const lanes = [
  {
    name: "Atlas Architect",
    tag: "tech strategy",
    purpose: "Route new tech updates into experiments, roadmap changes, and safe build tasks.",
  },
  {
    name: "TSC Agent",
    tag: "business + culture",
    purpose: "Turn art, music, fashion, auto, events, sponsors, and content into weekly execution.",
  },
  {
    name: "School Agent",
    tag: "learning",
    purpose: "Break classes, assignments, formulas, and study blocks into manageable steps.",
  },
  {
    name: "Garage Agent",
    tag: "automotive",
    purpose: "Organize builds, diagnostics, tools, parts, checklists, and FSAE learning.",
  },
];

function chooseLane(text) {
  const clean = text.toLowerCase();
  if (clean.includes("meta") || clean.includes("github") || clean.includes("agent") || clean.includes("tech")) return lanes[0];
  if (clean.includes("tsc") || clean.includes("content") || clean.includes("brand") || clean.includes("sponsor")) return lanes[1];
  if (clean.includes("math") || clean.includes("chem") || clean.includes("school") || clean.includes("class")) return lanes[2];
  if (clean.includes("truck") || clean.includes("car") || clean.includes("garage") || clean.includes("fsae")) return lanes[3];
  return lanes[0];
}

export default function Chat() {
  const [command, setCommand] = useState("");
  const lane = useMemo(() => chooseLane(command), [command]);
  const hasCommand = command.trim().length > 0;

  return (
    <Layout>
      <header className="mb-6">
        <div className="kicker">Atlas Command Router</div>
        <h1 className="h1 mt-1">Chat</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-white/75">
          This is the command intake page. Right now it routes your message to the right Atlas lane locally. Next, we connect it to the backend command router and model provider once secrets are configured.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <Tile title="Command Intake" subtitle="Tell Atlas what changed">
          <label className="label" htmlFor="atlas-command">Command</label>
          <textarea
            id="atlas-command"
            className="input mt-2 min-h-[160px]"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Example: Meta glasses updated developer display access. What should Atlas Architect do with this?"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="btn btn-primary" type="button" onClick={() => setCommand("Meta glasses updated developer display access. Build Atlas HUD next.")}>Try Architect</button>
            <button className="btn" type="button" onClick={() => setCommand("Plan this week's TSC content around Atlas and smart glasses.")}>Try TSC</button>
            <button className="btn" type="button" onClick={() => setCommand("Help me study math and chemistry today without getting overwhelmed.")}>Try School</button>
            <button className="btn" type="button" onClick={() => setCommand("Create a garage checklist for the F-150 and future S14 build.")}>Try Garage</button>
          </div>
        </Tile>

        <Tile title="Suggested Route" subtitle="Agent Lane">
          <div className="text-2xl font-semibold tracking-tight">{lane.name}</div>
          <div className="kicker mt-1">{lane.tag}</div>
          <p className="mt-4 text-sm leading-6 text-white/80">{lane.purpose}</p>
          <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/75">
            {hasCommand ? (
              <>
                <div className="kicker mb-2">Next backend move</div>
                Save command, classify lane, retrieve memory, generate next action, and log the build/task output.
              </>
            ) : (
              "Type a command to see where Atlas would route it."
            )}
          </div>
        </Tile>
      </div>

      <div className="grid gap-5 mt-5 md:grid-cols-4">
        {lanes.map((item) => (
          <Tile key={item.name} title={item.name} subtitle={item.tag}>
            <p className="text-sm leading-6 text-white/80">{item.purpose}</p>
          </Tile>
        ))}
      </div>
    </Layout>
  );
}
