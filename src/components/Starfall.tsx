import { useMemo } from "react"
import styles from "./Starfall.module.css"

// Deterministic pseudo-random so the layout is stable between renders.
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

const COUNT = 16

export function Starfall() {
  const streaks = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => {
        const left = 3 + rand(i + 1) * 94
        const duration = 7 + rand(i + 11) * 9
        const delay = -rand(i + 23) * duration
        const height = 90 + rand(i + 37) * 170
        const opacity = 0.25 + rand(i + 53) * 0.5
        const width = rand(i + 71) > 0.7 ? 2 : 1
        return { left, duration, delay, height, opacity, width }
      }),
    [],
  )

  return (
    <div className={styles.layer} aria-hidden="true">
      {streaks.map((s, i) => (
        <span
          key={i}
          className={styles.streak}
          style={{
            left: `${s.left}%`,
            height: s.height,
            width: s.width,
            opacity: s.opacity,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
