import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/shared/json-ld";
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
  metadataBase: new URL("https://joshuafrancis.ca"),
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
    url: "https://joshuafrancis.ca",
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
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "https://joshuafrancis.ca",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Joshua Francis",
  url: "https://joshuafrancis.ca",
  jobTitle: "AI Consultant & Developer",
  description:
    "AI consultant specializing in strategy, LLM implementation, agent development, and UX/UI design for AI products. Based in Toronto, serving startups and enterprises.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "Ontario",
    addressCountry: "CA",
  },
  knowsAbout: [
    "AI Strategy",
    "LLM Implementation",
    "RAG Pipelines",
    "Prompt Engineering",
    "AI Agent Development",
    "UX/UI Design for AI Products",
    "AI Education & Training",
  ],
  sameAs: [
    "https://www.linkedin.com/in/joshuafrancis1/",
    "https://www.youtube.com/@JoshFrancisAI",
    "https://x.com/uxbyjosh",
  ],
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Joshua Francis AI Consulting",
  url: "https://joshuafrancis.ca",
  description:
    "AI consulting services including strategy and roadmapping, LLM implementation, AI education and training, and UX/UI design for AI products.",
  provider: {
    "@type": "Person",
    name: "Joshua Francis",
  },
  serviceType: [
    "AI Strategy & Roadmapping",
    "LLM Implementation",
    "AI Education & Training",
    "UX/UI Design for AI Products",
  ],
  priceRange: "$$$",
  areaServed: [
    { "@type": "City", name: "Toronto" },
    { "@type": "AdministrativeArea", name: "Greater Toronto Area" },
    { "@type": "Country", name: "Canada" },
    { "@type": "Country", name: "United States" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "Ontario",
    addressCountry: "CA",
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
        <JsonLd data={personSchema} />
        <JsonLd data={professionalServiceSchema} />
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
