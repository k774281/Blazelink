import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap.js'

export default function WideBanner() {
  const imgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { scale: 1.18 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: imgRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="w-full">
      <div className="w-full bg-mist overflow-hidden aspect-[1440/680]">
        <img
          ref={imgRef}
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80"
          className="size-full object-cover"
          alt=""
        />
      </div>
    </section>
  )
}
