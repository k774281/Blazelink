// Landing page copy, Chinese. en.js and ja.js have the same shape.
// 最新消息's cards are the newest column posts, read from WordPress (see _lib/wp.js).

const zh = {
  locale: "zh",
  htmlLang: "zh-Hant-TW",
  meta: {
    title: "Blazelink 鏈客行銷 — 自動化獲客的成長引擎",
    description:
      "BlazeLink 鏈客行銷是您的 MarTech 行銷策略夥伴。專為 B2B 與專業服務打造「自動化獲客引擎」，整合 SEO、網站漏斗與數據分析，將專業化為 24 小時不間斷的營收資產。",
  },
  skipLink: "跳到主要內容",
  homeLabel: "Blazelink 鏈客 首頁",
  railLabel: "區塊導覽",
  langLabel: "語言",
  legalLabel: "法律資訊",
  sections: ["首頁", "關於鏈客", "服務項目", "行銷策略", "最新消息", "合作品牌", "聯繫我們"],
  hero: {
    eyebrow: "MarTech 行銷策略夥伴",
    title: ["自動化獲客的", "成長引擎"],
    sub: { before: "為 B2B 企業、知識服務、跨國品牌打造，讓品牌擁有可", accent: "持續的正向循環", after: "。" },
    primary: "內容行銷",
    secondary: "網站架設",
  },
  scroll: "瀏覽更多",
  about: {
    eyebrow: "想了解我們有什麼服務嗎？",
    rolesPrefix: "我們是 ",
    roles: ["資深行銷顧問", "B2B 成長團隊", "B2B 企業"],
    rolesSuffix: " 的夥伴",
    headline: "打造真正見效的成長策略",
    lead: "自動化獲客的成長引擎，讓品牌擁有可持續的正向循環。",
    cards: ["精準行銷策略", "SEO 跨國內容行銷", "自動化銷售漏斗"],
    cta: "內容行銷",
  },
  services: {
    eyebrow: "策略 · 速度 · 專業技術",
    title: "您的形象，可以從這裡開始",
    items: [
      { title: "品牌定位", content: "釐清定位與客群，讓品牌說對話。" },
      { title: "網站架設", content: "對準品牌定位與轉換目標的網站。" },
      { title: "AI 導入", content: "導入 AI 工具，強化團隊效率。" },
    ],
    marquee: [
      ["品牌定位", "網站架設", "AI 導入", "SEO 跨國內容行銷"],
      ["自動化銷售漏斗", "數據分析", "精準行銷策略", "Landing Page"],
    ],
  },
  process: {
    eyebrow: "你可以對我們有期待",
    title: "我們可以",
    steps: ["精準行銷策略", "內容成長執行", "數據優化迭代"],
    cta: "了解行銷內容",
  },
  news: {
    eyebrow: "Insights",
    title: "最新消息",
    lead: "跨國 SEO、名單型內容與 Landing Page 的實戰觀點。",
  },
  clients: { eyebrow: "Trusted by", title: "與跨國品牌一起成長" },
  contact: {
    eyebrow: "Let's grow together",
    title: ["品牌的成長，", "是我們共同的目標"],
    body: "我們深入了解需求，依品牌創造最適合的行銷策略與方法，進而不斷優化與改進。無論您是一家小型新創企業，還是一個已經穩固的品牌，我們都將全心投入，幫助您實現成功。與鏈客團隊合作，您不僅得到了專業的行銷服務，還擁有一個真正關心您業務成長的夥伴。",
  },
  footer: {
    phone: { label: "02-66039088", tel: "+886266039088" },
    email: "service@blazelink.co",
    copyright: "Copyright 2026 © 鏈客策略行銷股份有限公司",
    privacy: "隱私權政策",
    terms: "服務條款",
  },
};

export default zh;
