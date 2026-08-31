import { useHeroReady } from './hooks/useHeroReady.js'
import Preloader from './components/Preloader.jsx'
import GatewayFlow from './components/GatewayFlow.jsx'
import Header from './components/Header.jsx'
import HeroLeft from './components/HeroLeft.jsx'
import HeroRight from './components/HeroRight.jsx'
import LogoTicker from './components/LogoTicker.jsx'
import ScrollDown from './components/ScrollDown.jsx'
import CircleReveal from './components/CircleReveal.jsx'
import AboutSection from './components/AboutSection.jsx'
import ServicesSection from './components/ServicesSection.jsx'
import WideBanner from './components/WideBanner.jsx'
import ProcessSection from './components/ProcessSection.jsx'
import TestimonialsSection from './components/TestimonialsSection.jsx'
import BigCta from './components/BigCta.jsx'
import SiteFooter from './components/SiteFooter.jsx'

export default function App() {
  // Gates every one-shot hero entrance effect (header fade-down, hero-left
  // fade-up + typewriter, hero-right scale-in + avatar fly-ins + count-up,
  // logo ticker fade-up) behind the preloader's door-open moment — mounting
  // them earlier would let them finish playing while still hidden, so the
  // reveal would show an already-landed page instead of animating in.
  const heroReady = useHeroReady()

  return (
    <>
      <Preloader />

      <div className="app relative isolate min-h-screen w-full flex flex-col bg-ink">
        <GatewayFlow className="-z-10" />

        {heroReady && <Header />}

        <main className="hero relative min-h-screen flex-1 flex items-center max-w-[1440px] w-full mx-auto px-16 pb-[220px] min-sm:max-md:px-4 max-sm:px-2 max-sm:pb-[200px]">
          {heroReady && (
            <div className="hero-row w-full flex items-center justify-center gap-12 max-lg:flex-col max-lg:items-center max-lg:text-left">
              <HeroLeft />
              <HeroRight />
            </div>
          )}
          <ScrollDown />
          {/* {heroReady && <LogoTicker />} */}
        </main>

        <CircleReveal />
      </div>

      <div className="bg-white text-ink w-full overflow-x-hidden relative">
        <AboutSection />
        <ServicesSection />
        <WideBanner />
        <LogoTicker />
        <ProcessSection />
        <TestimonialsSection />
        <BigCta />
        <SiteFooter />
      </div>
    </>
  )
}
