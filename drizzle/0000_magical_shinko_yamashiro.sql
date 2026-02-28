CREATE TABLE "article_categories" (
	"article_id" uuid NOT NULL,
	"category_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "article_tickers" (
	"article_id" uuid NOT NULL,
	"ticker_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "articles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"raw_article_id" uuid NOT NULL,
	"title" text NOT NULL,
	"original_url" text NOT NULL,
	"source_name" varchar(255) NOT NULL,
	"ai_summary" text NOT NULL,
	"why_it_matters" text NOT NULL,
	"relevance_score" integer NOT NULL,
	"score_rationale" text,
	"status" varchar(20) DEFAULT 'published' NOT NULL,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(50) NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "raw_articles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_id" uuid NOT NULL,
	"external_id" text,
	"title" text NOT NULL,
	"content" text,
	"summary" text,
	"url" text NOT NULL,
	"author" varchar(255),
	"published_at" timestamp with time zone,
	"fetched_at" timestamp with time zone DEFAULT now() NOT NULL,
	"processed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"url" text NOT NULL,
	"type" varchar(50) NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"config" jsonb,
	"last_fetched_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tickers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"symbol" varchar(20) NOT NULL,
	"name" varchar(255),
	"exchange" varchar(50),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "article_categories" ADD CONSTRAINT "article_categories_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_categories" ADD CONSTRAINT "article_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_tickers" ADD CONSTRAINT "article_tickers_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_tickers" ADD CONSTRAINT "article_tickers_ticker_id_tickers_id_fk" FOREIGN KEY ("ticker_id") REFERENCES "public"."tickers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_raw_article_id_raw_articles_id_fk" FOREIGN KEY ("raw_article_id") REFERENCES "public"."raw_articles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "raw_articles" ADD CONSTRAINT "raw_articles_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "article_categories_unique_idx" ON "article_categories" USING btree ("article_id","category_id");--> statement-breakpoint
CREATE UNIQUE INDEX "article_tickers_unique_idx" ON "article_tickers" USING btree ("article_id","ticker_id");--> statement-breakpoint
CREATE INDEX "articles_status_idx" ON "articles" USING btree ("status");--> statement-breakpoint
CREATE INDEX "articles_relevance_idx" ON "articles" USING btree ("relevance_score");--> statement-breakpoint
CREATE INDEX "articles_published_idx" ON "articles" USING btree ("published_at");--> statement-breakpoint
CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "raw_articles_url_idx" ON "raw_articles" USING btree ("url");--> statement-breakpoint
CREATE INDEX "raw_articles_processed_idx" ON "raw_articles" USING btree ("processed");--> statement-breakpoint
CREATE UNIQUE INDEX "tickers_symbol_exchange_idx" ON "tickers" USING btree ("symbol","exchange");