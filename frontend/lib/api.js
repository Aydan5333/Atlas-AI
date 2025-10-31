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
