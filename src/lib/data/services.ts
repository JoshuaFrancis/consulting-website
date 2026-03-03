import { Brain, MessageSquareCode, Bot, Palette } from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  icon: typeof Brain;
  summary: string;
  description: string;
  includes: string[];
  whoItsFor: string;
  typicalEngagement: string;
}

export const services: Service[] = [
  {
    slug: "ai-strategy",
    title: "AI Strategy & Roadmapping",
    shortTitle: "AI Strategy",
    icon: Brain,
    summary:
      "Align your AI investments with business goals. I assess your current capabilities, identify high-impact opportunities, and create actionable implementation roadmaps.",
    description:
      "Most companies know AI matters but don't know where to start. I help figure out where AI will actually move the needle for your business, and map out a realistic plan to get there. No hype, just what's worth building.",
    includes: [
      "AI readiness assessment",
      "Opportunity identification & prioritization",
      "Technology selection & architecture recommendations",
      "Implementation roadmap with milestones",
      "ROI modeling & business case development",
    ],
    whoItsFor:
      "Founders and product leaders who know AI matters but need help figuring out what to actually build first.",
    typicalEngagement:
      "2-4 week engagement producing a prioritized AI roadmap with clear milestones and resource requirements.",
  },
  {
    slug: "llm-implementation",
    title: "LLM Implementation",
    shortTitle: "LLM Implementation",
    icon: MessageSquareCode,
    summary:
      "From RAG pipelines to fine-tuned models, I architect and deploy production-ready LLM systems that integrate seamlessly with your existing infrastructure.",
    description:
      "Building with LLMs requires more than API calls. I handle the full implementation, from architecture and prompt engineering to deployment, so you end up with something that actually works in production, not just a demo.",
    includes: [
      "Architecture design & system planning",
      "RAG pipeline development",
      "Prompt engineering & optimization",
      "Fine-tuning & evaluation frameworks",
      "Production deployment & monitoring",
    ],
    whoItsFor:
      "Engineering teams building LLM-powered features who need architectural guidance and hands-on implementation support.",
    typicalEngagement:
      "4-12 week embedded engagement, working directly with your engineering team.",
  },
  {
    slug: "agent-development",
    title: "AI Agent Development",
    shortTitle: "Agent Development",
    icon: Bot,
    summary:
      "Design and build autonomous agent systems that handle complex workflows, from customer support to data analysis to internal operations.",
    description:
      "I design and build AI agents that handle real workflows: tool calling, multi-step reasoning, and human-in-the-loop flows. This is what I do day-to-day in my full-time role, and I bring that experience to consulting engagements.",
    includes: [
      "Agent architecture design",
      "Tool & function calling setup",
      "Multi-agent orchestration",
      "Safety guardrails & error handling",
      "Monitoring, logging & deployment",
    ],
    whoItsFor:
      "Companies looking to automate complex workflows with autonomous AI agents.",
    typicalEngagement:
      "6-16 week engagement from design through production deployment and monitoring setup.",
  },
  {
    slug: "ux-design",
    title: "UX/UI Design for AI Products",
    shortTitle: "UX/UI Design",
    icon: Palette,
    summary:
      "Human-centered design for AI-powered products. I create interfaces that make complex AI capabilities intuitive and trustworthy for end users.",
    description:
      "AI products fail when users don't trust or understand them. I design interfaces for AI-powered products, including conversational UIs, dashboards, and generation tools, making sure the technology actually serves the people using it.",
    includes: [
      "User research & needs analysis",
      "Interaction design & prototyping",
      "Design system development",
      "Usability testing for AI interfaces",
      "Trust & transparency design patterns",
    ],
    whoItsFor:
      "Product teams building AI-powered products who need interfaces that users actually trust and adopt.",
    typicalEngagement:
      "Flexible engagement model, from design sprints to ongoing product design partnership.",
  },
];
