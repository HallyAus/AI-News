import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/90">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3.5">
          <Link href="/" className="font-mono text-lg font-bold tracking-tight">
            <span className="text-emerald-400">AI</span>
            <span className="text-zinc-100">MarketWire</span>
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-5">
        <div className="text-center">
          <p className="mb-4 font-mono text-6xl font-bold text-zinc-800">404</p>
          <h1 className="mb-3 font-serif text-2xl font-medium text-zinc-200">
            Page not found
          </h1>
          <p className="mb-8 font-mono text-sm text-zinc-500">
            This page doesn&apos;t exist or may have been moved.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="rounded border border-emerald-800 bg-emerald-950/30 px-6 py-2.5 font-mono text-sm text-emerald-400 transition-colors hover:bg-emerald-950/50"
            >
              View latest AI news
            </Link>
            <Link
              href="/about"
              className="rounded border border-zinc-800 px-6 py-2.5 font-mono text-sm text-zinc-400 transition-colors hover:bg-zinc-900"
            >
              About AIMarketWire
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Link href="/category/chips" className="font-mono text-xs text-zinc-600 hover:text-zinc-400">Chips</Link>
            <span className="text-zinc-800">{"\u00b7"}</span>
            <Link href="/category/models" className="font-mono text-xs text-zinc-600 hover:text-zinc-400">Models</Link>
            <span className="text-zinc-800">{"\u00b7"}</span>
            <Link href="/category/infrastructure" className="font-mono text-xs text-zinc-600 hover:text-zinc-400">Infrastructure</Link>
            <span className="text-zinc-800">{"\u00b7"}</span>
            <Link href="/category/regulation" className="font-mono text-xs text-zinc-600 hover:text-zinc-400">Regulation</Link>
            <span className="text-zinc-800">{"\u00b7"}</span>
            <Link href="/category/applications" className="font-mono text-xs text-zinc-600 hover:text-zinc-400">Applications</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
