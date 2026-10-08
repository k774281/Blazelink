/*
 * 聯繫我們 copy, from the Figma frame "桌機 1920 — 聯繫我們" (318:240) and its
 * states board (318:470).
 *
 * The form sends to the same Contact Form 7 form on blazelink.co as the
 * marketing site's, so its fields map one to one onto that form and its topics
 * are a subset of the form's own options.
 */

/*
 * The site is static and served from blazelink.co itself, so the browser posts
 * straight to CF7's REST endpoint, with the reCAPTCHA v3 token CF7 checks — the
 * same as the WordPress contact page does. The site key is public by design.
 */
export const cf7 = {
  endpoint: "https://blazelink.co/wp-json/contact-form-7/v1/contact-forms/644/feedback",
  formId: "644",
  unitTag: "wpcf7-f644-o1",
  recaptchaKey: "6LdJFacoAAAAAKhX4fV6RSQtwWWsnCuveu47V1pH",
  // Our field names on the left, the CF7 form's on the right.
  fields: {
    name: "your-name",
    company: "your-company",
    website: "your-url",
    email: "your-email",
    topic: "your-topic",
    message: "your-message",
  },
};

export const header = {
  display: "CONTACT",
  title: "聯繫我們",
  lead: ["不用先準備簡報，也不用先想好預算。", "留下基本資料，我們會在兩個工作天內回覆你。"],
};

export const intro = {
  eyebrow: "LET’S TALK",
  title: ["先聊聊，", "你想要什麼樣的網站。"],
  lead: "有現成網站想改版，或是從零開始都可以。先告訴我們你的品牌和需求，我們會從設計藍圖開始陪你規劃。",
  steps: [
    { no: "01", title: "送出表單", body: "花兩分鐘，說說你的品牌和想做的網站。" },
    { no: "02", title: "兩個工作天內回覆", body: "若你留了現有網址，回覆時會一併附上初步觀察。" },
    { no: "03", title: "約一次通話", body: "線上或電話都可以，我們不採用強迫推銷。" },
  ],
  details: [
    { label: "電話", value: "02-66039088", href: "tel:0266039088" },
    { label: "信箱", value: "service@blazelink.co", href: "mailto:service@blazelink.co" },
    { label: "營業時間", value: "週一至週五 10:00–18:00" },
  ],
};

export const form = {
  title: "填寫諮詢表單",
  note: "標示 * 為必填欄位，約需兩分鐘。",
  // Each must match an option of CF7 form 644's [select* your-topic] word for
  // word (the slash in 網站設計/開發 is half-width): CF7 rejects any other value.
  topics: ["網站設計/開發", "網站健檢", "行銷漏斗", "其他"],
  defaultTopic: "網站設計/開發",
  submit: "送出諮詢",
  submitting: "送出中…",
  privacy: {
    before: "送出即表示你同意我們依",
    link: "《隱私權政策》",
    href: "https://blazelink.co/privacy-policy/",
    after: "處理你提供的資料。",
  },
  errors: {
    required: "此欄位為必填。",
    email: "請填寫正確的電子郵件格式。",
    url: "請填寫完整網址，包含 https://。",
  },
  failure: "送出失敗，請稍後再試，或直接來信 service@blazelink.co。",
};

export const success = {
  eyebrow: "SENT",
  title: "已收到你的諮詢",
  body: "我們會在兩個工作天內回覆。若你留了現有網站網址，回覆時會一併附上初步觀察。",
  primary: { label: "先看看網站案例", href: "/cases" },
  secondary: { label: "回到首頁", href: "/" },
};
