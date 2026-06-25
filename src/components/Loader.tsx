'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './Loader.module.scss'

interface LoaderProps {
  onComplete: () => void
}

const SESSION_KEY  = 'uzo-loader-v2'   // bump version = resets for all visitors
const LOGO         = 'ÜZO'
const SCRAMBLE_SET = '!<>-_\\/[]{}=+*^?#@%01aBcD3fGhIjKlMnOpQ'
const BOOT_LINES   = [
  '> init portfolio',
  '> loading assets',
  '> compile systems',
  '> run UZO',
]

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef  = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const termRef    = useRef<HTMLDivElement>(null)
  const logoRef    = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const progressRef= useRef<HTMLDivElement>(null)
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const tlRef      = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    // ── Skip for return visitors in same session (production only) ───────
    const isDev = process.env.NODE_ENV === 'development'
    if (!isDev && sessionStorage.getItem(SESSION_KEY)) {
      onComplete()
      return
    }

    // ── Safety: always call onComplete after 6s max ──────────────────────
    const safetyTimer = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1')
      onComplete()
    }, 6000)

    const loader = loaderRef.current
    const canvas = canvasRef.current
    const term   = termRef.current
    const logo   = logoRef.current
    const ctrEl  = counterRef.current
    const prog   = progressRef.current

    if (!loader || !canvas || !term || !logo || !ctrEl || !prog) {
      clearTimeout(safetyTimer)
      onComplete()
      return
    }

    // ── ASCII noise canvas ───────────────────────────────────────────────
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d')
    const noise = { alpha: 0.05 }
    let noiseIntervalId: ReturnType<typeof setInterval> | null = null

    if (ctx) {
      const CH = '01<>[]{}=#@!?/|:░▒'
      const SZ = 14
      const GW = Math.ceil(canvas.width  / SZ)
      const GH = Math.ceil(canvas.height / SZ)
      const grid = Array.from({ length: GH }, () =>
        Array.from({ length: GW }, () => CH[Math.floor(Math.random() * CH.length)])
      )
      ctx.font = `${SZ}px 'Courier New', monospace`

      const drawNoise = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if (noise.alpha < 0.002) return
        ctx.fillStyle = `rgba(245,242,237,${noise.alpha})`
        for (let r = 0; r < GH; r++) {
          for (let c = 0; c < GW; c++) {
            if (Math.random() < 0.03) grid[r][c] = CH[Math.floor(Math.random() * CH.length)]
            ctx.fillText(grid[r][c], c * SZ, (r + 1) * SZ)
          }
        }
      }
      noiseIntervalId = setInterval(drawNoise, 80)
      drawNoise()
    }

    // ── Letter scramble ──────────────────────────────────────────────────
    const scrambleIds: ReturnType<typeof setInterval>[] = []
    const scramble = (el: HTMLElement, target: string, dur: number) => {
      let f = 0
      const tot = Math.round(dur * 50)
      const id = setInterval(() => {
        const p = f++ / tot
        if (p >= 1) { el.textContent = target; clearInterval(id); return }
        el.textContent = Math.random() < p * p * 3
          ? target
          : SCRAMBLE_SET[Math.floor(Math.random() * SCRAMBLE_SET.length)]
      }, 20)
      scrambleIds.push(id)
    }

    // ── Initial state (GSAP overrides CSS opacity:0) ─────────────────────
    const lines = Array.from(term.querySelectorAll<HTMLElement>(`.${styles.termLine}`))
    gsap.set(lines,  { opacity: 0, x: -18 })
    gsap.set(logo,   { opacity: 0, scale: 1 })
    gsap.set(prog,   { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(loader, { clipPath: 'inset(0 0% 0 0)' })
    letterRefs.current.forEach(el => { if (el) el.textContent = '' })

    // ── Skip handler ─────────────────────────────────────────────────────
    let skipped = false
    const skip = () => {
      if (skipped) return
      skipped = true
      tlRef.current?.progress(0.9).play()
    }
    loader.addEventListener('click',   skip, { once: true })
    window.addEventListener('keydown', skip, { once: true })

    // ── Timeline ─────────────────────────────────────────────────────────
    const ctrObj = { v: 0 }

    const tl = gsap.timeline({
      onComplete() {
        clearTimeout(safetyTimer)
        if (noiseIntervalId) clearInterval(noiseIntervalId)
        scrambleIds.forEach(clearInterval)
        loader.removeEventListener('click',   skip)
        window.removeEventListener('keydown', skip)
        sessionStorage.setItem(SESSION_KEY, '1')
        onComplete()
      },
    })
    tlRef.current = tl

    // Counter + progress bar fill the whole duration
    tl.to(ctrObj, {
      v: 100,
      duration: 4.7,
      ease: 'power1.inOut',
      onUpdate() {
        ctrEl.textContent = String(Math.round(ctrObj.v)).padStart(3, '0')
      },
    }, 0)
    tl.to(prog, { scaleX: 1, duration: 4.7, ease: 'power1.inOut' }, 0)

    // Phase 1 — boot lines appear one by one
    // 4 lines × 0.22s stagger → all visible by t=0.96s
    tl.to(lines, {
      opacity: 1,
      x: 0,
      duration: 0.20,
      ease: 'power2.out',
      stagger: 0.22,
    }, 0.10)

    // Hold all lines visible until t=1.55s
    // (last line fully visible at ~0.96s → 0.59s of readability)

    // Accent pulse on last line at t=1.10s
    if (lines.length > 0) {
      tl.to(lines[lines.length - 1], {
        opacity: 0.4, duration: 0.10, yoyo: true, repeat: 1, ease: 'none',
      }, 1.10)
    }

    // Phase 2 — terminal exits upward at t=1.55s
    tl.to(term, {
      opacity: 0,
      y: -30,
      duration: 0.32,
      ease: 'power2.in',
    }, 1.55)

    // Noise fades while terminal exits
    tl.to(noise, { alpha: 0.01, duration: 0.5, ease: 'power2.out' }, 1.60)

    // Phase 3 — ÜZO logo fades in at t=1.92s (after terminal fully gone)
    tl.to(logo, { opacity: 1, duration: 0.18 }, 1.92)

    // Scramble each letter with stagger
    LOGO.split('').forEach((char, i) => {
      tl.add(() => {
        const el = letterRefs.current[i]
        if (el) scramble(el, char, 0.50)
      }, 1.95 + i * 0.24)
    })
    // Letters fully settled at: 1.95 + 2×0.24 + 0.50 = 2.93s

    // Pulse logo at t=2.96s
    tl.to(logo, {
      scale: 1.04,
      duration: 0.14,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out',
    }, 2.96)

    // Noise off at t=4.35s
    tl.add(() => { noise.alpha = 0 }, 4.35)

    // Phase 4 — exit wipe upward at t=4.50s
    tl.to(loader, {
      clipPath: 'inset(100% 0 0 0)',
      duration: 0.55,
      ease: 'power2.inOut',
    }, 4.50)

    return () => {
      tl.kill()
      clearTimeout(safetyTimer)
      if (noiseIntervalId) clearInterval(noiseIntervalId)
      scrambleIds.forEach(clearInterval)
      loader.removeEventListener('click',   skip)
      window.removeEventListener('keydown', skip)
    }
  }, [onComplete])

  return (
    <div ref={loaderRef} className={styles.loader} aria-hidden="true">

      <canvas ref={canvasRef} className={styles.noise} />

      <span ref={counterRef} className={styles.counter}>000</span>
      <span className={styles.skipHint}>click to skip</span>

      <div ref={termRef} className={styles.terminal}>
        {BOOT_LINES.map((line, i) => (
          <div
            key={i}
            className={`${styles.termLine}${i === BOOT_LINES.length - 1 ? ` ${styles.termAccent}` : ''}`}
          >
            {line}
          </div>
        ))}
      </div>

      <div ref={logoRef} className={styles.logo}>
        {LOGO.split('').map((_, i) => (
          <span
            key={i}
            ref={el => { letterRefs.current[i] = el }}
            className={styles.logoLetter}
          />
        ))}
      </div>

      <div ref={progressRef} className={styles.progress} />

    </div>
  )
}
