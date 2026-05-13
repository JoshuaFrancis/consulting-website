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
