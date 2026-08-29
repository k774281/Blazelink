import { useState, useEffect, useRef } from 'react'
import { ScrollTrigger } from '../lib/gsap.js'

const pages = [
  {
    leftBgImage: '/img-1.png',
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      heading: '你還在為了轉換率的問題煩惱嗎？',
      description: '只交付漂亮的版面，沒有人為轉換負責',
    },
  },
  {
    leftBgImage: null,
    rightBgImage:
      '/img-2.png',
    leftContent: {
      heading: '你還在為了名單的問題煩惱嗎？',
      description: '流量報表好看，名單卻進不了業務手上',
    },
    rightContent: null,
  },
  {
    leftBgImage:
      '/img-3.png',
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      heading: '你還在為了內容的問題煩惱嗎？',
      description: '內容外包代寫，缺乏專業與信任訊號',
    },
  },
  {
    leftBgImage: null,
    rightBgImage:
      '/img-4.png',
    leftContent: {
      heading: '你還在為了無法持續的問題煩惱嗎？',
      description: '專案結束即斷線，沒有持續迭代',
    },
    rightContent: null,
  },
  {
    leftBgImage:
      '/img-5.png',
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      heading: '這些問題我們都可以為您解決！',
      description: <>表單、名單分級到 CRM 全線打通</>,
    },
  },
]

export default function ScrollAdventure() {
  const [currentPage, setCurrentPage] = useState(1)
  const numOfPages = pages.length
  const sectionRef = useRef(null)
  const pinRef = useRef(null)

  // The track (sectionRef) is numOfPages viewport-heights tall; ScrollTrigger
  // pins the h-screen inner element (pinRef) for the whole scroll distance
  // across that track and unpins automatically once it scrolls past, so the
  // page naturally continues down afterwards instead of staying stuck.
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: pinRef.current,
      scrub: true,
      onUpdate: (self) => {
        const page = Math.min(numOfPages, Math.max(1, Math.round(self.progress * (numOfPages - 1)) + 1))
        setCurrentPage(page)
      },
    })

    return () => st.kill()
  }, [numOfPages])

  return (
    <div ref={sectionRef} className="relative" style={{ height: `${numOfPages * 100}vh` }}>
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden bg-black">
        {pages.map((page, i) => {
          const idx = i + 1
          const isActive = currentPage === idx
          const upOff = 'translateY(-100%)'
          const downOff = 'translateY(100%)'
          const leftTrans = isActive ? 'translateY(0)' : downOff
          const rightTrans = isActive ? 'translateY(0)' : upOff

          return (
            <div key={idx} className="absolute inset-0">
              {/* Left Half */}
              <div className="absolute top-0 left-0 w-1/2 h-full transition-transform duration-[1000ms]" style={{ transform: leftTrans }}>
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: page.leftBgImage ? `url(${page.leftBgImage})` : undefined }}
                >
                  <div className="flex flex-col items-center justify-center h-full text-white p-8">
                    {page.leftContent && (
                      <>
                        <h2 className="text-5xl uppercase mb-4 text-center">{page.leftContent.heading}</h2>
                        <p className="text-3xl text-center">{page.leftContent.description}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Half */}
              <div className="absolute top-0 left-1/2 w-1/2 h-full transition-transform duration-[1000ms]" style={{ transform: rightTrans }}>
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: page.rightBgImage ? `url(${page.rightBgImage})` : undefined }}
                >
                  <div className="flex flex-col items-center justify-center h-full text-white p-8">
                    {page.rightContent && (
                      <>
                        <h2 className="text-5xl uppercase mb-4 text-center">{page.rightContent.heading}</h2>
                        {typeof page.rightContent.description === 'string' ? (
                          <p className="text-3xl text-center">{page.rightContent.description}</p>
                        ) : (
                          <div className="text-3xl text-center">{page.rightContent.description}</div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
