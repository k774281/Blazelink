import { useRef } from 'react'
import { useInView } from 'motion/react'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { TextHoverEffect } from './TextHoverEffect.jsx'
import { FeatureSteps } from './FeatureSteps.jsx'
import TextGenerateEffect from './TextGenerateEffect.jsx'
import CtaButton from './CtaButton.jsx'


const FEATURES = [
  {
    feature: 'feature 1',
    title: '網站架設',
    content: '量身打造的網站架構，精準對接品牌定位與轉換目標。',
    image: '/img-1.jpg',
  },
  {
    feature: 'feature 2',
    title: 'AI導入',
    content: '客製化導入 AI 工具與流程，強化團隊效率與洞察力。',
    image: '/img-2.jpg',
  },
  {
    feature: 'feature 3',
    title: 'API串接',
    content: '串接內外部系統與平台，讓數據與服務無縫串連。',
    image: '/img-3.jpg',
  },
]

export default function ServicesSection() {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef, { hand: false })

  // Same char-stagger blur/fade reveal as AboutSection's title (ShuffleHero's
  // TextGenerateEffect) — toggles on every scroll in/out (no `once`) so it
  // replays on re-entry too.
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { amount: 0.3 })

  return (
    <section id="services" ref={sectionRef} className="relative bg-[#1b022e] px-6 py-[120px] lg:py-[200px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <TextHoverEffect text="SERVICES" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] flex flex-col items-center">
        <div data-anim="reveal" className="flex w-full flex-wrap items-start justify-between gap-10 mb-20">
          <div ref={headingRef} className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              Services
            </span>
            <TextGenerateEffect
              as="h2"
              trigger={headingInView}
              className="font-heading font-bold uppercase text-white text-[40px] md:text-[40px] lg:text-[48px] leading-[0.96] tracking-[-2px] lg:tracking-[-3.84px]"
            >
              您的形象，可以從這裡開始
            </TextGenerateEffect>
            <TextGenerateEffect
              as="p"
              trigger={headingInView}
              staggerDuration={0.02}
              className="max-w-[560px] font-body text-xl text-white/70"
            >
              從網站架設到AI導入與API串接，我們陪伴品牌一步步建立值得信賴的數位形象，讓每個環節都真正發揮作用。
            </TextGenerateEffect>
            <div className="tools border border-white/45 bg-ink/45 flex p-5 rounded-full gap-10">
              <img src="figma.svg" alt="" className="w-10 max-[1079px]:h-[30px] max-[1079px]:w-[30px]" />
              <img src="circle-w.svg" alt="" className="w-10 max-[1079px]:h-[30px] max-[1079px]:w-[30px]" />
              <img src="figma.svg" alt="" className="w-10 max-[1079px]:h-[30px] max-[1079px]:w-[30px]" />
            </div>
          </div>
          <p className="max-w-[280px] pt-2 font-body text-sm text-white/70 md:text-base">
            我們結合策略、速度與專業技術，為您打造真正見效的網站服務。
          </p>
        </div>
        <div data-anim="reveal" className="w-full">
          <FeatureSteps features={FEATURES} autoPlayInterval={4000} imageHeight="h-[500px]" />
        </div>
        <CtaButton
          label="了解網站案例"
          variant="outline"
          buttonClassName="bg-[#190964]"
          iconWrapClassName="bg-white/15"
          wrapClassName="mt-10 ml-4 opacity-0 animate-fade-up-sm [animation-delay:3.2s]"
        />
      </div>
    </section>
  )
}
