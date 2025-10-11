import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("...");

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
    fetch(base + "/health")
      .then(r => r.json())
      .then(d => setStatus(d.ok ? "OK" : "Fail"))
      .catch(() => setStatus("Error"));
  }, []);

  return (
    <main style={{ padding: 20, fontFamily: "system-ui, sans-serif" }}>
      <h1>Atlas Dashboard</h1>
      <p>API health: <b>{status}</b></p>
      <p style={{opacity:.7, fontSize:14}}>
        Using: <code>NEXT_PUBLIC_API_BASE_URL</code>
      </p>
    </main>
  );
}
