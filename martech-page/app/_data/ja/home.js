import { asset, WEB_DESIGN_HOME } from "../../_lib/base";
// トップページの文言（日本語）。../zh/home.js と同じ構成。

// 鏈客商學院は中国語のみのため、日本語メニューには載せない。
export const nav = [
  { label: "私たちについて", href: "/about" },
  { label: "グローバルSEO", href: "/seo" },
  { label: "コラム", href: "/column/" },
];

export const brandLogos = Array.from({ length: 12 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return { name: `ブランド ${n}`, src: asset(`/logo-${n}.${n === "11" ? "svg" : "webp"}`) };
});

export const hero = {
  eyebrow: "MARTECH GROWTH ENGINE",
  title: "そのアクセス、素通りさせていませんか。",
  lead: "フォーム、リードの階層化からCRMまでを一本につなぎます。集客で終わらせず、すべての訪問を追跡でき、営業に渡せるリードへ変えていきます。",
  stats: [
    { value: "100", label: "月間の説明会参加者" },
    { value: "上位 3 位", label: "Google 自然検索" },
    { value: "−25%", label: "リード単価" },
  ],
  tags: ["移民コンサル", "会計事務所", "金融", "高級オーダー服"],
  proof: "提携ブランド12社 · 越境B2BとYMYLの高信頼業界",
  logos: brandLogos.slice(0, 8).map((b) => b.src),
};

export const philosophy = {
  title: "成功の共創",
  image: asset("/img-2.webp"),
  body: "戦略的マーケティングは、冒険であり、ひらめきであるべきだと考えています。私たちはその冒険のパートナーとして、ブランドを成功へとつなぎます。サービスを提供するだけでなく、ブランドを深く理解するビジネスパートナーです。",
  closingTitle: "私たちの成功は、あなたの成功の上に成り立っています。",
  closingBody: "それが、私たちが努力し続ける理由です。",
  cta: "成長エンジンについて相談する",
};

export const services = {
  title: "責任を持つのは、最終的なリードと売上だけ。",
  items: [
    {
      id: "01",
      name: "精密マーケティング戦略",
      body: "ターゲット像、競合のポジショニング、メッセージ設計から始め、「誰に、何を伝えるか」を先に決めてから広告とコンテンツを配置します。リードにつながらないアクセスに予算を使わないためです。",
      image: asset("/img-1.webp"),
    },
    {
      id: "02",
      name: "自動化セールスファネル",
      body: "フォーム、リードの階層化、CRMを一本の導線につなぎ、サイト上のすべての行動に次のアクションを用意します。営業が引き継ぐ時点で、相手がどの段階にいるかが分かります。",
      image: asset("/img-3.webp"),
    },
    {
      id: "03",
      name: "SEOグローバルコンテンツ",
      body: "直訳ではなく現地の検索意図にもとづいてコンテンツを構成し、各市場の検索を正しいページへ導きます。オーガニック流入を、追跡できるリードへと変えていきます。",
      image: asset("/img-4.webp"),
    },
    {
      id: "04",
      name: "市場インサイト・競合分析",
      body: "市場のニーズと競合の動きを洗い出し、まだ満たされていない切り口を見つけます。同業の出稿ペースに合わせるのではなく、根拠のある予算配分を行います。",
      image: asset("/img-5.webp"),
    },
  ],
  crossLinks: [
    { label: "グローバルSEO", href: "/seo" },
    { label: "Webサイト制作", href: WEB_DESIGN_HOME },
  ],
  cta: "まずはご相談ください",
};

export const academy = {
  title: "最新セミナー",
  cta: "すべてのセミナー",
};

export const ctaBanner = {
  title: "成長のあらゆる段階で、あなたと共に歩みます",
  cta: "Webサイト制作を見る",
  href: WEB_DESIGN_HOME,
  image: asset("/figma/cta-banner.webp"),
};

export const partners = {
  note: "スタートアップから多国籍B2Bまで、12のブランドが同じ導線の上にいます。",
  cta: "次のパートナーへ",
  brands: brandLogos,
};

export const blog = {
  title: "最新コラム",
  cta: "すべての記事",
};

export const contact = {
  headline: "あなたのアクセスを、",
  rotating: ["リードに。", "商談に。", "受注に。", "売上に。"],
  body: "資料も予算の見通しも、事前の準備は不要です。まずは今どこでつまずいているか、気軽にお話しください。",
  cta: "無料相談を予約する",
};

export const footer = {
  address: "台湾台北市中正区館前路2号11階",
  hours: "営業時間：月〜金 10:00〜18:00（日本時間 11:00〜19:00）",
  phone: "電話：+886-2-6603-9088（中国語・英語対応）",
  email: "メール：service@blazelink.co",
  onThisPage: [
    { label: "理念", href: "#about" },
    { label: "サービス", href: "#services" },
    { label: "コラム", href: "#blog" },
  ],
  sitemap: [
    { label: "私たちについて", href: "/about" },
    { label: "グローバルSEO", href: "/seo" },
    { label: "コラム", href: "/column/" },
    { label: "お問い合わせ", href: "/contact" },
  ],
  copyright: "Copyright 2026 © Blazelink マーケティング",
  legal: [
    { label: "利用規約", href: "/terms" },
    { label: "プライバシーポリシー", href: "/privacy-policy" },
  ],
  wordmark: "BLAZELINK.CO",
};
