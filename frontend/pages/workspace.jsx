import { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Unlock from "../components/Unlock";
import { request, listItems, createItem, updateItem, deleteItem } from "../lib/api";
const kinds = ["task", "project", "contact", "innovation", "note"];
const lanes = ["Atlas", "TSC", "School", "Garage", "Content", "Family", "Finance", "Memory"];
const statuses = ["planned", "active", "blocked", "done"];
const blank = kind => ({ kind, title: "", body: "", lane: "Atlas", status: "planned", skills: [], resources: [], project_id: null });

export default function Workspace() {
  const [authenticated, setAuthenticated] = useState(false); const [checked, setChecked] = useState(false);
  const [items, setItems] = useState([]); const [caps, setCaps] = useState(null); const [kind, setKind] = useState("task");
  const [draft, setDraft] = useState(blank("task")); const [editing, setEditing] = useState(null);
  const [q, setQ] = useState(""); const [error, setError] = useState(""); const [notice, setNotice] = useState(""); const [busy, setBusy] = useState(false);
  async function refresh() { const [records, capabilities] = await Promise.all([listItems(), request("capabilities")]); setItems(records); setCaps(capabilities); }
  async function initialize() { setError(""); try { const session = await request("session"); setAuthenticated(session.authenticated); if (session.authenticated) await refresh(); } catch (err) { setError(err.message); } finally { setChecked(true); } }
  useEffect(() => { initialize(); }, []);
  function selectKind(next) { setKind(next); setDraft(blank(next)); setEditing(null); setNotice(""); }
  async function save(e) { e.preventDefault(); setBusy(true); setError(""); setNotice(""); try { const payload = { ...draft, title: draft.title.trim() }; if (editing) await updateItem(editing, payload); else await createItem(payload); setDraft(blank(kind)); setEditing(null); await refresh(); setNotice("Saved to your workspace."); } catch (err) { setError(err.message); } finally { setBusy(false); } }
  const visible = items.filter(item => item.kind === kind && `${item.title} ${item.body} ${item.lane}`.toLowerCase().includes(q.toLowerCase()));
  const projects = items.filter(item => item.kind === "project");
  const blockers = items.filter(item => item.status === "blocked");
  return <Layout><Head><title>Atlas · Workspace</title></Head><div className="core-workspace">
    <header className="core-header"><div><div className="kicker">ATLAS / OPERATIONAL CORE</div><h1>Your next move.</h1><p>Capture the work. Connect the people. Finish the build.</p></div>{authenticated && <button onClick={async () => { await request("session", { method: "DELETE" }); setAuthenticated(false); setItems([]); setCaps(null); }}>Lock</button>}</header>
    {!checked ? <p>Checking workspace…</p> : !authenticated ? <Unlock onUnlocked={initialize} /> : <>
      <div className="core-metrics">{["task", "project", "contact", "note"].map(type => <button key={type} onClick={() => selectKind(type)}><strong>{items.filter(item => item.kind === type && (type !== "task" || item.status !== "done")).length}</strong><span>{type === "task" ? "Open tasks" : `${type}s`}</span></button>)}</div>
      {blockers.length > 0 && <div className="core-blockers"><strong>{blockers.length} blocked</strong> · {blockers.map(item => item.title).join(" · ")}</div>}
      <nav className="core-tabs" aria-label="Workspace records">{kinds.map(type => <button key={type} aria-pressed={kind === type} onClick={() => selectKind(type)}>{type === "innovation" ? "Innovation radar" : `${type}s`}</button>)}<button aria-pressed={kind === "connections"} onClick={() => selectKind("connections")}>Connections</button></nav>
      {kind === "connections" ? <section><h2>Connected apps are the hands.</h2><p>These connectors are planned. Connecting an app to ChatGPT does not automatically connect it to Atlas.</p><div className="core-list">{caps?.connectors.map(connector => <article key={connector.name}><h3>{connector.name}</h3><span>Not connected</span></article>)}</div></section> : <div className="core-columns">
        <section><h2>{editing ? "Edit" : "Add"} {kind === "innovation" ? "radar entry" : kind}</h2><form onSubmit={save} className="core-form">
          <label>Title<input maxLength={200} required value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} /></label>
          <label>{kind === "note" ? "Note" : "Details / next action"}<textarea rows={4} maxLength={20000} value={draft.body} onChange={e => setDraft({ ...draft, body: e.target.value })} /></label>
          <label>Lane<select value={draft.lane} onChange={e => setDraft({ ...draft, lane: e.target.value })}>{lanes.map(lane => <option key={lane}>{lane}</option>)}</select></label>
          <label>Status<select value={draft.status} onChange={e => setDraft({ ...draft, status: e.target.value })}>{statuses.map(status => <option key={status}>{status}</option>)}</select></label>
          {kind !== "project" && <label>Linked project<select value={draft.project_id || ""} onChange={e => setDraft({ ...draft, project_id: e.target.value || null })}><option value="">None</option>{projects.map(project => <option value={project.id} key={project.id}>{project.title}</option>)}</select></label>}
          {kind === "contact" && <><label>Skills (comma separated)<input value={draft.skills.join(",")} onChange={e => setDraft({ ...draft, skills: e.target.value.split(",") })} /></label><label>Tools / resources (comma separated)<input value={draft.resources.join(",")} onChange={e => setDraft({ ...draft, resources: e.target.value.split(",") })} /></label></>}
          <button disabled={busy} type="submit">{busy ? "Saving…" : editing ? "Save changes" : "Save"}</button>{editing && <button type="button" onClick={() => { setEditing(null); setDraft(blank(kind)); }}>Cancel</button>}
        </form></section>
        <section><label className="core-search">Search {kind}s<input value={q} onChange={e => setQ(e.target.value)} placeholder="Title, details, or lane" /></label><div className="core-list">{visible.map(item => <article key={item.id}><div className="core-record-header"><h3>{item.title}</h3><span data-status={item.status}>{item.status}</span></div><p style={{ whiteSpace: "pre-wrap" }}>{item.body}</p><small>{item.lane}{item.project_id ? ` · ${projects.find(p => p.id === item.project_id)?.title || "Project"}` : ""}</small>{item.kind === "contact" && <p><small>Skills: {item.skills.filter(Boolean).join(", ") || "None added"}<br />Resources: {item.resources.filter(Boolean).join(", ") || "None added"}</small></p>}<div className="core-actions"><button onClick={() => { setEditing(item.id); const { id, created_at, updated_at, ...record } = item; setDraft(record); }}>Edit</button>{item.kind === "task" && <button onClick={async () => { try { await updateItem(item.id, { ...item, status: item.status === "done" ? "active" : "done" }); await refresh(); } catch (err) { setError(err.message); } }}>{item.status === "done" ? "Reopen" : "Complete"}</button>}<button onClick={async () => { if (!window.confirm(`Delete “${item.title}”?`)) return; try { await deleteItem(item.id); await refresh(); } catch (err) { setError(err.message); } }}>Delete</button></div></article>)}{!visible.length && <p className="core-empty">No {kind}s yet. Add the first one to start.</p>}</div></section>
      </div>}
      <details className="core-roadmap"><summary>What works / what comes next</summary><h3>Implemented in this local build</h3><p>{caps?.implemented.join(" · ")}</p><h3>Still to build</h3><p>{caps?.planned.join(" · ")}</p><p>Storage: local SQLite. This is not the encrypted Survival / Legacy vault.</p></details>
      <button onClick={async () => { try { const data = await request("workspace/export"); const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })); const a = document.createElement("a"); a.href = url; a.download = `atlas-workspace-${new Date().toISOString().slice(0, 10)}.json`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); } catch (err) { setError(err.message); } }}>Export workspace</button>
    </>}{error && <p className="core-error" role="alert">{error}</p>}{notice && <p role="status">{notice}</p>}
  </div></Layout>;
}
