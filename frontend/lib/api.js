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
  // Try /health then /api/health
  try {
    const r1 = await fetch(`${BASE}/health`, { cache: "no-store" });
    if (r1.ok) return r1.json();
  } catch {}
  const r2 = await fetch(`${BASE}/api/health`, { cache: "no-store" }).catch(() => null);
  if (!r2 || !r2.ok) return { ok: false };
  return r2.json();
}

/* ----------------------------------------------------------------------------
   NOTES API (matches FastAPI routes):
   - list:  GET  /notes/list?user_id=...
   - add:   POST /notes/add        body: { text } + query: user_id
   - search:GET  /notes/search?user_id=...&q=...
   - delete:POST /notes/delete     body: { note_id }
---------------------------------------------------------------------------- */

export async function listNotes(user_id) {
  const url = new URL(`${BASE}/notes/list`);
  url.searchParams.set("user_id", user_id);
  // Backend returns { items: [...] }
  const data = await j(await fetch(url, { cache: "no-store" }));
  return Array.isArray(data?.items) ? data.items : [];
}

export async function addNote(user_id, text) {
  const url = new URL(`${BASE}/notes/add`);
  url.searchParams.set("user_id", user_id);
  const data = await j(
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })
  );
  // some backends return object; normalize to the note object if present
  return data?.item || data;
}

// keep createNote as an alias for older imports
export const createNote = (...args) => addNote(...args);

export async function searchNotes(user_id, q = "") {
  const url = new URL(`${BASE}/notes/search`);
  url.searchParams.set("user_id", user_id);
  if (q) url.searchParams.set("q", q);

  // Preferred: server search
  try {
    const r = await fetch(url, { cache: "no-store" });
    if (r.ok) {
      const data = await r.json();
      return Array.isArray(data?.items) ? data.items : [];
    }
  } catch {}

  // Fallback: client-side filter on listNotes()
  const all = await listNotes(user_id).catch(() => []);
  const qq = (q || "").toLowerCase();
  return all.filter((n) => {
    const t = (n.text || n.body || n.title || "").toLowerCase();
    return qq ? t.includes(qq) : true;
  });
}

export async function deleteNote(note_id) {
  try {
    const r = await fetch(`${BASE}/notes/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note_id }),
    });
    if (r.ok) return r.json(); // expect { ok: true }
  } catch {}
  return { ok: false };
}

/* ----------------------------------------------------------------------------
   PROFILES
   - get:    GET  /profiles/get?user_id=...
   - upsert: POST /profiles/upsert body: { user_id, display_name?, avatar_url? }
---------------------------------------------------------------------------- */

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
