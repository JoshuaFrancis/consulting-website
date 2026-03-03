export interface CaseStudy {
  slug: string;
  title: string;
  summary: string;
  categories: string[];
  client: string;
  timeline: string;
  challenge: string;
  approach: string;
  results: { metric: string; description: string }[];
  testimonial?: { quote: string; author: string; role: string };
  url?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "roomlab-ai-interior-design",
    title: "RoomLab — AI-Powered Interior Design Platform",
    summary:
      "Took an idea from concept to live SaaS product — built the AI pipeline, web app, payment system, and marketing site, then shipped it.",
    categories: ["AI Product Development", "UX/UI Design"],
    client: "Self-Initiated Product",
    timeline: "Ongoing",
    url: "https://www.roomlab.ca",
    challenge:
      "Homeowners trying to visualize renovations face an expensive, slow process — hiring designers for concept mockups, waiting days for revisions, and paying hundreds per room. Interior designers spend hours manually creating mood boards and concept renders for client presentations. Real estate agents need affordable virtual staging but existing solutions are either too expensive for individual listings or produce unrealistic results. There was a clear gap for an accessible, instant AI tool that could generate high-quality room redesigns from a simple photo and text description.",
    approach:
      "Identified the opportunity, validated the idea, and built the entire product solo. Connected an AI image generation model to a custom pipeline that accepts room photos and natural language style descriptions, then returns redesigned versions that preserve the original room layout. The real work was in the product layer — designing an intuitive three-step flow (upload, describe, transform), building a credit-based subscription system with Stripe, and creating a marketing site that speaks to three distinct audiences: homeowners, designers, and real estate agents. Shipped the full product end-to-end: AI integration, web app, payments, and go-to-market.",
    results: [
      {
        metric: "< 30s",
        description: "From photo upload to AI-generated redesign",
      },
      {
        metric: "End-to-end",
        description: "AI, app, payments, and marketing — shipped solo",
      },
      {
        metric: "Live",
        description: "Fully launched SaaS product accepting customers",
      },
    ],
  },
  {
    slug: "synthminds-brand-platform",
    title: "SynthMinds — AI Consulting Brand & Web Platform",
    summary:
      "Designed and built the complete brand identity and web platform for SynthMinds, an AI consulting and education firm working with enterprise clients including NVIDIA, PwC, and Kraft Heinz.",
    categories: ["UX/UI Design", "AI Strategy"],
    client: "SynthMinds AI",
    timeline: "6 weeks",
    challenge:
      "SynthMinds needed a digital presence that matched the caliber of their enterprise client roster — NVIDIA, PwC, HP, Kraft Heinz — while making complex AI consulting and education services feel approachable. Their existing presence lacked the visual authority to convert enterprise leads and failed to communicate the breadth of their four service pillars: consulting, education, design, and integration.",
    approach:
      "Designed a premium dark-themed brand system pairing Playfair Display serif headings with clean sans-serif body text to balance authority with approachability. Built an immersive hero experience with video backgrounds and atmospheric gradient overlays. Created a distinctive gradient card system for the four service pillars with interactive glow effects. Implemented asymmetric grid layouts for blog content, a client logo showcase, and testimonial sections with frosted-glass treatments. Delivered a fully responsive Next.js build optimized for performance and SEO.",
    results: [
      { metric: "3x", description: "Increase in qualified enterprise leads" },
      { metric: "52%", description: "Improvement in average session duration" },
      { metric: "40%", description: "Increase in consultation bookings" },
    ],
    testimonial: {
      quote:
        "Joshua translated our vision into a platform that truly reflects the quality of work we deliver. Enterprise clients now take us seriously from the first click.",
      author: "Wes Simons",
      role: "Founder, SynthMinds AI",
    },
  },
];
