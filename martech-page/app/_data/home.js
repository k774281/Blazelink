// Homepage copy, kept in one place so it can be swapped for headless WP data later.

// The header rides on every page, so these have to resolve from anywhere.
export const nav = [
  { label: "關於我們", href: "/about" },
  { label: "跨國SEO行銷", href: "/seo" },
  { label: "鏈客商學院", href: "/academy" },
];

// Brand logos 01-12. 11 is an SVG, the rest are WebP.
// TODO: swap the placeholder names for the real brand names.
export const brandLogos = Array.from({ length: 12 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return { name: `品牌 ${n}`, src: `/logo-${n}.${n === "11" ? "svg" : "webp"}` };
});

export const hero = {
  eyebrow: "MARTECH GROWTH ENGINE",
  title: "別讓你的流量，只是路過。",
  lead: "從表單、名單分級到 CRM 全線打通。不只把人帶進來，而是讓每一次進站都留下可追蹤、可交付給業務的名單。",
  stats: [
    { value: "12K+", label: "members" },
    { value: "12K+", label: "members" },
    { value: "12K+", label: "members" },
  ],
  tags: ["精準行銷策略", "精準行銷策略", "精準行銷策略", "精準行銷策略"],
  proof: "12 個合作品牌 · 跨國 B2B 與 YMYL 高門檻產業",
  logos: brandLogos.slice(0, 8).map((b) => b.src),
};

export const philosophy = {
  title: "共創成功",
  image: "/img-1.webp", // placeholder until the real philosophy visual lands
  body: "策略行銷應該是一場冒險，一場啟發，而我們是您的冒險夥伴，為您鏈接品牌的成功。我們不只是提供服務，更是深入理解品牌的事業夥伴。",
  closingTitle: "我們的成功建立在您的成功之上，",
  closingBody: "這就是我們為之努力的原因。",
  cta: "聊聊你的成長引擎",
};

export const services = {
  title: "只對最終的名單與營收負責。",
  items: [
    {
      id: "01",
      name: "精準行銷策略",
      body: "從受眾輪廓、競品定位到訊息架構，先把「對誰說、說什麼」定下來，再決定投放與內容的配置，避免預算花在無法收斂成名單的流量上。",
      image: "/img-1.webp", // placeholder for service-01
    },
    {
      id: "02",
      name: "自動化銷售漏斗",
      body: "把表單、名單分級與 CRM 串成一條動線，讓每一筆進站行為都有對應的後續動作，業務接手時已經知道對方走到哪一步。",
      image: "/img-1.webp", // placeholder for service-02
    },
    {
      id: "03",
      name: "SEO 跨國內容行銷",
      body: "以在地語意而非直譯建立內容結構，讓不同市場的搜尋需求都能對應到正確的落地頁，把自然流量收斂成可追蹤的名單。",
      image: "/img-1.webp", // placeholder for service-03
    },
    {
      id: "04",
      name: "市場洞察／競品分析",
      body: "盤點市場需求與競品佈局，找出尚未被滿足的切角，讓預算配置有依據，而不是跟著同業的投放節奏走。",
      image: "/img-1.webp", // placeholder for service-04
    },
  ],
  crossLinks: [
    { label: "跨國SEO行銷", href: "/seo" },
    { label: "網站架設服務", href: "#web" },
  ],
  cta: "直接聊聊你的需求",
};

// 最新講座 comes from WordPress — the newest three products in 課程.
export const academy = {
  title: "最新講座",
  cta: "查看全部講座",
};

export const ctaBanner = {
  title: "成長的每一步，我們都與您同行",
  cta: "探索更多行銷策略",
  image: "/figma/cta-banner.webp",
};

export const partners = {
  note: "12 個品牌，從新創到跨國 B2B 都在同一條動線上。",
  cta: "成為下一個",
  brands: brandLogos,
};

// 最新文章 comes from WordPress — the newest three posts in 行銷科技艙.
export const blog = {
  title: "最新文章",
  cta: "查看全部文章",
};

export const contact = {
  headline: "讓你的流量，變成",
  rotating: ["名單。", "商機。", "訂單。", "營收。"],
  body: "不用先準備簡報，也不用先想好預算。一通電話，先聊聊你現在卡在哪一段。",
  cta: "免費預約諮詢",
};

export const footer = {
  address: "臺北市中正區黎明里館前路2號11樓",
  hours: "營業時間：週一至週五  上午10：00 至 下午6：00",
  phone: "電話：02-66039088",
  email: "信箱：service@blazelink.co",
  // The homepage's own sections. Other pages pass their own list to <SiteFooter>.
  onThisPage: [
    { label: "公司理念", href: "#about" },
    { label: "提供的服務", href: "#services" },
    { label: "鏈客商學院", href: "#academy" },
    { label: "部落格", href: "#blog" },
  ],
  // Shared by every page, so these are absolute.
  sitemap: [
    { label: "關於我們", href: "/about" },
    { label: "跨國SEO行銷", href: "/seo" },
    { label: "鏈客商學院", href: "/academy" },
    { label: "聯繫我們", href: "#contact" },
  ],
  copyright: "Copyright 2026 © 鏈客策略行銷股份有限公司",
  wordmark: "BLAZELINK.CO",
};
