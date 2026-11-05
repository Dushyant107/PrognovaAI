import { motion } from "motion/react"
import { landscape } from "../content"
import { Reveal, item, stagger } from "./Reveal"
import styles from "./Landscape.module.css"

export function Landscape() {
  return (
    <section className="section" id="landscape">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">The landscape</p>
            <h2 className={styles.title}>
              <span className={styles.line}>{landscape.titleA}</span>
              <span className={`${styles.line} ${styles.dim}`}>{landscape.titleB}</span>
            </h2>
          </div>
          <p className="lead">{landscape.text}</p>
        </Reveal>

        <Reveal>
          <p className={`small ${styles.caption}`}>{landscape.caption}</p>
        </Reveal>

        <motion.div
          className={styles.rows}
          variants={stagger}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        >
          <div className={`${styles.row} ${styles.headRow}`} aria-hidden="true">
            <span>Approach</span>
            <span>Knows</span>
            <span>Grounded in</span>
            <span>Where it stops</span>
          </div>
          {landscape.rows.map((r) => (
            <motion.div key={r.name} className={styles.row} data-us={r.us || undefined} variants={item}>
              <div className={styles.who}>
                <span className={styles.name}>{r.name}</span>
                <span className={`mono ${styles.sub}`}>{r.sub}</span>
              </div>
              <div className={styles.cell}>
                <span className={styles.cellLabel}>Knows</span>
                {r.knows}
              </div>
              <div className={styles.cell}>
                <span className={styles.cellLabel}>Grounded in</span>
                {r.grounded}
              </div>
              <div className={styles.cell}>
                <span className={styles.cellLabel}>Where it stops</span>
                {r.stops}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <Reveal>
          <p className={`body ${styles.closing}`}>{landscape.closing}</p>
        </Reveal>
      </div>
    </section>
  )
}
