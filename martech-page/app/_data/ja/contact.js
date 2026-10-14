// お問い合わせページの文言（日本語）。../zh/contact.js と同じ構成。

import { WEB_DESIGN_HOME } from "../../_lib/base";

export const intro = {
  // The web-design site, introduced beside the form; `more` links to it.
  title: ["マーケティングの前に、", "成果を生むWebサイトを。"],
  lead: "リードはWebサイトから始まります。BlazeLinkのWeb制作チームが、設計図から公開まで、美しさと成果を両立するブランドサイトをつくります。サイトの資産はすべてお客様のものです。",
  more: { label: "Webサイト制作を見る", href: WEB_DESIGN_HOME },
  steps: [
    { no: "01", title: "フォームを送信", body: "2分ほどで、ブランドのことと今の課題をお知らせください。" },
    { no: "02", title: "2営業日以内にご返信", body: "Webサイトのアドレスをいただいた場合は、初期の所見を添えてご返信します。" },
    { no: "03", title: "一度お話しする", body: "オンラインでもお電話でも。無理な営業は一切いたしません。" },
  ],
  details: [
    { label: "電話", value: "+886-2-6603-9088（中国語・英語）" },
    { label: "メール", value: "service@blazelink.co" },
    { label: "営業時間", value: "月〜金 10:00–18:00（日本時間 11:00–19:00）" },
  ],
};

export const form = {
  title: "お問い合わせフォーム",
  note: "* は必須項目です。所要時間は約2分です。",
  // 値は CF7 フォーム644 の選択肢そのもの（一字一句一致が必要）。表示は topicLabels。
  topics: ["顧問諮詢", "網站健檢", "網站設計/開發", "SEO關鍵字", "行銷自動化", "AI導入", "社群經營", "行銷漏斗", "其他"],
  topicLabels: {
    顧問諮詢: "コンサルティング",
    網站健檢: "Webサイト診断",
    "網站設計/開發": "Webサイト制作・開発",
    SEO關鍵字: "SEO・キーワード",
    行銷自動化: "マーケティングオートメーション",
    AI導入: "AI導入",
    社群經營: "SNS運用",
    行銷漏斗: "マーケティングファネル",
    其他: "その他",
  },
  submit: "送信する",
  submitting: "送信中…",
  privacy: {
    before: "送信により、ご提供いただいた情報を",
    link: "プライバシーポリシー",
    href: "/privacy-policy",
    after: "に従って取り扱うことに同意したものとみなします。",
  },
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
  title: "お問い合わせを受け付けました",
  body: "2営業日以内にご返信いたします。Webサイトのアドレスをいただいた場合は、初期の所見を添えてご返信します。",
  cta: "トップページへ戻る",
};
