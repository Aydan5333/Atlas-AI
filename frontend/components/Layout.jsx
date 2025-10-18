export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-ink text-ivory">
      <header className="px-5 py-4 border-b border-white/10">
        <h1 className="text-xl font-bold">Atlas</h1>
        <nav className="mt-2 flex gap-4 text-sm opacity-90">
          <a href="/">Home</a>
          <a href="/notes">Notes</a>
          <a href="/profile">Profile</a>
          <a href="/scheduler">Scheduler</a>
        </nav>
      </header>
      <main className="p-5">{children}</main>
      <footer className="px-5 py-6 opacity-60 text-xs">© Atlas</footer>
    </div>
  );
}
