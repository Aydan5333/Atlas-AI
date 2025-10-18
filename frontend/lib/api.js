// Keep this file in plain JS.
export const BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/+$/, "");

async function j(r) {
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.json();
}

export async function apiHealth() {
  // Try /health then /api/health
  try {
    const r1 = await fetch(`${BASE}/health`, { cache: "no-store" });
    if (r1.ok) return j(r1);
  } catch (_) {}
  const r2 = await fetch(`${BASE}/api/health`, { cache: "no-store" });
  return r2.ok ? j(r2) : { ok: false };
}

// NOTES
export async function listNotes(user_id) {
  const url = new URL(`${BASE}/notes/list`);
  url.searchParams.set("user_id", user_id);
  return j(await fetch(url, { cache: "no-store" }));
}
export async function addNote({ user_id, text }) {
  const url = new URL(`${BASE}/notes/add`);
  url.searchParams.set("user_id", user_id);
  return j(await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  }));
}
export async function searchNotes(user_id, q) {
  const url = new URL(`${BASE}/notes/search`);
  url.searchParams.set("user_id", user_id);
  url.searchParams.set("q", q);
  return j(await fetch(url, { cache: "no-store" }));
}
export async function deleteNote(note_id) {
  return j(await fetch(`${BASE}/notes/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ note_id })
  }));
}

// PROFILE
export async function getProfile(user_id) {
  const url = new URL(`${BASE}/profiles/get`);
  url.searchParams.set("user_id", user_id);
  return j(await fetch(url, { cache: "no-store" }));
}
export async function upsertProfile(payload) {
  return j(await fetch(`${BASE}/profiles/upsert`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }));
}
