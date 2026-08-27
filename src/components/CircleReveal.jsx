import { useEffect, useRef, useState } from 'react'

const HEADING_TEXT = '想了解我們有什麼服務嗎？'
const MIN_PERCENT = 0
// CSS circle() percentages resolve against sqrt((w²+h²)/2), not against the
// distance to a corner, so 100% doesn't actually reach the corners. 150%
// comfortably covers every corner across realistic aspect ratios (the
// required value approaches ~141% only in the extreme-portrait limit).
const MAX_PERCENT = 150
// Heading appears once the mask's clip-path reaches this percentage —
// earlier than full coverage (150%), while the circle is still growing.
const HEADING_REVEAL_PERCENT = 65
// Once fully revealed, scrolling this much further makes the heading exit
// again (same per-char translateY transition, just reversed).
const EXIT_AFTER_PX = 100
// Once the heading has had room to finish exiting, the whole fixed overlay
// (mask + heading) fades away and stops covering the viewport, so the
// sections placed after CircleReveal in normal document flow become visible
// and scrollable instead of being permanently hidden underneath it.
const RELEASE_AFTER_PX = 150

export default function CircleReveal() {
  const trackRef = useRef(null)
  const maskRef = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const [released, setReleased] = useState(false)

  useEffect(() => {
    // Progress is driven by the track's OWN position relative to the
    // viewport (getBoundingClientRect), not by how far window.scrollY has
    // gone from the page top. That matters because the page's total
    // scrollable range depends on the hero's rendered height, which varies
    // a lot by breakpoint — tying progress to an absolute scrollY distance
    // could simply be unreachable on layouts that are short. Progress
    // reaching 1 here only requires there to be *any* content after the
    // track (even 0px), which always holds.
    //
    // The mask is a full-viewport layer with clip-path: circle(R% at 50%
    // 100%), R animated by scroll — not transform: scale(), which blurs
    // the circle's edge once magnified far past its native rasterized
    // size. clip-path re-evaluates the exact vector boundary at every
    // size, so the edge stays crisp throughout.
    const update = () => {
      const track = trackRef.current
      if (!track) return

      const rect = track.getBoundingClientRect()
      const vh = window.innerHeight
      const trackHeight = track.offsetHeight
      const rawDistance = vh - rect.top
      const progress = Math.min(Math.max(rawDistance / trackHeight, 0), 1)
      const percent = MIN_PERCENT + progress * (MAX_PERCENT - MIN_PERCENT)
      const overshoot = rawDistance - trackHeight

      if (maskRef.current) {
        maskRef.current.style.clipPath = `circle(${percent}% at 50% 100%)`
      }
      setRevealed(percent >= HEADING_REVEAL_PERCENT && overshoot < EXIT_AFTER_PX)
      setReleased(overshoot >= RELEASE_AFTER_PX)
    }

    update()
    // The initial call above runs before the custom web fonts (LXGWFasmartGothic,
    // GlowSansJP, Urbanist — all loaded from external font hosts) have finished
    // swapping in. Since they change the hero's rendered height, the track's
    // position shifts after this point, but nothing else re-triggers a
    // recompute — leaving the mask's clip-path stuck at a stale, non-zero
    // value baked in from the pre-font layout instead of starting fully
    // collapsed offscreen.
    document.fonts.ready.then(update)
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <>
      <div ref={trackRef} className="scroll-reveal-track h-screen" aria-hidden="true" />
      {/* Guarantees real scrollable room past the point the mask fully covers
          the screen, so both the EXIT_AFTER_PX heading exit and the later
          RELEASE_AFTER_PX hand-off to the sections below are reachable. */}
      <div className="scroll-reveal-exit-buffer h-[200px]" aria-hidden="true" />
      <div
        ref={maskRef}
        className={`circle-reveal-mask fixed inset-0 z-50 bg-page-bg pointer-events-none transition-opacity duration-500 ${released ? 'opacity-0' : 'opacity-100'}`}
        aria-hidden="true"
      />
      <section
        className={`circle-reveal-content${revealed ? ' is-revealed' : ''} fixed inset-0 z-[51] flex items-center justify-center px-6 pointer-events-none transition-opacity duration-500 ${released ? 'opacity-0' : 'opacity-100'}`}
        aria-hidden={!revealed}
      >
        <h2 className="circle-reveal__heading max-w-[900px] m-0 text-center font-body text-[40px] font-semibold leading-[1.4] text-ink">
          {HEADING_TEXT.split('').map((ch, i) => (
            <span className="char-wrap" key={i}>
              <span className="char" style={{ transitionDelay: `${i * 0.03}s` }}>
                {ch}
              </span>
            </span>
          ))}
        </h2>
      </section>
        <div><h2>212e3wrf4egtrhb</h2></div>
    </>
  )
}
