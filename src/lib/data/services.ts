import {
  Bot,
  Phone,
  AppWindow,
  Sparkles,
  GraduationCap,
} from "lucide-react";

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceProcessStep {
  title: string;
  description: string;
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
}

const serviceList: Service[] = [
  {
    slug: "creative-studio",
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
];

// Active services, shown across nav, the services index, sitemap, and routes.
// Disabled entries stay in serviceList so they can be re-enabled later.
export const services: Service[] = serviceList.filter((s) => !s.disabled);
