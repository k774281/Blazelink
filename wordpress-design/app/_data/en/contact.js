// Contact page copy, English. Same shape as ../zh/contact.js.

export { cf7 } from "../zh/contact";

export const header = {
  display: "CONTACT",
  title: "Contact",
  lead: ["No slide deck, no budget needed up front.", "Leave a few details and we'll get back to you within two business days."],
};

export const intro = {
  eyebrow: "LET’S TALK",
  title: ["Let's talk about", "the website you want."],
  lead: "Redesigning an existing site or starting from scratch — either works. Tell us about your brand and what you need, and we'll plan it with you from the design blueprint.",
  steps: [
    { no: "01", title: "Send the form", body: "Two minutes to tell us about your brand and the site you want." },
    { no: "02", title: "Reply within two business days", body: "If you include your current site, our reply comes with a first look at it." },
    { no: "03", title: "One call", body: "Online or by phone — and never a hard sell." },
  ],
  details: [
    { label: "Phone", value: "+886-2-6603-9088", href: "tel:+886266039088" },
    { label: "Email", value: "service@blazelink.co", href: "mailto:service@blazelink.co" },
    { label: "Hours", value: "Mon–Fri 10:00–18:00 (GMT+8)" },
  ],
};

export const form = {
  title: "Tell us about your project",
  note: "Fields marked * are required. Takes about two minutes.",
  // Values are CF7 form 644's own options, checked word for word; the labels are what readers see.
  topics: ["網站設計/開發", "網站健檢", "行銷漏斗", "其他"],
  topicLabels: { "網站設計/開發": "Website design / development", 網站健檢: "Website audit", 行銷漏斗: "Marketing funnel", 其他: "Something else" },
  defaultTopic: "網站設計/開發",
  submit: "Send",
  submitting: "Sending…",
  privacy: { before: "By sending this form you agree that we handle your details under our ", link: "Privacy Policy", href: "/privacy-policy", after: "." },
  errors: {
    required: "This field is required.",
    email: "Please enter a valid email address.",
    url: "Please enter the full address, including https://.",
  },
  failure: "Sorry, that didn't go through. Please try again, or email us at service@blazelink.co.",
};

export const success = {
  eyebrow: "SENT",
  title: "Thanks — we've got it",
  body: "We'll reply within two business days. If you included your current site, we'll add a first look at it.",
  primary: { label: "See our work", href: "/cases" },
  secondary: { label: "Back to home", href: "/" },
};
