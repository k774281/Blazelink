"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "./Header";
import SiteFooter from "./SiteFooter";
import ContentHero from "./ContentHero";
import CtaLink from "./CtaLink";
import PostView from "./PostView";
import LectureView from "./LectureView";
import { getColumnPost, getLecture } from "../_lib/wp";

import { ui } from "@/app/_data/ui";
const KINDS = {
  post: { read: getColumnPost, View: PostView, prop: "post", zh: ui.eyebrow.column, en: "COLUMN", back: ["/column/", ui.column.back] },
  lecture: { read: getLecture, View: LectureView, prop: "lecture", zh: ui.eyebrow.lecture, en: "LECTURE", back: ["/academy/", ui.lecture.back] },
};

/**
 * A post or lecture published after the last build has no page of its own
 * yet, so it opens here: ?slug= names it and it is read from WordPress in the
 * browser, then shown exactly as its own page would show it.
 */
export default function LiveReader({ kind }) {
  const { read, View, prop, zh, en, back } = KINDS[kind];
  const slug = useSearchParams().get("slug");
  const [state, setState] = useState({ status: "loading" });

  useEffect(() => {
    if (!slug) return setState({ status: "missing" });
    let live = true;
    read(slug, { fresh: true }).then((item) => {
      if (!live) return;
      setState(item ? { status: "ready", item } : { status: "missing" });
      if (item) document.title = `${item.title}｜${ui.siteName}`;
    });
    return () => {
      live = false;
    };
  }, [slug, read]);

  if (state.status === "ready") return <View {...{ [prop]: state.item }} />;

  return (
    <>
      <Header />
      <main className="relative z-10 bg-white">
        <ContentHero zh={zh} en={en} title={state.status === "loading" ? ui.reader.loading : ui.reader.notFound}>
          {state.status === "missing" ? (
            <div className="pt-[28px]">
              <CtaLink href={back[0]}>{back[1]}</CtaLink>
            </div>
          ) : null}
        </ContentHero>
      </main>
      <SiteFooter onThisPage={null} />
    </>
  );
}

/*
 * A live body links other posts and lectures to the reader, since it cannot
 * tell which have pages. Those the built body already linked to their own
 * pages go back there.
 */
function relinkToBuilt(html, builtHtml) {
  return html.replace(/\/martech\/(column|academy)\/read\/\?slug=([^"&#]+)/g, (link, section, slug) => {
    const page = `/martech/${section}/${decodeURIComponent(slug)}/`;
    return builtHtml.includes(`"${page}`) ? page : link;
  });
}

/**
 * An item's own page, built with what WordPress said at build time, then
 * brought up to date as it opens: an edit made since (a new registration
 * link, a changed date) shows without rebuilding the site.
 */
export function LiveItem({ kind, item: built }) {
  const { read, View, prop } = KINDS[kind];
  const [item, setItem] = useState(built);

  useEffect(() => {
    let live = true;
    read(built.slug, { fresh: true }).then((fresh) => {
      if (live && fresh) setItem({ ...fresh, html: relinkToBuilt(fresh.html, built.html) });
    });
    return () => {
      live = false;
    };
  }, [built, read]);

  return <View {...{ [prop]: item }} />;
}
