// frontend/lib/api.js

// Single source of truth for API base:
export const BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/+$/, "");

// tiny helper to parse/fail consistently
async function j(r) {
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.json();
}

// ---- health ----
export async function apiHealth() {
  // Try /health then /api/health (keeps compatibility with your backend)
  try {
    const r1 = await fetch(`${BASE}/health`, { cache: "no-store" });
    if (r1.ok) return r1.json();
  } catch {}
  const r2 = await fetch(`${BASE}/api/health`, { cache: "no-store" }).catch(() => null);
  if (!r2 || !r2.ok) return { ok: false };
  return r2.json();
}

// ---- notes ----
export async function listNotes(user_id) {
  const url = new URL(`${BASE}/notes/list`);
  url.searchParams.set("user_id", user_id);
  return j(await fetch(url, { cache: "no-store" }));
}

export async function createNote(payload) {
  return j(
    await fetch(`${BASE}/notes/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
  );
}

// ---- profiles ----
export async function getProfile(user_id) {
  const url = new URL(`${BASE}/profiles/get`);
  url.searchParams.set("user_id", user_id);
  return j(await fetch(url, { cache: "no-store" }));
}

export async function upsertProfile(payload) {
  return j(
    await fetch(`${BASE}/profiles/upsert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
  );
}
// --- compatibility exports for Notes page ---

// keep existing createNote but also export it as addNote
export const addNote = createNote;

// try server-side search first; if 404/unsupported, fall back to simple client filter
export async function searchNotes(user_id, q = "") {
  const url = new URL(`${BASE}/notes/search`);
  url.searchParams.set("user_id", user_id);
  if (q) url.searchParams.set("q", q);

  try {
    const r = await fetch(url, { cache: "no-store" });
    if (r.ok) return r.json();
  } catch {}

  // fallback: fetch all + filter
  const all = await listNotes(user_id).catch(() => []);
  const qq = q.toLowerCase();
  return all.filter(
    (n) =>
      (n.title && n.title.toLowerCase().includes(qq)) ||
      (n.body && n.body.toLowerCase().includes(qq))
  );
}

// server delete if available; otherwise return { ok:false } gracefully
export async function deleteNote(id) {
  try {
    const r = await fetch(`${BASE}/notes/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (r.ok) return r.json();
  } catch {}
  return { ok: false };
}
