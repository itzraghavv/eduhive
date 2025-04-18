import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import prisma from "@/lib/prisma";
import { getSession, useSession } from "next-auth/react";
import { authOptions } from "@/lib/auth";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { data: session } = useSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id!;
  const formData = await req.formData();
  const file = formData.get("file") as File;

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

  return NextResponse.json({ url: publicURL });
}
