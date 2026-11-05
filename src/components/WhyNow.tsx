import { motion } from "motion/react"
import { whyNow } from "../content"
import { Reveal, item, stagger } from "./Reveal"
import styles from "./WhyNow.module.css"

export function WhyNow() {
  return (
    <section className="section" id="why-now">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">Why now</p>
            <h2 className={styles.title}>{whyNow.title}</h2>
          </div>
          <p className="lead">{whyNow.text}</p>
        </Reveal>

        <motion.ul
          className={styles.list}
          variants={stagger}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        >
          {whyNow.items.map((it) => (
            <motion.li key={it.title} className={styles.item} variants={item}>
              <span className="mono">{it.tag}</span>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </motion.li>
          ))}
        </motion.ul>

        <Reveal className={styles.market}>
          <span className="mono">{whyNow.market.label}</span>
          <div className={styles.marketRows}>
            {whyNow.market.rows.map((r) => (
              <div key={r.name} className={styles.marketRow}>
                <span className={styles.marketName}>{r.name}</span>
                <span className={styles.marketValue}>{r.value}</span>
                <span className="small">{r.source}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
