import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "enter username",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findFirst({
          where: { email: credentials.username },
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
