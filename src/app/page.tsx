const CATEGORIES = [
  { slug: "infrastructure", name: "Infrastructure" },
  { slug: "regulation", name: "Regulation" },
  { slug: "applications", name: "Applications" },
  { slug: "chips", name: "Chips" },
  { slug: "models", name: "Models" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-emerald-400">AI</span>MarketWire
          </h1>
          <nav className="hidden gap-4 text-sm text-zinc-400 md:flex">
            <a href="#" className="text-zinc-100">
              All
            </a>
            {CATEGORIES.map((cat) => (
              <a
                key={cat.slug}
                href={`#${cat.slug}`}
                className="transition-colors hover:text-zinc-100"
              >
                {cat.name}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            AI Market News, Scored &amp; Summarised
          </h2>
          <p className="text-lg text-zinc-400">
            Only AI-relevant trading news. No noise, no opinion, no trading
            advice.
          </p>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-12 text-center">
          <p className="text-zinc-500">
            Pipeline initialising — articles will appear here once ingestion is
            running.
          </p>
        </div>
      </main>

      <footer className="border-t border-zinc-800 px-6 py-6 text-center text-xs text-zinc-600">
        <p>
          AIMarketWire does not provide trading advice. All content is for
          informational purposes only.
        </p>
        <p className="mt-1">
          Always refer to original sources. Links provided for attribution.
        </p>
      </footer>
    </div>
  );
}
