import { motion } from "motion/react"
import { countries, type Country } from "../content"
import styles from "./Header.module.css"

type Props = { country: Country; onCountry: (c: Country) => void; visible: boolean }

export function Header({ country, onCountry, visible }: Props) {
  return (
    <motion.header
      className={styles.header}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -28 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      aria-hidden={!visible}
    >
      <div className={styles.pill}>
        <a href="#top" className={styles.logo} aria-label="Prognova Health, home">
          <img src="/logo.webp" alt="" width="132" height="37" />
        </a>
        <nav className={styles.nav} aria-label="Sections">
          <a href="#stages">What it does</a>
          <a href="#prices">Prices</a>
          <a href="#trust">Who decides</a>
          <a href="#faq">Questions</a>
        </nav>
        <div className={styles.actions}>
          <label className={styles.country}>
            <span className="visually-hidden">Prices for patients from</span>
            <select value={country} onChange={(e) => onCountry(e.target.value as Country)}>
              {(Object.keys(countries) as Country[]).map((c) => (
                <option key={c} value={c}>
                  {countries[c].currency}
                </option>
              ))}
            </select>
          </label>
          <a className="button" href="#closing">
            Book a call
          </a>
        </div>
      </div>
    </motion.header>
  )
}
