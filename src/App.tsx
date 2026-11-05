import { useEffect, useState } from "react"
import { MotionConfig, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { Problem } from "./components/Problem"
import { AskRecord } from "./components/AskRecord"
import { Jobs } from "./components/Jobs"
import { WhyNow } from "./components/WhyNow"
import { Robot } from "./components/Robot"
import { Proof } from "./components/Proof"
import { Traction } from "./components/Traction"
import { Landscape } from "./components/Landscape"
import { Moat } from "./components/Moat"
import { Plan } from "./components/Plan"
import { Risks } from "./components/Risks"
import { Closing } from "./components/Closing"
import { Footer } from "./components/Footer"
import { NeuralField } from "./components/NeuralField"

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
  const { scrollY } = useScroll()
  const { heroEnd, vh } = useHeroEnd()

  // The ambient wash only takes its shade once the hero stage has scrolled past.
  const ambientOpacity = useTransform(scrollY, [heroEnd - vh * 0.9, heroEnd + vh * 0.4], [0, 1])

  // The navbar appears only once the hero sequence has fully revealed.
  const navAt = Math.max(0, heroEnd - vh * 1.55)
  const [navVisible, setNavVisible] = useState(navAt === 0)
  useMotionValueEvent(scrollY, "change", (y) => setNavVisible(y >= navAt))
  useEffect(() => setNavVisible(window.scrollY >= navAt), [navAt])

  return (
    <MotionConfig reducedMotion="user">
      <motion.div className="ambient" aria-hidden="true" style={{ opacity: ambientOpacity }} />
      <NeuralField />
      <div id="top">
        <Header visible={navVisible} />
        <main>
          <Hero />
          <Problem />
          <AskRecord />
          <Jobs />
          <WhyNow />
          <Robot />
          <Proof />
          <Traction />
          <Landscape />
          <Moat />
          <Plan />
          <Risks />
          <Closing />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
