import { useEffect, useRef, useState } from "react"
import { animate, useReducedMotion } from "motion/react"
import styles from "./Assistant.module.css"

type Props = { text: string; onDone: () => void; speed?: number }

export function Typed({ text, onDone, speed = 28 }: Props) {
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(reduce ? text.length : 0)
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  useEffect(() => {
    if (reduce) {
      setShown(text.length)
      doneRef.current()
      return
    }
    let last = 0
    const controls = animate(0, text.length, {
      duration: text.length / speed,
      ease: "linear",
      onUpdate: (v) => {
        const n = Math.floor(v)
        if (n !== last) {
          last = n
          setShown(n)
        }
      },
      onComplete: () => {
        setShown(text.length)
        doneRef.current()
      },
    })
    return () => controls.stop()
  }, [text, speed, reduce])

  const typing = shown < text.length
  return (
    <span>
      {text.slice(0, shown)}
      {typing && <span className={styles.cursor} aria-hidden="true" />}
    </span>
  )
}
