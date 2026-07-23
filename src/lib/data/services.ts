import {
  Bot,
  Phone,
  AppWindow,
  Sparkles,
  GraduationCap,
  Workflow,
  LayoutTemplate,
  Wrench,
} from "lucide-react";

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface ServiceProofPoint {
  metric: string;
  label: string;
}

export interface ProblemQuote {
  /** The pain, in the buyer's words. */
  quote: string;
  /** A substring of `quote` to highlight (the damning phrase). */
  emphasis?: string;
  /** What it quietly costs, shown as the consequence. */
  consequence?: string;
  /** Light attribution to make it feel like a real voice. */
  attribution?: string;
  /** Render at lead (large) scale. */
  lead?: boolean;
}

export interface Service {
  slug: string;
  // When true, the service is hidden site-wide (nav, index, sitemap, page).
  disabled?: boolean;
  title: string;
  shortTitle: string;
  tagline: string;
  icon: typeof Bot;
  summary: string;
  heroHeadline: string;
  heroSubhead: string;
  description: string;
  sectionHeadings: {
    capabilities: { lead: string; em: string };
    pricing: { lead: string; em: string };
    faq: { lead: string; em: string };
    audience: { lead: string; em: string };
  };
  capabilities: { title: string; description: string }[];
  idealClients: { title: string; description: string }[];
  retainerIncludes: string[];
  processSteps: ServiceProcessStep[];
  pricingFrom: string;
  pricingNote: string;
  faqs: ServiceFAQ[];
  whoItsFor: string;
  typicalEngagement: string;
  // legacy field kept for backward compat with existing components
  includes: string[];

  // ── 5P fields (used by the offer-page template) ──────────────
  // Present on the current three offers; optional so legacy entries still type-check.
  /** Who it's specifically for, shown as an above-the-fold badge. */
  forWho?: string;
  /** One-line trust signal shown in the hero. */
  trustSignal?: string;
  /** Felt pain in the buyer's words, for the homepage door card. */
  doorPain?: string;
  /** Outcome line for the homepage door card. */
  doorOutcome?: string;
  /** PROBLEM section: exact buyer language (the pain sheet). */
  pains?: string[];
  /** PROBLEM section: editorial voices-wall (quotes + emphasis + consequence). */
  problemQuotes?: ProblemQuote[];
  /** PROBLEM section: why what they've already tried keeps failing. */
  whyItFails?: string;
  /** PROBLEM section: bridge line into the proof. */
  problemBridge?: string;
  /** PROOF section heading + intro. */
  proofHeadline?: string;
  proofIntro?: string;
  /** PROOF section: headline numbers tied to the problem. */
  proofPoints?: ServiceProofPoint[];
  /** PROOF section: case-study slugs from case-studies.ts. */
  caseStudySlugs?: string[];
  /** PUSH: "audit" → paid audit entry; "consultation" → intro call. */
  ctaKind?: "audit" | "consultation";
  ctaHeadline?: string;
  ctaSubhead?: string;
  ctaButton?: string;
  ctaProof?: string;
  /** The transformation summary in Josh's voice. */
  transformation?: string;
}

const serviceList: Service[] = [
  {
    slug: "creative-studio",
    disabled: true, // retired offer, preserved for reference / possible reuse
    title: "Creative Studio",
    shortTitle: "Creative Studio",
    tagline: "Video, avatars, and ad creative, weekly",
    icon: Sparkles,
    summary:
      "An AI-native creative studio for the brands that need to ship more, faster. Video ads, AI avatars, UGC, and image creative, produced at the speed your feeds demand.",
    heroHeadline: "Creative is the only lever left.",
    sectionHeadings: {
      capabilities: { lead: "What the studio", em: "makes." },
      pricing: { lead: "Two ways to", em: "work together." },
      faq: { lead: "The questions", em: "we get most." },
      audience: { lead: "Built for brands that", em: "live in the feed." },
    },
    heroSubhead:
      "Meta and TikTok automated the targeting and the bidding. Creative is the last thing you control, and the brands winning right now simply make more of it. We produce video, UGC, avatars, and static every week, in your brand's voice.",
    description:
      "Old-school agencies bill $40k and deliver a single hero ad in six weeks. We deliver dozens of formats, weekly, at a fraction of the cost. AI-native production with a human creative director making sure nothing looks like AI slop.",
    capabilities: [
      {
        title: "Video ads",
        description:
          "Short-form vertical ads for TikTok, Reels, and Shorts. Hooks, scripts, B-roll, music, captions. Built around the platforms and the audience, not last decade's TV-ad logic.",
      },
      {
        title: "AI avatars",
        description:
          "Talking-head video at the speed of text. Spokesperson, sales-pitch, or product walkthrough avatars trained on your brand voice. New scripts shipped in hours, not weeks.",
      },
      {
        title: "UGC-style content",
        description:
          "Authentic-feeling creator content without the creator. Handheld, unpolished, scroll-stopping. The aesthetic that actually converts in 2026.",
      },
      {
        title: "Image ads & static",
        description:
          "Static creative for paid social, programmatic, and search. Headline variants, product hero shots, lifestyle scenes. Generated, refined, and ready for the ad manager.",
      },
    ],
    idealClients: [
      {
        title: "DTC brands feeding the ad machine",
        description:
          "Your media buyer needs 20 new creatives a week and burnout is real. We feed the testing engine without burning out your team.",
      },
      {
        title: "Founders without a creative team",
        description:
          "You're winning on product but losing on creative. We're your fractional in-house studio without the in-house headcount.",
      },
      {
        title: "Agencies needing extra hands",
        description:
          "You sell strategy. We deliver the production work that scales it. White-label or co-branded.",
      },
    ],
    retainerIncludes: [
      "Brand kit setup (voice, visual language, asset library)",
      "Weekly creative drops across formats",
      "AI avatar build and ongoing variations",
      "Concepting, scripting, and direction",
      "Edit, finish, and platform-optimized exports",
      "Performance feedback loop (what to make more of)",
    ],
    processSteps: [
      {
        title: "Brand & format intake",
        description:
          "We capture your brand, audience, and the platforms you're shipping to. Output: a creative brief and asset starter pack.",
      },
      {
        title: "Concept the first wave",
        description:
          "Three to five creative concepts per format, with hooks, scripts, and visual references. You pick what moves forward.",
      },
      {
        title: "Produce & deliver",
        description:
          "Weekly drops of ready-to-ship creative, exported for every platform spec. Drop into your ad manager, post, or hand to your team.",
      },
      {
        title: "Iterate from performance",
        description:
          "We review what's getting attention, double down on what works, and kill what doesn't. Creative compounds when you let data steer it.",
      },
    ],
    pricingFrom: "From $4k/mo",
    pricingNote: "3-month minimum. Volume packages available for high-output brands.",
    faqs: [
      {
        question: "Won't this just look like AI slop?",
        answer:
          "Only if the creative director is asleep at the wheel. AI-native doesn't mean AI-obvious. The tools generate the assets; taste decides which ones ship. You'll see the same quality bar as a traditional studio, just at 10x the speed.",
      },
      {
        question: "Do you handle the media buying too?",
        answer:
          "No. We make the creative. Your media buyer (in-house or agency) runs it. We work closely with whoever's on the ad account to feed them what they actually need, in the spec they need it.",
      },
      {
        question: "What does a typical month of output look like?",
        answer:
          "The Studio tier runs a steady pipeline of 15 to 25 creatives a month across video, static, and avatar formats. Scale takes that to 40+ for brands feeding an always-on ad account. This is an ongoing retainer, not a per-piece order: you get a creative partner and a predictable monthly output, with every piece routed through you for approval before delivery.",
      },
      {
        question: "Do I own the creative and the assets?",
        answer:
          "Yes. Full ownership, full usage rights, source files included. You can re-edit, re-cut, and reuse forever. We don't license anything back to you.",
      },
    ],
    whoItsFor:
      "DTC brands, founders, and agencies who need a constant stream of high-quality creative without building an in-house studio.",
    typicalEngagement:
      "Ongoing retainer. Initial 2-week brand intake, then weekly creative drops.",
    includes: [
      "Brand kit and visual language setup",
      "Weekly creative drops across formats",
      "AI avatar build and ongoing variations",
      "Concepting, scripting, and finish",
      "Performance feedback loop",
    ],
  },
  {
    slug: "ai-agent",
    disabled: true, // retired offer, preserved for reference / possible reuse
    title: "AI Agent",
    shortTitle: "AI Agent",
    tagline: "An AI agent embedded in your team",
    icon: Bot,
    summary:
      "A custom AI agent that lives in your tools, remembers everything, and works 24/7. Trained on your business, embedded in your team.",
    heroHeadline: "An AI agent that gets sharper every week.",
    sectionHeadings: {
      capabilities: { lead: "What it takes", em: "off your plate." },
      pricing: { lead: "One retainer,", em: "everything included." },
      faq: { lead: "What everyone", em: "asks first." },
      audience: { lead: "Built for whoever the company", em: "runs through." },
    },
    heroSubhead:
      "Embedded in Slack, Telegram, email, and the tools your team already uses. It remembers every conversation, learns from how you work, and handles the repetitive tasks no one wants to do.",
    description:
      "Most AI deployments stop at a chatbot. This doesn't. I design and deploy a custom AI agent specifically for your business. Trained on your processes, given access to your tools, and continuously improved as it works alongside your team.",
    capabilities: [
      {
        title: "Lives where your team works",
        description:
          "Slack, Telegram, Discord, WhatsApp, Signal, and email. One agent, every channel. Send it a voice memo from your phone, get a written response in Slack.",
      },
      {
        title: "A second brain for your business",
        description:
          "It keeps a structured, always-current picture of your people, projects, clients, and process. Not a chat history it forgets, a knowledge base it reasons from. The longer it runs, the more it knows.",
      },
      {
        title: "Self-improving skills",
        description:
          "Creates new skills from experience and refines them during use. The longer it works for you, the more capable it gets at the specific things you need.",
      },
      {
        title: "Scheduled automations",
        description:
          "Daily reports, weekly audits, nightly backups, lead follow-ups, all in natural language, running unattended on a schedule you define.",
      },
      {
        title: "Delegates and parallelizes",
        description:
          "Spawns isolated subagents for parallel workstreams. Can research five competitors at once or process a backlog of tickets in parallel.",
      },
      {
        title: "Monitored, and self-healing",
        description:
          "It runs 24/7 with safeguards that quietly restart a dropped connection on their own. Anything they cannot fix, it flags to me directly, so problems usually get solved before you ever notice them.",
      },
    ],
    idealClients: [
      {
        title: "Founders without an ops hire",
        description:
          "You need the coordination, follow-up, and admin work of a chief of staff but can't justify the hire yet.",
      },
      {
        title: "SMBs drowning in repetitive coordination",
        description:
          "Lead intake, scheduling, vendor follow-up, internal status reports. Work that's important but eats hours every week.",
      },
      {
        title: "Agencies wanting embedded research support",
        description:
          "An always-on researcher and project assistant that knows your clients, your past work, and your tone of voice.",
      },
    ],
    retainerIncludes: [
      "A fully deployed AI agent, with hosting and infrastructure handled",
      "One secure connection into the tools you already use, no passwords to share",
      "Custom skills built for your specific workflows and your industry",
      "Its own name and email address, so it works like a real teammate",
      "Around-the-clock monitoring that catches problems before you do",
      "Ongoing tuning, new skills, and a monthly review of what to teach it next",
      "A direct line to me whenever something needs adjusting",
    ],
    processSteps: [
      {
        title: "Role audit",
        description:
          "We map the actual tasks you want offloaded: the boring repetitive stuff that's still load-bearing. Output: a job description for your AI agent.",
      },
      {
        title: "Deploy & connect",
        description:
          "I stand up your AI agent, connect it securely to the tools you already use, and hand it over. The first working version is live within 48 hours, not weeks.",
      },
      {
        title: "Build custom skills",
        description:
          "I write the specific skills your business needs: your sales follow-up cadence, your client onboarding, your reporting format. The agent learns your way of working.",
      },
      {
        title: "Iterate weekly",
        description:
          "Every week we review what is working and what new tasks to teach it. It gets measurably better every week as it learns more of your business.",
      },
    ],
    pricingFrom: "From $5k/mo",
    pricingNote:
      "3-month minimum. Hosting, infrastructure, and usage all included, so there is never a token counter or a surprise bill.",
    faqs: [
      {
        question: "What can it actually do that ChatGPT can't?",
        answer:
          "ChatGPT forgets the conversation when you close the tab. This agent remembers every interaction, every preference, every project. It runs scheduled tasks unattended. It lives inside Slack and email so your team doesn't have to switch tools. And it has tools, meaning it can actually do things in your systems, not just answer questions.",
      },
      {
        question: "Where does it live and who owns the data?",
        answer:
          "You never have to manage infrastructure, that part is handled for you. Your AI agent runs in its own isolated environment, walled off from your other systems, so it can do its job without ever putting anything else at risk. You still own everything: it lives on a cloud account in your name, and all of its memory and conversations are stored in your database. Nothing is locked inside a third-party tool, and you can export it all or shut it down at any time.",
      },
      {
        question: "Do you need our passwords and logins?",
        answer:
          "No. It connects to the tools you use through one secure, managed connection that you authorize yourself, the same way you would sign into any new app. Nothing gets emailed around or saved in a spreadsheet. You can see exactly what it has access to, and revoke any of it at any time.",
      },
      {
        question: "What about hallucinations and bad outputs?",
        answer:
          "Custom skills are constrained to specific tasks with structured inputs and outputs, which dramatically reduces hallucination compared to open-ended chat. For anything client-facing or high-stakes, I recommend human-in-the-loop approval. The agent drafts, you approve.",
      },
      {
        question: "What happens when something breaks?",
        answer:
          "Honestly, things occasionally do. A tool changes how it works, or a connection drops. The difference is what happens next. Your AI agent runs with safeguards that restart most of those failures on their own, within seconds. Anything they cannot handle, it flags to me directly the moment it happens. In practice, that means I am usually fixing the problem before it ever interrupts your day.",
      },
      {
        question: "How does it fit alongside my team?",
        answer:
          "It takes tasks off plates, it does not take seats. The pattern that works: identify the 20% of someone's role that is repetitive coordination work, hand that to the agent, and let your team spend their time on judgment work instead. Most clients use this to avoid a hire they could not justify yet, not to cut one they already have.",
      },
      {
        question: "What if we want to take it in-house later?",
        answer:
          "You can. The code, infrastructure, and custom skills are yours from day one. I don't believe in vendor lock-in. The honest take: the agent self-improves at the work it already does, so the existing skills keep getting sharper on their own. What still needs a human is the direction: deciding which new skills to add when your business changes, fixing integrations when a tool's API breaks, making judgment calls when the agent's behavior needs tuning. That's where my retainer hours go. Take it in-house any time, but plan for someone (a full-time AI engineer or an outside partner) to own that strategic work as your needs evolve.",
      },
      {
        question: "How long until it's actually useful?",
        answer:
          "Live and connected within 48 hours. Handling its first real tasks inside the first week. Genuinely indispensable around week six, once it has accumulated enough memory and custom skills to know your business.",
      },
    ],
    whoItsFor:
      "Founders and SMB operators who need a second brain. Someone to handle the repetitive coordination work that's eating their week.",
    typicalEngagement:
      "Ongoing retainer. Initial 30-day deployment, then monthly tuning and skill expansion.",
    includes: [
      "Custom AI agent deployment & hosting setup",
      "Custom skill development for your workflows",
      "Tool integrations (Slack, email, CRM, calendar, docs)",
      "Ongoing monitoring and weekly tuning",
      "Monthly performance review and new use case planning",
    ],
  },
  {
    slug: "voice-ai",
    disabled: true,
    title: "Voice AI Agents",
    shortTitle: "Voice AI",
    tagline: "Phone agents that answer every call",
    icon: Phone,
    summary:
      "AI phone agents that answer calls, qualify leads, book appointments, and handle support. 24/7, in any language, at a fraction of a human's cost.",
    heroHeadline: "Never miss a call again.",
    sectionHeadings: {
      capabilities: { lead: "What it does on", em: "every call." },
      pricing: { lead: "One plan,", em: "every call answered." },
      faq: { lead: "Before you", em: "forward your line." },
      audience: { lead: "Built for businesses that", em: "run on the phone." },
    },
    heroSubhead:
      "Custom voice AI agents that handle inbound and outbound calls like a trained employee. Integrated with your CRM and calendar, indistinguishable from a human on the line.",
    description:
      "Voice AI has crossed the uncanny valley. The right agent, properly tuned for your business, can handle the first contact for every lead, qualify them, book appointments, and route the serious ones to a human. All without anyone realizing they weren't talking to a person.",
    capabilities: [
      {
        title: "Inbound call handling",
        description:
          "Answers every call instantly. Greets in your brand voice, asks the right qualifying questions, and routes hot leads to your team.",
      },
      {
        title: "Outbound calling at scale",
        description:
          "Lead follow-up, appointment reminders, reactivation campaigns, survey calls. Hundreds of conversations a day, all logged.",
      },
      {
        title: "Calendar booking in real time",
        description:
          "Checks availability and books on your calendar mid-call. No back-and-forth, no missed scheduling windows.",
      },
      {
        title: "CRM integration",
        description:
          "Every call logged with transcript, summary, and next actions. Pushes data into HubSpot, Salesforce, Close, or whatever you use.",
      },
    ],
    idealClients: [
      {
        title: "Service businesses with high call volume",
        description:
          "Home services, clinics, agencies, real estate. Anyone losing revenue to missed calls or slow callbacks.",
      },
      {
        title: "Sales teams doing lead qualification",
        description:
          "Stop burning AE time on tire-kickers. The agent qualifies, the human closes.",
      },
    ],
    retainerIncludes: [
      "Custom voice agent built and tuned for your business",
      "Phone number provisioning and routing setup",
      "CRM and calendar integration",
      "Call quality monitoring and weekly transcript review",
      "Ongoing prompt and script refinement",
      "Per-minute call costs passed through at cost",
    ],
    processSteps: [
      {
        title: "Call audit",
        description:
          "We listen to your existing calls (or define the ideal script) and identify what the agent needs to handle.",
      },
      {
        title: "Build & voice tune",
        description:
          "I build the agent, pick the right voice, and write the conversation flows. We iterate until it feels right.",
      },
      {
        title: "Integrate & test",
        description:
          "Hook it into your phone system, calendar, and CRM. Stress-test with edge cases before going live.",
      },
      {
        title: "Monitor & refine",
        description:
          "Weekly review of call transcripts to catch failure modes and improve the agent over time.",
      },
    ],
    pricingFrom: "From $3k/mo",
    pricingNote: "3-month minimum. Per-minute call costs (~$0.10–$0.20/min) passed through.",
    faqs: [
      {
        question: "Will callers know it's AI?",
        answer:
          "The voices are now indistinguishable from humans in most cases. We disclose AI when legally required (some states/use cases mandate it), but most customers don't notice or care as long as their problem gets solved quickly.",
      },
      {
        question: "What if the agent can't handle something?",
        answer:
          "We build in escalation paths. If the conversation hits something the agent isn't trained for, it transfers to a human, sends a Slack alert, or takes a detailed message. Whatever you prefer.",
      },
      {
        question: "How much does it actually cost per call?",
        answer:
          "Roughly $0.10–$0.20 per minute of conversation, depending on the voice model. A 3-minute lead qualification call costs about $0.50. Compare to $15–$30 for an SDR doing the same work.",
      },
      {
        question: "Can it handle multiple languages?",
        answer:
          "Yes. We can deploy multilingual agents that detect the caller's language and switch automatically, or build separate agents per language.",
      },
    ],
    whoItsFor:
      "Service businesses, sales teams, and clinics losing revenue to missed calls or slow lead response.",
    typicalEngagement:
      "Ongoing retainer. Initial 2–3 week build, then monthly monitoring and refinement.",
    includes: [
      "Custom voice agent design and deployment",
      "Phone number and call routing setup",
      "CRM and calendar integration",
      "Weekly call quality review",
      "Ongoing script and prompt refinement",
    ],
  },
  {
    slug: "ai-apps",
    disabled: true, // retired offer, preserved for reference / possible reuse
    title: "AI Apps & Internal Tools",
    shortTitle: "AI Apps",
    tagline: "Custom AI software, designed and shipped",
    icon: AppWindow,
    summary:
      "Custom web apps with AI built in from the start. MVPs, internal tools, and customer-facing products. designed and shipped end-to-end.",
    heroHeadline: "Custom AI apps, shipped end-to-end.",
    sectionHeadings: {
      capabilities: { lead: "What I", em: "build." },
      pricing: { lead: "What it", em: "costs to build." },
      faq: { lead: "Questions before", em: "we build." },
      audience: { lead: "Built for what you", em: "can't buy off the shelf." },
    },
    heroSubhead:
      "When you need a real product, not a wrapper around ChatGPT. I design and build full-stack web apps with AI integrated where it actually adds value.",
    description:
      "Most AI features get bolted on at the end and feel like it. I design the user experience around the AI from day one, so the result is a product people actually want to use. not a chatbot stuffed into a sidebar.",
    capabilities: [
      {
        title: "AI-native MVPs",
        description:
          "From idea to launched product in 6–10 weeks. Next.js, TypeScript, Postgres, your LLM provider of choice.",
      },
      {
        title: "Internal tools & dashboards",
        description:
          "Custom internal apps that turn your team's grunt work into a few clicks. document processing, lead scoring, content workflows.",
      },
      {
        title: "RAG and knowledge systems",
        description:
          "Search and Q&A over your company's documents, with proper retrieval, citations, and access control.",
      },
      {
        title: "Polished, production-ready UX",
        description:
          "Designed in Figma, built with shadcn/Tailwind, deployed on Vercel. Not a janky internal demo. a product you'd be proud to show.",
      },
    ],
    idealClients: [
      {
        title: "Founders with an AI product idea",
        description:
          "You need an MVP shipped fast, by someone who can do design and engineering and AI integration.",
      },
      {
        title: "Operators with a broken internal process",
        description:
          "You know exactly which workflow is killing your team. you just need someone to build the tool that fixes it.",
      },
    ],
    retainerIncludes: [
      "Full-stack design and development",
      "AI/LLM integration architecture",
      "Database design and infrastructure setup",
      "Deployment and hosting setup",
      "Ongoing iteration and feature development",
      "Bug fixes and maintenance",
    ],
    processSteps: [
      {
        title: "Scope & design",
        description:
          "We define the v1 ruthlessly. I design the core flows in Figma so you can see it before I build it.",
      },
      {
        title: "Build the spine",
        description:
          "Auth, database, core flows, AI integration. the load-bearing 60%. shipped in the first 3 weeks.",
      },
      {
        title: "Polish to ship",
        description:
          "UX details, edge cases, error states, mobile. The stuff that separates a demo from a product.",
      },
      {
        title: "Iterate post-launch",
        description:
          "Real users find real problems. Ongoing retainer covers fixes, refinements, and new features.",
      },
    ],
    pricingFrom: "From $5k/mo",
    pricingNote: "Project-based options from $10k. 3-month retainer minimum.",
    faqs: [
      {
        question: "What's your stack?",
        answer:
          "Next.js + TypeScript, Tailwind + shadcn/ui for the front end. Postgres (usually Supabase) for data. Vercel for hosting. For AI: OpenAI, Anthropic, or open-source models via OpenRouter depending on the use case. I optimize for your team's ability to maintain it after launch.",
      },
      {
        question: "How long to ship an MVP?",
        answer:
          "Typical range is 6–10 weeks for a focused MVP. Scope creep is the killer. I'll push back hard on features that should wait until v2.",
      },
      {
        question: "Do you handle design or do I need a designer?",
        answer:
          "I do both. Design and engineering in one person means no handoff friction and faster iteration. If you have a designer you love, I can work with them too.",
      },
    ],
    whoItsFor:
      "Founders shipping an AI product, or operators who need a custom internal tool built right the first time.",
    typicalEngagement:
      "Retainer or project-based. 6–10 weeks for an MVP, ongoing for evolving products.",
    includes: [
      "End-to-end design and engineering",
      "AI/LLM integration",
      "Database and infrastructure",
      "Deployment and ongoing maintenance",
      "Iteration based on real user feedback",
    ],
  },
  {
    slug: "ai-training",
    disabled: true, // retired offer, preserved for reference / possible reuse
    title: "AI Training",
    shortTitle: "AI Training",
    tagline: "Get your team fluent in AI",
    icon: GraduationCap,
    summary:
      "Custom workshops and ongoing training that get your team confident with AI. From executive overviews to hands-on sessions on Claude, ChatGPT, agents, and AI design tools.",
    heroHeadline: "Get your whole team fluent in AI.",
    sectionHeadings: {
      capabilities: { lead: "What your team", em: "walks away with." },
      pricing: { lead: "What training", em: "costs." },
      faq: { lead: "Questions from", em: "team leads." },
      audience: { lead: "Built for teams that", em: "can't fall behind." },
    },
    heroSubhead:
      "Custom workshops and ongoing training tailored to your team's role and skill level. Hands-on, practical, no hype.",
    description:
      "Most AI training is generic conference talks and Udemy courses. I design custom programs around your team's actual work. the tools they use, the decisions they make, the workflows they want to improve.",
    capabilities: [
      {
        title: "Executive AI literacy",
        description:
          "Half-day sessions for leadership: what's real, what's hype, where to invest, what questions to ask.",
      },
      {
        title: "Hands-on team workshops",
        description:
          "Practical sessions on Claude, ChatGPT, Cursor, and the AI tools your team would actually use day-to-day.",
      },
      {
        title: "Role-specific training",
        description:
          "Custom programs for designers, engineers, marketers, ops. built around the workflows each function wants to upgrade.",
      },
      {
        title: "Ongoing fractional CAIO",
        description:
          "Embedded ongoing advisory. monthly office hours, async questions, tool recommendations as your team scales its AI use.",
      },
    ],
    idealClients: [
      {
        title: "Companies with AI ambition but AI-shy teams",
        description:
          "Leadership wants to move on AI, but the team isn't sure where to start or feels threatened.",
      },
      {
        title: "Agencies and consultancies",
        description:
          "You sell knowledge work. The teams that learn to use AI well in the next year will eat the ones that don't.",
      },
    ],
    retainerIncludes: [
      "Custom curriculum designed around your team's roles",
      "Live workshop delivery (in-person or remote)",
      "Recorded sessions and follow-up materials",
      "Ongoing office hours and async support",
      "Tool stack recommendations",
      "Monthly review of team adoption and new training needs",
    ],
    processSteps: [
      {
        title: "Team audit",
        description:
          "Interviews with team leads to understand current AI fluency, blockers, and the workflows you most want to upgrade.",
      },
      {
        title: "Custom curriculum",
        description:
          "I design a program specific to your team's roles and tools. not a generic AI 101.",
      },
      {
        title: "Deliver workshops",
        description:
          "Live sessions, hands-on exercises, real workflows. Your team practices on actual work, not toy examples.",
      },
      {
        title: "Ongoing support",
        description:
          "Office hours, async questions, and quarterly updates as the AI landscape shifts (which it does every month).",
      },
    ],
    pricingFrom: "From $3k per workshop",
    pricingNote: "Ongoing fractional CAIO retainer from $4k/mo.",
    faqs: [
      {
        question: "What format does this take?",
        answer:
          "Depends on the engagement. Common shapes: a single half-day executive session, a two-day hands-on workshop for a team, or a multi-month ongoing program with weekly sessions and async support.",
      },
      {
        question: "What tools do you cover?",
        answer:
          "Whatever's right for your team. Most commonly: Claude, ChatGPT, Cursor, Claude Code, Perplexity, plus the agent and automation tools relevant to your work.",
      },
      {
        question: "Can you train non-technical teams?",
        answer:
          "Yes. most of my training work is with non-engineers. Marketers, ops people, founders, executives. The curriculum is built for the audience, not against it.",
      },
    ],
    whoItsFor:
      "Companies that want their teams to actually use AI well, not just talk about it.",
    typicalEngagement:
      "Single workshops to multi-month programs, plus optional ongoing fractional advisory.",
    includes: [
      "Custom curriculum design",
      "Live workshop delivery",
      "Recorded sessions and follow-up materials",
      "Ongoing office hours",
      "Tool stack recommendations",
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // CURRENT OFFERS (the three-offer suite)
  // ══════════════════════════════════════════════════════════════
  {
    slug: "ai-workflow",
    disabled: true, // engine-room capability, no longer a standalone offer (umbrella pivot 2026-06-24)
    title: "AI Workflow Audit + Implementation",
    shortTitle: "AI Workflow",
    tagline: "Find the workflow draining your team, and fix it",
    icon: Workflow,
    summary:
      "I find the single workflow costing your team the most time, then turn it into a reliable AI-supported system built into the tools you already use.",
    heroHeadline: "Get your team's hours back. End the manual busywork.",
    heroSubhead:
      "Losing capacity to reporting, follow-ups, onboarding, and handoffs? I find the single workflow costing your team the most time, then turn it into a reliable AI-supported system built inside the tools you already use.",
    description:
      "Audit-first AI implementation. Not another tool, not a strategy deck, not a demo that dies in production. One workflow, mapped, fixed, measured, and owned.",
    forWho: "Growing service businesses ($2–10M) & agencies",
    trustSignal: undefined,
    doorPain: "“Everyone’s using ChatGPT, but the workflow is still manual.”",
    doorOutcome:
      "Stop the leak, turn your costliest manual workflow into a reliable system.",
    sectionHeadings: {
      capabilities: { lead: "What you stop", em: "losing." },
      pricing: { lead: "Audit first,", em: "build second." },
      faq: { lead: "The questions", em: "that come up first." },
      audience: { lead: "Built for teams", em: "losing hours to manual ops." },
    },
    pains: [
      "“Everyone’s using ChatGPT, but the workflow is still manual.”",
      "“We tried an automation, but it broke or became more work to maintain.”",
      "“We built a demo, but it doesn’t survive real operations.”",
      "“We don’t know which workflows are worth automating first.”",
      "“We need AI connected to our actual tools, not another app.”",
      "“Leadership wants AI ROI this quarter, not more experiments.”",
    ],
    problemQuotes: [
      {
        quote: "Everyone’s using ChatGPT, but the workflow is still manual.",
        emphasis: "still manual",
        consequence: "Hours gone every week, and nothing actually changed.",
        attribution: "an ops lead, before the audit",
        lead: true,
      },
      {
        quote: "We tried an automation, but it broke or became more to maintain.",
        emphasis: "more to maintain",
      },
      {
        quote: "We built a demo, but it doesn’t survive real operations.",
        emphasis: "doesn’t survive",
      },
      {
        quote: "We don’t know which workflows are actually worth automating.",
        emphasis: "worth automating",
      },
      {
        quote: "Leadership wants AI ROI this quarter, not more experiments.",
        emphasis: "ROI this quarter",
        consequence: "The pressure lands on you, with nothing to show yet.",
      },
    ],
    whyItFails:
      "Throwing more tools or more people at it doesn't fix it. Without the process mapped, clean inputs, clear ownership, and guardrails, AI just stacks demos and broken handoffs on top of the same leak. The work keeps eating capacity, the AI spend shows little return, and the team quietly stops trusting it.",
    problemBridge:
      "What you need first isn't another tool. It's to know exactly where the workflow leaks, what AI should handle, what your people keep, and a number that proves the cost actually dropped. If this sounds like your team, here's what happened when businesses in the same situation worked with me.",
    capabilities: [
      {
        title: "Workflow audit",
        description:
          "I interview your team, inspect your tools, and map the process to find and quantify the highest-value bottleneck. The paid entry point, and an honest read on what's worth automating.",
      },
      {
        title: "Opportunity prioritisation",
        description:
          "Workflows ranked by pain, ROI, feasibility, and data readiness. You get a clear picture of what to build first and what to leave human.",
      },
      {
        title: "System build, in your tools",
        description:
          "Prompts, automations, integrations, and a knowledge layer built into the tools your team already uses, with human-review points wherever a mistake would be expensive.",
      },
      {
        title: "Production hardening",
        description:
          "Edge cases, permissions, handoffs, monitoring, logging, and fallbacks. The part that makes it reliable in real operations, not just a demo.",
      },
      {
        title: "Adoption & measurement",
        description:
          "I train your team, document the workflow, and measure the result against the success metric we set up front, so the ROI is provable, not assumed.",
      },
      {
        title: "Expansion partnership",
        description:
          "Once one workflow is proven, we move to the next. The relationship becomes your ongoing implementation partner, not a one-off project.",
      },
    ],
    idealClients: [
      {
        title: "Agencies losing AM time to ops",
        description:
          "Reporting, client updates, onboarding, and handoffs are eating account-manager hours that should go to strategy and retention.",
      },
      {
        title: "Service firms with a visible leak",
        description:
          "A specific recurring workflow is bleeding 10+ hours a week or slowing revenue, and the AI tools you've tried haven't fixed it.",
      },
      {
        title: "Leaders mandated to show AI ROI",
        description:
          "You've been told to 'do AI this quarter' with a real return, not another pilot that stalls before it ships.",
      },
    ],
    retainerIncludes: [
      "Fixed-fee workflow audit with a ranked, ROI-prioritised plan",
      "The first workflow built into your existing tools",
      "Human-review and approval points where mistakes are costly",
      "Production hardening: monitoring, logging, fallbacks",
      "Team training and workflow documentation",
      "Success metric defined up front and measured after",
      "Ongoing expansion to the next workflows (retainer)",
    ],
    processSteps: [
      {
        title: "Audit: find the costliest leak",
        description:
          "I map the workflow, inspect your tools, and quantify what the bottleneck is costing you. You get a ranked, honest plan, including what's not worth automating.",
      },
      {
        title: "Build: into the tools you already use",
        description:
          "I build the fix where your team already works, with humans kept in the loop wherever a mistake would be expensive. No isolated app, no black box.",
      },
      {
        title: "Prove & expand: measure the hours back",
        description:
          "We measure the result against the metric we set up front. Once one workflow is proven, we move to the next, and I stay on as your implementation partner.",
      },
    ],
    pricingFrom: "Starts with an audit",
    pricingNote:
      "Fixed-fee audit first. The build is scoped and quoted from it, so there are no blind quotes.",
    proofHeadline: "Production AI, taught to the people who run it",
    proofIntro:
      "My background is making AI actually work in real organisations, not slide decks about it. I've shipped production AI for brands like Goodyear and Peppermill Resort Spa, and delivered AI training to teams at NVIDIA, PwC, and Kraft Heinz.",
    proofPoints: [
      { metric: "100/100", label: "Course rating from professionals learning to use AI" },
      { metric: "89 NPS", label: "On AI training delivered to enterprise teams" },
      { metric: "Days", label: "Typical audit-to-first-working-system timeline, not months" },
    ],
    caseStudySlugs: ["ai-image-creation-course", "roomlab-ai-interior-design"],
    faqs: [
      {
        question: "Why can't I just use ChatGPT or a tool like Zapier myself?",
        answer:
          "You can, for individual tasks. The gap shows up when a workflow has to run reliably across messy data, real handoffs, and unclear ownership. That's where DIY tools and brittle automations break. I'm not selling you AI; I'm selling a workflow that survives real operations. The tools are infrastructure underneath it.",
      },
      {
        question: "How much does this cost?",
        answer:
          "It starts with a fixed-fee workflow audit, a low-risk first step that surfaces the real ROI and produces a scoped plan. The build is quoted from the audit, so the price reflects the actual work and the value of the hours you'll get back. No blind quotes, no open-ended retainers to start.",
      },
      {
        question: "What if the audit says I shouldn't automate something?",
        answer:
          "Then I'll tell you, and you'll have paid for honest prioritisation rather than a pre-sold build. Knowing what to leave human is part of the value, automating the wrong thing is how teams end up with more complexity, not less.",
      },
      {
        question: "How long does it take?",
        answer:
          "The audit is quick, usually days, not weeks. The first workflow build is scoped deliberately narrow so you see a working, measurable result fast, rather than a six-month project that never quite ships.",
      },
      {
        question: "What if the AI gets something wrong?",
        answer:
          "Anywhere a mistake is expensive, a human stays in the loop by design, review and approval points are built into the workflow. You decide how much runs unattended; I never promise hands-off automation where errors are costly.",
      },
      {
        question: "Do you work with the tools we already have?",
        answer:
          "Yes, that's the point. The system is built into your existing stack so the work happens where your team already is, not in yet another subscription they have to remember to open.",
      },
    ],
    ctaKind: "audit",
    ctaHeadline: "Find out what your costliest workflow is actually costing you.",
    ctaSubhead:
      "Start with a workflow audit. You'll get a ranked, ROI-prioritised plan, and the honest version of what's worth building.",
    ctaButton: "Book a workflow audit",
    ctaProof: "100/100 course rating from enterprise teams · NVIDIA, PwC & Kraft Heinz · ROI-first, no build sold before the audit",
    whoItsFor:
      "Growing service businesses and agencies losing capacity to manual reporting, follow-ups, onboarding, and handoffs.",
    typicalEngagement:
      "Fixed-fee audit, then a scoped first-workflow build, then ongoing expansion as an implementation partner.",
    transformation:
      "I help service businesses drowning in repeatable admin, reporting, follow-up, or handoffs find the single workflow costing them the most, and turn it into a reliable AI-supported system, so the leak stops instead of getting more people or tools thrown at it.",
    includes: [
      "Fixed-fee workflow audit and ROI-ranked plan",
      "First workflow built into your existing tools",
      "Production hardening and monitoring",
      "Team training and measurement against a success metric",
      "Ongoing expansion to the next workflows",
    ],
  },
  {
    slug: "website-design",
    title: "Website Design for Premium Brands",
    shortTitle: "Website Design",
    tagline: "A site that wins premium clients before the first call",
    icon: LayoutTemplate,
    summary:
      "Design-led, custom-built websites for premium service brands, engineered to signal trust, justify your fees, and stop you discounting to win work you should have closed at full price.",
    heroHeadline: "Look as premium as you are, before the first call.",
    heroSubhead:
      "Designed and built end-to-end by one person, so the premium positioning survives all the way from first concept to live site. No templates, no outsourced handoffs, no gap between what it looks like and what it earns.",
    description:
      "Trust is engineered, not decorated. I design and build the whole thing myself, so the premium positioning survives from first concept to live site.",
    forWho: "Premium service brands, studios, agencies & firms",
    trustSignal:
      "Designed & built Synthminds (clients incl. NVIDIA, PwC, Kraft Heinz) · Shiki Studios: 100/100 PageSpeed, 6× faster",
    doorPain: "“My website makes us look cheaper than we are.”",
    doorOutcome:
      "Win high-value clients and justify your fees, before a prospect makes contact.",
    sectionHeadings: {
      capabilities: { lead: "What the rebuild", em: "earns you." },
      pricing: { lead: "What it", em: "takes to work together." },
      faq: { lead: "The questions", em: "premium firms ask." },
      audience: { lead: "Built for firms judged on", em: "trust before contact." },
    },
    pains: [
      "“My website makes us look cheaper than we are.”",
      "“High-value clients judge our credibility before they ever contact us.”",
      "“We’re forced to discount because the site can’t justify our fees.”",
      "“A prettier redesign didn’t actually move the business.”",
      "“My designer and developer were two people, and it was a mess.”",
      "“Our credibility isn’t showing up, even in search.”",
    ],
    problemQuotes: [
      {
        quote: "My website makes us look cheaper than we are.",
        emphasis: "cheaper than we are",
        consequence: "Premium clients gone before they ever say hello.",
        attribution: "a firm owner, before we worked together",
        lead: true,
      },
      {
        quote: "High-value clients judge our credibility before they ever contact us.",
        emphasis: "before they ever contact us",
      },
      {
        quote: "We’re forced to discount because the site can’t justify our fees.",
        emphasis: "forced to discount",
        consequence: "Premium work, sold at a commodity price.",
      },
      {
        quote: "A prettier redesign didn’t actually move the business.",
        emphasis: "didn’t actually move",
      },
      {
        quote: "My designer and developer were two people, and it was a mess.",
        emphasis: "two people",
      },
    ],
    whyItFails:
      "You can't fix this by being better at your craft or adding more case studies to a dated site. High-value clients decide whether they trust you in the first seconds, and most of that happens before they ever contact you. If the site says “cheaper than we are,” your expertise never gets a hearing. A one-off prettier redesign changes the look, not the trust signal, so nothing moves.",
    problemBridge:
      "What you need isn't a prettier site. It's one engineered to make you look as established and premium as you actually are, so the right clients take you seriously and your fees feel justified before you're even in the room. If this sounds like your firm, here's what happened when premium service brands in the same position worked with me.",
    capabilities: [
      {
        title: "Design-led prestige rebuild",
        description:
          "A site engineered to make a premium firm look as established as it is. Senior, custom design, no template that looks like everyone else's.",
      },
      {
        title: "Trust & credibility layer",
        description:
          "Press, proof, case studies, results, the signals that decide trust in seconds, placed exactly where they convert.",
      },
      {
        title: "Fee-justifying positioning",
        description:
          "Messaging and structure that let you hold your price and stop discounting to win work you should close at full rate.",
      },
      {
        title: "In-house design + engineering",
        description:
          "I design it and build it. No designer-to-developer handoff where the vision gets lost, no finger-pointing when something breaks.",
      },
      {
        title: "Performance & mobile build",
        description:
          "Fast, secure, mobile-first. Speed is a trust signal, a slow, broken site quietly undersells you.",
      },
      {
        title: "Care plan (ongoing)",
        description:
          "Hosting, monitoring, performance, and small changes on a monthly retainer, so someone owns the site after launch instead of it going stale.",
      },
    ],
    idealClients: [
      {
        title: "Premium firms judged on prestige",
        description:
          "Studios, agencies, design/architecture firms, consultancies, premium clinics, sold on trust, and judged on it before a prospect makes contact.",
      },
      {
        title: "Firms losing work to worse-but-prettier rivals",
        description:
          "You're excellent at what you do, but a more polished competitor keeps winning the pitch before you're even in the room.",
      },
      {
        title: "Firms forced to discount",
        description:
          "The site can't justify your fees, so you drop price to close, turning premium work into a commodity sale.",
      },
    ],
    retainerIncludes: [
      "Senior, custom design, no templates",
      "Design and engineering by one person, no handoff",
      "Trust and credibility layer placed to convert",
      "Fee-justifying messaging and positioning",
      "Fast, secure, mobile-first build",
      "On-page credibility / SEO foundation",
      "Optional care plan: hosting, monitoring, changes",
    ],
    processSteps: [
      {
        title: "Position, find the trust gap",
        description:
          "I learn your firm, your premium buyer, and exactly where the current site is costing you credibility. We decide what has to be true in the first five seconds.",
      },
      {
        title: "Design & build, no handoff",
        description:
          "I design and engineer it, senior, custom, fast, mobile-first, with your proof and positioning placed where they convert. One person owns the whole thing.",
      },
      {
        title: "Launch & own, it stays sharp",
        description:
          "Fast, secure, and looked after. An optional care plan covers hosting, monitoring, performance, and changes so the site doesn't go stale.",
      },
    ],
    pricingFrom: "By consultation",
    pricingNote:
      "Premium, custom rebuilds are typically a five-figure investment, scoped to the firm on a call.",
    proofHeadline: "Sites that move the business, not just the brand",
    proofIntro:
      "I design and build it myself, no template that looks like everyone else's, no designer-to-developer handoff where the vision gets lost. One person owning the whole thing is how a site carries premium positioning all the way to launch.",
    proofPoints: [
      { metric: "100/100", label: "Desktop PageSpeed for Shiki Studios, up from 44" },
      { metric: "6×", label: "Faster load time for Shiki Studios" },
      { metric: "+41%", label: "More actors enrolled after Shiki Studios' launch" },
    ],
    caseStudySlugs: ["shiki-studios-acting-school", "synthminds-brand-platform"],
    faqs: [
      {
        question: "How is this different from hiring an agency?",
        answer:
          "An agency hands you a beautiful site through a chain of people, then leaves. I design and build it myself, so the premium positioning survives from first concept to live site, and I'm still here to own it afterwards. You're buying trust engineering, not a decoration project.",
      },
      {
        question: "How much does a project cost?",
        answer:
          "Premium, custom rebuilds are a serious investment, typically five figures, scoped to the firm. When a single high-value client is worth tens of thousands to you, a site that wins more of them and lets you stop discounting pays for itself quickly. We scope it together on a call.",
      },
      {
        question: "I just had a redesign, why didn't it work?",
        answer:
          "Most redesigns change how the site looks without changing what it signals. Prettier isn't the same as more trusted. The work here is engineering the credibility signals, proof, positioning, structure, speed, that actually decide whether a premium buyer takes you seriously.",
      },
      {
        question: "How long does it take?",
        answer:
          "A focused premium rebuild typically runs a few weeks, depending on scope and how much content and positioning work is needed. You'll have a clear timeline before we start.",
      },
      {
        question: "Do you handle copy and SEO too?",
        answer:
          "The site is built with structured content and authority signals from the ground up, and I'll guide the messaging that holds your price. Deep SEO and PR campaigns are partnered or referred out as a phase two, I'd rather do that part properly than half it.",
      },
    ],
    ctaKind: "consultation",
    ctaHeadline: "Stop entering premium conversations at a trust disadvantage.",
    ctaSubhead:
      "Book a consultation and we'll look at where your current site is costing you high-value clients, and what it would take to fix it.",
    ctaButton: "Book a consultation",
    ctaProof: "Designed and built end-to-end · 100 PageSpeed, 6× faster for Shiki Studios · +41% more enrollments after launch",
    whoItsFor:
      "Premium service brands, studios, agencies, and firms whose website makes them look cheaper than they are.",
    typicalEngagement:
      "A focused custom rebuild over a few weeks, with an optional ongoing care plan after launch.",
    transformation:
      "I help premium service brands whose website makes them look cheaper than they are win high-value clients and justify their fees, through a design-led site built to signal trust before a prospect ever makes contact.",
    includes: [
      "Senior, custom design and engineering",
      "Trust and credibility layer that converts",
      "Fee-justifying positioning",
      "Fast, secure, mobile-first build",
      "Optional ongoing care plan",
    ],
  },
  {
    slug: "development",
    disabled: true, // folded into the umbrella as "one owner: design + build" / the deep end (umbrella pivot 2026-06-24)
    title: "Development, Get Your Stuck Product Launched",
    shortTitle: "Development",
    tagline: "Get a stuck product launched and working",
    icon: Wrench,
    summary:
      "Audit-first development for founders with a product they've invested in that's stuck. I assess what you've got, keep what works, finish and harden it, and stay on as the developer you wanted from the start.",
    heroHeadline: "Get your stuck product launched and working, owned by someone who stays.",
    heroSubhead:
      "It starts with an honest audit: what's salvageable, what needs replacing, and what the real cost is. Then I finish it, harden it, and stay on the hook for it working. No blank-slate rewrites, no blind quotes, no contractor who disappears after launch.",
    description:
      "However it got stuck, DIY stall, vibe-coded, a contractor who bounced, an outgrown v1, a broken outsourced build, the job is the same: get an invested product launched and working, owned by someone you trust.",
    forWho: "Founders & businesses with an invested-but-stuck product",
    trustSignal:
      "Rescued a broken, never-launched outsourced build (CueActor) · shipped RoomLab end-to-end, solo",
    doorPain: "“I’ve sunk months and money into this and it still isn’t live.”",
    doorOutcome:
      "Get it launched and working, owned by someone you can actually trust.",
    sectionHeadings: {
      capabilities: { lead: "How I get it", em: "unstuck." },
      pricing: { lead: "Audit first,", em: "no blind quotes." },
      faq: { lead: "What founders", em: "ask first." },
      audience: { lead: "Built for an invested product", em: "that's stuck." },
    },
    pains: [
      "“I’ve sunk months and money into this and it still isn’t live.”",
      "“I built it / vibe-coded it and now I can’t safely take it to production.”",
      "“The person building it stalled, bounced, or ghosted.”",
      "“It works in a demo but breaks in the real world.”",
      "“I can’t tell if the existing code is any good.”",
      "“I just want it launched and working, by someone I trust.”",
    ],
    problemQuotes: [
      {
        quote: "I’ve sunk months and money into this and it still isn’t live.",
        emphasis: "still isn’t live",
        consequence: "Every week it’s stuck is money you can’t get back.",
        attribution: "a founder, mid-rescue",
        lead: true,
      },
      {
        quote: "The person building it stalled, bounced, or ghosted.",
        emphasis: "ghosted",
      },
      {
        quote: "It works in a demo but falls apart in the real world.",
        emphasis: "falls apart in the real world",
      },
      {
        quote: "I built it myself and now I can’t safely take it to production.",
        emphasis: "can’t safely",
      },
      {
        quote: "I just want it launched and working, by someone I trust.",
        emphasis: "someone I trust",
        consequence: "Trust, not price, is what’s actually blocking you.",
      },
    ],
    whyItFails:
      "You can't fix this by repeating whatever got you here, another cheap contractor, another DIY push, another team like the last one. Stuck products stay stuck for the same reasons: no clear technical owner, work that won't scale past the demo, and nobody accountable for actually getting it launched. More of the same just burns more time and money.",
    problemBridge:
      "What you need isn't another developer. It's one accountable owner who assesses what you've already got, keeps what's salvageable, finishes and hardens it properly, and stays on the hook for it working. If this sounds like where your build is stuck, here's what happened when founders in the same position worked with me.",
    capabilities: [
      {
        title: "Build audit & code review",
        description:
          "A paid first step. I assess the existing build, tell you straight what's salvageable, and scope the work, so the quote is accurate and you know whether it's worth finishing before you commit.",
      },
      {
        title: "Take it over & get it unstuck",
        description:
          "I take ownership of the codebase, keep what works, and re-architect only what genuinely won't scale. No starting from zero, no throwing away your investment.",
      },
      {
        title: "Finish & harden to launch",
        description:
          "I complete the unfinished work and make it real: stable, secure, deployed. The part that turns a demo into a product that survives the real world.",
      },
      {
        title: "One accountable owner",
        description:
          "A direct line and straight answers in plain language. No jargon, no ghosting, no junior hidden behind a salesperson.",
      },
      {
        title: "Ongoing ownership",
        description:
          "I stay on after launch for maintenance, new features, and the next phase, the developer you can keep, not the one you replace.",
      },
    ],
    idealClients: [
      {
        title: "Founders with a stalled build",
        description:
          "You've invested months and money, the person on it stalled or ghosted, and if it doesn't get unstuck it just dies.",
      },
      {
        title: "Vibe-coded or DIY products",
        description:
          "You got it most of the way yourself, but you can't safely take it to production and need someone to finish it properly.",
      },
      {
        title: "Broken outsourced or outgrown v1s",
        description:
          "A team handed you a broken build, or your v1 has outgrown itself and you can't move it forward without a real owner.",
      },
    ],
    retainerIncludes: [
      "Paid build audit: what's salvageable, scoped and quoted",
      "Codebase takeover, keep what works, replace what won't scale",
      "Finish and harden the unfinished work to launch",
      "Stable, secure deployment",
      "One accountable owner with a direct line",
      "Ongoing maintenance, features, and the next phase",
    ],
    processSteps: [
      {
        title: "Build audit: what's salvageable?",
        description:
          "A paid first step. I assess the existing build, tell you what's worth keeping, and scope the work, so the quote is accurate and you know whether it's even worth finishing before you commit.",
      },
      {
        title: "Take it over & finish",
        description:
          "I take ownership of the codebase, keep what works, re-architect what won't scale, and complete the unfinished work, stable, secure, deployed.",
      },
      {
        title: "Launch & stay",
        description:
          "It goes live and works. Then I stay on for maintenance, new features, and the next phase, the accountable owner you wanted from the start.",
      },
    ],
    pricingFrom: "Starts with a build audit",
    pricingNote:
      "Fixed-fee audit first. The build is quoted from what we find, not guessed blind.",
    proofHeadline: "I take over messes and ship them",
    proofIntro:
      "However it got stuck, the job is the same: get an invested product launched and working. I've done it on a broken build someone else abandoned, and I've shipped a full product end-to-end on my own.",
    proofPoints: [
      { metric: "End-to-end", label: "AI, app, payments & marketing shipped solo (RoomLab)" },
      { metric: "Live", label: "Rescued a buggy, never-launched outsourced app (CueActor)" },
      { metric: "1 owner", label: "Audit → finish → launch → stay, no handoffs" },
    ],
    caseStudySlugs: ["roomlab-ai-interior-design"],
    faqs: [
      {
        question: "Can my existing code be saved, or do I have to start over?",
        answer:
          "That's exactly what the audit answers. Usually a lot is salvageable, the point is to keep what works and only replace what genuinely won't scale, so you're not throwing away the investment you've already made. If starting over really is cheaper, I'll tell you that too.",
      },
      {
        question: "How much will it cost to finish?",
        answer:
          "I quote the build from the audit, not blind. The audit assesses the difficulty and real scope first, so the price reflects the actual state of the code, not a guess that balloons later. The audit itself is a fixed, low-commitment fee.",
      },
      {
        question: "How do I know you won't stall or ghost like the last person?",
        answer:
          "One accountable owner, a direct line, and straight answers in plain language, no junior hidden behind a salesperson. The audit is also where I prove competence before you commit to the build, so you're not betting big on faith.",
      },
      {
        question: "What if you look at it and it's a bigger mess than expected?",
        answer:
          "Then the audit will say so, with an honest scope and price, or an honest “this isn't worth saving.” You make the call with real information instead of finding out three months and another invoice in.",
      },
      {
        question: "Will you stay on after launch?",
        answer:
          "Yes. Most of this work becomes an ongoing relationship, maintenance, new features, the next build. Getting it launched is the start; being the developer you can keep is the point.",
      },
    ],
    ctaKind: "audit",
    ctaHeadline: "Stop pouring money into a build that won't ship.",
    ctaSubhead:
      "Start with a build audit. I'll tell you what's salvageable, what it'll take to launch, and whether it's worth it, straight, before you spend another dollar.",
    ctaButton: "Book a build audit",
    ctaProof: "Rescued a never-launched outsourced build · shipped RoomLab solo end-to-end · audit-first, no blind quotes",
    whoItsFor:
      "Founders and businesses with a product they're invested in that's stuck and will fail if it doesn't get unstuck.",
    typicalEngagement:
      "Fixed-fee build audit, then a scoped takeover-to-launch, then ongoing ownership.",
    transformation:
      "I help founders with a product they're invested in that's stuck and won't launch get it working and owned by someone they trust, by auditing what they've got, finishing it properly, and becoming the developer they wanted from the start.",
    includes: [
      "Paid build audit and honest scope",
      "Codebase takeover and re-architecture where needed",
      "Finish and harden to a stable, secure launch",
      "One accountable owner, plain language",
      "Ongoing maintenance and feature work",
    ],
  },
];

// Active services, shown across nav, the services index, sitemap, and routes.
// Disabled entries stay in serviceList so they can be re-enabled later.
export const services: Service[] = serviceList.filter((s) => !s.disabled);
