import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
// import Providers from "next-auth/providers";

const handle = NextAuth(authOptions);

export default NextAuth({
  providers: [
    // Your providers here
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});

export const GET = handle;
export const POST = handle;
