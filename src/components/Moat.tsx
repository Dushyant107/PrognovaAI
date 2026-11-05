import { motion } from "motion/react"
import { moat } from "../content"
import { Reveal, item, stagger } from "./Reveal"
import styles from "./Moat.module.css"

export function Moat() {
  return (
    <section className="section" id="moat">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">The moat</p>
            <h2 className={styles.title}>
              <span className={styles.line}>{moat.titleA}</span>
              <span className={`${styles.line} ${styles.dim}`}>{moat.titleB}</span>
            </h2>
          </div>
          <p className="lead">{moat.text}</p>
        </Reveal>

        <motion.ol
          className={styles.cards}
          variants={stagger}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        >
          {moat.items.map((m) => (
            <motion.li
              key={m.n}
              className={styles.card}
              variants={item}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", visualDuration: 0.35, bounce: 0.2 }}
            >
              <span className={styles.num}>
                {m.n} · {m.tag}
              </span>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
            </motion.li>
          ))}
        </motion.ol>

        <Reveal>
          <p className={`small ${styles.closing}`}>{moat.closing}</p>
        </Reveal>
      </div>
    </section>
  )
}
