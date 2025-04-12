import { sendMessageToGroq } from "@/lib/groq";
import { SendMessageToGroqSchema } from "@/types/validator";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const parsedData = SendMessageToGroqSchema.safeParse(body);
  console.log(parsedData.data);
  if (!parsedData.success) {
    NextResponse.json({ error: "Failed to validate data" }, { status: 500 });
    return;
  }

  try {
    const response = await sendMessageToGroq(
      parsedData.data?.messages,
      parsedData.data?.model
    );
    return NextResponse.json({ content: response });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to fetch from Groq" },
      { status: 500 }
    );
  }
}
