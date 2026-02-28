import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";

// ─── Types ──────────────────────────────────────────────────

interface ArticleDetail {
  id: string;
  slug: string;
  title: string;
  summary: string;
  whyItMatters: string;
  relevanceScore: number;
  scoreRationale: string | null;
  sourceName: string;
  originalUrl: string;
  publishedAt: string | null;
  createdAt: string;
  tickers: { symbol: string; exchange: string | null }[];
  categories: { slug: string; name: string }[];
}

interface RelatedArticle {
  id: string;
  slug: string;
  title: string;
  relevanceScore: number;
  publishedAt: string | null;
  categories: { slug: string; name: string }[];
}

// ─── Data Fetching ──────────────────────────────────────────

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

async function getArticle(id: string): Promise<ArticleDetail | null> {
  try {
    const res = await fetch(`${APP_URL}/api/articles/${id}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function getRelatedArticles(
  articleId: string,
  category?: string
): Promise<RelatedArticle[]> {
  try {
    const params = new URLSearchParams({ limit: "4" });
    if (category) params.set("category", category);
    const res = await fetch(`${APP_URL}/api/articles?${params}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.articles
      .filter((a: RelatedArticle) => a.id !== articleId)
      .slice(0, 3);
  } catch {
    return [];
  }
}

// ─── Helpers ────────────────────────────────────────────────

function truncateAtSentence(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  const truncated = text.slice(0, maxLen);
  const lastPeriod = truncated.lastIndexOf(".");
  const lastExcl = truncated.lastIndexOf("!");
  const lastQ = truncated.lastIndexOf("?");
  const lastSentenceEnd = Math.max(lastPeriod, lastExcl, lastQ);
  if (lastSentenceEnd > maxLen * 0.4) {
    return text.slice(0, lastSentenceEnd + 1);
  }
  const lastSpace = truncated.lastIndexOf(" ");
  return lastSpace > 0 ? truncated.slice(0, lastSpace) + "..." : truncated + "...";
}

// ─── Dynamic Metadata ───────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) return { title: "Article Not Found" };

  const categoryNames = article.categories.map((c) => c.name).join(", ");
  const tickerStr = article.tickers.map((t) => t.symbol).join(", ");

  return {
    title: article.title,
    description: truncateAtSentence(article.summary, 155),
    keywords: [
      "AI news",
      ...article.categories.map((c) => `AI ${c.name.toLowerCase()}`),
      ...article.tickers.map((t) => `${t.symbol} stock`),
    ],
    alternates: {
      canonical: `https://aimarketwire.ai/articles/${article.slug}`,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: truncateAtSentence(article.summary, 200),
      url: `https://aimarketwire.ai/articles/${article.slug}`,
      siteName: "AIMarketWire",
      publishedTime: article.publishedAt ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: truncateAtSentence(article.summary, 200),
      images: [`https://aimarketwire.ai/articles/${article.slug}/opengraph-image`],
    },
    other: {
      "article:section": categoryNames,
      "article:tag": tickerStr,
    },
  };
}

// ─── Helpers ────────────────────────────────────────────────

function scoreColor(score: number): string {
  if (score >= 80) return "#34d399";
  if (score >= 60) return "#fbbf24";
  return "#a1a1aa";
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
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

function ScoreRing({ score, size = 72 }: { score: number; size?: number }) {
  const strokeWidth = 3.5;
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
        className="absolute font-mono text-lg font-bold"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) notFound();

  const color = scoreColor(article.relevanceScore);
  const primaryCategory = article.categories[0];
  const related = await getRelatedArticles(id, primaryCategory?.slug);

  // JSON-LD for this article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.summary,
    url: `https://aimarketwire.ai/articles/${article.slug}`,
    datePublished: article.publishedAt,
    dateModified: article.createdAt,
    image: `https://aimarketwire.ai/articles/${article.slug}/opengraph-image`,
    publisher: {
      "@type": "Organization",
      name: "AIMarketWire",
      url: "https://aimarketwire.ai",
    },
    author: {
      "@type": "Organization",
      name: "AIMarketWire",
    },
    isBasedOn: {
      "@type": "NewsArticle",
      url: article.originalUrl,
      publisher: {
        "@type": "Organization",
        name: article.sourceName,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://aimarketwire.ai/articles/${article.slug}`,
    },
    articleSection: primaryCategory?.name ?? "AI News",
    keywords: article.tickers.map((t) => t.symbol).join(", "),
  };

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
      ...(primaryCategory
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: primaryCategory.name,
              item: `https://aimarketwire.ai/category/${primaryCategory.slug}`,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: primaryCategory ? 3 : 2,
        name: article.title,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3.5">
          <Link
            href="/"
            className="font-mono text-lg font-bold tracking-tight"
          >
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

      {/* ── Article ── */}
      <article className="mx-auto max-w-3xl px-5 py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-600">
            <li>
              <Link href="/" className="transition-colors hover:text-zinc-300">Home</Link>
            </li>
            {primaryCategory && (
              <>
                <li className="text-zinc-700">/</li>
                <li>
                  <Link
                    href={`/category/${primaryCategory.slug}`}
                    className="transition-colors hover:text-zinc-300"
                  >
                    {primaryCategory.name}
                  </Link>
                </li>
              </>
            )}
            <li className="text-zinc-700">/</li>
            <li className="truncate text-zinc-400">{article.title.slice(0, 60)}...</li>
          </ol>
        </nav>

        {/* Meta bar */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {article.categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className={`cat-${cat.slug} cat-badge inline-flex items-center rounded-sm border px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider transition-opacity hover:opacity-80`}
            >
              {cat.name}
            </Link>
          ))}
          <span className="font-mono text-[11px] text-zinc-500">
            {relativeTime(article.publishedAt)}
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-6 font-serif text-3xl leading-tight font-medium text-zinc-50 md:text-4xl">
          {article.title}
        </h1>

        {/* Source + date */}
        <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-zinc-800/60 pb-6">
          <span className="font-mono text-sm text-zinc-400">
            Source:{" "}
            <span className="text-zinc-200">{article.sourceName}</span>
          </span>
          <span className="text-zinc-800">{"\u00b7"}</span>
          <span className="font-mono text-sm text-zinc-500">
            {formatDate(article.publishedAt)}
          </span>
          <a
            href={article.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto font-mono text-sm text-emerald-500 transition-colors hover:text-emerald-400"
          >
            Read original {"\u2192"}
          </a>
        </div>

        {/* Score + Summary section */}
        <div className="mb-8 flex gap-6">
          <div className="flex shrink-0 flex-col items-center gap-1">
            <ScoreRing score={article.relevanceScore} />
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600">
              Relevance
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              AI Summary
            </h2>
            <p className="text-lg leading-relaxed text-zinc-300">
              {article.summary}
            </p>
          </div>
        </div>

        {/* Why It Matters */}
        <div className="mb-8 border-l-2 border-emerald-800/60 bg-emerald-950/20 py-4 pl-5 pr-4">
          <h2 className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-500">
            Why it matters
          </h2>
          <p className="text-base leading-relaxed text-zinc-200">
            {article.whyItMatters}
          </p>
        </div>

        {/* Score Rationale */}
        {article.scoreRationale && (
          <div className="mb-8 rounded border border-zinc-800/60 bg-zinc-900/30 p-5">
            <h2 className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              Scoring rationale
            </h2>
            <p className="text-sm leading-relaxed text-zinc-400">
              {article.scoreRationale}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-1.5 flex-1 rounded-full bg-zinc-800">
                <div
                  className="h-1.5 rounded-full"
                  style={{
                    width: `${article.relevanceScore}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
              <span
                className="font-mono text-xs font-bold"
                style={{ color }}
              >
                {article.relevanceScore}/100
              </span>
            </div>
          </div>
        )}

        {/* Tickers */}
        {article.tickers.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              Impacted tickers
            </h2>
            <div className="flex flex-wrap gap-2">
              {article.tickers.map((t) => (
                <span
                  key={t.symbol}
                  className="inline-flex items-center gap-1.5 rounded border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 font-mono text-sm"
                >
                  <span className="font-semibold text-zinc-100">
                    {t.symbol}
                  </span>
                  {t.exchange && (
                    <span className="text-zinc-600">{t.exchange}</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Attribution */}
        <div className="border-t border-zinc-800/60 pt-6">
          <p className="font-mono text-[11px] leading-relaxed text-zinc-600">
            This summary was generated by AI from the original article published
            by {article.sourceName}. AIMarketWire does not provide trading
            advice. Always refer to the{" "}
            <a
              href={article.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 underline transition-colors hover:text-emerald-400"
            >
              original source
            </a>{" "}
            for complete reporting.
          </p>
        </div>
      </article>

      {/* ── Related Articles ── */}
      {related.length > 0 && (
        <section className="mx-auto max-w-3xl px-5 pb-10">
          <h2 className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
            Related articles
          </h2>
          <div className="grid gap-3">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/articles/${r.slug}`}
                className="group flex items-center gap-4 rounded border border-zinc-800/60 bg-zinc-900/30 p-4 transition-colors hover:border-zinc-700 hover:bg-zinc-900/50"
              >
                <span
                  className="shrink-0 font-mono text-sm font-bold"
                  style={{ color: scoreColor(r.relevanceScore) }}
                >
                  {r.relevanceScore}
                </span>
                <span className="min-w-0 flex-1 truncate font-serif text-sm text-zinc-300 transition-colors group-hover:text-zinc-100">
                  {r.title}
                </span>
                <span className="shrink-0 font-mono text-[10px] text-zinc-600">
                  {relativeTime(r.publishedAt)}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer maxWidth="3xl" />
    </div>
  );
}
