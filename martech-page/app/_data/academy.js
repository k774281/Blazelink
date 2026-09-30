// 鏈客商學院 page copy, kept in one place so it can be swapped for headless WP data later.

export const hero = {
  title: "企業主的內容寶庫",
  lead: "從財稅、管理到美感，幫你做出更好決策。",
  bannerNote: "主視覺　圖片待補",
};

export const latest = {
  items: [
    {
      tag: "LMI",
      image: "/figma/academy-card.webp",
      title: "人生十字路口沙盤——沉浸式抉擇推演，預見下一個十年",
      body: "一個下午，用桌遊沙盤把「如果當初……」提前演一遍。安教練特別從大連返台，帶站在事業轉折點的企業主與主管，看清下一步。",
      info: [
        { label: "日期", value: "2026/10/3（六）14:00–17:00" },
        { label: "地點", value: "台北市南京東路三段 311 號 8 樓" },
        { label: "名額", value: "限 25 位，額滿為止" },
        { label: "主辦", value: "LMI台灣" },
      ],
      cta: "立即報名",
      href: "#contact", // TODO: point at the real registration page
    },
    {
      tag: "LMI",
      image: "/figma/academy-card.webp",
      title: "「你設定的目標，真的正在帶你前進嗎？」90 分鐘目標實踐工作坊",
      body: "結合 LMI 全球60年的「全人發展」，專為面臨戰術焦慮與工時失衡的中小企業主、高階經理人量身打造，現場完成專屬的「目標實踐循環藍圖」。",
      info: [
        { label: "日期", value: "9/17（星期四）15:00–16:30" },
        { label: "地點", value: "台北市松山區南京東路三段 311 號 8 樓" },
        { label: "名額", value: "小班制僅限 9 席（免費審核制）" },
        { label: "主辦", value: "LMI台灣" },
      ],
      cta: "立即報名",
      href: "#contact", // TODO: point at the real registration page
    },
  ],
};

export const why = {
  quote:
    "「我們幫助 B2B 品牌建立內容行銷，同時也發現，這些知識能幫助更多企業主做出關鍵決策。鏈客商學院，就是為此而生。」",
  imageNote: "學院形象　圖片待補",
};

export const topics = {
  lead: "這裡的每一篇文章、每一份懶人包，都是與實戰顧問、專家品牌合作授權、整理再製，給認真經營事業的你。",
  items: [
    { no: "01", title: "創業必修課", body: "財會報稅一次懂，幫你避開創業地雷" },
    { no: "02", title: "全人發展計畫", body: "不只是經營事業，而是要 Work-Life Balance" },
    { no: "03", title: "高資產美感學", body: "看懂高端藝術與品味，成為有深度的企業領導者" },
    { no: "04", title: "法律預備室", body: "律師和法務常識，不該只在你出事後出現" },
    { no: "05", title: "行銷科技艙", body: "數位行銷 × 自動化技術，老闆的營運加速器" },
    { no: "06", title: "賦能學院課程", body: "向各領域權威學習，讓知識變現與影響力同步升級" },
  ],
};

export const columns = {
  title: "行銷與財稅，兩條專欄",
  more: "更多內容",
  // TODO: swap for real posts once the CMS is wired up — these carry no hrefs yet.
  tabs: [
    {
      id: "marketing",
      label: "行銷專欄",
      items: [
        { title: "破除翻譯迷思：台灣品牌打入歐美市場的「跨國 SEO」落地實戰指南", date: "2026-08-14" },
        { title: "2026 年，台灣品牌進攻歐美市場，做 SEO 還有效嗎？", date: "2026-08-01" },
        { title: "為什麼「網站翻譯」根本不是「國際SEO」？跨境擴張的四大隱形大坑", date: "2026-07-25" },
        { title: "你的 SEO 只是「排名看爽的」嗎？名單型SEO與 Landing Page 才是企業獲利的唯一解", date: "2026-04-26" },
        { title: "破除 SEO 迷思：別讓「排名第一」成了企業轉型的虛榮指標！", date: "2026-04-15" },
        { title: "捷徑往往最遠：寫給 B2B 品牌的一封 SEO 信", date: "2026-04-01" },
      ],
    },
    {
      // The design names this tab but supplies no articles for it, and inventing
      // titles would imply posts that do not exist. Left empty until real ones land.
      id: "finance",
      label: "財稅專欄",
      items: [],
      empty: "財稅專欄的文章正在準備中，敬請期待。",
    },
  ],
};

// TODO: the design repeats one past event to fill the strip. Needs real records —
// these are the company's own history, so nothing here is invented.
export const pastEvents = {
  items: [
    { date: "2026/9/17", title: "LMI 學習分享會｜台北實體場", note: "過往講座　圖片待補" },
    { date: "2026/4/24", title: "萊特的社交品酒會：商務 × 人脈 × 交友", note: "過往講座　圖片待補" },
    { date: "2026/4/24", title: "萊特的社交品酒會：商務 × 人脈 × 交友", note: "過往講座　圖片待補" },
    { date: "2026/4/24", title: "萊特的社交品酒會：商務 × 人脈 × 交友", note: "過往講座　圖片待補" },
  ],
};

// The page-specific half of the reveal footer.
export const next = {
  title: ["想先聊聊，", "而不是先報名？"],
  body: "講座之外，我們也提供一對一的顧問服務，直接針對你的產業與規模給建議。",
  cta: "免費預約諮詢",
};

export const onThisPage = [
  { label: "最新講座", href: "#latest" },
  { label: "為什麼創辦", href: "#why" },
  { label: "六大主題", href: "#topics" },
  { label: "專欄", href: "#columns" },
  { label: "過往講座", href: "#past-events" },
];
