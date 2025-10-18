import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Tile from "../components/Tile";
import { getProfile, upsertProfile } from "../lib/api";

const USER = "test";

export default function ProfilePage(){
  const [display_name, setName] = useState("");
  const [avatar_url, setAvatar] = useState("");

  useEffect(()=>{
    getProfile(USER).then(r => {
      setName(r.display_name || "");
      setAvatar(r.avatar_url || "");
    }).catch(()=>{});
  },[]);

  return (
    <Layout>
      <Tile title="Profile">
        <form onSubmit={async(e)=>{e.preventDefault(); await upsertProfile({ user_id: USER, display_name, avatar_url }); alert("Saved"); }}>
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="block text-sm opacity-80">
              Display name
              <input className="input mt-1" value={display_name} onChange={e=>setName(e.target.value)} />
            </label>
            <label className="block text-sm opacity-80">
              Avatar URL
              <input className="input mt-1" value={avatar_url} onChange={e=>setAvatar(e.target.value)} />
            </label>
          </div>
          <button className="btn mt-3" type="submit">Save</button>
        </form>
      </Tile>
    </Layout>
  );
}
