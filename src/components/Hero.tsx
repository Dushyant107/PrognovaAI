import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react"
import { emptyRail, type RailState, type StageId } from "../content"
import { Assistant } from "./Assistant"
import { Crescent } from "./Crescent"
import { TripRail } from "./TripRail"
import styles from "./Hero.module.css"

const Emblem3D = lazy(() => import("./Emblem3D"))

const ease = [0.16, 1, 0.3, 1] as const
const headline = "Plan your treatment trip in one conversation."
const lines = [
  ["Plan", "your", "treatment", "trip"],
  ["in", "one", "conversation."],
]

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

export function Hero() {
  const [rail, setRail] = useState<RailState>(emptyRail)
  const [active, setActive] = useState<StageId | null>(null)
  const [ready, setReady] = useState(false)
  const reduce = useReducedMotion() ?? false
  const desktop = useDesktop()
  const pinned = desktop && !reduce

  const onRail = useCallback((patch: Partial<RailState>) => setRail((r) => ({ ...r, ...patch })), [])
  const onReset = useCallback(() => {
    setRail(emptyRail)
    setActive(null)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1200)
    return () => clearTimeout(t)
  }, [])

  const filled = Object.values(rail).filter((s) => s !== "empty").length

  return (
    <>
      {pinned ? (
        <PinnedStage />
      ) : (
        <StaticStage />
      )}

      <section className={styles.workspaceSection} id="demo">
        <div className={`container ${styles.workspace}`} id="workspace">
          <div className={`glass ${styles.panel}`}>
            <div className={styles.chat}>
              <Assistant onRail={onRail} onActive={setActive} onReset={onReset} start={ready} />
            </div>
            <aside className={styles.plan} aria-label="Your trip plan">
              <div className={styles.planHead}>
                <span className={styles.planTitle}>Your trip plan</span>
                <span className={styles.planCount}>{filled} of 6 stages</span>
              </div>
              <TripRail state={rail} active={active} layoutKey="hero" vertical />
              <p className={`small ${styles.planNote}`}>
                Every item is marked planned, requested or confirmed. A coordinator confirms before anything is booked.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

function Copy({
  line1,
  line2,
  lead,
  actions,
}: {
  line1: { opacity: any; y: any }
  line2: { opacity: any; y: any }
  lead: { opacity: any; y: any }
  actions: { opacity: any; y: any }
}) {
  const reveal = [line1, line2]
  return (
    <div className={styles.copy}>
      <h1 className={styles.h1} aria-label={headline}>
        {lines.map((line, li) => (
          <motion.span key={li} className={styles.line} aria-hidden="true" style={reveal[li]}>
            {line.map((w, i) => (
              <span key={i} className={styles.word}>
                {w}
              </span>
            ))}
          </motion.span>
        ))}
      </h1>
      <motion.p className={`lead ${styles.lead}`} style={lead}>
        The assistant compares care options in India, prices your stay and transfers, and asks your hospital for a visa
        letter. A coordinator confirms every booking. Your doctor makes every medical decision.
      </motion.p>
      <motion.div className={styles.actions} style={actions}>
        <a
          className="button"
          href="#ask"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById("workspace")?.scrollIntoView({ behavior: "smooth", block: "center" })
            setTimeout(() => document.getElementById("ask")?.focus({ preventScroll: true }), 500)
          }}
        >
          Start a conversation
        </a>
        <a className="button secondary" href="#closing">
          Book a free call
        </a>
      </motion.div>
    </div>
  )
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
      const naturalCenter = parentLeft + el.offsetLeft + el.offsetWidth / 2
      setDx(window.innerWidth / 2 - naturalCenter)
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  const step = (a: number, b: number) => ({
    opacity: useTransform(p, [a, b], [0, 1]),
    y: useTransform(p, [a, b], [36, 0]),
  })

  const line1 = step(0.12, 0.26)
  const line2 = step(0.24, 0.38)
  const lead = step(0.4, 0.54)
  const actions = step(0.56, 0.68)

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
          <Copy line1={line1} line2={line2} lead={lead} actions={actions} />
          <motion.div ref={emblemRef} className={styles.emblem} style={{ x: emblemX, scale: emblemScale }}>
            <motion.div className={styles.spot} aria-hidden="true" style={{ opacity: spotOpacity }} />
            <motion.div
              className={styles.floor}
              aria-hidden="true"
              style={{ opacity: floorOpacity, scaleX: floorScale }}
            />
            <div className={styles.canvas} role="img" aria-label="Prognova emblem, interactive 3D model">
              <Suspense fallback={<Crescent className={styles.fallback} size={360} withFigure />}>
                <Emblem3D progress={p} />
              </Suspense>
            </div>
          </motion.div>
        </div>
        <motion.div className={styles.hint} style={{ opacity: hint }} aria-hidden="true">
          <span className={styles.hintLine} />
          <span>Scroll</span>
        </motion.div>
      </div>
    </section>
  )
}

function StaticStage() {
  const one = useMotionValue(1)
  const zero = useMotionValue(0)
  const shown = { opacity: one, y: zero }
  return (
    <section className={styles.staticStage} id="hero-stage" aria-label="Introduction">
      <motion.div
        className={`container ${styles.stage}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <Copy line1={shown} line2={shown} lead={shown} actions={shown} />
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
