import { hash } from "bcrypt";
import prisma from "@/lib/prisma";

const prismaClient = prisma;
export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  const existingUser = await prismaClient.user.findUnique({
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

  return new Response(JSON.stringify({ message: "User created", user }), {
    status: 200,
  });
}
