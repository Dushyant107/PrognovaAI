import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { faqs } from "../content"
import { Reveal } from "./Reveal"
import styles from "./Faq.module.css"

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="section" id="faq">
      <div className="container">
        <Reveal className="section-head">
          <h2>Questions people ask before they travel</h2>
          <p className="lead">Short answers on the assistant, the planning call, prices and bookings.</p>
        </Reveal>

        <Reveal delay={0.1}>
        <ul className={styles.list}>
          {faqs.map((f, i) => {
            const isOpen = open === i
            const id = `faq-${i}`
            return (
              <li key={f.q} className={styles.item}>
                <button
                  type="button"
                  className={styles.q}
                  aria-expanded={isOpen}
                  aria-controls={id}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{f.q}</span>
                  <motion.span
                    className={styles.icon}
                    aria-hidden="true"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
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
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className={styles.a}>{f.a}</p>
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
