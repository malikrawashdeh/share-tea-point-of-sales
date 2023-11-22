import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ResponsiveAppBar from "./Navbar";
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";
import options from "./api/auth/[...nextauth]/options";
import AuthProvider from "./context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sharetea",
  description: "Sharetea App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <main className="flex flex-col items-center justify-center w-full flex-1  text-center">
            <ResponsiveAppBar />
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
