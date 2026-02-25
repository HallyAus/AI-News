# Task Tracking

> Quick reference for current work priorities. For detailed issue tracking use Beads (`bd list`).
> This file is for high-level planning; Beads handles granular task management.

## In Progress

- [ ] Finalise project infrastructure and create Beads issues for Week 1

## Up Next

### Week 1 — Foundation
- [ ] Scaffold Next.js 15 project (TypeScript, App Router, pnpm, Docker Compose)
- [ ] Design and migrate DB schema (sources, raw_articles, articles, tickers, categories)
- [ ] Build LLM provider abstraction layer (interface + Claude implementation)
- [ ] Research and select 3–5 news sources (RSS feeds, news APIs)
- [ ] Build ingestion service (fetch → deduplicate → store)
- [ ] Set up background job scheduler (Inngest or BullMQ)
- [ ] Build AI relevance scoring pipeline (0–100 with structured output)
- [ ] Write tests for scoring service

### Week 2 — Content Generation & API
- [ ] Build LLM summary pipeline (summary + "Why It Matters")
- [ ] Build ticker extraction and category tagging
- [ ] Build API routes (articles feed, detail, ticker/category filters)
- [ ] Wire full pipeline end-to-end
- [ ] Run live for 48 hours, tune relevance threshold

### Week 3 — Frontend
- [ ] Homepage feed with article cards
- [ ] Article detail page
- [ ] Category navigation and ticker filtering
- [ ] SEO, loading states, mobile responsive

### Week 4 — Deploy & Harden
- [ ] Deploy to Vercel + Neon + Railway/Proxmox
- [ ] Implement caching strategy (target <200ms)
- [ ] Set up monitoring, alerting, error tracking
- [ ] Compliance audit (attribution, no trading advice)
- [ ] Soft launch with analytics

## Blocked

_None currently._

## Done (Recent)

- [x] Write AIMarketWire PRD — 2026-02-25
- [x] Populate CLAUDE.md with project details — 2026-02-25
- [x] Log initial architecture decisions (ADR-001 to ADR-006) — 2026-02-25
- [x] Create 30-day plan aligned with project workflow — 2026-02-25
