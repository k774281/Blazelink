// 聯繫我們 page copy, kept in one place so it can be swapped for headless WP data later.

export const intro = {
  title: ["先聊聊，", "你現在卡在哪一段。"],
  lead: "不用先準備簡報，也不用先想好預算。留下基本資料，我們會在兩個工作天內回覆你。",
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
  topics: ["行銷合作詢問", "講座報名", "其他"],
  submit: "送出諮詢",
  submitting: "送出中…",
  privacy: {
    before: "送出即表示你同意我們依",
    link: "《隱私權政策》",
    // The policy already lives on WordPress. Absolute while this site is on its
    // own domain; it keeps working once blazelink.co proxies both.
    href: "https://blazelink.co/privacy-policy/",
    after: "處理你提供的資料。",
  },
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
