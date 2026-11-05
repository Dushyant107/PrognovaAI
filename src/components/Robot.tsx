import { motion } from "motion/react"
import { robot } from "../content"
import { Reveal, item, stagger } from "./Reveal"
import styles from "./Robot.module.css"

export function Robot() {
  return (
    <section className="section" id="robot">
      <div className="container">
        <div className={styles.top}>
          <div className={styles.copy}>
            <Reveal>
              <p className="eyebrow">Beside the doctor. Inside the robot.</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2>
                <span className={styles.line}>{robot.titleA}</span>
                <span className={`${styles.line} ${styles.dim}`}>{robot.titleB}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="body">{robot.text}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className={styles.refusal}>{robot.refusal}</p>
            </Reveal>
          </div>

          <div className={styles.devices}>
            <Reveal>
              <p className="mono">{robot.researchLabel}</p>
            </Reveal>
            <motion.ul
              className={styles.deviceList}
              variants={stagger}
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            >
              {robot.devices.map((d, i) => (
                <motion.li key={d.name} className={styles.device} variants={item} whileHover={{ x: 6 }}>
                  <span className={styles.deviceIndex}>0{i + 1}</span>
                  <span className={styles.deviceName}>{d.name}</span>
                  <span className={styles.deviceText}>{d.text}</span>
                </motion.li>
              ))}
            </motion.ul>
            <Reveal>
              <p className={`mono ${styles.fits}`}>{robot.fits}</p>
            </Reveal>
          </div>
        </div>

        <Reveal className={styles.timelineHead}>
          <h2 className={styles.timelineTitle}>{robot.timelineTitle}</h2>
        </Reveal>
        <motion.ol
          className={styles.timeline}
          variants={stagger}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        >
          {robot.timeline.map((t) => (
            <motion.li key={t.year} className={styles.step} variants={item}>
              <span className={styles.year}>{t.year}</span>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </motion.li>
          ))}
        </motion.ol>
        <Reveal>
          <p className={`small ${styles.note}`}>{robot.note}</p>
        </Reveal>
      </div>
    </section>
  )
}
