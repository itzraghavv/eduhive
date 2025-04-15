import CredentialsProvider from "next-auth/providers/credentials";

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
      async authorize(credentials, req) {
        const user = { id: "1", name: "test", email: "test@example.com" };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
