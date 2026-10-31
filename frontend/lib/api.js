export const BASE = "/api/atlas";
export async function request(path, options = {}) {
  const response = await fetch(`${BASE}/${path}`, { cache: "no-store", ...options, headers: { "Content-Type": "application/json", ...options.headers } });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(typeof data.detail === "string" ? data.detail : `Request failed (${response.status})`);
  return data;
}
const post = (path, body) => request(path, { method: "POST", body: JSON.stringify(body) });
export const apiHealth = () => request("health");
export const listNotes = async (user_id = "local") => (await request(`notes/list?user_id=${encodeURIComponent(user_id)}`)).items;
export const addNote = async (user_id, text) => (await post(`notes/add?user_id=${encodeURIComponent(user_id)}`, { text })).item;
export const createNote = (...args) => addNote(...args);
export const searchNotes = async (user_id, q) => (await request(`notes/search?user_id=${encodeURIComponent(user_id)}&q=${encodeURIComponent(q)}`)).items;
export const deleteNote = note_id => post("notes/delete", { note_id });
export const getProfile = user_id => request(`profiles/get?user_id=${encodeURIComponent(user_id)}`);
export const upsertProfile = payload => post("profiles/upsert", payload);
export const listItems = async () => (await request("workspace/items")).items;
export const createItem = record => post("workspace/items", record);
export const updateItem = (id, record) => request(`workspace/items/${id}`, { method: "PUT", body: JSON.stringify(record) });
export const deleteItem = id => request(`workspace/items/${id}`, { method: "DELETE" });
