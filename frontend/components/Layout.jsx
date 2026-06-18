import Link from "next/link";

const NavLink = ({ href, children }) => (
  <Link
    href={href}
    className="group flex items-center justify-between rounded-2xl border border-white/[.06] bg-white/[.025] px-3 py-2.5 text-sm text-white/76 transition-all hover:border-orange-400/35 hover:bg-orange-500/[.08] hover:text-white"
  >
    <span>{children}</span>
    <span className="h-1.5 w-1.5 rounded-full bg-white/20 transition-all group-hover:bg-[var(--orange)] group-hover:shadow-[0_0_18px_rgba(255,106,0,.8)]" />
  </Link>
);

export default function Layout({ children }) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[280px_1fr]">
      <aside className="relative z-10 md:h-screen md:sticky md:top-0 border-r border-white/[.08] bg-black/35 backdrop-blur-xl">
        <div className="p-5 border-b border-white/[.08]">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-orange-400/35 bg-orange-500/10 text-sm font-black text-orange-200 shadow-[0_0_32px_rgba(255,106,0,.16)]">
              TSC
            </div>
            <div>
              <div className="kicker">TSC / Atlas</div>
              <div className="mt-1 text-xl font-black tracking-tight">Flyer OS</div>
            </div>
          </div>
        </div>

        <nav className="p-3 space-y-2">
          <NavLink href="/">TSC Flyer</NavLink>
          <NavLink href="/atlas">Atlas Brain</NavLink>
          <NavLink href="/hud">HUD Layer</NavLink>
          <NavLink href="/architect">Architect</NavLink>
          <NavLink href="/notes">Notes</NavLink>
          <NavLink href="/profile">Profile</NavLink>
          <NavLink href="/scheduler">Scheduler</NavLink>
          <NavLink href="/chat">Chat</NavLink>
          <NavLink href="/system">System</NavLink>
        </nav>

        <div className="mx-3 mb-4 mt-4 rounded-3xl border border-lime-300/20 bg-lime-300/[.06] p-4">
          <div className="kicker text-lime-100/70">Mission lock</div>
          <div className="mt-2 text-sm leading-6 text-white/75">
            TSC is the face. Atlas is the brain. Approval before action.
          </div>
        </div>
      </aside>

      <main className="relative z-10">
        <div className="container-xx py-6 md:py-10">{children}</div>
      </main>
    </div>
  );
}
