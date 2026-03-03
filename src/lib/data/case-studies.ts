export interface CaseStudy {
  slug: string;
  title: string;
  summary: string;
  categories: string[];
  client: string;
  timeline: string;
  challenge: string | string[];
  approach: string | string[];
  results: { metric: string; description: string }[];
  testimonial?: { quote: string; author: string; role: string };
  url?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "ai-image-creation-course",
    title: "AI Image Creation for Everyone: Online Course",
    summary:
      "Designed and launched a top-performing AI image creation course on the Uplimit platform that earned a perfect 100/100 feedback score, an 89 NPS, and a 74.5% completion rate, well above industry averages.",
    categories: ["UX Design", "AI", "Course Design"],
    client: "Uplimit",
    timeline: "May 2023",
    challenge: [
      "We believed that AI image creation shouldn't be locked behind technical expertise. In early 2023, generative AI was exploding, but there was a disconnect: the people who stood to benefit most from these tools, marketers, content creators, designers, and entrepreneurs, were the ones least equipped to use them. The technology was moving fast, but the education wasn't keeping up.",
      "The evidence was everywhere. Scroll through any social feed and you'd see AI-generated images with mangled hands, garbled text, and an uncanny lack of photorealism. People were experimenting, but without guidance, most were getting mediocre results and giving up. The tools themselves weren't the problem. The gap was in understanding how to use them with intention.",
      "Existing tutorials were either too technical (aimed at engineers and researchers) or too shallow (surface-level prompt tips with no real-world application). There was nothing that met professionals where they were and gave them a structured path from \"I've never used this\" to \"I'm creating production-quality visuals for my business.\"",
      "That was the opportunity. Not just to teach a tool, but to change how people think about visual content creation in the age of AI.",
    ],
    approach: [
      "I collaborated with SynthMinds founder Wes Shields to design the course from the ground up. Before writing a single lesson, we started with a core belief: if we designed the learning experience around real professional needs rather than technical novelty, we could make AI image creation genuinely accessible to anyone.",
      "We developed a user persona to anchor every design decision. Our target learner wasn't an AI enthusiast. They were a marketing manager who needed better visuals, a freelance designer exploring new tools, or a founder trying to create brand assets without a design team. Everything in the course had to serve that person.",
      "The curriculum was structured as a three-week program, each week building on the last. Week one introduced generative AI fundamentals, prompt engineering, and the ethical considerations that professionals need to understand. Week two went deeper into photorealism techniques, design principles, and advanced tool features. Week three brought it all together with professional applications: creating presentations, marketing materials, and visual narratives that participants could use immediately in their work.",
      "One of the biggest design challenges was serving two audiences at once. Complete beginners needed confidence-building and accessible tools. More experienced users wanted advanced techniques and sophisticated workflows. We solved this with a dual-track approach: the core lectures used DALL-E, which is intuitive and forgiving for newcomers, while optional advanced sessions introduced Midjourney and Leonardo AI for participants ready to go deeper.",
      "We built an iterative feedback loop into the structure of the course itself. After each week, we collected participant feedback on content clarity, difficulty level, and practical applicability. Between cohorts, we rewrote sections that felt unclear, added step-by-step tutorials where participants got stuck, simplified concepts that were unnecessarily complex, and introduced multimedia elements for a more dynamic experience. The course wasn't just delivered. It was continuously redesigned based on what learners actually needed.",
    ],
    results: [
      {
        metric: "100/100",
        description: "Customer feedback score from course participants",
      },
      {
        metric: "89 NPS",
        description: "Net promoter score, indicating strong advocacy",
      },
      {
        metric: "74.5%",
        description: "Average completion rate, well above industry standard",
      },
    ],
    testimonial: {
      quote:
        "The expert instruction, guidance, and support were pivotal to me learning a vast world of AI-powered image generation techniques. I learned about color theory, camera lens effects, artistic styles, and so much more. I feel like I truly haven't been leveraging these AI tools nearly enough, so I am incredibly thankful I took this course.",
      author: "Brian H. Hough",
      role: "Founder & Software Engineer",
    },
  },
  {
    slug: "roomlab-ai-interior-design",
    title: "RoomLab: AI-Powered Interior Design Platform",
    summary:
      "Took an idea from concept to live SaaS product. Built the AI pipeline, web app, payment system, and marketing site, then shipped it.",
    categories: ["AI Product Development", "UX/UI Design"],
    client: "Self-Initiated Product",
    timeline: "Ongoing",
    url: "https://www.roomlab.ca",
    challenge:
      "Homeowners trying to visualize renovations face an expensive, slow process: hiring designers for concept mockups, waiting days for revisions, and paying hundreds per room. Interior designers spend hours manually creating mood boards and concept renders for client presentations. Real estate agents need affordable virtual staging but existing solutions are either too expensive for individual listings or produce unrealistic results. There was a clear gap for an accessible, instant AI tool that could generate high-quality room redesigns from a simple photo and text description.",
    approach:
      "Identified the opportunity, validated the idea, and built the entire product solo. Connected an AI image generation model to a custom pipeline that accepts room photos and natural language style descriptions, then returns redesigned versions that preserve the original room layout. The real work was in the product layer: designing an intuitive three-step flow (upload, describe, transform), building a credit-based subscription system with Stripe, and creating a marketing site that speaks to three distinct audiences: homeowners, designers, and real estate agents. Shipped the full product end-to-end: AI integration, web app, payments, and go-to-market.",
    results: [
      {
        metric: "< 30s",
        description: "From photo upload to AI-generated redesign",
      },
      {
        metric: "End-to-end",
        description: "AI, app, payments, and marketing, shipped solo",
      },
      {
        metric: "Live",
        description: "Fully launched SaaS product accepting customers",
      },
    ],
  },
  {
    slug: "synthminds-brand-platform",
    title: "SynthMinds: AI Consulting Brand & Web Platform",
    summary:
      "Designed and built the complete brand identity and web platform for SynthMinds, an AI consulting and education firm working with enterprise clients including NVIDIA, PwC, and Kraft Heinz.",
    categories: ["UX/UI Design", "AI Strategy"],
    client: "SynthMinds AI",
    timeline: "6 weeks",
    challenge:
      "SynthMinds needed a digital presence that matched the caliber of their enterprise client roster (NVIDIA, PwC, HP, Kraft Heinz) while making complex AI consulting and education services feel approachable. Their existing presence lacked the visual authority to convert enterprise leads and failed to communicate the breadth of their four service pillars: consulting, education, design, and integration.",
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
