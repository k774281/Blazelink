// Contact page copy, English. Same shape as ../zh/contact.js.

import { WEB_DESIGN_HOME } from "../../_lib/base";

export const intro = {
  // The web-design site, introduced beside the form; `more` links to it.
  title: ["Before the marketing,", "a website that works."],
  lead: "Leads start on your website. Our web team takes your brand site from design blueprint to launch: good-looking, built to convert, and entirely yours.",
  more: { label: "Explore web design", href: WEB_DESIGN_HOME },
  steps: [
    { no: "01", title: "Send the form", body: "Two minutes to tell us about your brand and what's holding it back." },
    { no: "02", title: "Reply within two business days", body: "If you include your website, our reply comes with a first look at it." },
    { no: "03", title: "One call", body: "Online or by phone — and never a hard sell." },
  ],
  details: [
    { label: "Phone", value: "+886-2-6603-9088" },
    { label: "Email", value: "service@blazelink.co" },
    { label: "Hours", value: "Mon–Fri 10:00–18:00 (GMT+8)" },
  ],
};

export const form = {
  title: "Tell us about your project",
  note: "Fields marked * are required. Takes about two minutes.",
  // The values are CF7 form 644's own options, which it checks word for word;
  // topicLabels is what an English reader sees for each.
  topics: ["顧問諮詢", "網站健檢", "網站設計/開發", "SEO關鍵字", "行銷自動化", "AI導入", "社群經營", "行銷漏斗", "其他"],
  topicLabels: {
    顧問諮詢: "Consulting",
    網站健檢: "Website audit",
    "網站設計/開發": "Website design / development",
    SEO關鍵字: "SEO and keywords",
    行銷自動化: "Marketing automation",
    AI導入: "AI adoption",
    社群經營: "Social media",
    行銷漏斗: "Marketing funnel",
    其他: "Something else",
  },
  submit: "Send",
  submitting: "Sending…",
  privacy: {
    before: "By sending this form you agree that we handle your details under our ",
    link: "Privacy Policy",
    href: "/privacy-policy",
    after: ".",
  },
  // Google asks for this wording wherever its reCAPTCHA badge is hidden.
  recaptcha: ["This site is protected by reCAPTCHA and the Google ", "Privacy Policy", " and ", "Terms of Service", " apply."],
  errors: {
    required: "This field is required.",
    email: "Please enter a valid email address.",
    url: "Please enter the full address, including https://.",
  },
  failure: "Sorry, that didn't go through. Please try again, or email us at service@blazelink.co.",
};

export const success = {
  title: "Thanks — we've got it",
  body: "We'll reply within two business days. If you included your website, we'll add a first look at it.",
  cta: "Back to home",
};
