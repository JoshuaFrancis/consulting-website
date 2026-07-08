export interface CaseReport {
  /** Lighthouse-style 0-100 score dials that animate before → after. */
  gauges: { label: string; before: number; after: number }[];
  /** Before/after metrics shown as shrinking bars (lower is better). */
  bars: { label: string; before: number; after: number; unit: string }[];
}

/**
 * The approach narrative is an ordered list of blocks so visuals can sit inline,
 * exactly where the text discusses them. Image paths point to /public; an empty
 * or missing path renders a labelled placeholder so it still looks intentional.
 */
export type ApproachBlock =
  | { kind: "heading"; label: string }
  | { kind: "text"; text: string }
  | { kind: "list"; ordered?: boolean; label?: string; items: string[] }
  | { kind: "image"; src?: string; caption?: string; wide?: boolean }
  | { kind: "beforeAfter"; title?: string; before?: string; after?: string };

export interface CaseStudy {
  slug: string;
  title: string;
  /** Shorter title for the collage/grid card, where a long title clips. Falls back to `title`. */
  cardTitle?: string;
  summary: string;
  categories: string[];
  client: string;
  timeline: string;
  /** ISO date (e.g. "2026-06-01") the project launched. Feeds Article datePublished when set. */
  datePublished?: string;
  challenge: string | string[];
  /** Skimmable challenge narrative (headings, text, lists). Falls back to `challenge`. */
  challengeBlocks?: ApproachBlock[];
  approach: string | string[];
  results: { metric: string; description: string }[];
  /** Terse, dot-separated results shown as chips under the headline. */
  resultsLine?: string;
  /** "The result" narrative: summary lead + skimmable breakdown lists. */
  resultBlocks?: ApproachBlock[];
  /** A pull-quote lifted from the narrative, shown as an editorial breaker. */
  pullQuote?: string;
  /** Optional animated performance report (the dramatic results chapter). */
  report?: CaseReport;
  /** Ordered approach narrative with visuals interleaved inline. Falls back to `approach`. */
  approachBlocks?: ApproachBlock[];
  testimonial?: { quote: string; author: string; role: string; image?: string; href?: string };
  /** The offer this case study is proof for — drives the closing push. */
  relatedOffer?: { slug: string; label: string };
  url?: string;
  image?: string;
  /** Editorial cover image for the case-studies collage (falls back to `image`). */
  cover?: string;
  /** One-line "about the client" for the hero meta band. Falls back to `client`. */
  clientBlurb?: string;
  /** One-line challenge summary for the hero meta band. Falls back to `challenge`. */
  challengeSummary?: string;
  /** One-line fix summary for the hero meta band. Falls back to `summary`. */
  solution?: string;
  /** The client contact I worked with, shown as a credibility byline in the hero. */
  contact?: { name: string; role: string; image?: string };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "shiki-studios-acting-school",
    title:
      "How I Rebuilt the Website for a Toronto Acting School Whose Alumni Appear on Netflix, Prime Video, and Paramount+",
    cardTitle: "How I Rebuilt the Website for a Toronto Acting School",
    image: "/shiki-studios.jpg",
    cover: "/case-shiki-stage.png",
    url: "https://shikistudios.com",
    summary:
      "A premium rebuild for a Toronto on-camera acting school whose alumni appear on Netflix, Prime Video, and Paramount+. A demo-reel-led hero, instant Cal.com and Stripe booking on every service, and a build that scored a perfect 100 on desktop PageSpeed, up from 44.",
    categories: ["Website Design", "Web Development", "Conversion"],
    client: "Shiki Studios",
    timeline: "2026",
    relatedOffer: { slug: "website-design", label: "Website Design" },
    clientBlurb:
      "A premium on-camera acting school in Toronto, founded by working actor Kayleigh Shikanai. Alumni have gone on to appear on Netflix, Prime Video, and Paramount+.",
    challengeSummary:
      "The website didn't match the calibre of the school. It undersold Shiki's track record, created friction between interest and booking, and gave Kayleigh no visibility into what her ad spend was doing.",
    solution:
      "A demo-reel-led rebuild with social proof up front, Cal.com and Stripe booking on every service, and full analytics, engineered for a perfect 100 PageSpeed score.",
    contact: {
      name: "Kayleigh Shikanai",
      role: "Founder, Shiki Studios",
      image: "/founder-kayleigh.webp",
    },
    challenge: [
      "Kayleigh Shikanai is a working actor and the founder of Shiki Studios, a premium on-camera acting school in Toronto whose alumni have gone on to appear on Netflix, Prime Video, and Paramount+. She had already built something special. My job was to give it a digital home that matched.",
      "Shiki Studios had a thriving school, a loyal community, and a genuinely impressive track record. The opportunity was to bring the website up to the same level as the work, to create an online presence that reflected the calibre of the school, communicated its results immediately, and made it effortless for an interested actor to take the next step.",
      "There were a few specific things I wanted the new site to do well. I wanted it to feel premium from the first second, the way the school itself does. I wanted to remove any friction between someone being interested and someone booking, so a prospective student could move forward the moment they were ready rather than waiting on a back-and-forth. And I wanted to give Kayleigh real visibility into her own marketing, a way to actually see what was working so that the money she puts into advertising could be spent with confidence rather than guesswork.",
      "That last point mattered more than it might sound. Like a lot of business owners, Kayleigh was investing in paid advertising without analytics in place to tell her where her traffic was coming from or what was converting. Giving her that clarity was one of the most valuable things I could do.",
    ],
    resultsLine:
      "100/100 desktop PageSpeed (up from 44) · 6× faster load · 97% less Total Blocking Time · mobile 43 → 83",
    challengeBlocks: [
      {
        kind: "text",
        text: "Kayleigh Shikanai is a working actor and the founder of Shiki Studios, a premium on-camera acting school in Toronto whose alumni have gone on to appear on Netflix, Prime Video, and Paramount+. She had already built something special. My job was to give it a digital home that matched.",
      },
      {
        kind: "text",
        text: "The school was thriving, with a loyal community and a genuinely impressive track record. The opportunity was to bring the website up to the same level as the work, so it reflected the calibre of the school, communicated its results immediately, and made it effortless for an interested actor to take the next step.",
      },
      { kind: "heading", label: "Website Goals" },
      {
        kind: "text",
        text: "I wanted the new site to do three things well:",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "Feel premium from the first second, the way the school itself does.",
          "Remove the friction between interest and booking, so a prospective student could move forward the moment they were ready instead of waiting on back-and-forth.",
          "Give Kayleigh real visibility into her marketing, so the money she spends on advertising could be spent with confidence rather than guesswork.",
        ],
      },
      {
        kind: "text",
        text: "That last point mattered more than it sounds. Like a lot of business owners, Kayleigh was paying for ads without analytics to tell her where her traffic came from or what was converting. Giving her that clarity was one of the most valuable things I could do.",
      },
    ],
    approach: [
      "If there is one part of a website worth obsessing over, it is the hero, the first screen someone sees before they scroll. Research consistently shows that visitors form an impression of a site within the first few seconds, and a large share decide in that window whether they are going to keep exploring. You do not get a second chance at it. Whatever the hero communicates is, for most visitors, the entire first impression of the business. So the central question I asked was simple: in those first few seconds, what is the single most powerful thing I can show someone?",
      "For Shiki Studios, the answer was clear. The most persuasive thing about the school is the work it produces and the track record behind it, so I built the hero around exactly that. The new hero leads with a demo reel, the exact thing a student walks away with after taking the class. Rather than telling a visitor what they would get, I show them. Within the first second of landing on the site, a prospective actor is watching the precise outcome they are there for. That is far more convincing than any headline could be, because it is proof of the deliverable rather than a claim about it.",
      "Alongside that, I placed strong social proof directly in the hero, a deliberate strategic choice that came out of researching how other acting studios present themselves. A consistent pattern stood out. Many studios have genuinely impressive social proof, well-known actors who trained with them and major credits among their alumni, but it tends to live deep inside the site, several scrolls down or on a separate page. It is great material, but most visitors never get far enough to see it.",
      "I saw that as an opportunity. Shiki Studios has a real, recognizable track record, so I made sure that track record is one of the first things a visitor sees rather than something they have to go looking for. If the strongest thing about the school is its results, those results should be working on the visitor from the very first second. I then reinforced and expanded on the social proof further down the page, so the credibility the hero introduces gets backed up and deepened as someone keeps reading.",
      "The next focus was making it as easy as possible for someone to actually book once they were interested. For a service business, the window between someone deciding they want something and actually committing can be narrow, and every extra step in that window costs you people. I integrated Cal.com across every bookable service on the site: coaching sessions, self-tape bookings, demo reel shoots, career consultations, and studio rentals. Every service now has live calendar availability built right into the page. An interested actor can see real openings, pick their time, and confirm their booking in under a minute, without sending a single email.",
      "For the flagship five-week acting class, I integrated Stripe directly into the site with two clear payment paths: a $100 deposit to hold a seat, or full payment upfront for those who prefer. Payment now happens on the spot, at the point of decision, instead of becoming another thing to coordinate over email. The through line across all of it was the same: when someone decides they want to work with Shiki Studios, nothing should stand between that decision and the booking.",
      "I set up full analytics tracking through Google Analytics so that, for the first time, Kayleigh has complete visibility into her own site. Where her traffic is coming from, which services are getting the most attention, how visitors move through the pages, and where they convert. Every future marketing decision can now be made based on real data rather than guesswork, which means her advertising spend can be directed with far more confidence.",
      "Performance was treated as seriously as design. The site is built on Next.js with a server-side architecture engineered for speed. Assets are optimised, the hero video is compressed and served at the right resolution for each device, and the build is tuned specifically for fast loading on mobile, where most of the school's traffic lands.",
      "The improvement is dramatic and measurable. On desktop, the site now scores a perfect 100 on Google's PageSpeed performance benchmark, up from 44. The largest piece of content on the page loads in 0.6 seconds rather than 3.8, making it more than 6 times faster, an 84% reduction in load time. The overall Speed Index improved by 71%, and Total Blocking Time, the amount of time the page is frozen and unresponsive while it loads, dropped from 720 milliseconds to just 20, a 97% reduction. Best Practices and SEO both score 100 as well.",
      "The mobile gains were even larger, which matters because most visitors arrive on a phone and phones are where people abandon a slow page fastest. The mobile performance score nearly doubled, from 43 to 83. The main content now loads in 4.4 seconds instead of 15.4, roughly 3.5 times faster. And the Speed Index, which measures how quickly the page visibly fills in, went from 23.7 seconds to 2.2, making the new site close to 11 times faster to load on mobile, a reduction of more than 90%.",
      "Kayleigh now has a website that works as hard as she does. It reflects the premium school she has built, it shows prospective students the calibre of work they can expect within seconds of arriving, and it lets them book any service the moment they are ready. Behind the scenes, she finally has the data to understand what is working and to spend her marketing budget with real confidence. A school with alumni on Netflix and Paramount+ deserves a website that shows it. Now it has one.",
    ],
    results: [
      { metric: "+24%", description: "More actors enrolled after launch, on almost no marketing" },
      { metric: "100/100", description: "Desktop PageSpeed performance, up from 44" },
      { metric: "6× faster", description: "Largest content loads in 0.6s, down from 3.8s" },
      { metric: "43 → 83", description: "Mobile performance score, nearly doubled" },
    ],
    resultBlocks: [
      {
        kind: "text",
        text: "The improvement was dramatic and measurable, on both desktop and mobile. Faster load times, stronger SEO, and a site that finally showcases the calibre of Kayleigh's work while making it effortless to take the next step.",
      },
      {
        kind: "list",
        label: "Desktop",
        items: [
          "A perfect 100 on Google's PageSpeed performance benchmark, up from 44.",
          "84% faster load time, the largest content now appears in 0.6s instead of 3.8s.",
          "71% improvement in overall Speed Index.",
          "Total Blocking Time cut 97%, from 720ms to just 20ms.",
          "A perfect 100 on both Best Practices and SEO.",
        ],
      },
      {
        kind: "list",
        label: "Mobile",
        items: [
          "Performance score nearly doubled, from 43 to 83.",
          "Main content now loads in 4.4s instead of 15.4s, about 3.5× faster.",
          "Speed Index dropped from 23.7s to 2.2s, roughly 11× faster to visibly load.",
        ],
      },
    ],
    pullQuote:
      "If the strongest thing about the school is its results, those results should be working on the visitor from the very first second.",
    // Approach narrative with visuals inline. Drop screenshots into /public and
    // fill the empty `src` / `before` paths; until then they show clean placeholders.
    approachBlocks: [
      { kind: "heading", label: "Hero Section" },
      {
        kind: "text",
        text: "If one part of a website is worth obsessing over, it's the hero, the first screen before anyone scrolls. Visitors form an impression within seconds and decide in that window whether to keep exploring.",
      },
      {
        kind: "text",
        text: "So the question was simple: in those first few seconds, what's the single most powerful thing I could show someone on Shiki Studios' site?",
      },
      {
        kind: "text",
        text: "The answer was the work itself. The new hero leads with a demo reel, the exact thing a student walks away with after the class. Rather than telling a visitor what they'd get, I show them, the precise outcome they're there for, within the first second.",
      },
      {
        kind: "beforeAfter",
        title: "The hero, before and after",
        before: "/case-shiki-before.png",
        after: "/case-shiki-after.png",
      },
      {
        kind: "text",
        text: "I paired that with social proof placed directly in the hero, a choice that came out of studying how other acting studios present themselves. Many have impressive credentials, well-known actors and major credits, but bury them several scrolls down or on a separate page, where most visitors never see them.",
      },
      {
        kind: "text",
        text: "Shiki has a real, recognizable track record, so I led with it, then reinforced and expanded it further down the page.",
      },
      { kind: "heading", label: "Booking Page" },
      {
        kind: "text",
        text: "The next focus was making it as easy as possible to book once someone was interested. For a service business, the window between deciding and committing is narrow, and every extra step costs you people. I integrated Cal.com across every bookable service: coaching, self-tape sessions, demo reel shoots, career consultations, and studio rentals. An interested actor can see live availability, pick a time, and confirm in under a minute, without sending a single email.",
      },
      {
        kind: "text",
        text: "For the flagship five-week class, I integrated Stripe directly into the site with two clear paths: a $100 deposit to hold a seat, or full payment upfront. Payment now happens at the point of decision instead of becoming another thing to coordinate over email. The through line was the same throughout: when someone decides they want to work with Shiki Studios, nothing should stand between that decision and the booking.",
      },
      { kind: "heading", label: "Analytics" },
      {
        kind: "text",
        text: "I set up full Google Analytics tracking so that, for the first time, Kayleigh can see where her traffic comes from, which services get the most attention, how visitors move through the site, and where they convert. Every marketing decision can now be made on real data, which means her ad spend can be directed with far more confidence.",
      },
      { kind: "heading", label: "Performance" },
      {
        kind: "text",
        text: "Performance was treated as seriously as design. The site is built on Next.js with a server-side architecture engineered for speed: optimised assets, a compressed hero video served at the right resolution per device, and a build tuned for fast loading on mobile, where most of the school's traffic lands.",
      },
    ],
    report: {
      gauges: [
        { label: "Desktop PageSpeed", before: 44, after: 100 },
        { label: "Mobile PageSpeed", before: 43, after: 83 },
      ],
      bars: [
        { label: "Largest Contentful Paint", before: 3.8, after: 0.6, unit: "s" },
        { label: "Total Blocking Time", before: 720, after: 20, unit: "ms" },
        { label: "Mobile Speed Index", before: 23.7, after: 2.2, unit: "s" },
      ],
    },
  },
  {
    slug: "ai-image-creation-course",
    title:
      "From Manual Grind to a Repeatable AI Visual Workflow, in Three Weeks",
    image: "/Ai-Image-Course.jpg",
    summary:
      "Marketers, designers, and founders were losing hours to manual visual work, outsourcing it, waiting on designers, or fighting AI tools that gave them unusable results. I built a three-week workflow that took them from overwhelmed to producing production-quality visuals themselves, fast. It earned a perfect 100/100 rating, an 89 NPS, and a 74.5% completion rate.",
    categories: ["UX Design", "AI", "Course Design"],
    client: "Synthminds · on Uplimit",
    timeline: "May 2023",
    relatedOffer: { slug: "ai-workflow", label: "AI Workflow" },
    clientBlurb:
      "A three-week AI image-creation course built for Synthminds and delivered on Uplimit, aimed at marketers, designers, and founders who needed strong visuals fast.",
    challengeSummary:
      "Non-technical professionals were losing hours to manual visual work or fighting generative AI tools that gave them unusable results, with no repeatable process to follow.",
    solution:
      "A focused three-week workflow, refined cohort over cohort, taking participants from zero experience to producing production-quality visuals themselves.",
    challenge: [
      "Everyone I built this for had the same problem. Marketers, designers, and founders needed strong visuals, and creating them was slow, manual, and expensive. They were hiring it out, waiting on designers, or trying to do it themselves and losing hours they didn't have.",
      "Generative AI looked like the way out, but in 2023 it mostly wasn't delivering. Without a process, people got mangled hands, garbled text, and mediocre results, then gave up. The tools were never the problem. They had no repeatable way to use them with intention.",
      "So the gap wasn't a tool. It was a workflow: a structured path from \"I've never used this\" to \"I can produce the visuals my work needs, myself.\"",
    ],
    approach: [
      "I built that workflow as a focused three-week course, designed for the non-technical professional rather than the AI enthusiast. Every lesson had to earn its place by moving someone closer to producing usable visuals on their own.",
      "It built week over week: fundamentals and prompt engineering, then photorealism and design technique, then real professional output, decks, marketing assets, and visual narratives they could use immediately. To serve beginners and power users at once, I ran a dual track: DALL-E as the forgiving core, with optional Midjourney and Leonardo sessions for anyone ready to go further.",
      "And I treated it like a product, not a one-off. After each week I collected feedback and, between cohorts, rewrote what was unclear and added tutorials wherever people got stuck, so the workflow kept getting sharper at the exact points that slowed people down.",
      "The outcome was the relief they came for. Instead of outsourcing visuals or fighting the tools, participants left with a process they could run themselves, fast. It rated a perfect 100/100, earned an 89 NPS, and 74.5% of them finished, the number most online courses never hit.",
    ],
    results: [
      {
        metric: "100/100",
        description: "Perfect feedback score from course participants",
      },
      {
        metric: "89 NPS",
        description: "Net promoter score, a sign of strong advocacy",
      },
      {
        metric: "74.5%",
        description: "Completion rate, far above the online-course norm",
      },
    ],
    pullQuote:
      "They didn't need to become AI experts. They needed a repeatable process, and that's what I built.",
    testimonial: {
      quote:
        "Synthminds' expert instruction, guidance, and support were pivotal to me learning a vast world of AI-powered image generation techniques. I learned about color theory, camera lens effects, artistic styles, and so much more that absolutely blew me away. I feel like I truly haven't been leveraging these AI tools nearly enough, so I am incredibly thankful I took this course and got to learn from the industry's best on GenAI.",
      author: "Brian H. Hough",
      role: "Founder & Software Engineer",
    },
  },
  {
    slug: "roomlab-ai-interior-design",
    title: "RoomLab: AI-Powered Interior Design Platform",
    image: "/Roomlab.png",
    summary:
      "Took an idea from concept to live SaaS product. Built the AI pipeline, web app, payment system, and marketing site, then shipped it.",
    categories: ["AI Product Development", "UX/UI Design"],
    client: "Self-Initiated Product",
    timeline: "Ongoing",
    relatedOffer: { slug: "development", label: "Development" },
    clientBlurb:
      "A self-initiated AI interior-design SaaS product, taken from idea to a fully launched, paying product, solo.",
    challengeSummary:
      "Homeowners, designers, and real estate agents all needed fast, affordable room visualization, but existing tools were too expensive, too slow, or produced unrealistic results.",
    solution:
      "An end-to-end AI pipeline, web app, credit-based Stripe subscription, and marketing site, built and shipped solo, redesigning a room in under 30 seconds.",
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
    title: "Synthminds: AI Consulting Brand & Web Platform",
    image: "/synthminds-site.png",
    cover: "/case-synthminds-cover.jpg",
    summary:
      "Designed and built the complete brand identity and web platform for Synthminds, an AI consulting and education firm working with enterprise clients including NVIDIA, PwC, and Kraft Heinz.",
    categories: ["UX/UI Design", "AI Strategy"],
    client: "Synthminds AI",
    timeline: "6 weeks",
    relatedOffer: { slug: "website-design", label: "Website Design" },
    url: "https://synthminds.ai",
    clientBlurb:
      "An AI consulting and education firm working with enterprise clients including NVIDIA, PwC, and Kraft Heinz, across consulting, education, design, and integration.",
    challengeSummary:
      "Synthminds' digital presence didn't match the calibre of its enterprise roster, and it failed to communicate the breadth of its four service pillars clearly enough to convert enterprise leads.",
    solution:
      "A premium dark-themed brand system and web platform: an immersive hero, a distinctive service-pillar card system, and a fully responsive, performance-tuned build.",
    contact: {
      name: "William Shields",
      role: "Founder & Principal, Synthminds",
      image: "/william-shields.png",
    },
    challenge:
      "Synthminds needed a digital presence that matched the caliber of their enterprise client roster (NVIDIA, PwC, HP, Kraft Heinz) while making complex AI consulting and education services feel approachable. Their existing presence lacked the visual authority to convert enterprise leads and failed to communicate the breadth of their four service pillars: consulting, education, design, and integration.",
    challengeBlocks: [
      {
        kind: "text",
        text: "William Shields is the founder and principal of Synthminds, an AI consulting and education firm whose client roster reads like a enterprise shortlist: NVIDIA, PwC, HP, Kraft Heinz. The work was already enterprise-grade. The website wasn't telling that story.",
      },
      {
        kind: "text",
        text: "The gap was specific. Synthminds runs four distinct service pillars, consulting, education, design, and integration, and the existing site treated them as an afterthought, a list buried below the fold rather than the actual breadth of the offer. On top of that, the subject matter itself works against you: AI consulting can read as either intimidatingly technical or vague marketing fluff, and the site had to avoid both.",
      },
      { kind: "heading", label: "What The Site Needed To Do" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Read as enterprise-grade on arrival, so a prospect who already works with NVIDIA or PwC doesn't have to take a leap of faith.",
          "Make the four service pillars, not just one AI buzzword, immediately clear and easy to tell apart.",
          "Feel approachable despite the technical subject matter, so the site persuades rather than intimidates.",
        ],
      },
    ],
    approach:
      "Designed a premium dark-themed brand system pairing Playfair Display serif headings with clean sans-serif body text to balance authority with approachability. Built an immersive hero experience with video backgrounds and atmospheric gradient overlays. Created a distinctive gradient card system for the four service pillars with interactive glow effects. Implemented asymmetric grid layouts for blog content, a client logo showcase, and testimonial sections with frosted-glass treatments. Delivered a fully responsive Next.js build optimized for performance and SEO.",
    approachBlocks: [
      { kind: "heading", label: "Brand System" },
      {
        kind: "text",
        text: "The tension to resolve was authority versus approachability. Too corporate and the AI feels cold and inaccessible; too casual and an enterprise buyer stops taking it seriously. I designed a premium dark-themed system and paired a serif, Playfair Display, for headings against a clean sans-serif body. The serif carries the authority, the sans-serif body keeps every page easy to actually read.",
      },
      { kind: "heading", label: "Hero Experience" },
      {
        kind: "text",
        text: "The homepage hero leads with video backgrounds and atmospheric gradient overlays rather than a static image, so the first few seconds feel like a considered, premium product rather than a template. For a firm whose own pitch is sophistication in AI, the site's first impression had to demonstrate that same sophistication before a single word is read.",
      },
      { kind: "heading", label: "The Four Pillars" },
      {
        kind: "text",
        text: "Consulting, education, design, and integration needed to stop reading as a buried list and start reading as four clear, equally weighted offers. I built a distinctive gradient card system with interactive glow effects for each pillar, so a visitor can tell at a glance that Synthminds is four real capabilities, not one narrow service with extra words attached.",
      },
      { kind: "heading", label: "Proof & Content" },
      {
        kind: "text",
        text: "Trust for an enterprise buyer is won with proof, not adjectives. I built a client logo showcase to put the NVIDIA, PwC, HP, and Kraft Heinz roster where it belongs, front and center, along with testimonial sections in a frosted-glass treatment and asymmetric grid layouts for blog content, so the site reads as a substantial, ongoing publication rather than a one-time brochure.",
      },
      { kind: "heading", label: "Performance & Build" },
      {
        kind: "text",
        text: "None of the visual ambition matters if the site is slow or ranks poorly. I delivered a fully responsive Next.js build, tuned for performance and SEO from the start, so the premium feel holds up on every device and the site is actually findable, not just good-looking once someone arrives.",
      },
    ],
    pullQuote:
      "Trust for an enterprise buyer is won with proof, not adjectives.",
    testimonial: {
      quote:
        "For a long time, our website was the weakest part of how we showed up. It didn't represent the level we were at. Josh led the redesign, and the difference is night and day. Now prospects compliment the site before the first call. If you want someone who treats your site like it's their own, it's Josh.",
      author: "William Shields",
      role: "Founder and Principal of Synthminds, an AI consultancy and prompt engineering firm whose work has supported teams such as NVIDIA, HP, PwC, and Kraft Heinz",
      image: "/william-shields.png",
      href: "https://fa0ac5d6.click.kit-mail3.com/v8u4gm5v3gimuxk2g03ughvkooonpf9hd0n8m/qvh8h7hd5x7456ilhk/aHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL3NoaWVsZHMtd2Vz",
    },
    results: [],
  },
];
