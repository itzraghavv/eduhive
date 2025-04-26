import { sendMessageToGroq } from "@/lib/groq";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // TODO - Validate the Data from req body
  const { messages, model } = await req.json();
  console.log(messages, model);

  try {
    const response = await sendMessageToGroq(messages, model);
    return NextResponse.json({ content: response });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to fetch from Groq" },
      { status: 500 }
    );
  }
}
