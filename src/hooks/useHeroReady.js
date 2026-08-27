import { useEffect, useState } from 'react'
import { DOOR_OPEN_AT } from '../lib/preloaderTiming.js'

// Hero's entrance animations (header fade-down, hero-left fade-up +
// typewriter, hero-right scale-in + avatar fly-ins + count-up, the logo
// ticker's fade-up) must not fire while still hidden behind the preloader
// door — left unguarded they finish playing out before the door ever opens,
// so the reveal shows a static, already-landed page. Components using this
// only mount once it flips true, which re-anchors every one of their
// internal delays to the door-open moment instead of page load.
export function useHeroReady() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), DOOR_OPEN_AT)
    return () => clearTimeout(timer)
  }, [])

  return ready
}
