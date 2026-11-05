import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react"
import { hero, links } from "../content"
import { Crescent } from "./Crescent"
import styles from "./Hero.module.css"

const Emblem3D = lazy(() => import("./Emblem3D"))
const ease = [0.16, 1, 0.3, 1] as const

function useDesktop() {
  const [desktop, setDesktop] = useState(() => (typeof window === "undefined" ? true : window.innerWidth >= 900))
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)")
    const onChange = () => setDesktop(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])
  return desktop
}

type Reveal = { opacity: MotionValue<number> | number; y: MotionValue<number> | number }

function Copy({ eyebrow, title, lead, actions }: { eyebrow: Reveal; title: Reveal; lead: Reveal; actions: Reveal }) {
  return (
    <div className={styles.copy}>
      <motion.p className="eyebrow" style={eyebrow}>
        <b>{hero.eyebrow}</b>
      </motion.p>
      <motion.h1 className={styles.h1} style={title}>
        {hero.title}
      </motion.h1>
      <motion.p className={`lead ${styles.lead}`} style={lead}>
        {hero.lead}
      </motion.p>
      <motion.div className={styles.actions} style={actions}>
        <a className="button accent" href={links.chat} target="_blank" rel="noreferrer">
          {hero.cta} <span className="arrow">↗</span>
        </a>
        <a className="textlink" href="#how-it-works">
          How it works <span aria-hidden="true">↓</span>
        </a>
      </motion.div>
    </div>
  )
}

export function Hero() {
  const reduce = useReducedMotion() ?? false
  const desktop = useDesktop()
  return desktop && !reduce ? <PinnedStage /> : <StaticStage />
}

function PinnedStage() {
  const ref = useRef<HTMLDivElement>(null)
  const emblemRef = useRef<HTMLDivElement>(null)
  const [dx, setDx] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const p = useSpring(scrollYProgress, { stiffness: 170, damping: 32, mass: 0.35 })

  useEffect(() => {
    const measure = () => {
      const el = emblemRef.current
      if (!el) return
      const parent = el.offsetParent as HTMLElement | null
      const parentLeft = parent ? parent.getBoundingClientRect().left : 0
      setDx(window.innerWidth / 2 - (parentLeft + el.offsetLeft + el.offsetWidth / 2))
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  const step = (a: number, b: number): Reveal => ({
    opacity: useTransform(p, [a, b], [0, 1]),
    y: useTransform(p, [a, b], [36, 0]),
  })
  const eyebrow = step(0.1, 0.22)
  const title = step(0.18, 0.34)
  const lead = step(0.38, 0.52)
  const actions = step(0.54, 0.66)

  const emblemX = useTransform(p, [0, 0.55], [dx, 0])
  const emblemScale = useTransform(p, [0, 0.55], [1.15, 1])
  const hint = useTransform(p, [0, 0.1], [1, 0])
  const spotOpacity = useTransform(p, [0, 0.55], [1, 0.6])
  const floorOpacity = useTransform(p, [0.62, 0.8], [0, 1])
  const floorScale = useTransform(p, [0.62, 0.8], [0.6, 1])

  return (
    <section className={styles.pinned} ref={ref} id="hero-stage" aria-label="Introduction">
      <div className={styles.sticky}>
        <div className={`container ${styles.stage}`}>
          <Copy eyebrow={eyebrow} title={title} lead={lead} actions={actions} />
          <motion.div ref={emblemRef} className={styles.emblem} style={{ x: emblemX, scale: emblemScale }}>
            <motion.div className={styles.spot} aria-hidden="true" style={{ opacity: spotOpacity }} />
            <motion.div className={styles.floor} aria-hidden="true" style={{ opacity: floorOpacity, scaleX: floorScale }} />
            <div className={styles.canvas} role="img" aria-label="Prognova emblem, interactive 3D model">
              <Suspense fallback={<Crescent className={styles.fallback} size={360} withFigure />}>
                <Emblem3D progress={p} />
              </Suspense>
            </div>
          </motion.div>
        </div>
        <motion.div className={styles.hint} style={{ opacity: hint }} aria-hidden="true">
          <span className={styles.hintLine} />
          <span>{hero.hint}</span>
        </motion.div>
      </div>
    </section>
  )
}

function StaticStage() {
  const one = useMotionValue(1)
  const zero = useMotionValue(0)
  const shown: Reveal = { opacity: one, y: zero }
  return (
    <section className={styles.staticStage} id="hero-stage" aria-label="Introduction">
      <motion.div
        className={`container ${styles.stage}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <Copy eyebrow={shown} title={shown} lead={shown} actions={shown} />
        <div className={styles.emblem}>
          <div className={styles.spot} aria-hidden="true" />
          <div className={styles.floor} aria-hidden="true" />
          <div className={styles.canvas} role="img" aria-label="Prognova emblem, interactive 3D model">
            <Suspense fallback={<Crescent className={styles.fallback} size={300} withFigure />}>
              <Emblem3D />
            </Suspense>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
