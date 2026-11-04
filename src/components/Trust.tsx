import { motion } from "motion/react"
import { Reveal, item, stagger } from "./Reveal"
import styles from "./Trust.module.css"

const roles = [
  {
    key: "doctor",
    title: "Your doctor",
    text: "Every clinical decision: whether to operate, which procedure, and when. The assistant never advises on treatment, and says so when asked.",
    does: ["Diagnoses and treatment plan", "Surgery and follow-up care", "Final cost of treatment"],
  },
  {
    key: "assistant",
    title: "The assistant",
    text: "Compares options, prices the trip, shortlists stays, drafts requests to hospitals and keeps your private workspace up to date.",
    does: ["Price comparisons", "Stay and transfer shortlists", "Visa letter requests"],
  },
  {
    key: "coordinator",
    title: "Your coordinator",
    text: "Reviews your reports, takes the free call, confirms each booking with the supplier, and tells you when something changes.",
    does: ["Free planning call", "Confirms every booking", "Checks in after you fly home"],
  },
]

export function Trust() {
  return (
    <section className="section" id="trust">
      <div className="container">
        <Reveal className="section-head">
          <h2>Who decides what</h2>
          <p className="lead">Three parts, kept apart on purpose. The assistant never makes a medical decision.</p>
        </Reveal>

        <motion.div
          className={styles.cards}
          variants={stagger}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        >
          {roles.map((r) => (
            <motion.article
              key={r.key}
              className={`glass ${styles.card}`}
              data-role={r.key}
              variants={item}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", visualDuration: 0.35, bounce: 0.2 }}
            >
              <span className={styles.accent} aria-hidden="true" />
              <h3>{r.title}</h3>
              <p className={styles.text}>{r.text}</p>
              <ul className={styles.does}>
                {r.does.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>

        <Reveal delay={0.1}>
          <dl className={styles.states}>
            <div>
              <dt>
                <span className="chip">planned</span>
              </dt>
              <dd>In your plan. Nobody has booked it yet.</dd>
            </div>
            <div>
              <dt>
                <span className="chip requested">requested</span>
              </dt>
              <dd>A supplier or hospital has been asked.</dd>
            </div>
            <div>
              <dt>
                <span className="chip confirmed">confirmed</span>
              </dt>
              <dd>They said yes, and you have it in writing.</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
