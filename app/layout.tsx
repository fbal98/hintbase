import './globals.css'
import type { Metadata } from 'next'
import { Inter } from "next/font/google";
import Footer from './components/Footer'
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "HintBase - Quick Reference Cheat Sheets",
  description:
    "Compact, easy-to-access cheat sheets and keyboard shortcuts for developers and tech enthusiasts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} font-sans dark`}>
        <body className="bg-background text-foreground min-h-screen flex flex-col">
          <main>{children}</main>
          <Footer />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
