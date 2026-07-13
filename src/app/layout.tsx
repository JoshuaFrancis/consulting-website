import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/shared/json-ld";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://joshuafrancis.ca"),
  title: {
    default: "Joshua Francis | Credibility-First Websites for Premium Brands",
    template: "%s | Joshua Francis",
  },
  description:
    "I design and build credibility-first websites for premium service brands, engineered to make you look as established as you actually are, so the right clients take you seriously and you can hold your prices. One accountable owner, design and build, no handoff.",
  openGraph: {
    title: "Joshua Francis | Credibility-First Websites for Premium Brands",
    description:
      "Look as established as you already are. Design-led, custom-built websites engineered to win premium clients before the first call. One accountable owner who designs and builds.",
    type: "website",
    locale: "en_US",
    siteName: "Joshua Francis",
    url: "https://joshuafrancis.ca",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joshua Francis | Credibility-First Websites for Premium Brands",
    description:
      "Look as established as you already are. Design-led, custom-built websites engineered to win premium clients before the first call. One accountable owner who designs and builds.",
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
  jobTitle: "Designer & Developer",
  description:
    "Toronto-based designer and developer. Designs and builds credibility-first websites for premium service brands, so they look as established as they are and can hold their prices. One accountable owner, design and build, with an enterprise AI background and finance roots at BMO.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "Ontario",
    addressCountry: "CA",
  },
  knowsAbout: [
    "Website Design for Premium Brands",
    "Brand Credibility & Positioning",
    "Conversion-focused Web Development",
    "Product & UX Design",
    "Production Engineering",
    "UX/UI Design",
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
  name: "Joshua Francis | Credibility-First Websites for Premium Brands",
  url: "https://joshuafrancis.ca",
  description:
    "Credibility-first website design and build for premium service brands, engineered to make them look as established as they are so the right clients take them seriously and they can hold their prices. One owner, design and build.",
  provider: {
    "@type": "Person",
    name: "Joshua Francis",
  },
  serviceType: [
    "Website Design for Premium Brands",
    "Brand Credibility & Positioning",
    "Design & Build (one accountable owner)",
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
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Kayleigh Shikanai" },
      reviewBody:
        "I've received a lot of compliments on the website. It gives Shiki Studios a more prestige, high-quality look. Sign-ups are up 24% since the new site launched. It's summer, when I expected them to dip, but we nearly matched my best month of the year. I love it.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "William Shields" },
      reviewBody:
        "For a long time, our website was the weakest part of how we showed up. It didn't represent the level we were at. Josh led the redesign, and the difference is night and day. Now prospects compliment the site before the first call. If you want someone who treats your site like it's their own, it's Josh.",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${inter.className}`}
    >
      <body>
        <JsonLd data={personSchema} />
        <JsonLd data={professionalServiceSchema} />
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster position="bottom-right" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
