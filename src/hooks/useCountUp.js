import { useEffect, useRef, useState } from 'react'

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

export function useCountUp(target, { duration = 2000, delay = 1200 } = {}) {
  const [value, setValue] = useState(0)
  const frameRef = useRef()

  useEffect(() => {
    let start
    const tick = (now) => {
      if (start === undefined) start = now
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      setValue(Math.round(easeOutCubic(progress) * target))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    const timeoutId = setTimeout(() => {
      frameRef.current = requestAnimationFrame(tick)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [target, duration, delay])

  return value
}
