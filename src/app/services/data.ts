export interface ServicePage {
  slug: string;
  num: string;
  title: string;
  tagline: string;
  description: string; // meta description
  intro: string;
  what: string;
  deliverables: string[];
  whoFor: string[];
  engagement: string;
  tags: string[];
  relatedSlugs: string[];
}

export const SERVICES: ServicePage[] = [
  {
    slug: "fractional-cto",
    num: "01",
    title: "Fractional CTO",
    tagline: "Senior technical leadership. Without the full-time cost.",
    description:
      "Fractional CTO services for small and mid-size businesses in St. Petersburg, FL and beyond. Tech stack decisions, developer vetting, and architectural direction on a 30–90 day engagement.",
    intro:
      "Most growing businesses don't need a $250K/year CTO — they need someone who's done it before, can be trusted to make the right technical decisions, and will be gone when the job is finished. That's what a fractional CTO engagement looks like.",
    what:
      "A fractional CTO is a senior technical leader who works with your business part-time or on a defined project basis. They own the technical direction — stack choices, architecture decisions, vendor selection, team structure — without sitting on your payroll full-time. The result is executive-level technical judgment at a fraction of the cost, with a defined scope and a clean exit.",
    deliverables: [
      "Tech stack evaluation and recommendation report",
      "Architecture blueprint for current and planned systems",
      "Developer and vendor vetting framework",
      "Technical roadmap aligned to business objectives",
      "Interview and onboarding process for engineering hires",
      "Incident response and escalation protocols",
      "Documentation of all decisions and rationale",
    ],
    whoFor: [
      "Startups and growth-stage companies that need technical direction but can't justify a full-time CTO",
      "Businesses replacing a departing CTO who need bridge leadership during the transition",
      "Non-technical founders who need a trusted technical partner to vet vendors and developers",
      "Companies building their first SaaS product or technical platform",
      "Businesses that have accumulated technical debt and need an honest assessment",
    ],
    engagement:
      "A fractional CTO engagement typically begins in Phase 01 (Assess & Architect) where we audit your existing stack and team. If the scope extends into Phase 02, we take ownership of delivery oversight and developer management. Every engagement ends with Phase 03 — full documentation and handoff so your team isn't dependent on us.",
    tags: ["Strategy", "Architecture", "Leadership"],
    relatedSlugs: ["technical-product-management", "qa-product-testing", "web-development"],
  },
  {
    slug: "technical-product-management",
    num: "02",
    title: "Technical Product Management",
    tagline: "Roadmaps that ship. Backlogs that mean something.",
    description:
      "Technical product management for growing businesses. Roadmaps, user stories, sprint oversight, and backlog prioritization that translates business goals into execution plans.",
    intro:
      "The gap between what a business wants and what a development team builds is almost always a product management problem. Vague requirements, shifting priorities, and undocumented decisions kill timelines. We close that gap.",
    what:
      "Technical product management means owning the bridge between business goals and engineering execution. We write the user stories, build and prioritize the backlog, run sprint ceremonies, track velocity, and make sure every developer on the team knows exactly what to build and why. We speak both languages — business and engineering — and we don't let things fall through the cracks.",
    deliverables: [
      "Product roadmap with phased milestones and success metrics",
      "Full backlog of user stories with acceptance criteria",
      "Sprint planning, retrospectives, and velocity tracking",
      "Requirements documentation for each feature",
      "Stakeholder communication updates (weekly or bi-weekly)",
      "Change request process and scope management",
      "Handoff documentation and backlog grooming guide for your team",
    ],
    whoFor: [
      "Companies building a new product who don't have an in-house product manager",
      "Businesses that have hired developers but don't know how to direct them effectively",
      "Founders who are managing the backlog themselves and are becoming a bottleneck",
      "Teams where requirements are constantly changing and nothing ships on time",
      "Organizations preparing for a funding round who need clean technical documentation",
    ],
    engagement:
      "Technical product management is the core of Phase 02 (Build & Oversee). We take ownership of the backlog from day one, run the sprint structure, and track delivery against the roadmap established in Phase 01. At exit, you receive a complete product documentation package so any future PM can pick up where we left off.",
    tags: ["Roadmap", "Backlog", "Specs"],
    relatedSlugs: ["fractional-cto", "qa-product-testing", "web-development"],
  },
  {
    slug: "ai-automation",
    num: "03",
    title: "AI Automation",
    tagline: "Eliminate manual work. Connect your tools. Stop doing it by hand.",
    description:
      "Custom AI automation and n8n workflows for businesses in St. Petersburg, FL and across Florida. AI agents, automated pipelines, and tool integrations that eliminate manual processes.",
    intro:
      "If your team is copying data between tools, manually triggering follow-ups, or doing anything on a schedule that could run itself, you're burning time that compounds. AI automation solves that — without rebuilding your entire tech stack.",
    what:
      "We build custom automation workflows using n8n and AI agents that connect your existing tools and eliminate repetitive manual processes. n8n is an open-source workflow automation platform that lets us chain together APIs, triggers, and AI models into reliable pipelines. An AI agent goes further — it can interpret instructions, make decisions, and take actions autonomously within defined parameters. The result: your tools talk to each other, your processes run themselves, and your team focuses on work that actually requires a human.",
    deliverables: [
      "Workflow audit — map of current manual processes and automation candidates",
      "Custom n8n workflow builds for your highest-value use cases",
      "AI agent configuration for decision-making and autonomous tasks",
      "API integrations between your existing tools (CRM, email, Slack, spreadsheets, etc.)",
      "Testing, error handling, and fallback logic for every workflow",
      "Documentation and training so your team can maintain and extend the workflows",
      "Monitoring setup so you know when automations succeed or fail",
    ],
    whoFor: [
      "Businesses where staff spend hours on repetitive data entry or copy-paste tasks",
      "Companies with multiple disconnected tools that don't talk to each other",
      "Sales and marketing teams spending time on manual lead follow-up",
      "Operations teams running the same report or update process every week",
      "Any business that wants to scale output without scaling headcount proportionally",
    ],
    engagement:
      "AI automation typically fits into Phase 01 (assessment of which processes are highest-value to automate) and Phase 02 (build and deploy). Because workflows are self-documenting in n8n, Phase 03 handoff includes full workflow exports, credentials documentation, and a maintenance guide so your team can own the automations going forward.",
    tags: ["n8n", "AI Agents", "Workflows"],
    relatedSlugs: ["technical-seo-schema", "technical-product-management", "marketing-outreach"],
  },
  {
    slug: "blockchain-integration",
    num: "04",
    title: "Blockchain Integration",
    tagline: "Blockchain made practical. For businesses that aren't crypto-native.",
    description:
      "Blockchain integration services for businesses in Florida. Loyalty programs, USDC payouts, NFT perks, tokenized records, and on-chain receipts on Polygon — no crypto background required.",
    intro:
      "Most businesses don't need to understand blockchain to benefit from it. They need loyalty programs that travel with customers, payments that don't require a bank middleman, and records that can be independently verified. That's the practical side of blockchain — and it's already being used by businesses that have never thought of themselves as \"crypto companies.\"",
    what:
      "We design and implement blockchain-based features on top of existing products and websites. Our primary stack is Polygon (a low-cost, fast Ethereum-compatible chain), USDC (a dollar-pegged stablecoin for payments), and standard NFT/token standards for loyalty and membership. We handle the technical complexity — wallet integrations, smart contract selection, transaction flows, and UX — so your customers experience the benefits without needing to understand the underlying technology.",
    deliverables: [
      "Blockchain feature scoping and architecture recommendation",
      "Smart contract selection or deployment (loyalty tokens, NFT perks, receipt records)",
      "USDC payment flow integration into your existing checkout",
      "QR code-based reward redemption systems",
      "Wallet connection UX that works for non-crypto users",
      "On-chain receipt generation and verification flow",
      "Documentation for compliance, customer support, and future development",
    ],
    whoFor: [
      "Local businesses that want loyalty programs that don't require an app download",
      "Businesses that want to offer crypto payment options alongside traditional checkout",
      "Companies that need tamper-proof records for permits, receipts, or certificates",
      "Businesses exploring NFT-gated membership or premium access tiers",
      "Founders building a product on top of blockchain infrastructure",
    ],
    engagement:
      "Blockchain integrations are scoped in Phase 01 — we assess your existing product and design a feature set that adds value without requiring a rebuild. Phase 02 covers development, testing, and deployment. Phase 03 includes full documentation of all contracts, wallets, and flows so your team can operate and extend the blockchain features without needing us as a dependency.",
    tags: ["Polygon", "USDC", "NFTs"],
    relatedSlugs: ["web-development", "fractional-cto", "qa-product-testing"],
  },
  {
    slug: "qa-product-testing",
    num: "05",
    title: "QA & Product Testing",
    tagline: "What ships should match what was scoped. We make sure it does.",
    description:
      "QA and product testing services for web and SaaS products. Acceptance criteria, test plans, release sign-off, and delivery oversight — so what ships matches what was built.",
    intro:
      "Bugs in production aren't just technical failures — they're trust failures. And the cost of finding a bug after release is 10x the cost of finding it before. QA isn't overhead; it's the difference between a product that works and a product that erodes customer confidence every time it doesn't.",
    what:
      "We own the QA function for your product — writing acceptance criteria for every feature, building test plans, executing test runs across devices and browsers, documenting bugs with reproduction steps, and signing off on releases before they go live. We're not a testing team that follows a script; we're a quality function that thinks about what could go wrong, proactively identifies edge cases, and ensures the product your customers receive matches the product you designed.",
    deliverables: [
      "Acceptance criteria written for every user story in the backlog",
      "Test plan covering functional, regression, cross-browser, and mobile testing",
      "Bug reports with reproduction steps, severity, and priority classification",
      "Release sign-off checklist and go/no-go criteria",
      "Cross-device and cross-browser compatibility verification",
      "Smoke test suite for core user flows",
      "QA documentation package for ongoing use by your team",
    ],
    whoFor: [
      "Companies shipping a product where quality directly impacts customer trust (healthcare, finance, legal, SaaS)",
      "Teams where bugs in production are a recurring problem",
      "Businesses that don't have a dedicated QA resource and rely on developers to test their own work",
      "Products preparing for a major release, rebrand, or platform migration",
      "Founders who are doing QA themselves and spending too much time on it",
    ],
    engagement:
      "QA is embedded into Phase 02 (Build & Oversee) — we're not a post-build add-on, we're in the sprint from the start. Every feature that goes into development has acceptance criteria before development begins, and nothing is marked complete until it passes QA. Phase 03 includes a full QA documentation package so your team can maintain quality standards after we exit.",
    tags: ["QA", "Testing", "Acceptance"],
    relatedSlugs: ["technical-product-management", "web-development", "fractional-cto"],
  },
  {
    slug: "technical-seo-schema",
    num: "06",
    title: "Technical SEO & Schema",
    tagline: "Rank in search. Get cited by AI. Be the answer, not just a result.",
    description:
      "Technical SEO, structured data schema markup, and AEO services for businesses in St. Petersburg, Tampa Bay, and Florida. Hands-on execution across 800+ assets for live clients.",
    intro:
      "Most SEO agencies give you a report. We give you execution. We've implemented technical SEO and structured schema across 800+ assets for live Florida clients — and we understand the difference between ranking in traditional search results and being cited by AI tools like Google's AI Overviews and ChatGPT. That difference is what we call AEO: Answer Engine Optimization.",
    what:
      "Technical SEO is the foundation that makes everything else work. It covers site architecture, page speed, structured data, canonical tags, crawlability, and the signals Google uses to understand what your site is about. Schema markup is structured data added to your pages that explicitly tells search engines — and AI tools — what type of content you have, who you are, what you offer, and where you're located. AEO (Answer Engine Optimization) takes this further: structuring your content so AI-powered search tools choose you as the authoritative answer to relevant questions. We've also optimized hundreds of image assets with keyword-rich alt text, file names, and surrounding context — a frequently overlooked signal in local search.",
    deliverables: [
      "Full technical SEO audit: crawlability, indexability, speed, Core Web Vitals",
      "Schema markup implementation: LocalBusiness, Service, FAQPage, BreadcrumbList, BlogPosting, Organization",
      "Google Analytics 4 setup and event tracking configuration",
      "Google Search Console setup and sitemap submission",
      "On-page SEO: title tags, meta descriptions, heading structure, internal linking",
      "Image SEO: alt text audit and optimization across all assets",
      "AEO content structure: FAQ sections, definition content, question-and-answer format",
      "Local SEO: Google Business Profile optimization and citation consistency",
    ],
    whoFor: [
      "Businesses that want to rank in local search in Tampa Bay, St. Petersburg, or Hernando/Pasco County",
      "Companies building content that needs to appear in Google AI Overviews and AI-generated answers",
      "Websites that have never had a technical SEO audit and may have structural issues holding them back",
      "Businesses investing in paid traffic who want to improve organic conversion alongside it",
      "Any organization that wants their content to be the source AI tools cite, not just a ranked link",
    ],
    engagement:
      "Technical SEO and schema work fits into Phase 01 (audit and planning) and Phase 02 (implementation). It's also a common standalone engagement for businesses that have a functioning website but need the technical foundation fixed. All implementations are documented — every schema type used, every tag added — so nothing is a black box after we exit.",
    tags: ["Schema", "SEO", "GA4"],
    relatedSlugs: ["web-development", "marketing-outreach", "ai-automation"],
  },
  {
    slug: "web-development",
    num: "07",
    title: "Web Development",
    tagline: "Fast. Clean. Yours. Built to last past the engagement.",
    description:
      "Web development services in St. Petersburg, FL. Full website builds, landing pages, and SaaS platforms using Next.js, React, TypeScript, and Supabase. Mobile-first, SEO-ready.",
    intro:
      "We build websites and platforms that perform — not templates you'll outgrow in a year. Our stack is Next.js, React, TypeScript, and Supabase, which means fast load times, built-in SEO capability, and a codebase your future developers can actually work in. We've built local business sites, SaaS platforms, and everything in between.",
    what:
      "Web development covers the full build: design to deployment. We work mobile-first, meaning the experience on a phone is the primary design target — not an afterthought. We build with performance and SEO built in from the start: optimized images, proper heading structure, schema markup, Core Web Vitals compliance, and a sitemap connected to Google Search Console. Every build includes the features your business actually needs — contact forms wired to your email, blog infrastructure, service pages, local SEO for your Florida market — and is documented for handoff so you're not dependent on us to make updates.",
    deliverables: [
      "Full responsive website (mobile-first, all screen sizes)",
      "Performance-optimized build: Core Web Vitals targets, lazy loading, image optimization",
      "On-page SEO: structured metadata, canonical URLs, schema markup on every page",
      "Contact form or booking flow connected to your email",
      "Blog or content infrastructure with proper dynamic routing",
      "Google Analytics 4 and Search Console setup",
      "Vercel or similar deployment with CI/CD pipeline",
      "Full handoff documentation: component guide, update instructions, deployment process",
    ],
    whoFor: [
      "Businesses with an outdated website that's slow, mobile-unfriendly, or hard to update",
      "Founders launching a new business who need a professional web presence fast",
      "Companies building a SaaS product on top of a Next.js / Supabase stack",
      "Local businesses in Tampa Bay, St. Petersburg, and surrounding Florida markets",
      "Businesses that have been burned by slow page builders (Wix, Squarespace) and need actual performance",
    ],
    engagement:
      "Web development projects typically span Phase 01 (requirements, architecture, design direction) and Phase 02 (full build, QA, and deployment). A standard marketing site completes in 3–6 weeks. A SaaS platform or complex product may span the full 90-day engagement. Phase 03 always includes a complete component documentation and deployment guide.",
    tags: ["Next.js", "React", "TypeScript", "Supabase"],
    relatedSlugs: ["technical-seo-schema", "qa-product-testing", "fractional-cto"],
  },
  {
    slug: "marketing-outreach",
    num: "08",
    title: "Marketing & Outreach",
    tagline: "Campaigns that build authority. Outreach that actually converts.",
    description:
      "B2B marketing and outreach services for businesses in Florida. Outreach campaigns, segmented contact lists, backlink building, blogger outreach, and service page creation.",
    intro:
      "Most B2B outreach fails because it's untargeted, off-brand, or simply never gets sent. And most SEO link-building is either too generic to work or too aggressive to be sustainable. We've run campaigns that worked — for food businesses competing in Tampa's saturated local market, for service businesses trying to break into new Florida counties, and for B2B companies that needed relationships, not just rankings.",
    what:
      "Our marketing and outreach services combine digital PR, content distribution, and B2B prospecting into campaigns that build real authority over time. On the outreach side, we build segmented contact lists (by industry, geography, or buyer role), write personalized outreach sequences, and manage the cadence until we get responses. On the SEO side, we focus on backlink acquisition through legitimate tactics: editorial mentions, food and industry blogger outreach, local business directories, and content partnerships. We also create the service and location pages that give outreach campaigns somewhere to send people — pages optimized for both conversion and search.",
    deliverables: [
      "B2B prospect list: segmented by industry, company size, and geography",
      "Outreach email sequence (3–5 touches) with personalization",
      "Blogger and influencer outreach for food, local, and industry niches",
      "Backlink acquisition campaign with target site list and tracking",
      "Service and location page creation optimized for local SEO",
      "Performance reporting: outreach response rates, backlinks acquired, page rankings",
      "Content brief templates for ongoing content production",
    ],
    whoFor: [
      "Local Florida businesses competing against national chains in search results",
      "B2B companies that need a structured outreach process and a clean contact list",
      "Food, hospitality, and consumer businesses that want editorial coverage and food blogger mentions",
      "Businesses launching into new service areas in Hernando, Pasco, Hillsborough, or Pinellas Counties",
      "Companies that have great content but no distribution strategy",
    ],
    engagement:
      "Marketing and outreach campaigns typically begin in Phase 01 with a market and competitor analysis, then move into Phase 02 for active campaign execution. Outreach campaigns need at least 60 days to produce meaningful results — this is not a sprint, it's a compounding system. Phase 03 includes full campaign documentation and a playbook your team can continue running after we exit.",
    tags: ["B2B", "Outreach", "Backlinks"],
    relatedSlugs: ["technical-seo-schema", "ai-automation", "web-development"],
  },
];

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return SERVICES.find(s => s.slug === slug);
}

export function getRelatedServices(slug: string): ServicePage[] {
  const svc = getServiceBySlug(slug);
  if (!svc) return [];
  return svc.relatedSlugs
    .map(s => getServiceBySlug(s))
    .filter((s): s is ServicePage => !!s);
}
