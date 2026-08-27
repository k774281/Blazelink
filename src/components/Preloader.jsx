import { useEffect, useState } from 'react'
import GatewayFlow from './GatewayFlow.jsx'
import { BG_LEAD_MS, HOLD_MS, DOOR_OPEN_MS, DOOR_OPEN_AT, TOTAL_MS } from '../lib/preloaderTiming.js'

const NAME = 'BLAZELINK'
// GatewayFlow's canvas background runs alone for BG_LEAD_MS before BLAZELINK
// and the center line mount in — .loader_line's own CSS delays (1800ms/
// 3800ms, baked into App.css) then count from THAT later mount, not from
// component mount, so the rest of the sequence shifts as a whole without
// needing its hardcoded delays touched.
//
// Timing constants live in ../lib/preloaderTiming.js — useHeroReady.js reads
// DOOR_OPEN_AT from the same place so the hero's entrance animations are
// guaranteed to start exactly when the door does, never before.

export default function Preloader() {
  const [started, setStarted] = useState(false)
  const [lineExpanding, setLineExpanding] = useState(false)
  const [doorOpen, setDoorOpen] = useState(false)
  const [finishing, setFinishing] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const { body, documentElement: html } = document
    const prevBodyOverflow = body.style.overflow
    const prevHtmlOverflow = html.style.overflow

    // Locks the page at the top for the whole hold so the door-open always
    // reveals the hero — without this, scrolling during the hold would
    // leave the real page scrolled away from the top once the overlay lifts.
    window.scrollTo(0, 0)
    body.style.overflow = 'hidden'
    html.style.overflow = 'hidden'

    const restoreScroll = () => {
      body.style.overflow = prevBodyOverflow
      html.style.overflow = prevHtmlOverflow
    }

    const startTimer = setTimeout(() => setStarted(true), BG_LEAD_MS)
    const expandTimer = setTimeout(() => setLineExpanding(true), BG_LEAD_MS + HOLD_MS)
    const doorTimer = setTimeout(() => setDoorOpen(true), DOOR_OPEN_AT)
    const finishTimer = setTimeout(() => setFinishing(true), DOOR_OPEN_AT + DOOR_OPEN_MS)
    // Rendering null on the next tick still leaves this component mounted
    // (App.jsx always renders <Preloader />), so the effect's cleanup below
    // never fires just from that — the scroll lock has to be released here
    // directly, or it stays stuck locked for the rest of the visit.
    const hideTimer = setTimeout(() => {
      setHidden(true)
      restoreScroll()
    }, TOTAL_MS)

    return () => {
      clearTimeout(startTimer)
      clearTimeout(expandTimer)
      clearTimeout(doorTimer)
      clearTimeout(finishTimer)
      clearTimeout(hideTimer)
      restoreScroll()
    }
  }, [])

  if (hidden) return null

  const stateClass = `${lineExpanding ? ' is-expanding' : ''}${doorOpen ? ' is-door-open' : ''}${finishing ? ' is-finishing' : ''}`

  return (
    <div className={`preloader fixed inset-0 z-[999] flex items-center justify-center${stateClass}`} aria-hidden="true">
      <div className="preloader__panel preloader__panel--left" />
      <div className="preloader__panel preloader__panel--right" />

      <GatewayFlow />

      {started && <div className="loader_line" />}

      {started && (
        <div className="preloader-lines relative z-[2] flex items-center justify-center h-[120px] w-auto px-[1ch] font-heading text-[1.6em] font-semibold select-none text-white scale-[2]">
          {NAME.split('').map((letter, idx) => (
            <span
              key={idx}
              className="preloader-lines__letter relative inline-block opacity-0 z-[2] text-white"
              style={{ animationDelay: `${0.1 + idx * 0.105}s` }}
            >
              {letter}
            </span>
          ))}

          <div className="preloader-lines__mask absolute top-0 left-0 w-full h-full z-[1] bg-transparent">
            <div className="preloader-lines__gradient absolute top-0 left-0 w-full h-full" />
          </div>
        </div>
      )}
    </div>
  )
}
