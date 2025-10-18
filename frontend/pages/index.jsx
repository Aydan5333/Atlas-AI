import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Tile from "../components/Tile";
import { BASE, apiHealth } from "../lib/api";

export default function Home() {
  const [status, setStatus] = useState("...");
  useEffect(() => { apiHealth().then(r => setStatus(r.ok ? "OK" : "FAIL")).catch(()=>setStatus("Error")); }, []);
  return (
    <Layout>
      <Tile title="API Health">
        <p>API health: <b>{status}</b></p>
        <p className="opacity-70 text-xs mt-1">Using: <code>{BASE || "MISSING NEXT_PUBLIC_API_BASE_URL"}</code></p>
      </Tile>
      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <Tile title="Quick Links">
          <ul className="list-disc ml-5">
            <li><a href="/notes">Notes</a></li>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/scheduler">Scheduler</a></li>
          </ul>
        </Tile>
        <Tile title="System">
          <p>Patrol writes <code>.atlas/last_agent_run.json</code>. Scheduler page shows the timestamp.</p>
        </Tile>
      </div>
    </Layout>
  );
}
