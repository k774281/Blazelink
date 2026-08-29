import { useEffect, useRef } from 'react'
import { ArrowUpRightIcon } from '@animateicons/react/lucide'
import { gsap } from '../lib/gsap.js'
import ShuffleHero from './ShuffleHero.jsx'

const FEATURES = [
  { icon: '/social-marketing_17675704.gif', title: '精準行銷策略', subtitle: 'Precision Marketing' },
  { icon: '/filter_19016344.gif', title: '自動化銷售漏斗', subtitle: 'MarTech Automation' },
  { icon: '/movement.gif', title: 'SEO跨國內容行銷', subtitle: 'Content Marketing' },
]

export default function AboutSection() {
  const sectionRef = useRef(null)
  // ArrowUpRightIcon only animates on its own internal hover (its own small
  // box), not the wider CTA — driven imperatively off the button's hover
  // instead, same as the Hero CTA this button matches.
  const arrowRef = useRef(null)

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

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative flex min-h-[1080px] flex-col justify-between p-6">
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

      {/* <div className="flex w-full items-center justify-between gap-10 max-lg:flex-col">
        <div data-anim="reveal" className="flex flex-col gap-6 max-w-[380px]">
          <p className="font-body text-lg max-w-[280px] text-ink">自動化獲客的成長引擎，讓品牌擁有可持續的正向循環。</p>

          <div className="flex flex-col gap-3">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="flex items-center gap-3">
                <img src={feature.icon} alt="" className="h-9 w-9 shrink-0" />
                <div className="flex flex-col">
                  <span className="font-body text-sm font-medium text-ink">{feature.title}</span>
                  <span className="font-body text-xs uppercase tracking-[0.08em] text-muted">{feature.subtitle}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="btn-border-wrap btn-border-wrap--accent hero-cta-wrap">
            <button
              type="button"
              className="btn btn-cta btn-cta--outline inline-flex items-center justify-center gap-2 rounded-[50px] px-7 py-3.5 text-xl font-medium max-sm:px-5 max-sm:py-3 max-sm:text-sm"
              onMouseEnter={() => arrowRef.current?.startAnimation()}
              onMouseLeave={() => arrowRef.current?.stopAnimation()}
            >
              <span className="btn-cta__label relative z-[2]">了解內容行銷</span>
              <span className="btn-cta__icon-wrap relative z-[2] flex items-center justify-center bg-white/15 rounded-[50px] p-1.5">
                <ArrowUpRightIcon ref={arrowRef} size={32} duration={1} color="#ffffff" />
              </span>
            </button>
          </div>
        </div>

      </div> */}
        <ShuffleHero />

      <p data-anim="reveal" className="font-body text-sm uppercase max-w-[140px]">
        專業行銷服務
      </p>
    </section>
  )
}
