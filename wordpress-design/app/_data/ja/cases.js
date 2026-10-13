/*
 * 制作実績ページの文言（日本語）。../zh/cases.js と同じ構成。
 * ブランド名は各ブランドの表記のまま。
 */

import { asset } from "../../_lib/base";

export const header = {
  breadcrumb: "ホーム  /  制作実績",
  display: "CASES",
  title: "制作実績",
  lead: ["20を超えるブランドと、ブランドサイトからカスタム機能、自動化システムまで。", "どの作品も、美しさと機能を兼ね備えています。"],
};

const img = (n) => asset(`/home/demo-${n}.webp`);

export const sections = [
  {
    key: "wordpress",
    tab: "WordPressサイト制作",
    eyebrow: "01 — WORDPRESS",
    title: "WordPressサイト制作",
    lead: ["FigmaのデザインとWordPress／PHPの開発で、", "公開後はご自身でコンテンツを更新できます。"],
    items: [
      { name: "GOGOHSU MUSEUM", latin: true, tags: ["ラグジュアリー", "ブランドサイト"], body: "オーダーメイドのアートブランド。展覧会のようなレイアウトで作品を見せます。", href: "https://gogohsu.com", image: img(1) },
      { name: "成智聯合會計師事務所", tags: ["専門サービス", "ブランドサイト"], body: "デジタル会計サービス。専門的な手続きを分かりやすく整理しました。", href: "https://pwcpa.one", image: img(2) },
      { name: "曜畫廊 Gallery de Sol", latin: true, tags: ["アート", "ブランドサイト"], body: "版画の普及に取り組むギャラリー。作品がサイトの主役です。", href: "https://gallerydesol.com/", image: img(3) },
      { name: "美成移民", tags: ["コンサルティング", "ブランドサイト"], body: "海外資産配置のコンサルタント。信頼されるブランドイメージを築きました。", href: "https://masonsimmigrate.com", image: img(4) },
      { name: "Yifei 亦飛貨運", tags: ["国際物流", "ブランドサイト"], body: "中国から米国へのFCL海上輸送。スケジュールと見積もりがひと目で分かります。", href: "https://yifeidelivery.com/yifei-shipping/", image: img(5) },
    ],
    cta: { eyebrow: "NEXT", title: ["次は、", "あなたのブランドです。"], label: "ブランドイメージをつくる", href: "/contact" },
  },
  {
    key: "custom",
    tab: "カスタム機能",
    eyebrow: "02 — CUSTOM",
    title: "カスタム機能",
    lead: ["業界のニーズに合わせて開発した機能モジュールで、", "サイトが見せるだけでなく、仕事をしてくれます。"],
    items: [
      { name: "報酬支払明細ジェネレーター", platform: "WORDPRESS", body: "情報を入力するだけで明細を自動作成し、事務の時間を省きます。", image: img(6) },
      { name: "給与計算ツール", platform: "WORDPRESS", body: "サイト上でその場で試算でき、専門サービスが理解しやすくなります。", image: img(7) },
      { name: "AI企業診断クイズ", platform: "WORDPRESS", body: "対話式の設問とAI分析で、訪問者を相談のリードに変えます。", image: img(8) },
      { name: "遺産分配シミュレーター", platform: "WORDPRESS", body: "条件を入力すると分配結果を試算でき、複雑なルールがひと目で分かります。", image: img(9) },
      { name: "ポイントモジュール", platform: "SHOPIFY", body: "ポイントの付与と利用で、お客様が再び購入したくなる仕組みです。", image: img(10) },
      { name: "修了証モジュール", platform: "SHOPIFY", body: "購入や受講完了時に修了証を自動発行。手作業は不要です。", image: img(11) },
    ],
  },
  {
    key: "automation",
    tab: "マーケティングオートメーション",
    eyebrow: "03 — AUTOMATION",
    title: "マーケティングオートメーション",
    lead: ["生成AIと自動化ツールを組み合わせ、", "コンテンツが毎日自動で更新されます。"],
    items: [
      { name: "展覧会情報の自動シェア", body: "Exhibiqueギャラリーシステム：展覧会情報を自動で整理・共有し、毎日の手動投稿を不要にします。", chips: ["GPT", "Make"], image: img(12) },
      { name: "金融ニュース自動配信プラットフォーム", body: "毎日ニュースを監視し、自動でリライトして予約投稿。サイトのコンテンツを更新し続けます。", chips: ["GPT", "予約投稿"], image: img(13) },
    ],
  },
  {
    key: "creative",
    tab: "クリエイティブ作品",
    eyebrow: "04 — CREATIVE",
    title: "クリエイティブ作品",
    lead: ["技術と創造性を組み合わせたインタラクティブな作品で、", "ブランドを記憶に残しながら、リードも集めます。"],
    items: [
      { name: "バースデー・アドベンチャー", body: "インタラクティブな誕生日プレゼントサイト。お祝いの言葉を一つの旅にしました。", image: img(14) },
      { name: "新年のおみくじ", body: "デジタルのグリーティングカードにマーケティングファネルを組み込み、季節のイベントでもリードを集めます。", image: img(15) },
      { name: "写真チェックインのスタンプカード", body: "ログイン不要のデジタルスタンプカード。イベント会場ですぐに使えます。", image: img(16) },
    ],
  },
  {
    key: "enterprise",
    tab: "企業向けシステム",
    eyebrow: "05 — ENTERPRISE",
    title: "企業向けシステム",
    lead: ["社内業務のために構築したシステムです。", "企業名は契約により非公開です。"],
    items: [
      { name: "取引先管理システム", body: "購買フローと取引先の評価を追跡し、表計算に散らばっていたデータを一元管理します。", chips: ["購買フロー", "評価管理"], image: img(17) },
      { name: "社内報酬支払明細システム", body: "税額を自動計算してレポートを作成し、手作業の照合ミスを減らします。", chips: ["税額の自動計算", "レポート作成"], image: img(18) },
    ],
  },
  {
    key: "api",
    tab: "API連携",
    eyebrow: "06 — API",
    title: "ワンストップAPI連携",
    lead: ["REST APIとWebhookで、", "サイトと普段お使いのツールをつなぎます。"],
    items: [
      { name: "LINE", body: "リアルタイムのやりとり", icon: asset("/cases/icon-line.svg") },
      { name: "Google Sheets", body: "レポートの同期", icon: asset("/cases/icon-google-sheets.svg"), iconSize: [29.0671, 35.8338], iconDisc: true },
      { name: "Ragic", body: "ERPデータ管理", icon: asset("/cases/icon-ragic.svg") },
      { name: "Stripe", body: "決済連携", icon: asset("/cases/icon-stripe.svg") },
      { name: "Mailchimp", body: "マーケティングオートメーション", icon: asset("/cases/icon-mailchimp.svg") },
    ],
  },
];

export const cta = {
  eyebrow: "CONTACT",
  title: "お問い合わせから、サイトづくりを始めましょう。",
  label: "アイデアを聞かせてください",
  href: "/contact",
};
