import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export const dynamic = "force-dynamic";

// ─── Category Config ────────────────────────────────────────

const CATEGORY_DATA: Record<
  string,
  { name: string; description: string; keywords: string[] }
> = {
  chips: {
    name: "Chips",
    description:
      "AI chip and semiconductor news for traders. Track NVIDIA, AMD, Intel, TSMC, Broadcom, and the GPU supply chain. Coverage includes new architectures, earnings, export controls, and supply-demand dynamics affecting AI chip stocks.",
    keywords: [
      "AI chip stocks",
      "NVIDIA news",
      "GPU stocks",
      "semiconductor AI",
      "AMD AI news",
      "TSMC news",
      "AI chip market",
    ],
  },
  models: {
    name: "Models",
    description:
      "AI model and foundation model news for investors. Track releases from OpenAI, Anthropic, Google DeepMind, Meta AI, and Mistral. Coverage includes benchmark results, pricing changes, open-source releases, and competitive dynamics.",
    keywords: [
      "AI model news",
      "OpenAI news",
      "Anthropic news",
      "GPT news",
      "AI foundation models",
      "large language models",
      "AI model releases",
    ],
  },
  infrastructure: {
    name: "Infrastructure",
    description:
      "AI infrastructure and cloud computing news for traders. Track AWS, Azure, Google Cloud AI revenue, data centre expansions, and enterprise AI adoption. Coverage includes compute capacity, pricing, and hyperscaler capital expenditure.",
    keywords: [
      "AI infrastructure stocks",
      "cloud AI news",
      "Azure AI revenue",
      "AWS AI news",
      "data centre stocks",
      "AI cloud computing",
      "enterprise AI",
    ],
  },
  regulation: {
    name: "Regulation",
    description:
      "AI regulation and policy news for investors. Track the EU AI Act, US executive orders, export controls, and global AI governance. Coverage includes compliance costs, market access impacts, and legislative developments.",
    keywords: [
      "AI regulation news",
      "EU AI Act",
      "AI policy",
      "AI export controls",
      "AI governance",
      "AI compliance",
      "AI legislation",
    ],
  },
  applications: {
    name: "Applications",
    description:
      "AI application and enterprise adoption news for traders. Track AI in healthcare, autonomous vehicles, robotics, and enterprise software. Coverage includes revenue milestones, product launches, and adoption trends.",
    keywords: [
      "AI applications news",
      "enterprise AI adoption",
      "AI healthcare stocks",
      "AI robotics news",
      "AI software stocks",
      "AI products",
      "AI use cases",
    ],
  },
};

// ─── Types ──────────────────────────────────────────────────

interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  whyItMatters: string;
  relevanceScore: number;
  sourceName: string;
  originalUrl: string;
  publishedAt: string | null;
  tickers: { symbol: string; exchange: string | null }[];
  categories: { slug: string; name: string }[];
}

// ─── Data Fetching ──────────────────────────────────────────

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

async function getCategoryArticles(slug: string): Promise<{
  articles: Article[];
  total: number;
}> {
  try {
    const params = new URLSearchParams({ limit: "30", category: slug });
    const res = await fetch(`${APP_URL}/api/articles?${params}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return { articles: [], total: 0 };
    const data = await res.json();
    return { articles: data.articles, total: data.total };
  } catch {
    return { articles: [], total: 0 };
  }
}

// ─── Metadata ───────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORY_DATA[slug];
  if (!cat) return { title: "Category Not Found" };

  return {
    title: `AI ${cat.name} News — Market Analysis & Scoring`,
    description: cat.description.slice(0, 160),
    keywords: cat.keywords,
    alternates: {
      canonical: `https://aimarketwire.ai/category/${slug}`,
    },
    openGraph: {
      title: `AI ${cat.name} News | AIMarketWire`,
      description: cat.description.slice(0, 200),
      url: `https://aimarketwire.ai/category/${slug}`,
      siteName: "AIMarketWire",
    },
    twitter: {
      card: "summary_large_image",
      title: `AI ${cat.name} News | AIMarketWire`,
      description: cat.description.slice(0, 200),
    },
  };
}

// ─── Helpers ────────────────────────────────────────────────

function scoreColor(score: number): string {
  if (score >= 80) return "#34d399";
  if (score >= 60) return "#fbbf24";
  return "#a1a1aa";
}

function relativeTime(dateStr: string | null): string {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

// ─── Page ───────────────────────────────────────────────────

const ALL_CATEGORIES = Object.entries(CATEGORY_DATA).map(([slug, data]) => ({
  slug,
  name: data.name,
}));

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = CATEGORY_DATA[slug];
  if (!cat) notFound();

  const { articles, total } = await getCategoryArticles(slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://aimarketwire.ai",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: cat.name,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <Link href="/" className="font-mono text-lg font-bold tracking-tight">
            <span className="text-emerald-400">AI</span>
            <span className="text-zinc-100">MarketWire</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="/"
              className="rounded-sm px-3 py-1.5 font-mono text-xs text-zinc-500 transition-colors hover:bg-zinc-800/40 hover:text-zinc-300"
            >
              All
            </Link>
            {ALL_CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className={`rounded-sm px-3 py-1.5 font-mono text-xs transition-colors ${
                  c.slug === slug
                    ? "bg-zinc-800/60 font-medium text-zinc-100"
                    : "text-zinc-500 hover:bg-zinc-800/40 hover:text-zinc-300"
                }`}
              >
                {c.name}
              </Link>
            ))}
          </nav>
        </div>
        {/* Mobile nav */}
        <nav className="flex items-center gap-1 overflow-x-auto px-5 py-2 md:hidden">
          <Link
            href="/"
            className="shrink-0 rounded-sm px-3 py-1.5 font-mono text-xs text-zinc-500"
          >
            All
          </Link>
          {ALL_CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className={`shrink-0 rounded-sm px-3 py-1.5 font-mono text-xs ${
                c.slug === slug
                  ? "bg-zinc-800/60 font-medium text-zinc-100"
                  : "text-zinc-500"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </nav>
      </header>

      {/* Category intro */}
      <div className="border-b border-zinc-800/50 bg-zinc-950">
        <div className="mx-auto max-w-6xl px-5 py-8">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-600">
              <li>
                <Link href="/" className="transition-colors hover:text-zinc-300">Home</Link>
              </li>
              <li className="text-zinc-700">/</li>
              <li className="text-zinc-400">{cat.name}</li>
            </ol>
          </nav>
          <h1 className="mb-3 font-serif text-3xl font-medium text-zinc-50 md:text-4xl">
            AI {cat.name} News
          </h1>
          <p className="max-w-2xl leading-relaxed text-zinc-400">
            {cat.description}
          </p>
          <p className="mt-3 font-mono text-[11px] text-zinc-600">
            <span className="text-zinc-400">{total}</span> articles in this category
          </p>
        </div>
      </div>

      {/* Articles */}
      <main className="mx-auto max-w-6xl px-5 py-8">
        {articles.length === 0 ? (
          <div className="rounded border border-zinc-800 bg-zinc-900/50 p-12 text-center">
            <p className="font-serif text-lg text-zinc-400">
              No articles in this category yet.
            </p>
            <Link
              href="/"
              className="mt-4 inline-block font-mono text-sm text-emerald-500 hover:text-emerald-400"
            >
              View all articles {"\u2192"}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {articles.map((article) => (
              <article
                key={article.id}
                className="article-card flex flex-col rounded border border-zinc-800/80 bg-zinc-900/30 p-5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className="font-mono text-sm font-bold"
                    style={{ color: scoreColor(article.relevanceScore) }}
                  >
                    {article.relevanceScore}
                  </span>
                  <span className="font-mono text-[11px] text-zinc-600">
                    {relativeTime(article.publishedAt)}
                  </span>
                </div>
                <Link href={`/articles/${article.slug}`}>
                  <h2 className="mb-2.5 font-serif text-lg leading-snug font-medium text-zinc-100 transition-colors hover:text-emerald-300">
                    {article.title}
                  </h2>
                </Link>
                <p className="mb-3 text-sm leading-relaxed text-zinc-400">
                  {article.summary}
                </p>
                <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-zinc-800/50 pt-3">
                  {article.tickers.map((t) => (
                    <span
                      key={t.symbol}
                      className="font-mono text-xs font-semibold text-zinc-200"
                    >
                      {t.symbol}
                    </span>
                  ))}
                  {article.tickers.length > 0 && (
                    <span className="text-zinc-800">{"\u00b7"}</span>
                  )}
                  <span className="font-mono text-[11px] text-zinc-600">
                    {article.sourceName}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer activePath={`/category/${slug}`} />
    </div>
  );
}
