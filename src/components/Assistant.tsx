import { useCallback, useEffect, useRef, useState, type FormEvent } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { demoScript, fallbackReply, intents, type RailState, type StageId, type Turn } from "../content"
import { Artefact } from "./Artefact"
import { Typed } from "./Typed"
import styles from "./Assistant.module.css"

type Props = {
  onRail: (patch: Partial<RailState>) => void
  onActive: (id: StageId | null) => void
  onReset: () => void
  start: boolean
}

type Shown = Turn & { id: number; typed: boolean }

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

function firstStage(patch?: Partial<RailState>): StageId | null {
  if (!patch) return null
  const keys = Object.keys(patch) as StageId[]
  return keys[0] ?? null
}

export function Assistant({ onRail, onActive, onReset, start }: Props) {
  const reduce = useReducedMotion()
  const [turns, setTurns] = useState<Shown[]>([])
  const [input, setInput] = useState("")
  const [scriptDone, setScriptDone] = useState(false)
  const runRef = useRef(0)
  const idRef = useRef(0)
  const doneResolvers = useRef<Map<number, () => void>>(new Map())
  const logRef = useRef<HTMLDivElement>(null)

  const push = useCallback((turn: Turn, typed: boolean) => {
    const id = ++idRef.current
    setTurns((t) => [...t, { ...turn, id, typed }])
    return id
  }, [])

  const applyEffects = useCallback(
    (turn: Turn) => {
      if (turn.rail) onRail(turn.rail)
      onActive(firstStage(turn.rail))
    },
    [onRail, onActive],
  )

  const waitTyped = useCallback(
    (id: number) =>
      new Promise<void>((resolve) => {
        doneResolvers.current.set(id, resolve)
      }),
    [],
  )

  const markTyped = useCallback((id: number) => {
    setTurns((t) => t.map((x) => (x.id === id ? { ...x, typed: true } : x)))
    const r = doneResolvers.current.get(id)
    if (r) {
      doneResolvers.current.delete(id)
      r()
    }
  }, [])

  const speak = useCallback(
    async (turn: Turn, run: number) => {
      if (reduce) {
        push(turn, true)
        applyEffects(turn)
        return
      }
      const id = push(turn, false)
      await waitTyped(id)
      if (runRef.current !== run) return
      applyEffects(turn)
    },
    [reduce, push, waitTyped, applyEffects],
  )

  const playScript = useCallback(async () => {
    const run = ++runRef.current
    setTurns([])
    setScriptDone(false)
    onReset()

    if (reduce) {
      demoScript.forEach((t) => {
        push(t, true)
        applyEffects(t)
      })

      setScriptDone(true)
      return
    }
    for (const turn of demoScript) {
      if (runRef.current !== run) return
      if (turn.role === "you") {
        push(turn, true)
        await wait(900)
      } else {
        await speak(turn, run)
        await wait(1500)
      }
    }
    if (runRef.current === run) {

      setScriptDone(true)
    }
  }, [reduce, push, speak, applyEffects, onReset])

  useEffect(() => {
    if (!start) return
    const t = setTimeout(() => void playScript(), 700)
    return () => clearTimeout(t)
  }, [start, playScript])

  useEffect(() => {
    const el = logRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" })
  }, [turns, reduce])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    const run = ++runRef.current
    setInput("")
    setScriptDone(true)

    push({ role: "you", text }, true)
    const intent = intents.find((i) => i.match.test(text))
    const reply = intent ? intent.reply : fallbackReply
    await wait(500)
    await speak(reply, run)

  }

  return (
    <div className={styles.panel}>
      <div className={styles.head}>
        <span className={styles.live} aria-hidden="true" />
        <span className={styles.name}>Prognova planning assistant</span>
        <span className={styles.note}>Demo with sample data</span>
      </div>

      <div className={styles.log} ref={logRef} aria-live="polite" aria-relevant="additions">
        <AnimatePresence initial={false}>
          {turns.map((t) => (
            <motion.div
              key={t.id}
              className={styles.turn}
              data-role={t.role}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.who}>{t.role === "you" ? "You" : "Assistant"}</span>
              <p className={styles.text}>
                {t.role === "assistant" && !t.typed ? <Typed text={t.text} onDone={() => markTyped(t.id)} /> : t.text}
              </p>
              {t.artefact && t.typed && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={styles.artefact}
                >
                  <Artefact data={t.artefact} />
                </motion.div>
              )}
              {t.handoff && t.typed && (
                <a href="#closing" className={`button ${styles.inlineCta}`}>
                  Book a free call
                </a>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
        <label htmlFor="ask" className="visually-hidden">
          Ask about your trip
        </label>
        <input
          id="ask"
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about prices, stays, visas or follow-up"
          autoComplete="off"
        />
        <motion.button type="submit" className={styles.send} whileTap={{ scale: 0.96 }} disabled={!input.trim()}>
          Send
        </motion.button>
      </form>

      <div className={styles.foot}>
        <span className={styles.note}>Your real plan starts on the free call.</span>
        {scriptDone && (
          <button type="button" className={styles.replay} onClick={() => void playScript()}>
            Replay the demo
          </button>
        )}
      </div>
    </div>
  )
}
