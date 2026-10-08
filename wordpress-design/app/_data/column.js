/*
 * 專欄 list page copy, from the Figma frame "桌機 1920 — 專欄" (204:206).
 *
 * The posts stand in for the WordPress "網站架設專欄" category until the CMS is
 * wired up, newest first; the first one is the featured post. Photos are
 * borrowed from /public/home for now (page-1..5 are the ones the article page
 * shows: the featured post's cover, its inline image, and the three related posts). The last three posts exist only so the
 * category counts in the design (5 / 4 / 3) and its second page add up.
 */

import { asset } from "../_lib/base";

export const header = {
  display: "COLUMN",
  title: "專欄",
  lead: ["網站設計、WordPress 教學與品牌形象，", "做一個好網站之前，你需要知道的事都在這裡。"],
};

export const categories = ["網站設計", "WordPress 教學", "品牌形象"];

export const posts = [
  {
    slug: "website-material-checklist",
    date: "2026.09.24",
    category: "網站設計",
    title: "形象網站要準備什麼？開工前的 5 個素材清單",
    excerpt: "logo、品牌色、照片、文案、參考網站——提前備好，設計會更貼近你想要的樣子。這篇整理開工前最常被問到的素材，以及每一項要準備到什麼程度。",
    image: asset("/home/page-1.webp"),
  },
  {
    slug: "wordpress-admin-in-10-minutes",
    date: "2026.09.10",
    category: "WordPress 教學",
    title: "上線後自己改內容：WordPress 後台 10 分鐘上手",
    excerpt: "不用寫程式，也能更新文字、換照片、發布最新消息。",
    image: asset("/home/homepage-7.webp"),
  },
  {
    slug: "first-impression-in-3-seconds",
    date: "2026.08.28",
    category: "品牌形象",
    title: "網站是品牌的第一印象：訪客 3 秒內在看什麼？",
    excerpt: "從首屏構圖到字體選擇，拆解讓人留下來的關鍵。",
    image: asset("/home/page-3.webp"),
  },
  {
    slug: "template-or-custom",
    date: "2026.08.12",
    category: "網站設計",
    title: "套版還是客製？選擇前先想清楚這 3 件事",
    excerpt: "預算、時程與未來擴充需求，決定哪一種比較適合你。",
    image: asset("/home/homepage-6.webp"),
  },
  {
    slug: "astra-vs-flatsome",
    date: "2026.07.30",
    category: "WordPress 教學",
    title: "Astra 和 Flatsome 怎麼選？兩款佈景主題比一比",
    excerpt: "版型彈性、速度與學習成本，依你的需求挑對工具。",
    image: asset("/home/astra-pro.webp"),
  },
  {
    slug: "responsive-design-essentials",
    date: "2026.07.15",
    category: "網站設計",
    title: "手機版不是縮小版：響應式設計的 4 個重點",
    excerpt: "大部分訪客用手機看你的網站，這些細節決定他們會不會留下。",
    image: asset("/home/homepage-1.webp"),
  },
  {
    slug: "photography-for-brand-sites",
    date: "2026.06.28",
    category: "品牌形象",
    title: "好照片勝過千言萬語：形象網站的攝影準備",
    excerpt: "什麼時候需要專業拍攝？哪些素材可以先用手機補上？",
    image: asset("/home/page-4.webp"),
  },
  {
    slug: "domain-hosting-ssl",
    date: "2026.06.10",
    category: "WordPress 教學",
    title: "網域、主機、SSL 一次搞懂",
    excerpt: "架站前最容易混淆的三件事，以及為什麼它們都該登記在你名下。",
    image: asset("/home/homepage-3.webp"),
  },
  {
    slug: "from-figma-to-launch",
    date: "2026.05.22",
    category: "網站設計",
    title: "從 Figma 到上線：一個形象網站的誕生",
    excerpt: "用一個實際案例，帶你看完設計藍圖到正式上線的每一步。",
    image: asset("/home/page-5.webp"),
  },
  {
    slug: "brand-colours-for-the-web",
    date: "2026.05.08",
    category: "品牌形象",
    title: "品牌色怎麼挑？從 logo 延伸出一整套網站配色",
    excerpt: "主色、輔助色與中性色的比例，決定網站看起來穩重還是活潑。",
    image: asset("/home/bg-1.webp"),
  },
  {
    slug: "plugins-worth-installing",
    date: "2026.04.20",
    category: "WordPress 教學",
    title: "外掛裝越多越好嗎？形象網站必備的 5 個外掛",
    excerpt: "裝對外掛省時間，裝錯外掛拖慢速度。這幾個是我們每個案子都會用的。",
    image: asset("/home/homepage-4.webp"),
  },
  {
    slug: "before-a-redesign",
    date: "2026.04.02",
    category: "網站設計",
    title: "網站改版前，先檢查這 6 個地方",
    excerpt: "改版不一定要全部重來，先找出真正讓訪客離開的原因。",
    image: asset("/home/demo-12.webp"),
  },
];

export const consult = {
  title: "想直接聊你的網站？",
  body: "告訴我們你的品牌與需求，我們會盡快與你聯繫。",
  label: "預約諮詢",
  href: "/contact",
};

export const cta = {
  eyebrow: "CONTACT",
  title: "聯繫我們，開始規劃你的網站。",
  label: "聊聊你的想法",
  href: "/contact",
};

export const PAGE_SIZE = 8;

export const postHref = (post) => `/column/${post.slug}`;

/*
 * Article bodies, from the Figma frame "桌機 1920 — 專欄文章內頁" (206:210).
 *
 * `html` is written the way the WordPress block editor will hand it over, so
 * the page can swap this for `content.rendered` without changing shape: plain
 * h2 / p / ul / blockquote / figure, with the checklist as a list carrying the
 * block style class "is-style-checklist". Only the featured post has a body in
 * the design; the others fall back to their excerpt until the CMS supplies one.
 */
export const articles = {
  "website-material-checklist": {
    readMinutes: 6,
    // The header carries just the excerpt's first sentence.
    lead: "logo、品牌色、照片、文案、參考網站——提前備好，設計會更貼近你想要的樣子。",
    tags: ["形象網站", "網站設計", "開工準備"],
    html: `
<h2>為什麼要先準備素材？</h2>
<p>做網站最常卡住的地方，往往不是設計或技術，而是素材。設計師拿到的資料越完整，設計稿就越能貼近你心裡的樣子，來回修改的次數也會少很多。以下是開工前最值得先備好的 5 類素材。</p>
<h2>1. Logo 與品牌識別</h2>
<p>請提供向量格式（AI、SVG 或 PDF）的 logo，並附上橫式、直式與單色版本。如果還沒有完整的品牌識別，也可以先提供目前在用的版本，我們會在設計藍圖階段一起調整。</p>
<ul class="is-style-checklist">
<li>向量格式的 logo 檔案</li>
<li>橫式／直式／單色版本</li>
<li>品牌使用規範（如果有）</li>
</ul>
<h2>2. 品牌色與字體</h2>
<p>主色、輔助色的色碼（HEX 或 RGB）會決定整個網站的氛圍。字體則影響閱讀感受，若有指定的品牌字體，請一併提供授權資訊。</p>
<figure class="wp-block-image"><img src="${asset("/home/page-2.webp")}" alt="品牌色票與字體搭配的範例" width="1672" height="941" loading="lazy" decoding="async"><figcaption>圖說：品牌色票與字體搭配的範例</figcaption></figure>
<h2>3. 照片素材</h2>
<p>形象網站的質感，有一大半來自照片。產品照、團隊照、空間照都很重要，解析度至少要有 2000px 寬。</p>
<blockquote><p>好照片勝過千言萬語。如果預算有限，與其把錢花在多一個功能，不如先拍一組好照片。</p></blockquote>
<h2>4. 文案</h2>
<p>每一頁想說什麼，最好先有一份大綱。不需要寫得完美，我們會在設計階段協助調整語氣與長度。</p>
<ul>
<li>品牌故事與理念</li>
<li>服務或產品介紹</li>
<li>常見問題與聯絡資訊</li>
</ul>
<h2>5. 參考網站</h2>
<p>收集 3～5 個你喜歡的網站，並寫下喜歡的原因——是配色、排版，還是互動方式？這能幫助我們更快抓到你要的方向。</p>
<h2>結語</h2>
<p>素材不必一次到位，但越早開始準備，網站就越快上線。不確定從哪裡開始？可以先找我們聊聊。</p>
`,
    relatedCase: {
      name: "曜畫廊 Gallery de Sol",
      line: "看看照片與品牌色如何撐起一個藝廊網站",
      image: asset("/column/case-gallery-de-sol.png"),
      href: "/cases",
    },
    related: ["first-impression-in-3-seconds", "photography-for-brand-sites", "from-figma-to-launch"],
  },
};

export const articleConsult = {
  title: "素材準備好了，或還不確定？",
  body: "告訴我們你的品牌與需求，我們會從設計藍圖開始陪你完成。",
  label: "預約諮詢",
  href: "/contact",
};

export const articleCta = {
  eyebrow: "CONTACT",
  title: "聯繫我們，開始規劃你的網站。",
  label: "聊聊你的想法",
  href: "/contact",
};

/** Three posts to read next: the article's own picks, else its category, else the latest. */
export function relatedPosts(post) {
  const picks = articles[post.slug]?.related ?? [];
  const others = posts.filter((p) => p.slug !== post.slug);
  const ranked = [
    ...picks.map((slug) => others.find((p) => p.slug === slug)).filter(Boolean),
    ...others.filter((p) => p.category === post.category),
    ...others,
  ];
  return [...new Set(ranked)].slice(0, 3);
}
