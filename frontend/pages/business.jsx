import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import Unlock from "../components/Unlock";
import { request, listItems, createItem, updateItem } from "../lib/api";
const stages = [
  ["local_proof", "1 · Prove it locally", "Deliver a paid offer, record the real costs and customer feedback, and collect permission to show the work."],
  ["repeatable_operations", "2 · Make it repeatable", "Document quoting, delivery, quality checks, follow-up, capacity, and margins so someone else can run the process."],
  ["second_city", "3 · Prove a second city", "Name a local operator, confirm paid demand, budget the pilot, and compare delivery quality and margins before expanding again."],
  ["international", "4 · Test international demand", "Validate the destination market and local partner; cost shipping, returns, taxes and applicable requirements before committing funds."]
];
const fields = [
  ["offer","What are we selling?","One specific deliverable, scope, turnaround and price approach."],
  ["customer","Who is it for?","Ideal customer, problem, location and evidence they will pay."],
  ["economics","Does the offer make money?","Price minus materials, paid labor, delivery and fees. Record actual costs, capacity and cash needed."],
  ["acquisition","How will customers find us?","Referral partner, booking page, outreach or content channel; record leads and paid conversions."],
  ["proof","What have we proved?","Paid work, customer feedback, repeat purchases and approved photos. Include evidence links; label assumptions."],
  ["operations","How do we deliver consistently?","Owner, checklist, suppliers, quality standard, turnaround, follow-up and backup plan."],
  ["expansion_gate","What must be true before expansion?","Measurable demand, margin, capacity, partner and budget requirements. Enter current results against those targets."]
];
const fresh = () => ({kind:"project",title:"",lane:"TSC",status:"planned",body:"",blueprint:{stage:"local_proof",offer:"",customer:"",economics:"",acquisition:"",proof:"",operations:"",expansion_gate:"",next_action:""}});
export default function Business() {
  const [auth,setAuth]=useState(false); const [checked,setChecked]=useState(false); const [projects,setProjects]=useState([]);
  const [draft,setDraft]=useState(fresh()); const [id,setId]=useState(null); const [dirty,setDirty]=useState(false); const [busy,setBusy]=useState(false); const [error,setError]=useState(""); const [notice,setNotice]=useState("");
  async function refresh(){const records=await listItems();setProjects(records.filter(r=>r.kind==="project"&&r.blueprint));}
  async function init(){try{const s=await request("session");setAuth(s.authenticated);if(s.authenticated)await refresh();}catch(e){setError(e.message);}finally{setChecked(true);}}
  useEffect(()=>{init();},[]);
  function change(patch){setDraft(p=>({...p,...patch}));setDirty(true);setNotice("");}
  function field(key,value){change({blueprint:{...draft.blueprint,[key]:value}});}
  function choose(project){if(dirty&&!window.confirm("Discard unsaved blueprint changes?"))return;setDraft(project||fresh());setId(project?.id||null);setDirty(false);setNotice("");setError("");}
  async function save(e){e.preventDefault();setBusy(true);setError("");try{const payload={...draft,title:draft.title.trim()};const result=id?await updateItem(id,payload):await createItem(payload);setId(result.item.id);setDraft(result.item);setDirty(false);await refresh();setNotice("Business blueprint saved. Stage selection is your assessment; evidence belongs in the proof and expansion fields.");}catch(e){setError(e.message);}finally{setBusy(false);}}
  async function action(){setBusy(true);setError("");try{const records=await listItems();const title=draft.blueprint.next_action.trim();const existing=records.find(r=>r.kind==="task"&&r.project_id===id&&r.title===title&&r.status!=="done");if(!existing)await createItem({kind:"task",title,lane:"TSC",status:"active",project_id:id});setNotice(existing?"That next action is already an open linked task.":"Next action saved as a linked TSC task. Choose it on Today when ready.");}catch(e){setError(e.message);}finally{setBusy(false);}}
  return <Layout><Head><title>Atlas · TSC Blueprint</title></Head><div className="core-workspace"><header className="core-header"><div><div className="kicker">TSC / BUSINESS BLUEPRINT</div><h1>Build here.<br/>Prove the next city.</h1><p>Art · Music · Fashion · Auto · Tech · Education</p></div></header>
  {!checked?<p>Opening blueprints…</p>:!auth?<Unlock onUnlocked={init}/>:<>
  <nav className="core-actions"><Link href="/today">← Today</Link><Link href="/workspace">All projects and tasks →</Link></nav>
  <p>This is your editable planning framework. Stages and targets are recommendations until backed by your results; no revenue, partnerships, or completed work is assumed.</p>
  <div className="core-columns"><aside><h2>Your business projects</h2><button disabled={busy} onClick={()=>choose(null)}>New blueprint</button><div className="core-list">{projects.map(p=><article key={p.id}><h3>{p.title}</h3><p>{stages.find(s=>s[0]===p.blueprint.stage)?.[1]}</p><button disabled={busy} onClick={()=>choose(p)}>Open {p.title}</button></article>)}</div><h2>Expansion path</h2>{stages.map(([key,label,gate])=><section className="daily-panel" key={key}><h3>{label}</h3><p>{gate}</p></section>)}</aside>
  <section><h2>{id?"Edit blueprint":"Create a blueprint"}</h2><form className="core-form" onSubmit={save}><label>Business project name<input required maxLength={200} value={draft.title} onChange={e=>change({title:e.target.value})} placeholder="Example: TSC detailing offer"/></label>
  <label>Current stage<select value={draft.blueprint.stage} onChange={e=>field("stage",e.target.value)}>{stages.map(([key,label])=><option key={key} value={key}>{label}</option>)}</select></label>
  {fields.map(([key,label,hint])=><label key={key}>{label}<textarea rows={3} maxLength={3000} value={draft.blueprint[key]} onChange={e=>field(key,e.target.value)} placeholder={hint}/></label>)}
  <label>Next concrete action<input maxLength={200} value={draft.blueprint.next_action} onChange={e=>field("next_action",e.target.value)} placeholder="One action you can complete"/></label>
  <button disabled={busy||!draft.title.trim()} type="submit">{busy?"Working…":"Save blueprint"}</button><p role="status">{dirty?"Unsaved changes.":notice}</p></form>
  <button disabled={busy||dirty||!id||!draft.blueprint.next_action.trim()} onClick={action}>Add saved next action to tasks</button></section></div></>}{error&&<p className="core-error" role="alert">{error}</p>}
  </div></Layout>;
}
