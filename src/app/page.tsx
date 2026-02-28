import Link from "next/link";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";

// ISR: revalidate every 60 seconds
export const revalidate = 60;

export const metadata: Metadata = {
  alternates: {
    canonical: "https://aimarketwire.ai",
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

interface ArticlesResponse {
  articles: Article[];
  page: number;
  limit: number;
  total: number;
}

// ─── Mock Data (fallback before first ingestion) ────────────

const MOCK_ARTICLES: Article[] = [
  {
    id: "mock-1",
    slug: "nvidia-reports-record-q4-revenue-mock-1",
    title:
      "NVIDIA Reports Record Q4 Revenue as Data Centre Demand Surges Past Estimates",
    summary:
      "NVIDIA posted fourth-quarter revenue of $22.1 billion, exceeding analyst estimates by 12%. Data centre revenue grew 409% year-over-year to $18.4 billion, driven by sustained demand for H100 and H200 GPUs from hyperscalers, sovereign AI programmes, and enterprise deployments.",
    whyItMatters:
      "Confirms enterprise AI infrastructure spending is accelerating rather than plateauing. Forward guidance suggests GPU supply constraints through late 2026, supporting NVIDIA\u2019s pricing power and signalling continued elevated capex from major cloud providers.",
    relevanceScore: 92,
    sourceName: "Bloomberg Technology",
    originalUrl: "#",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    tickers: [{ symbol: "NVDA", exchange: "NASDAQ" }],
    categories: [{ slug: "chips", name: "Chips" }],
  },
  {
    id: "mock-2",
    slug: "tsmc-announces-40-billion-arizona-fab-expansion-mock-2",
    title:
      "TSMC Announces $40 Billion Arizona Fab Expansion for Advanced AI Chip Production",
    summary:
      "Taiwan Semiconductor Manufacturing Company will invest $40 billion to build two additional fabrication plants in Arizona, bringing its total US investment to $65 billion. The new fabs will produce 2nm chips starting 2028, with capacity primarily allocated to AI accelerator customers.",
    whyItMatters:
      "Diversifies global AI chip manufacturing beyond Taiwan, reducing geopolitical supply chain risk. Benefits US-based AI companies with shorter logistics chains and may attract additional semiconductor ecosystem investment to the region.",
    relevanceScore: 88,
    sourceName: "Bloomberg Technology",
    originalUrl: "#",
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    tickers: [
      { symbol: "TSM", exchange: "NYSE" },
      { symbol: "NVDA", exchange: "NASDAQ" },
    ],
    categories: [{ slug: "chips", name: "Chips" }],
  },
  {
    id: "mock-3",
    slug: "openai-closes-6-6-billion-funding-round-mock-3",
    title:
      "OpenAI Closes $6.6 Billion Funding Round at $157 Billion Valuation",
    summary:
      "OpenAI has completed its largest funding round to date, raising $6.6 billion from investors including Microsoft, SoftBank, and Thrive Capital. The round values the company at $157 billion, making it the most valuable private technology company globally.",
    whyItMatters:
      "Sets a new valuation benchmark for AI companies and signals continued institutional confidence in foundation model businesses. The capital injection will fund compute infrastructure and talent acquisition, intensifying competition with Anthropic and Google DeepMind.",
    relevanceScore: 85,
    sourceName: "TechCrunch AI",
    originalUrl: "#",
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    tickers: [{ symbol: "MSFT", exchange: "NASDAQ" }],
    categories: [{ slug: "models", name: "Models" }],
  },
  {
    id: "mock-4",
    slug: "us-commerce-department-tightens-ai-chip-export-controls-mock-4",
    title:
      "US Commerce Department Tightens AI Chip Export Controls Targeting China",
    summary:
      "The Bureau of Industry and Security has published updated export restrictions on advanced AI semiconductors, closing loopholes that allowed modified chip designs to circumvent previous controls. The rules expand entity list restrictions to 15 additional Chinese AI companies.",
    whyItMatters:
      "Directly impacts revenue for NVIDIA, AMD, and Intel from Chinese customers. May accelerate China\u2019s domestic chip development efforts and reshape the global AI hardware supply chain. Semiconductor stocks historically volatile on export control announcements.",
    relevanceScore: 83,
    sourceName: "Bloomberg Technology",
    originalUrl: "#",
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    tickers: [
      { symbol: "NVDA", exchange: "NASDAQ" },
      { symbol: "AMD", exchange: "NASDAQ" },
      { symbol: "INTC", exchange: "NASDAQ" },
    ],
    categories: [{ slug: "regulation", name: "Regulation" }],
  },
  {
    id: "mock-5",
    slug: "eu-ai-act-enforcement-framework-published-mock-5",
    title:
      "EU AI Act Enforcement Framework Published \u2014 Compliance Deadlines Set for 2026",
    summary:
      "The European Commission has released the detailed enforcement framework for the EU AI Act, establishing compliance timelines for different risk categories. High-risk AI systems must meet requirements by August 2026, with penalties of up to 7% of global revenue for non-compliance.",
    whyItMatters:
      "Creates the world\u2019s first comprehensive AI regulatory compliance burden. Companies deploying AI in EU markets face significant implementation costs. Benefits compliance technology vendors and may slow AI deployment in regulated European sectors.",
    relevanceScore: 78,
    sourceName: "AI Business",
    originalUrl: "#",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    tickers: [],
    categories: [{ slug: "regulation", name: "Regulation" }],
  },
  {
    id: "mock-6",
    slug: "microsoft-azure-ai-revenue-surpasses-10-billion-mock-6",
    title:
      "Microsoft Azure AI Revenue Surpasses $10 Billion Annual Run Rate",
    summary:
      "Microsoft disclosed that Azure AI services have exceeded $10 billion in annualised revenue, driven by enterprise adoption of Azure OpenAI Service and Copilot integrations. AI services now represent 12% of total Azure revenue, up from 4% twelve months prior.",
    whyItMatters:
      "Demonstrates that AI workloads are translating to measurable cloud revenue growth, validating the hyperscaler AI infrastructure investment thesis. The acceleration in enterprise adoption suggests AI spending is moving from experimentation to production budgets.",
    relevanceScore: 76,
    sourceName: "The Verge AI",
    originalUrl: "#",
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    tickers: [{ symbol: "MSFT", exchange: "NASDAQ" }],
    categories: [{ slug: "infrastructure", name: "Infrastructure" }],
  },
  {
    id: "mock-7",
    slug: "google-deepmind-protein-structure-prediction-mock-7",
    title:
      "Google DeepMind Achieves New Breakthrough in Protein Structure Prediction",
    summary:
      "Google DeepMind has published results from AlphaFold 3, demonstrating significant improvements in predicting protein-ligand interactions with 84% accuracy. The model extends beyond structure prediction to simulate molecular dynamics, with immediate applications in drug discovery.",
    whyItMatters:
      "Advances AI-driven drug discovery capabilities, potentially reducing pharmaceutical R&D timelines. Strengthens Google\u2019s position in scientific AI applications and creates competitive pressure for biotech companies relying on traditional computational methods.",
    relevanceScore: 71,
    sourceName: "MIT Technology Review AI",
    originalUrl: "#",
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    tickers: [{ symbol: "GOOGL", exchange: "NASDAQ" }],
    categories: [{ slug: "applications", name: "Applications" }],
  },
  {
    id: "mock-8",
    slug: "meta-releases-llama-4-open-source-mock-8",
    title:
      "Meta Releases Llama 4 Open Source Model Series with Mixture-of-Experts Architecture",
    summary:
      "Meta has released the Llama 4 family of models under an open-source licence, featuring a mixture-of-experts architecture that matches GPT-4 performance at significantly lower inference costs. The release includes Scout (17B active parameters) and Maverick (400B total, 100B active) variants.",
    whyItMatters:
      "Continues the trend of open-weight models narrowing the gap with proprietary alternatives, putting pricing pressure on OpenAI and Anthropic. May accelerate enterprise AI adoption by reducing model hosting costs and vendor lock-in concerns.",
    relevanceScore: 68,
    sourceName: "The Decoder",
    originalUrl: "#",
    publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    tickers: [{ symbol: "META", exchange: "NASDAQ" }],
    categories: [{ slug: "models", name: "Models" }],
  },
];

const CATEGORIES = [
  { slug: "infrastructure", name: "Infrastructure" },
  { slug: "regulation", name: "Regulation" },
  { slug: "applications", name: "Applications" },
  { slug: "chips", name: "Chips" },
  { slug: "models", name: "Models" },
];

// ─── Data Fetching ──────────────────────────────────────────

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

async function getArticles(category?: string): Promise<{
  articles: Article[];
  total: number;
  isLive: boolean;
}> {
  try {
    const params = new URLSearchParams({ limit: "20" });
    if (category) params.set("category", category);
    const res = await fetch(`${APP_URL}/api/articles?${params}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data: ArticlesResponse = await res.json();
    if (data.articles.length > 0) {
      return { articles: data.articles, total: data.total, isLive: true };
    }
  } catch {
    // API unavailable or empty — fall through to mock data
  }
  const filtered = category
    ? MOCK_ARTICLES.filter((a) => a.categories.some((c) => c.slug === category))
    : MOCK_ARTICLES;
  return { articles: filtered, total: filtered.length, isLive: false };
}

// ─── Helpers ────────────────────────────────────────────────

function scoreClass(score: number): "high" | "mid" | "low" {
  if (score >= 80) return "high";
  if (score >= 60) return "mid";
  return "low";
}

function scoreColor(score: number): string {
  if (score >= 80) return "#34d399";
  if (score >= 60) return "#fbbf24";
  return "#a1a1aa";
}

function categoryLabel(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
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

// ─── Score Ring ─────────────────────────────────────────────

function ScoreRing({
  score,
  size = 52,
}: {
  score: number;
  size?: number;
}) {
  const strokeWidth = 3;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const center = size / 2;
  const color = scoreColor(score);

  return (
    <div
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#27272a"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="animate-score-ring"
          style={
            {
              "--ring-circumference": circumference,
            } as React.CSSProperties
          }
        />
      </svg>
      <span
        className="absolute font-mono text-sm font-bold"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  );
}

// ─── Category Badge ─────────────────────────────────────────

function CategoryBadge({ slug }: { slug: string }) {
  return (
    <span
      className={`cat-${slug} cat-badge inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider`}
    >
      {categoryLabel(slug)}
    </span>
  );
}

// ─── Ticker Badge ───────────────────────────────────────────

function TickerBadge({
  symbol,
  exchange,
}: {
  symbol: string;
  exchange: string | null;
}) {
  return (
    <span className="inline-flex items-center gap-1 font-mono text-xs">
      <span className="font-semibold text-zinc-200">{symbol}</span>
      {exchange && <span className="text-zinc-600">{exchange}</span>}
    </span>
  );
}

// ─── Featured Article Card ──────────────────────────────────

function FeaturedCard({ article }: { article: Article }) {
  const tier = scoreClass(article.relevanceScore);
  const category = article.categories[0]?.slug ?? "models";

  return (
    <article
      className={`featured-accent article-card animate-fade-in-up border-score-${tier} rounded border border-l-0 bg-zinc-900/40 pl-6 pr-6 pt-6 pb-5`}
    >
      <div className="flex flex-col gap-5 md:flex-row md:gap-8">
        {/* Score + metadata column */}
        <div className="flex shrink-0 flex-col items-center gap-3 md:items-start">
          <ScoreRing score={article.relevanceScore} size={64} />
          <div className="flex flex-col items-center gap-2 md:items-start">
            <CategoryBadge slug={category} />
            <span className="font-mono text-[11px] text-zinc-500">
              {relativeTime(article.publishedAt)}
            </span>
          </div>
        </div>

        {/* Content column */}
        <div className="min-w-0 flex-1">
          <Link href={`/articles/${article.slug}`}>
            <h2 className="mb-3 font-serif text-2xl leading-tight font-medium text-zinc-50 transition-colors hover:text-emerald-300 md:text-[1.65rem]">
              {article.title}
            </h2>
          </Link>
          <p className="mb-4 leading-relaxed text-zinc-400">
            {article.summary}
          </p>

          {/* Why It Matters */}
          <div className="mb-4 border-l-2 border-emerald-800/60 bg-emerald-950/20 py-2.5 pl-4 pr-3">
            <p className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-500">
              Why it matters
            </p>
            <p className="text-sm leading-relaxed text-zinc-300">
              {article.whyItMatters}
            </p>
          </div>

          {/* Footer */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {article.tickers.map((t) => (
              <TickerBadge
                key={t.symbol}
                symbol={t.symbol}
                exchange={t.exchange}
              />
            ))}
            {article.tickers.length > 0 && (
              <span className="text-zinc-700">{"\u00b7"}</span>
            )}
            <span className="font-mono text-xs text-zinc-500">
              {article.sourceName}
            </span>
            <a
              href={article.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto font-mono text-xs text-zinc-500 transition-colors hover:text-emerald-400"
            >
              Read original {"\u2192"}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Article Card ───────────────────────────────────────────

function ArticleCard({
  article,
  index,
}: {
  article: Article;
  index: number;
}) {
  const tier = scoreClass(article.relevanceScore);
  const category = article.categories[0]?.slug ?? "models";

  return (
    <article
      className="article-card animate-fade-in-up flex flex-col rounded border border-zinc-800/80 bg-zinc-900/30 p-5"
      style={{ animationDelay: `${0.1 + index * 0.06}s` }}
    >
      {/* Header: score + category + time */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ScoreRing score={article.relevanceScore} size={44} />
          <CategoryBadge slug={category} />
        </div>
        <span className="font-mono text-[11px] text-zinc-600">
          {relativeTime(article.publishedAt)}
        </span>
      </div>

      {/* Title */}
      <Link href={`/articles/${article.slug}`}>
        <h3 className="mb-2.5 font-serif text-lg leading-snug font-medium text-zinc-100 transition-colors hover:text-emerald-300">
          {article.title}
        </h3>
      </Link>

      {/* Summary */}
      <p className="mb-3 text-sm leading-relaxed text-zinc-400">
        {article.summary}
      </p>

      {/* Why It Matters */}
      <div
        className={`bg-score-${tier} mb-4 rounded-sm border-l-2 py-2 pl-3 pr-2 border-score-${tier}`}
      >
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
          Why it matters
        </p>
        <p className="mt-0.5 text-sm leading-relaxed text-zinc-300">
          {article.whyItMatters}
        </p>
      </div>

      {/* Footer: tickers + source */}
      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-zinc-800/50 pt-3">
        {article.tickers.map((t) => (
          <TickerBadge
            key={t.symbol}
            symbol={t.symbol}
            exchange={t.exchange}
          />
        ))}
        {article.tickers.length > 0 && (
          <span className="text-zinc-800">{"\u00b7"}</span>
        )}
        <span className="font-mono text-[11px] text-zinc-600">
          {article.sourceName}
        </span>
        <a
          href={article.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto font-mono text-[11px] text-zinc-600 transition-colors hover:text-emerald-400"
        >
          {"\u2192"}
        </a>
      </div>
    </article>
  );
}

// ─── Empty State ────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="animate-fade-in-up rounded border border-zinc-800 bg-zinc-900/50 p-12 text-center">
      <div className="mb-4 font-mono text-3xl text-zinc-700">{"{"} {"}"}</div>
      <p className="mb-2 font-serif text-lg text-zinc-400">
        Pipeline initialising
      </p>
      <p className="font-mono text-sm text-zinc-600">
        Articles will appear here once ingestion is running.
      </p>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: activeCategory } = await searchParams;
  const { articles, total, isLive } = await getArticles(activeCategory);

  const sorted = [...articles].sort(
    (a, b) => b.relevanceScore - a.relevanceScore
  );
  const featured = sorted[0];
  const rest = sorted.slice(1);

  // JSON-LD structured data for search engines
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AIMarketWire",
    url: "https://aimarketwire.ai",
    description:
      "AI-relevant market news for traders and investors. Every article scored for relevance, summarised by AI, with market impact analysis.",
    publisher: {
      "@type": "Organization",
      name: "AIMarketWire",
      url: "https://aimarketwire.ai",
      logo: "https://aimarketwire.ai/opengraph-image",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://aimarketwire.ai/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AIMarketWire",
    url: "https://aimarketwire.ai",
    logo: "https://aimarketwire.ai/opengraph-image",
    description:
      "AI-driven trading news platform that scores and summarises AI-relevant market news for traders and investors.",
    sameAs: [],
  };

  const articleListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: sorted.slice(0, 10).map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "NewsArticle",
        headline: a.title,
        description: a.summary,
        url: `https://aimarketwire.ai/articles/${a.slug}`,
        datePublished: a.publishedAt,
        publisher: {
          "@type": "Organization",
          name: a.sourceName,
        },
      },
    })),
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      {/* ── Header ── */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-lg font-bold tracking-tight">
              <span className="text-emerald-400">AI</span>
              <span className="text-zinc-100">MarketWire</span>
            </span>
            {isLive ? (
              <div className="flex items-center gap-1.5 rounded-full border border-emerald-900/50 bg-emerald-950/30 px-2.5 py-1">
                <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-500">
                  Live
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 rounded-full border border-amber-900/50 bg-amber-950/30 px-2.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-500">
                  Preview
                </span>
              </div>
            )}
          </div>

          {/* Category nav — desktop */}
          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="/"
              className={`rounded-sm px-3 py-1.5 font-mono text-xs transition-colors ${
                !activeCategory
                  ? "bg-zinc-800/60 font-medium text-zinc-100"
                  : "text-zinc-500 hover:bg-zinc-800/40 hover:text-zinc-300"
              }`}
            >
              All
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="rounded-sm px-3 py-1.5 font-mono text-xs text-zinc-500 transition-colors hover:bg-zinc-800/40 hover:text-zinc-300"
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
        {/* Category nav — mobile */}
        <nav className="flex items-center gap-1 overflow-x-auto px-5 py-2 md:hidden">
          <Link
            href="/"
            className={`shrink-0 rounded-sm px-3 py-1.5 font-mono text-xs transition-colors ${
              !activeCategory
                ? "bg-zinc-800/60 font-medium text-zinc-100"
                : "text-zinc-500"
            }`}
          >
            All
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="shrink-0 rounded-sm px-3 py-1.5 font-mono text-xs text-zinc-500"
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      </header>

      {/* ── Stats bar ── */}
      <div className="border-b border-zinc-800/50 bg-zinc-950">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-2">
          <span className="font-mono text-[11px] text-zinc-600">
            <span className="text-zinc-400">7</span> sources monitoring
          </span>
          <span className="text-zinc-800">{"\u00b7"}</span>
          <span className="font-mono text-[11px] text-zinc-600">
            <span className="text-zinc-400">{total}</span> articles scored
          </span>
          {!isLive && (
            <>
              <span className="text-zinc-800">{"\u00b7"}</span>
              <span className="font-mono text-[11px] text-amber-600">
                Sample data — pipeline not yet connected
              </span>
            </>
          )}
        </div>
      </div>

      {/* ── Main content ── */}
      <main className="mx-auto max-w-6xl px-5 py-8">
        {/* SEO intro text */}
        <div className="mb-8">
          <h1 className="mb-2 font-serif text-xl font-medium text-zinc-200 md:text-2xl">
            AI News That Moves Markets
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-zinc-500">
            The latest artificial intelligence news scored for trading relevance.
            Track AI stocks, chip makers, model releases, infrastructure deals, and
            regulation changes — every article analysed by AI with market impact
            scoring so you get signal, not noise.
          </p>
        </div>
        {sorted.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Featured article */}
            {featured && (
              <section className="mb-8">
                <FeaturedCard article={featured} />
              </section>
            )}

            {/* Section divider */}
            {rest.length > 0 && (
              <div className="mb-6 flex items-center gap-3">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
                  Latest
                </span>
                <div className="h-px flex-1 bg-zinc-800/60" />
              </div>
            )}

            {/* Article grid */}
            {rest.length > 0 && (
              <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {rest.map((article, i) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    index={i}
                  />
                ))}
              </section>
            )}
          </>
        )}
      </main>

      <Footer activePath="/" />
    </div>
  );
}
