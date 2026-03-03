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
      "Most companies know AI matters but lack a clear path from ambition to execution. I work with leadership teams to cut through the hype, identify where AI will create the most value, and build a prioritized plan to get there.",
    includes: [
      "AI readiness assessment",
      "Opportunity identification & prioritization",
      "Technology selection & architecture recommendations",
      "Implementation roadmap with milestones",
      "ROI modeling & business case development",
    ],
    whoItsFor:
      "Executives and product leaders who know AI matters but need a clear path from ambition to execution.",
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
      "Building with LLMs requires more than API calls. I design robust architectures that handle retrieval, context management, evaluation, and deployment — systems that are reliable, cost-effective, and actually work in production.",
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
      "Design and build autonomous agent systems that handle complex workflows — from customer support to data analysis to internal operations.",
    description:
      "AI agents are the next frontier of automation. I design and build agent architectures that can reason, use tools, and handle multi-step workflows autonomously — with the safety guardrails needed for production use.",
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
      "AI products fail when users don't trust or understand them. I bring design rigor to AI interfaces — from conversational UIs to dashboards to decision-support tools — making sure the technology serves the people using it.",
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
      "Flexible engagement model — from design sprints to ongoing product design partnership.",
  },
];
