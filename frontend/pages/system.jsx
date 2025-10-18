import Layout from "../components/Layout";
import Tile from "../components/Tile";
import { BASE } from "../lib/api";

export default function System(){
  return (
    <Layout>
      <h1 className="h1 mb-6">System</h1>
      <Tile title="Config" subtitle="Environment">
        <div className="text-sm">API Base: <code>{BASE}</code></div>
        <div className="kicker mt-2">
          Patrol heartbeat will appear on Scheduler after the first run.
        </div>
      </Tile>
    </Layout>
  );
}
