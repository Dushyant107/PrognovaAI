import type { Artefact as ArtefactData } from "../content"
import styles from "./Artefact.module.css"

type Props = { data: ArtefactData; dark?: boolean }

const stateWords = new Set(["planned", "requested", "confirmed"])

export function Artefact({ data }: Props) {
  return (
    <div className={styles.artefact} data-kind={data.kind}>
      <p className={styles.title}>{data.title}</p>
      <dl className={styles.rows}>
        {data.rows.map(([k, v]) => (
          <div key={k} className={styles.row}>
            <dt>{k}</dt>
            <dd>{stateWords.has(v) ? <span className={`chip ${v}`}>{v}</span> : v}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
