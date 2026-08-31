import { useEffect } from 'react'
import { gsap } from '../lib/gsap.js'

// Wraps the fade/scale/float scroll-reveal GSAP setup that was copy-pasted
// nearly verbatim across every section: elements tagged data-anim="reveal"
// fade up on scroll into view, data-anim="hand" pop in with a rotate, and
// data-anim="float" fade up staggered by index then float continuously.
// Pass the section's own ref; each type defaults on except `float`, which
// only a couple of sections use — opt in/out per section as needed.
export function useScrollReveal(sectionRef, { reveal = true, hand = true, float = false } = {}) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reveal) {
        gsap.utils.toArray("[data-anim='reveal']").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 60,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          })
        })
      }

      if (hand) {
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
      }

      if (float) {
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
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [reveal, hand, float])
}
