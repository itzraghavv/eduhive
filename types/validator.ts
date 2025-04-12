import z from "zod";
import { SUPPORTED_MODELS } from "./model-types";

export const MessageSchema = z.object({
  role: z.enum(["user", "ai"]),
  content: z.string().min(1),
});

export const SendMessageToGroqSchema = z.object({
  messages: z.array(MessageSchema).min(1),
  model: z.enum(SUPPORTED_MODELS),
});