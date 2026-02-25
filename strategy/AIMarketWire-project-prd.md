AIMarketWire — Product Requirements Document

Vision



AIMarketWire is a fully AI driven trading news platform that publishes only AI relevant market news. It continuously ingests global news, filters and scores AI relevance, and produces concise factual summaries explaining why each item matters to financial markets. The goal is to give traders and investors a signal focused feed without noise or opinion.



Target Users



Who this is for



Active equity traders



Long term investors with exposure to AI related stocks



Analysts and fund managers tracking AI infrastructure and regulation



Problem it solves



General financial news is saturated with non actionable tech content



AI related market signals are scattered across many sources and hard to track in real time



Core Features

MVP (Must Have)



AI Only News Ingestion — Automatically ingest news and publish only articles classified as AI relevant



AI Relevance Scoring — Each article receives a 0 to 100 relevance score based on market impact



LLM Generated Summaries — Concise factual summaries with no trading advice



Why It Matters Section — Clear explanation of relevance to markets and listed companies



Ticker and Category Tagging — Automatic identification of impacted public companies and sectors



Real Time Feed — Continuously updating homepage sorted by publication time



V2 (Nice to Have)



User Filters and Saved Views — Save preferred sectors or tickers



Email and Push Alerts — Alerts for high relevance score articles



Historical AI Trend Analysis — View AI news volume and sentiment over time



API Access — Programmatic access for trading desks and internal tools



Premium Tier — Faster updates, deeper summaries, longer history



Technical Requirements



Must run in a containerised Docker environment



Must deploy to Vercel with server side rendering



Must use Postgres for persistent storage



Must cache aggressively to keep page load times under 200ms



Must support scheduled background jobs for ingestion and processing



Must abstract LLM provider to allow model switching without refactor



Must comply with publisher attribution and linking requirements



Non Goals



No buy sell or hold recommendations



No price targets or forecasts



No sentiment based trading signals



No user generated content at launch



No crypto coverage unless directly tied to AI compute or listed AI companies



Success Metrics



Time to first article under 10 minutes from source publication



Less than 5 percent false positives in AI relevance classification



Average session duration greater than 3 minutes



Returning visitor rate above 40 percent



Zero compliance or publisher attribution issues



Open Questions



Should relevance scoring be absolute or relative to recent news volume



Which AI categories deserve their own dedicated sections



Should low relevance items be hidden or merely deprioritised



When to introduce monetisation without degrading signal quality



Whether to support regional market filters at launch

