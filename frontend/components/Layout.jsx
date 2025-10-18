import Link from "next/link";

const NavLink = ({ href, children }) => (
  <Link href={href} className="block px-3 py-2 rounded-lg hover:bg-[#1a1b1f]">
    {children}
  </Link>
);

export default function Layout({ children }) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[240px_1fr]">
      {/* Sidebar */}
      <aside className="md:h-screen md:sticky md:top-0 border-r border-white/5 bg-[#0f1013]">
        <div className="p-5 border-b border-white/5">
          <div className="text-sm kicker">Atlas</div>
          <div className="mt-1 text-lg font-semibold">Command Center</div>
        </div>
        <nav className="p-3 space-y-1">
          <NavLink href="/">🏠 Dashboard</NavLink>
          <NavLink href="/notes">📝 Notes</NavLink>
          <NavLink href="/profile">🙍 Profile</NavLink>
          <NavLink href="/scheduler">⏱️ Scheduler</NavLink>
          <NavLink href="/chat">💬 Chat</NavLink>
          <NavLink href="/system">⚙️ System</NavLink>
        </nav>
        <div className="p-4 kicker">v1 • dark</div>
      </aside>

      {/* Main */}
      <main>
        <div className="container-xx py-8">{children}</div>
      </main>
    </div>
  );
}
