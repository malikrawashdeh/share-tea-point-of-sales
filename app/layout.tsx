import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ResponsiveAppBar from "./Navbar";
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";
import options from "./api/auth/[...nextauth]/options";
import AuthProvider from "./context/AuthProvider";
import { Providers } from "@/lib/providers";

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
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <AuthProvider>
            <a href="#main" className="skip-to-main-content-link">Skip to main content</a>
            <ResponsiveAppBar />
            <main id="main" className="flex flex-col items-center justify-center w-full flex-1  text-center">
              {children}
            </main>
          </AuthProvider>
        </body>
      </html>
    </Providers>
  );
}
