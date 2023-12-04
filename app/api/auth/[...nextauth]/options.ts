import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { GithubProfile } from "next-auth/providers/github";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

const options: NextAuthOptions = {
  pages: {
    // TODO implement signin page
    signIn: "/signin",
  },
  providers: [
    GitHubProvider({
      profile(profile: GithubProfile) {
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
        if (!credentials || !credentials.username || !credentials.password) {
          return null;
        }
        const user = await prisma.users.findFirst({
          where: { username: credentials?.username },
        });

        const passwordMatch = await compare(
          credentials?.password,
          user?.password ?? ""
        );

        if (user && passwordMatch) {
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
    async session({ session, token, user }) {
      if (session?.user) session.user.role = token.role;
      if (session?.user) session.user.id = token.sub as string;
      return session;
    },
  },
};

export default options;
