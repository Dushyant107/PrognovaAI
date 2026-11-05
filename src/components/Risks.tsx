import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { risks } from "../content"
import { Reveal } from "./Reveal"
import styles from "./Risks.module.css"

const ease = [0.22, 1, 0.36, 1] as const

export function Risks() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="section" id="risks">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">Risks</p>
            <h2 className={styles.title}>
              <span className={styles.line}>{risks.titleA}</span>
              <span className={`${styles.line} ${styles.dim}`}>{risks.titleB}</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className={styles.list}>
            {risks.items.map((r, i) => {
              const isOpen = open === i
              const id = `risk-${i}`
              return (
                <li key={r.risk} className={styles.item} data-open={isOpen || undefined}>
                  <button
                    type="button"
                    className={styles.q}
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className={styles.index}>0{i + 1}</span>
                    <span className={styles.riskName}>{r.risk}</span>
                    <span className={styles.riskText}>{r.text}</span>
                    <motion.span
                      className={styles.icon}
                      aria-hidden="true"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease }}
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="a"
                        id={id}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className={styles.answer}>
                          <span className={styles.answerLabel}>What we do</span>
                          <p>{r.response}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
