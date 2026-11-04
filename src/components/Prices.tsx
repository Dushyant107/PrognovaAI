import { useEffect } from "react"
import { animate, motion, useMotionValue, useTransform } from "motion/react"
import { countries, formatMoney, prices, type Country } from "../content"
import { Reveal } from "./Reveal"
import styles from "./Prices.module.css"

type Props = { country: Country; onCountry: (c: Country) => void }

function Money({ value, country, prefix }: { value: number; country: Country; prefix?: string }) {
  const mv = useMotionValue(value)
  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.45, ease: "easeOut" })
    return () => controls.stop()
  }, [value, mv])
  const text = useTransform(() => `${prefix ?? ""}${formatMoney(Math.round(mv.get()), country)}`)
  return <motion.span>{text}</motion.span>
}

export function Prices({ country, onCountry }: Props) {
  const c = countries[country]
  return (
    <section className="section" id="prices">
      <div className="container">
        <Reveal className="section-head">
          <h2>Compare prices at home and in India</h2>
          <div className={styles.switch}>
            <label htmlFor="country">Prices for patients from</label>
            <select id="country" value={country} onChange={(e) => onCountry(e.target.value as Country)}>
              {(Object.keys(countries) as Country[]).map((k) => (
                <option key={k} value={k}>
                  {countries[k].label}
                </option>
              ))}
            </select>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
        <table className={styles.table}>
          <caption className="visually-hidden">
            Treatment prices for patients from {c.label}, in {c.currency}
          </caption>
          <thead>
            <tr>
              <th scope="col">Treatment</th>
              <th scope="col">{c.home}</th>
              <th scope="col">India with Prognova</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((row) => (
              <tr key={row.treatment}>
                <th scope="row">{row.treatment}</th>
                <td>
                  <Money value={row.home[country]} country={country} />
                </td>
                <td className={styles.india}>
                  <Money value={row.india[country]} country={country} prefix="from " />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </Reveal>

        <div className={styles.voice}>
          <span className={styles.who}>Assistant</span>
          <p>
            These are starting prices in {c.currency}, and the home prices are typical self-pay figures. The final cost
            depends on the treatment plan your doctor agrees with you, and you see it before you book anything. Travel
            costs are listed separately and every extra is optional.
          </p>
        </div>
      </div>
    </section>
  )
}
