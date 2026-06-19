'use client'
import { useEffect, useRef } from 'react'

interface P {
  x: number; y: number
  vx: number; vy: number
  r: number; a: number; da: number
  hue: number
}

interface Props {
  count?: number
}

export default function ParticleCanvas({ count = 55 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let W = 0, H = 0
    let mx = -9999, my = -9999
    let rafId: number

    const resize = () => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      const dpr = window.devicePixelRatio || 1
      canvas.width  = W * dpr
      canvas.height = H * dpr
      ctx.resetTransform()
      ctx.scale(dpr, dpr)
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mx = e.clientX - r.left
      my = e.clientY - r.top
    }
    window.addEventListener('mousemove', onMouse)

    const rnd = (a: number, b: number) => Math.random() * (b - a) + a

    // Mix of cyan + violet particles
    const HUES = [185, 195, 200, 260, 270]

    const make = (): P => ({
      x:   rnd(0, W || 1400),
      y:   rnd(0, H || 800),
      vx:  rnd(-0.35, 0.35),
      vy:  rnd(-0.35, 0.35),
      r:   rnd(1.8, 4.2),
      a:   rnd(0.35, 0.75),
      da:  rnd(0.003, 0.006) * (Math.random() > 0.5 ? 1 : -1),
      hue: HUES[Math.floor(Math.random() * HUES.length)],
    })

    const pts: P[] = Array.from({ length: count }, make)

    const LINK   = 160
    const REPEL  = 130
    const FORCE  = 0.55

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      for (const p of pts) {
        // Mouse repulsion
        const dx = p.x - mx, dy = p.y - my
        const d  = Math.hypot(dx, dy)
        if (d < REPEL && d > 0.5) {
          const f = ((REPEL - d) / REPEL) * FORCE
          p.vx += (dx / d) * f
          p.vy += (dy / d) * f
        }

        p.vx *= 0.968; p.vy *= 0.968
        p.x  += p.vx;  p.y  += p.vy

        p.a += p.da
        if (p.a > 0.85 || p.a < 0.25) p.da *= -1

        if (p.x < 0) p.x = W; else if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; else if (p.y > H) p.y = 0
      }

      // Connection lines — thicker & brighter
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y)
          if (d < LINK) {
            const alpha = (1 - d / LINK) * 0.35
            ctx.strokeStyle = `hsla(${pts[i].hue},100%,70%,${alpha})`
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }

      // Dots with glow
      for (const p of pts) {
        // Outer glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
        grad.addColorStop(0,   `hsla(${p.hue},100%,70%,${p.a * 0.4})`)
        grad.addColorStop(1,   `hsla(${p.hue},100%,70%,0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
        ctx.fill()

        // Core dot
        ctx.fillStyle = `hsla(${p.hue},100%,80%,${p.a})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      rafId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      window.removeEventListener('mousemove', onMouse)
    }
  }, [count])

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  )
}
