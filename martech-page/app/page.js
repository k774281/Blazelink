import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Services from "@/components/Services";
import Academy from "@/components/Academy";
import GrowthCta from "@/components/GrowthCta";
import Partners from "@/components/Partners";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="relative mx-auto max-w-[1440px]">
        <Header />
      </div>
      <main>
        <Hero />
        <Philosophy />
        <Services />
        <Academy />
        <GrowthCta />
        <Partners />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
