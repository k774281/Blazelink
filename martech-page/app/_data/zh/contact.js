// 聯繫我們 page copy, kept in one place so it can be swapped for headless WP data later.

import { WEB_DESIGN_HOME } from "../../_lib/base";

export const intro = {
  // The web-design site, introduced beside the form; `more` links to it.
  title: ["行銷之前，", "先有一個好網站。"],
  lead: "名單從網站開始。鏈客的網站架設團隊從設計藍圖到上線，為品牌打造兼具美感與轉換的形象網站，網站資產完全屬於你。",
  more: { label: "了解網站架設服務", href: WEB_DESIGN_HOME },
  steps: [
    {
      no: "01",
      title: "送出表單",
      body: "花兩分鐘，說說你的品牌和目前卡關的地方。",
    },
    {
      no: "02",
      title: "兩個工作天內回覆",
      body: "若你留了公司網址，回覆時會一併附上初步觀察。",
    },
    {
      no: "03",
      title: "約一次通話",
      body: "線上或電話都可以，我們不採用強迫推銷。",
    },
  ],
  details: [
    { label: "電話", value: "02-66039088" },
    { label: "信箱", value: "service@blazelink.co" },
    { label: "營業時間", value: "週一至週五 10:00–18:00" },
  ],
};

export const form = {
  title: "填寫諮詢表單",
  note: "標示 * 為必填欄位，約需兩分鐘。",
  // Must match the options of CF7 form 644's [select* your-topic] word for word
  // (the slash in 網站設計/開發 is half-width): CF7 rejects any other value.
  topics: ["顧問諮詢", "網站健檢", "網站設計/開發", "SEO關鍵字", "行銷自動化", "AI導入", "社群經營", "行銷漏斗", "其他"],
  submit: "送出諮詢",
  submitting: "送出中…",
  privacy: {
    before: "送出即表示你同意我們依",
    link: "《隱私權政策》",
    href: "/privacy-policy",
    after: "處理你提供的資料。",
  },
  // Google asks for this wording wherever its reCAPTCHA badge is hidden.
  recaptcha: ["本網站受 reCAPTCHA 保護，並適用 Google ", "隱私權政策", "與", "服務條款", "。"],
  // Wording the design fixes for the one error it shows; the rest follow it.
  errors: {
    required: "此欄位為必填。",
    email: "請填寫正確的電子郵件格式。",
    url: "請填寫完整網址，包含 https://。",
  },
  failure: "送出失敗，請稍後再試，或直接來信 service@blazelink.co。",
};

export const success = {
  title: "已收到你的諮詢",
  body: "我們會在兩個工作天內回覆。若你留了公司網址，回覆時會一併附上初步觀察。",
  cta: "回到首頁",
};
