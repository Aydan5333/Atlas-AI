export default function Tile({ title, subtitle, children, right, className = "" }) {
  return (
    <section className={`tile ${className}`}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          {subtitle ? <div className="kicker mb-1">{subtitle}</div> : null}
          <h3 className="text-lg md:text-xl font-black tracking-tight">{title}</h3>
        </div>
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
      {children}
    </section>
  );
}
