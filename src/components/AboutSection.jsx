import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap.js'

const HEADING = '我們深入理解您的需求，打造真正見效的行銷成長策略'

const PARALLAX_PHOTOS = [
  {
    src: '/img-1.png',
    rotate: 'rotate-[10deg]',
    className: 'pt-8 -mr-20',
    speed: 0.5,
  },
  {
    src: '/img-2.png',
    rotate: '-rotate-2',
    className: 'pt-[120px] -mr-20',
    speed: 0.2,
  },
  {
    src: '/img-3.png',
    rotate: '-rotate-[8deg]',
    className: '',
    speed: 0.6,
  },
]

export default function AboutSection() {
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

      gsap.utils.toArray("[data-anim='hand']").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          scale: 0.4,
          rotate: -8,
          duration: 0.7,
          ease: 'back.out(1.8)',
          transformOrigin: 'center',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        })
      })

      gsap.utils.toArray("[data-anim='parallax']").forEach((el) => {
        const speed = parseFloat(el.dataset.speed || '0.3')
        gsap.to(el, {
          yPercent: -50 * speed,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative p-6 min-h-[900px] flex flex-col">
      <div className="flex items-start justify-between w-full">
        <p data-anim="reveal" className="font-body text-sm uppercase tracking-[0.14px] leading-tight max-w-[140px]">
          資深行銷顧問
          <br />
          B2B 成長團隊
        </p>
        <p data-anim="hand" className="font-hand text-brand text-3xl uppercase">
          B2B 企業
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="relative max-w-[824px] w-full">
          <h2
            data-anim="reveal"
            className="font-heading font-bold uppercase text-[40px] md:text-[64px] lg:text-[96px] leading-[0.96] tracking-[-2px] lg:tracking-[-3.84px] text-center text-ink"
          >
            {HEADING}
          </h2>
          <span data-anim="hand" className="font-hand text-brand text-3xl uppercase absolute -top-8 right-[15%] whitespace-nowrap">
            About Us
          </span>
          <span data-anim="hand" className="font-hand text-brand text-3xl uppercase absolute -left-12 top-[calc(50%-83px)]">
            Pro
          </span>
          <span data-anim="hand" className="font-hand text-brand text-3xl uppercase absolute -bottom-8 left-[200px] whitespace-nowrap">
            Since 2023
          </span>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pt-16 hidden md:flex items-start justify-center pointer-events-none">
            {PARALLAX_PHOTOS.map((photo, i) => (
              <div key={i} data-anim="parallax" data-speed={photo.speed} className={`${photo.className} shrink-0`}>
                <div className={photo.rotate}>
                  <div className="relative w-[200px] h-[267px] border-[3px] border-white shadow-md bg-mist rounded-[150px] flex items-center justify-center">
                    <img src={photo.src} className="w-[260px] max-w-none h-auto object-contain" alt="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div data-anim="reveal" className="mt-10 md:mt-[280px]">
          <div className="btn-border-wrap btn-border-wrap--accent hero-cta-wrap">
            <button
              type="button"
              className="btn btn-cta group inline-flex items-center justify-center gap-2 rounded-[50px] bg-brand text-white px-7 py-3.5 text-xl font-medium max-sm:px-5 max-sm:py-3 max-sm:text-sm"
            >
              <span className="btn-cta__label relative z-[2]">了解內容行銷</span>
              <span className="btn-cta__icon-wrap relative z-[2] flex items-center justify-center bg-white/15 rounded-[50px] p-1.5">
                <svg
                  className="btn-cta__icon text-white transition-transform duration-300 group-hover:-rotate-45"
                  width="28"
                  height="28"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 9H14M14 9L9.5 4.5M14 9L9.5 13.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between w-full gap-8">
        <p data-anim="reveal" className="font-body text-sm uppercase max-w-[140px]">
          專業行銷服務
        </p>
        <div data-anim="reveal" className="flex flex-col gap-4 max-w-[330px]">
          <p className="font-body text-lg max-w-[240px] text-ink">自動化獲客的成長引擎。</p>
          <a
            href="#services"
            className="group relative inline-flex items-center gap-1.5 pt-0.5 pb-1 text-sm uppercase text-ink font-body w-fit"
          >
          </a>
        </div>
      </div>
    </section>
  )
}
