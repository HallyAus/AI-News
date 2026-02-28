import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "About AIMarketWire — How We Score AI News for Traders",
  description:
    "AIMarketWire uses artificial intelligence to score, filter, and summarise AI-relevant market news. Learn how our relevance scoring methodology works and why traders trust us for signal over noise.",
  alternates: {
    canonical: "https://aimarketwire.ai/about",
  },
};

export default function AboutPage() {
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About AIMarketWire",
    url: "https://aimarketwire.ai/about",
    mainEntity: {
      "@type": "Organization",
      name: "AIMarketWire",
      url: "https://aimarketwire.ai",
      description:
        "AI-driven trading news platform that scores and summarises AI-relevant market news for traders and investors.",
      logo: "https://aimarketwire.ai/opengraph-image",
    },
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3.5">
          <Link href="/" className="font-mono text-lg font-bold tracking-tight">
            <span className="text-emerald-400">AI</span>
            <span className="text-zinc-100">MarketWire</span>
          </Link>
          <Link
            href="/"
            className="font-mono text-xs text-zinc-500 transition-colors hover:text-zinc-300"
          >
            {"\u2190"} Back to feed
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-12">
        <h1 className="mb-8 font-serif text-3xl font-medium text-zinc-50 md:text-4xl">
          About AIMarketWire
        </h1>

        <div className="space-y-8 text-base leading-relaxed text-zinc-300">
          <section>
            <h2 className="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-emerald-500">
              What We Do
            </h2>
            <p>
              AIMarketWire is an AI-driven trading news platform that filters, scores, and
              summarises only the most relevant artificial intelligence market news for traders
              and investors. We monitor seven leading technology and AI news sources around the
              clock, processing every article through our AI relevance scoring pipeline.
            </p>
            <p className="mt-3">
              Only articles that meet our relevance threshold are published. The result: signal,
              not noise. Every article you see on AIMarketWire has been evaluated for its
              potential impact on AI-related stocks and the broader AI market.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-emerald-500">
              How Relevance Scoring Works
            </h2>
            <p>
              Each article is scored from 0 to 100 based on its relevance to AI markets and
              trading. Our scoring model evaluates multiple factors:
            </p>
            <ul className="mt-3 space-y-2 pl-5">
              <li className="list-disc text-zinc-400">
                <span className="text-zinc-200">Direct market impact</span> — Does the article
                discuss events that could move AI-related stocks?
              </li>
              <li className="list-disc text-zinc-400">
                <span className="text-zinc-200">Specificity</span> — Does it reference specific
                companies, products, deals, or financial data?
              </li>
              <li className="list-disc text-zinc-400">
                <span className="text-zinc-200">Timeliness</span> — Is this breaking news or a
                significant development, not a rehash?
              </li>
              <li className="list-disc text-zinc-400">
                <span className="text-zinc-200">Category relevance</span> — How closely does it
                relate to AI chips, infrastructure, models, applications, or regulation?
              </li>
            </ul>
            <p className="mt-3">
              Articles scoring below 40 are automatically filtered out. High-scoring articles
              (80+) indicate events with potentially significant market impact. Each article
              also includes a plain-language scoring rationale so you can understand exactly why
              it was rated the way it was.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-emerald-500">
              Our Sources
            </h2>
            <p>
              We currently monitor seven trusted news sources, including Bloomberg Technology,
              TechCrunch AI, AI Business, The Decoder, MIT Technology Review, The Verge AI, and
              VentureBeat AI. Sources are selected for reliability, speed of reporting, and
              relevance to AI market developments.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-emerald-500">
              Five Coverage Categories
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded border border-zinc-800/60 bg-zinc-900/30 p-4">
                <h3 className="mb-1 font-mono text-sm font-semibold text-amber-400">Chips</h3>
                <p className="text-sm text-zinc-400">
                  GPU and AI chip makers — NVIDIA, AMD, Intel, TSMC, Broadcom. Supply chains,
                  new architectures, export controls.
                </p>
              </div>
              <div className="rounded border border-zinc-800/60 bg-zinc-900/30 p-4">
                <h3 className="mb-1 font-mono text-sm font-semibold text-cyan-400">Models</h3>
                <p className="text-sm text-zinc-400">
                  Foundation model releases, benchmarks, training breakthroughs. OpenAI,
                  Anthropic, Google DeepMind, Meta AI, Mistral.
                </p>
              </div>
              <div className="rounded border border-zinc-800/60 bg-zinc-900/30 p-4">
                <h3 className="mb-1 font-mono text-sm font-semibold text-blue-400">Infrastructure</h3>
                <p className="text-sm text-zinc-400">
                  Cloud AI services, data centres, compute capacity. AWS, Azure, Google Cloud
                  revenue and AI workload growth.
                </p>
              </div>
              <div className="rounded border border-zinc-800/60 bg-zinc-900/30 p-4">
                <h3 className="mb-1 font-mono text-sm font-semibold text-red-400">Regulation</h3>
                <p className="text-sm text-zinc-400">
                  AI policy, legislation, executive orders, EU AI Act, export controls. Compliance
                  costs and market access impacts.
                </p>
              </div>
              <div className="rounded border border-zinc-800/60 bg-zinc-900/30 p-4 sm:col-span-2">
                <h3 className="mb-1 font-mono text-sm font-semibold text-violet-400">Applications</h3>
                <p className="text-sm text-zinc-400">
                  Enterprise AI adoption, AI in healthcare, autonomous vehicles, robotics. Revenue
                  generation from AI products and services.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-emerald-500">
              Important Disclaimer
            </h2>
            <p className="text-zinc-400">
              AIMarketWire does not provide trading advice, investment recommendations, or
              financial guidance of any kind. All content is generated by AI for informational
              purposes only. Relevance scores reflect editorial relevance to AI markets, not
              investment merit. Always conduct your own research and consult a qualified financial
              adviser before making trading decisions. Refer to the{" "}
              <Link href="/terms" className="text-emerald-500 underline hover:text-emerald-400">
                Terms of Service
              </Link>{" "}
              for complete details.
            </p>
          </section>
        </div>
      </main>

      <Footer maxWidth="3xl" activePath="/about" />
    </div>
  );
}
