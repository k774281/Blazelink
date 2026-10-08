/*
 * 關於鏈客 copy, from the Figma frame "桌機 1920 — 關於鏈客" (303:237).
 *
 * The text is shared with the marketing site's about page
 * (martech-page/app/_data/about.js); only "04 — HOW WE BUILD" is specific to
 * this site. Photos are copies of the marketing site's, in /public/about.
 */

import { asset } from "../_lib/base";

export const header = {
  display: "ABOUT",
  title: "關於鏈客",
  lead: ["策略行銷應該是一場冒險，一場啟發，", "而我們是您的冒險夥伴，為您鏈接品牌的成功。"],
};

export const philosophy = {
  eyebrow: "01 — PHILOSOPHY",
  statement: ["我們不只是提供服務，", "更是深入理解品牌的", "事業夥伴。"],
  body: ["無論您是正在啟程的新創公司，還是尋求突破的成熟品牌，我們都將投入全部熱情與專業，協助您拓展影響力與營收成長。"],
  closing: "我們的成功建立在您的成功之上，這就是我們為之努力的原因。",
  image: asset("/about/about-philosophy.webp"),
};

// Paragraphs come as runs so the emphasis travels with the copy.
export const dualEngine = {
  eyebrow: "02 — DUAL ENGINE",
  title: ["策略與科技，", "是我們的雙引擎。"],
  paragraphs: [
    [{ text: "我們深知，在高度競爭的市場中，創意只是起點，" }, { text: "精準才是勝負關鍵", strong: true }, { text: "。" }],
    [
      { text: "鏈客善用" },
      { text: "行銷科技（MarTech）", strong: true },
      { text: "打造數位基礎，運用自動化工具、受眾分析與漏斗設計，提高每一次行銷投資的轉換效率。讓每一次曝光，不只是傳遞訊息，更是策略推進的一環。" },
    ],
  ],
  images: [asset("/about/about-strategy.webp"), asset("/about/img-6.webp")],
};

export const allInOne = {
  eyebrow: "03 — ALL IN ONE",
  title: "讓行銷變得簡單有效。",
  image: asset("/about/img-7.webp"),
  paragraphs: [
    "從市場研究、內容策略、網站設計、SEO優化，到廣告佈局與自動化銷售流程，鏈客團隊整合各領域專業，為您打造高效且具延展性的行銷系統。",
    "您不用再分頭協調設計師、廣告商、網站工程師與顧問，我們是您唯一需要對接的行銷夥伴，讓您省下溝通成本，專注本業，穩健成長。",
  ],
  scopeLabel: "涵蓋範疇",
  scope: ["市場研究", "內容策略", "網站設計", "SEO優化", "廣告佈局", "自動化銷售流程"],
  // This site's own discipline is picked out among the others.
  highlight: "網站設計",
};

export const howWeBuild = {
  eyebrow: "04 — HOW WE BUILD",
  title: "網站，我們這樣做。",
  more: { label: "看我們做過的網站", href: "/cases" },
  items: [
    { no: "01", title: "先設計、再開工", body: "開發前先用 Figma 交出每一頁的桌機與手機設計，確認符合需求才動工，做出來不會跟想像的不一樣。" },
    { no: "02", title: "網站資產屬於你", body: "網域、主機與 WordPress 後台都登記在你的名下，想換廠商也帶得走，不綁約、不綁主機。" },
    { no: "03", title: "上線後自己改得動", body: "後台欄位全部中文標示，並錄製操作教學。更新文字、換照片、發布消息，都不必等廠商。" },
  ],
};

export const results = {
  eyebrow: "05 — RESULTS",
  title: "成效，看得見。",
  items: [
    {
      no: "01",
      title: "降低廣告成本",
      body: "先把受眾輪廓與訊息架構收斂好，再決定投放配置，預算就不會分散在無法收斂成名單的流量上。同一筆預算買到的有效曝光變多，單一名單的取得成本自然往下走。",
      image: asset("/about/img-8.webp"),
    },
    {
      no: "02",
      title: "提高名單品質",
      body: "表單、行為紀錄與名單分級串成一條動線，每一次進站都留下可追蹤的軌跡。業務接手時拿到的不只是一組聯絡方式，而是一份已經知道對方在意什麼、走到哪一步的名單。",
      image: asset("/about/img-9.webp"),
    },
    {
      no: "03",
      title: "縮短成交週期",
      body: "從第一次曝光到成交，中間每一段都由自動化流程接手跟進，不必等業務回頭手動撈名單。該被提醒的人準時收到訊息，猶豫的時間縮短，成交的節奏也跟著往前推。",
      image: asset("/about/img-10.webp"),
    },
  ],
};

export const founder = {
  eyebrow: "06 — FOUNDER",
  name: "BEN",
  role: "創辦人　|　執行長",
  portrait: asset("/about/img-11.webp"),
  lead: "Ben 不只是網頁全端工程師，更是精準行銷的實戰顧問。",
  body: [
    "曾任美商金融集團華語區負責人的他擅長從商業目標出發，整合資訊架構與行銷科技（MarTech），打造具有商業價值的數位解決方案。無論是用戶旅程優化與成效追蹤，還是資料串接、自動化流程，他都能親手落地執行，並協助客戶用最小資源創造最大成效。",
    "他的角色不限於技術執行，更能站在經營者高度思考整體行銷策略，是鏈客背後兼顧技術脈絡與行銷目標的靈魂人物。",
  ],
  skills: ["行銷科技與自動化", "精準行銷策略", "全端開發", "數據串接與追蹤", "數位轉型顧問"],
  cta: { label: "寫信給 Ben", href: "mailto:service@blazelink.co" },
};

export const cta = {
  eyebrow: "CONTACT",
  title: "聯繫我們，開始規劃你的網站。",
  label: "聊聊你的想法",
  href: "/contact",
};
