/*
 * About page copy, English. Same shape as ../zh/about.js; the shared text
 * follows the marketing site's English about page.
 */

import { asset } from "../../_lib/base";

export const header = {
  display: "ABOUT",
  title: "About BlazeLink",
  lead: ["Strategic marketing should be an adventure and an inspiration —", "and we are your partner on it, linking your brand to success."],
};

export const philosophy = {
  eyebrow: "01 — PHILOSOPHY",
  statement: ["We're more than a service —", "we're business partners who", "understand your brand."],
  body: ["Whether you are a start-up taking your first steps or an established brand looking for a breakthrough, we bring all our passion and expertise to growing your reach and your revenue."],
  closing: "Our success is built on yours. That is what we work for.",
  image: asset("/about/about-philosophy.webp"),
};

export const dualEngine = {
  eyebrow: "02 — DUAL ENGINE",
  title: ["Strategy and technology", "are our twin engines."],
  paragraphs: [
    [{ text: "In a crowded market, creativity is only the starting point; " }, { text: "precision is what wins", strong: true }, { text: "." }],
    [
      { text: "BlazeLink uses " },
      { text: "marketing technology (MarTech)", strong: true },
      { text: " to lay the digital groundwork — automation, audience analysis and funnel design that raise the return on every marketing dollar. Every impression does more than deliver a message: it moves the strategy forward." },
    ],
  ],
  images: [asset("/about/about-strategy.webp"), asset("/about/img-6.webp")],
};

export const allInOne = {
  eyebrow: "03 — ALL IN ONE",
  title: "Marketing made simple, and effective.",
  image: asset("/about/img-7.webp"),
  paragraphs: [
    "From market research and content strategy to web design, SEO, advertising and automated sales funnels, the BlazeLink team brings every discipline together into a marketing system that is efficient and built to scale.",
    "No more coordinating designers, agencies, developers and consultants separately. We are the one marketing partner you need — saving you the overhead so you can focus on your business and grow steadily.",
  ],
  scopeLabel: "What we cover",
  scope: ["Market research", "Content strategy", "Web design", "SEO", "Advertising", "Automated sales funnels"],
  highlight: "Web design",
};

export const howWeBuild = {
  eyebrow: "04 — HOW WE BUILD",
  title: "How we build websites.",
  more: { label: "See the sites we've built", href: "/cases" },
  items: [
    { no: "01", title: "Design first, then build", body: "Before development we deliver desktop and mobile designs of every page in Figma, and only build once they're what you need — so the result never differs from what you pictured." },
    { no: "02", title: "The website is yours", body: "Domain, hosting and the WordPress admin are all in your name. Change suppliers and they go with you — no lock-in contracts, no lock-in hosting." },
    { no: "03", title: "Easy to update yourself", body: "Every admin field is clearly labelled, and we record a walkthrough. Editing text, swapping photos and posting news never means waiting for us." },
  ],
};

export const results = {
  eyebrow: "05 — RESULTS",
  title: "Results you can see.",
  items: [
    {
      no: "01",
      title: "Lower advertising costs",
      body: "We settle the audience and the message before deciding where to spend, so budget isn't scattered over traffic that never becomes a lead. The same budget buys more useful reach, and the cost of each lead comes down.",
      image: asset("/about/img-8.webp"),
    },
    {
      no: "02",
      title: "More, better-quality leads",
      body: "Forms, behaviour data and lead scoring are joined into one path, so every visit leaves a trail. Sales receive more than a phone number: they know what the prospect cares about and how far along they are.",
      image: asset("/about/img-9.webp"),
    },
    {
      no: "03",
      title: "Shorter sales cycles",
      body: "From first impression to signed deal, automated flows handle every follow-up — no waiting for sales to dig through the list. The right people hear from you at the right time, hesitation shrinks, and deals close sooner.",
      image: asset("/about/img-10.webp"),
    },
  ],
};

export const founder = {
  eyebrow: "06 — FOUNDER",
  name: "BEN",
  role: "Founder　|　CEO",
  portrait: asset("/about/img-11.webp"),
  lead: "Ben is not just a full-stack web developer; he is a hands-on consultant in precision marketing.",
  body: [
    "Formerly head of the Chinese-speaking region for an American financial group, he starts from business goals and brings information architecture and marketing technology together into digital solutions with real commercial value. From user-journey optimisation and performance tracking to data integration and automation, he builds it himself — helping clients get the most out of the least.",
    "His role goes beyond the technical: he thinks about marketing strategy as a business owner would. He is the person at the heart of BlazeLink who keeps the technology and the marketing goals pulling in the same direction.",
  ],
  skills: ["MarTech and automation", "Precision marketing strategy", "Full-stack development", "Data integration and tracking", "Digital transformation consulting"],
  cta: { label: "Email Ben", href: "mailto:service@blazelink.co" },
};

export const cta = {
  eyebrow: "CONTACT",
  title: "Get in touch and start planning your website.",
  label: "Tell us your idea",
  href: "/contact",
};
