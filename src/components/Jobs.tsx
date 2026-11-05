import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react"
import { jobs } from "../content"
import { Reveal } from "./Reveal"
import styles from "./Jobs.module.css"

const ease = [0.16, 1, 0.3, 1] as const

export function Jobs() {
  const reduce = useReducedMotion() ?? false
  const [desktop, setDesktop] = useState(() => (typeof window === "undefined" ? true : window.innerWidth >= 900))
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)")
    const onChange = () => setDesktop(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])
  return desktop && !reduce ? <PinnedJobs /> : <StaticJobs />
}

function PinnedJobs() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(jobs.items.length - 1, Math.max(0, Math.floor(v * jobs.items.length)))
    setActive(i)
  })
  const it = jobs.items[active]

  return (
    <section className={styles.pinned} id="jobs" ref={ref}>
      <div className={styles.sticky}>
        <div className={`container ${styles.stage}`}>
          <div className={styles.head}>
            <p className="eyebrow">How it works</p>
            <h2>{jobs.title}</h2>
            <p className="body">{jobs.text}</p>
            <p className={`mono ${styles.model}`}>{jobs.model}</p>
          </div>

          <div className={styles.showcase}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={it.n}
                className={styles.card}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -24, scale: 0.98 }}
                transition={{ duration: 0.45, ease }}
              >
                <span className={styles.num}>{it.n}</span>
                <h3 className={styles.name}>{it.name}</h3>
                <p className={styles.text}>{it.text}</p>
                <span className={styles.status} data-live={it.live || undefined}>
                  <i />
                  {it.status}
                </span>
              </motion.div>
            </AnimatePresence>

            <div className={styles.rail} aria-hidden="true">
              {jobs.items.map((x, i) => (
                <span key={x.n} className={styles.tick} data-on={i <= active || undefined} data-active={i === active || undefined}>
                  <b>{x.name}</b>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={`container ${styles.footer}`}>
          <p className={`small ${styles.footnote}`}>{jobs.footnote}</p>
          <span className={`mono ${styles.counter}`}>
            {it.n} / 0{jobs.items.length}
          </span>
        </div>
      </div>
    </section>
  )
}

function StaticJobs() {
  return (
    <section className="section" id="jobs">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 style={{ marginTop: 16 }}>{jobs.title}</h2>
          </div>
          <p className="lead">{jobs.text}</p>
        </Reveal>
        <ul className={styles.list}>
          {jobs.items.map((it, i) => (
            <Reveal as="li" key={it.n} delay={i * 0.06} className={styles.listItem}>
              <span className={styles.num}>{it.n}</span>
              <div>
                <h3 className={styles.name}>{it.name}</h3>
                <p className={styles.text}>{it.text}</p>
                <span className={styles.status} data-live={it.live || undefined}>
                  <i />
                  {it.status}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
        <p className={`small ${styles.footnote}`}>{jobs.footnote}</p>
      </div>
    </section>
  )
}
