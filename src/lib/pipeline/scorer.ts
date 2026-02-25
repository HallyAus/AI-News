import { db } from "@/db";
import { rawArticles, articles, tickers, categories, articleTickers, articleCategories } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { createLLMProvider } from "@/lib/llm";
import type { ScoringResult } from "@/types/llm";

const RELEVANCE_THRESHOLD = 40;

interface ScoreResult {
  rawArticleId: string;
  score: number;
  passed: boolean;
  error?: string;
}

/** Score a batch of unprocessed raw articles. Returns results for each. */
export async function scoreUnprocessedArticles(
  limit = 10
): Promise<ScoreResult[]> {
  const unprocessed = await db.query.rawArticles.findMany({
    where: eq(rawArticles.processed, false),
    limit,
    orderBy: (ra, { asc }) => [asc(ra.fetchedAt)],
  });

  if (unprocessed.length === 0) return [];

  const llm = createLLMProvider();
  const results: ScoreResult[] = [];

  for (const raw of unprocessed) {
    try {
      const scoring = await llm.scoreArticle({
        title: raw.title,
        content: raw.content ?? raw.summary ?? "",
        source: raw.url,
      });

      // Mark as processed regardless of score
      await db
        .update(rawArticles)
        .set({ processed: true })
        .where(eq(rawArticles.id, raw.id));

      if (scoring.relevanceScore >= RELEVANCE_THRESHOLD) {
        await createPublishedArticle(raw, scoring);
      }

      results.push({
        rawArticleId: raw.id,
        score: scoring.relevanceScore,
        passed: scoring.relevanceScore >= RELEVANCE_THRESHOLD,
      });
    } catch (err) {
      results.push({
        rawArticleId: raw.id,
        score: 0,
        passed: false,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return results;
}

/** Create a published article from a scored raw article that passed the threshold. */
async function createPublishedArticle(
  raw: typeof rawArticles.$inferSelect,
  scoring: ScoringResult
): Promise<void> {
  const llm = createLLMProvider();

  // Generate summary
  const summary = await llm.summariseArticle({
    title: raw.title,
    content: raw.content ?? raw.summary ?? "",
    source: raw.url,
    score: scoring.relevanceScore,
  });

  // Look up source name
  const source = await db.query.sources.findFirst({
    where: eq(rawArticles.sourceId, raw.sourceId),
  });

  // Insert published article
  const [article] = await db
    .insert(articles)
    .values({
      rawArticleId: raw.id,
      title: raw.title,
      originalUrl: raw.url,
      sourceName: source?.name ?? "Unknown",
      aiSummary: summary.summary,
      whyItMatters: summary.whyItMatters,
      relevanceScore: scoring.relevanceScore,
      scoreRationale: scoring.rationale,
      status: "published",
      publishedAt: new Date(),
    })
    .returning({ id: articles.id });

  // Link tickers
  for (const t of scoring.tickers) {
    const tickerId = await upsertTicker(t.symbol, t.exchange);
    await db
      .insert(articleTickers)
      .values({ articleId: article.id, tickerId })
      .onConflictDoNothing();
  }

  // Link categories
  for (const slug of scoring.categories) {
    const cat = await db.query.categories.findFirst({
      where: eq(categories.slug, slug),
    });
    if (cat) {
      await db
        .insert(articleCategories)
        .values({ articleId: article.id, categoryId: cat.id })
        .onConflictDoNothing();
    }
  }
}

async function upsertTicker(
  symbol: string,
  exchange?: string
): Promise<string> {
  const normalised = symbol.toUpperCase();

  const existing = await db.query.tickers.findFirst({
    where: and(
      eq(tickers.symbol, normalised),
      exchange ? eq(tickers.exchange, exchange) : undefined
    ),
  });

  if (existing) return existing.id;

  const [inserted] = await db
    .insert(tickers)
    .values({ symbol: normalised, exchange: exchange ?? null })
    .returning({ id: tickers.id });

  return inserted.id;
}
