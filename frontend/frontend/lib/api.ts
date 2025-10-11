const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

async function j<T>(r: Response): Promise<T> {
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return (await r.json()) as T;
}

export async function apiHealth() {
  return j<{ ok: boolean }>(await fetch(`${BASE}/health`, { cache: "no-store" }));
}

export async function listNotes(userId: string) {
  const url = new URL(`${BASE}/notes/list`);
  url.searchParams.set("user_id", userId);
  return j<{ items: { id: number; text: string; created_at: string }[] }>(
    await fetch(url, { cache: "no-store" })
  );
}

export async function addNote(userId: string, text: string) {
  const url = new URL(`${BASE}/notes/add`);
  url.searchParams.set("user_id", userId);
  return j<{ id: number; text: string; created_at: string }>(
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })
  );
}
