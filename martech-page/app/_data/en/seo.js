import { asset } from "../../_lib/base";
// Global SEO page copy, English. Same shape as ../zh/seo.js.

export const hero = {
  title: ["A cross-border SEO", "client-acquisition system for expert brands."],
  lead: "White-hat content marketing, built for conversion. Beyond rankings, we turn your expertise into a digital asset that captures high-value clients at home and abroad.",
  banner: asset("/img-12.webp"),
};

export const problem = {
  title: "Why does most SEO traffic never turn into real leads or sales?",
  listTitle: "If any of this sounds familiar",
  image: asset("/img-13.webp"),
  items: [
    "Ad spend buys traffic, but leads aren't qualified, costs are hard to control, and content farms churn out word counts.",
    "Once leads come in, sales cold-call them one by one — conversion depends on scripts and luck, and costs run away.",
    "The agency answers only for keyword rankings, pads pages to hit a word count, and forgets the traffic once it arrives.",
  ],
};

export const answer = {
  title: "What BlazeLink does instead",
  lead: "Not luring people in — keeping the right people.",
  image: asset("/img-14.webp"),
  items: [
    [
      { text: "Events and precise content funnels capture high-intent prospects — " },
      { text: "a lead for half the advertising cost", strong: true },
      { text: "." },
    ],
    [
      { text: "Leads are scored by intent and routed accordingly — " },
      { text: "cost per order down from NT$800 to NT$300, a 62.5% drop", strong: true },
      { text: "." },
    ],
    [
      { text: "A few core keywords, backed by purpose-built on-site tools", strong: true },
      { text: ", so free traffic stays — and keeps paying off." },
    ],
  ],
};

export const value = {
  title: ["We don't just bring traffic —", "we answer for what it does after it arrives."],
  items: [
    {
      no: "01",
      title: "Cross-border SEO",
      body: "Break past geography and let overseas clients find you. We build multilingual site architecture, hreflang tagging and local search-intent research.",
      image: asset("/img-15.webp"),
    },
    {
      no: "02",
      title: "Conversion first",
      body: "Traffic without leads is wasted. We design content conversion funnels so readers naturally leave their details once they've read.",
      image: asset("/img-16.webp"),
    },
    {
      no: "03",
      title: "Strictly white-hat",
      body: "No black-hat shortcuts. We help you distil your expertise into SEO assets that compound over the long term.",
      image: asset("/img-17.webp"),
    },
  ],
};

export const foundation = {
  title: "Cross-border SEO is won in the architecture, not just in translation.",
  lead: "Many companies going overseas assume a translation plugin will bring in international orders. Real international SEO is careful engineering across server architecture, language tagging and cultural insight.",
  items: [
    {
      no: "01",
      title: "Cross-border technical groundwork",
      en: "TECHNICAL SEO",
      body: "From optimising load times across regions to precise hreflang deployment, we make sure Google reads the right target country — no language conflicts, no diluted authority.",
    },
    {
      no: "02",
      title: "Cross-cultural search intent",
      en: "",
      body: "High-value overseas clients search very differently from Taiwanese ones. Instead of translating, we research each market and rebuild topic clusters around its own business logic and pain points.",
    },
    {
      no: "03",
      title: "International authority and trust",
      en: "EEAT",
      body: "In high-barrier industries — B2B, compliance, finance — trust comes first. We help brands build content that meets Google's E-E-A-T standard: experience, expertise, authoritativeness and trust.",
    },
  ],
};

export const funnel = {
  title: "Rebuilding the architecture: from wasted impressions to precise capture",
  lead: "Clients in high-trust industries — finance, consulting, B2B equipment — never buy after a single article. So here is the blueprint of the client-acquisition system:",
  closing: "What you are buying isn't a pile of empty traffic numbers, but a client-acquisition engine engineered from the code up to the business logic.",
  items: [
    {
      no: "01",
      icon: asset("/figma/icon-funnel-ad.svg"),
      title: "Landing on intent, and stopping the bounce",
      body: "We have half a second to catch a visitor arriving from search. Fast loading and a first screen that answers their search intent make an expert first impression and keep bounce rates low.",
      tags: ["Fast dedicated AWS hosting", "Answers the exact pain point"],
    },
    {
      no: "02",
      icon: asset("/material-symbols_assured-workload.svg"),
      title: "Delivering value, building E-E-A-T authority",
      body: "As visitors read, a planned topic-cluster of internal links leads them deeper into related expert articles, with author credentials and cited data — building trust with both Google and your clients.",
      tags: ["Internal-link guidance", "Structured data for credentials"],
    },
    {
      no: "03",
      icon: asset("/icon-park-solid_rectangular-circular-separation.svg"),
      title: "Reading intent, routing each visitor",
      body: "This is what traditional SEO agencies can't do. At the peak of the reading experience, the system routes each visitor by how strong their intent is, to one of three conversion points:",
      minis: [
        { label: "High intent: decision-makers", body: "Sent to a tailored booking form — the most qualified leads you'll get." },
        { label: "Medium intent: comparing options", body: "Offered an ROI calculator or an industry white paper in exchange for an email." },
        { label: "Low intent: early researchers", body: "Tagged by tracking pixels and GA4 events, and reached later with low-cost ads." },
      ],
    },
    {
      no: "04",
      icon: asset("/hugeicons_artificial-intelligence-07.svg"),
      title: "Data hand-off and automation",
      body: "As soon as a lead is created, the system sends the contact and the keyword that brought them to your inbox or CRM via API or webhook. Your sales team picks it up already knowing the pain point — and closes more.",
      tags: ["GA4 conversion tracking", "Webhook hand-off", "Fully automated"],
    },
  ],
};

export const fit = {
  title: "Built for knowledge-intensive, high-trust businesses",
  lead: "High-value services have long decision cycles. Your clients need more than a good-looking website: they need a digital body of knowledge that shows your authority.",
  items: [
    "Companies preparing to expand overseas that need international search visibility.",
    "Professional services, B2B solutions, consulting, finance and other high-barrier industries.",
    "Brands tired of ads that don't perform, wanting steady long-term search traffic instead.",
    "Business owners with deep industry experience, ready to turn what they know into a lasting digital asset.",
  ],
};

export const next = {
  title: ["The first step into international markets", "starts here."],
  body: "Want to take your brand international but not sure where to begin? You don't need any marketing jargon — just tell us your brand's story and what you do best.",
  note: "We never hard-sell. Your pace and your real needs come first.",
  cta: "Book a free consultation",
};

export const onThisPage = [
  { label: "The problem", href: "#problem" },
  { label: "Our approach", href: "#answer" },
  { label: "Why us", href: "#value" },
  { label: "Architecture", href: "#foundation" },
  { label: "The funnel", href: "#funnel" },
  { label: "Who it's for", href: "#fit" },
];
