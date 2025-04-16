import { hash } from "bcrypt";
import prisma from "@/lib/prisma";
import { SignUpSchema } from "@/lib/validators";

const prismaClient = prisma;
export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  const data = SignUpSchema.safeParse({ username, email, password });

  if (!data.success) {
    return new Response(JSON.stringify({ error: data.error.issues }), {
      status: 400,
    });
  }

  const existingUser = await prismaClient.user.findFirst({
    where: { email },
  });

  if (existingUser) {
    return new Response(JSON.stringify({ error: "User already exists" }), {
      status: 400,
    });
  }

  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name: username,
      email,
      password: hashedPassword,
    },
  });

  return new Response(JSON.stringify({ message: "User created" }), {
    status: 200,
  });
}
