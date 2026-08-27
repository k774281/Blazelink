import { useEffect, useState } from 'react'
import FloatingPaths from './FloatingPaths.jsx'

const NAME = 'BLAZELINK'
// Must match .loader_line::before's animation-delay in App.css — the line
// (and, driven from here, the floating-paths background) only appears once
// the BLAZELINK letter sweep has had a full pass.
const LINE_APPEAR_MS = 1800
// Sequence: BLAZELINK + the center line hold and animate together for
// HOLD_MS, THEN the line rushes out to the viewport's top/bottom edges
// (LINE_EXPAND_MS), and ONLY ONCE that finishes do the door panels slide
// open left/right (DOOR_OPEN_MS) to reveal the page.
const HOLD_MS = 3000
const LINE_EXPAND_MS = 500
const DOOR_OPEN_MS = 900
const DOOR_OPEN_AT = HOLD_MS + LINE_EXPAND_MS
// Brief fade of whatever's left once the door has finished opening, before
// the component unmounts.
const FINISH_FADE_MS = 300
const TOTAL_MS = DOOR_OPEN_AT + DOOR_OPEN_MS + FINISH_FADE_MS

export default function Preloader() {
  const [pathsVisible, setPathsVisible] = useState(false)
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

    const pathsTimer = setTimeout(() => setPathsVisible(true), LINE_APPEAR_MS)
    const expandTimer = setTimeout(() => setLineExpanding(true), HOLD_MS)
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
      clearTimeout(pathsTimer)
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

      <FloatingPaths position={1} className={pathsVisible ? 'is-visible' : ''} animated={false} />

      <div className="loader_line" />

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
    </div>
  )
}
