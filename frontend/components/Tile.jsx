export default function Tile({ title, subtitle, children, right }) {
  return (
    <section className="tile">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="kicker">{subtitle}</div>
          <h3 className="text-base md:text-lg font-semibold tracking-tight">{title}</h3>
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}
