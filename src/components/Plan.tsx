import { motion } from "motion/react"
import { plan } from "../content"
import { Reveal, item, stagger } from "./Reveal"
import styles from "./Plan.module.css"

export function Plan() {
  return (
    <section className="section" id="plan">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">The plan</p>
            <h2 className={styles.title}>{plan.title}</h2>
          </div>
          <p className="lead">{plan.text}</p>
        </Reveal>

        <motion.ol
          className={styles.phases}
          variants={stagger}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        >
          {plan.phases.map((ph, i) => (
            <motion.li key={ph.phase} className={styles.phase} variants={item}>
              <div className={styles.phaseHead}>
                <span className="mono">{ph.phase}</span>
                <span className={styles.months}>{ph.months}</span>
              </div>
              <h3>{ph.title}</h3>
              <div className={styles.block}>
                <span className={styles.blockLabel}>Milestones</span>
                <ul className={styles.milestones}>
                  {ph.milestones.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
              <div className={`${styles.block} ${styles.gate}`}>
                <span className={styles.blockLabel}>Gate {i + 1}</span>
                <p>{ph.gate}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
