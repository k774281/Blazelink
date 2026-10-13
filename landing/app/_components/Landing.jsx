"use client";

import { useEffect, useState } from "react";
import { initLanding } from "../_lib/landing-fx";
import { asset, LOCALE_PATHS } from "../_lib/asset";
import { linksFor } from "../_lib/links";
import { getLatestPosts } from "../_lib/wp";

const LOGOS = [
  "bbae-logo-300px.png", "MasterTalks_Logo_1_410x.png", "Logo金字-去背-1-586x400.png", "lmi-logo-1.png",
  "oxfordclub-logo.svg", "逢侖.webp", "誠智log-600x179.png", "Banyanhill-logo.png",
  "cropped-falcon-ico-gallery.png", "faye_logo.png", "masons-LOGO-1.png", "taxline-logo-black-1024x360-1.png",
];
const LANGS = [
  { code: "zh", label: "中文", hreflang: "zh-Hant" },
  { code: "en", label: "English", hreflang: "en" },
  { code: "ja", label: "日本語", hreflang: "ja" },
];
const pad = (n) => String(n).padStart(2, "0");

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}

function LinkMark({ id }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="8" y1="42" x2="42" y2="6" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7b5cf6" />
          <stop offset="1" stopColor="#5fd3f3" />
        </linearGradient>
      </defs>
      <g stroke={`url(#${id})`} strokeWidth="4.6">
        <rect x="22" y="6" width="14" height="26" rx="7" transform="rotate(45 29 19)" />
        <rect x="12" y="16" width="14" height="26" rx="7" transform="rotate(45 19 29)" />
      </g>
    </svg>
  );
}

function Marquee({ words, reverse }) {
  // The list is doubled so the -50% loop is seamless.
  return (
    <div className={`marquee${reverse ? " marquee--rev" : ""}`}>
      <div className="marquee__inner">
        {[...words, ...words].map((w, i) => (
          <span key={i}>{w}<em>✦</em></span>
        ))}
      </div>
    </div>
  );
}

function LogoRow({ files, reverse }) {
  return (
    <div className={`marquee${reverse ? " marquee--rev" : ""}`}>
      <div className="marquee__inner">
        {[...files, ...files, ...files, ...files].map((f, i) => (
          <img key={i} src={asset(`/images/${encodeURIComponent(f)}`)} alt="" />
        ))}
      </div>
    </div>
  );
}

function Section({ id, cls, index, label, accent, labelledBy, children, extra }) {
  return (
    <section className={`panel ${cls}${index === 0 ? " is-active" : ""}`} id={id} data-label={label} data-accent={accent} aria-labelledby={labelledBy}>
      {index > 0 && (
        <div className="panel-index" aria-hidden="true"><b>{pad(index)}</b> / {label}</div>
      )}
      <div className="panel__scroll">{children}</div>
      <div className="panel-num" aria-hidden="true">{pad(index)}</div>
      {extra}
    </section>
  );
}

export default function Landing({ t, posts: builtPosts }) {
  useEffect(() => initLanding(), []);
  const S = t.sections;
  const links = linksFor(t.locale);

  // 最新消息 as built, then as WordPress has it now.
  const [posts, setPosts] = useState(builtPosts);
  useEffect(() => {
    let live = true;
    getLatestPosts(t.locale, { fresh: true, built: builtPosts }).then((fresh) => {
      if (live && fresh?.length) setPosts(fresh);
    });
    return () => { live = false; };
  }, [t.locale, builtPosts]);

  return (
    <>
      <a className="skip-link" href="#hero">{t.skipLink}</a>

      <div className="loader" id="loader" aria-hidden="true">
        <div className="loader__word">
          {"BLAZELINK".split("").map((letter, i) => (
            <span key={i} className="loader__letter" style={{ animationDelay: `${0.1 + i * 0.105}s` }}>{letter}</span>
          ))}
          <div className="loader__mask"><div className="loader__shine" /></div>
        </div>
        <div className="loader__pct" id="loaderPct">0%</div>
        <div className="loader__bar" />
      </div>

      <div className="bgs" aria-hidden="true">
        {S.map((_, i) => (
          <div key={i} className={`bg${i === 0 ? " is-active" : ""}`} data-i={i}>
            {i === 0 && <canvas className="nebula" id="nebula" />}
          </div>
        ))}
      </div>
      <canvas id="dust" aria-hidden="true" />
      <canvas id="webgl" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="header">
        <a className="brand" href="#hero" data-go="0" aria-label={t.homeLabel}>
          <LinkMark id="lgBrand" />
          <span>
            <span className="brand__word">BLAZELINK</span>
            <span className="brand__sub">EMPOWERING PRECISION GROWTH</span>
          </span>
        </a>
      </header>

      <ol className="rail" id="rail" aria-label={t.railLabel}>
        {S.map((label, i) => (
          <li key={i}>
            <button type="button" data-go={i} aria-label={label} aria-current={i === 0}>{pad(i)} {label}</button>
          </li>
        ))}
      </ol>
      <div className="segments" aria-hidden="true">
        <span className="segments__count"><b id="segCount">01</b> / {pad(S.length)}</span>
        {S.map((_, i) => <span key={i} className={`segments__bar${i === 0 ? " is-done" : ""}`} />)}
      </div>

      <main className="stage" id="stage">
        <Section id="hero" cls="hero" index={0} label={S[0]} accent="purple" labelledBy="heroTitle"
          extra={<div className="scroll-hint" aria-hidden="true">{t.scroll} <i /></div>}>
          <div className="inner">
            <p className="eyebrow" data-reveal>{t.hero.eyebrow}</p>
            <h1 className="title title--xl" id="heroTitle" data-reveal>
              {t.hero.title[0]}<br />{t.hero.title[1]}<span className="dot" aria-hidden="true">.</span>
            </h1>
            <p className="hero__sub" data-reveal>
              {t.hero.sub.before}<span className="accent">{t.hero.sub.accent}</span>{t.hero.sub.after}
            </p>
            <div className="btn-row" data-reveal>
              <a className="btn btn--primary" href={links.martech}>{t.hero.primary} <Arrow /></a>
              <a className="btn btn--ghost" href={links.webDesign}>{t.hero.secondary}</a>
            </div>
          </div>
        </Section>

        <Section id="about" cls="about" index={1} label={S[1]} accent="teal" labelledBy="aboutTitle">
          <div className="inner about-grid">
            <div>
              <p className="eyebrow" data-reveal>{t.about.eyebrow}</p>
              <p className="title title--md" data-reveal style={{ color: "var(--text-muted)", fontWeight: 700 }}>
                {t.about.rolesPrefix}
                <span className="roles" id="roles">
                  {t.about.roles.map((r, i) => <span key={i} className={i === 0 ? "is-on" : undefined}>{r}</span>)}
                </span>
                {t.about.rolesSuffix}
              </p>
              <h2 className="title title--lg" id="aboutTitle" data-reveal style={{ marginTop: "1.1rem" }}>
                {t.about.headline}<span className="dot" aria-hidden="true">.</span>
              </h2>
              <p className="lead subtitle" data-reveal>{t.about.lead}</p>
            </div>
            <div className="cards">
              {t.about.cards.map((c, i) => (
                <div key={i} className="card" data-reveal><span>{"ABC"[i]}</span>{c}</div>
              ))}
              <div data-reveal>
                <a className="btn btn--ghost" href={links.martech} style={{ marginTop: ".5rem" }}>{t.about.cta} <Arrow /></a>
              </div>
            </div>
          </div>
        </Section>

        <Section id="services" cls="services" index={2} label={S[2]} accent="blue" labelledBy="svcTitle">
          <div className="inner">
            <div className="marquees" aria-hidden="true" data-reveal>
              <Marquee words={t.services.marquee[0]} />
              <Marquee words={t.services.marquee[1]} reverse />
            </div>
            <div className="svc-head">
              <div>
                <p className="eyebrow" data-reveal>{t.services.eyebrow}</p>
                <h2 className="title title--lg" id="svcTitle" data-reveal>{t.services.title}<span className="dot" aria-hidden="true">.</span></h2>
              </div>
              <p className="muted subtitle" data-reveal style={{ margin: 0 }}>{t.services.lead}</p>
            </div>
            <div className="svc-list">
              {t.services.items.map((it, i) => (
                <article key={i} className="svc" data-reveal>
                  <span className="svc__no">{pad(i + 1)}</span><h3>{it.title}</h3><p>{it.content}</p>
                </article>
              ))}
            </div>
          </div>
        </Section>

        <Section id="marketing" cls="process" index={3} label={S[3]} accent="purple" labelledBy="procTitle">
          <div className="inner">
            <p className="eyebrow" data-reveal>{t.process.eyebrow}</p>
            <h2 className="title title--xl" id="procTitle" data-reveal>{t.process.title}<span className="dot" aria-hidden="true">.</span></h2>
            <div className="steps">
              {t.process.steps.map((st, i) => (
                <div key={i} className="step" data-reveal>
                  <div className="step__no" aria-hidden="true">{pad(i + 1)}</div><h3>{st}</h3>
                </div>
              ))}
            </div>
            <div className="btn-row" data-reveal>
              <a className="btn btn--primary" href={links.martech}>{t.process.cta} <Arrow /></a>
            </div>
          </div>
        </Section>

        <Section id="news" cls="news" index={4} label={S[4]} accent="teal" labelledBy="newsTitle">
          <div className="inner">
            <div className="news__head">
              <div>
                <p className="eyebrow" data-reveal>{t.news.eyebrow}</p>
                <h2 className="title title--lg" id="newsTitle" data-reveal>{t.news.title}<span className="dot" aria-hidden="true">.</span></h2>
              </div>
              <p className="muted subtitle" data-reveal style={{ margin: 0, maxWidth: "30ch" }}>{t.news.lead}</p>
            </div>
            <div className="news__cards">
              {posts.map((n, i) => (
                <a key={i} className="post" href={n.href} data-reveal>
                  <div className="post__img">{n.image && <img src={n.image} alt="" />}</div>
                  <div><time dateTime={n.iso}>{n.date}</time><h3>{n.title}</h3></div>
                </a>
              ))}
            </div>
          </div>
        </Section>

        <Section id="clients" cls="clients" index={5} label={S[5]} accent="purple" labelledBy="clientsTitle">
          <div className="inner">
            <div>
              <p className="eyebrow" data-reveal>{t.clients.eyebrow}</p>
              <h2 className="title title--lg" id="clientsTitle" data-reveal>{t.clients.title}<span className="dot" aria-hidden="true">.</span></h2>
            </div>
            <div className="logos" data-reveal>
              <LogoRow files={LOGOS.slice(0, 6)} />
              <LogoRow files={LOGOS.slice(6)} reverse />
            </div>
          </div>
        </Section>

        <Section id="contact" cls="cta" index={6} label={S[6]} accent="purple" labelledBy="ctaTitle">
          <div className="inner">
            <p className="eyebrow" data-reveal>{t.contact.eyebrow}</p>
            <h2 className="title title--lg" id="ctaTitle" data-reveal>
              {t.contact.title[0]}<br />{t.contact.title[1]}<span className="dot" aria-hidden="true">.</span>
            </h2>
            <p className="subtitle cta__copy" data-reveal>{t.contact.body}</p>
          </div>
          <footer className="footer" data-reveal>
            <div className="footer__inner">
              <div className="footer__row">
                <div className="contact-line">
                  <a href={`tel:${t.footer.phone.tel}`}>{t.footer.phone.label}</a>
                  <a href={`mailto:${t.footer.email}`}>{t.footer.email}</a>
                </div>
                <nav className="lang" aria-label={t.langLabel}>
                  {LANGS.map((l) => (
                    <a key={l.code} href={LOCALE_PATHS[l.code]} hrefLang={l.hreflang} lang={l.hreflang}
                      aria-current={l.code === t.locale ? "true" : undefined}>{l.label}</a>
                  ))}
                </nav>
              </div>
              <div className="footer__row footer__meta">
                <span>{t.footer.copyright}</span>
                <nav aria-label={t.legalLabel}>
                  <a href={links.privacy}>{t.footer.privacy}</a>
                  <a href={links.terms}>{t.footer.terms}</a>
                </nav>
              </div>
            </div>
          </footer>
        </Section>
      </main>
    </>
  );
}
