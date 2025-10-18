export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f7f7f5]">
      <header className="border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Atlas</h1>
        <nav className="flex gap-4 text-sm">
          <a href="/" className="hover:underline">Home</a>
          <a href="/chat" className="hover:underline">Chat</a>
          <a href="/notes" className="hover:underline">Notes</a>
          <a href="/profile" className="hover:underline">Profile</a>
          <a href="/scheduler" className="hover:underline">Scheduler</a>
          <a href="/system" className="hover:underline">System</a>
        </nav>
      </header>
      <main className="max-w-5xl mx-auto p-4">{children}</main>
      <footer className="px-4 py-6 text-xs text-white/50">Atlas v1 • Command Center</footer>
    </div>
  );
}
