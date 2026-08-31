import { useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import ShuffleHero from './ShuffleHero.jsx'

export default function AboutSection() {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef)

  return (
    <section id="about" ref={sectionRef} className="relative mx-auto flex min-h-[1080px] max-w-[1440px] flex-col justify-between p-6">
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

      <ShuffleHero />

      <p data-anim="reveal" className="font-body text-sm uppercase max-w-[140px]">
        專業行銷服務
      </p>
    </section>
  )
}
