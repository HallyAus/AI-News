import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { articles, articleTickers, articleCategories, tickers, categories } from "@/db/schema";
import { eq, desc, and, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(500, Math.max(1, Number(searchParams.get("limit") ?? 20)));
  const ticker = searchParams.get("ticker");
  const category = searchParams.get("category");
  const offset = (page - 1) * limit;

  try {
    // Base query for published articles
    let whereClause = eq(articles.status, "published");

    // Filter by ticker if provided
    if (ticker) {
      const tickerRecord = await db.query.tickers.findFirst({
        where: eq(tickers.symbol, ticker.toUpperCase()),
      });
      if (tickerRecord) {
        const articleIds = await db
          .select({ articleId: articleTickers.articleId })
          .from(articleTickers)
          .where(eq(articleTickers.tickerId, tickerRecord.id));

        const ids = articleIds.map((r) => r.articleId);
        if (ids.length === 0) {
          return NextResponse.json({ articles: [], page, limit, total: 0 });
        }
        whereClause = and(
          whereClause,
          sql`${articles.id} IN (${sql.join(ids.map((id) => sql`${id}`), sql`, `)})`
        )!;
      } else {
        return NextResponse.json({ articles: [], page, limit, total: 0 });
      }
    }

    // Filter by category if provided
    if (category) {
      const categoryRecord = await db.query.categories.findFirst({
        where: eq(categories.slug, category.toLowerCase()),
      });
      if (categoryRecord) {
        const articleIds = await db
          .select({ articleId: articleCategories.articleId })
          .from(articleCategories)
          .where(eq(articleCategories.categoryId, categoryRecord.id));

        const ids = articleIds.map((r) => r.articleId);
        if (ids.length === 0) {
          return NextResponse.json({ articles: [], page, limit, total: 0 });
        }
        whereClause = and(
          whereClause,
          sql`${articles.id} IN (${sql.join(ids.map((id) => sql`${id}`), sql`, `)})`
        )!;
      } else {
        return NextResponse.json({ articles: [], page, limit, total: 0 });
      }
    }

    const [result, countResult] = await Promise.all([
      db.query.articles.findMany({
        where: whereClause,
        orderBy: [desc(articles.publishedAt)],
        limit,
        offset,
        with: {
          articleTickers: {
            with: { ticker: true },
          },
          articleCategories: {
            with: { category: true },
          },
        },
      }),
      db
        .select({ count: sql<number>`count(*)` })
        .from(articles)
        .where(whereClause),
    ]);

    const total = Number(countResult[0]?.count ?? 0);

    const formatted = result.map((a) => ({
      id: a.id,
      slug: a.slug,
      title: a.title,
      summary: a.aiSummary,
      whyItMatters: a.whyItMatters,
      relevanceScore: a.relevanceScore,
      sourceName: a.sourceName,
      originalUrl: a.originalUrl,
      publishedAt: a.publishedAt,
      tickers: a.articleTickers.map((at) => ({
        symbol: at.ticker.symbol,
        exchange: at.ticker.exchange,
      })),
      categories: a.articleCategories.map((ac) => ({
        slug: ac.category.slug,
        name: ac.category.name,
      })),
    }));

    return NextResponse.json(
      { articles: formatted, page, limit, total },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (err) {
    console.error("Error fetching articles:", err);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
