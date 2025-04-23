import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY!,
});

export async function sendMessageToGroq(
  messages: { role: string; content: any }[], 
  model: string
) {
  const sanitizedMessages = messages.map((msg) => ({
    role: msg.role,
    content: typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content),
  }));

  const response = await groq.chat.completions.create({
    model,
    messages: sanitizedMessages,
  });

  console.log(response);

  return response.choices[0]?.message?.content ?? "No response";
}
