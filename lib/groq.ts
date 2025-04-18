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

export async function analyzeImageWithGroq(imageUrl: string, prompt: string) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY!}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llava-hd-13b",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: imageUrl } },
          ],
        },
      ],
    }),
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "No response";
}
