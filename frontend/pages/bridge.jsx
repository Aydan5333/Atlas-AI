import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import Unlock from "../components/Unlock";
import { request, listItems, createItem, updateItem, deleteItem } from "../lib/api";

const pillars = ["Art", "Music", "Fashion", "Auto", "Tech", "Education"];
const platforms = ["Instagram", "TikTok", "YouTube Shorts", "YouTube", "Other"];
const objectives = [
  ["show_work", "Show the work"], ["collaborate", "Find collaborators"],
  ["commission", "Sell creative work"], ["service", "Find paid service work"],
  ["community", "Build the community"]
];
const fresh = () => ({ kind: "content", title: "", body: "", lane: "Content", status: "planned", project_id: null, content: { objective: "show_work", audience: "", series: "", pillars: [], platforms: [], call_to_action: "", asset_link: "", post_links: [], published_on: null, views: 0, saves: 0, inquiries: 0, paid_projects: 0, revenue: "0.00" } });
const cash = n => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(n || 0));

export default function Bridge() {
  const [auth, setAuth] = useState(false), [checked, setChecked] = useState(false);
  const [records, setRecords] = useState([]), [draft, setDraft] = useState(fresh()), [editing, setEditing] = useState(null);
  const [dirty, setDirty] = useState(false), [busy, setBusy] = useState(false), [error, setError] = useState(""), [notice, setNotice] = useState("");
  async function refresh() { setRecords(await listItems()); }
  async function init() { try { const session = await request("session"); setAuth(session.authenticated); if (session.authenticated) await refresh(); } catch (e) { setError(e.message); } finally { setChecked(true); } }
  useEffect(() => { init(); }, []);
  const posts = records.filter(r => r.kind === "content").sort((a,b) => (b.content?.published_on || b.updated_at || "").localeCompare(a.content?.published_on || a.updated_at || ""));
  const projects = records.filter(r => r.kind === "project");
  const summary = useMemo(() => posts.reduce((m, p) => { const c=p.content||{}; m.inquiries += Number(c.inquiries||0); m.paid += Number(c.paid_projects||0); m.revenue += Number(c.revenue||0); m.views += Number(c.views||0); return m; }, { inquiries: 0, paid: 0, revenue: 0, views: 0 }), [posts]);
  function patchRoot(p) { setDraft(d => ({...d,...p})); setDirty(true); setNotice(""); }
  function patchContent(p) { setDraft(d => ({...d,content:{...d.content,...p}})); setDirty(true); setNotice(""); }
  function toggle(field, value) { const current=draft.content[field]||[]; patchContent({[field]:current.includes(value)?current.filter(x=>x!==value):[...current,value]}); }
  function open(item) { if(dirty && !window.confirm("Discard unsaved content changes?")) return; const {id,...rest}=item; setEditing(id); setDraft({...fresh(),...rest,content:{...fresh().content,...(item.content||{})}}); setDirty(false); setError(""); setNotice(""); window.scrollTo({top:0,behavior:"smooth"}); }
  async function save(e) { e.preventDefault(); setBusy(true); setError(""); try { const p={...draft,title:draft.title.trim(),content:{...draft.content,revenue:String(draft.content.revenue||"0")}}; const result=editing?await updateItem(editing,p):await createItem(p); setEditing(result.item.id); setDraft(result.item); setDirty(false); await refresh(); setNotice("Saved in Atlas. Publish manually, then add the live links and results here."); } catch(e) { setError(e.message); } finally { setBusy(false); } }
  async function followUp(item) { setBusy(true);setError("");try { const c=item.content||{}; const project=projects.find(p=>p.id===item.project_id); const title=`Follow up: ${item.title}`; const exists=records.find(r=>r.kind==="task"&&r.title===title&&r.status!=="done"); if(!exists) await createItem({kind:"task",title,lane:"TSC",status:"active",project_id:project?.id||null,body:`Check replies and inquiries from this content. Follow CTA: ${c.call_to_action||"Review the post and respond."}`}); await refresh(); setNotice(exists?"An open follow-up task already exists.":"Follow-up saved as an Atlas task. Choose it on Today."); }catch(e){setError(e.message);}finally{setBusy(false);} }
  async function remove(item) { if(!window.confirm(`Delete “${item.title}”?`))return;try{await deleteItem(item.id);if(editing===item.id){setEditing(null);setDraft(fresh());setDirty(false);}await refresh();}catch(e){setError(e.message);} }
  return <Layout><Head><title>Atlas · Creator Bridge</title></Head><div className="core-workspace">
    <header className="core-header"><div><div className="kicker">TSC / CREATOR BRIDGE</div><h1>Make it.<br/>Put it in the world.</h1><p>Turn one real piece of work into a post, a conversation, and—when it happens—a paid project.</p></div></header>
    {!checked?<p>Opening Creator Bridge…</p>:!auth?<Unlock onUnlocked={init}/>:<>
      <nav className="core-actions"><Link href="/today">← Today</Link><Link href="/workspace">Contacts and follow-ups →</Link><Link href="/business">TSC Blueprint →</Link></nav>
      <section className="daily-panel"><h2>The loop</h2><p><strong>Capture one source asset → share the story on selected channels → invite one useful next step → respond personally → log inquiries and paid work.</strong></p><p>This page records your plan and results. Social posting, automatic outreach, artist discovery, payment processing, and revenue are not connected. Views are attention; only a real inquiry or paid project is business evidence.</p></section>
      <div className="core-metrics">
        <div><strong>{summary.views.toLocaleString()}</strong><span>Logged views</span></div><div><strong>{summary.inquiries}</strong><span>Inquiries logged</span></div><div><strong>{summary.paid}</strong><span>Paid projects logged</span></div><div><strong>{cash(summary.revenue)}</strong><span>Revenue entered</span></div>
      </div>
      <div className="core-columns bridge-columns">
        <section><h2>{editing?"Edit content record":"Plan a post"}</h2><form className="core-form" onSubmit={save}>
          <label>Post / piece title<input required maxLength={200} value={draft.title} onChange={e=>patchRoot({title:e.target.value})} placeholder="Example: Building the first TSC show-car concept"/></label>
          <label>What is the story or caption?<textarea rows={6} maxLength={20000} value={draft.body} onChange={e=>patchRoot({body:e.target.value})} placeholder="Show the process and the person behind the work. End with one honest next step."/></label>
          <label>Who should this reach?<input maxLength={500} value={draft.content.audience||""} onChange={e=>patchContent({audience:e.target.value})} placeholder="Albuquerque artists, independent musicians, builders…"/></label>
          <label>Series / project name<input maxLength={200} value={draft.content.series||""} onChange={e=>patchContent({series:e.target.value})} placeholder="Example: TSC builds in progress"/></label>
          <label>Purpose<select value={draft.content.objective} onChange={e=>patchContent({objective:e.target.value})}>{objectives.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
          <fieldset className="bridge-choice"><legend>TSC pillars shown</legend><div>{pillars.map(x=><label key={x}><input type="checkbox" checked={draft.content.pillars?.includes(x)||false} onChange={()=>toggle("pillars",x)}/>{x}</label>)}</div></fieldset>
          <fieldset className="bridge-choice"><legend>Where you intend to publish</legend><div>{platforms.map(x=><label key={x}><input type="checkbox" checked={draft.content.platforms?.includes(x)||false} onChange={()=>toggle("platforms",x)}/>{x}</label>)}</div></fieldset>
          <label>One clear call to action<input maxLength={500} value={draft.content.call_to_action||""} onChange={e=>patchContent({call_to_action:e.target.value})} placeholder="DM ‘COLLAB’ with your role + one idea"/></label>
          <label>Source asset / portfolio link<input type="url" maxLength={2000} value={draft.content.asset_link||""} onChange={e=>patchContent({asset_link:e.target.value})} placeholder="Link to your approved work, drive file, or reel"/></label>
          <label>Related TSC project<select value={draft.project_id||""} onChange={e=>patchRoot({project_id:e.target.value||null})}><option value="">None</option>{projects.map(p=><option key={p.id} value={p.id}>{p.title}</option>)}</select></label>
          <label>Stage<select value={draft.status} onChange={e=>patchRoot({status:e.target.value})}><option value="planned">Planned</option><option value="active">In progress</option><option value="done">Published</option><option value="blocked">Blocked</option></select></label>
          <label>Date published<input type="date" value={draft.content.published_on||""} onChange={e=>patchContent({published_on:e.target.value||null})}/></label>
          <label>Live post links (one per line)<textarea rows={3} maxLength={10000} value={(draft.content.post_links||[]).join("\n")} onChange={e=>patchContent({post_links:e.target.value.split("\n").map(x=>x.trim()).filter(Boolean).slice(0,5)})} placeholder="Paste real public post URLs after you publish"/></label>
          <h3>Results to log after posting</h3><div className="bridge-metrics">{[["views","Views"],["saves","Saves"],["inquiries","Real inquiries"],["paid_projects","Paid projects"]].map(([k,l])=><label key={k}>{l}<input type="number" min="0" step="1" value={draft.content[k]||0} onChange={e=>patchContent({[k]:Number(e.target.value)})}/></label>)}<label>Revenue collected (USD)<input type="number" min="0" step="0.01" value={draft.content.revenue||"0"} onChange={e=>patchContent({revenue:e.target.value})}/></label></div>
          <button disabled={busy||!draft.title.trim()}>{busy?"Saving…":editing?"Save changes":"Save content plan"}</button>{editing&&<button type="button" onClick={()=>{setEditing(null);setDraft(fresh());setDirty(false);}}>New post</button>}<p role="status">{dirty?"Unsaved changes. ":""}{notice}</p>
        </form></section>
        <section><h2>Content and proof log</h2><p>Use one recurring piece of work to create several honest angles: process, finished result, the people involved, and an invitation. Don’t promise a collab until it is agreed.</p><div className="core-list">{posts.map(item=>{const c=item.content||{};return <article key={item.id}><div className="core-record-header"><h3>{item.title}</h3><span data-status={item.status}>{item.status}</span></div><p>{objectives.find(([v])=>v===c.objective)?.[1]||"Content"}{c.published_on?` · ${c.published_on}`:""}{c.series?` · ${c.series}`:""}</p><p>{c.audience||"Audience not entered"}<br/><small>{(c.pillars||[]).join(" · ")} · {(c.platforms||[]).join(" / ")}</small></p><p>{c.call_to_action||"No CTA yet"}</p>{item.body&&<p style={{whiteSpace:"pre-wrap"}}>{item.body}</p>}{c.asset_link&&<p><a href={c.asset_link} target="_blank" rel="noreferrer">Open source asset</a></p>}{(c.post_links||[]).map((url,i)=><p key={i}><a href={url} target="_blank" rel="noreferrer">Open published post {i+1}</a></p>)}<small>{Number(c.views||0).toLocaleString()} views · {c.inquiries||0} inquiries · {c.paid_projects||0} paid · {cash(c.revenue)}</small><div className="core-actions"><button onClick={()=>open(item)}>Edit / log results</button><button disabled={busy} onClick={()=>followUp(item)}>Add follow-up task</button><button onClick={()=>remove(item)}>Delete</button></div></article>})}{!posts.length&&<p className="core-empty">No posts logged yet. Start with one finished piece you already have.</p>}</div>
        <details className="core-roadmap"><summary>What this proves—and what it doesn’t</summary><p>Atlas totals the numbers you enter. It cannot verify platform analytics, know whether revenue is paid, rank artists, publish on your behalf, or prove worldwide demand. Keep the first test local to Albuquerque and the Southwest; expand after the content creates real conversations and paid demand.</p></details></section>
      </div>
    </>}{error&&<p className="core-error" role="alert">{error}</p>}</div></Layout>;
}
