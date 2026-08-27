import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap.js'

const TESTIMONIALS = [
  {
    date: '2026年2月6日',
    quote: '團隊真的懂內容行銷。策略清楚、溝通順暢，成效也在幾週後持續放大，整個合作過程專業又安心。',
    name: '林雅婷',
    service: '內容行銷',
    tag: '長期合作',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
  },
  {
    date: '2025年12月19日',
    quote: '每個環節都能感受到用心。成果自然不做作，日常操作也變得更簡單、更有效率。',
    name: '陳詠萱',
    service: '成長顧問',
    tag: '首次合作',
    rating: 5.0,
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80',
  },
  {
    date: '2026年2月1日',
    quote: '我們想要的是簡單、低維護但長期有效的方案，團隊一次就抓到重點，現在每天管理起來都很輕鬆。',
    name: '黃思穎',
    service: '廣告投放',
    tag: '首次合作',
    rating: 5.0,
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80',
  },
  {
    date: '2025年11月22日',
    quote: '第一次諮詢就讓我們很有信心。團隊很仔細聆聽需求，策略是圍繞我們真正的營運狀況打造，而不是套版建議。',
    name: '吳承翰',
    service: '成長策略',
    tag: '長期合作',
    rating: 5.0,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  },
  {
    date: '2025年10月8日',
    quote: '成效跟事前討論的完全一致，沒有任何驚喜或落差。品牌調性拿捏得很好，是真正想長期經營才會有的細膩度。',
    name: '許庭瑄',
    service: '內容行銷',
    tag: '首次合作',
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
  },
]

const N = TESTIMONIALS.length

function TestimonialCard({ t }) {
  if (!t) return null
  return (
    <>
      <p className="text-xs text-muted uppercase tracking-[0.08em] mb-4">{t.date}</p>
      <p className="text-xl leading-[1.28] max-w-[320px] font-body text-ink">{t.quote}</p>
      <div className="flex gap-4 pt-6 border-t border-hairline">
        <div className="w-16 h-16 shrink-0 bg-mist overflow-hidden">
          <img src={t.avatar} alt={t.name} className="w-full h-full object-cover block" />
        </div>
        <div className="flex flex-col justify-between flex-1">
          <p className="text-base font-body text-ink">{t.name}</p>
          <div className="flex gap-4 items-end">
            <div className="flex-1 text-xs text-muted uppercase leading-[1.4]">
              <p>{t.service}</p>
              <p>{t.tag}</p>
            </div>
            <div className="flex gap-1 items-center text-sm text-muted">
              <span className="text-brand">★</span>
              <span>{t.rating.toFixed(1)}</span>
            </div>
          </div>
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

  const prevIndex = (index - 1 + N) % N
  const nextIndex = (index + 1) % N

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
      className="bg-mist relative px-6 py-24 min-h-[700px] flex flex-col items-center justify-center overflow-hidden"
    >
      <span data-anim="hand" className="font-hand text-brand text-3xl uppercase absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
        聽聽客戶怎麼說
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

      <div className="relative flex items-center justify-center w-full mt-12 h-[480px]">
        <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -ml-[240px] z-0 pointer-events-none">
          <div ref={leftFrameRef} className="opacity-50 scale-75 rotate-[5deg]">
            <article className="bg-white border-[3px] border-mist w-[400px] h-[480px] flex flex-col justify-between p-6 font-body">
              <TestimonialCard t={TESTIMONIALS[prevIndex]} />
            </article>
          </div>
        </div>
        <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ml-[240px] z-0 pointer-events-none">
          <div ref={rightFrameRef} className="opacity-50 scale-75 -rotate-[5deg]">
            <article className="bg-white border-[3px] border-mist w-[400px] h-[480px] flex flex-col justify-between p-6 font-body">
              <TestimonialCard t={TESTIMONIALS[nextIndex]} />
            </article>
          </div>
        </div>
        <div className="relative z-10">
          <article ref={centerRef} className="bg-white border-[3px] border-mist w-[400px] h-[480px] flex flex-col justify-between p-6 font-body">
            <TestimonialCard t={TESTIMONIALS[index]} />
          </article>
        </div>
      </div>
    </section>
  )
}
