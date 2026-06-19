'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion'

// ── Terminal satırları ─────────────────────────────────────────────────────────

const LINES = [
  { kind: 'prompt', text: 'whoami' },
  { kind: 'name',   text: 'Üzeyir Öğür' },
  { kind: 'sub',    text: 'Full Stack .NET Developer' },
  { kind: 'gap' },
  { kind: 'prompt', text: 'status' },
  { kind: 'status', text: '● Available for work' },
  { kind: 'gap' },
  { kind: 'prompt', text: 'skills --top' },
  { kind: 'skill',  text: 'ASP.NET Core' },
  { kind: 'skill',  text: 'React / Next.js' },
  { kind: 'skill',  text: 'C#  ·  SQL Server' },
  { kind: 'skill',  text: 'AI Workflows · n8n' },
  { kind: 'gap' },
  { kind: 'prompt', text: 'links' },
  { kind: 'link',   text: 'github.com/uzeyirogur' },
  { kind: 'link',   text: 'linkedin.com/in/uzeyirogur' },
  { kind: 'cursor' },
]

// ── Typing animation hook ──────────────────────────────────────────────────────

function useTypewriter(text: string, startMs: number, speedMs = 38) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    let i = 0
    let t1: ReturnType<typeof setTimeout>
    let t2: ReturnType<typeof setTimeout>

    t1 = setTimeout(() => {
      const tick = () => {
        i++
        setDisplayed(text.slice(0, i))
        if (i < text.length) t2 = setTimeout(tick, speedMs)
      }
      tick()
    }, startMs)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [text, startMs, speedMs])
  return displayed
}

// ── Tek terminal satırı ───────────────────────────────────────────────────────

function TermLine({ line, delay }: { line: typeof LINES[0]; delay: number }) {
  const typed = useTypewriter(
    line.kind === 'gap' || line.kind === 'cursor' ? '' : (line.text ?? ''),
    delay,
    line.kind === 'prompt' ? 55 : 28,
  )
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  if (!visible) return null

  if (line.kind === 'gap') return <div style={{ height: 14 }} />

  if (line.kind === 'cursor') return (
    <span style={{
      display: 'inline-block', width: 9, height: 17,
      background: '#22D3EE', marginTop: 10,
      boxShadow: '0 0 8px rgba(34,211,238,0.8)',
      animation: 'blink 1.1s step-end infinite',
    }} />
  )

  const styles: Record<string, React.CSSProperties> = {
    prompt: { color: 'rgba(34,211,238,0.65)', fontSize: 13 },
    name:   { color: '#22D3EE', fontSize: 22, fontWeight: 700, letterSpacing: '0.02em', textShadow: '0 0 20px rgba(34,211,238,0.5)' },
    sub:    { color: 'rgba(148,163,184,0.75)', fontSize: 13, marginTop: -2 },
    status: { color: '#27C93F', fontSize: 13, textShadow: '0 0 10px rgba(39,201,63,0.4)' },
    skill:  {
      color: '#22D3EE', fontSize: 12,
      background: 'rgba(34,211,238,0.08)',
      border: '1px solid rgba(34,211,238,0.25)',
      borderRadius: 5, padding: '3px 10px',
      display: 'inline-block', marginRight: 6, marginBottom: 5,
    },
    link:   { color: 'rgba(129,140,248,0.85)', fontSize: 12 },
  }

  return (
    <div style={{ marginBottom: line.kind === 'skill' ? 0 : 4 }}>
      {line.kind === 'prompt' && (
        <span style={{ color: 'rgba(34,211,238,0.5)', marginRight: 7, fontSize: 14, fontWeight: 700 }}>›</span>
      )}
      <span style={styles[line.kind] ?? {}}>
        {typed}
        {line.kind === 'prompt' && (
          <span style={{
            display: 'inline-block', width: 7, height: 13, background: 'rgba(34,211,238,0.7)',
            marginLeft: 4, verticalAlign: 'text-bottom',
            animation: typed.length < (line.text ?? '').length ? 'blink 0.5s step-end infinite' : 'none',
          }} />
        )}
      </span>
    </div>
  )
}

// ── Floating 3-D screen ────────────────────────────────────────────────────────

export default function Laptop3DHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-1, 1], [8, -8]),  { stiffness: 40, damping: 18 })
  const ry = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 40, damping: 18 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      mx.set(((e.clientX - r.left)  / r.width  - 0.5) * 2)
      my.set(((e.clientY - r.top)   / r.height - 0.5) * 2)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  // Timing: each line appears sequentially
  const delays: number[] = []
  let acc = 300
  LINES.forEach(l => {
    delays.push(acc)
    if (l.kind === 'gap')    { acc += 120; return }
    if (l.kind === 'cursor') { acc += 100; return }
    const chars = l.text ? l.text.length : 0
    const speed = l.kind === 'prompt' ? 55 : 28
    acc += chars * speed + 200
  })

  return (
    <div
      ref={containerRef}
      className="relative w-full flex items-center justify-center select-none"
      style={{ minHeight: 340, perspective: '1100px', paddingTop: 16, paddingBottom: 16 }}
    >

      {/* Ambient glow */}
      <div className="absolute pointer-events-none" style={{
        width: '80%', maxWidth: 560, aspectRatio: '1',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.18) 0%, rgba(129,140,248,0.08) 45%, transparent 70%)',
        filter: 'blur(55px)',
      }} />

      {/* 3-D tilting screen */}
      <motion.div
        style={{ rotateX: rx, rotateY: ry, width: '100%', maxWidth: 480 }}
        initial={{ opacity: 0, scale: 0.88, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Outer glow border */}
        <div style={{
          padding: 1.5,
          borderRadius: 16,
          background: 'linear-gradient(135deg, rgba(34,211,238,0.6) 0%, rgba(129,140,248,0.4) 50%, rgba(34,211,238,0.2) 100%)',
          boxShadow: '0 0 60px rgba(34,211,238,0.25), 0 0 120px rgba(34,211,238,0.1), 0 30px 80px rgba(0,0,0,0.6)',
        }}>
          {/* Screen body — responsive width */}
          <div style={{
            width: '100%',
            background: 'linear-gradient(160deg, #070d1a 0%, #050810 100%)',
            borderRadius: 15,
            padding: 'clamp(14px, 4vw, 24px)',
            fontFamily: '"Courier New", "JetBrains Mono", monospace',
            fontSize: 'clamp(11px, 2.5vw, 14px)',
            lineHeight: 1.7,
            overflow: 'hidden',
            position: 'relative',
          }}>

            {/* Scanlines */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
              borderRadius: 15, zIndex: 10,
            }} />

            {/* Window bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
              <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FF5F56', display: 'inline-block', boxShadow: '0 0 7px #FF5F5688' }} />
              <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FFBD2E', display: 'inline-block', boxShadow: '0 0 7px #FFBD2E88' }} />
              <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#27C93F', display: 'inline-block', boxShadow: '0 0 7px #27C93F88' }} />
              <span style={{ color: 'rgba(148,163,184,0.35)', fontSize: 10, marginLeft: 8, letterSpacing: '0.1em' }}>
                ~/portfolio — zsh
              </span>
            </div>

            {/* Terminal lines */}
            {LINES.map((line, i) => (
              <TermLine key={i} line={line} delay={delays[i]} />
            ))}

          </div>
        </div>

        {/* Monitor stand — hidden on very small screens */}
        <div className="hidden sm:flex flex-col items-center" style={{ marginTop: -1 }}>
          <div style={{ width: 60, height: 22, background: 'linear-gradient(180deg, rgba(34,211,238,0.15) 0%, transparent 100%)', borderRadius: '0 0 4px 4px' }} />
          <div style={{ width: 140, height: 4, background: 'rgba(34,211,238,0.14)', borderRadius: 4, boxShadow: '0 0 20px rgba(34,211,238,0.22)' }} />
        </div>
      </motion.div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  )
}
