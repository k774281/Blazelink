import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap.js'

const CARDS = [
  {
    title: '網站架設',
    desc: '量身打造的網站架構，精準對接品牌定位與轉換目標。',
    rotate: 'lg:-rotate-6',
    wrapClass: 'lg:-mr-16',
    zClass: '',
    icon: <img src="/setting.png" alt="" className="w-16 h-16 object-contain" />,
  },
  {
    title: 'AI導入',
    desc: '客製化導入 AI 工具與流程，強化團隊效率與洞察力。',
    rotate: 'lg:rotate-[10deg]',
    wrapClass: 'lg:-mr-16 lg:pt-6',
    zClass: 'z-10',
    icon: <img src="/cloud.png" alt="" className="w-16 h-16 object-contain" />,
  },
  {
    title: 'API串接',
    desc: '串接內外部系統與平台，讓數據與服務無縫串連。',
    rotate: 'lg:rotate-3',
    wrapClass: '',
    zClass: 'z-20',
    icon: <img src="/api.png" alt="" className="w-16 h-16 object-contain" />,
  },
]

export default function ServicesSection() {
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

      gsap.utils.toArray("[data-anim='card-pop']").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          scale: 0.7,
          y: 60,
          duration: 0.9,
          delay: (i % 3) * 0.12,
          ease: 'back.out(1.6)',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="bg-[#F8F8F8] px-6 py-[120px] lg:py-[200px]">
      <div className="mx-auto max-w-[1968px] flex flex-col gap-20 lg:gap-[160px] items-center">
        <h2
          data-anim="reveal"
          className="font-heading font-bold uppercase text-ink text-[40px] md:text-[64px] lg:text-[96px] leading-[0.96] tracking-[-2px] lg:tracking-[-3.84px] text-center max-w-[760px]"
        >
          網站服務
        </h2>
        <div className="flex items-center justify-center w-full flex-wrap gap-6 lg:gap-0">
          {CARDS.map((card) => (
            <div key={card.title} data-anim="card-pop" className={`${card.wrapClass} ${card.zClass} shrink-0`}>
              <div className={card.rotate}>
                <div className="bg-[#E8E6EF] border-[3px] border-white/5 rounded-[100px] rounded-tl-[150px] shadow-[0_8px_4px_0_rgba(103,103,104,0.25)] flex flex-col h-[400px] w-[328px] items-start justify-end p-6 relative text-[#2B2727]">
                  <div className="absolute -top-6 -left-6 inline-flex items-center justify-center p-5 rounded-[50px] bg-[#E8E6EF] border-[16px] border-[#f8f8f8]">
                    {card.icon}
                  </div>
                  <div>
                    <p className="font-heading font-bold uppercase text-[32px] leading-[0.96] tracking-[-1.28px]">{card.title}</p>
                    <p className="font-body text-lg mt-2 max-w-[240px] text-[#2B2727]/80">{card.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
