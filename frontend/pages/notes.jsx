import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Tile from "../components/Tile";
import { listNotes, addNote, searchNotes, deleteNote } from "../lib/api";
const USER_ID = "test";

export default function NotesPage() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const [q, setQ] = useState("");

  async function refresh(){ const r = await listNotes(USER_ID); setItems(r.items||[]); }
  useEffect(()=>{ refresh(); }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Notes</h1>
      <div className="grid gap-4">
        <Tile title="Add">
          <form onSubmit={async e=>{e.preventDefault(); if(!text.trim())return; await addNote(USER_ID,text.trim()); setText(""); refresh();}} className="flex gap-2">
            <input className="flex-1 rounded bg-black/30 border border-white/10 px-2 py-1" value={text} onChange={e=>setText(e.target.value)} />
            <button className="rounded bg-white/10 px-3 py-1 border border-white/10 hover:bg-white/20">Add</button>
          </form>
        </Tile>
        <Tile title="Search">
          <form onSubmit={async e=>{e.preventDefault(); const r=await searchNotes(USER_ID,q.trim()); setItems(r.items||[]);}} className="flex gap-2">
            <input className="flex-1 rounded bg-black/30 border border-white/10 px-2 py-1" value={q} onChange={e=>setQ(e.target.value)} />
            <button className="rounded bg-white/10 px-3 py-1 border border-white/10 hover:bg-white/20">Search</button>
          </form>
        </Tile>
        <Tile title="All Notes">
          <ul className="space-y-2">
            {items.map(n=>(
              <li key={n.id} className="flex items-center justify-between">
                <span>{n.text}</span>
                <button onClick={async()=>{await deleteNote(n.id); refresh();}} className="text-xs text-rose-300 hover:underline">delete</button>
              </li>
            ))}
            {items.length===0 && <li className="text-xs opacity-60">No notes.</li>}
          </ul>
        </Tile>
      </div>
    </Layout>
  );
}
