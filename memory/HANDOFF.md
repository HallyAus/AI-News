# Session Handoff

> Bridge between Claude Code sessions. Updated at the end of every session.
> The SessionStart hook auto-injects this into context.

## Last Updated

- **Date:** 2026-02-25
- **Branch:** main
- **Focus:** Phase 1A scaffold complete, ready for Phase 1B (ingestion pipeline)

## Accomplished

- Installed Node.js 24 LTS + pnpm 10.30 on Windows
- Scaffolded Next.js 16 project with TypeScript, App Router, Tailwind CSS
- Created Drizzle ORM schema: sources, raw_articles, articles, tickers, categories, article_tickers, article_categories
- Built LLM abstraction layer with Claude provider (scoring + summarisation)
- Docker Compose with Postgres 16 for local dev
- Environment validation with zod
- Vitest, Prettier, ESLint configured
- Homepage with AIMarketWire branding and placeholder feed
- Pushed initial commit to https://github.com/HallyAus/AI-News

## In Progress

_None._

## Blocked

_None._

## Next Steps

1. Research and select 3–5 news sources (RSS feeds, news APIs) for AI market news
2. Build ingestion service (fetch → deduplicate → store raw articles)
3. Set up background job scheduler (Inngest or BullMQ)
4. Build AI relevance scoring pipeline (0–100 with structured output)
5. Write tests for scoring service
6. Generate first Drizzle migration and test against local Postgres

## Active Beads Issues

_Beads not yet initialised._

## Context

> Decisions, gotchas, or context that would take time to re-derive.

- Next.js 16 (not 15) — was latest stable at scaffold time, same App Router architecture
- Node 24 LTS installed (not 20) — winget pulled latest LTS
- pnpm global bin is at `/c/Users/User/AppData/Roaming/npm` — needs to be on PATH in shell
- Node.js installed at `/c/Program Files/nodejs` — also needs PATH
- `.env.example` couldn't be created due to permission rules — used `env.example` instead
- esbuild build scripts were skipped during install — works fine without them
- Drizzle schema uses UUIDs as primary keys, all timestamps with timezone
- LLM provider abstraction in `src/lib/llm/` — factory pattern, call `createLLMProvider()`
- Claude provider uses `claude-sonnet-4-20250514` model for scoring and summarisation
- LLM provider must stay behind abstraction layer — PRD requires model switching without refactor
- No trading advice in generated content — compliance is a hard requirement
- Publisher attribution is non-negotiable — always link original source

## Files Modified

```
package.json
pnpm-lock.yaml
docker-compose.yml
drizzle.config.ts
env.example
prettier.config.mjs
vitest.config.ts
src/app/layout.tsx
src/app/page.tsx
src/db/schema.ts
src/db/index.ts
src/db/seed.ts
src/lib/env.ts
src/lib/llm/index.ts
src/lib/llm/claude.ts
src/types/llm.ts
.gitignore
strategy/todo-list.md
.claude/rules/memory-decisions.md
.claude/rules/memory-sessions.md
memory/HANDOFF.md
```
