import { useEffect, useState } from 'react'

export default function TypewriterHeading({
  text,
  splitIndex,
  speed = 35,
  startDelay = 400,
  colorBefore = '#0E0E0E',
  colorAfter = '#704de3',
  accentColors = [],
  className = '',
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let intervalId
    const timeoutId = setTimeout(() => {
      let i = 0
      intervalId = setInterval(() => {
        i += 1
        setCount(i)
        if (i >= text.length) clearInterval(intervalId)
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [text, speed, startDelay])

  const visible = text.slice(0, count)
  const done = count >= text.length

  return (
    <h1
      className={`hero-heading m-0 font-heading text-[64px] font-semibold leading-[80px] tracking-[-1.5px] min-md:max-lg:text-[48px] min-md:max-lg:leading-[52px] min-sm:max-md:text-[36px] min-sm:max-md:leading-[42px] min-sm:max-md:tracking-[-1px] max-sm:text-[28px] max-sm:leading-[34px] max-sm:tracking-[-0.5px] ${className}`}
    >
      {visible.split('').map((ch, idx) =>
        ch === '\n' ? (
          <br key={idx} />
        ) : (
          <span key={idx} style={{ color: idx < splitIndex ? colorBefore : accentColors[idx - splitIndex] ?? colorAfter }}>
            {ch}
          </span>
        )
      )}
      {!done && <span className="typing-cursor" aria-hidden="true" />}
    </h1>
  )
}
