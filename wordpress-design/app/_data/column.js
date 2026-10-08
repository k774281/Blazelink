/*
 * 專欄 copy, from the Figma frames "桌機 1920 — 專欄" (204:206) and
 * "桌機 1920 — 專欄文章內頁" (206:210).
 *
 * The posts themselves come from WordPress (app/_lib/wp.js) and are shared with
 * the marketing site, which styles them its own way. localPosts holds the posts
 * kept in this repo instead — written the way the block editor hands a body
 * over (plain h2 / p / ul / blockquote / figure, the checklist a list with the
 * block style class "is-style-checklist"), so one can move into WordPress later
 * without changing shape. app/_lib/column.js merges the two.
 */

import { asset } from "../_lib/base";

export const header = {
  display: "COLUMN",
  title: "專欄",
  lead: ["網站設計、行銷科技與經營實務，", "做一個好網站之前，你需要知道的事都在這裡。"],
};

export const localPosts = [
  {
    slug: "website-material-checklist",
    date: "2026.09.24",
    category: "網站架設專欄",
    title: "形象網站要準備什麼？開工前的 5 個素材清單",
    excerpt: "logo、品牌色、照片、文案、參考網站——提前備好，設計會更貼近你想要的樣子。這篇整理開工前最常被問到的素材，以及每一項要準備到什麼程度。",
    // The header carries just the excerpt's first sentence.
    lead: "logo、品牌色、照片、文案、參考網站——提前備好，設計會更貼近你想要的樣子。",
    image: asset("/home/page-1.webp"),
    readMinutes: 6,
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
  },
];

/** Stands in for a WordPress post that has no featured image. */
export const FALLBACK_IMAGE = asset("/home/bg-1.webp");

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

export const articleConsult = {
  title: "想把網站做得更好？",
  body: "告訴我們你的品牌與需求，我們會從設計藍圖開始陪你完成。",
  label: "預約諮詢",
  href: "/contact",
};

export const articleCta = cta;

export const PAGE_SIZE = 8;

export const postHref = (post) => `/column/${post.slug}`;
