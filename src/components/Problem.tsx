import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react"
import { problem } from "../content"
import { Reveal } from "./Reveal"
import styles from "./Problem.module.css"

// Six scattered pieces of a record converge into one as the reader scrolls.
const scatter = [
  { x: -260, y: -170, r: -14 },
  { x: 240, y: -200, r: 11 },
  { x: -300, y: 60, r: 8 },
  { x: 280, y: 40, r: -9 },
  { x: -150, y: 230, r: 15 },
  { x: 190, y: 210, r: -6 },
]

export function Problem() {
  const reduce = useReducedMotion() ?? false
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })
  const gather = useTransform(p, [0.2, 0.62], [0, 1])
  const oneRecord = useTransform(p, [0.6, 0.72], [0, 1])
  const titleB = useTransform(p, [0.3, 0.42], [0, 1])
  const titleBy = useTransform(p, [0.3, 0.42], [20, 0])

  return (
    <section className={styles.section} id="how-it-works" ref={ref}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <Reveal>
            <p className="eyebrow">The problem</p>
          </Reveal>
          <h2 className={styles.title}>
            <Reveal as="span" className={styles.titleLine} delay={0.05}>
              {problem.titleA}
            </Reveal>
            <motion.span className={`${styles.titleLine} ${styles.titleDim}`} style={reduce ? undefined : { opacity: titleB, y: titleBy }}>
              {problem.titleB}
            </motion.span>
          </h2>
          {problem.paragraphs.map((t, i) => (
            <Reveal key={i} delay={0.1 + i * 0.08}>
              <p className="body">{t}</p>
            </Reveal>
          ))}
        </div>

        <div className={styles.stage} aria-hidden="true">
          <div className={styles.pieces}>
            {problem.pieces.map((label, i) => {
              const s = scatter[i]
              return (
                <Piece key={label} label={label} index={i} gather={gather} s={s} reduce={reduce} />
              )
            })}
            <motion.div className={styles.one} style={reduce ? { opacity: 1 } : { opacity: oneRecord }}>
              <span className="mono">One record</span>
              <span className={styles.oneText}>{problem.oneRecord}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Piece({
  label,
  index,
  gather,
  s,
  reduce,
}: {
  label: string
  index: number
  gather: ReturnType<typeof useTransform<number, number>>
  s: { x: number; y: number; r: number }
  reduce: boolean
}) {
  const x = useTransform(gather, [0, 1], [s.x, 0])
  const y = useTransform(gather, [0, 1], [s.y, index * 10 - 25])
  const rotate = useTransform(gather, [0, 1], [s.r, 0])
  const opacity = useTransform(gather, [0, 0.9, 1], [0.85, 1, index === 5 ? 1 : 0.35])
  return (
    <motion.div
      className={styles.piece}
      style={reduce ? { y: index * 10 - 25, opacity: index === 5 ? 1 : 0.35 } : { x, y, rotate, opacity }}
    >
      <span className={styles.pieceDot} />
      <span>{label}</span>
      <span className={styles.pieceLines}>
        <i />
        <i />
        <i />
      </span>
    </motion.div>
  )
}
