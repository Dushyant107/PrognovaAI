import { motion } from "motion/react"
import { stageOrder, stages, type RailState, type StageId } from "../content"
import { Crescent } from "./Crescent"
import styles from "./TripRail.module.css"

type Props = {
  state: RailState
  active?: StageId | null
  layoutKey: string
  vertical?: boolean
  onSelect?: (id: StageId) => void
}

const spring = { type: "spring" as const, visualDuration: 0.4, bounce: 0.15 }

export function TripRail({ state, active = null, layoutKey, vertical = false, onSelect }: Props) {
  return (
    <ol className={`${styles.rail} ${vertical ? styles.vertical : ""}`} aria-label="Stages of your trip">
      {stageOrder.map((id, i) => {
        const stage = stages.find((s) => s.id === id)!
        const s = state[id]
        const isActive = active === id
        const Tag = onSelect ? "button" : "div"
        return (
          <li key={id} className={styles.stage} data-state={s} data-active={isActive || undefined}>
            <Tag
              className={styles.hit}
              type={onSelect ? "button" : undefined}
              onClick={onSelect ? () => onSelect(id) : undefined}
              aria-current={isActive ? "step" : undefined}
            >
              <span className={styles.dot} aria-hidden="true">
                <motion.span
                  className={styles.fill}
                  initial={false}
                  animate={{ scale: s === "empty" ? 0 : 1, opacity: s === "empty" ? 0 : 1 }}
                  transition={spring}
                />
                {isActive && (
                  <motion.span layoutId={`marker-${layoutKey}`} className={styles.marker} transition={spring}>
                    <Crescent size={20} />
                  </motion.span>
                )}
              </span>
              <span className={styles.label}>
                <span className={styles.num}>{i + 1}</span>
                <span className={styles.short}>{vertical ? stage.title : stage.short}</span>
                {vertical && <span className={styles.state}>{s === "empty" ? "not started" : s}</span>}
              </span>
              {!vertical && <span className="visually-hidden">, {s === "empty" ? "not started" : s}</span>}
            </Tag>
          </li>
        )
      })}
    </ol>
  )
}
