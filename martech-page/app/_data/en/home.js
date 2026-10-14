import { asset, WEB_DESIGN_HOME } from "../../_lib/base";
// Homepage copy, English. Same shape as ../zh/home.js.

// 鏈客商學院 is Chinese only, so it is not in the English menu.
export const nav = [
  { label: "About", href: "/about" },
  { label: "Global SEO", href: "/seo" },
  { label: "Insights", href: "/column/" },
];

export const brandLogos = Array.from({ length: 12 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return { name: `Brand ${n}`, src: asset(`/logo-${n}.${n === "11" ? "svg" : "webp"}`) };
});

export const hero = {
  eyebrow: "MARTECH GROWTH ENGINE",
  title: "Don't let your traffic just pass through.",
  lead: "From forms and lead scoring all the way to your CRM. We don't just bring people in — every visit leaves a lead you can track and hand to your sales team.",
  stats: [
    { value: "100", label: "seminar guests / mo" },
    { value: "Top 3", label: "Google ranking" },
    { value: "−25%", label: "cost per lead" },
  ],
  tags: ["Immigration", "Accounting", "Finance", "Couture fashion"],
  proof: "12 partner brands · cross-border B2B and high-trust (YMYL) industries",
  logos: brandLogos.slice(0, 8).map((b) => b.src),
};

export const philosophy = {
  title: "Success, built together",
  image: asset("/img-2.webp"),
  body: "Strategic marketing should be an adventure and an inspiration — and we are your partner on it, linking your brand to success. We don't just provide a service; we are a business partner who takes the time to understand your brand.",
  closingTitle: "Our success is built on yours.",
  closingBody: "That is what we work for.",
  cta: "Talk to us about your growth engine",
};

export const services = {
  title: "Accountable for one thing: leads and revenue.",
  items: [
    {
      id: "01",
      name: "Precision marketing strategy",
      body: "Audience profiles, competitive positioning and message architecture come first — who you are talking to, and what you say. Only then do we plan media and content, so budget isn't spent on traffic that never turns into leads.",
      image: asset("/img-1.webp"),
    },
    {
      id: "02",
      name: "Automated sales funnels",
      body: "Forms, lead scoring and your CRM joined into one path, so every action on your site triggers the right follow-up — and sales know exactly where a prospect stands before they pick up the phone.",
      image: asset("/img-3.webp"),
    },
    {
      id: "03",
      name: "Cross-border SEO content",
      body: "Content built on local search intent rather than literal translation, so each market's searches land on the right page — turning organic traffic into leads you can track.",
      image: asset("/img-4.webp"),
    },
    {
      id: "04",
      name: "Market and competitor insight",
      body: "We map market demand and where competitors are playing, to find the angles no one is serving yet — so your budget follows evidence, not what everyone else in your industry is doing.",
      image: asset("/img-5.webp"),
    },
  ],
  crossLinks: [
    { label: "Global SEO", href: "/seo" },
    { label: "Website design", href: WEB_DESIGN_HOME },
  ],
  cta: "Tell us what you need",
};

export const academy = {
  title: "Upcoming events",
  cta: "See all events",
};

export const ctaBanner = {
  title: "We're with you at every step of growth",
  cta: "Explore web design",
  href: WEB_DESIGN_HOME,
  image: asset("/figma/cta-banner.webp"),
};

export const partners = {
  note: "12 brands, from start-ups to multinational B2B, on the same path.",
  cta: "Be the next one",
  brands: brandLogos,
};

export const blog = {
  title: "Latest insights",
  cta: "See all articles",
};

export const contact = {
  headline: "Turn your traffic into",
  rotating: ["leads.", "opportunities.", "orders.", "revenue."],
  body: "No slide deck, no budget needed up front. One call to talk through where you're stuck.",
  cta: "Book a free consultation",
};

export const footer = {
  address: "11F, No. 2, Guancian Rd., Jhongjheng Dist., Taipei City, Taiwan",
  hours: "Hours: Mon–Fri, 10:00 a.m. – 6:00 p.m. (GMT+8)",
  phone: "Phone: +886-2-6603-9088",
  email: "Email: service@blazelink.co",
  onThisPage: [
    { label: "Philosophy", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Insights", href: "#blog" },
  ],
  sitemap: [
    { label: "About", href: "/about" },
    { label: "Global SEO", href: "/seo" },
    { label: "Insights", href: "/column/" },
    { label: "Contact", href: "/contact" },
  ],
  copyright: "Copyright 2026 © BlazeLink Co.",
  legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
  wordmark: "BLAZELINK.CO",
};
