import { useEffect, useRef } from "react"
import { useReducedMotion } from "motion/react"

type Node = { x: number; y: number; vx: number; vy: number; r: number; hue: number; depth: number }
type Pulse = { a: number; b: number; t: number; speed: number }

// A living neural field: drifting nodes, distance-based links and pulses travelling along them.
export function NeuralField() {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion() ?? false

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = 1
    let nodes: Node[] = []
    let pulses: Pulse[] = []
    let raf = 0
    let running = true
    const pointer = { x: -1e4, y: -1e4 }
    const linkDist = () => Math.min(190, Math.max(120, width * 0.11))

    const seed = () => {
      const count = Math.round(Math.min(140, Math.max(55, (width * height) / 14000)))
      nodes = Array.from({ length: count }, () => {
        const depth = Math.random()
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12 + 0.02,
          r: 0.8 + depth * 1.8,
          hue: Math.random() < 0.08 ? 330 : Math.random() < 0.5 ? 172 : 196,
          depth,
        }
      })
      pulses = []
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, width, height)
      const L = linkDist()
      const L2 = L * L

      // Move nodes on their own slow drift. The pointer no longer pulls them.
      void pointer
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        if (!reduce) {
          n.x += n.vx * dt * 0.06
          n.y += n.vy * dt * 0.06
          if (n.x < -20) n.x = width + 20
          if (n.x > width + 20) n.x = -20
          if (n.y < -20) n.y = height + 20
          if (n.y > height + 20) n.y = -20
        }
      }

      // Links.
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 > L2) continue
          const k = 1 - Math.sqrt(d2) / L
          const alpha = k * k * 0.42 * (0.5 + (a.depth + b.depth) * 0.25)
          ctx.strokeStyle = `hsla(185, 70%, 62%, ${alpha})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
          if (!reduce && pulses.length < 18 && Math.random() < 0.0009) {
            pulses.push({ a: i, b: j, t: 0, speed: 0.25 + Math.random() * 0.35 })
          }
        }
      }

      // Pulses travelling along links.
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pu = pulses[p]
        pu.t += (pu.speed * dt) / 1000
        if (pu.t >= 1) {
          pulses.splice(p, 1)
          continue
        }
        const a = nodes[pu.a]
        const b = nodes[pu.b]
        const x = a.x + (b.x - a.x) * pu.t
        const y = a.y + (b.y - a.y) * pu.t
        const g = ctx.createRadialGradient(x, y, 0, x, y, 9)
        g.addColorStop(0, "rgba(220, 250, 255, 0.95)")
        g.addColorStop(0.35, "rgba(111, 214, 255, 0.55)")
        g.addColorStop(1, "rgba(111, 214, 255, 0)")
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, 9, 0, Math.PI * 2)
        ctx.fill()
      }

      // Nodes with soft glow.
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const glowR = n.r * 5
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR)
        const sat = n.hue === 330 ? "75%" : "70%"
        g.addColorStop(0, `hsla(${n.hue}, ${sat}, 78%, ${0.55 + n.depth * 0.4})`)
        g.addColorStop(0.3, `hsla(${n.hue}, ${sat}, 65%, ${0.18 + n.depth * 0.15})`)
        g.addColorStop(1, `hsla(${n.hue}, ${sat}, 60%, 0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    let last = performance.now()
    const loop = (now: number) => {
      if (!running) return
      const dt = Math.min(50, now - last)
      last = now
      draw(dt)
      if (!reduce) raf = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
    }
    const onLeave = () => {
      pointer.x = -1e4
      pointer.y = -1e4
    }
    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!running) {
        running = true
        last = performance.now()
        raf = requestAnimationFrame(loop)
      }
    }

    resize()
    raf = requestAnimationFrame(loop)
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerleave", onLeave)
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerleave", onLeave)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [reduce])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.85 }}
    />
  )
}
