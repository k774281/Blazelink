/*
 * コラムの文言（日本語）。../zh/column.js と同じ構成。記事はWordPressの
 * 日本語カテゴリーから読み込み、リポジトリ内の記事は中国語のみ。
 */

import { asset } from "../../_lib/base";

export const header = {
  display: "COLUMN",
  title: "コラム",
  lead: ["Webデザイン、マーケティング・テクノロジー、経営の実務まで。", "よいサイトを作る前に知っておきたいことを集めました。"],
};

export const localPosts = [];

export const FALLBACK_IMAGE = asset("/home/bg-1.webp");

export const consult = {
  title: "サイトについて相談したい方へ",
  body: "ブランドとご要望をお聞かせください。担当者から早めにご連絡します。",
  label: "相談を予約する",
  href: "/contact",
};

export const cta = {
  eyebrow: "CONTACT",
  title: "お問い合わせから、サイトづくりを始めましょう。",
  label: "アイデアを聞かせてください",
  href: "/contact",
};

export const articleConsult = {
  title: "サイトをもっと良くしたい方へ",
  body: "ブランドとご要望をお聞かせください。設計図の段階から、完成までご一緒します。",
  label: "相談を予約する",
  href: "/contact",
};

export const articleCta = cta;

export const PAGE_SIZE = 8;

export const postHref = (post) => `/column/${post.slug}`;
