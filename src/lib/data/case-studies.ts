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
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "ai-customer-intelligence",
    title: "AI-Powered Customer Intelligence Platform",
    summary:
      "Built an LLM-powered analytics platform that transforms raw customer data into actionable insights for a Series B fintech startup.",
    categories: ["LLM Implementation", "AI Strategy"],
    client: "Series B FinTech Startup",
    timeline: "12 weeks",
    challenge:
      "The client's customer success team was spending 15+ hours per week manually analyzing customer feedback across support tickets, NPS surveys, and product usage data. Insights were inconsistent and often arrived too late to act on.",
    approach:
      "Designed a RAG pipeline combining customer support transcripts, NPS surveys, and product usage data. Built a custom embedding strategy for multi-source retrieval, implemented structured extraction for key themes, and deployed an internal dashboard that surfaces weekly intelligence reports automatically.",
    results: [
      { metric: "85%", description: "Reduction in manual analysis time" },
      {
        metric: "3.2x",
        description: "Increase in actionable insights identified",
      },
      { metric: "22%", description: "Improvement in customer retention" },
    ],
    testimonial: {
      quote:
        "Joshua didn't just build us an AI tool — he fundamentally changed how we understand our customers.",
      author: "Sarah Chen",
      role: "VP of Customer Success",
    },
  },
  {
    slug: "autonomous-document-processing",
    title: "Autonomous Document Processing Pipeline",
    summary:
      "Designed and deployed an AI agent system that automates complex legal document review and extraction for a legal tech company.",
    categories: ["Agent Development", "LLM Implementation"],
    client: "Legal Tech Company",
    timeline: "16 weeks",
    challenge:
      "The client's legal team was processing 500+ contracts per month manually, with each review taking 2-3 hours. Error rates were climbing as volume increased, and hiring more reviewers wasn't scalable.",
    approach:
      "Built a multi-agent system where specialized agents handle different document types. Implemented tool-calling for structured data extraction, cross-reference validation, and exception flagging. Added human-in-the-loop review for edge cases with confidence scoring.",
    results: [
      { metric: "90%", description: "Reduction in processing time per document" },
      { metric: "99.2%", description: "Accuracy rate on standard contracts" },
      { metric: "$1.2M", description: "Annual cost savings" },
    ],
    testimonial: {
      quote:
        "The agent system handles our entire standard contract pipeline. Our team now focuses on the complex negotiations that actually need human judgment.",
      author: "Michael Torres",
      role: "Head of Legal Operations",
    },
  },
  {
    slug: "enterprise-knowledge-management",
    title: "Enterprise Knowledge Management System",
    summary:
      "Architected an AI-powered knowledge base that makes institutional knowledge searchable and actionable across a 2,000-person organization.",
    categories: ["AI Strategy", "LLM Implementation"],
    client: "Enterprise SaaS Company",
    timeline: "10 weeks",
    challenge:
      "Critical institutional knowledge was scattered across Confluence, Slack, Google Drive, and employees' heads. New hires took months to become productive, and experienced employees spent hours answering repeated questions.",
    approach:
      "Led the AI strategy engagement to identify the highest-impact knowledge workflows. Architected a RAG system with multi-source ingestion, semantic search, and answer generation with source attribution. Designed the UX to build trust through transparency — every answer shows its sources.",
    results: [
      { metric: "60%", description: "Faster onboarding for new hires" },
      { metric: "8hrs", description: "Saved per employee per month" },
      { metric: "94%", description: "User satisfaction rating" },
    ],
    testimonial: {
      quote:
        "This is the first internal tool our team actually wants to use. The AI feels like talking to a senior colleague who's read everything.",
      author: "Lisa Park",
      role: "Director of Engineering",
    },
  },
  {
    slug: "conversational-ai-healthcare",
    title: "Conversational AI for Healthcare Triage",
    summary:
      "Designed the UX and implemented the AI backend for a patient-facing triage chatbot that routes inquiries to the right care pathway.",
    categories: ["UX/UI Design", "LLM Implementation"],
    client: "HealthTech Startup",
    timeline: "14 weeks",
    challenge:
      "The client's nurse triage line was overwhelmed, with 40% of calls being non-urgent inquiries that could be handled through self-service. Patients were waiting 20+ minutes for simple routing questions.",
    approach:
      "Designed a conversational UI that feels empathetic and trustworthy — critical in healthcare. Implemented guardrails to ensure the AI never provides medical advice, only routing. Built escalation pathways and confidence thresholds to ensure patient safety.",
    results: [
      { metric: "45%", description: "Reduction in non-urgent call volume" },
      { metric: "< 2min", description: "Average triage completion time" },
      { metric: "4.6/5", description: "Patient satisfaction score" },
    ],
  },
  {
    slug: "sales-ai-assistant",
    title: "Internal AI Assistant for Sales Teams",
    summary:
      "Built an AI agent that helps sales representatives prepare for calls by synthesizing CRM data, recent interactions, and market intelligence.",
    categories: ["Agent Development", "AI Strategy"],
    client: "Enterprise Software Company",
    timeline: "8 weeks",
    challenge:
      "Sales reps were spending 30-45 minutes preparing for each prospect call, manually pulling data from Salesforce, LinkedIn, news sources, and internal knowledge bases. Preparation quality varied wildly across the team.",
    approach:
      "Built an agent that orchestrates multiple tool calls — CRM lookup, company news aggregation, competitive intelligence retrieval, and conversation history analysis. Generates structured pre-call briefs with talking points, risk factors, and recommended next steps.",
    results: [
      { metric: "70%", description: "Reduction in call prep time" },
      { metric: "18%", description: "Increase in conversion rate" },
      { metric: "2x", description: "Adoption rate vs. previous tools" },
    ],
    testimonial: {
      quote:
        "My team went from dreading call prep to actually looking forward to it. The briefs are better than what most reps were producing manually.",
      author: "David Kim",
      role: "VP of Sales",
    },
  },
];
