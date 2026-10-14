// お問い合わせページの文言（日本語）。../zh/contact.js と同じ構成。

export { cf7 } from "../zh/contact";

export const header = {
  display: "CONTACT",
  title: "お問い合わせ",
  lead: ["資料も予算の見通しも、事前の準備は不要です。", "基本情報をご記入いただければ、2営業日以内にご返信いたします。"],
};

export const intro = {
  // The marketing site, introduced beside the form; `more` links to it.
  eyebrow: "MARTECH",
  title: ["サイトが完成したら、", "次は顧客を呼び込む番です。"],
  lead: "精密なマーケティング戦略、越境SEOコンテンツ、自動化セールスファネルまで。BlazeLinkのマーケティングチームが、アクセスを追跡できるリードに変えて営業チームへお渡しします。",
  more: "/martech/ja/",
  steps: [
    { no: "01", title: "フォームを送信", body: "2分ほどで、ブランドのことと作りたいサイトをお知らせください。" },
    { no: "02", title: "2営業日以内にご返信", body: "現在のサイトのアドレスをいただいた場合は、初期の所見を添えてご返信します。" },
    { no: "03", title: "一度お話しする", body: "オンラインでもお電話でも。無理な営業は一切いたしません。" },
  ],
  details: [
    { label: "電話", value: "+886-2-6603-9088（中国語・英語）", href: "tel:+886266039088" },
    { label: "メール", value: "service@blazelink.co", href: "mailto:service@blazelink.co" },
    { label: "営業時間", value: "月〜金 10:00–18:00（日本時間 11:00–19:00）" },
  ],
};

export const form = {
  title: "お問い合わせフォーム",
  note: "* は必須項目です。所要時間は約2分です。",
  // 値は CF7 フォーム644 の選択肢そのもの（一字一句一致が必要）。表示は topicLabels。
  topics: ["網站設計/開發", "網站健檢", "行銷漏斗", "其他"],
  topicLabels: { "網站設計/開發": "Webサイト制作・開発", 網站健檢: "Webサイト診断", 行銷漏斗: "マーケティングファネル", 其他: "その他" },
  defaultTopic: "網站設計/開發",
  submit: "送信する",
  submitting: "送信中…",
  privacy: { before: "送信により、ご提供いただいた情報を", link: "プライバシーポリシー", href: "/privacy-policy", after: "に従って取り扱うことに同意したものとみなします。" },
  // Google asks for this wording wherever its reCAPTCHA badge is hidden.
  recaptcha: ["このサイトは reCAPTCHA によって保護されており、Google の", "プライバシーポリシー", "と", "利用規約", "が適用されます。"],
  errors: {
    required: "この項目は必須です。",
    email: "正しいメールアドレスを入力してください。",
    url: "https:// から始まるアドレスを入力してください。",
  },
  failure: "送信できませんでした。時間をおいて再度お試しいただくか、service@blazelink.co までメールでご連絡ください。",
};

export const success = {
  eyebrow: "SENT",
  title: "お問い合わせを受け付けました",
  body: "2営業日以内にご返信いたします。現在のサイトのアドレスをいただいた場合は、初期の所見を添えてご返信します。",
  primary: { label: "制作実績を見る", href: "/cases" },
  secondary: { label: "トップページへ戻る", href: "/" },
};
