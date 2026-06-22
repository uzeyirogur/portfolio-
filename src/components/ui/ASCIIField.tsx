'use client'

import { useEffect, useRef } from 'react'

// Character pools by density tier (0 = densest, 5 = empty)
const T: readonly (readonly string[])[] = [
  ['█', '▓', '▒'],
  ['#', '@', '$', '%'],
  ['0', '1', 'A', 'F', 'E', 'B'],
  ['0', '1', ':', '.', '-'],
  ['.', '·', ' ', ' '],
  [' ', ' ', ' '],
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

    const CELL = 22
    let raf = 0
    let t = 0
    let cols = 0
    let rows = 0
    const mouse = { x: -9999, y: -9999 }
    let bgGrid: string[] = []
    let muteAcc = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      cols = Math.ceil(window.innerWidth / CELL) + 2
      rows = Math.ceil(window.innerHeight / CELL) + 2
      bgGrid = Array.from({ length: cols * rows }, () => pick(4))
    }
    resize()

    const draw = () => {
      t += 0.016
      muteAcc += 0.016

      // Slowly mutate ~0.4% of background chars each ~50ms
      if (muteAcc > 0.05) {
        muteAcc = 0
        const n = Math.ceil(cols * rows * 0.004)
        for (let k = 0; k < n; k++) {
          const idx = Math.floor(Math.random() * bgGrid.length)
          bgGrid[idx] = pick(3 + Math.floor(Math.random() * 2))
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = `${Math.round(CELL * 0.68)}px "Courier New", monospace`

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * CELL + CELL / 2
          const y = r * CELL + CELL / 2

          const dx = x - mouse.x
          const dy = y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const proximity = Math.max(0, 1 - dist / 290)

          // Ambient sine wave across the grid
          const wave = (Math.sin(c * 0.24 + r * 0.17 + t * 1.15) + 1) * 0.5

          const alpha = proximity * 0.62 + wave * 0.09
          if (alpha < 0.016) continue

          let ch: string
          if (proximity > 0.65) {
            ch = pick(0)                        // very close: block chars
          } else if (proximity > 0.42) {
            ch = pick(1)                        // close: # $ @ %
          } else if (proximity > 0.2) {
            ch = pick(2)                        // mid: 0 1 A F
          } else {
            ch = bgGrid[r * cols + c] ?? ' '   // far: stable sparse
          }

          // Near cursor: slightly warmer glow (add tiny red channel)
          if (proximity > 0.5) {
            const g = Math.round(211 + proximity * 20)
            ctx.fillStyle = `rgba(34,${Math.min(g, 238)},238,${alpha.toFixed(3)})`
          } else {
            ctx.fillStyle = `rgba(34,211,238,${alpha.toFixed(3)})`
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
