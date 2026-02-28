import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { articles } from "@/db/schema";
import { eq, or } from "drizzle-orm";

// UUID v4 regex for detecting if the param is a UUID or slug
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Support lookup by either UUID or slug
    const isUuid = UUID_RE.test(id);
    const whereClause = isUuid
      ? or(eq(articles.id, id), eq(articles.slug, id))
      : eq(articles.slug, id);

    const article = await db.query.articles.findFirst({
      where: whereClause,
      with: {
        articleTickers: {
          with: { ticker: true },
        },
        articleCategories: {
          with: { category: true },
        },
      },
    });

    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        id: article.id,
        slug: article.slug,
        title: article.title,
        summary: article.aiSummary,
        whyItMatters: article.whyItMatters,
        relevanceScore: article.relevanceScore,
        scoreRationale: article.scoreRationale,
        sourceName: article.sourceName,
        originalUrl: article.originalUrl,
        publishedAt: article.publishedAt,
        createdAt: article.createdAt,
        tickers: article.articleTickers.map((at) => ({
          symbol: at.ticker.symbol,
          exchange: at.ticker.exchange,
        })),
        categories: article.articleCategories.map((ac) => ({
          slug: ac.category.slug,
          name: ac.category.name,
        })),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (err) {
    console.error("Error fetching article:", err);
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 }
    );
  }
}
