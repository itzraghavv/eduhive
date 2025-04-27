import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { chatWithImage } from "@/lib/groq";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id!;

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const prompt = formData.get("prompt") as string;

  // Debugging: log the received file and prompt
  console.log("Received file:", file);
  console.log("Received prompt:", prompt);

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const fileName = `${Date.now()}-${file.name}`;

  // Upload file to Supabase
  const { data, error } = await supabase.storage
    .from("user-uploads")
    .upload(fileName, file, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    console.error("Error uploading file to Supabase:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const publicURL = supabase.storage.from("user-uploads").getPublicUrl(fileName)
    .data.publicUrl;
  console.log("Public URL:", publicURL);

  await prisma.image.create({
    data: {
      url: publicURL,
      userId: userId,
      createdAt: new Date(),
    },
  });

  // Call Groq API with the image URL and prompt
  try {
    const aiResult = await chatWithImage({
      prompt,
      imageUrl: publicURL,
    });

    console.log("Groq response:", aiResult);

    return NextResponse.json({ aiResult, url: publicURL });
  } catch (error) {
    console.error("Error calling Groq:", error);
    return NextResponse.json(
      { error: "Error processing Groq request" },
      { status: 500 }
    );
  }
}
