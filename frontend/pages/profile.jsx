import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Tile from "../components/Tile";
import { getProfile, upsertProfile } from "../lib/api";
const USER_ID = "test";

export default function ProfilePage() {
  const [display_name, setName] = useState("");
  const [avatar_url, setAvatar] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getProfile(USER_ID);
        const p = res.profile || {};
        setName(p.display_name || "");
        setAvatar(p.avatar_url || "");
      } catch {}
    })();
  }, []);

  async function onSave(e) {
    e.preventDefault();
    await upsertProfile({ user_id: USER_ID, display_name, avatar_url });
    setMsg("Saved!");
    setTimeout(()=>setMsg(""), 1500);
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <Tile title="Your Info">
        <form onSubmit={onSave} className="flex flex-col gap-3 max-w-md">
          <label className="text-xs opacity-70">Display name</label>
          <input className="rounded bg-black/30 border border-white/10 px-2 py-1"
                 value={display_name} onChange={e=>setName(e.target.value)} />
          <label className="text-xs opacity-70">Avatar URL</label>
          <input className="rounded bg-black/30 border border-white/10 px-2 py-1"
                 value={avatar_url} onChange={e=>setAvatar(e.target.value)} />
          <button className="rounded bg-white/10 px-3 py-1 border border-white/10 hover:bg-white/20 w-fit">
            Save
          </button>
          {msg && <div className="text-xs opacity-70">{msg}</div>}
        </form>
      </Tile>
    </Layout>
  );
}
