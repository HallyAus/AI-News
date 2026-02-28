import Link from "next/link";

const CATEGORIES = [
  { slug: "chips", name: "Chips" },
  { slug: "models", name: "Models" },
  { slug: "infrastructure", name: "Infrastructure" },
  { slug: "regulation", name: "Regulation" },
  { slug: "applications", name: "Applications" },
];

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  ...CATEGORIES.map((c) => ({ href: `/category/${c.slug}`, label: c.name })),
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function Footer({
  maxWidth = "6xl",
  activePath,
}: {
  maxWidth?: "3xl" | "6xl";
  activePath?: string;
}) {
  const version = process.env.NEXT_PUBLIC_APP_VERSION ?? "0.0.0";
  const mw = maxWidth === "3xl" ? "max-w-3xl" : "max-w-6xl";

  return (
    <footer className="border-t border-zinc-800/60 bg-zinc-950">
      <div className={`mx-auto ${mw} px-5 py-8`}>
        <div className="mb-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-[11px]">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                activePath === link.href
                  ? "text-zinc-400"
                  : "text-zinc-500 transition-colors hover:text-zinc-300"
              }
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/feed.xml"
            className={
              activePath === "/feed.xml"
                ? "text-zinc-400"
                : "text-zinc-500 transition-colors hover:text-zinc-300"
            }
          >
            RSS
          </a>
        </div>
        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
          <Link href="/" className="font-mono text-[11px] text-zinc-600">
            <span className="text-emerald-400/60">AI</span>
            <span className="text-zinc-500">MarketWire</span>
            <span className="ml-3 text-zinc-700">Signal, not noise.</span>
          </Link>
          <div className="text-center font-mono text-[10px] leading-relaxed text-zinc-700">
            <p>
              AIMarketWire does not provide trading advice. All content is for
              informational purposes only.
            </p>
          </div>
          <span className="font-mono text-[10px] text-zinc-700">v{version}</span>
        </div>
      </div>
    </footer>
  );
}
