import { describe, it, expect } from "vitest";
import { DEFAULT_SOURCES } from "@/lib/ingestion/sources";

describe("DEFAULT_SOURCES", () => {
  it("has at least 5 sources", () => {
    expect(DEFAULT_SOURCES.length).toBeGreaterThanOrEqual(5);
  });

  it("all sources have required fields", () => {
    for (const source of DEFAULT_SOURCES) {
      expect(source.name).toBeTruthy();
      expect(source.url).toMatch(/^https?:\/\//);
      expect(source.type).toBe("rss");
      expect(["ai-specific", "general-tech", "finance"]).toContain(
        source.category
      );
    }
  });

  it("has no duplicate URLs", () => {
    const urls = DEFAULT_SOURCES.map((s) => s.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("has no duplicate names", () => {
    const names = DEFAULT_SOURCES.map((s) => s.name);
    expect(new Set(names).size).toBe(names.length);
  });
});
