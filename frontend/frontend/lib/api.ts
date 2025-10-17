// frontend/lib/api.ts

// 1) Export the resolved BASE (trim any trailing "/")
export const BASE = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, "");

// Small JSON helper
async function j<T>(r: Response): Promise<T> {
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return (await r.json()) as T;
}

/** Health: try /health then /api/health */
export async function apiHealth() {
  try {
    return await j<{ ok: boolean }>(await fetch(`${BASE}/health`, { cache: "no-store" }));
  } catch {
    return await j<{ ok: boolean }>(await fetch(`${BASE}/api/health`, { cache: "no-store" }));
  }
}

/** Notes */
export type Note = { id: number; text: string; created_at: string };

export async function listNotes(user_id: string) {
  const url = new URL(`${BASE}/notes/list`);
  url.searchParams.set("user_id", user_id);
  return j<{ items: Note[] }>(await fetch(url, { cache: "no-store" }));
}

// Backend expects POST body { user_id, text }
export async function addNote(user_id: string, text: string) {
  return j<Note>(
    await fetch(`${BASE}/notes/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, text }),
    })
  );
}

export async function searchNotes(user_id: string, q: string) {
  const url = new URL(`${BASE}/notes/search`);
  url.searchParams.set("user_id", user_id);
  url.searchParams.set("q", q);
  return j<{ items: Note[] }>(await fetch(url, { cache: "no-store" }));
}

export async function deleteNote(note_id: number) {
  return j<{ ok: true }>(
    await fetch(`${BASE}/notes/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note_id }),
    })
  );
}

/** Profile */
export type Profile = { user_id: string; display_name?: string; avatar_url?: string };

export async function getProfile(user_id: string) {
  const url = new URL(`${BASE}/profiles/get`);
  url.searchParams.set("user_id", user_id);
  return j<{ profile: Profile | null }>(await fetch(url, { cache: "no-store" }));
}

export async function upsertProfile(p: Profile) {
  return j<{ ok: true }>(
    await fetch(`${BASE}/profiles/upsert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    })
  );
}