import styles from "./Footer.module.css"

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <img src="/logo.webp" alt="Prognova Health" width="120" height="34" className={styles.logo} />
        <p className="small">
          Prices, stays and dates on this page are representative examples, not actual providers, accommodation or quotes.
          Every arrangement is confirmed by a coordinator before booking. Your treating doctor makes every clinical decision.
        </p>
        <nav className={styles.links} aria-label="Legal">
          <a href="https://prognovahealth.com/">prognovahealth.com</a>
          <a href="#">Privacy notice</a>
          <a href="#">Cookie policy</a>
          <a href="#">Sign in</a>
        </nav>
      </div>
    </footer>
  )
}
