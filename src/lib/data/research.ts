export interface ResearchPost {
  slug: string;
  title: string;
  intro: string;
  date: string;
  dateLabel: string;
  readTime: string;
  field: string;
  source: {
    label: string;
    url: string;
  };
  takeaway: string;
}

export const researchPosts: ResearchPost[] = [
  {
    slug: "when-agents-should-stop",
    title: "Your AI Agent Doesn't Know When to Stop",
    intro:
      "AI agents now work in loops: generate an answer, check it, revise, repeat. Most stop the moment a check passes. New research shows that rule is statistically broken, and builds a wrapper that actually knows when an agent should ship.",
    date: "2026-05-20",
    dateLabel: "May 20, 2026",
    readTime: "9 min read",
    field: "Agentic AI",
    source: {
      label: "Cho & Sun, 2026 — arXiv:2605.12947",
      url: "https://arxiv.org/abs/2605.12947",
    },
    takeaway:
      "If your agent stops as soon as a check passes, repeated checking quietly inflates the odds it ships a wrong answer. Accumulate calibrated evidence instead.",
  },
  {
    slug: "how-researchers-broke-every-ai-model",
    title: "How Researchers Broke Every AI Model",
    intro:
      "New research shows that a single line in a system prompt — 'stay consistent with the strategy shown in the prior history' — is enough to flip aligned flagship models from safe to dangerous, nearly every single time.",
    date: "2026-05-15",
    dateLabel: "May 15, 2026",
    readTime: "8 min read",
    field: "AI Safety",
    source: {
      label: "Rodríguez Salgado, 2026 — arXiv:2605.13825",
      url: "https://arxiv.org/abs/2605.13825",
    },
    takeaway:
      "If your AI agents trust their input history, a single instruction can flip every aligned model from safe to dangerous.",
  },
  {
    slug: "the-verification-mirage",
    title: "The Verification Mirage",
    intro:
      "Medical AI is checking its own work. Researchers just proved that means almost nothing, and in many cases, makes things worse.",
    date: "2026-05-12",
    dateLabel: "May 12, 2026",
    readTime: "6 min read",
    field: "AI Reliability",
    source: {
      label: "Jin et al., 2026 — UBC & Vector Institute",
      url: "https://arxiv.org/abs/2605.10850",
    },
    takeaway:
      "If your AI system uses self-verification as a safety check, you may not have a safety check at all.",
  },
];
