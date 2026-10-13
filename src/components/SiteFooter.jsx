import { useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { asset } from '../lib/asset.js'
import { LOCALES, t, sitePath } from '../lib/locale.js'

const CONTACT_INFO = t.footer.contact
// The landing page in each language (/, /en/, /ja/).
const LANGUAGES = Object.values(LOCALES).map(({ label, home, html }) => ({ label, href: home, lang: html }))

export default function SiteFooter() {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef, { hand: false })

  return (
    <div>
      <footer ref={sectionRef} className="border-t border-white/15 flex flex-col items-center overflow-hidden p-6 w-full bg-gradient-to-bl from-[#49309f] to-[#474374]">
        <div className="flex flex-col gap-5 lg:gap-[50px] items-center max-w-[1440px] w-full">
          <div data-anim="reveal" className="flex flex-col gap-12 items-center w-full">
            <div className="flex flex-col gap-10 items-center min-w-0">
              <img src={asset('/blazelink-logo-light.png')} alt="" className="w-[300px]" />
              <div className="flex flex-col gap-2 items-center">
                {CONTACT_INFO.map((line) => (
                  <span key={line} className="font-body text-sm uppercase text-white/90">
                    {line}
                  </span>
                ))}
              </div>
              <div className="flex flex-row gap-6 items-center">
                {LANGUAGES.map(({ label, href, lang }, i) => (
                  <div key={label} className="flex flex-row items-center gap-3">
                    {i > 0 && <div className="bg-white/20 h-px w-5" />}
                    <a href={href} hrefLang={lang} lang={lang} className="font-body text-lg uppercase text-white/90 hover:opacity-60 transition">
                      {label}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-around items-center w-full max-lg:flex-col max-lg:gap-4">
            <p className="text-[11px] text-white/90">{t.footer.copyright}</p>
            <div className="flex flex-row gap-6 items-center">
              <a
                href={sitePath('martech', '/privacy-policy/')}
                className="font-body text-sm uppercase text-white/90 hover:opacity-60 transition"
              >
                {t.footer.privacy}
              </a>
              <div className="bg-white/20 h-px w-16" />
              <a
                href={sitePath('martech', '/terms/')}
                className="font-body text-sm uppercase text-white/90 hover:opacity-60 transition"
              >
                {t.footer.terms}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
