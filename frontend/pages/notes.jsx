import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Tile from "../components/Tile";
import Unlock from "../components/Unlock";
import { request, listNotes, addNote, searchNotes, deleteNote } from "../lib/api";
export default function NotesPage() {
  const [items, setItems] = useState([]); const [text, setText] = useState(""); const [q, setQ] = useState("");
  const [unlocked, setUnlocked] = useState(false); const [error, setError] = useState("");
  async function refresh() { setItems(await listNotes("local")); }
  async function initialize() { try { const s = await request("session"); setUnlocked(s.authenticated); if (s.authenticated) await refresh(); } catch (err) { setError(err.message); } }
  useEffect(() => { initialize(); }, []);
  return <Layout><div className="core-workspace"><h1>Notes</h1>{!unlocked ? <Unlock onUnlocked={initialize} /> : <><form className="core-form" onSubmit={async e => { e.preventDefault(); if (!text.trim()) return; try { await addNote("local", text); setText(""); await refresh(); setError(""); } catch (err) { setError(err.message); } }}><label>Capture a note<textarea required value={text} onChange={e => setText(e.target.value)} /></label><button>Save note</button></form><form className="core-form" onSubmit={async e => { e.preventDefault(); try { setItems(await searchNotes("local", q)); } catch (err) { setError(err.message); } }}><label>Search<input value={q} onChange={e => setQ(e.target.value)} /></label><button>Search</button></form><div className="core-list">{items.map(n => <article key={n.id}><p style={{ whiteSpace: "pre-wrap" }}>{n.text}</p><button onClick={async () => { if (!window.confirm("Delete this note?")) return; try { await deleteNote(n.id); await refresh(); } catch (err) { setError(err.message); } }}>Delete</button></article>)}{!items.length && <p>No notes yet.</p>}</div></>}{error && <p role="alert">{error}</p>}</div></Layout>;
}
