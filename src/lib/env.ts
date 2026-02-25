import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  ANTHROPIC_API_KEY: z.string().startsWith("sk-ant-"),
  LLM_PROVIDER: z.enum(["claude", "openai"]).default("claude"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("Invalid environment variables:", parsed.error.flatten());
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
}

export const env = validateEnv();
