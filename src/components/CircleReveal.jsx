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
// Once AboutSection has scrolled up far enough to cover the viewport, the
// overlay is invisible but still a full-viewport fixed layer — and the mask
// still carries a clip-path. Leaving it mounted made the compositor blend
// two dead full-screen layers on every scroll, which showed up as stutter
// when scrolling back and forth in place. Unmount it past this margin
// (measured from the track's top edge leaving the viewport).
const HIDE_AFTER_EXTRA_PX = 400

export default function CircleReveal() {
  const trackRef = useRef(null)
  const maskRef = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const [covered, setCovered] = useState(false)

  useEffect(() => {
    // Progress is driven by the track's OWN position relative to the
    // viewport (getBoundingClientRect), not by how far window.scrollY has
    // gone from the page top. That matters because the page's total
    // scrollable range depends on the hero's rendered height, which varies
    // a lot by breakpoint — tying progress to an absolute scrollY distance
    // could simply be unreachable on layouts that are short.
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
      const progress = Math.min(Math.max((window.innerHeight - rect.top) / track.offsetHeight, 0), 1)
      const percent = MIN_PERCENT + progress * (MAX_PERCENT - MIN_PERCENT)

      if (maskRef.current) {
        maskRef.current.style.clipPath = `circle(${percent}% at 50% 100%)`
      }
      setRevealed(percent >= HEADING_REVEAL_PERCENT)
      // -rect.top is how far the track's top has travelled above the
      // viewport; the sections after it start one viewport + buffer later,
      // so past that the overlay is fully hidden behind AboutSection.
      setCovered(-rect.top >= window.innerHeight + HIDE_AFTER_EXTRA_PX)
    }

    // getBoundingClientRect() forces a synchronous layout, and scroll fires
    // far more often than the screen refreshes — especially on touch. Coalesce
    // bursts of events down to one measurement per frame.
    let queued = false
    const onScroll = () => {
      if (queued) return
      queued = true
      requestAnimationFrame(() => {
        queued = false
        update()
      })
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
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <>
      {/* Pure scroll distance — the circle's growth is mapped onto this
          element's travel through the viewport, so the effect needs a
          viewport's worth of scroll to play out. It renders nothing: the
          hero shows through until the mask's circle wipes across it. */}
      <div ref={trackRef} className="scroll-reveal-track h-screen" aria-hidden="true" />
      {/* Holds the heading fully landed for a beat before AboutSection
          reaches it. */}
      <div className="scroll-reveal-buffer h-[200px]" aria-hidden="true" />
      {/* The overlay stays pinned rather than fading out. `.app` is an
          `isolate` stacking context, so everything after it paints above
          this z-50 layer — AboutSection simply scrolls up over the heading
          and covers it, the same way the later sections stack. It unmounts
          once covered so it stops costing a composite on every scroll. */}
      {!covered && (
        <>
          <div
            ref={(node) => {
              maskRef.current = node
              // Remounting after being covered starts from the stylesheet's
              // circle(0%), which would flash the hero back through the mask
              // for a frame. Scrolling back up can only re-enter here with the
              // circle fully grown, so paint that immediately.
              if (node) node.style.clipPath = `circle(${MAX_PERCENT}% at 50% 100%)`
            }}
            className="circle-reveal-mask fixed inset-0 z-50 bg-page-bg pointer-events-none"
            aria-hidden="true"
          />
          <section
            className={`circle-reveal-content${revealed ? ' is-revealed' : ''} fixed inset-0 z-[51] flex items-center justify-center px-6 pointer-events-none`}
            aria-hidden={!revealed}
          >
            <h2 className="circle-reveal__heading max-w-[900px] m-0 text-center font-hand text-[40px] font-semibold leading-[1.4] text-ink">
              {HEADING_TEXT.split('').map((ch, i) => (
                <span className="char-wrap" key={i}>
                  <span className="char" style={{ transitionDelay: `${i * 0.03}s` }}>
                    {ch}
                  </span>
                </span>
              ))}
            </h2>
          </section>
        </>
      )}
    </>
  )
}
