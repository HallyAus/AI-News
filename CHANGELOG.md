# Changelog

All notable changes to AIMarketWire are documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/). Versioning follows [Semantic Versioning](https://semver.org/).

## [1.0.0] - 2026-02-28

First public release at [aimarketwire.ai](https://aimarketwire.ai).

### Added
- SEO-friendly slug URLs for all articles (replacing UUIDs)
- Shared Footer component with version badge displayed on every page
- Security headers: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- 301 redirects: `/?category=` to `/category/`, `www` to apex domain
- Dynamic OG images for homepage and individual articles
- RSS 2.0 feed at `/feed.xml`
- Dedicated category pages at `/category/[slug]` with SEO metadata
- About page with methodology, sources, JSON-LD structured data
- Privacy policy and Terms of service pages
- Custom 404 page
- Breadcrumb navigation and JSON-LD on article detail pages
- Related articles section on article pages
- Mobile navigation (horizontal scroll)
- Expanded LLM summary prompt (4-6 sentences with data points)
- Sitemap with articles, categories, and static pages
- `robots.txt` disallowing `/api/`
- Version scripts: `pnpm version:patch`, `version:minor`, `version:major`

### Changed
- Article links use slugs instead of UUIDs across all pages
- Homepage uses ISR (60s revalidation) instead of force-dynamic
- Twitter cards upgraded to `summary_large_image` with explicit image URLs
- Footer standardised across all pages with full navigation links

## [0.1.0] - 2026-02-25

Initial scaffold and backend pipeline.

### Added
- Next.js 16 App Router with TypeScript and Tailwind CSS
- Drizzle ORM schema: articles, sources, tickers, categories, junction tables
- LLM abstraction layer with Claude provider (swappable)
- RSS ingestion pipeline fetching from 7 sources
- AI relevance scoring (0-100) with category and ticker detection
- AI summary generation with "Why It Matters" section
- REST API: article list with pagination, filtering by ticker/category; article detail
- CLI ingest command (`pnpm ingest`)
- Vercel cron route for automated daily ingestion
- Dark terminal editorial frontend design with score rings
- Neon serverless PostgreSQL database (ap-southeast-2)
- Deployed to Vercel with aimarketwire.ai domain
