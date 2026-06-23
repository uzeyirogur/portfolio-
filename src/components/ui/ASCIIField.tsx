'use client'

import { useEffect, useRef } from 'react'

// Character pools by density tier (0 = densest, 4 = sparse)
const T: readonly (readonly string[])[] = [
  ['█', '▓', '▒', '░'],
  ['#', '@', '$', '%', '&'],
  ['0', '1', 'A', 'F', 'E', 'B', 'C', 'D'],
  [':', '.', '-', '|', '+', '=', '~'],
  ['.', '·', ',', '`'],
]

const pick = (tier: number) => {
  const pool = T[Math.min(Math.max(tier, 0), T.length - 1)]
  return pool[Math.floor(Math.random() * pool.length)]
}

export default function ASCIIField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const CELL = 20
    let raf = 0
    let t = 0
    let cols = 0
    let rows = 0
    const mouse = { x: -9999, y: -9999 }
    let bgGrid: string[] = []
    let muteAcc = 0

    // Rain columns: each column tracks a "head" position for matrix effect
    let rainHeads: number[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      cols = Math.ceil(window.innerWidth / CELL) + 2
      rows = Math.ceil(window.innerHeight / CELL) + 2
      bgGrid = Array.from({ length: cols * rows }, () => pick(3))
      rainHeads = Array.from({ length: cols }, () => Math.floor(Math.random() * rows))
    }
    resize()

    const draw = () => {
      t += 0.016
      muteAcc += 0.016

      // Mutate ~1.5% of background chars each ~40ms for lively feel
      if (muteAcc > 0.04) {
        muteAcc = 0
        const n = Math.ceil(cols * rows * 0.015)
        for (let k = 0; k < n; k++) {
          const idx = Math.floor(Math.random() * bgGrid.length)
          bgGrid[idx] = pick(2 + Math.floor(Math.random() * 2))
        }
        // Advance rain heads
        for (let c = 0; c < cols; c++) {
          if (Math.random() < 0.3) {
            rainHeads[c] = (rainHeads[c] + 1) % (rows + 4)
            const idx = rainHeads[c] * cols + c
            if (idx < bgGrid.length) bgGrid[idx] = pick(2)
          }
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = `${Math.round(CELL * 0.7)}px "Courier New", monospace`

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * CELL + CELL / 2
          const y = r * CELL + CELL / 2

          const dx = x - mouse.x
          const dy = y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const proximity = Math.max(0, 1 - dist / 320)

          // Multi-layer sine wave for organic ambient field
          const wave =
            (Math.sin(c * 0.22 + r * 0.15 + t * 0.9) + 1) * 0.5 * 0.6 +
            (Math.sin(c * 0.07 - r * 0.11 + t * 0.5) + 1) * 0.5 * 0.4

          // Always-visible base: 0.10, wave adds up to 0.20, cursor adds up to 0.55
          const alpha = 0.10 + wave * 0.20 + proximity * 0.55
          if (alpha < 0.04) continue

          let ch: string
          if (proximity > 0.65) {
            ch = pick(0)
          } else if (proximity > 0.42) {
            ch = pick(1)
          } else if (proximity > 0.18) {
            ch = pick(2)
          } else {
            ch = bgGrid[r * cols + c] ?? '.'
          }

          if (proximity > 0.5) {
            ctx.fillStyle = `rgba(232,0,58,${alpha.toFixed(3)})`
          } else {
            ctx.fillStyle = `rgba(10,10,10,${alpha.toFixed(3)})`
          }

          ctx.fillText(ch, x, y)
        }
      }

      raf = requestAnimationFrame(draw)
    }
    draw()

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.85,
      }}
    />
  )
}
