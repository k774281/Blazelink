/*
 * Insights copy, English. Same shape as ../zh/column.js. The posts come from
 * WordPress's English category; the posts kept in this repo are Chinese only.
 */

import { asset } from "../../_lib/base";

export const header = {
  display: "INSIGHTS",
  title: "Insights",
  lead: ["Web design, marketing technology and running a business —", "what to know before you build a good website."],
};

export const localPosts = [];

export const FALLBACK_IMAGE = asset("/home/bg-1.webp");

export const consult = {
  title: "Want to talk about your website?",
  body: "Tell us about your brand and what you need, and we'll be in touch soon.",
  label: "Book a consultation",
  href: "/contact",
};

export const cta = {
  eyebrow: "CONTACT",
  title: "Get in touch and start planning your website.",
  label: "Tell us your idea",
  href: "/contact",
};

export const articleConsult = {
  title: "Want a better website?",
  body: "Tell us about your brand and what you need, and we'll take it from design blueprint to launch with you.",
  label: "Book a consultation",
  href: "/contact",
};

export const articleCta = cta;

export const PAGE_SIZE = 8;

export const postHref = (post) => `/column/${post.slug}`;
