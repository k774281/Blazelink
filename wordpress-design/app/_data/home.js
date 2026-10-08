/*
 * Homepage copy, taken from the Figma frame "桌機 1920 — 網站架設首頁".
 * Strings marked PLACEHOLDER are still placeholder text in the design itself and
 * need final copy before launch. The column and news entries will come from the
 * WordPress "網站架設專欄" category once the CMS is wired up.
 */

import { asset } from "../_lib/base";

export const nav = [
  { label: "網站案例", href: "/cases" },
  { label: "關於鏈客", href: "/about" },
  { label: "專欄", href: "/column" },
  { label: "商城", href: "/shop" },
];

export const contactHref = "/contact";

export const hero = {
  title: ["讓網站，", "成為品牌的", "第一印象。"],
  lead: "從設計藍圖到上線，為品牌打造兼具美感與功能的形象網站。先看設計、再開工，網站資產完全屬於你。",
  primary: { label: "預約諮詢", href: "/contact" },
  secondary: { label: "看作品", href: "/cases" },
};

export const news = [
  { date: "2026.09.24", category: "網站設計", title: "形象網站要準備什麼？開工前的 5 個素材清單", href: "/column" },
  { date: "2026.09.10", category: "WordPress 教學", title: "上線後自己改內容：WordPress 後台 10 分鐘上手", href: "/column" },
  { date: "2026.08.28", category: "品牌形象", title: "網站是品牌的第一印象：訪客 3 秒內在看什麼？", href: "/column" },
];

export const works = {
  eyebrow: "01 — WORKS",
  title: "精選作品",
  lead: "與 20 多個品牌合作，結合 Figma 設計與 WordPress 開發，兼具美感與功能。",
  more: { label: "看更多案例", href: "/cases" },
  items: [
    { name: "GOGOHSU MUSEUM", tag: "精品時尚", latin: true, image: asset("/home/demo-1.webp") },
    { name: "成智聯合會計師事務所", tag: "專業服務", image: asset("/home/demo-2.webp") },
    { name: "曜畫廊 Gallery de Sol", tag: "藝術推廣", image: asset("/home/demo-3.webp") },
    { name: "美成移民", tag: "顧問服務", image: asset("/home/demo-4.webp") },
    {
      name: "Yifei FCL Shipping",
      tag: "跨境物流",
      latin: true,
      image: asset("/home/demo-5.webp"),
    },
  ],
};

export const process = {
  eyebrow: "02 — PROCESS",
  title: "先設計、再開工",
  lead: "開發前先交出完整的設計藍圖，確認符合需求才動工，做出來不會跟想像的不一樣。",
  steps: [
    {
      no: "01",
      image: asset("/home/homepage-4.webp"),
      name: "需求訪談",
      heading: "先把問題問清楚，再談設計",
      body: "先釐清你的客戶、競爭對手與這個網站要解決的問題，再盤點現有素材，產出一份雙方確認的頁面架構與內容清單。",
    },
    {
      no: "02",
      image: asset("/home/homepage-5.webp"),
      name: "設計藍圖",
      heading: "上線前，先看見完整的網站",
      body: "用 Figma 畫出每一頁的桌機與手機版本，字級、間距與顏色全部定稿。這個階段改幾次都不花工程成本，你滿意了才動工。",
    },
    {
      no: "03",
      image: asset("/home/homepage-6.webp"),
      name: "確認後開工",
      heading: "設計定案才動工，不邊做邊改",
      body: "設計定案後才動工，用 WordPress 一比一還原，後台欄位全部中文標示。過程中提供測試網址，進度隨時看得到。",
    },
    {
      no: "04",
      image: asset("/home/homepage-7.webp"),
      name: "上線與交接",
      heading: "交給你的不只是網站，是資產",
      body: "上線前逐項檢查連結、表單與各裝置顯示，並錄製後台教學。網域、主機與帳號全數轉到你名下，隨時帶得走。",
    },
  ],
};

export const ownership = {
  eyebrow: "03 — OWNERSHIP",
  title: "網站資產，完全屬於你。",
  lead: "絕不綁架客戶的網站資源。網域、主機與內容都登記在你的名下，想換廠商也帶得走。",
  rows: [
    { label: "網域", ours: "登記在你的名下，所有權完整交付", theirs: "登記在廠商名下，換廠商就拿不回來", image: asset("/home/homepage-1.webp") },
    { label: "主機", ours: "使用你自己的主機帳號，隨時可以搬", theirs: "綁定廠商方案，搬家要另外付費", image: asset("/home/homepage-2.webp") },
    { label: "內容與後台", ours: "WordPress 後台交給你，自己就能更新", theirs: "只能請廠商改，每次都要等", image: asset("/home/homepage-3.webp") },
  ],
};

export const beyond = {
  eyebrow: "BEYOND",
  kicker: "我們能做的，",
  title: "不只是網站",
  lead: [
    "依產業需求開發的功能模組，以及讓人記得住的互動小物。",
    "形象網站只是起點。診所需要線上預約與看診進度，補習班需要課程報名與繳費紀錄，餐飲需要菜單管理與訂位，物流需要貨態查詢與運費試算——這些都不是套版能解決的，我們依你的實際流程量身開發，讓網站真正接上日常營運，而不是只放著好看。另一半是互動：進場動畫、滑鼠跟隨、捲動時逐段展開的敘事，這些細節不拖慢載入速度，卻能讓人在離開之後還記得你。我們也處理多語系、金流串接、會員專區與後台報表，讓行銷、客服與業務共用同一套系統。這些模組一樣蓋在你自己的主機與後台上，日後要擴充或換人接手都不必綁在我們身上。想知道能做到什麼程度，直接看我們做過的案子最快。",
  ],
  href: "/cases",
};

export const column = {
  eyebrow: "04 — COLUMN",
  title: "專欄",
  lead: "還在評估嗎？先從這裡了解做一個形象網站需要知道的事。",
  categories: [
    { label: "全部", count: 12 },
    { label: "網站設計", count: 5 },
    { label: "WordPress 教學", count: 4 },
    { label: "品牌形象", count: 3 },
  ],
  cta: {
    title: "想直接聊你的網站？",
    body: "告訴我們你的品牌與需求，我們會盡快與你聯繫。",
    label: "預約諮詢",
    href: "/contact",
  },
  posts: [
    {
      date: "2026.09.24",
      category: "網站設計",
      title: "形象網站要準備什麼？開工前的 5 個素材清單",
      image: asset("/home/homepage-4.webp"),
      excerpt: "logo、品牌色、照片、文案、參考網站——提前備好，設計會更貼近你想要的樣子。",
    },
    {
      date: "2026.09.10",
      category: "WordPress 教學",
      title: "上線後自己改內容：WordPress 後台 10 分鐘上手",
      image: asset("/home/homepage-7.webp"),
      excerpt: "不用寫程式，也能更新文字、換照片、發布最新消息。",
    },
    {
      date: "2026.08.28",
      category: "品牌形象",
      title: "網站是品牌的第一印象：訪客 3 秒內在看什麼？",
      image: asset("/home/homepage-5.webp"),
      excerpt: "從首屏構圖到字體選擇，拆解讓人留下來的關鍵。",
    },
    {
      date: "2026.08.12",
      category: "網站設計",
      title: "套版還是客製？選擇前先想清楚這 3 件事",
      image: asset("/home/homepage-6.webp"),
      excerpt: "預算、時程與未來擴充需求，決定哪一種比較適合你。",
    },
  ],
  more: { label: "看全部專欄", href: "/column" },
};

export const footer = {
  company: ["鏈客策略行銷股份有限公司", "形象網站設計 ・ WordPress 架站 ・ 客製化功能"],
  address: "臺北市中正區黎明里館前路2號11樓",
  hours: "營業時間：週一至週五  上午10：00 至 下午6：00",
  phone: "02-66039088",
  email: "service@blazelink.co",
  columns: [
    {
      head: "MENU",
      links: [
        { label: "網站案例", href: "/cases" },
        { label: "關於鏈客", href: "/about" },
        { label: "專欄", href: "/column" },
        { label: "商城", href: "/shop" },
        { label: "聯繫我們", href: "/contact" },
      ],
    },
    {
      head: "SHOP",
      links: [
        { label: "Flatsome", href: "/shop/flatsome" },
        { label: "Astra Pro", href: "/shop/astra-pro" },
        { label: "購物車", href: "/cart" },
      ],
    },
    { head: "CONTACT", links: [{ label: "諮詢", href: "/contact" }] },
  ],
  copyright: "Copyright 2026 © 鏈客策略行銷股份有限公司",
  legal: [
    { label: "服務條款", href: "/terms" },
    { label: "隱私權政策", href: "https://blazelink.co/privacy-policy/" },
    { label: "退款政策", href: "/refund-policy" },
  ],
};
