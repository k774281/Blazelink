import { useRef } from 'react'
import { useInView } from 'motion/react'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { FeatureSteps } from './FeatureSteps.jsx'
import TextGenerateEffect from './TextGenerateEffect.jsx'
import CtaButton from './CtaButton.jsx'
import { asset } from '../lib/asset.js'
import { t, sitePath } from '../lib/locale.js'


const FEATURES = [
  {
    feature: 'feature 1',
    title: t.services.items[0].title,
    content: t.services.items[0].content,
    image: asset('/services-1.webp'),
  },
  {
    feature: 'feature 2',
    title: t.services.items[1].title,
    content: t.services.items[1].content,
    image: asset('/services-2.webp'),
  },
  {
    feature: 'feature 3',
    title: t.services.items[2].title,
    content: t.services.items[2].content,
    image: asset('/services-3.webp'),
  },
]

export default function ServicesSection() {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef, { hand: false })

  // Same char-stagger blur/fade reveal as AboutSection's title (ShuffleHero's
  // TextGenerateEffect). `once` so scrolling back up doesn't replay it.
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { amount: 0.3, once: true })

  return (
    <section id="services" ref={sectionRef} className="relative bg-[#0c1e4f] px-6 py-[120px] lg:py-[200px] overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1440px] flex flex-col items-center">
        <div data-anim="reveal" className="flex w-full flex-wrap items-start justify-between gap-10 mb-20">
          <p className="max-w-[280px] pt-2 font-body text-sm text-white/70 md:text-base">
            {t.services.eyebrow}
          </p>
          <div ref={headingRef} className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              Services
            </span>
            <TextGenerateEffect
              as="h2"
              trigger={headingInView}
              className="font-heading font-bold uppercase text-white text-3xl md:text-4xl lg:text-[48px] leading-[0.96] tracking-[-2px] lg:tracking-[-3.84px] max-sm:text-[24px]"
            >
              {t.services.title}
            </TextGenerateEffect>
            <TextGenerateEffect
              as="p"
              trigger={headingInView}
              staggerDuration={0.02}
              className="max-w-[560px] font-body text-lg md:text-xl max-sm:text-[16px] text-white/70"
            >
              {t.services.lead}
            </TextGenerateEffect>

          </div>
        </div>
        <div data-anim="reveal" className="w-full">
          <FeatureSteps features={FEATURES} autoPlayInterval={4000} imageHeight="h-[500px]" />
        </div>
        <CtaButton
          label={t.services.cta}
          href={sitePath('web-design')}
          variant="outline"
          buttonClassName="bg-[#190964]"
          iconWrapClassName="bg-white/15"
          wrapClassName="mt-10 ml-4 opacity-0 animate-fade-up-sm [animation-delay:3.2s]"
        />
      </div>
    </section>
  )
}
