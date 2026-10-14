import { timingSafeEqual } from "node:crypto";

const permitted = /^(health|system\/status|architect\/briefing|notes\/(list|search|add|delete)|profiles\/(get|upsert)|workspace\/(items(?:\/[a-f0-9-]+)?|export)|briefing|capabilities)$/;
const attempts = new Map();
function matches(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const left = Buffer.from(a); const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const token = process.env.ATLAS_ACCESS_TOKEN || "";
  if (token.length < 32) return res.status(503).json({ detail: "Atlas access token is not configured" });
  const path = (req.query.path || []).join("/");
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  const cookie = (value, age) => `atlas_session=${value}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${age}${secure}`;
  if (req.method !== "GET" && req.headers.origin) {
    try {
      const origin = new URL(req.headers.origin);
      if (origin.host !== req.headers.host) return res.status(403).json({ detail: "Origin not allowed" });
    } catch { return res.status(403).json({ detail: "Invalid origin" }); }
  }
  if (path === "session") {
    if (req.method === "DELETE") { res.setHeader("Set-Cookie", cookie("", 0)); return res.json({ ok: true }); }
    if (req.method === "GET") return res.json({ authenticated: matches(req.cookies.atlas_session, token) });
    if (req.method !== "POST") return res.status(405).end();
    // In-process throttle for this local build; use platform rate limits before public deployment.
    const stamp = Date.now();
    const recent = (attempts.get("login") || []).filter(t => stamp - t < 60000);
    if (recent.length >= 10) return res.status(429).json({ detail: "Too many attempts. Try again in a minute." });
    attempts.set("login", [...recent, stamp]);
    if (!matches(req.body?.token, token)) return res.status(401).json({ detail: "Incorrect access token" });
    res.setHeader("Set-Cookie", cookie(token, 28800)); return res.json({ ok: true });
  }
  if (!matches(req.cookies.atlas_session, token)) return res.status(401).json({ detail: "Unlock Atlas first" });
  if (!permitted.test(path)) return res.status(404).json({ detail: "Unknown Atlas route" });
  const url = new URL(path, `${(process.env.ATLAS_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "")}/`);
  for (const [key, value] of Object.entries(req.query)) if (key !== "path" && typeof value === "string") url.searchParams.set(key, value);
  try {
    const upstream = await fetch(url, { method: req.method, headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, ...(req.method === "GET" || req.method === "HEAD" ? {} : { body: JSON.stringify(req.body) }), signal: AbortSignal.timeout(15000), redirect: "error" });
    const body = await upstream.text();
    res.status(upstream.status).setHeader("Content-Type", "application/json"); res.send(body);
  } catch { res.status(502).json({ detail: "Atlas API is unavailable. Check that the backend is running." }); }
}
