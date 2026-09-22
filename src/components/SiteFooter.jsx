import { useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

const CONTACT_INFO = ['02-66039088', 'service@blazelink.co']
const LANGUAGES = ['中文', 'English', '日本語']

export default function SiteFooter() {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef, { hand: false })

  return (
    <div>
      <footer ref={sectionRef} className="border-t border-white/15 flex flex-col items-center overflow-hidden p-6 w-full bg-gradient-to-bl from-[#49309f] to-[#474374]">
        <div className="flex flex-col gap-5 lg:gap-[50px] items-center max-w-[1440px] w-full">
          <div data-anim="reveal" className="flex flex-col gap-12 items-center w-full">
            <div className="flex flex-col gap-10 items-center min-w-0">
              <img src="/鏈客Logo-Horizontal.png" alt="" className="w-[300px]" />
              <div className="flex flex-col gap-2 items-center">
                {CONTACT_INFO.map((line) => (
                  <span key={line} className="font-body text-sm uppercase text-white/90">
                    {line}
                  </span>
                ))}
              </div>
              <div className="flex flex-row gap-6 items-center">
                {LANGUAGES.map((lang, i) => (
                  <div key={lang} className="flex flex-row items-center gap-3">
                    {i > 0 && <div className="bg-white/20 h-px w-5" />}
                    <a href="#" className="font-body text-lg uppercase text-white/90 hover:opacity-60 transition">
                      {lang}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-around items-center w-full max-lg:flex-col max-lg:gap-4">
            <p className="text-[11px] text-white/90">Copyright 2026 © 鏈客策略行銷股份有限公司</p>
            <div className="flex flex-row gap-6 items-center">
              <a href="#" className="font-body text-sm uppercase text-white/90 hover:opacity-60 transition">
                隱私權政策
              </a>
              <div className="bg-white/20 h-px w-16" />
              <a href="#" className="font-body text-sm uppercase text-white/90 hover:opacity-60 transition">
                服務條款
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
