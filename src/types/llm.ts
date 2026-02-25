// Types shared across LLM providers

export interface ScoringResult {
  relevanceScore: number; // 0–100
  rationale: string;
  categories: string[]; // slugs: infrastructure, regulation, applications, chips, models
  tickers: Array<{
    symbol: string;
    exchange?: string;
  }>;
}

export interface SummaryResult {
  summary: string;
  whyItMatters: string;
}

export interface LLMProvider {
  /** Score an article for AI relevance (0–100) */
  scoreArticle(input: {
    title: string;
    content: string;
    source: string;
  }): Promise<ScoringResult>;

  /** Generate a concise summary and "Why It Matters" section */
  summariseArticle(input: {
    title: string;
    content: string;
    source: string;
    score: number;
  }): Promise<SummaryResult>;
}
