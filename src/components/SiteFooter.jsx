import { useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

const CONTACT_INFO = ['02-66039088', 'service@blazelink.co']
const LANGUAGES = ['中文', 'English', '日本語']

export default function SiteFooter() {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef, { hand: false })

  return (
    <div className="pt-12">
      <footer ref={sectionRef} className="border-t border-hairline flex flex-col items-center overflow-hidden p-6 w-full">
        <div className="flex flex-col gap-5 lg:gap-[50px] items-center max-w-[1440px] w-full">
          <div data-anim="reveal" className="flex flex-col gap-12 items-center w-full">
            <div className="flex flex-col gap-10 items-center min-w-0">
              <img src="/鏈客Logo-Horizontal.png" alt="" className="w-[300px]" />
              <div className="flex flex-col gap-2 items-center">
                {CONTACT_INFO.map((line) => (
                  <span key={line} className="font-body text-sm uppercase text-ink">
                    {line}
                  </span>
                ))}
              </div>
              <div className="flex flex-row gap-6 items-center">
                {LANGUAGES.map((lang, i) => (
                  <div key={lang} className="flex flex-row items-center gap-3">
                    {i > 0 && <div className="bg-hairline h-px w-5" />}
                    <a href="#" className="font-body text-lg uppercase text-ink hover:opacity-60 transition">
                      {lang}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-row justify-around items-center w-full">
            <p>Copyright 2026 © 鏈客策略行銷股份有限公司</p>
            <div className="flex flex-row gap-6 items-center">
              <a href="#" className="font-body text-sm uppercase text-ink hover:opacity-60 transition">
                隱私權政策
              </a>
              <div className="bg-hairline h-px w-16" />
              <a href="#" className="font-body text-sm uppercase text-ink hover:opacity-60 transition">
                服務條款
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
