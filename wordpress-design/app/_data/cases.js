/*
 * Cases page copy, from the Figma frame "桌機 1920 — 網站案例" (201:202).
 *
 * Images are /home/demo-N.webp, numbered top to bottom and left to right
 * through the page: the WordPress sites take 1–5, custom features 6–11,
 * automation 12–13, creative 14–16, enterprise 17–18.
 *
 * Each section's `key` is also its filter id; the tab counts are derived from
 * the items, so adding a case updates them.
 */

import { asset } from "../_lib/base";

export const header = {
  breadcrumb: "首頁  /  網站案例",
  display: "CASES",
  title: "網站案例",
  lead: ["與 20 多個品牌合作，從形象網站、客製功能到自動化系統，", "每一個作品都兼具美感與功能。"],
};

const img = (n) => asset(`/home/demo-${n}.webp`);

export const sections = [
  {
    key: "wordpress",
    tab: "WordPress 網站製作",
    eyebrow: "01 — WORDPRESS",
    title: "WordPress 網站製作",
    lead: ["結合 Figma 設計與 WordPress／PHP 開發，", "上線後你也能自己更新內容。"],
    items: [
      {
        name: "GOGOHSU MUSEUM",
        latin: true,
        tags: ["精品時尚", "形象網站"],
        body: "高端訂製藝術品牌，用展覽般的版面呈現作品。",
        href: "https://gogohsu.com",
        image: img(1),
      },
      {
        name: "成智聯合會計師事務所",
        tags: ["專業服務", "形象網站"],
        body: "數位會計服務，把專業流程整理得清楚好懂。",
        href: "https://pwcpa.one",
        image: img(2),
      },
      {
        name: "曜畫廊 Gallery de Sol",
        latin: true,
        tags: ["藝術推廣", "形象網站"],
        body: "版畫藝術推廣機構，讓作品成為網站的主角。",
        // The link handed over carried a Google Analytics `_gl` linker parameter
        // from one browsing session; it is dropped so every visitor gets a clean URL.
        href: "https://gallerydesol.com/",
        image: img(3),
      },
      {
        name: "美成移民",
        tags: ["顧問服務", "形象網站"],
        body: "海外資產配置顧問，建立值得信任的品牌形象。",
        href: "https://masonsimmigrate.com",
        image: img(4),
      },
      {
        name: "Yifei 亦飛貨運",
        tags: ["國際物流", "形象網站"],
        body: "中國到美國的整櫃海運服務，船期與報價一目了然。",
        href: "https://yifeidelivery.com/yifei-shipping/",
        image: img(5),
      },
    ],
    cta: { eyebrow: "NEXT", title: ["下一個，", "是你的品牌。"], label: "客製你的品牌形象", href: "/contact" },
  },
  {
    key: "custom",
    tab: "客製化功能",
    eyebrow: "02 — CUSTOM",
    title: "額外客製化功能",
    lead: ["針對產業需求開發的功能模組，", "讓網站不只是展示，還能幫你做事。"],
    items: [
      { name: "勞務報酬單生成器", platform: "WORDPRESS", body: "輸入資料就自動產生勞報單，省下行政時間。", image: img(6) },
      { name: "薪資計算機", platform: "WORDPRESS", body: "在網站上直接試算，讓專業服務更容易被理解。", image: img(7) },
      { name: "AI 企業健檢測驗", platform: "WORDPRESS", body: "互動問答搭配 AI 分析，把訪客變成諮詢名單。", image: img(8) },
      { name: "遺產試算分配工具", platform: "WORDPRESS", body: "輸入條件即可試算分配結果，複雜規則一目了然。", image: img(9) },
      { name: "紅利點數模組", platform: "SHOPIFY", body: "累積與折抵點數，讓顧客願意再回來購買。", image: img(10) },
      { name: "證書模組", platform: "SHOPIFY", body: "購買或完課後自動發放證書，流程不用人工處理。", image: img(11) },
    ],
  },
  {
    key: "automation",
    tab: "行銷自動化",
    eyebrow: "03 — AUTOMATION",
    title: "行銷自動化系統",
    lead: ["結合生成式 AI 與自動化工具，", "讓內容每天自己更新。"],
    items: [
      {
        name: "藝術展訊自動分享",
        body: "Exhibique 藝廊系統：自動整理展覽資訊並分享，藝廊不用每天手動發文。",
        chips: ["GPT", "Make"],
        image: img(12),
      },
      {
        name: "金融新聞自動平台",
        body: "每日監控新聞、自動改寫並排程發布，網站內容持續更新。",
        chips: ["GPT", "排程發布"],
        image: img(13),
      },
    ],
  },
  {
    key: "creative",
    tab: "創意小物",
    eyebrow: "04 — CREATIVE",
    title: "創意小物",
    lead: ["技術與創意結合的互動作品，", "讓品牌被記住，也能順手累積名單。"],
    items: [
      { name: "生日大冒險", body: "互動式生日禮物網站，把祝福做成一段旅程。", image: img(14) },
      { name: "新年專屬金籤", body: "數位賀卡結合行銷漏斗，節慶也能累積名單。", image: img(15) },
      { name: "照片打卡集點卡", body: "不用登入的數位集點系統，活動現場就能用。", image: img(16) },
    ],
  },
  {
    key: "enterprise",
    tab: "企業應用",
    eyebrow: "05 — ENTERPRISE",
    title: "企業應用案例",
    lead: ["為企業內部流程打造的系統，", "品牌名稱依合約保密。"],
    items: [
      { name: "廠商管理系統", body: "追蹤採購流程與廠商績效，把散落在表單裡的資料集中管理。", chips: ["採購流程", "績效管理"], image: img(17) },
      { name: "企業內部勞報單系統", body: "自動計算稅額並產生報表，減少人工核對的錯誤。", chips: ["自動稅額", "報表生成"], image: img(18) },
    ],
  },
  {
    key: "api",
    tab: "API 串接",
    eyebrow: "06 — API",
    title: "一站式 API 串接",
    lead: ["透過 REST API 與 Webhook，", "把網站和你正在用的工具串在一起。"],
    items: [
      { name: "LINE", body: "即時互動", icon: asset("/cases/icon-line.svg") },
      { name: "Google Sheets", body: "報表同步", icon: asset("/cases/icon-google-sheets.svg"), iconSize: [29.0671, 35.8338], iconDisc: true },
      { name: "Ragic", body: "ERP 數據管理", icon: asset("/cases/icon-ragic.svg") },
      { name: "Stripe", body: "金流串接", icon: asset("/cases/icon-stripe.svg") },
      { name: "Mailchimp", body: "行銷自動化", icon: asset("/cases/icon-mailchimp.svg") },
    ],
  },
];

export const cta = {
  eyebrow: "CONTACT",
  title: "聯繫我們，開始規劃你的網站。",
  label: "聊聊你的想法",
  href: "/contact",
};
