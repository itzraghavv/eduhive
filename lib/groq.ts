import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
});

export async function sendMessageToGroq(
  messages: { role: string; content: string }[],
  model: string
) {
  const response = await groq.chat.completions.create({
    model,
    messages,
  });

  return response.choices[0]?.message?.content ?? "No response";
}
