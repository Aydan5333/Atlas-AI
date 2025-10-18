import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Tile from "../components/Tile";

const HEARTBEAT_URL =
  "https://raw.githubusercontent.com/Aydan5333/Atlas-AI/main/.atlas/last_agent_run.json";

export default function SchedulerPage() {
  const [hb, setHb] = useState(null);
  useEffect(() => { (async () => {
    try { const r = await fetch(HEARTBEAT_URL, { cache: "no-store" });
      if (r.ok) setHb(await r.json()); } catch {}
  })(); }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Scheduler</h1>
      <div className="grid gap-4">
        <Tile title="Last Agent Run">
          {hb ? (
            <div className="text-sm">
              <div>Timestamp: <code>{hb.timestamp}</code></div>
              <div className="opacity-70 text-xs mt-1">API: <code>{hb.base_api}</code></div>
            </div>) : (
            <div className="text-sm opacity-70">No heartbeat yet. Run the workflow once.</div>
          )}
        </Tile>
        <Tile title="Actions">
          <a className="underline"
             href="https://github.com/Aydan5333/Atlas-AI/actions/workflows/atlas_agent.yml"
             target="_blank" rel="noreferrer">Open Atlas Agent workflow</a>
        </Tile>
      </div>
    </Layout>
  );
}
