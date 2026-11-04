import { motion, type HTMLMotionProps } from "motion/react"
import type { ReactNode } from "react"

const ease = [0.16, 1, 0.3, 1] as const

type Props = HTMLMotionProps<"div"> & {
  children: ReactNode
  delay?: number
  y?: number
}

export function Reveal({ children, delay = 0, y = 24, ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, ease, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export const stagger = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.09 } },
}

export const item = {
  hidden: { opacity: 0, y: 20 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}
