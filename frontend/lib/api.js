// frontend/lib/api.js
export const BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

async function j(res) {
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return await res.json();
}

// Health (try both)
export async function apiHealth() {
  try {
    return await j(await fetch(`${BASE}/health`, { cache: "no-store" }));
  } catch {
    return await j(await fetch(`${BASE}/api/health`, { cache: "no-store" }));
  }
}

// Notes
export async function listNotes(user_id) {
  const url = new URL(`${BASE}/notes/list`);
  url.searchParams.set("user_id", user_id);
  return j(await fetch(url, { cache: "no-store" }));
}
export async function addNote(user_id, text) {
  return j(await fetch(`${BASE}/notes/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, text }),
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
    body: JSON.stringify({ note_id }),
  }));
}

// Profile
export async function getProfile(user_id) {
  const url = new URL(`${BASE}/profiles/get`);
  url.searchParams.set("user_id", user_id);
  return j(await fetch(url, { cache: "no-store" }));
}
export async function upsertProfile(payload) {
  return j(await fetch(`${BASE}/profiles/upsert`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }));
}
