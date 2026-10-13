/*
 * Homepage copy, English. Same shape as ../zh/home.js.
 * The shop is Chinese only, so it is not in the English menu.
 */

import { asset } from "../../_lib/base";

export const nav = [
  { label: "Work", href: "/cases" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/column" },
];

export const contactHref = "/contact";

export const hero = {
  title: ["Make your website", "your brand's", "first impression."],
  lead: "From design blueprint to launch, we build brand websites that look good and work hard. You see the design before we build — and the website is entirely yours.",
  primary: { label: "Book a consultation", href: "/contact" },
  secondary: { label: "See our work", href: "/cases" },
};

export const works = {
  eyebrow: "01 — WORKS",
  title: "Selected work",
  lead: "We've worked with more than 20 brands, pairing Figma design with WordPress development — sites that look good and do their job.",
  more: { label: "See more work", href: "/cases" },
  items: [
    { name: "GOGOHSU MUSEUM", tag: "Luxury fashion", latin: true, image: asset("/home/demo-1.webp") },
    // Brand names stay as the brands write them.
    { name: "成智聯合會計師事務所", tag: "Professional services", image: asset("/home/demo-2.webp") },
    { name: "曜畫廊 Gallery de Sol", tag: "Art", image: asset("/home/demo-3.webp") },
    { name: "美成移民", tag: "Advisory", image: asset("/home/demo-4.webp") },
    { name: "Yifei FCL Shipping", tag: "Cross-border logistics", latin: true, image: asset("/home/demo-5.webp") },
  ],
};

export const process = {
  eyebrow: "02 — PROCESS",
  title: "Design first, then build",
  lead: "Before any development, you get a complete design blueprint. We only build once it's what you need — so the result never differs from what you pictured.",
  steps: [
    {
      no: "01",
      image: asset("/home/homepage-4.webp"),
      name: "Discovery",
      heading: "Ask the right questions before talking design",
      body: "We start with your customers, your competitors and the problem this site has to solve, then take stock of what you already have — ending with a page structure and content list we both sign off.",
    },
    {
      no: "02",
      image: asset("/home/homepage-5.webp"),
      name: "Design blueprint",
      heading: "See the whole website before it goes live",
      body: "Every page is drawn in Figma for desktop and mobile, with type, spacing and colour all finalised. Changes at this stage cost nothing in development, and we only build once you're happy.",
    },
    {
      no: "03",
      image: asset("/home/homepage-6.webp"),
      name: "Build on approval",
      heading: "We build once the design is final — no changes on the fly",
      body: "Once the design is approved, we build it in WordPress exactly as drawn, with every admin field clearly labelled. A staging link lets you follow progress at any time.",
    },
    {
      no: "04",
      image: asset("/home/homepage-7.webp"),
      name: "Launch and handover",
      heading: "You get more than a website — you get an asset",
      body: "Before launch we check every link, form and device, and record a walkthrough of the admin. The domain, hosting and accounts are all transferred to you, ready to take wherever you like.",
    },
  ],
};

export const ownership = {
  eyebrow: "03 — OWNERSHIP",
  title: "Your website, entirely yours.",
  lead: "We never hold a client's website hostage. The domain, hosting and content are all in your name, and they go with you if you change suppliers.",
  rows: [
    { label: "Domain", ours: "Registered in your name, fully handed over", theirs: "Registered to the agency — lost if you leave", image: asset("/home/homepage-1.webp") },
    { label: "Hosting", ours: "Your own hosting account, movable any time", theirs: "Tied to the agency's plan; moving costs extra", image: asset("/home/homepage-2.webp") },
    { label: "Content and admin", ours: "The WordPress admin is yours to update", theirs: "Only the agency can edit — and you wait every time", image: asset("/home/homepage-3.webp") },
  ],
};

export const beyond = {
  eyebrow: "BEYOND",
  kicker: "What we can do",
  title: "goes beyond websites",
  lead: [
    "Feature modules built for your industry, and interactive touches people remember.",
    "A brand website is only the starting point. Clinics need online booking and visit status, tutoring centres need course sign-ups and payment records, restaurants need menu management and reservations, logistics firms need shipment tracking and freight quotes — none of which a template can do. We build to your actual workflow, so the site plugs into daily operations rather than just looking good. The other half is interaction: entrance animations, cursor effects, stories that unfold as you scroll — details that don't slow the page but make people remember you after they leave. We also handle multilingual sites, payments, member areas and admin reports, so marketing, support and sales share one system. These modules live on your own hosting and admin too, so extending them later, or handing them to someone else, never ties you to us. The quickest way to see what's possible is to look at what we've built.",
  ],
  href: "/cases",
};

export const column = {
  eyebrow: "04 — INSIGHTS",
  title: "Insights",
  lead: "Still weighing it up? Start here with what you need to know about building a brand website.",
  cta: {
    title: "Want to talk about your website?",
    body: "Tell us about your brand and what you need, and we'll be in touch soon.",
    label: "Book a consultation",
    href: "/contact",
  },
  more: { label: "See all insights", href: "/column" },
};

export const footer = {
  company: ["BlazeLink Co.", "Brand websites ・ WordPress development ・ Custom features"],
  address: "11F, No. 2, Guancian Rd., Jhongjheng Dist., Taipei City, Taiwan",
  hours: "Hours: Mon–Fri, 10:00 a.m. – 6:00 p.m. (GMT+8)",
  phone: "+886-2-6603-9088",
  email: "service@blazelink.co",
  columns: [
    {
      head: "MENU",
      links: [
        { label: "Work", href: "/cases" },
        { label: "About", href: "/about" },
        { label: "Insights", href: "/column" },
        { label: "Contact", href: "/contact" },
      ],
    },
    { head: "CONTACT", links: [{ label: "Get in touch", href: "/contact" }] },
  ],
  copyright: "Copyright 2026 © BlazeLink Co.",
  legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
};
