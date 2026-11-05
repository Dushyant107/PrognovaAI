import { motion } from "motion/react"
import { links, nav } from "../content"
import styles from "./Header.module.css"

type Props = { visible: boolean }

export function Header({ visible }: Props) {
  return (
    <motion.header
      className={styles.header}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -28 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      aria-hidden={!visible}
    >
      <div className={`container ${styles.row}`}>
        <a href="#top" className={styles.logo} aria-label="Prognova home">
          <img src="/logo.webp" alt="" width="132" height="37" />
        </a>

        <nav className={`glass ${styles.pill}`} aria-label="Sections">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              <span>{n.label}</span>
            </a>
          ))}
        </nav>

        <a className={`button ${styles.cta}`} href={links.chat} target="_blank" rel="noreferrer">
          Try Prognova AI <span className="arrow">↗</span>
        </a>
      </div>
    </motion.header>
  )
}
