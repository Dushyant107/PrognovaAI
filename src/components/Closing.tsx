import { Reveal } from "./Reveal"
import styles from "./Closing.module.css"

export function Closing() {
  return (
    <section className={styles.band} id="closing">
      <div className={`container ${styles.inner}`}>
        <Reveal className={styles.copy}>
          <h2>Start planning your treatment trip.</h2>
          <p className="lead">The first call is free. Bring rough dates and your questions about travel, stays and costs.</p>
        </Reveal>
        <Reveal className={styles.actions} delay={0.15}>
          <a
            className="button"
            href="#ask"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })
              setTimeout(() => document.getElementById("ask")?.focus({ preventScroll: true }), 600)
            }}
          >
            Start a conversation
          </a>
          <a className="button secondary" href="https://prognovahealth.com/">
            Book a call
          </a>
          <a className={styles.whatsapp} href="https://wa.me/918506902825">
            Or chat on WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  )
}
