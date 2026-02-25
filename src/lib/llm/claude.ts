import Anthropic from "@anthropic-ai/sdk";
import type { LLMProvider, ScoringResult, SummaryResult } from "@/types/llm";

export class ClaudeProvider implements LLMProvider {
  private client: Anthropic;
  private model = "claude-sonnet-4-20250514";

  constructor() {
    this.client = new Anthropic();
  }

  async scoreArticle(input: {
    title: string;
    content: string;
    source: string;
  }): Promise<ScoringResult> {
    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are an AI relevance scoring system for a financial news platform focused on artificial intelligence.

Score the following article for AI relevance to financial markets on a scale of 0–100.

Scoring guidelines:
- 80–100: Directly about AI companies, AI chips, major AI model releases, AI regulation affecting markets
- 60–79: Significant AI component in a broader business/market story
- 40–59: Tangential AI connection with some market relevance
- 0–39: Not AI-relevant or no clear market impact

Also identify:
- Categories (one or more): infrastructure, regulation, applications, chips, models
- Impacted stock tickers with exchange (e.g., NVDA on NASDAQ)

Respond ONLY with valid JSON matching this schema:
{
  "relevanceScore": number,
  "rationale": "one sentence explaining the score",
  "categories": ["slug1", "slug2"],
  "tickers": [{"symbol": "NVDA", "exchange": "NASDAQ"}]
}

Article:
Title: ${input.title}
Source: ${input.source}
Content: ${input.content}`,
        },
      ],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    return JSON.parse(text) as ScoringResult;
  }

  async summariseArticle(input: {
    title: string;
    content: string;
    source: string;
    score: number;
  }): Promise<SummaryResult> {
    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are a financial news summariser for AIMarketWire, a platform covering AI-relevant market news.

Summarise the following article in 2–3 concise sentences. Be factual and objective.
Then write a "Why It Matters" section (1–2 sentences) explaining the relevance to financial markets and AI industry.

CRITICAL RULES:
- NEVER include trading advice, price targets, or buy/sell recommendations
- NEVER use speculative language like "investors should" or "this stock will"
- Always attribute information to the original source
- Focus on facts and market context only

Respond ONLY with valid JSON:
{
  "summary": "2–3 sentence factual summary",
  "whyItMatters": "1–2 sentence market relevance explanation"
}

Article:
Title: ${input.title}
Source: ${input.source}
Relevance Score: ${input.score}/100
Content: ${input.content}`,
        },
      ],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    return JSON.parse(text) as SummaryResult;
  }
}
