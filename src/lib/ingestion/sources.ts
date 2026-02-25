// News source definitions for AI market news ingestion.
// Verified RSS feeds — tested 2026-02-25.

export interface SourceConfig {
  name: string;
  url: string;
  type: "rss";
  category: "ai-specific" | "general-tech" | "finance";
}

export const DEFAULT_SOURCES: SourceConfig[] = [
  {
    name: "Bloomberg Technology",
    url: "https://feeds.bloomberg.com/technology/news.rss",
    type: "rss",
    category: "finance",
  },
  {
    name: "TechCrunch AI",
    url: "https://techcrunch.com/category/artificial-intelligence/feed/",
    type: "rss",
    category: "ai-specific",
  },
  {
    name: "AI Business",
    url: "https://aibusiness.com/rss.xml",
    type: "rss",
    category: "ai-specific",
  },
  {
    name: "The Decoder",
    url: "https://the-decoder.com/feed/",
    type: "rss",
    category: "ai-specific",
  },
  {
    name: "MIT Technology Review AI",
    url: "https://www.technologyreview.com/topic/artificial-intelligence/feed",
    type: "rss",
    category: "ai-specific",
  },
  {
    name: "The Verge AI",
    url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
    type: "rss",
    category: "ai-specific",
  },
  {
    name: "VentureBeat AI",
    url: "https://venturebeat.com/category/ai/feed/",
    type: "rss",
    category: "ai-specific",
  },
];
