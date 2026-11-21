import { useState } from "react";
import { request } from "../lib/api";
export default function Unlock({ onUnlocked }) {
  const [token, setToken] = useState(""); const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  return <form className="core-unlock" onSubmit={async e => { e.preventDefault(); setBusy(true); setError(""); try { await request("session", { method: "POST", body: JSON.stringify({ token }) }); setToken(""); onUnlocked(); } catch (err) { setError(err.message); } finally { setBusy(false); } }}>
    <h2>Unlock your workspace</h2><p>Enter the private access token generated during local setup.</p>
    <label>Access token<input type="password" autoComplete="current-password" value={token} onChange={e => setToken(e.target.value)} required /></label>
    <button disabled={busy}>{busy ? "Unlocking…" : "Unlock Atlas"}</button>{error && <p role="alert">{error}</p>}
  </form>;
}
