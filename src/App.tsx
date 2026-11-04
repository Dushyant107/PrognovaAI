import { useEffect, useState } from "react"
import { MotionConfig, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react"
import type { Country } from "./content"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { Stages } from "./components/Stages"
import { Prices } from "./components/Prices"
import { Trust } from "./components/Trust"
import { Treatments } from "./components/Treatments"
import { Faq } from "./components/Faq"
import { Closing } from "./components/Closing"
import { Footer } from "./components/Footer"
import { Starfall } from "./components/Starfall"

function useHeroEnd() {
  const [heroEnd, setHeroEnd] = useState(0)
  const [vh, setVh] = useState(() => (typeof window === "undefined" ? 800 : window.innerHeight))
  useEffect(() => {
    const measure = () => {
      const el = document.getElementById("hero-stage")
      setHeroEnd(el ? el.offsetTop + el.offsetHeight : 0)
      setVh(window.innerHeight)
    }
    measure()
    const t = setTimeout(measure, 400)
    window.addEventListener("resize", measure)
    return () => {
      clearTimeout(t)
      window.removeEventListener("resize", measure)
    }
  }, [])
  return { heroEnd, vh }
}

export default function App() {
  const [country, setCountry] = useState<Country>("UK")
  const { scrollY } = useScroll()
  const { heroEnd, vh } = useHeroEnd()

  // The green ambient only takes its shade once the hero stage has scrolled past.
  const ambientOpacity = useTransform(scrollY, [heroEnd - vh * 0.9, heroEnd + vh * 0.4], [0, 1])

  // The navbar appears only once the hero sequence has fully revealed.
  const navAt = Math.max(0, heroEnd - vh * 1.55)
  const [navVisible, setNavVisible] = useState(navAt === 0)
  useMotionValueEvent(scrollY, "change", (y) => setNavVisible(y >= navAt))
  useEffect(() => setNavVisible(window.scrollY >= navAt), [navAt])

  return (
    <MotionConfig reducedMotion="user">
      <motion.div className="ambient" aria-hidden="true" style={{ opacity: ambientOpacity }}>
        <span className="b1" />
        <span className="b2" />
        <span className="b3" />
      </motion.div>
      <Starfall />
      <div id="top">
        <Header country={country} onCountry={setCountry} visible={navVisible} />
        <main>
          <Hero />
          <Stages />
          <Prices country={country} onCountry={setCountry} />
          <Trust />
          <Treatments />
          <Faq />
          <Closing />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
