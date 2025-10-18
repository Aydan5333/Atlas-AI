export default function StatusPill({ ok }) {
  return (
    <span className={`pill ${ok ? "pill-ok" : "pill-bad"}`}>
      <span className="inline-block w-2 h-2 rounded-full" style={{background: ok ? "#6be093" : "#ff6b6b"}} />
      {ok ? "OK" : "FAIL"}
    </span>
  );
}
