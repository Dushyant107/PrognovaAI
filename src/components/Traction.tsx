import { motion } from "motion/react"
import { traction } from "../content"
import { Counter } from "./Counter"
import { Reveal, item, stagger } from "./Reveal"
import styles from "./Traction.module.css"

export function Traction() {
  return (
    <section className="section" id="traction">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Traction</p>
          <h2 className={styles.title}>{traction.title}</h2>
        </Reveal>
        <motion.div
          className={styles.stats}
          variants={stagger}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        >
          {traction.stats.map((s) => (
            <motion.div key={s.label} className={styles.stat} variants={item}>
              <span className={styles.value}>
                <Counter value={s.value} duration={2} />
              </span>
              <span className={styles.label}>{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
        <Reveal>
          <p className={`small ${styles.note}`}>{traction.note}</p>
        </Reveal>
      </div>
    </section>
  )
}
