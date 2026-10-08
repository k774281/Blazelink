import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleAside from "../../_components/ArticleAside";
import SideNav from "../../_components/SideNav";
import SiteFooter from "../../_components/SiteFooter";
import { CtaBand, Eyebrow, MotionButton } from "../../_components/ui";
import { articleConsult, articleCta, FALLBACK_IMAGE, postHref } from "../../_data/column";
import { asset } from "../../_lib/base";
import { getColumn, getPost, relatedPosts } from "../../_lib/column";

/*
 * Every post is written out at build time; the site is static, so a post
 * published in WordPress since appears with the next build and upload.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  const { posts } = await getColumn();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title}｜Blazelink 鏈客`,
    description: post.excerpt,
    openGraph: { type: "article", title: post.title, description: post.excerpt, images: post.image ? [post.image] : [] },
  };
}

/**
 * Gives each h2 in the body an id the contents list can point at, and returns
 * that list. WordPress headings carry their own classes and sometimes an id,
 * so any attributes are dropped and replaced with ours.
 */
function withHeadingIds(html) {
  const toc = [];
  const out = html.replace(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g, (_, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
    if (!text) return "";
    const id = `section-${toc.length + 1}`;
    toc.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: out, toc };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { html, toc } = post.html ? withHeadingIds(post.html) : { html: `<p>${post.excerpt}</p>`, toc: [] };
  const { posts } = await getColumn();
  const related = relatedPosts(post, posts);

  return (
    <>
      <SideNav />
      <main>
        {/* Header (Figma 206:211) */}
        <header className="relative overflow-hidden px-6 pb-16 pt-32 lg:h-[560px] lg:px-[160px] lg:pb-0 lg:pt-[190px]">
          <Image src={asset("/column/article-bg.png")} alt="" fill preload sizes="100vw" className="object-cover" />

          <Link href="/" className="absolute left-6 top-5 z-10 block lg:left-16 lg:top-[52px]">
            <Image src={asset("/home/logo.png")} alt="BLAZELINK 鏈客" width={188} height={63} preload className="h-auto w-[140px] lg:w-[188px]" />
          </Link>

          <div className="relative flex max-w-[1240px] flex-col gap-7">
            <nav aria-label="麵包屑" className="whitespace-pre font-mono text-[13px] text-muted">
              <Link href="/" className="hover:text-ink">
                首頁
              </Link>
              {"  /  "}
              <Link href="/column" className="hover:text-ink">
                專欄
              </Link>
              {"  /  "}
              <span aria-current="page">{post.category}</span>
            </nav>
            <div className="flex flex-wrap items-center gap-4 font-mono text-[13px]">
              <span className="rounded-[4px] bg-white/10 px-3 py-[5px] text-teal">{post.category}</span>
              <p className="whitespace-pre text-muted">
                <time dateTime={post.date.replace(/\./g, "-")}>{post.date}</time>
                {post.readMinutes && `  ・  閱讀時間約 ${post.readMinutes} 分鐘`}
              </p>
            </div>
            <h1 className="font-mono text-[32px] font-medium leading-[1.4] text-ink lg:text-[56px]">{post.title}</h1>
            <p className="font-mono text-base leading-[1.75] text-muted lg:text-xl">{post.lead ?? post.excerpt}</p>
          </div>
        </header>

        {/* Cover (Figma 206:222) */}
        <div className="px-6 pb-16 lg:px-[160px] lg:pb-24">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[4px] lg:aspect-auto lg:h-[700px] lg:max-w-[1600px]">
            <Image src={post.image ?? FALLBACK_IMAGE} alt="" fill preload sizes="(min-width: 1024px) 1600px, 100vw" className="object-cover" />
          </div>
        </div>

        {/* Contents + body (Figma 207:210) */}
        <div className="flex flex-col gap-16 px-6 pb-24 lg:flex-row lg:items-start lg:gap-16 lg:pb-[120px] lg:pl-16 lg:pr-[136px] xl:gap-[120px] xl:px-[160px]">
          <ArticleAside toc={toc} title={post.title} />

          <article className="flex min-w-0 flex-col gap-7 lg:max-w-[820px] lg:flex-1">
            <div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />

            {post.tags?.length > 0 && (
              <ul className="flex flex-wrap gap-2 border-t border-line pt-6">
                {post.tags.map((t) => (
                  <li key={t} className="rounded-[4px] bg-surface-2 px-3 py-1.5 font-mono text-[13px] text-muted">
                    #{t}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-col gap-6 rounded-2xl border border-line bg-[linear-gradient(170deg,rgba(112,77,227,0.5)_0%,rgba(143,209,209,0.18)_71%)] px-7 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-9">
              <div className="flex flex-col gap-2 text-ink">
                <p className="font-mono text-[22px] font-medium">{articleConsult.title}</p>
                <p className="font-mono text-[15px] leading-[1.7]">{articleConsult.body}</p>
              </div>
              <MotionButton href={articleConsult.href} label={articleConsult.label} className="shrink-0" />
            </div>

            {post.relatedCase && (
              <Link href={post.relatedCase.href} className="group flex flex-col overflow-hidden rounded-[4px] border border-line bg-surface sm:flex-row">
                <div className="relative aspect-[260/170] shrink-0 sm:w-[260px]">
                  <Image src={post.relatedCase.image} alt="" fill sizes="260px" className="object-cover" />
                </div>
                <div className="flex flex-col justify-center gap-2.5 px-8 py-7">
                  <p className="font-display text-xs font-semibold tracking-[0.2em] text-teal">RELATED CASE</p>
                  <p className="font-mono text-[22px] font-medium text-ink">{post.relatedCase.name}</p>
                  <p className="whitespace-pre-wrap font-mono text-[15px] text-lavender transition-transform group-hover:translate-x-1">{`${post.relatedCase.line}  →`}</p>
                </div>
              </Link>
            )}
          </article>
        </div>

        {/* Related posts (Figma 207:289) */}
        <section className="flex flex-col gap-12 border-t border-line bg-surface px-6 py-24 lg:pb-[160px] lg:pl-[160px] lg:pr-[264px] lg:pt-[120px]">
          <div className="flex items-end justify-between gap-6">
            <div className="flex flex-col gap-4">
              <Eyebrow>RELATED</Eyebrow>
              <h2 className="font-mono text-[32px] font-medium leading-[1.3] text-ink lg:text-3xl">相關文章</h2>
            </div>
            <Link href="/column" className="whitespace-pre text-base font-medium text-lavender">{`看全部文章  →`}</Link>
          </div>
          <ul className="grid gap-10 md:grid-cols-3 md:gap-6">
            {related.map((p) => (
              <li key={p.slug}>
                <Link href={postHref(p)} className="group flex flex-col gap-5">
                  <div className="relative h-[220px] overflow-hidden rounded-[4px] lg:h-[300px]">
                    <Image src={p.image ?? FALLBACK_IMAGE} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <p className="whitespace-pre font-mono text-[13px] text-teal">{`${p.date}  ・  ${p.category}`}</p>
                  <h3 className="font-mono text-[22px] font-medium leading-[1.5] text-ink transition-colors group-hover:text-lavender">{p.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <CtaBand data={articleCta} />
      </main>
      <SiteFooter />
    </>
  );
}
