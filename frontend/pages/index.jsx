import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Tile from "../components/Tile";
import StatusPill from "../components/StatusPill";
import { BASE } from "../lib/api";

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
    return ()=>{ ignore=true; }
  },[]);

  return (
    <Layout>
      <header className="mb-6">
        <h1 className="h1">Atlas Dashboard</h1>
        <p className="kicker mt-1">Your daily cockpit for school, work, TSC, family, garage, content, and life.</p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        <Tile title="API Health" subtitle="System" right={<StatusPill ok={ok===true} />}>
          <div className="text-sm text-white/80">
            {ok===null ? "Checking…" : ok ? "Backend reachable." : "Couldn’t reach backend."}
          </div>
          <div className="kicker mt-2">Using: {BASE}</div>
        </Tile>

        <Tile title="Atlas Architect" subtitle="Innovation Radar">
          <div className="text-sm leading-6 text-white/85">
            Tracks tech updates, filters hype, and turns the useful stuff into roadmap moves and tiny experiments.
          </div>
          <a className="btn btn-primary mt-4" href="/architect">Open Architect</a>
        </Tile>

        <Tile title="Morning Brief" subtitle="Today">
          <ul className="text-sm leading-6 text-white/85">
            <li>• Agenda & classes</li>
            <li>• Top 3 priorities for the day</li>
            <li>• Last patrol heartbeat</li>
            <li>• Agent lane to activate first</li>
          </ul>
        </Tile>

        <Tile title="Quick Notes" subtitle="Capture">
          <div className="text-sm text-white/80">
            Use the Notes page to add, search and delete notes. Next, Atlas will surface the latest notes here by lane.
          </div>
        </Tile>

        <Tile title="Shortcuts" subtitle="Navigate">
          <div className="flex flex-wrap gap-2">
            <a className="btn btn-primary" href="/chat">Command Atlas</a>
            <a className="btn" href="/architect">Architect</a>
            <a className="btn" href="/notes">Notes</a>
            <a className="btn" href="/profile">Profile</a>
            <a className="btn" href="/scheduler">Scheduler</a>
            <a className="btn" href="/system">System</a>
          </div>
        </Tile>

        <Tile title="TSC Mission" subtitle="Parent Entity">
          <div className="text-sm leading-6 text-white/85">
            TSC is the culture and mission. Atlas is the operating system. The agents become the designated lanes that keep the whole build moving.
          </div>
        </Tile>
      </div>
    </Layout>
  );
}
