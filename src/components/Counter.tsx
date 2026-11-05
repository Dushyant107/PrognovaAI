import { useEffect, useRef } from "react"
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react"

type Props = { value: number; decimals?: number; prefix?: string; suffix?: string; className?: string; duration?: number }

export function Counter({ value, decimals = 0, prefix = "", suffix = "", className, duration = 1.6 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const reduce = useReducedMotion() ?? false
  const mv = useMotionValue(reduce ? value : 0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, value, { duration: reduce ? 0 : duration, ease: [0.16, 1, 0.3, 1] })
    return () => controls.stop()
  }, [inView, value, mv, duration, reduce])
  const text = useTransform(() => `${prefix}${mv.get().toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`)
  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  )
}
