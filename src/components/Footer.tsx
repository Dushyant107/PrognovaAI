import { links } from "../content"
import styles from "./Footer.module.css"

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <img src="/logo.webp" alt="Prognova" width="120" height="34" className={styles.logo} />
        <nav className={styles.links} aria-label="Footer">
          <a href={links.privacy}>Privacy</a>
          <a href={links.chat} target="_blank" rel="noreferrer">
            Chat with Prognova
          </a>
          <a href={`mailto:${links.email}`}>{links.email}</a>
          <a href="#top">Back to top</a>
        </nav>
      </div>
    </footer>
  )
}
