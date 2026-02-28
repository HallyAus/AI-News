-- Add slug column as nullable first
ALTER TABLE "articles" ADD COLUMN "slug" varchar(255);--> statement-breakpoint

-- Backfill slugs from title + first 8 chars of id
UPDATE "articles" SET "slug" = CONCAT(
  LEFT(
    REGEXP_REPLACE(
      REGEXP_REPLACE(
        LOWER("title"),
        '[^a-z0-9]+', '-', 'g'
      ),
      '^-+|-+$', '', 'g'
    ),
    120
  ),
  '-',
  LEFT("id"::text, 8)
);--> statement-breakpoint

-- Now make it NOT NULL
ALTER TABLE "articles" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint

-- Create unique index
CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");
