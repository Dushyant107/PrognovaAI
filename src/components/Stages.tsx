import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "motion/react"
import { stages, type RailState, type StageId } from "../content"
import { Artefact } from "./Artefact"
import { TripRail } from "./TripRail"
import { Reveal } from "./Reveal"
import styles from "./Stages.module.css"

const railState: RailState = {
  reports: "confirmed",
  call: "confirmed",
  stay: "confirmed",
  visa: "requested",
  treatment: "planned",
  home: "planned",
}

function StageItem({
  index,
  onEnter,
  active,
}: {
  index: number
  onEnter: (i: number) => void
  active: boolean
}) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { margin: "-40% 0px -40% 0px" })
  useEffect(() => {
    if (inView) onEnter(index)
  }, [inView, index, onEnter])
  const stage = stages[index]
  return (
    <li ref={ref} id={`stage-${stage.id}`} className={styles.item} data-active={active || undefined}>
      <span className={styles.num} aria-hidden="true">
        {index + 1}
      </span>
      <div className={styles.itemBody}>
        <h3>{stage.title}</h3>
        <p className="body">{stage.text}</p>
        <p className={styles.loop}>{stage.loop}</p>
        <div className={styles.inlineArtefact}>
          <Artefact data={stage.artefact} />
        </div>
      </div>
    </li>
  )
}

export function Stages() {
  const [active, setActive] = useState(0)

  return (
    <section className="section" id="stages">
      <div className="container">
        <Reveal className="section-head">
          <h2>What it does, stage by stage</h2>
          <p className="lead">
            Six stages from first message to follow-up at home. At each one the assistant produces something you can
            see, and a person confirms it.
          </p>
        </Reveal>

        <Reveal className={styles.railWrap} delay={0.1}>
          <TripRail
            state={railState}
            active={stages[active].id as StageId}
            layoutKey="stages"
            onSelect={(id) => {
              const i = stages.findIndex((s) => s.id === id)
              document.getElementById(`stage-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" })
              setActive(i)
            }}
          />
        </Reveal>

        <div className={styles.grid}>
          <ol className={styles.list}>
            {stages.map((s, i) => (
              <StageItem key={s.id} index={i} onEnter={setActive} active={active === i} />
            ))}
          </ol>

          <div className={styles.sticky} aria-hidden="true">
            {stages.map((s, i) => {
              const on = i === active
              return (
                <motion.div
                  key={s.id}
                  initial={false}
                  animate={{ opacity: on ? 1 : 0, y: on ? 0 : i < active ? -10 : 14 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className={styles.artefactCard}
                  style={{ pointerEvents: on ? "auto" : "none", zIndex: on ? 1 : 0 }}
                >
                  <Artefact data={s.artefact} />
                  <p className={styles.caption}>{s.loop}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
