import { useEffect, useState } from "react";
import { apiHealth, BASE } from "../lib/api"; // ✅ import from your helper

export default function Home() {
  const [status, setStatus] = useState("Checking...");
  const [url, setUrl] = useState("");

  useEffect(() => {
    async function checkHealth() {
      try {
        const res = await apiHealth();
        setStatus(res.ok ? "OK" : "Fail");
      } catch {
        setStatus("Error");
      }
      setUrl(BASE || "(unset)");
    }
    checkHealth();
  }, []);

  return (
    <main style={{ padding: 20, fontFamily: "system-ui, sans-serif" }}>
      <h1>Atlas Dashboard</h1>
      <p>
        API health: <b>{status}</b>
      </p>
      <p style={{ opacity: 0.7, fontSize: 14 }}>
        Using: <code>{url}</code>
      </p>
    </main>
  );
}