import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import Unlock from "../components/Unlock";
import { request, listItems, createItem, updateItem } from "../lib/api";

function localDate() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; }
const emptyPlan = { focus_ids: [], commitments: "", review: "" };
export default function Today() {
  const [date, setDate] = useState(""); const [authenticated, setAuthenticated] = useState(false); const [checked, setChecked] = useState(false);
  const [data, setData] = useState(null); const [tasks, setTasks] = useState([]); const [plan, setPlan] = useState(emptyPlan);
  const [dirty, setDirty] = useState(false); const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [notice, setNotice] = useState("");
  const [title, setTitle] = useState(""); const [lane, setLane] = useState("TSC"); const [speech, setSpeech] = useState(false); const [speaking, setSpeaking] = useState(false);
  const generation = useRef(0);
  async function load(day) {
    const seq = ++generation.current;
    const [summary, records] = await Promise.all([request(`daily/${day}`), listItems()]);
    if (seq !== generation.current) return;
    setData(summary); setPlan(summary.plan); setTasks(records.filter(r => r.kind === "task")); setDirty(false);
  }
  async function initialize(day) { try { const s = await request("session"); setAuthenticated(s.authenticated); if (s.authenticated) await load(day); } catch(e) { setError(e.message); } finally { setChecked(true); } }
  useEffect(() => { const day = localDate(); setDate(day); initialize(day); setSpeech("speechSynthesis" in window && "SpeechSynthesisUtterance" in window); return () => { generation.current++; window.speechSynthesis?.cancel(); }; }, []);
  function change(patch) { setPlan(p => ({...p,...patch})); setDirty(true); setNotice(""); }
  async function save() { setBusy(true); setError(""); try { const result = await request(`daily/${date}`, { method: "PUT", body: JSON.stringify(plan) }); setData(result); setDirty(false); setNotice("Daily plan and review saved."); } catch(e) { setError(e.message); } finally { setBusy(false); } }
  async function add(e) { e.preventDefault(); setBusy(true); setError(""); try { await createItem({kind:"task",title:title.trim(),lane,status:"active",due_date:date}); const records = await listItems(); setTasks(records.filter(r=>r.kind==="task")); setTitle(""); setNotice("Task saved. Select it as a priority below."); } catch(e) { setError(e.message); } finally { setBusy(false); } }
  async function complete(item) { setBusy(true); setError(""); try { await updateItem(item.id, {...item,status:item.status==="done"?"active":"done"}); const summary = await request(`daily/${date}`); const records = await listItems(); setData(summary); setTasks(records.filter(r=>r.kind==="task")); } catch(e) { setError(e.message); } finally { setBusy(false); } }
  function speak() { window.speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(data.spoken_text); u.onend=()=>setSpeaking(false); u.onerror=()=>{setSpeaking(false);setError("Voice playback failed. Read the briefing below or try again.");}; setSpeaking(true); window.speechSynthesis.speak(u); }
  return <Layout><Head><title>Atlas · Today</title></Head><div className="core-workspace">
    <header className="core-header"><div><div className="kicker">ATLAS / DAILY COMMAND</div><h1>Keep your hands<br/>on the wheel.</h1><p>One day. Three priorities. A clear next move.</p></div>{authenticated && <button onClick={async()=>{if(dirty && !window.confirm("Discard unsaved plan changes and lock?"))return;window.speechSynthesis?.cancel();setSpeaking(false);await request("session",{method:"DELETE"});setAuthenticated(false);setData(null);setPlan(emptyPlan);setTasks([]);}}>Lock</button>}</header>
    {!checked ? <p>Opening your day…</p> : !authenticated ? <Unlock onUnlocked={()=>initialize(date)}/> : <>
      <nav className="core-actions"><Link href="/workspace">All records →</Link><Link href="/business">TSC business blueprint →</Link></nav>
      <label className="core-search">Plan date<input type="date" required value={date} disabled={busy} onChange={async e=>{const next=e.target.value;if(!next)return;if(dirty&&!window.confirm("Discard unsaved changes and switch dates?"))return;setDate(next);setBusy(true);setData(null);setError("");setNotice("");window.speechSynthesis?.cancel();setSpeaking(false);try{await load(next);}catch(err){setError(err.message);}finally{setBusy(false);}}}/></label>
      <p>Uses your device’s local date. Commitments are entered by you; calendar sync is not connected.</p>
      {data && <>
        <div className="core-metrics"><div><strong>{data.open_tasks}</strong><span>Open tasks</span></div><div><strong>{data.overdue.length}</strong><span>Overdue</span></div><div><strong>{data.blockers.length}</strong><span>Blocked</span></div><div><strong>{data.completed_focus}/{data.focus.length}</strong><span>Saved priorities done</span></div></div>
        <section className="daily-panel"><h2>Your morning briefing</h2><p>{data.spoken_text}</p><div className="core-actions"><button disabled={!speech || dirty || busy} onClick={speak}>Read briefing aloud</button>{speaking&&<button onClick={()=>{window.speechSynthesis.cancel();setSpeaking(false);}}>Stop reading</button>}</div><p><small>{!speech?"Voice playback is unavailable in this browser. ":""}Start audio with the button. Atlas does not ring, call, or wake your device while this page is closed.</small></p></section>
        <div className="core-columns daily-columns"><section className="daily-panel"><h2>Choose your three priorities</h2><div className="daily-choices">{tasks.filter(t=>t.status!=="done"||plan.focus_ids.includes(t.id)).map(task=><label key={task.id}><input type="checkbox" checked={plan.focus_ids.includes(task.id)} disabled={busy||(!plan.focus_ids.includes(task.id)&&plan.focus_ids.length>=3)} onChange={e=>change({focus_ids:e.target.checked?[...plan.focus_ids,task.id]:plan.focus_ids.filter(id=>id!==task.id)})}/><span>{task.title} <small>· {task.lane} · {task.status}</small></span></label>)}{!tasks.length&&<p>Add a task to begin.</p>}</div>
        <label className="core-search">Commitments / appointments<textarea rows={4} value={plan.commitments} onChange={e=>change({commitments:e.target.value})} maxLength={5000} placeholder="Times, school, family, client work…"/></label>
        <label className="core-search">Evening review<textarea rows={4} value={plan.review} onChange={e=>change({review:e.target.value})} maxLength={5000} placeholder="What moved forward? What got stuck? What comes tomorrow?"/></label>
        <button disabled={busy||!dirty} onClick={save}>{busy?"Working…":"Save daily plan"}</button><p role="status">{dirty?"Unsaved changes — save to update your briefing.":notice}</p></section>
        <section><h2>Make the next move</h2><form className="core-form" onSubmit={add}><label>Quick task<input required maxLength={200} value={title} onChange={e=>setTitle(e.target.value)}/></label><label>Task lane<select value={lane} onChange={e=>setLane(e.target.value)}>{["TSC","Atlas","School","Garage","Content","Family","Finance","Memory"].map(l=><option key={l}>{l}</option>)}</select></label><button disabled={busy||!title.trim()} type="submit">Add task for this date</button></form>
        <h2>Saved priorities</h2><div className="core-list">{data.focus.map(t=><article key={t.id}><h3>{t.title}</h3><p>{t.body}</p><small>{t.lane} · {t.status}</small><div className="core-actions"><button disabled={busy} onClick={()=>complete(t)}>{t.status==="done"?"Reopen":"Complete"}</button></div></article>)}</div>
        <h2>Due / overdue / blocked</h2><div className="core-list">{[...new Map([...data.overdue,...data.due,...data.blockers].map(t=>[t.id,t])).values()].map(t=><article key={t.id}><h3>{t.title}</h3><p>{t.status} {t.due_date?`· Due ${t.due_date}`:""}</p></article>)}</div></section></div>
      </>}
    </>}{error&&<p className="core-error" role="alert">{error}</p>}
  </div></Layout>;
}
