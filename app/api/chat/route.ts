import { sendMessageToGroq } from "@/lib/groq";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // TODO - Validate the Data from req body
  const { messages, model } = await req.json();

  console.log("Received messages:", messages); // Debug log
  console.log("Received model:", model); // Debug log

  if (!messages || !Array.isArray(messages)) {
    console.error("Invalid or missing messages array"); // Debug log
    return NextResponse.json(
      { error: "Invalid or missing messages array" },
      { status: 400 }
    );
  }

  try {
    const response = await sendMessageToGroq({
      messages: messages,
      model: model,
    });

    return NextResponse.json({ content: response });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to fetch from Groq" },
      { status: 500 }
    );
  }
}
