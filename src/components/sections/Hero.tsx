'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  ArrowRight, Download, Github, Linkedin, Twitter, ChevronDown,
  Terminal, Database, Layers, Cpu, Code2, Zap,
} from 'lucide-react'
import { profile } from '@/data/profile'
import { socials } from '@/data/socials'
import ParticleCanvas from '@/components/ui/ParticleCanvas'

const Laptop3DHero = dynamic(() => import('./Laptop3DHero'), { ssr: false })

// ─── Text scramble hook ───────────────────────────────────────────────────────
const SC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&'

function useScramble(target: string, delayMs = 0): string {
  const [text, setText] = useState(target)

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>
    let t2: ReturnType<typeof setTimeout>
    let frame = 0

    const scramble = (str: string) =>
      str.split('').map(ch =>
        ch === ' ' || ch === '.' || ch === '-' ? ch : SC[Math.floor(Math.random() * SC.length)]
      ).join('')

    setText(scramble(target))

    t1 = setTimeout(() => {
      const run = () => {
        frame++
        setText(
          target.split('').map((ch, i) => {
            if (ch === ' ' || ch === '.' || ch === '-') return ch
            return i < frame ? ch : SC[Math.floor(Math.random() * SC.length)]
          }).join('')
        )
        if (frame < target.length) t2 = setTimeout(run, 40)
      }
      run()
    }, delayMs)

    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [target, delayMs])

  return text
}

const E = [0.16, 1, 0.3, 1] as const

// ─── Clip-path text reveal ────────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '110%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration: 1.1, delay, ease: E }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// ─── Central glowing orb ──────────────────────────────────────────────────────

function CoreOrb() {
  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      {/* Far glow halo */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, rgba(34,211,238,0.09) 0%, transparent 68%)',
        }}
        animate={{ scale: [1, 1.28, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Outer ring (slow cw) */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 114, height: 114, border: '1px dashed rgba(34,211,238,0.18)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      {/* Inner ring (slow ccw) */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 82, height: 82, border: '1px dashed rgba(129,140,248,0.15)' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      />
      {/* Core box */}
      <div
        className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(34,211,238,0.18) 0%, rgba(129,140,248,0.12) 100%)',
          border: '1px solid rgba(34,211,238,0.35)',
          boxShadow: '0 0 36px rgba(34,211,238,0.22), inset 0 0 18px rgba(34,211,238,0.04)',
        }}
      >
        <Code2 size={28} style={{ color: '#22D3EE' }} />
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ border: '1px solid rgba(34,211,238,0.55)' }}
          animate={{ scale: [1, 1.75], opacity: [0.7, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

// ─── Floating card definitions ────────────────────────────────────────────────

interface CardDef {
  id: string
  label: string
  icon: React.ElementType
  line1: string
  line2: string
  x: string
  y: string
  delay: number
  depth: number
  rotate?: number
  floatAmp?: number
  dot: string
}

const CARDS: CardDef[] = [
  {
    id: 'api',
    label: 'API Layer',
    icon: Zap,
    line1: 'GET /api/v1/dashboard',
    line2: '200 OK · 45ms',
    x: '52%', y: '4%',
    delay: 0.35, depth: 0.62,
    rotate: -1.5, floatAmp: 5,
    dot: '#22D3EE',
  },
  {
    id: 'db',
    label: 'SQL Server',
    icon: Database,
    line1: 'SELECT * FROM',
    line2: 'PriceRecords',
    x: '1%', y: '18%',
    delay: 0.5, depth: 0.42,
    rotate: 2, floatAmp: 7,
    dot: '#818CF8',
  },
  {
    id: 'arch',
    label: 'Clean Arch',
    icon: Layers,
    line1: 'services.AddScoped',
    line2: '<IUnitOfWork>()',
    x: '60%', y: '58%',
    delay: 0.45, depth: 0.7,
    rotate: -0.8, floatAmp: 4,
    dot: '#34D399',
  },
  {
    id: 'ai',
    label: 'AI Workflow',
    icon: Cpu,
    line1: 'Claude Code',
    line2: 'AI-assisted dev',
    x: '0%', y: '65%',
    delay: 0.6, depth: 0.5,
    rotate: 1.5, floatAmp: 8,
    dot: '#F59E0B',
  },
  {
    id: 'terminal',
    label: 'Terminal',
    icon: Terminal,
    line1: 'dotnet run',
    line2: '--project src/',
    x: '27%', y: '84%',
    delay: 0.65, depth: 0.37,
    rotate: 0, floatAmp: 5,
    dot: '#22D3EE',
  },
]

// ─── Individual floating card (component = hooks safe in map) ─────────────────

function FloatingCardItem({
  card,
  springX,
  springY,
}: {
  card: CardDef
  springX: ReturnType<typeof useSpring>
  springY: ReturnType<typeof useSpring>
}) {
  const px = useTransform(springX, (v: number) => v * card.depth * -1)
  const py = useTransform(springY, (v: number) => v * card.depth * -1)
  const Icon = card.icon

  return (
    <motion.div
      className="absolute"
      style={{
        left: card.x,
        top: card.y,
        x: px,
        y: py,
        zIndex: Math.round(card.depth * 10),
      }}
      initial={{ opacity: 0, scale: 0.72 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: card.delay, ease: E }}
    >
      <motion.div
        animate={{ y: [0, -(card.floatAmp ?? 6), 0] }}
        transition={{
          duration: 3.5 + card.delay * 0.7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: card.delay * 0.4,
        }}
        style={{ rotate: card.rotate ?? 0 }}
      >
        <div
          className="rounded-xl px-3 py-2.5"
          style={{
            background: 'rgba(5,7,9,0.88)',
            border: '1px solid rgba(34,211,238,0.13)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.65), inset 0 1px 0 rgba(34,211,238,0.06)',
            minWidth: 172,
          }}
        >
          {/* Header row */}
          <div className="flex items-center justify-between gap-3 mb-1.5">
            <div className="flex items-center gap-1.5">
              <div
                className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: 'rgba(34,211,238,0.08)',
                  border: '1px solid rgba(34,211,238,0.12)',
                }}
              >
                <Icon size={11} style={{ color: '#22D3EE' }} />
              </div>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(148,163,184,0.55)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {card.label}
              </span>
            </div>
            <span
              className="rounded-full flex-shrink-0"
              style={{
                width: 6,
                height: 6,
                backgroundColor: card.dot,
                boxShadow: `0 0 6px ${card.dot}`,
              }}
            />
          </div>
          {/* Code lines */}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, lineHeight: 1.6 }}>
            <div style={{ color: 'rgba(34,211,238,0.85)' }}>{card.line1}</div>
            <div style={{ color: 'rgba(148,163,184,0.45)' }}>{card.line2}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Command Center (right-side visual) ───────────────────────────────────────

function CommandCenter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 38, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 38, damping: 18 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    if (window.innerWidth < 1024) return

    const onMove = (e: MouseEvent) => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      mouseX.set(((e.clientX - rect.left - rect.width  / 2) / rect.width)  * 42)
      mouseY.set(((e.clientY - rect.top  - rect.height / 2) / rect.height) * 32)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  // Line destinations from center (50%, 47%) to each card's visual midpoint
  const lineEnds = [
    { x2: '72%', y2: '12%' }, // API (top-right)
    { x2: '9%',  y2: '26%' }, // SQL (left)
    { x2: '78%', y2: '68%' }, // Clean Arch (right)
    { x2: '8%',  y2: '74%' }, // AI (bottom-left)
    { x2: '43%', y2: '92%' }, // Terminal (bottom)
  ]

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: 560 }}
    >
      {/* Technical grid — masked to radial fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.045) 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(ellipse 88% 88% at 50% 48%, black 25%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 88% 88% at 50% 48%, black 25%, transparent 100%)',
        }}
      />

      {/* Center radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '75%',
          height: '75%',
          left: '12.5%',
          top: '12.5%',
          background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.065) 0%, transparent 65%)',
        }}
      />

      {/* SVG: rings + animated data-flow lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ overflow: 'visible' }}
      >
        {/* Concentric orbit rings */}
        <circle cx="50%" cy="47%" r="22%"
          stroke="rgba(34,211,238,0.08)" strokeWidth="1" fill="none" strokeDasharray="2 9"
        />
        <circle cx="50%" cy="47%" r="40%"
          stroke="rgba(34,211,238,0.04)" strokeWidth="1" fill="none" strokeDasharray="2 13"
        />

        {/* Data-flow connection lines */}
        {lineEnds.map(({ x2, y2 }, i) => (
          <line key={i}
            x1="50%" y1="47%"
            x2={x2} y2={y2}
            stroke="rgba(34,211,238,0.2)" strokeWidth="0.75" strokeDasharray="4 8"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="12" to="0"
              dur={`${2 + i * 0.45}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}

        {/* Small dots at line endpoints */}
        {lineEnds.map(({ x2, y2 }, i) => (
          <circle key={`dot-${i}`}
            cx={x2} cy={y2} r="2"
            fill="rgba(34,211,238,0.35)"
          />
        ))}
      </svg>

      {/* Core orb — centered */}
      <div
        className="absolute"
        style={{ left: '50%', top: '47%', transform: 'translate(-50%, -50%)' }}
      >
        <CoreOrb />
      </div>

      {/* Floating glass cards */}
      {CARDS.map(card => (
        <FloatingCardItem
          key={card.id}
          card={card}
          springX={springX}
          springY={springY}
        />
      ))}
    </div>
  )
}

// ─── Hero section ─────────────────────────────────────────────────────────────

export default function Hero() {
  const role = useScramble('Full Stack .NET Developer', 700)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundColor: '#0A0E16',
        // Restore dark-theme tokens so CSS-var-based colours are visible on the dark hero
        ['--text-1' as string]:       '#EEF2F8',
        ['--text-2' as string]:       '#A8B8CC',
        ['--text-3' as string]:       '#5B6F88',
        ['--accent' as string]:       '#22D3EE',
        ['--accent-dim' as string]:   'rgba(34,211,238,0.12)',
        ['--border' as string]:       'rgba(255,255,255,0.09)',
        ['--border-hover' as string]: 'rgba(255,255,255,0.16)',
        // Bright gradient for the name
        ['--grad-from' as string]:    '#22D3EE',
        ['--grad-to' as string]:      '#818CF8',
      }}
    >
      {/* Particle network background */}
      <ParticleCanvas count={55} />

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Aurora blob 1 — cyan, top-right, slow float */}
      <div
        className="absolute pointer-events-none animate-float-slow"
        style={{
          width: 700, height: 700,
          right: '-10%', top: '-20%',
          background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.18) 0%, rgba(34,211,238,0.04) 45%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Aurora blob 2 — violet, bottom-left */}
      <div
        className="absolute pointer-events-none animate-float-slow2"
        style={{
          width: 600, height: 600,
          left: '-12%', bottom: '-10%',
          background: 'radial-gradient(ellipse at center, rgba(129,140,248,0.22) 0%, rgba(129,140,248,0.05) 45%, transparent 70%)',
          filter: 'blur(55px)',
        }}
      />
      {/* Aurora blob 3 — cyan-green, center */}
      <div
        className="absolute pointer-events-none animate-float-slow3"
        style={{
          width: 500, height: 400,
          left: '30%', top: '40%',
          background: 'radial-gradient(ellipse at center, rgba(52,211,153,0.1) 0%, transparent 65%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 container-xl pt-28 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-7rem)]">

          {/* ── LEFT: text content ── */}
          <div className="flex flex-col justify-center lg:pr-6">

            {/* Location pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: E }}
              className="mb-10"
            >
              <span className="section-label">
                <span
                  className="w-2 h-2 rounded-full animate-pulse-glow"
                  style={{ backgroundColor: 'var(--accent)' }}
                />
                <span suppressHydrationWarning>{role}</span>
                &nbsp;·&nbsp; Istanbul
              </span>
            </motion.div>

            {/* Name — masked reveal */}
            <div className="mb-7">
              <Reveal delay={0.08}>
                <h1
                  className="heading-xl"
                  style={{ color: 'var(--text-1)', lineHeight: 0.88 }}
                >
                  Üzeyir
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <h1
                  className="heading-xl gradient-text-cyan"
                  style={{ lineHeight: 0.88 }}
                >
                  Öğür.
                </h1>
              </Reveal>
            </div>

            {/* Tagline */}
            <Reveal delay={0.34}>
              <p
                className="text-[15px] max-w-sm mb-10"
                style={{ color: 'var(--text-2)', lineHeight: 1.85 }}
              >
                I build scalable web apps, dashboards, and product-focused
                systems with{' '}
                <span style={{ color: 'var(--text-1)', fontWeight: 600 }}>
                  .NET, clean architecture,
                </span>{' '}
                and AI-assisted workflows.
              </p>
            </Reveal>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.48, ease: E }}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: '#050709',
                  boxShadow: '0 0 28px rgba(34,211,238,0.28)',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#67E8F9')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--accent)')}
              >
                View Projects
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href={profile.cvUrl}
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200"
                style={{ color: 'var(--text-2)', border: '1px solid var(--border)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(34,211,238,0.3)'
                  e.currentTarget.style.color = 'var(--text-1)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.color = 'var(--text-2)'
                }}
              >
                <Download size={14} /> Download CV
              </a>

              <a
                href="#contact"
                className="inline-flex items-center px-5 py-3 text-sm font-semibold transition-colors duration-200"
                style={{ color: 'var(--text-3)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
              >
                Get in touch →
              </a>
            </motion.div>

            {/* Social pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.64 }}
              className="flex items-center gap-2"
            >
              {[
                { href: socials.github,   icon: <Github size={13} />,   label: 'github'   },
                { href: socials.linkedin, icon: <Linkedin size={13} />, label: 'linkedin' },
                ...(socials.twitter
                  ? [{ href: socials.twitter, icon: <Twitter size={13} />, label: 'x.com' }]
                  : []),
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs transition-all duration-200"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-3)',
                    border: '1px solid var(--border)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--accent)'
                    e.currentTarget.style.borderColor = 'rgba(34,211,238,0.25)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--text-3)'
                    e.currentTarget.style.borderColor = 'var(--border)'
                  }}
                >
                  {icon} {label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: terminal screen — desktop full, mobile compact ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.2 }}
          >
            <Laptop3DHero />
          </motion.div>

        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span
          className="text-[10px] tracking-[0.2em] uppercase"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-3)' }}
        >
          scroll
        </span>
        <ChevronDown size={14} style={{ color: 'var(--text-3)' }} />
      </motion.div>
    </section>
  )
}
