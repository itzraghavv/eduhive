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

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64Image = buffer.toString("base64");

  const mimeType = file.type; // e.g., "image/png"
  const imageDataUrl = `data:${mimeType};base64,${base64Image}`;

  // Upload file to Supabase (optional, if you still want to store)
  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("user-uploads")
    .upload(fileName, file, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const publicURL = supabase.storage.from("user-uploads").getPublicUrl(fileName)
    .data.publicUrl;

  await prisma.image.create({
    data: {
      url: publicURL,
      userId: userId,
      createdAt: new Date(),
    },
  });

  // 👉 Now call Groq with prompt + base64 image
  const aiResult = await chatWithImage(prompt, base64Image);

  return NextResponse.json({ aiResult, url: publicURL });
}
