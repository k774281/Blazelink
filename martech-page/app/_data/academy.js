import { asset } from "../_lib/base";
// 鏈客商學院 page copy, kept in one place so it can be swapped for headless WP data later.

export const hero = {
  title: "企業主的內容寶庫",
  lead: "從財稅、管理到美感，幫你做出更好決策。",
  banner: asset("/img-19.webp"),
};

// The two lectures to feature, newest first. Title, artwork and link come from
// WordPress; the info rows do not exist as fields there — each product states
// them in prose, under labels that differ from one to the next — so they are
// recorded here alongside the card's own summary.
export const latest = {
  tag: "LMI",
  cta: "立即報名",
  items: [
    {
      slug: "lmi-board-1003",
      body: "一個下午，用桌遊沙盤把「如果當初……」提前演一遍。安教練特別從大連返台，帶站在事業轉折點的企業主與主管，看清下一步。",
      info: [
        { label: "日期", value: "2026/10/3（六）14:00–17:00" },
        { label: "地點", value: "台北市南京東路三段 311 號 8 樓" },
        { label: "名額", value: "限 25 位，額滿為止" },
        { label: "主辦", value: "LMI台灣" },
      ],
      // The Accupass listing, which the product's own 短網址 also points at.
      href: "https://www.accupass.com/event/2609171216224165557800",
    },
    {
      slug: "lmi-20260917",
      body: "結合 LMI 全球60年的「全人發展」，專為面臨戰術焦慮與工時失衡的中小企業主、高階經理人量身打造，現場完成專屬的「目標實踐循環藍圖」。",
      info: [
        { label: "日期", value: "9/17（星期四）15:00–16:30" },
        { label: "地點", value: "台北市松山區南京東路三段 311 號 8 樓" },
        { label: "名額", value: "小班制僅限 9 席（免費審核制）" },
        { label: "主辦", value: "LMI台灣" },
      ],
      // No Accupass listing for this one, so registration goes via the product page.
    },
  ],
};

export const why = {
  quote:
    "「我們幫助 B2B 品牌建立內容行銷，同時也發現，這些知識能幫助更多企業主做出關鍵決策。鏈客商學院，就是為此而生。」",
  image: asset("/img-18.webp"),
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
  // Articles come from WordPress at build time — see app/_lib/wp.js. The slugs
  // are the live category slugs on blazelink.co: 行銷科技艙 and 財稅必修課.
  tabs: [
    {
      id: "marketing",
      label: "行銷專欄",
      category: "martech",
      more: "https://blazelink.co/category/martech/",
    },
    {
      id: "finance",
      label: "財稅專欄",
      category: "start-up",
      more: "https://blazelink.co/category/start-up/",
    },
  ],
  empty: "文章載入中，請稍後再試。",
};

// Past events the client named. 【LMI 學習分享會】 was among them but now leads
// 最新講座 instead, so it is not repeated here. Titles, links and artwork come
// from their WordPress product pages; the dates are the event dates stated in
// each page's own copy, which is not a structured field, so they live here.
export const pastEvents = {
  items: [
    {
      date: "2026/4/24",
      title: "萊特的社交品酒會：商務 × 人脈 × 交友",
      href: "https://blazelink.co/product/wright-0424/",
      image:
        "https://blazelink.co/wp-content/uploads/2026/03/Gemini_Generated_Image_tztscttztscttzts-1.jpg",
    },
    {
      date: "2026/3/6",
      title: "手沖咖啡品鑑課：進軍全球市場的咖啡職人教你喝咖啡",
      href: "https://blazelink.co/product/attracafe/",
      image:
        "https://blazelink.co/wp-content/uploads/2026/02/attracafe-cover-2-sim.jpg",
    },
    {
      date: "2025/11/4",
      title: "佳世達轉型策略與投後管理心法——以醫療佈局為例",
      href: "https://blazelink.co/product/qisda/",
      image:
        "https://blazelink.co/wp-content/uploads/2025/10/qista-banner-square.png",
    },
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
