import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Tile from "../components/Tile";
import { BASE } from "../lib/api";

const fallbackBriefing = {
  agent: "Atlas Architect",
  status: "local fallback",
  mission:
    "Track emerging technology, protect the Atlas/TSC vision, and turn useful updates into experiments, roadmap changes, and build tasks.",
  focus_areas: [
    "AI models and agent orchestration",
    "Wearables, smart glasses, and HUD interfaces",
    "Voice AI and multimodal capture",
    "CAD, 3D scanning, automotive, and FSAE tools",
    "Creator tools for TSC art, music, fashion, and auto content",
    "Education technology for school and family learning",
    "Business automation, sponsorship, grants, and operations",
  ],
  decision_tags: ["ignore", "watch", "research", "prototype", "integrate", "strategic_priority"],
  current_priorities: [
    {
      title: "Stabilize Atlas Core",
      why: "Atlas needs a reliable dashboard, API, notes, profile, and task foundation before larger agents can safely stack on top.",
      move: "Keep the current repo alive, fix broken routes, and build small feature branches.",
    },
    {
      title: "Prepare Atlas HUD",
      why: "Smart-glasses display access creates a real path for glanceable Atlas cards in the garage, classroom, events, and family routines.",
      move: "Design a lightweight HUD view with Now, Capture, Build Mode, TSC Mode, and School Mode.",
    },
    {
      title: "Designated Agent Layer",
      why: "Atlas should stay the head while agents handle TSC, school, garage, content, family, finance, and architecture lanes.",
      move: "Document agent roles first, then connect them to real API routes and UI cards.",
    },
  ],
  guardrails: [
    "Atlas is the head; tools and agents are extensions.",
    "Do not chase hype without a small testable experiment.",
    "Keep code changes small, reviewable, and backed up.",
    "Privacy and security rules stay locked even as life changes.",
    "No more asi dejalo: finish what we start.",
  ],
  next_experiments: [
    "Create an Atlas HUD page for smart-glasses-sized cards.",
    "Add an innovation radar table with update, source, impact, tag, and next move.",
    "Create first agent cards for TSC, School, Garage, Content, Family, Finance, and Architect.",
    "Connect the Chat page to a backend command router when model keys are configured.",
  ],
};

function List({ items }) {
  return (
    <ul className="space-y-2 text-sm leading-6 text-white/85">
      {(items || []).map((item) => (
        <li key={item}>• {item}</li>
      ))}
    </ul>
  );
}

export default function Architect() {
  const [briefing, setBriefing] = useState(fallbackBriefing);
  const [source, setSource] = useState("fallback");

  useEffect(() => {
    let ignore = false;

    async function loadBriefing() {
      try {
        const r = await fetch(`${BASE}/architect/briefing`, { cache: "no-store" });
        if (!r.ok) throw new Error("Architect briefing unavailable");
        const data = await r.json();
        if (!ignore) {
          setBriefing(data);
          setSource("api");
        }
      } catch {
        if (!ignore) setSource("fallback");
      }
    }

    if (BASE) loadBriefing();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Layout>
      <header className="mb-6">
        <div className="kicker">Atlas Agent Layer</div>
        <h1 className="h1 mt-1">Atlas Architect</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-white/75">
          The innovation radar and technical strategy agent for Atlas and The Street Collective. It watches what changes, filters out hype, and turns the useful stuff into build moves.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
        <Tile title={briefing.agent} subtitle={`Status: ${briefing.status}`}>
          <p className="text-sm leading-6 text-white/85">{briefing.mission}</p>
          <div className="kicker mt-4">Source: {source === "api" ? "FastAPI /architect/briefing" : "Local fallback"}</div>
        </Tile>

        <Tile title="Decision Tags" subtitle="Filter">
          <div className="flex flex-wrap gap-2">
            {(briefing.decision_tags || []).map((tag) => (
              <span key={tag} className="pill border-white/10 bg-[#15161a] text-white/80">
                {tag.replace("_", " ")}
              </span>
            ))}
          </div>
        </Tile>
      </div>

      <div className="grid gap-5 mt-5 lg:grid-cols-3">
        <Tile title="Focus Areas" subtitle="Radar">
          <List items={briefing.focus_areas} />
        </Tile>

        <Tile title="Guardrails" subtitle="Rules">
          <List items={briefing.guardrails} />
        </Tile>

        <Tile title="Next Experiments" subtitle="Build Queue">
          <List items={briefing.next_experiments} />
        </Tile>
      </div>

      <div className="grid gap-5 mt-5 md:grid-cols-3">
        {(briefing.current_priorities || []).map((priority) => (
          <Tile key={priority.title} title={priority.title} subtitle="Priority">
            <p className="text-sm leading-6 text-white/85">{priority.why}</p>
            <p className="mt-3 text-sm leading-6 text-white/65"><span className="text-white/90">Move:</span> {priority.move}</p>
          </Tile>
        ))}
      </div>
    </Layout>
  );
}
