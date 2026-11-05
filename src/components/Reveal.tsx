import { motion, type HTMLMotionProps } from "motion/react"
import type { ReactNode } from "react"

const ease = [0.16, 1, 0.3, 1] as const

type Props = HTMLMotionProps<"div"> & {
  children: ReactNode
  delay?: number
  y?: number
  as?: "div" | "span" | "li" | "p"
}

export function Reveal({ children, delay = 0, y = 24, as = "div", ...rest }: Props) {
  const Tag = (motion as unknown as Record<string, typeof motion.div>)[as] ?? motion.div
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, ease, delay }}
      {...(rest as HTMLMotionProps<"div">)}
    >
      {children}
    </Tag>
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

/* Line-mask text reveal: each line slides up from behind its own clip. */
export function Lines({ lines, className, delay = 0 }: { lines: string[]; className?: string; delay?: number }) {
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.09, delayChildren: delay } } }}
      style={{ display: "block" }}
    >
      {lines.map((l, i) => (
        <span key={i} style={{ display: "block", overflow: "hidden", paddingBottom: "0.08em", marginBottom: "-0.08em" }}>
          <motion.span
            style={{ display: "block" }}
            variants={{ hidden: { y: "110%", opacity: 0 }, shown: { y: "0%", opacity: 1, transition: { duration: 0.9, ease } } }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
