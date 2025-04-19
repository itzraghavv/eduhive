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

export async function analyzeImageWithGroq(
  imageUrl: string,
  prompt = "What is this image about?"
) {
  const chat = await groq.chat.completions.create({
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    temperature: 0.7,
    max_completion_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt,
          },
          {
            type: "image_url",
            image_url: { url: imageUrl },
          },
        ],
      },
    ],
  });

  return chat.choices[0]?.message?.content ?? "No response";
}
