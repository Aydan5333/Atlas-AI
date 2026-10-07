import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Unlock from "../components/Unlock";
import { request, getProfile, upsertProfile } from "../lib/api";
export default function ProfilePage() {
  const [profile, setProfile] = useState({ user_id: "local", display_name: "", avatar_url: "" }); const [unlocked, setUnlocked] = useState(false); const [message, setMessage] = useState("");
  async function initialize() { try { const s = await request("session"); setUnlocked(s.authenticated); if (s.authenticated) setProfile(await getProfile("local")); } catch (err) { setMessage(err.message); } }
  useEffect(() => { initialize(); }, []);
  return <Layout><div className="core-workspace"><h1>Profile</h1>{!unlocked ? <Unlock onUnlocked={initialize} /> : <form className="core-form" onSubmit={async e => { e.preventDefault(); try { await upsertProfile(profile); setMessage("Profile saved."); } catch (err) { setMessage(err.message); } }}><label>Display name<input value={profile.display_name} onChange={e => setProfile({ ...profile, display_name: e.target.value })} /></label><label>Avatar URL<input type="url" value={profile.avatar_url} onChange={e => setProfile({ ...profile, avatar_url: e.target.value })} /></label><button>Save</button></form>}<p role="status">{message}</p></div></Layout>;
}
