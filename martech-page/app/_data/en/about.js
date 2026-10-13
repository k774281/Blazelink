import { asset } from "../../_lib/base";
// About page copy, English. Same shape as ../zh/about.js.

export const philosophy = {
  lead: "Strategic marketing should be an adventure and an inspiration — and we are your partner on it, linking your brand to success.",
  image: asset("/figma/about-philosophy.webp"),
  body: [
    "We are more than a service provider; we are business partners who take the time to understand your brand.",
    "Whether you are a start-up taking your first steps or an established brand looking for a breakthrough, we bring all our passion and expertise to growing your reach and your revenue.",
    "Our success is built on yours. That is what we work for.",
  ],
};

export const dualEngine = {
  title: ["Strategy and technology", "are our twin engines."],
  paragraphs: [
    [
      { text: "In a crowded market, creativity is only the starting point; " },
      { text: "precision is what wins", strong: true },
      { text: "." },
    ],
    [
      { text: "BlazeLink uses " },
      { text: "marketing technology (MarTech)", strong: true },
      {
        text: " to lay the digital groundwork — automation, audience analysis and funnel design that raise the return on every marketing dollar. Every impression does more than deliver a message: it moves the strategy forward.",
      },
    ],
  ],
  images: [asset("/figma/about-strategy.webp"), asset("/img-6.webp")],
};

export const allInOne = {
  title: "Marketing made simple, and effective.",
  image: asset("/img-7.webp"),
  paragraphs: [
    "From market research and content strategy to web design, SEO, advertising and automated sales funnels, the BlazeLink team brings every discipline together into a marketing system that is efficient and built to scale.",
    "No more coordinating designers, agencies, developers and consultants separately. We are the one marketing partner you need — saving you the overhead so you can focus on your business and grow steadily.",
  ],
  scopeLabel: "What we cover",
  scope: ["Market research", "Content strategy", "Web design", "SEO", "Advertising", "Automated sales funnels"],
};

export const results = {
  items: [
    {
      no: "01",
      title: "Lower advertising costs",
      body: "We settle the audience and the message before deciding where to spend, so budget isn't scattered over traffic that never becomes a lead. The same budget buys more useful reach, and the cost of each lead comes down.",
      image: asset("/img-8.webp"),
    },
    {
      no: "02",
      title: "Better-quality leads",
      body: "Forms, behaviour data and lead scoring are joined into one path, so every visit leaves a trail. Sales receive more than a phone number: they know what the prospect cares about and how far along they are.",
      image: asset("/img-9.webp"),
    },
    {
      no: "03",
      title: "Shorter sales cycles",
      body: "From first impression to signed deal, automated flows handle every follow-up — no waiting for sales to dig through the list. The right people hear from you at the right time, hesitation shrinks, and deals close sooner.",
      image: asset("/img-10.webp"),
    },
  ],
};

export const founder = {
  name: "BEN",
  role: "Founder　|　CEO",
  portrait: asset("/img-11.webp"),
  lead: "Ben is not just a full-stack web developer; he is a hands-on consultant in precision marketing.",
  body: [
    "Formerly head of the Chinese-speaking region for an American financial group, he starts from business goals and brings information architecture and marketing technology together into digital solutions with real commercial value. From user-journey optimisation and performance tracking to data integration and automation, he builds it himself — helping clients get the most out of the least.",
    "His role goes beyond the technical: he thinks about marketing strategy as a business owner would. He is the person at the heart of BlazeLink who keeps the technology and the marketing goals pulling in the same direction.",
  ],
  skills: "MarTech and automation | Precision marketing strategy | Full-stack development | Data integration and tracking | Digital transformation consulting",
  cta: { label: "Email Ben", href: "mailto:service@blazelink.co" },
};

export const next = {
  title: ["When you're ready,", "we can begin."],
  body: "No slide deck, no budget needed up front. Leave your website and we'll have looked through it before we talk.",
  cta: "Book a free consultation",
};

export const onThisPage = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Twin engines", href: "#dual-engine" },
  { label: "All in one", href: "#all-in-one" },
  { label: "Results", href: "#results" },
  { label: "Founder", href: "#founder" },
];
