export default function Tile({ title, children }) {
  return (
    <section className="tile">
      <h2 className="font-semibold mb-2 text-gold">{title}</h2>
      {children}
    </section>
  );
}
