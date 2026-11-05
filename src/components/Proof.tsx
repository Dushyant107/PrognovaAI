import { motion } from "motion/react"
import { proof } from "../content"
import { Counter } from "./Counter"
import { Reveal, item, stagger } from "./Reveal"
import styles from "./Proof.module.css"

export function Proof() {
  return (
    <section className="section" id="proof">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">Proof</p>
            <h2 className={styles.title}>{proof.title}</h2>
          </div>
          <p className="lead">{proof.text}</p>
        </Reveal>

        <Reveal>
          <p className="mono">{proof.setup}</p>
        </Reveal>

        <motion.div
          className={styles.stats}
          variants={stagger}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        >
          {proof.stats.map((s) => (
            <motion.div key={s.label} className={styles.stat} variants={item}>
              <span className={styles.statValue}>
                <Counter value={s.value} decimals={s.value % 1 ? 1 : 0} suffix={s.suffix} />
              </span>
              <span className={styles.statLabel}>{s.label}</span>
              {s.compare && <span className="small">{s.compare}</span>}
            </motion.div>
          ))}
        </motion.div>

        <Reveal className={styles.tableWrap} y={30}>
          <p className={`small ${styles.tableNote}`}>{proof.tableNote}</p>
          <div className={styles.scroller}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {proof.columns.map((c) => (
                    <th key={c}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {proof.rows.map((r) => (
                  <tr key={r.model} data-us={r.us || undefined}>
                    <th scope="row">
                      {r.us && <span className={styles.usDot} />}
                      {r.model}
                    </th>
                    {r.cells.map((c, i) => (
                      <td key={i} data-dash={c === "—" || undefined}>
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`small ${styles.dash}`}>{proof.dash}</p>
        </Reveal>

        <Reveal className={styles.honest}>
          <h3>{proof.honest.title}</h3>
          <ul className={styles.honestList}>
            {proof.honest.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
