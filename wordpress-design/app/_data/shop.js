/*
 * 商城 copy, from the Figma frame "桌機 1920 — 商城" (208:210). Prices were
 * confirmed 2026-09-29 (PRD); the struck-through figure is the list price.
 *
 * Checkout is WooCommerce's own page on the same domain, so "立即購買" is a plain
 * link that puts the product in the cart and opens checkout. `wcId` is the
 * WooCommerce product ID.
 */

import { asset } from "../_lib/base";

export const header = {
  display: "SHOP",
  title: "商城",
  lead: ["我們自己做專案也在用的 WordPress 佈景主題，", "正版授權、價格透明，買了就能開始架站。"],
};

export const intro = { eyebrow: "WORDPRESS THEMES", title: "佈景主題正版授權" };

export const products = [
  {
    slug: "flatsome",
    wcId: 1293,
    kind: "WORDPRESS 佈景主題",
    name: "Flatsome",
    subtitle: "正版授權主題金鑰",
    pitch: "偏好用拖拉方式排版？看看 Flatsome 正版授權金鑰。",
    image: asset("/home/flatsome-logo-600x600.webp"),
    price: 1200,
    listPrice: 1950,
    forWho: "想快速做出電商或形象網站，偏好用拖拉方式排版的人。",
    includes: ["正版授權金鑰", "終身版本更新", "內建 UX Builder 拖拉編輯器"],
    note: "曾用於專案測試・不含 6 個月官方支援",
    delivery: "付款後 12 小時內，以 Email 寄送授權金鑰。",
    detail: {
      lead: "想快速做出電商或形象網站、偏好用拖拉方式排版的人，Flatsome 內建的 UX Builder 讓你直接在頁面上調整版型。",
      deliveryNote: "付款後 12 小時內，我們會以 Email 寄送授權金鑰。",
      specs: [
        ["商品名稱", "Flatsome 正版授權主題金鑰"],
        ["交付方式", "Email 寄送授權金鑰（付款後 12 小時內）"],
        ["付款方式", "信用卡（綠界）"],
        ["發票", "電子發票，付款成功後自動開立"],
        ["官方支援", "不含 6 個月官方支援"],
      ],
    },
  },
  {
    slug: "astra-pro",
    wcId: 1285,
    kind: "WORDPRESS 佈景主題",
    name: "Astra Pro",
    subtitle: "Essential Toolkit 永久版",
    pitch: "習慣用 Elementor 排版？看看 Astra Pro 永久版。",
    image: asset("/home/astra-pro.webp"),
    price: 1999,
    listPrice: 6990,
    forWho: "習慣用 Elementor 排版、想從大量模板快速起步的人。",
    includes: ["300+ 預設模板", "支援 Elementor", "相容 WooCommerce"],
    delivery: "公司授權代綁：付款後我們會寄信，回覆要啟用的網站網址即可。",
    // Product page (Figma 229:210). `pending` marks values still to be confirmed.
    detail: {
      gallery: [
        { src: asset("/home/astra-pro.webp"), alt: "Astra Pro 商品圖" },
        { src: asset("/home/astra-pro-screenshot2.webp"), alt: "Astra Pro 模板畫面" },
        { src: asset("/home/astra-pro-screenshot.webp"), alt: "Astra Pro 後台畫面" },
      ],
      lead: "習慣用 Elementor 排版、想從大量模板快速起步的人，用 Astra Pro 可以省下大部分的版型設定時間。",
      includes: ["300+ 預設模板", "支援 Elementor", "相容 WooCommerce", "永久版授權"],
      deliveryTitle: "交付方式：公司授權代綁",
      deliveryNote: "付款後我們會寄信給你，回覆要啟用的網站網址，我們就會協助啟用。我們不會向你索取 WordPress 後台密碼。",
      // WordPress product description; styled like a column article body.
      html: `
<p>Astra 是一款輕量、載入快速的 WordPress 佈景主題。Pro 版加上 Essential Toolkit 之後，可以直接匯入現成的網站模板，再用 Elementor 調整成你的品牌樣子。</p>
<figure class="wp-block-image"><img src="${asset("/home/detail.webp")}" alt="用筆電編輯 Astra 網站模板" width="1672" height="941" loading="lazy" decoding="async"></figure>
<p>適合想自己動手架站、但不想從零開始排版的品牌主。</p>
`,
      specs: [
        ["商品名稱", "Astra Pro Essential Toolkit"],
        ["授權版本", "永久版"],
        ["交付方式", "公司授權代綁（付款後回信提供網站網址）"],
        ["付款方式", "信用卡（綠界）"],
        ["發票", "電子發票，付款成功後自動開立"],
        ["可使用網站數", "（待確認）", "pending"],
        ["官方支援", "（待確認）", "pending"],
      ],
      faq: [
        { q: "付款後多久可以啟用？", a: "付款後我們會在（X 小時，待確認）內寄信，協助你在填寫的網站上啟用授權。" },
        { q: "可以用在幾個網站？", a: "（待確認）" },
      ],
    },
  },
];

export const purchaseInfo = [
  { eyebrow: "PAYMENT", title: "信用卡付款", body: "透過綠界金流，刷卡即時完成付款。" },
  { eyebrow: "INVOICE", title: "電子發票自動開立", body: "可選個人載具、捐贈或公司統編。" },
  { eyebrow: "CHECKOUT", title: "免註冊結帳", body: "填寫 Email 即可結帳，訂單確認信會寄到信箱。" },
];

/* Questions every product page answers, after its own. */
export const commonFaq = [
  { q: "可以退款嗎？", a: "授權序號寄出後即完成交付，依法恕不退換；若序號無法啟用，請在 3 天內與我們聯繫。", link: { label: "退換貨政策", href: "/terms#refund" } },
  { q: "不會操作 WordPress 怎麼辦？", a: "可以預約諮詢，交給我們從設計藍圖開始幫你完成。", link: { label: "預約諮詢", href: "/contact" } },
];

export const perks = ["信用卡付款", "電子發票自動開立", "免註冊結帳"];

export const consult = { text: "不想自己架？交給我們，從設計藍圖開始幫你完成。", label: "預約諮詢", href: "/contact" };

export const ntd = (n) => `NT$${n.toLocaleString("en-US")}`;
export const productHref = (p) => `/shop/${p.slug}`;
/*
 * buy-now asks the WordPress snippet "Buy now empties the cart" to drop
 * whatever else is in the cart first, so the order is this product alone and
 * coming back to the link doesn't make it two.
 */
export const buyHref = (p) => `/checkout/?add-to-cart=${p.wcId}&buy-now=1`;
