export default function Tile({ title, children }) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/5 p-4">
      <h2 className="text-sm font-semibold mb-2 opacity-80">{title}</h2>
      <div className="text-sm">{children}</div>
    </section>
  );
}
