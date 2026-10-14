/*
 * トップページの文言（日本語）。../zh/home.js と同じ構成。
 * ショップは中国語のみのため、日本語メニューには載せない。
 */

import { asset } from "../../_lib/base";

export const nav = [
  { label: "制作実績", href: "/cases" },
  { label: "私たちについて", href: "/about" },
  { label: "コラム", href: "/column" },
];

export const contactHref = "/contact";

export const hero = {
  title: ["Webサイトを、", "ブランドの", "第一印象に。"],
  lead: "設計図から公開まで、美しさと機能を兼ね備えたブランドサイトを制作します。デザインを確認してから着工し、サイトの資産はすべてお客様のものです。",
  primary: { label: "相談を予約する", href: "/contact" },
  secondary: { label: "制作実績を見る", href: "/cases" },
};

export const works = {
  eyebrow: "01 — WORKS",
  title: "制作実績",
  lead: "20を超えるブランドと協働し、FigmaのデザインとWordPressの開発を組み合わせて、美しさと機能を両立させてきました。",
  more: { label: "実績をもっと見る", href: "/cases" },
  items: [
    { name: "GOGOHSU MUSEUM", tag: "ラグジュアリー", latin: true, image: asset("/home/demo-1.webp") },
    // ブランド名は各ブランドの表記のまま。
    { name: "成智聯合會計師事務所", tag: "専門サービス", image: asset("/home/demo-2.webp") },
    { name: "曜畫廊 Gallery de Sol", tag: "アート", image: asset("/home/demo-3.webp") },
    { name: "美成移民", tag: "コンサルティング", image: asset("/home/demo-4.webp") },
    { name: "Yifei FCL Shipping", tag: "国際物流", latin: true, image: asset("/home/demo-5.webp") },
  ],
};

export const process = {
  eyebrow: "02 — PROCESS",
  title: "先に設計、それから着工",
  lead: "開発の前に完全な設計図をお渡しし、ご要望どおりであることを確認してから着工します。想像と違うものができることはありません。",
  steps: [
    {
      no: "01",
      image: asset("/home/homepage-4.webp"),
      name: "ヒアリング",
      heading: "デザインの前に、課題をはっきりさせる",
      body: "お客様の顧客、競合、このサイトで解決したい課題を整理し、手元の素材を棚卸しします。最後に、双方で確認したページ構成とコンテンツのリストをまとめます。",
    },
    {
      no: "02",
      image: asset("/home/homepage-5.webp"),
      name: "設計図",
      heading: "公開前に、サイトの全体像を見る",
      body: "全ページのPC版とスマートフォン版をFigmaで描き、文字サイズ、余白、色まですべて確定します。この段階の修正は何度でも開発コストがかからず、ご納得いただいてから着工します。",
    },
    {
      no: "03",
      image: asset("/home/homepage-6.webp"),
      name: "確認後に着工",
      heading: "デザイン確定後に着工、作りながら変えない",
      body: "デザインが確定してから、WordPressで忠実に再現します。管理画面の項目はすべて分かりやすく表記し、テスト用URLで進捗をいつでもご確認いただけます。",
    },
    {
      no: "04",
      image: asset("/home/homepage-7.webp"),
      name: "公開と引き継ぎ",
      heading: "お渡しするのはサイトではなく、資産です",
      body: "公開前にリンク、フォーム、各デバイスでの表示を一つずつ確認し、管理画面の操作説明を録画します。ドメイン、サーバー、アカウントはすべてお客様の名義に移し、いつでも持ち出せます。",
    },
  ],
};

export const ownership = {
  eyebrow: "03 — OWNERSHIP",
  title: "サイトの資産は、すべてお客様のもの。",
  lead: "お客様のサイトを人質にすることはありません。ドメイン、サーバー、コンテンツはすべてお客様の名義で、制作会社を変えても持ち出せます。",
  rows: [
    { label: "ドメイン", ours: "お客様の名義で登録し、所有権を完全にお渡しします", theirs: "制作会社の名義で登録され、乗り換えると取り戻せない", image: asset("/home/homepage-1.webp") },
    { label: "サーバー", ours: "お客様自身のサーバーアカウントで、いつでも移転可能", theirs: "制作会社のプランに縛られ、移転には追加費用", image: asset("/home/homepage-2.webp") },
    { label: "コンテンツと管理画面", ours: "WordPressの管理画面をお渡しし、ご自身で更新できます", theirs: "制作会社にしか修正できず、毎回待たされる", image: asset("/home/homepage-3.webp") },
  ],
};

export const beyond = {
  eyebrow: "BEYOND",
  kicker: "私たちにできるのは、",
  title: "Webサイトだけではありません",
  lead: [
    "フォーム、リードの階層化からCRMまでを一本につなぎます。集客で終わらせず、すべての訪問を追跡でき、営業に渡せるリードへ変えていきます。",
  ],
  href: "/martech/ja/",
};

export const column = {
  eyebrow: "04 — COLUMN",
  title: "コラム",
  lead: "まだ検討中ですか？まずはブランドサイトを作る前に知っておきたいことから。",
  cta: {
    title: "サイトについて相談したい方へ",
    body: "ブランドとご要望をお聞かせください。担当者から早めにご連絡します。",
    label: "相談を予約する",
    href: "/contact",
  },
  more: { label: "コラム一覧へ", href: "/column" },
};

export const footer = {
  company: ["Blazelink マーケティング", "ブランドサイト制作 ・ WordPress構築 ・ カスタム機能"],
  address: "台湾台北市中正区館前路2号11階",
  hours: "営業時間：月〜金 10:00〜18:00（日本時間 11:00〜19:00）",
  phone: "+886-2-6603-9088",
  email: "service@blazelink.co",
  columns: [
    {
      head: "MENU",
      links: [
        { label: "制作実績", href: "/cases" },
        { label: "私たちについて", href: "/about" },
        { label: "コラム", href: "/column" },
        { label: "お問い合わせ", href: "/contact" },
      ],
    },
    { head: "CONTACT", links: [{ label: "ご相談", href: "/contact" }] },
  ],
  copyright: "Copyright 2026 © Blazelink マーケティング",
  legal: [
    { label: "利用規約", href: "/terms" },
    { label: "プライバシーポリシー", href: "/privacy-policy" },
  ],
};
