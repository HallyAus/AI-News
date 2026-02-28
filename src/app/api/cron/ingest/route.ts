import { NextRequest, NextResponse } from "next/server";
import {
  fetchAllSources,
  upsertSource,
  storeRawArticles,
  DEFAULT_SOURCES,
} from "@/lib/ingestion";
import { scoreUnprocessedArticles } from "@/lib/pipeline";

export const maxDuration = 300; // 5 min max for Vercel Pro, 10s on Hobby

export async function GET(request: NextRequest) {
  // Verify the request is from Vercel Cron
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const startTime = Date.now();

  try {
    // 1. Register sources
    const sourceIdMap = new Map<string, string>();
    for (const source of DEFAULT_SOURCES) {
      const id = await upsertSource(source);
      sourceIdMap.set(source.url, id);
    }

    // 2. Fetch RSS feeds
    const { articles: fetched, errors } = await fetchAllSources(DEFAULT_SOURCES);

    // 3. Store raw articles (dedup)
    const stored = await storeRawArticles(fetched, sourceIdMap);

    // 4. Score and publish
    const results = await scoreUnprocessedArticles(20);
    const published = results.filter((r) => r.passed).length;
    const rejected = results.filter((r) => !r.passed && !r.error).length;
    const errored = results.filter((r) => r.error).length;

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

    return NextResponse.json({
      ok: true,
      stats: {
        fetched: fetched.length,
        feedErrors: errors.length,
        stored,
        duplicatesSkipped: fetched.length - stored,
        scored: results.length,
        published,
        rejected,
        errored,
        elapsedSeconds: parseFloat(elapsed),
      },
    });
  } catch (err) {
    console.error("[cron/ingest] Fatal error:", err);
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
