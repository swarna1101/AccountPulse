import type { Account, Intelligence } from "@/lib/types";

/**
 * Prepared sample briefs so the product is usable before live research is configured.
 * These are static illustrations, not live research.
 */

const canva: Intelligence = {
  company: {
    name: "Canva",
    description: "Visual communication and design platform",
    industry: "Software",
    location: "Sydney, Australia",
    website: "canva.com",
  },
  executiveSummary:
    "Canva appears to be accelerating its enterprise strategy through product expansion and organisational growth.",
  shareToday: {
    category: "Expansion",
    headline: "Enterprise expansion creates a timely conversation",
    insight:
      "Canva’s public story has been shifting toward larger teams: enterprise-shaped product work, hiring that supports bigger deployments, and a clearer emphasis on brand systems rather than one-off design. The centre of gravity looks less like a tool people love individually, and more like a platform organisations are expected to standardise on.",
    whyItMatters:
      "When a customer is scaling Canva past the design team, the relationship risk is rarely the product itself. It is onboarding, brand control, and whether new groups adopt it without inventing their own workarounds.",
    conversationStarter:
      "Saw that Canva has been expanding its enterprise footprint — including how teams are being set up to work in the product. Curious how you’re thinking about onboarding and operational consistency as those teams grow?",
  },
  signals: [
    {
      category: "Hiring",
      headline: "Enterprise hiring is part of the public story",
      summary:
        "Recent hiring signals lean toward enterprise sales, customer success, and solutions roles, not only consumer growth. The organisation is staffing for larger, more complex customers.",
      whyItMatters:
        "When a vendor adds enterprise coverage, champions are often asked to expand usage. Worth knowing before a renewal conversation turns into a rollout conversation.",
      date: "2026-09-18",
      importance: "high",
    },
    {
      category: "Product",
      headline: "AI is folding into everyday creation",
      summary:
        "Canva continues to place AI inside the core design workflow — generation, editing, and brand-aware creation — rather than treating it as a separate experiment.",
      whyItMatters:
        "Customers will need a point of view on what to standardise and what to leave optional. That is a useful check-in, not a feature tour.",
      date: "2026-09-04",
      importance: "high",
    },
    {
      category: "Expansion",
      headline: "The team footprint keeps widening",
      summary:
        "Public updates keep pointing at growth beyond the original creator base, including larger organisations and more international team use.",
      whyItMatters:
        "A wider footprint usually means more stakeholders, and a champion who used to own Canva alone may now be coordinating other functions.",
      date: "2026-08-21",
      importance: "medium",
    },
    {
      category: "Partnership",
      headline: "Workflow partnerships extend where Canva sits",
      summary:
        "Integrations and partner motions continue to place Canva next to the tools teams already use for content, storage, and collaboration.",
      whyItMatters:
        "A new integration can quietly change who owns the workflow. Better to ask about it than to discover it in a renewal.",
      date: "2026-08-07",
      importance: "medium",
    },
    {
      category: "Strategy",
      headline: "Brand systems are the wedge into bigger teams",
      summary:
        "Templates, brand kits, and admin controls remain the practical story for why a whole organisation would adopt Canva, not just a design pod.",
      whyItMatters:
        "This is where a CSM can be concrete: governance, ownership, and consistency — not a list of new features.",
      date: "2026-07-23",
      importance: "medium",
    },
  ],
  themes: ["Enterprise expansion", "AI in the workflow", "International growth"],
  themeSummary:
    "Recent signals suggest Canva is placing increased emphasis on enterprise adoption and international expansion.",
  sources: [
    { title: "Canva Newsroom", url: "https://www.canva.com/newsroom/" },
    { title: "About Canva", url: "https://www.canva.com/about/" },
    { title: "Canva", url: "https://www.canva.com/" },
  ],
  insufficientData: false,
};

const stripe: Intelligence = {
  company: {
    name: "Stripe",
    description: "Financial infrastructure for the internet",
    industry: "Financial software",
    location: "South San Francisco, California",
    website: "stripe.com",
  },
  executiveSummary:
    "Stripe is widening the surface of its platform — payments, billing, and adjacent money movement — with larger businesses as the reference customer.",
  shareToday: {
    category: "Product",
    headline: "Platform breadth is the useful thing to ask about",
    insight:
      "Stripe’s public product story is less about a single launch and more about companies running a wider part of the money stack in one place. Billing, payments, and nearby financial workflows are being talked about as one system. For a large customer, that usually shows up internally as a question of what consolidates, and who owns the decision.",
    whyItMatters:
      "Consolidation projects stall when finance, engineering, and the business owner want different things. Noticing the shift lets you ask about ownership before a renewal becomes a tooling debate.",
    conversationStarter:
      "Stripe has been talking more about companies running a wider part of their money movement on one platform. How is your team thinking about that — especially where billing, payments, and finance still sit with different owners?",
  },
  signals: [
    {
      category: "Product",
      headline: "Billing and payments are being framed as one system",
      summary:
        "Recent product narrative treats billing, invoicing, and payments as parts of a single platform rather than adjacent tools a company happens to buy together.",
      whyItMatters:
        "If your customer still runs those on separate owners, the gap is a conversation. If they have already consolidated, ask what broke along the way.",
      date: "2026-09-16",
      importance: "high",
    },
    {
      category: "Strategy",
      headline: "Larger merchants are the reference point",
      summary:
        "Public stories, customer examples, and product depth keep pointing at complex businesses rather than only startups taking their first payment.",
      whyItMatters:
        "Enterprise customers get pulled into roadmap conversations they didn’t ask for. A CSM who sees that coming can help the champion prepare internally.",
      date: "2026-09-02",
      importance: "high",
    },
    {
      category: "Financial",
      headline: "The business is being positioned for durability",
      summary:
        "Stripe’s public financial posture emphasises scale, reliability, and a long-term infrastructure role, not a single growth spike.",
      whyItMatters:
        "Customers reading that will ask about roadmap stability and support quality. Have a plain answer before they do.",
      date: "2026-08-19",
      importance: "medium",
    },
    {
      category: "Partnership",
      headline: "Distribution keeps running through platforms and partners",
      summary:
        "Partnerships remain a visible way Stripe shows up inside other products, marketplaces, and regional ecosystems.",
      whyItMatters:
        "A partner in the middle changes who your champion listens to. Worth knowing if a platform team is now in the room.",
      date: "2026-08-05",
      importance: "medium",
    },
    {
      category: "Expansion",
      headline: "Coverage continues to widen by product and geography",
      summary:
        "The public record keeps adding payment methods, financial workflows, and market coverage rather than narrowing the platform.",
      whyItMatters:
        "Expansion creates new internal stakeholders — treasury, tax, regional ops — who were never part of the original rollout.",
      date: "2026-07-21",
      importance: "medium",
    },
  ],
  themes: ["Platform consolidation", "Enterprise merchants", "Money movement"],
  themeSummary:
    "Recent signals suggest Stripe wants larger customers to run more of their financial workflow on the platform, not just card payments.",
  sources: [
    { title: "Stripe Newsroom", url: "https://stripe.com/newsroom" },
    { title: "About Stripe", url: "https://stripe.com/about" },
    { title: "Stripe", url: "https://stripe.com/" },
  ],
  insufficientData: false,
};

const hubspot: Intelligence = {
  company: {
    name: "HubSpot",
    description: "Customer platform for marketing, sales, and service",
    industry: "Software",
    location: "Cambridge, Massachusetts",
    website: "hubspot.com",
  },
  executiveSummary:
    "HubSpot is tying its growth story to the customer platform, and to AI that sits inside day-to-day marketing, sales, and service work.",
  shareToday: {
    category: "Product",
    headline: "AI inside the CRM is the conversation, not the announcement",
    insight:
      "HubSpot’s public narrative keeps returning to the same idea: AI should live where teams already work, across marketing, sales, and service, rather than as a separate product beside the CRM. For a customer, the practical question is whether any of that has changed the week, or whether it is sitting unused next to the old process.",
    whyItMatters:
      "Unused AI becomes a renewal risk and a credibility problem. The useful move is to ask what changed in the workflow, and where the team is still working around the platform.",
    conversationStarter:
      "HubSpot has been putting a lot of emphasis on AI inside the existing customer platform, not as a side tool. Curious which of that your team has actually folded into the week — and where it’s still easier to work around it?",
  },
  signals: [
    {
      category: "Product",
      headline: "AI is being embedded across the customer platform",
      summary:
        "Recent product emphasis puts AI inside marketing, sales, and service workflows rather than launching it as a detached assistant.",
      whyItMatters:
        "Your champion will be asked what they have turned on. A specific question about the weekly workflow beats a generic AI check-in.",
      date: "2026-09-15",
      importance: "high",
    },
    {
      category: "Strategy",
      headline: "The platform story is doing more of the selling",
      summary:
        "HubSpot continues to frame itself as one customer platform spanning the front office, with depth across hubs as the reason to stay and expand.",
      whyItMatters:
        "Multi-hub customers often have uneven adoption. The quiet risk is a renewal decided by the hub nobody really uses.",
      date: "2026-08-28",
      importance: "high",
    },
    {
      category: "Partnership",
      headline: "Partners remain central to how customers go live",
      summary:
        "The partner ecosystem is still a visible part of delivery, implementation, and the broader HubSpot economy.",
      whyItMatters:
        "If a partner owns the day-to-day, your champion may be one step removed from how the platform is actually used.",
      date: "2026-08-12",
      importance: "medium",
    },
    {
      category: "Hiring",
      headline: "Product and customer-facing teams still signal investment",
      summary:
        "Hiring and organisational signals continue to support the platform and the teams that land and expand it, rather than a pullback.",
      whyItMatters:
        "Sustained investment is a fair thing to reflect back to a customer who is deciding how deeply to commit.",
      date: "2026-07-30",
      importance: "medium",
    },
    {
      category: "Financial",
      headline: "Public updates keep pointing at durable customer growth",
      summary:
        "HubSpot’s public business updates emphasise customer growth and platform revenue more than a single product cycle.",
      whyItMatters:
        "Customers notice when a vendor’s story is about expanding accounts. They will ask, quietly, what that means for price and packaging.",
      date: "2026-07-16",
      importance: "medium",
    },
  ],
  themes: ["AI in the CRM", "Platform adoption", "Partner-led delivery"],
  themeSummary:
    "Recent signals suggest HubSpot is asking customers to go deeper on the platform, with AI as the reason to change how teams work.",
  sources: [
    { title: "HubSpot Newsroom", url: "https://www.hubspot.com/company-news" },
    { title: "HubSpot Investor Relations", url: "https://ir.hubspot.com/" },
    { title: "About HubSpot", url: "https://www.hubspot.com/our-story" },
  ],
  insufficientData: false,
};

function sampleAccount(id: string, intelligence: Intelligence): Account {
  return {
    id,
    name: intelligence.company.name,
    origin: "sample",
    intelligence,
    updatedAt: null,
    live: false,
    error: null,
  };
}

export const DEMO_ACCOUNTS: Account[] = [
  sampleAccount("canva", canva),
  sampleAccount("stripe", stripe),
  sampleAccount("hubspot", hubspot),
];

export const DEFAULT_ACCOUNT_ID = DEMO_ACCOUNTS[0].id;
