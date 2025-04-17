export const SUPPORTED_CHAT_MODELS = [
  "llama3-8b-8192",
  "llama3-70b-8192",
  "mixtral-8x7b-32768",
  "gemma-7b-it",
] as const;

export type ModelType = (typeof SUPPORTED_CHAT_MODELS)[number];
