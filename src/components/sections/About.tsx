'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, MapPin, Briefcase } from 'lucide-react'
import { profile } from '@/data/profile'

// ─── Profile photo ──────────────────────────────────────────────────────────────
function ProfileAvatar() {
  const [err, setErr] = useState(false)
  if (err || !profile.avatar) {
    return (
      <div className="w-full h-full flex items-center justify-center"
        style={{ background:'linear-gradient(135deg,rgba(2,132,199,0.18),rgba(124,58,237,0.12))', fontFamily:'var(--font-display)', fontSize:26, fontWeight:800, color:'var(--accent)' }}>
        {profile.initials}
      </div>
    )
  }
  return <Image src={profile.avatar} alt={profile.avatarAlt ?? profile.name} fill className="object-cover" onError={() => setErr(true)} priority />
}

// ─── 3D Floating Laptop ──────────────────────────────────────────────────────────
const CODE = [
  { t: '[ApiController]',                c: '#DCDCAA' },
  { t: '[Route("api/developer")]',        c: '#DCDCAA' },
  { t: 'public class Profile : Base',     c: '#4EC9B0' },
  { t: '{',                               c: 'rgba(255,210,80,0.8)' },
  { t: '  // İstanbul, Türkiye 🇹🇷',     c: '#6A9955' },
  { t: '  [HttpGet("hire")]',             c: '#DCDCAA' },
  { t: '  public Dev Hire()',             c: '#DCDCAA' },
  { t: '  {',                             c: 'rgba(255,210,80,0.8)' },
  { t: '    return new Dev {',            c: 'rgba(210,225,240,0.85)' },
  { t: '      Name  = "Üzeyir Öğür",',   c: '#CE9178' },
  { t: '      Stack = ".NET Core",',      c: '#CE9178' },
  { t: '      Open  = true,  // ✓',       c: '#98D982' },
  { t: '    };',                          c: 'rgba(210,225,240,0.85)' },
  { t: '  }',                             c: 'rgba(255,210,80,0.8)' },
  { t: '}',                               c: 'rgba(255,210,80,0.8)' },
]

function LaptopShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const inView  = useInView(wrapRef, { once: true, margin: '-10%' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let c = 0
    let timer: ReturnType<typeof setTimeout>
    const run = () => {
      c++
      setCount(c)
      if (c < CODE.length) {
        timer = setTimeout(run, 135)
      } else {
        timer = setTimeout(() => { setCount(0); c = 0; timer = setTimeout(run, 700) }, 3800)
      }
    }
    timer = setTimeout(run, 550)
    return () => clearTimeout(timer)
  }, [inView])

  return (
    <div
      ref={wrapRef}
      style={{
        perspective: 1100,
        perspectiveOrigin: '56% 32%',
        padding: '6px 0 52px',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Screen ambient glow */}
      <motion.div
        style={{
          position: 'absolute', pointerEvents: 'none',
          width: 270, height: 150, top: 30,
          background: 'radial-gradient(ellipse, rgba(34,211,238,0.1) 0%, transparent 72%)',
          filter: 'blur(18px)',
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Entry wrapper */}
      <motion.div
        style={{ transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, scale: 0.88, y: 28 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Float + angle wrapper */}
        <motion.div
          style={{ transformStyle: 'preserve-3d', rotateX: 19, rotateY: -22 }}
          animate={inView ? { y: [0, -13, 0] } : {}}
          transition={{ y: { duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.85 } }}
        >
          {/* ── Screen lid ── */}
          <div style={{
            width: 272,
            background: '#17243A',
            borderRadius: '11px 11px 0 0',
            padding: '7px 7px 5px',
            boxShadow: '-16px 8px 44px rgba(0,0,0,0.5), 0 0 0 1px rgba(34,211,238,0.12)',
            position: 'relative',
          }}>
            {/* Camera dot */}
            <div style={{
              position: 'absolute', top: 5, left: '50%', transform: 'translateX(-50%)',
              width: 5, height: 5, borderRadius: '50%',
              background: '#070E1C', border: '1px solid rgba(34,211,238,0.22)',
            }} />

            {/* Screen glass */}
            <div style={{
              background: '#0B1423',
              borderRadius: 6,
              height: 174,
              overflow: 'hidden',
              position: 'relative',
            }}>
              {/* Glass sheen */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.025) 0%, transparent 55%)',
              }} />

              {/* IDE tab bar */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '5px 10px',
                background: 'rgba(0,0,0,0.28)',
                borderBottom: '1px solid rgba(34,211,238,0.07)',
              }}>
                {['#FF5F57','#FFBD2E','#28C840'].map(col => (
                  <div key={col} style={{ width: 7, height: 7, borderRadius: '50%', background: col, opacity: 0.82 }} />
                ))}
                <span style={{ marginLeft: 6, fontSize: 7.5, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.18)' }}>
                  Developer.cs — portfolio
                </span>
              </div>

              {/* Code lines */}
              <div style={{ padding: '7px 0', overflow: 'hidden' }}>
                {CODE.slice(0, count).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.1 }}
                    style={{ display: 'flex', paddingLeft: 5, paddingRight: 6 }}
                  >
                    <span style={{
                      minWidth: 20, paddingRight: 8, textAlign: 'right', flexShrink: 0,
                      fontSize: 7, color: 'rgba(100,120,140,0.35)', fontFamily: 'var(--font-mono)',
                    }}>{i + 1}</span>
                    <span style={{ fontSize: 9, lineHeight: 1.6, color: line.c, fontFamily: 'var(--font-mono)', whiteSpace: 'pre' }}>
                      {line.t}
                    </span>
                  </motion.div>
                ))}
                {/* Blinking cursor */}
                <div style={{ paddingLeft: 33, height: 14, display: 'flex', alignItems: 'center' }}>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.65, repeat: Infinity }}
                    style={{ display: 'inline-block', width: 5.5, height: 11, background: 'rgba(34,211,238,0.75)', borderRadius: 1 }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Hinge strip ── */}
          <div style={{
            width: 272, height: 4,
            background: '#090F1E',
            borderLeft: '1px solid rgba(255,255,255,0.03)',
            borderRight: '1px solid rgba(255,255,255,0.03)',
          }} />

          {/* ── Base front edge ── */}
          <div style={{
            width: 286, height: 14, marginLeft: -7,
            background: 'linear-gradient(180deg, #1C2B40, #121C2D)',
            borderRadius: '0 0 11px 11px',
            border: '1px solid rgba(255,255,255,0.05)',
            borderTop: 'none',
            boxShadow: '0 22px 55px rgba(0,0,0,0.55)',
            position: 'relative',
          }}>
            {/* Trackpad indicator line */}
            <div style={{
              position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)',
              width: 62, height: 7, borderRadius: 3,
              background: 'rgba(255,255,255,0.04)',
            }} />
          </div>

          {/* ── Keyboard top surface (visible from above at isometric angle) ── */}
          <div style={{
            position: 'absolute',
            top: 186, left: -7,
            width: 286, height: 128,
            background: 'linear-gradient(162deg, #192435 0%, #0F1922 100%)',
            transformOrigin: 'top center',
            transform: 'rotateX(-90deg)',
            borderRadius: '0 0 11px 11px',
          }}>
            {[7, 26, 44, 62].map((y, row) => (
              <div key={row} style={{ position: 'absolute', top: y, left: 12, right: 12, display: 'flex', gap: 2.5 }}>
                {Array.from({ length: 14 - row * 2 }).map((_, k) => (
                  <div key={k} style={{
                    flex: 1, height: 12,
                    background: 'rgba(255,255,255,0.058)',
                    borderRadius: 2,
                    boxShadow: '0 1px 0 rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.03)',
                  }} />
                ))}
              </div>
            ))}
            {/* Trackpad on keyboard surface */}
            <div style={{
              position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
              width: 82, height: 52, borderRadius: 5,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
            }} />
          </div>

          {/* ── Screen left edge (depth visible from angle) ── */}
          <div style={{
            position: 'absolute', top: 0, left: -10,
            width: 10, height: 192,
            transformOrigin: 'right center',
            transform: 'rotateY(-90deg)',
            background: 'linear-gradient(90deg, #060C18, #121C2D)',
            borderRadius: '11px 0 0 0',
          }} />
        </motion.div>
      </motion.div>

      {/* Floor shadow */}
      <div style={{
        position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
        width: 210, height: 22,
        background: 'radial-gradient(ellipse, rgba(0,0,0,0.2) 0%, transparent 70%)',
        filter: 'blur(8px)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

// ─── Stack ──────────────────────────────────────────────────────────────────────
const STACK = [
  { label:'ASP.NET Core', color:'#0284C7' },
  { label:'C#',           color:'#0284C7' },
  { label:'Web API',      color:'#0284C7' },
  { label:'EF Core',      color:'#6D28D9' },
  { label:'SQL Server',   color:'#6D28D9' },
  { label:'Clean Arch',   color:'#047857' },
  { label:'MVC',          color:'#047857' },
  { label:'N8n',          color:'#B45309' },
  { label:'Claude AI',    color:'#B45309' },
  { label:'Git',          color:'#374151' },
  { label:'Docker',       color:'#374151' },
]

const HIGHLIGHTS: Record<string, string> = {
  'ASP.NET Core MVC':       '#0284C7',
  'Web API':                 '#0284C7',
  'Entity Framework Core':   '#6D28D9',
  'SQL Server':              '#6D28D9',
  'N8n':                     '#B45309',
  'Claude':                  '#B45309',
  'Deep Learning':           '#047857',
  'Bilgisayar Mühendisliği':'#374151',
}

function HighlightedText({ text }: { text: string }) {
  let remaining = text
  const parts: { str: string; color?: string }[] = []

  while (remaining.length > 0) {
    let nearest = remaining.length
    let nearestKw = ''
    let nearestColor = ''

    for (const [kw, color] of Object.entries(HIGHLIGHTS)) {
      const idx = remaining.indexOf(kw)
      if (idx !== -1 && idx < nearest) { nearest = idx; nearestKw = kw; nearestColor = color }
    }

    if (nearestKw && nearest < remaining.length) {
      if (nearest > 0) parts.push({ str: remaining.slice(0, nearest) })
      parts.push({ str: nearestKw, color: nearestColor })
      remaining = remaining.slice(nearest + nearestKw.length)
    } else {
      parts.push({ str: remaining })
      remaining = ''
    }
  }

  return (
    <>
      {parts.map((p, i) =>
        p.color
          ? <span key={i} style={{ color: p.color, fontWeight: 600 }}>{p.str}</span>
          : <span key={i}>{p.str}</span>
      )}
    </>
  )
}

const ease = [0.16, 1, 0.3, 1] as const

// ─── Section ────────────────────────────────────────────────────────────────────
export default function About() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  const paragraphs = profile.about.split('\n\n')

  return (
    <section ref={ref} id="about" className="relative section-y overflow-hidden" style={{ backgroundColor:'var(--bg-base)' }}>
      <div className="absolute inset-0 pointer-events-none line-grid opacity-40" />
      <div className="absolute pointer-events-none" style={{ top:'-15%', right:'-5%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(2,132,199,0.07) 0%,transparent 65%)' }} />

      <div className="container-xl relative">
        {/* Header */}
        <motion.div initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.7, ease }} className="mb-14">
          <span className="section-label mb-4 block"><span className="accent-line" /> 01 &mdash; About</span>
          <div className="overflow-hidden">
            <motion.h2 className="heading-lg" style={{ color:'var(--text-1)' }} initial={{ y:'100%' }} animate={inView ? { y:'0%' } : {}} transition={{ duration:1, ease }}>
              Kim <span className="gradient-text-cyan">Olduğum</span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-14 lg:gap-20 items-start">

          {/* ─── Left ─── */}
          <div>
            {/* Profile card */}
            <motion.div
              initial={{ opacity:0, y:16 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, ease }}
              className="flex items-center gap-4 mb-10 p-4 rounded-2xl"
              style={{ background:'white', border:'1px solid var(--border)', boxShadow:'0 4px 20px rgba(0,0,0,0.06)' }}
            >
              <div style={{ width:60, height:60, borderRadius:'50%', border:'2px solid rgba(2,132,199,0.3)', overflow:'hidden', position:'relative', background:'var(--bg-elevated)', flexShrink:0 }}>
                <ProfileAvatar />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[15px]" style={{ color:'var(--text-1)', fontFamily:'var(--font-display)', letterSpacing:'-0.01em' }}>{profile.name}</p>
                <p className="text-[13px] mt-0.5" style={{ color:'var(--text-2)' }}>{profile.shortTitle}</p>
                <div className="flex items-center gap-4 mt-1.5">
                  <span className="flex items-center gap-1 text-[11px]" style={{ color:'var(--text-3)' }}><MapPin size={10} />İstanbul</span>
                  <span className="flex items-center gap-1 text-[11px]" style={{ color:'var(--text-3)' }}><Briefcase size={10} />2+ yıl deneyim</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl flex-shrink-0" style={{ background:'rgba(4,120,87,0.08)', border:'1px solid rgba(4,120,87,0.15)' }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background:'#059669' }} />
                  <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background:'#059669' }} />
                </span>
                <span className="text-[11px] font-semibold" style={{ color:'#047857' }}>Müsait</span>
              </div>
            </motion.div>

            {/* Bio paragraphs */}
            <div className="space-y-6 mb-10">
              {paragraphs.map((para, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity:0, x:-12 }}
                  animate={inView ? { opacity:1, x:0 } : {}}
                  transition={{ duration:0.6, delay:i * 0.12, ease }}
                  style={{
                    paddingLeft: 16,
                    borderLeft: `2px solid ${i === 0 ? 'rgba(2,132,199,0.4)' : i === 1 ? 'rgba(109,40,217,0.3)' : 'rgba(180,83,9,0.3)'}`,
                  }}
                >
                  <p className="text-[15px] leading-[1.9]" style={{ color:'var(--text-2)' }}>
                    <HighlightedText text={para} />
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Stack */}
            <motion.div initial={{ opacity:0, y:10 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, delay:0.35, ease }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] mb-4" style={{ color:'var(--text-3)', fontFamily:'var(--font-mono)' }}>Active stack</p>
              <div className="flex flex-wrap gap-2">
                {STACK.map((item, i) => (
                  <motion.span
                    key={item.label}
                    initial={{ opacity:0, scale:0.85 }}
                    animate={inView ? { opacity:1, scale:1 } : {}}
                    transition={{ duration:0.3, delay:0.4 + i * 0.03, ease }}
                    whileHover={{ y:-2, transition:{ duration:0.15 } }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs cursor-default"
                    style={{ fontFamily:'var(--font-mono)', background:'white', border:`1px solid ${item.color}22`, boxShadow:'0 1px 4px rgba(0,0,0,0.06)', color:'var(--text-2)' }}
                  >
                    <span style={{ width:5, height:5, borderRadius:'50%', background:item.color, flexShrink:0, display:'inline-block' }} />
                    {item.label}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ duration:0.5, delay:0.55 }} className="mt-8">
              <a href="#projects" className="group inline-flex items-center gap-2 text-sm font-semibold" style={{ color:'var(--accent)' }}>
                Projelerimi gör <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* ─── Right: 3D laptop + stats ─── */}
          <motion.div
            initial={{ opacity:0, x:24 }}
            animate={inView ? { opacity:1, x:0 } : {}}
            transition={{ duration:0.8, delay:0.15, ease }}
            className="space-y-4"
          >
            <LaptopShowcase />

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { value:'2+', label:'Yıl Deneyim', color:'#0284C7' },
                { value:'6+', label:'Aktif Proje',  color:'#6D28D9' },
                { value:'5',  label:'Tamamlandı',   color:'#047857' },
                { value:'∞',  label:'Öğrenme',      color:'#B45309' },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity:0, y:12 }}
                  animate={inView ? { opacity:1, y:0 } : {}}
                  transition={{ duration:0.4, delay:0.45 + i * 0.07, ease }}
                  className="rounded-xl p-4 text-center"
                  style={{ background:'white', border:'1px solid var(--border)', boxShadow:'0 2px 10px rgba(0,0,0,0.05)' }}
                >
                  <div style={{ fontSize:24, fontWeight:800, fontFamily:'var(--font-display)', color:s.color, letterSpacing:'-0.02em' }}>
                    {s.value}
                  </div>
                  <div className="text-[11px] mt-0.5" style={{ color:'var(--text-3)' }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
