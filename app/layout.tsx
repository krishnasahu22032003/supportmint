import type { Metadata } from "next";
import "./globals.css";
import FooterBar from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: {
    default: "SupportMint — AI Customer Support That Feels Human",
    template: "%s | SupportMint",
  },
  description:
    "SupportMint is an AI-powered customer support platform that delivers instant, human-like conversations across every channel. Resolve questions faster, delight customers, and scale support effortlessly.",
  keywords: [
    "SupportMint",
    "AI Customer Support",
    "Customer Support",
    "AI Chatbot",
    "Customer Service",
    "Live Chat",
    "Support Automation",
    "Help Desk",
    "AI Assistant",
    "Business Support",
  ],
  applicationName: "SupportMint",
  authors: [{ name: "Krishna" }],
  creator: "Krishna",
  publisher: "SupportMint",
  // metadataBase: new URL("https://supportmint.ai"), // Change to your real domain
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <main className="flex-1">{children}</main>
        <FooterBar />
      </body>
    </html>
  );
}