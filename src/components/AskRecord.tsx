import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ask } from "../content"
import { Reveal } from "./Reveal"
import styles from "./AskRecord.module.css"

const ease = [0.16, 1, 0.3, 1] as const

export function AskRecord() {
  const [active, setActive] = useState<string | null>(null)
  const q = ask.questions.find((x) => x.id === active) ?? null
  const cited = new Set(q?.cites ?? [])
  const familyHighlighted = q?.id === "q2"

  return (
    <section className="section" id="ask">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.copy}>
            <Reveal>
              <p className="eyebrow">Ask the record</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2>{ask.title}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="body">{ask.text}</p>
            </Reveal>

            <Reveal delay={0.15} className={styles.questions}>
              {ask.questions.map((x, i) => (
                <motion.button
                  key={x.id}
                  type="button"
                  className={styles.q}
                  data-active={active === x.id || undefined}
                  onClick={() => setActive(x.id)}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="mono">Q{i + 1}</span>
                  <span>{x.label}</span>
                </motion.button>
              ))}
            </Reveal>

            <div className={`glass ${styles.answer}`} aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                {q ? (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease }}
                    className={styles.answerBody}
                  >
                    <p className={styles.answerText}>{q.answer}</p>
                    <p className={styles.cite}>
                      <span className={styles.citeDot} data-empty={q.cites.length === 0 || undefined} />
                      {q.page}
                    </p>
                  </motion.div>
                ) : (
                  <motion.p key="empty" className={styles.prompt} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {ask.prompt}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <Reveal delay={0.1}>
              <p className={styles.refusal}>{ask.refusal}</p>
            </Reveal>
          </div>

          <Reveal className={styles.docWrap} delay={0.1} y={40}>
            <div className={styles.doc}>
              <div className={styles.docHead}>
                <span className="mono">{ask.report.title}</span>
                <span className={styles.docPage}>{ask.report.page}</span>
              </div>
              <p className={styles.docMeta}>{ask.report.meta}</p>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Line</th>
                    <th>Test</th>
                    <th>Result</th>
                    <th>Reference interval</th>
                  </tr>
                </thead>
                <tbody>
                  {ask.report.rows.map((r) => (
                    <tr key={r.line} data-cited={cited.has(r.line) || undefined} data-dim={(q && !cited.has(r.line) && q.cites.length > 0) || undefined}>
                      <td className={styles.lineNo}>{r.line}</td>
                      <td>{r.test}</td>
                      <td className={styles.result}>{r.result}</td>
                      <td className={styles.ref}>{r.ref}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={styles.family} data-cited={familyHighlighted || undefined}>
                <span className="mono">Family history</span>
                <span className={styles.familyText}>{ask.report.familyHistory}</span>
              </div>
              <p className={styles.docNote}>{ask.report.note}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
