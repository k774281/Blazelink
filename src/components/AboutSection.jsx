import { useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import ShuffleHero from './ShuffleHero.jsx'
import { t } from '../lib/locale.js'

export default function AboutSection() {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef)

  return (
    <section id="about" ref={sectionRef} className="relative mx-auto flex min-h-[1080px] max-w-[1440px] flex-col justify-between p-6 max-md:gap-15 max-sm:p-2">
      <div className="flex items-start justify-between w-full">
        <p data-anim="reveal" className="font-body text-sm uppercase tracking-[0.14px] leading-tight max-w-[140px]">
          {t.about.roles[0]}
          <br />
          {t.about.roles[1]}
        </p>
        <p data-anim="hand" className="font-hand text-brand-dark text-sm uppercase">
          {t.about.roles[2]}
        </p>
      </div>

      <ShuffleHero />
    </section>
  )
}
