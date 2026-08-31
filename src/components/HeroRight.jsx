import { useCountUp } from '../hooks/useCountUp.js'

const AVATARS = [
  {
    orbit: 1,
    src: '/seo.gif',
    angle: 270,
    radius: 177,
    size: 58,
    shape: 'square-20',
    glow: '#704de3',
    delay: 0.6,
  },
  {
    orbit: 2,
    src: 'https://polo-pecan-73837341.figma.site/_assets/v11/ca755f7f93c1126fb8bdbf99ab364a33aa9ab272.png',
    angle: 60,
    radius: 251,
    size: 58,
    shape: 'round',
    glow: '#FFD166',
    delay: 0.8,
  },
  {
    orbit: 2,
    src: 'https://polo-pecan-73837341.figma.site/_assets/v11/dc01064c7093dcc32674876ee3cf5e41c4a485c6.png',
    angle: 180,
    radius: 251,
    size: 78,
    shape: 'round',
    glow: '#FF6FB5',
    delay: 1.0,
  },
  {
    orbit: 2,
    src: '/internet.gif',
    angle: 300,
    radius: 251,
    size: 58,
    shape: 'square-20',
    glow: '#4FA8FF',
    delay: 1.2,
  },
  {
    orbit: 3,
    src: 'https://polo-pecan-73837341.figma.site/_assets/v11/018736aa5d0275c4ce56cfebaf2ae3007d81ca1e.png',
    angle: 130,
    radius: 325,
    size: 88,
    shape: 'round',
    glow: '#FF6FB5',
    delay: 1.5,
  },
  {
    orbit: 4,
    src: 'https://polo-pecan-73837341.figma.site/_assets/v11/c76d8a0b99676de31c014344bfaf75bad090758d.png',
    angle: 30,
    radius: 399,
    size: 58,
    shape: 'round',
    glow: '#704de3',
    delay: 1.7,
  },
  {
    orbit: 4,
    src: 'chat.gif',
    angle: 95,
    radius: 399,
    size: 88,
    shape: 'square-24',
    glow: '#FF9F45',
    delay: 1.9,
  },
  {
    orbit: 4,
    src: '/share.gif',
    angle: 220,
    radius: 399,
    size: 88,
    shape: 'square-24',
    glow: '#FF6FB5',
    delay: 2.1,
  },
  {
    orbit: 4,
    src: 'https://polo-pecan-73837341.figma.site/_assets/v11/926c9eb7b4bc1df846fa0e39f0b0dc3fefd80671.png',
    angle: 320,
    radius: 399,
    size: 58,
    shape: 'round',
    glow: '#704de3',
    delay: 2.3,
  },
]

const shapeClass = {
  round: 'rounded-full',
  'square-20': 'rounded-[20px]',
  'square-24': 'rounded-[24px]',
}

// Same rotation each ring uses (matches .orbit-N in App.css), so the avatar
// group revolving inside orbit N and the ring itself stay in lockstep.
const ORBITS = [1, 2, 3, 4]

export default function HeroRight() {
  const count = useCountUp(20, { duration: 2000, delay: 1200 })

  return (
    <section
      className="hero-right flex-none flex items-center justify-center opacity-0 animate-scale-in [animation-delay:0.3s] w-[calc(720px*var(--circle-scale))] h-[calc(720px*var(--circle-scale))] min-xl:max-2xl:[--circle-scale:0.5] min-lg:max-xl:[--circle-scale:0.4] min-md:max-lg:[--circle-scale:0.4] min-sm:max-md:[--circle-scale:0.3] max-sm:hidden"
    >
      <div className="circles">
        <div className="orbit orbit-4">
          <div className="orbit-ring" />
        </div>
        <div className="orbit orbit-3">
          <div className="orbit-ring" />
        </div>
        <div className="orbit orbit-2">
          <div className="orbit-ring" />
        </div>
        <div className="orbit orbit-1">
          <div className="orbit-ring" />
        </div>

        <div className="orbit-center flex flex-col items-center gap-1 text-center">
          <span className="orbit-center__count font-display text-[64px] font-medium leading-none text-white max-sm:text-[40px]">
            {count}k+
          </span>
          <span className="orbit-center__label font-display text-base font-bold text-white">Specialists</span>
        </div>

        {ORBITS.map((orbitNum) => (
          <div key={orbitNum} className={`orbit-avatars orbit-avatars-${orbitNum}`}>
            {AVATARS.filter((a) => a.orbit === orbitNum).map((a, i) => (
              <div
                key={i}
                className="avatar-anchor"
                style={{
                  transform: `translate(-50%, -50%) rotate(${a.angle}deg) translate(${a.radius}px) rotate(${-a.angle}deg)`,
                }}
              >
                <div className={`avatar-counter avatar-counter-${orbitNum}`}>
                  <img
                    src={a.src}
                    alt=""
                    className={`avatar ${shapeClass[a.shape]}`}
                    style={{
                      width: a.size,
                      height: a.size,
                      animationDelay: `${a.delay}s`,
                      '--avatar-glow': a.glow,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
