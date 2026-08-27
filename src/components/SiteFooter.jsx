import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap.js'

const NAV_LINKS = [
  { label: '作品', href: '#services' },
  { label: '服務', href: '#services' },
  { label: '關於', href: '#about' },
  { label: '聯絡', href: '#contact' },
]

const SOCIAL_LINKS = ['TikTok', 'Instagram', 'X (Twitter)', 'LinkedIn']

const CONTACT_INFO = ['+886 2 1234 5678', 'hello@blazelink.co', 't.me/blazelink']

export default function SiteFooter() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-anim='reveal']").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="pt-12">
      <footer ref={sectionRef} className="border-t border-hairline flex flex-col items-center overflow-hidden p-6 w-full">
        <div className="flex flex-col gap-20 lg:gap-[200px] items-start max-w-[1968px] w-full">
          <div data-anim="reveal" className="flex flex-col lg:flex-row gap-12 lg:gap-6 items-start w-full">
            <div className="flex-1 flex flex-col gap-10 items-start min-w-0">
              <p className="font-heading font-bold uppercase text-2xl tracking-[-1.92px] text-ink">Blazelink</p>
              <div className="flex flex-col gap-4 items-start max-w-[330px] w-full">
                <p className="font-body text-lg max-w-[240px] text-ink">預約諮詢，一起討論您的成長策略。</p>
                <a
                  href="#contact"
                  className="group relative inline-flex items-center gap-1.5 pt-0.5 pb-1 text-sm uppercase text-ink font-body w-fit"
                >
                  <span className="absolute left-0 right-0 bottom-0.5 h-px bg-ink" />
                  <span>立即預約</span>
                  <svg
                    className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6 items-start w-full">
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <a key={link.label} href={link.href} className="font-body text-sm uppercase text-ink hover:opacity-60 transition">
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {SOCIAL_LINKS.map((label) => (
                  <a key={label} href="#" className="font-body text-sm uppercase text-ink hover:opacity-60 transition">
                    {label}
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {CONTACT_INFO.map((line) => (
                  <span key={line} className="font-body text-sm uppercase text-ink">
                    {line}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-6 items-start w-full">
            <div className="flex-1 self-stretch min-w-0" />
            <div className="flex-1 flex items-center justify-between min-w-0 flex-wrap gap-4">
              <div className="flex gap-6 items-center">
                <a href="#" className="font-body text-sm uppercase text-ink hover:opacity-60 transition">
                  隱私權政策
                </a>
                <div className="bg-hairline h-px w-16" />
                <a href="#" className="font-body text-sm uppercase text-ink hover:opacity-60 transition">
                  服務條款
                </a>
              </div>
              <a href="#" className="font-body text-sm uppercase text-ink hover:opacity-60 transition">
                授權條款
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
