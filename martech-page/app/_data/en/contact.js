// Contact page copy, English. Same shape as ../zh/contact.js.

export const intro = {
  title: ["Let's talk about", "where you're stuck."],
  lead: "No slide deck, no budget needed up front. Leave a few details and we'll get back to you within two business days.",
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
