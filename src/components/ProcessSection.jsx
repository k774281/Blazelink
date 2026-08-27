import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap.js'

const STEPS = ['精準行銷策略', '內容成長執行', '數據優化迭代']

const PROCESS_IMAGES = [
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80',
]

const BIG_FLOATS = [
  { style: { top: '40px', left: '24px' }, w: 212, aspect: '3/4', idx: 0 },
  { style: { top: '200px', right: '24px' }, w: 212, aspect: '3/4', idx: 1 },
  { style: { bottom: '120px', left: '18%' }, w: 212, aspect: '4/3', idx: 2 },
  { style: { bottom: '40px', right: '20%' }, w: 180, aspect: '3/4', idx: 3 },
]

const SMALL_FLOATS = [
  { style: { top: '80px', left: '28%' }, idx: 4 },
  { style: { top: '140px', left: '64%' }, idx: 5 },
  { style: { top: '280px', left: '14%' }, idx: 0 },
  { style: { top: '420px', right: '14%' }, idx: 1 },
  { style: { bottom: '220px', left: '8%' }, idx: 2 },
  { style: { bottom: '150px', left: '42%' }, idx: 3 },
]

export default function ProcessSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      const steps = sectionRef.current.querySelectorAll("[data-anim='steps'] > div")
      gsap.from(steps, {
        opacity: 0,
        x: -40,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: "[data-anim='steps']", start: 'top 80%' },
      })

      gsap.utils.toArray("[data-anim='reveal']").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })

      gsap.utils.toArray("[data-anim='float']").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: (i % 6) * 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 95%' },
        })
        gsap.to(el, { y: '+=12', duration: 3 + (i % 3), repeat: -1, yoyo: true, ease: 'sine.inOut' })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative px-6 py-24 min-h-[900px] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="hidden lg:block pointer-events-none absolute inset-0">
        {BIG_FLOATS.map((f, i) => (
          <div
            key={i}
            data-anim="float"
            className="absolute overflow-hidden bg-mist"
            style={{ ...f.style, width: f.w, aspectRatio: f.aspect }}
          >
            <img src={PROCESS_IMAGES[f.idx]} className="size-full object-cover" alt="" />
          </div>
        ))}
      </div>
      <div className="hidden lg:block pointer-events-none absolute inset-0 opacity-50">
        {SMALL_FLOATS.map((f, i) => (
          <div
            key={i}
            className="absolute overflow-hidden bg-mist"
            style={{ ...f.style, width: 54, height: 54 }}
          >
            <img src={PROCESS_IMAGES[f.idx]} className="size-full object-cover" alt="" />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10">
        <span data-anim="hand" className="font-hand text-brand text-3xl uppercase whitespace-nowrap">
          你可以對我們有期待
        </span>
        <div data-anim="steps" className="flex flex-col gap-2 items-center pl-6">
          {STEPS.map((step, i) => (
            <div key={step} className="relative inline-flex items-start uppercase">
              <p className="font-hand absolute -left-6 top-0 text-brand text-3xl">{`0${i + 1}`}</p>
              <p className="font-heading font-bold text-[32px] md:text-[48px] lg:text-[64px] leading-[0.96] tracking-[-2.56px] text-ink">
                {step}
              </p>
            </div>
          ))}
        </div>
        <div data-anim="reveal">
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-1.5 pt-0.5 pb-1 text-sm uppercase text-ink font-body"
          >
            <span className="absolute left-0 right-0 bottom-0.5 h-px bg-ink" />
            <span>了解網頁</span>
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
    </section>
  )
}
