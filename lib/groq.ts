import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY!,
});

const sendMessageToGroq = async ({
  messages,
  model,
}: {
  messages: { role: string; content: any }[];
  model: string;
}) => {
  const sanitizedMessages = messages.map((msg) => ({
    role: msg.role,
    content:
      typeof msg.content === "string"
        ? msg.content
        : JSON.stringify(msg.content),
  }));

  const response = await groq.chat.completions.create({
    model,
    messages: sanitizedMessages,
  });

  console.log(response);

  return response.choices[0]?.message?.content ?? "No response";
};

const chatWithImage = async ({
  prompt,
  imageBase64,
}: {
  prompt: string;
  imageBase64: string;
}) => {
  const response = await groq.chat.completions.create({
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          {
            type: "image_url",
            image_url: { url: `data:image/jpeg;base64,${imageBase64}` },
          },
        ],
      },
    ],
  });

  return response;
};

export { sendMessageToGroq, chatWithImage };
