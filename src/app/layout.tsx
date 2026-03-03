import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: {
    default: "Joshua Francis | AI Consulting & Implementation",
    template: "%s | Joshua Francis",
  },
  description:
    "AI strategy, LLM implementation, and agent development for startups and enterprises. Turning AI ambition into production reality.",
  openGraph: {
    title: "Joshua Francis | AI Consulting & Implementation",
    description:
      "AI strategy, LLM implementation, and agent development. Turning AI ambition into production reality.",
    type: "website",
    locale: "en_US",
    siteName: "Joshua Francis",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joshua Francis | AI Consulting & Implementation",
    description:
      "AI strategy, LLM implementation, and agent development. Turning AI ambition into production reality.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${inter.className}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
