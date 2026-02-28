import Anthropic from "@anthropic-ai/sdk";
import type { LLMProvider, ScoringResult, SummaryResult } from "@/types/llm";

/** Extract JSON from a response that may be wrapped in markdown code blocks. */
function extractJSON(text: string): string {
  const match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  return match ? match[1].trim() : text.trim();
}

export class ClaudeProvider implements LLMProvider {
  private client: Anthropic;
  private model = "claude-sonnet-4-6";

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
- ONE primary category (pick the single best fit):
  - infrastructure: AI data centres, cloud compute, energy, scaling (e.g., Azure AI revenue, data centre buildout)
  - regulation: Government policy, AI safety laws, export controls, compliance (e.g., EU AI Act, chip bans)
  - applications: Enterprise AI adoption, new AI products, real-world deployments (e.g., AI in healthcare, new AI tools)
  - chips: Semiconductors, GPUs, custom silicon, chip manufacturing (e.g., NVIDIA earnings, TSMC fabs)
  - models: Foundation models, training breakthroughs, benchmarks, open-source releases (e.g., Llama 4, GPT-5)
- Impacted stock tickers with exchange (e.g., NVDA on NASDAQ)

Respond ONLY with valid JSON matching this schema:
{
  "relevanceScore": number,
  "rationale": "one sentence explaining the score",
  "categories": ["primary-slug"],
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
    return JSON.parse(extractJSON(text)) as ScoringResult;
  }

  async summariseArticle(input: {
    title: string;
    content: string;
    source: string;
    score: number;
  }): Promise<SummaryResult> {
    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: `You are a financial news summariser for AIMarketWire, a platform covering AI-relevant market news for traders and investors.

Write a detailed summary of the following article in 4–6 sentences. Include specific numbers, names, dates, and key facts from the article. Be factual and objective. Provide enough detail that a trader can understand the full story without reading the original.

Then write a "Why It Matters" section (2–3 sentences) explaining the relevance to financial markets and the AI industry. Connect the news to broader market trends, competitive dynamics, or sector implications.

CRITICAL RULES:
- NEVER include trading advice, price targets, or buy/sell recommendations
- NEVER use speculative language like "investors should" or "this stock will"
- Always attribute information to the original source
- Focus on facts, market context, and industry implications only

Respond ONLY with valid JSON:
{
  "summary": "4–6 sentence detailed factual summary with specific data points",
  "whyItMatters": "2–3 sentence market relevance and industry implications"
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
    return JSON.parse(extractJSON(text)) as SummaryResult;
  }
}
