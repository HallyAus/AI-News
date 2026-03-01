import type { LLMProvider } from "@/types/llm";
import { ClaudeProvider } from "./claude";

const providers: Record<string, () => LLMProvider> = {
  claude: () => new ClaudeProvider(),
};

export function createLLMProvider(provider?: string): LLMProvider {
  const name = (provider ?? process.env.LLM_PROVIDER ?? "claude").trim();
  const factory = providers[name];

  if (!factory) {
    throw new Error(
      `Unknown LLM provider: ${name}. Available: ${Object.keys(providers).join(", ")}`
    );
  }

  return factory();
}
