import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber"
import { useReducedMotion, type MotionValue } from "motion/react"
import * as THREE from "three"
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js"

const EMBLEM_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 650">
  <path id="crescent" d="M160,6 C350,0 492,98 492,222 C492,345 352,436 200,436 L200,432 C300,400 342,300 342,228 C342,135 280,54 160,6 Z" />
  <path id="dot" d="M197,180 a62,62 0 1,0 -124,0 a62,62 0 1,0 124,0 Z" />
  <path id="leaf" d="M300,196 C236,300 72,312 24,420 C-8,500 22,580 66,614 C68,530 124,468 204,408 C280,350 308,280 300,196 Z" />
</svg>`

const CENTER = new THREE.Vector3(242, 307, 30)
const SCALE = 0.0062

type PartId = "crescent" | "dot" | "leaf"
type Part = { id: PartId; geometry: THREE.ExtrudeGeometry }

// Each shape floats at its own depth and rhythm, and answers the pointer at its own rate.
const PART_CFG: Record<PartId, { parallax: number; bob: number; speed: number; phase: number; lift: number }> = {
  crescent: { parallax: 0.06, bob: 0.02, speed: 0.55, phase: 0, lift: 0 },
  dot: { parallax: 0.2, bob: 0.05, speed: 0.95, phase: 1.3, lift: 0.22 },
  leaf: { parallax: 0.12, bob: 0.035, speed: 0.7, phase: 2.4, lift: 0.1 },
}

function buildParts(): Part[] {
  const data = new SVGLoader().parse(EMBLEM_SVG)
  const parts: Part[] = []
  for (const path of data.paths) {
    const id = ((path.userData?.node as SVGElement | undefined)?.id ?? "crescent") as PartId
    const shapes = SVGLoader.createShapes(path)
    const geometry = new THREE.ExtrudeGeometry(shapes, {
      depth: 60,
      bevelEnabled: true,
      bevelThickness: 10,
      bevelSize: 8,
      bevelOffset: 0,
      bevelSegments: 6,
      curveSegments: 64,
    })
    geometry.translate(-CENTER.x, -CENTER.y, -CENTER.z)
    geometry.computeVertexNormals()
    parts.push({ id, geometry })
  }
  return parts
}

function damp(current: number, target: number, lambda: number, dt: number) {
  return THREE.MathUtils.damp(current, target, lambda, dt)
}

const RETURN_DELAY_MS = 1800
const DRAG_LIMIT = 0.45

type PartState = { scale: number; glow: number; pulseAt: number }

function Emblem({ still, progress }: { still: boolean; progress?: MotionValue<number> }) {
  const parts = useMemo(buildParts, [])
  const group = useRef<THREE.Group>(null)
  const meshes = useRef<Record<PartId, THREE.Mesh | null>>({ crescent: null, dot: null, leaf: null })
  const materials = useRef<Record<PartId, THREE.MeshPhysicalMaterial | null>>({ crescent: null, dot: null, leaf: null })
  const [hovered, setHovered] = useState<PartId | null>(null)
  const partState = useRef<Record<PartId, PartState>>({
    crescent: { scale: 1, glow: 0, pulseAt: -1 },
    dot: { scale: 1, glow: 0, pulseAt: -1 },
    leaf: { scale: 1, glow: 0, pulseAt: -1 },
  })
  const st = useRef({ drag: 0, dragging: false, lastX: 0, releasedAt: 0, px: 0, py: 0, t: 0 })
  const gl = useThree((s) => s.gl)

  useEffect(() => {
    const el = gl.domElement
    const s = st.current
    const down = (e: PointerEvent) => {
      s.dragging = true
      s.lastX = e.clientX
      el.setPointerCapture(e.pointerId)
    }
    const move = (e: PointerEvent) => {
      if (!s.dragging) return
      s.drag = THREE.MathUtils.clamp(s.drag + (e.clientX - s.lastX) * 0.004, -DRAG_LIMIT, DRAG_LIMIT)
      s.lastX = e.clientX
    }
    const up = (e: PointerEvent) => {
      if (!s.dragging) return
      s.dragging = false
      s.releasedAt = performance.now()
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId)
    }
    el.addEventListener("pointerdown", down)
    el.addEventListener("pointermove", move)
    el.addEventListener("pointerup", up)
    el.addEventListener("pointercancel", up)
    return () => {
      el.removeEventListener("pointerdown", down)
      el.removeEventListener("pointermove", move)
      el.removeEventListener("pointerup", up)
      el.removeEventListener("pointercancel", up)
    }
  }, [gl])

  useFrame((three, dt) => {
    const g = group.current
    if (!g) return
    const s = st.current
    s.t += dt
    const scroll = progress ? progress.get() : 0

    // The emblem never rotates: it stays face-on. Pointer and drag only slide the layers.
    s.px = damp(s.px, still ? 0 : three.pointer.x, 4, dt)
    s.py = damp(s.py, still ? 0 : three.pointer.y, 4, dt)
    if (!s.dragging && performance.now() - s.releasedAt > RETURN_DELAY_MS) {
      s.drag = damp(s.drag, 0, 3, dt)
    }
    g.rotation.set(Math.PI, 0, 0)
    // While the hero reveals, the layers settle together from a slightly spread start.
    const settle = 1 - Math.min(1, scroll / 0.55)

    // Each part: its own float, parallax, hover scale, glow and click pulse.
    const now = performance.now()
    for (const id of Object.keys(PART_CFG) as PartId[]) {
      const m = meshes.current[id]
      const mat = materials.current[id]
      const cfg = PART_CFG[id]
      const ps = partState.current[id]
      if (!m) continue
      const bob = still ? 0 : Math.sin(s.t * cfg.speed + cfg.phase) * cfg.bob
      // Pointer parallax, drag slide (deeper layers move less) and the reveal spread.
      const px = s.px * cfg.parallax + s.drag * (cfg.parallax * 4 + 0.2) + settle * cfg.parallax * 1.5
      const py = s.py * cfg.parallax
      // Local space is flipped by the parent's PI rotation, so y and z are negated.
      m.position.set(px / SCALE, -(bob + py * 0.6) / SCALE, -(cfg.lift + settle * cfg.lift) / SCALE)

      const pulse = ps.pulseAt > 0 ? Math.max(0, 1 - (now - ps.pulseAt) / 420) : 0
      const targetScale = (hovered === id ? 1.06 : 1) + Math.sin(pulse * Math.PI) * 0.08
      ps.scale = damp(ps.scale, targetScale, 8, dt)
      m.scale.setScalar(ps.scale)

      ps.glow = damp(ps.glow, hovered === id ? 1 : 0, 6, dt)
      if (mat) mat.emissiveIntensity = (id === "leaf" ? 0.1 : 0.2) + ps.glow * 0.6
    }
  })

  return (
    <group ref={group} rotation={[Math.PI, 0, 0]}>
      <group scale={SCALE}>
        {parts.map((p) => (
          <mesh
            key={p.id}
            geometry={p.geometry}
            ref={(el) => {
              meshes.current[p.id] = el
            }}
            onPointerOver={(e) => {
              e.stopPropagation()
              setHovered(p.id)
            }}
            onPointerOut={() => setHovered((h) => (h === p.id ? null : h))}
            onClick={(e) => {
              e.stopPropagation()
              partState.current[p.id].pulseAt = performance.now()
            }}
          >
            {p.id === "leaf" ? (
              <meshPhysicalMaterial
                ref={(el) => {
                  materials.current[p.id] = el
                }}
                color="#8fe0d3"
                roughness={0.42}
                metalness={0.08}
                clearcoat={0.6}
                clearcoatRoughness={0.3}
                sheen={0.4}
                sheenColor="#9fe8ff"
                emissive="#2a8f85"
                emissiveIntensity={0.1}
              />
            ) : (
              <meshPhysicalMaterial
                ref={(el) => {
                  materials.current[p.id] = el
                }}
                color="#0f4f58"
                roughness={0.3}
                metalness={0.18}
                clearcoat={0.9}
                clearcoatRoughness={0.22}
                emissive="#1b7f74"
                emissiveIntensity={0.2}
              />
            )}
          </mesh>
        ))}
      </group>
    </group>
  )
}

// A lime light that drops from above through the emblem on a loop.
function DroppingLight({ still }: { still: boolean }) {
  const light = useRef<THREE.PointLight>(null)
  const t = useRef(0)
  useFrame((_, dt) => {
    const l = light.current
    if (!l) return
    if (still) {
      l.position.set(0, 1.5, 2.6)
      l.intensity = 8
      return
    }
    t.current = (t.current + dt / 4.2) % 1
    const k = t.current
    l.position.set(0.4 * Math.sin(k * Math.PI * 2), 3.2 - 6.4 * k, 2.6)
    l.intensity = Math.sin(k * Math.PI) * 26
  })
  return <pointLight ref={light} color="#8fe6ff" distance={9} decay={2} />
}

// Base lights ride with the camera, so the side facing the viewer is always lit.
function CameraLights() {
  const { camera, scene } = useThree()
  useEffect(() => {
    scene.add(camera)
    return () => {
      scene.remove(camera)
    }
  }, [camera, scene])
  return createPortal(
    <>
      <directionalLight position={[4, 5, 3]} intensity={1.7} color="#f2f8f3" />
      <directionalLight position={[-5, -2, 3]} intensity={0.8} color="#6fd6ff" />
      <directionalLight position={[0, 4, -8]} intensity={0.6} color="#3fc1b0" />
    </>,
    camera,
  )
}

export default function Emblem3D({ progress }: { progress?: MotionValue<number> }) {
  const reduce = useReducedMotion() ?? false
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 9.4], fov: 34 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[0, 7, 3]} angle={0.55} penumbra={1} intensity={6} color="#bfeaf5" distance={20} />
      <CameraLights />
      <DroppingLight still={reduce} />
      <Emblem still={reduce} progress={progress} />
    </Canvas>
  )
}
