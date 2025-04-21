import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
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
          return null;
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
  callbacks: {
    async session({ session, token }) {
      // Attach the user ID to the session object
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Attach the user ID to the JWT token
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
};
