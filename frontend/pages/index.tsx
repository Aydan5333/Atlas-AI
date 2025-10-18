import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState<string>("...");
  useEffect(() => {
    fetch((process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000") + "/health")
      .then(r => r.json())
      .then(d => setStatus(d.ok ? "OK" : "Fail"))
      .catch(() => setStatus("Error"));
  }, []);
  return (
    <main style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Atlas Dashboard</h1>
      <p>API health: <b>{status}</b></p>
    </main>
  );
}
