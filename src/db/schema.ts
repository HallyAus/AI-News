import {
  pgTable,
  text,
  timestamp,
  integer,
  boolean,
  uuid,
  varchar,
  jsonb,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ─── Sources ─────────────────────────────────────────────
// News sources we ingest from (RSS feeds, APIs, etc.)

export const sources = pgTable("sources", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  url: text("url").notNull(),
  type: varchar("type", { length: 50 }).notNull(), // rss, api, scraper
  active: boolean("active").notNull().default(true),
  config: jsonb("config"), // source-specific config (headers, auth, etc.)
  lastFetchedAt: timestamp("last_fetched_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ─── Raw Articles ────────────────────────────────────────
// Unprocessed articles as ingested from sources

export const rawArticles = pgTable(
  "raw_articles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sourceId: uuid("source_id")
      .notNull()
      .references(() => sources.id),
    externalId: text("external_id"), // ID from the source (guid, url hash, etc.)
    title: text("title").notNull(),
    content: text("content"), // full text if available
    summary: text("summary"), // source-provided summary
    url: text("url").notNull(),
    author: varchar("author", { length: 255 }),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    fetchedAt: timestamp("fetched_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    processed: boolean("processed").notNull().default(false),
  },
  (table) => [
    uniqueIndex("raw_articles_url_idx").on(table.url),
    index("raw_articles_processed_idx").on(table.processed),
  ]
);

// ─── Articles ────────────────────────────────────────────
// Processed, scored, and summarised articles ready for display

export const articles = pgTable(
  "articles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    rawArticleId: uuid("raw_article_id")
      .notNull()
      .references(() => rawArticles.id),
    slug: varchar("slug", { length: 255 }).notNull(),
    title: text("title").notNull(),
    originalUrl: text("original_url").notNull(),
    sourceName: varchar("source_name", { length: 255 }).notNull(),
    aiSummary: text("ai_summary").notNull(),
    whyItMatters: text("why_it_matters").notNull(),
    relevanceScore: integer("relevance_score").notNull(), // 0–100
    scoreRationale: text("score_rationale"),
    status: varchar("status", { length: 20 }).notNull().default("published"), // processing, published, rejected
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("articles_slug_idx").on(table.slug),
    index("articles_status_idx").on(table.status),
    index("articles_relevance_idx").on(table.relevanceScore),
    index("articles_published_idx").on(table.publishedAt),
  ]
);

// ─── Tickers ─────────────────────────────────────────────

export const tickers = pgTable(
  "tickers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    symbol: varchar("symbol", { length: 20 }).notNull(),
    name: varchar("name", { length: 255 }),
    exchange: varchar("exchange", { length: 50 }), // ASX, NYSE, NASDAQ
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [uniqueIndex("tickers_symbol_exchange_idx").on(table.symbol, table.exchange)]
);

// ─── Categories ──────────────────────────────────────────

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: varchar("slug", { length: 50 }).notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [uniqueIndex("categories_slug_idx").on(table.slug)]
);

// ─── Join Tables ─────────────────────────────────────────

export const articleTickers = pgTable(
  "article_tickers",
  {
    articleId: uuid("article_id")
      .notNull()
      .references(() => articles.id, { onDelete: "cascade" }),
    tickerId: uuid("ticker_id")
      .notNull()
      .references(() => tickers.id, { onDelete: "cascade" }),
  },
  (table) => [
    uniqueIndex("article_tickers_unique_idx").on(
      table.articleId,
      table.tickerId
    ),
  ]
);

export const articleCategories = pgTable(
  "article_categories",
  {
    articleId: uuid("article_id")
      .notNull()
      .references(() => articles.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
  },
  (table) => [
    uniqueIndex("article_categories_unique_idx").on(
      table.articleId,
      table.categoryId
    ),
  ]
);

// ─── Relations ───────────────────────────────────────────

export const sourcesRelations = relations(sources, ({ many }) => ({
  rawArticles: many(rawArticles),
}));

export const rawArticlesRelations = relations(rawArticles, ({ one }) => ({
  source: one(sources, {
    fields: [rawArticles.sourceId],
    references: [sources.id],
  }),
}));

export const articlesRelations = relations(articles, ({ one, many }) => ({
  rawArticle: one(rawArticles, {
    fields: [articles.rawArticleId],
    references: [rawArticles.id],
  }),
  articleTickers: many(articleTickers),
  articleCategories: many(articleCategories),
}));

export const tickersRelations = relations(tickers, ({ many }) => ({
  articleTickers: many(articleTickers),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  articleCategories: many(articleCategories),
}));

export const articleTickersRelations = relations(articleTickers, ({ one }) => ({
  article: one(articles, {
    fields: [articleTickers.articleId],
    references: [articles.id],
  }),
  ticker: one(tickers, {
    fields: [articleTickers.tickerId],
    references: [tickers.id],
  }),
}));

export const articleCategoriesRelations = relations(
  articleCategories,
  ({ one }) => ({
    article: one(articles, {
      fields: [articleCategories.articleId],
      references: [articles.id],
    }),
    category: one(categories, {
      fields: [articleCategories.categoryId],
      references: [categories.id],
    }),
  })
);
