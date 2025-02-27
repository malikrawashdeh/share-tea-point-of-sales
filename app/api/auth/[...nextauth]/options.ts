import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
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
          name: profile.login,
          image: profile.avatar_url,
          email: profile.email ?? "",
        };
      },
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile: GoogleProfile) {
        console.log(profile);
        return {
          ...profile,
          role: profile.role ?? "user",
          name: profile.given_name + " " + profile.family_name,
          email: profile.email,
          image: profile.picture,
          id: profile.sub,
        };
      },
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
      if (user) token.id = user.id;
      return token;
    },
    // If you want to use the role in client components
    async session({ session, token, user }) {
      if (session?.user) {
        let session_user;
        if (session.user.email) {
          session_user = await prisma.users.findFirst({
            where: { email: session.user.email },
          });
        } else if (session.user.name) {
          session_user = await prisma.users.findFirst({
            where: { username: session.user.name },
          });
        }
        if (session_user) {
          // update fields
          session.user.role = session_user.role;
          session.user.id = session_user.id.toString();
          session.user.name = session_user.name;
          session.user.email = session_user.email;
        } else {
          session.user.role = token.role;
          session.user.id = token.id as string;
        }
      }
      console.log(session);
      return session;
    },

    async signIn({ account, profile }) {
      try {
        if (account?.provider === "google") {
          const { name, email } = profile as GoogleProfile;

          const user = await prisma.users.findFirst({
            where: { email: email as string },
          });
          console.log(user);

          // if user does not exist then create user
          if (!user) {
            await prisma.users.create({
              data: {
                name: name as string,
                email: email as string,
                username: email as string,
                password: "",
                role: "user",
              },
            });
          }
        } else if (account?.provider === "github") {
          const { login } = profile as GithubProfile;

          const user = await prisma.users.findFirst({
            where: { username: login as string },
          });
          console.log("user does not exist");
          console.log(user);
          // if user does not exist then create user
          if (!user) {
            await prisma.users.create({
              data: {
                name: (profile?.name as string) ?? "Not provided",
                email: profile?.email as string,
                username: login as string,
                password: "",
                role: "user",
              },
            });
          }
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

export default options;
