import { useEffect, useRef, useState } from 'react'
import { MessageSquareTextIcon } from '@animateicons/react/lucide'
import { gsap } from '../lib/gsap.js'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

const TESTIMONIALS = [
  {
    date: '2026年2月6日',
    title: '破除翻譯迷思：台灣品牌打入歐美市場的「跨國 SEO」落地實戰指南',
    image: '/oversea-seo-guide-cover-1400x788.jpg',
  },
  {
    date: '2026年2月1日',
    title: '2026 年，台灣品牌進攻歐美市場，做 SEO 還有效嗎？',
    image: '/2026-is-seo-still-worth-it-cover-1400x788.jpg',
  },
  {
    date: '2025年12月19日',
    title: '為什麼「網站翻譯」根本不是「國際SEO」？跨境擴張的四大隱形大坑',
    image: '/translate-seo-1400x788.jpg',
  },
  {
    date: '2025年11月22日',
    title: '你的 SEO 只是「排名看爽的」嗎？為什麼「名單型SEO」與 Landing Page 才是企業獲利的唯一解',
    image: '/seo-leads-cover-1400x788.jpg',
  },
]

const N = TESTIMONIALS.length

function TestimonialCard({ t, iconRef }) {
  if (!t) return null
  return (
    <>
      <div className="w-full h-[240px] shrink-0 overflow-hidden bg-mist">
        <img src={t.image} alt={t.title} className="w-full h-full object-cover block" />
      </div>
      <div className="flex-1 flex flex-col items-start gap-3 p-6">
        <p className="text-xs text-muted uppercase tracking-[0.08em]">{t.date}</p>
        <div className="h-[3px] w-[50px] bg-brand-dark" />
        <div className="flex items-start gap-2">
          <MessageSquareTextIcon ref={iconRef} size={30} className="mt-1 shrink-0" color="#031846" />
          <p className="text-2xl leading-[1.4] font-body text-ink">{t.title}</p>
        </div>
      </div>
    </>
  )
}

export default function TestimonialsSection() {
  const sectionRef = useRef(null)
  const centerRef = useRef(null)
  const leftFrameRef = useRef(null)
  const rightFrameRef = useRef(null)
  const [index, setIndex] = useState(0)
  const dirRef = useRef(1)
  // MessageSquareTextIcon only animates on its own internal hover (its own
  // small box), not the whole card — driven imperatively off the center
  // article's hover instead, same as the CTA icons elsewhere on the site.
  // Also fired once whenever navigation lands a new article in the center.
  const iconRef = useRef(null)

  const prevIndex = (index - 1 + N) % N
  const nextIndex = (index + 1) % N

  useScrollReveal(sectionRef)

  useEffect(() => {
    const d = dirRef.current
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.fromTo(centerRef.current, { opacity: 0, scale: 0.92, x: d * 30, y: 12 }, { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.5, ease: 'power3.out' }, 0)
      tl.fromTo(leftFrameRef.current, { opacity: 0, x: d * -20 }, { opacity: 0.5, x: 0, duration: 0.5, ease: 'power2.out' }, 0.05)
      tl.fromTo(rightFrameRef.current, { opacity: 0, x: d * 20 }, { opacity: 0.5, x: 0, duration: 0.5, ease: 'power2.out' }, 0.05)
    }, sectionRef)

    return () => ctx.revert()
  }, [index])

  useEffect(() => {
    iconRef.current?.startAnimation()
  }, [index])

  const goPrev = () => {
    dirRef.current = -1
    setIndex((i) => (i - 1 + N) % N)
  }

  const goNext = () => {
    dirRef.current = 1
    setIndex((i) => (i + 1) % N)
  }

  return (
    <section
      ref={sectionRef}
      className="bg-[#10141b] relative px-6 py-24 min-h-[700px] flex flex-col items-center justify-center overflow-hidden"
    >
      <span data-anim="hand" className="font-hand text-brand text-3xl uppercase absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
        最新消息
      </span>

      <button
        data-anim="reveal"
        onClick={goPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-ink p-3 hover:opacity-90 transition"
        aria-label="上一則"
      >
        <svg className="size-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        data-anim="reveal"
        onClick={goNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-ink p-3 hover:opacity-90 transition"
        aria-label="下一則"
      >
        <svg className="size-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div className="relative mx-auto flex w-full max-w-[1440px] items-center justify-center mt-12 h-[480px]">
        <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -ml-[240px] z-0 pointer-events-none">
          <div ref={leftFrameRef} className="opacity-50 scale-75 rotate-[5deg]">
            <article className="bg-white border-[3px] border-mist w-[400px] h-[480px] flex flex-col overflow-hidden rounded-[50px] font-body">
              <TestimonialCard t={TESTIMONIALS[prevIndex]} />
            </article>
          </div>
        </div>
        <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ml-[240px] z-0 pointer-events-none">
          <div ref={rightFrameRef} className="opacity-50 scale-75 -rotate-[5deg]">
            <article className="bg-white border-[3px] border-mist w-[400px] h-[480px] flex flex-col overflow-hidden rounded-[50px] font-body">
              <TestimonialCard t={TESTIMONIALS[nextIndex]} />
            </article>
          </div>
        </div>
        <div className="relative z-10">
          <article
            ref={centerRef}
            className="bg-white border-[3px] border-mist w-[400px] h-[480px] flex flex-col overflow-hidden rounded-[50px] font-body"
            onMouseEnter={() => iconRef.current?.startAnimation()}
            onMouseLeave={() => iconRef.current?.stopAnimation()}
          >
            <TestimonialCard t={TESTIMONIALS[index]} iconRef={iconRef} />
          </article>
        </div>
      </div>
    </section>
  )
}
