import { closing, links } from "../content"
import { Lines, Reveal } from "./Reveal"
import styles from "./Closing.module.css"

export function Closing() {
  return (
    <section className={styles.band} id="closing">
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.title}>
          <Lines lines={closing.title} />
        </h2>
        <Reveal className={styles.side} delay={0.3}>
          <p className={styles.raising}>{closing.raising}</p>
          <p className="small">{closing.contactLabel}</p>
          <a className={`textlink ${styles.mail}`} href={`mailto:${links.email}`}>
            {links.email}
          </a>
          <a className="button accent" href={links.chat} target="_blank" rel="noreferrer">
            Try Prognova AI <span className="arrow">↗</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
