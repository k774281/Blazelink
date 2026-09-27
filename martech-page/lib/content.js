// New pages don't exist yet, so these point at the current blazelink.co site.
export const LINKS = {
  about: "https://blazelink.co/about/",
  globalSeo: "https://blazelink.co/global-seo/",
  academy: "https://blazelink.co/academy/",
  contact: "https://blazelink.co/contact/",
  website: "https://blazelink.co/",
};

export const NAV = [
  { label: "關於我們", href: LINKS.about },
  { label: "跨國SEO行銷", href: LINKS.globalSeo },
  { label: "鏈客商學院", href: LINKS.academy },
];

export const HERO_STATS = [
  { value: "12K+", label: "members" },
  { value: "12K+", label: "members" },
  { value: "12K+", label: "members" },
];

export const HERO_TAGS = ["精準行銷策略", "精準行銷策略", "精準行銷策略", "精準行銷策略"];

export const PARTNER_LOGOS = [
  { src: "/images/partners/venture-law.webp", alt: "逢侖國際法律事務所", width: 160, height: 26 },
  { src: "/images/partners/gallery-de-sol.webp", alt: "Gallery de sol", width: 160, height: 160 },
  { src: "/images/partners/bbae.webp", alt: "BBAE", width: 160, height: 54 },
  { src: "/images/partners/chengzhi.webp", alt: "誠智會計師事務所", width: 160, height: 48 },
  { src: "/images/partners/banyan-hill.webp", alt: "Banyan Hill", width: 160, height: 74 },
  { src: "/images/partners/faye-moment.webp", alt: "Faye Moment", width: 160, height: 70 },
  { src: "/images/partners/lmi.webp", alt: "LMI Leadership Management International", width: 160, height: 100 },
  { src: "/images/partners/spoon.webp", alt: "Spoon", width: 160, height: 109 },
];

export const SERVICES = [
  {
    title: "精準行銷策略",
    description:
      "從受眾輪廓、競品定位到訊息架構，先把「對誰說、說什麼」定下來，再決定投放與內容的配置，避免預算花在無法收斂成名單的流量上。",
  },
  {
    title: "自動化銷售漏斗",
    description:
      "表單、名單分級、自動化信件到 CRM 全線打通，讓每一筆進站行為都留下可追蹤的紀錄，業務接手時就知道對方已經走到哪一步。",
  },
  {
    title: "SEO 跨國內容行銷",
    description:
      "針對歐美 B2B 與 YMYL 高門檻產業，建立 EEAT 信任架構與多語系內容佈局，讓專業知識成為可以被搜尋到、且會持續帶客的資產。",
  },
  {
    title: "市場洞察／競品分析",
    description:
      "定期拆解競品的關鍵字佈局、內容缺口與轉換動線，把觀察轉成一份可以直接排程執行的迭代清單，而不是看完就收起來的報告。",
  },
];

const LMI_LECTURE = {
  date: "2026 / 10 / 3(六) 14:00-17:00",
  title: "公司每年都做年度計畫，你的人生上一次推演是什麼時候？",
  description:
    "一個下午，用桌遊沙盤把「如果當初……」提前演一遍。安教練特別從大連返台，帶站在事業轉折點的企業主與主管，走過固守現狀、猶豫徘徊、主動轉型三條路，看清下一步。",
  poster: "/images/lectures/lmi-poster.webp",
  href: "https://www.accupass.com/event/2609171216224165557800",
};

export const LECTURES = [
  { ...LMI_LECTURE, tag: "線上" },
  { ...LMI_LECTURE, tag: "實體" },
  { ...LMI_LECTURE, tag: "線上" },
];

const OVERSEA_SEO_POST = {
  tag: "跨國實例",
  date: "2026 / 10 / 3",
  title: "破除翻譯迷思：台灣品牌打入歐美市場的「跨國 SEO」落地實戰指南",
  cover: "/images/blog/oversea-seo-guide.webp",
  href: LINKS.academy,
};

export const POSTS = [OVERSEA_SEO_POST, OVERSEA_SEO_POST, OVERSEA_SEO_POST];

export const PARTNER_SLOTS = Array.from({ length: 12 }, (_, i) => `品牌 ${String(i + 1).padStart(2, "0")}`);

export const CONTACT_WORDS = ["名單。", "對話。", "客戶。", "可預測的營收。"];

export const FOOTER = {
  address: "臺北市中正區黎明里館前路2號11樓",
  hours: "營業時間：週一至週五  上午10：00 至 下午6：00",
  phone: "02-66039088",
  email: "service@blazelink.co",
  onThisPage: [
    { label: "公司理念", href: "#philosophy" },
    { label: "提供的服務", href: "#services" },
    { label: "鏈客商學院", href: "#academy" },
    { label: "部落格", href: "#blog" },
  ],
  sitemap: [
    { label: "關於我們", href: LINKS.about },
    { label: "跨國SEO行銷", href: LINKS.globalSeo },
    { label: "鏈客商學院", href: LINKS.academy },
    { label: "聯繫我們", href: LINKS.contact },
  ],
};
