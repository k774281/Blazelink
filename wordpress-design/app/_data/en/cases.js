/*
 * Cases page copy, English. Same shape as ../zh/cases.js; brand names stay
 * as the brands write them.
 */

import { asset } from "../../_lib/base";

export const header = {
  breadcrumb: "Home  /  Work",
  display: "CASES",
  title: "Our work",
  lead: ["More than 20 brands — from brand websites and custom features to automation,", "every project made to look good and to work."],
};

const img = (n) => asset(`/home/demo-${n}.webp`);

export const sections = [
  {
    key: "wordpress",
    tab: "WordPress websites",
    eyebrow: "01 — WORDPRESS",
    title: "WordPress websites",
    lead: ["Figma design with WordPress/PHP development —", "and after launch, you can update the content yourself."],
    items: [
      { name: "GOGOHSU MUSEUM", latin: true, tags: ["Luxury fashion", "Brand website"], body: "A bespoke art brand, its work presented like an exhibition.", href: "https://gogohsu.com", image: img(1) },
      { name: "成智聯合會計師事務所", tags: ["Professional services", "Brand website"], body: "Digital accounting services, with professional processes made easy to follow.", href: "https://pwcpa.one", image: img(2) },
      { name: "曜畫廊 Gallery de Sol", latin: true, tags: ["Art", "Brand website"], body: "A printmaking gallery that makes the artwork the star of the site.", href: "https://gallerydesol.com/", image: img(3) },
      { name: "美成移民", tags: ["Advisory", "Brand website"], body: "Overseas asset-planning advisers, with a brand image people can trust.", href: "https://masonsimmigrate.com", image: img(4) },
      { name: "Yifei 亦飛貨運", tags: ["International logistics", "Brand website"], body: "Full-container shipping from China to the US, with sailings and quotes at a glance.", href: "https://yifeidelivery.com/yifei-shipping/", image: img(5) },
    ],
    cta: { eyebrow: "NEXT", title: ["The next one", "could be your brand."], label: "Shape your brand's image", href: "/contact" },
  },
  {
    key: "custom",
    tab: "Custom features",
    eyebrow: "02 — CUSTOM",
    title: "Custom features",
    lead: ["Feature modules built for each industry,", "so the website doesn't just show — it works for you."],
    items: [
      { name: "Contractor payment slip generator", platform: "WORDPRESS", body: "Enter the details and the slip is generated automatically, saving admin time.", image: img(6) },
      { name: "Salary calculator", platform: "WORDPRESS", body: "Calculations right on the website, making a professional service easier to grasp.", image: img(7) },
      { name: "AI business health check", platform: "WORDPRESS", body: "An interactive quiz with AI analysis that turns visitors into consultation leads.", image: img(8) },
      { name: "Inheritance calculator", platform: "WORDPRESS", body: "Enter the circumstances and see the distribution — complex rules made clear.", image: img(9) },
      { name: "Reward points module", platform: "SHOPIFY", body: "Earn and redeem points, so customers want to come back.", image: img(10) },
      { name: "Certificate module", platform: "SHOPIFY", body: "Certificates issued automatically on purchase or course completion — no manual work.", image: img(11) },
    ],
  },
  {
    key: "automation",
    tab: "Marketing automation",
    eyebrow: "03 — AUTOMATION",
    title: "Marketing automation",
    lead: ["Generative AI and automation tools,", "so your content updates itself every day."],
    items: [
      { name: "Automatic exhibition sharing", body: "The Exhibique gallery system gathers exhibition news and shares it, so galleries don't post by hand every day.", chips: ["GPT", "Make"], image: img(12) },
      { name: "Automated financial news platform", body: "Monitors the news daily, rewrites and schedules posts, keeping the site's content fresh.", chips: ["GPT", "Scheduled publishing"], image: img(13) },
    ],
  },
  {
    key: "creative",
    tab: "Creative pieces",
    eyebrow: "04 — CREATIVE",
    title: "Creative pieces",
    lead: ["Interactive pieces where technology meets creativity —", "making brands memorable while quietly collecting leads."],
    items: [
      { name: "Birthday adventure", body: "An interactive birthday-gift website that turns good wishes into a journey.", image: img(14) },
      { name: "New Year fortune draw", body: "A digital greeting card with a marketing funnel built in — holidays that collect leads.", image: img(15) },
      { name: "Photo check-in stamp card", body: "A digital stamp card with no login, ready to use at events.", image: img(16) },
    ],
  },
  {
    key: "enterprise",
    tab: "Enterprise",
    eyebrow: "05 — ENTERPRISE",
    title: "Enterprise systems",
    lead: ["Systems built for internal processes;", "client names are kept confidential under contract."],
    items: [
      { name: "Supplier management system", body: "Tracks purchasing and supplier performance, bringing scattered spreadsheet data into one place.", chips: ["Purchasing", "Performance"], image: img(17) },
      { name: "Internal contractor payment system", body: "Calculates tax automatically and generates reports, cutting manual checking errors.", chips: ["Automatic tax", "Reports"], image: img(18) },
    ],
  },
  {
    key: "api",
    tab: "API integration",
    eyebrow: "06 — API",
    title: "One-stop API integration",
    lead: ["Through REST APIs and webhooks,", "we connect your website to the tools you already use."],
    items: [
      { name: "LINE", body: "Real-time messaging", icon: asset("/cases/icon-line.svg") },
      { name: "Google Sheets", body: "Report sync", icon: asset("/cases/icon-google-sheets.svg"), iconSize: [29.0671, 35.8338], iconDisc: true },
      { name: "Ragic", body: "ERP data", icon: asset("/cases/icon-ragic.svg") },
      { name: "Stripe", body: "Payments", icon: asset("/cases/icon-stripe.svg") },
      { name: "Mailchimp", body: "Marketing automation", icon: asset("/cases/icon-mailchimp.svg") },
    ],
  },
];

export const cta = {
  eyebrow: "CONTACT",
  title: "Get in touch and start planning your website.",
  label: "Tell us your idea",
  href: "/contact",
};
