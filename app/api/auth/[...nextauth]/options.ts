import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username:", type: "text" },
        password: { label: "Password:", type: "password" },
      },
      async authorize(credentials) {
        // TODO: this is where you would call a database to get the user
        // and compare the password
        // Docs: https://next-auth.js.org/configuration/providers#credentials-provider
        const user = { id: "42", name: "username", password: "password" };
        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  // TODO: add custome sign in page
};

export default options;
