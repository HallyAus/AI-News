import { describe, it, expect } from "vitest";
import { stripHtml } from "@/lib/ingestion/rss-fetcher";

describe("stripHtml", () => {
  it("removes HTML tags", () => {
    expect(stripHtml("<p>Hello <b>world</b></p>")).toBe("Hello world");
  });

  it("collapses multiple whitespace", () => {
    expect(stripHtml("Hello   world  test")).toBe("Hello world test");
  });

  it("handles empty string", () => {
    expect(stripHtml("")).toBe("");
  });

  it("handles string with no HTML", () => {
    expect(stripHtml("plain text")).toBe("plain text");
  });

  it("handles complex nested HTML", () => {
    const html =
      '<div class="entry"><p>NVIDIA announces new <a href="#">GPU</a>.</p><br/><p>Stock rises 5%.</p></div>';
    expect(stripHtml(html)).toBe("NVIDIA announces new GPU . Stock rises 5%.");
  });
});
