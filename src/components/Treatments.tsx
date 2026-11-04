import { useState } from "react"
import { motion } from "motion/react"
import { treatments } from "../content"
import { Reveal } from "./Reveal"
import styles from "./Treatments.module.css"

const reveal = {
  rest: { opacity: 0, x: 16 },
  show: { opacity: 1, x: 0 },
}

export function Treatments() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="section" id="treatments">
      <div className="container">
        <Reveal className="section-head">
          <h2>Treatments the assistant knows</h2>
          <p className="lead">
            The ones people most often travel to India for. Each starts with one practical question, before any doctor
            is involved.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
        <ul className={styles.list}>
          {treatments.map((t, i) => {
            const isOpen = open === i
            return (
              <motion.li
                key={t.title}
                className={styles.row}
                initial="rest"
                whileHover="show"
                whileFocus="show"
                animate={isOpen ? "show" : "rest"}
                tabIndex={0}
                onClick={() => setOpen(isOpen ? null : i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setOpen(isOpen ? null : i)
                  }
                }}
                aria-expanded={isOpen}
              >
                <div className={styles.lead}>
                  <h3>{t.title}</h3>
                  <p className={styles.text}>{t.text}</p>
                </div>
                <motion.p
                  className={styles.question}
                  variants={reveal}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className={styles.who}>Assistant asks first:</span> {t.question}
                </motion.p>
              </motion.li>
            )
          })}
        </ul>
        </Reveal>
      </div>
    </section>
  )
}
