import { describe, it, expect } from "vitest";
import { createLLMProvider } from "@/lib/llm";

describe("createLLMProvider", () => {
  it("creates a claude provider by default", () => {
    const provider = createLLMProvider("claude");
    expect(provider).toBeDefined();
    expect(provider.scoreArticle).toBeTypeOf("function");
    expect(provider.summariseArticle).toBeTypeOf("function");
  });

  it("throws for unknown provider", () => {
    expect(() => createLLMProvider("unknown")).toThrow("Unknown LLM provider");
  });
});
