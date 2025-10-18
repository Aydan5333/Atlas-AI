import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Tile from "../components/Tile";
import { listNotes, addNote, searchNotes, deleteNote } from "../lib/api";

const USER = "test";

export default function NotesPage(){
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const [q, setQ] = useState("");

  async function refresh(){ const r = await listNotes(USER); setItems(r.items || []); }
  useEffect(()=>{ refresh(); },[]);

  return (
    <Layout>
      <Tile title="Add note">
        <form onSubmit={async(e)=>{e.preventDefault(); if(!text.trim()) return; await addNote({user_id:USER, text}); setText(""); refresh();}}>
          <div className="flex gap-2">
            <input className="input" placeholder="Type and Enter…" value={text} onChange={e=>setText(e.target.value)} />
            <button className="btn" type="submit">Add</button>
          </div>
        </form>
      </Tile>

      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <Tile title="Search">
          <div className="flex gap-2">
            <input className="input" placeholder="keyword" value={q} onChange={e=>setQ(e.target.value)} />
            <button className="btn" onClick={async()=>{ const r = await searchNotes(USER, q); setItems(r.items||[]); }}>Go</button>
          </div>
        </Tile>

        <Tile title="All notes">
          <ul className="space-y-2">
            {items.map(n=>(
              <li key={n.id} className="flex items-center justify-between bg-white/5 rounded px-3 py-2">
                <span className="truncate">{n.text}</span>
                <button className="btn" onClick={async()=>{ await deleteNote(n.id); refresh(); }}>Delete</button>
              </li>
            ))}
            {items.length===0 && <li className="opacity-60">No notes</li>}
          </ul>
        </Tile>
      </div>
    </Layout>
  );
}
