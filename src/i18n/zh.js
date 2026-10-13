// Landing page copy, Chinese. en.js and ja.js have the same shape.
// Image paths starting with / are files in public/ (components wrap them in asset()).

export default {
  meta: {
    title: 'Blazelink 鏈客行銷 — 自動化獲客的成長引擎',
    description:
      'BlazeLink 鏈客行銷是您的 MarTech 行銷策略夥伴。專為 B2B 與專業服務打造「自動化獲客引擎」，整合 SEO、網站漏斗與數據分析，將專業化為 24 小時不間斷的營收資產。',
  },
  logoAlt: 'Blazelink 鏈客',
  mainMenu: '主選單',
  mobileMenu: '行動版主選單',
  openMenu: '開啟選單',
  closeMenu: '關閉選單',
  nav: [
    { label: '關於鏈客', href: '#about' },
    { label: '服務項目', href: '#services' },
    { label: '行銷策略', href: '#marketing' },
    { label: '最新消息', href: '#news' },
    { label: '聯繫我們', href: '#contact' },
  ],
  hero: {
    // The closing phrase is drawn in a gradient, one colour per character.
    heading: '為 B2B 企業、知識服務、跨國品牌打造，\n自動化獲客的成長引擎，讓品牌擁有可持續的正向循環。',
    accent: '持續的正向循環',
    martech: '內容行銷',
    webDesign: '網站架設',
  },
  scrollDown: '瀏覽更多',
  circleReveal: '想了解我們有什麼服務嗎？',
  about: {
    roles: ['資深行銷顧問', 'B2B 成長團隊', 'B2B 企業'],
    headline: '我們深入理解您的需求，打造真正見效的行銷成長策略',
    lead: '自動化獲客的成長引擎，讓品牌擁有可持續的正向循環。',
    cards: ['精準行銷策略', 'SEO跨國內容行銷', '自動化銷售漏斗'],
    cta: '內容行銷',
  },
  services: {
    eyebrow: '我們結合策略、速度與專業技術，為您打造真正見效的網站服務。',
    title: '您的形象，可以從這裡開始',
    lead: '從網站架設到AI導入與API串接，我們陪伴品牌一步步建立值得信賴的數位形象，讓每個環節都真正發揮作用。',
    items: [
      { title: '網站架設', content: '量身打造的網站架構，精準對接品牌定位與轉換目標。' },
      { title: 'AI導入', content: '客製化導入 AI 工具與流程，強化團隊效率與洞察力。' },
      { title: 'API串接', content: '串接內外部系統與平台，讓數據與服務無縫串連。' },
    ],
    cta: '網站架設',
  },
  process: {
    hand: '你可以對我們有期待',
    lead: '我們可以',
    steps: ['精準行銷策略', '內容成長執行', '數據優化迭代'],
    cta: '了解行銷內容',
  },
  news: {
    hand: '最新消息',
    prev: '上一則',
    next: '下一則',
    items: [
      { date: '2026年2月6日', title: '破除翻譯迷思：台灣品牌打入歐美市場的「跨國 SEO」落地實戰指南', image: '/oversea-seo-guide-cover-1400x788.jpg' },
      { date: '2026年2月1日', title: '2026 年，台灣品牌進攻歐美市場，做 SEO 還有效嗎？', image: '/2026-is-seo-still-worth-it-cover-1400x788.jpg' },
      { date: '2025年12月19日', title: '為什麼「網站翻譯」根本不是「國際SEO」？跨境擴張的四大隱形大坑', image: '/translate-seo-1400x788.jpg' },
      { date: '2025年11月22日', title: '你的 SEO 只是「排名看爽的」嗎？為什麼「名單型SEO」與 Landing Page 才是企業獲利的唯一解', image: '/seo-leads-cover-1400x788.jpg' },
    ],
  },
  bigCta: {
    body: '我們深入了解需求，依品牌創造最適合的行銷策略與方法，進而不斷優化與改進，品牌的成長就是我們共同的目標。無論您是一家小型新創企業，還是一個已經穩固的品牌，我們都將全心投入，幫助您實現成功。與鏈客團隊合作，您不僅得到了專業的行銷服務，還擁有一個真正關心您業務成長的夥伴。我們的成功建立在您的成功之上，這就是我們為之努力的原因。',
    cta: '馬上諮詢',
  },
  footer: {
    contact: ['02-66039088', 'service@blazelink.co'],
    copyright: 'Copyright 2026 © 鏈客策略行銷股份有限公司',
    privacy: '隱私權政策',
    terms: '服務條款',
  },
}
