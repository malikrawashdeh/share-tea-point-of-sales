import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { GithubProfile } from "next-auth/providers/github";
import { users } from "@prisma/client";
import prisma from "@/lib/prisma";

// type for user
type User = {
  id: string;
  name: string | null;
  username: string;
  email: string;
  role: string;
};

const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      profile(profile: GithubProfile) {
        //console.log(profile)
        return {
          ...profile,
          role: profile.role ?? "user",
          id: profile.id.toString(),
          image: profile.avatar_url,
        };
      },
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username:", type: "text" },
        password: { label: "Password:", type: "password" },
      },

      async authorize(
        credentials: Record<"username" | "password", string> | undefined
      ) {
        const user = await prisma.users.findFirst({
          where: { username: credentials?.username },
        });

        if (user && credentials?.password === user.password) {
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            username: user.username,
            role: user.role,
            password: user.password,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  // TODO: add custome sign in page
};

export default options;
