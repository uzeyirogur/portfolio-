'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, animate, useInView, type PanInfo } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { projects } from '@/data/projects'

// ─── Per-project accent colours (light-theme safe) ─────────────────────────────
const ACCENT: Record<string, string> = {
  'paramnet':           '#0284C7',
  'anka-sports':        '#6D28D9',
  'gold-price-tracker': '#B45309',
  'vehicle-inventory':  '#047857',
  'ticket-system':      '#BE185D',
  'portfolyox':         '#C2410C',
}

const ease = [0.16, 1, 0.3, 1] as const
const GAP  = 20

// ─── Project image with fallback gradient ──────────────────────────────────────
function ProjectImg({ src, alt, accent }: { src: string; alt: string; accent: string }) {
  const [err, setErr] = useState(false)
  if (err || !src) {
    return (
      <div
        style={{
          width: '100%', height: '100%',
          background: `linear-gradient(135deg, ${accent}22, ${accent}08)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 56, height: 56, borderRadius: 14,
            background: `${accent}18`,
            border: `1px solid ${accent}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, color: accent,
          }}
        >
          {'</>'}
        </div>
      </div>
    )
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      onError={() => setErr(true)}
      draggable={false}
    />
  )
}

// ─── Single carousel card ───────────────────────────────────────────────────────
function ProjectCard({
  project: p,
  isActive,
}: {
  project: typeof projects[0]
  isActive: boolean
}) {
  const accent = ACCENT[p.slug] ?? '#0284C7'

  return (
    <motion.div
      animate={{
        scale:   isActive ? 1 : 0.92,
        opacity: isActive ? 1 : 0.5,
        y:       isActive ? 0 : 12,
      }}
      transition={{ duration: 0.4, ease }}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'white',
        borderRadius: 20,
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow: isActive
          ? '0 28px 80px rgba(0,0,0,0.14), 0 4px 20px rgba(0,0,0,0.08)'
          : '0 6px 20px rgba(0,0,0,0.05)',
        cursor: isActive ? 'grab' : 'pointer',
        userSelect: 'none',
      }}
    >
      {/* Image */}
      <div style={{ height: 220, position: 'relative', flexShrink: 0, overflow: 'hidden' }}>
        <ProjectImg src={p.image} alt={p.title} accent={accent} />
        {/* Bottom gradient on image */}
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)',
          }}
        />
        {/* Badges on image */}
        <div style={{ position: 'absolute', bottom: 14, left: 16, display: 'flex', gap: 7 }}>
          <span
            style={{
              fontSize: 9, fontWeight: 700, color: 'white',
              textTransform: 'uppercase', letterSpacing: '0.14em',
              fontFamily: 'var(--font-mono)',
              background: accent, padding: '3px 9px', borderRadius: 6,
            }}
          >
            {p.category[0]}
          </span>
          <span
            style={{
              fontSize: 9, color: 'rgba(255,255,255,0.85)',
              textTransform: 'uppercase', letterSpacing: '0.1em',
              fontFamily: 'var(--font-mono)',
              background: 'rgba(0,0,0,0.35)',
              backdropFilter: 'blur(8px)',
              padding: '3px 9px', borderRadius: 6,
            }}
          >
            {p.status}
          </span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 20, fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'var(--text-1)',
            lineHeight: 1.15,
          }}
        >
          {p.title}
        </h3>

        <p
          className="line-clamp-3"
          style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-2)', flex: 1 }}
        >
          {p.description}
        </p>

        {/* Tech chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 4 }}>
          {p.technologies.slice(0, 4).map(t => (
            <span
              key={t}
              style={{
                fontSize: 10, padding: '3px 8px', borderRadius: 6,
                background: 'var(--bg-elevated)',
                color: 'var(--text-3)',
                fontFamily: 'var(--font-mono)',
                border: '1px solid var(--border)',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        {(p.demoUrl || p.githubUrl) && (
          <div style={{ display: 'flex', gap: 14, paddingTop: 2 }}>
            {p.demoUrl && (
              <a
                href={p.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, fontWeight:600, color:accent }}
                onClick={e => e.stopPropagation()}
              >
                <ExternalLink size={12} /> Demo
              </a>
            )}
            {p.githubUrl && (
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, color:'var(--text-3)' }}
                onClick={e => e.stopPropagation()}
              >
                <Github size={12} /> Kaynak
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ─── Main section ───────────────────────────────────────────────────────────────
export default function Projects() {
  const [active,     setActive]     = useState(0)
  const [containerW, setContainerW] = useState(1100)
  const [isHovering, setIsHovering] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef    = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })

  const x = useMotionValue(0)

  // Responsive card width: show ~1.3 cards at once so next card peeks
  const CARD_W  = Math.min(containerW * 0.78, 500)
  const PADDING = (containerW - CARD_W) / 2

  // Animate track to center card at `index`
  const goTo = useCallback(
    (index: number) => {
      const clamped = ((index % projects.length) + projects.length) % projects.length
      setActive(clamped)
      animate(x, PADDING - clamped * (CARD_W + GAP), {
        type: 'spring', stiffness: 260, damping: 26, mass: 0.65,
      })
    },
    [x, CARD_W, PADDING],
  )

  // Sync position when container width changes
  useEffect(() => {
    x.set(PADDING - active * (CARD_W + GAP))
  }, [containerW]) // eslint-disable-line

  // Observe container width
  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver(() => {
      setContainerW(containerRef.current?.offsetWidth ?? 1100)
    })
    ro.observe(containerRef.current)
    setContainerW(containerRef.current.offsetWidth)
    return () => ro.disconnect()
  }, [])

  // Auto-advance (pauses on hover or drag)
  useEffect(() => {
    if (isHovering || isDragging) return
    const t = setTimeout(() => goTo(active + 1), 5000)
    return () => clearTimeout(t)
  }, [active, isHovering, isDragging, goTo])

  // Drag end — decide which card to land on
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    setIsDragging(false)
    const threshold = CARD_W * 0.18
    const fast      = Math.abs(info.velocity.x) > 350
    if (info.offset.x < -threshold || (fast && info.velocity.x < 0)) goTo(active + 1)
    else if (info.offset.x > threshold || (fast && info.velocity.x > 0)) goTo(active - 1)
    else animate(x, PADDING - active * (CARD_W + GAP), { type: 'spring', stiffness: 300, damping: 28 })
  }

  return (
    <section
      id="projects"
      style={{ backgroundColor: 'var(--bg-surface)', paddingTop:'6rem', paddingBottom:'6rem', overflow:'hidden' }}
    >
      {/* Header */}
      <div className="container-xl" ref={headerRef}>
        <motion.div
          initial={{ opacity:0, y:24 }}
          animate={headerInView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.7, ease }}
          className="mb-12"
        >
          <span className="section-label mb-4 block">
            <span className="accent-line" /> 03 &mdash; Projects
          </span>
          <div className="overflow-hidden mb-3">
            <motion.h2
              className="heading-lg"
              style={{ color:'var(--text-1)' }}
              initial={{ y:'100%' }}
              animate={headerInView ? { y:'0%' } : {}}
              transition={{ duration:1, ease }}
            >
              Tüm{' '}
              <span className="gradient-text-cyan">Projeler</span>
            </motion.h2>
          </div>
          <p className="text-[14px]" style={{ color:'var(--text-3)' }}>
            Sürükleyin &mdash; otomatik geçiş yapar.
          </p>
        </motion.div>
      </div>

      {/* ── Draggable track ── */}
      <div
        ref={containerRef}
        style={{ overflow:'hidden', paddingBottom:6 }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <motion.div
          style={{ x, display:'flex', gap:GAP }}
          drag="x"
          dragConstraints={{
            left:  PADDING - (projects.length - 1) * (CARD_W + GAP),
            right: PADDING,
          }}
          dragElastic={0.05}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          whileDrag={{ cursor:'grabbing' }}
        >
          {projects.map((p, i) => (
            <div
              key={p.slug}
              style={{ width:CARD_W, minWidth:CARD_W, height:470 }}
              onClick={() => !isDragging && i !== active && goTo(i)}
            >
              <ProjectCard project={p} isActive={i === active} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Progress + dots ── */}
      <div className="container-xl mt-8">
        {/* Auto-advance progress bar */}
        <div style={{ height:2, background:'rgba(0,0,0,0.08)', borderRadius:1, marginBottom:14, overflow:'hidden' }}>
          <motion.div
            key={`${active}-${isHovering}-${isDragging}`}
            initial={{ scaleX:0 }}
            animate={{ scaleX: isHovering || isDragging ? 0 : 1 }}
            transition={{ duration: isHovering || isDragging ? 0 : 5, ease:'linear' }}
            style={{ height:'100%', background:'var(--accent)', transformOrigin:'left', borderRadius:1 }}
          />
        </div>

        {/* Dots + counter */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', gap:7, alignItems:'center' }}>
            {projects.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width:      i === active ? 28 : 8,
                  background: i === active ? 'var(--accent)' : 'rgba(0,0,0,0.15)',
                }}
                transition={{ duration:0.3 }}
                onClick={() => goTo(i)}
                style={{ height:8, borderRadius:4, cursor:'pointer' }}
              />
            ))}
          </div>
          <span
            style={{
              fontSize:11, fontFamily:'var(--font-mono)',
              color:'var(--text-3)',
            }}
          >
            {String(active+1).padStart(2,'0')} / {String(projects.length).padStart(2,'0')}
          </span>
        </div>
      </div>
    </section>
  )
}
