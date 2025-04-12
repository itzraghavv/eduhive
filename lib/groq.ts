import type { ModelType } from "@/types/model-types";

export async function sendMessageToGroq(
  messages: { role: string; content: string }[],
  model: ModelType
) {
  const res = await fetch("https://api.groq.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
    }),
  });

  if (!res.ok) throw new Error("Groq API error");

  const data = await res.json();
  return data.choices[0].message.content;
}
