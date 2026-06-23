'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const E = [0.16, 1, 0.3, 1] as const

type Cell = 'X' | 'O' | null
const WIN_LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
function checkWinner(b: Cell[]): Cell {
  for (const [a, c, d] of WIN_LINES) if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a]
  return null
}

function LogicBoard() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null))
  const [xTurn, setXTurn] = useState(true)
  const winner = checkWinner(board)
  const isDraw = !winner && board.every(Boolean)

  const move = (i: number) => {
    if (board[i] || winner) return
    const next = [...board]; next[i] = xTurn ? 'X' : 'O'
    setBoard(next); setXTurn((t) => !t)
  }
  const reset = () => { setBoard(Array(9).fill(null)); setXTurn(true) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.18em', color: 'var(--text-3)', textTransform: 'uppercase' }}>
          Logic Board
        </span>
        <div style={{ flex: 1, height: 1, backgroundColor: 'var(--border)' }} />
        <button
          onClick={reset}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', color: 'var(--text-3)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.1em', transition: 'color 0.15s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
        >
          reset()
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, width: 108 }}>
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => move(i)}
            style={{
              width: 32, height: 32,
              border: '1px solid var(--border)', borderRadius: 3,
              background: cell ? 'rgba(232,0,58,0.05)' : 'transparent',
              cursor: cell || winner ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700,
              color: cell === 'X' ? 'var(--accent)' : 'rgba(0,0,0,0.3)',
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={(e) => { if (!cell && !winner) e.currentTarget.style.borderColor = 'rgba(232,0,58,0.35)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            {cell}
          </button>
        ))}
      </div>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: winner ? 'var(--accent)' : 'var(--text-3)', letterSpacing: '0.1em', margin: 0 }}>
        {winner ? `${winner} kazandı` : isDraw ? 'Berabere — reset()' : `Sıra: ${xTurn ? 'X' : 'O'}`}
      </p>
    </div>
  )
}

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / 1200, 1)
          setVal(Math.round((1 - Math.pow(1 - p, 3)) * to))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    obs.observe(el); return () => obs.disconnect()
  }, [to])

  return <span ref={ref}>{val}{suffix}</span>
}

const METRICS = [
  { value: 5, suffix: '', label: 'Proje' },
  { value: 2, suffix: '+', label: 'Yıl' },
  { value: 7, suffix: '', label: 'Tech katmanı' },
]
const FOCUS = [
  'Temiz mimari · RESTful API',
  'Veritabanı tasarımı · ORM',
  'Dashboard UI · Yönetim panelleri',
  'Business workflow otomasyonu',
  'AI destekli geliştirme',
]

export default function About() {
  return (
    <section id="about" className="section-y" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="container-xl">
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label" style={{ marginBottom: '3rem', display: 'block' }}
        >
          // Hakkımda
        </motion.p>

        {/* Editorial headline */}
        <div style={{ marginBottom: '3.5rem' }}>
          {['Sadece kod yazmıyorum.', 'İşleyen sistemler geliştiriyorum.'].map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: i * 0.1, ease: E }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 4vw, 4rem)',
                fontWeight: 800,
                color: i === 0 ? 'var(--text-1)' : 'var(--accent)',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                margin: 0,
                marginTop: i > 0 ? '0.15rem' : 0,
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 26rem), 1fr))', gap: 'clamp(2.5rem, 6vw, 6rem)', alignItems: 'start' }}>
          {/* Left: bio */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {[
              { text: 'Atatürk Üniversitesi Bilgisayar Mühendisliği mezunuyum. Full Stack .NET Developer olarak ASP.NET Core MVC, Web API, Entity Framework Core ve SQL Server teknolojileriyle kurumsal web uygulamaları, dashboardlar ve yönetim panelleri geliştiriyorum.', op: 1 },
              { text: 'Temiz mimari, sürdürülebilir kod yapısı ve gerçek iş ihtiyaçlarına uygun çözümler üretmeye odaklanıyorum. Sadece çalışan ekranlar değil, bakımı kolay, genişletilebilir ve profesyonel sistemler üretmeyi önemsiyorum.', op: 0.8 },
              { text: 'Yapay zeka ve otomasyon son dönemdeki en büyük ilgi alanlarımdan. N8n ile karmaşık iş akışları, Claude gibi LLM\'lerle AI destekli geliştirme ve Deep Learning temellerini projelere entegre etmek üzerine aktif çalışıyorum.', op: 0.6 },
            ].map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: E }}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(0.87rem, 1.4vw, 0.98rem)',
                  color: 'var(--text-2)',
                  lineHeight: 1.8,
                  margin: 0,
                  paddingLeft: '1rem',
                  borderLeft: `1px solid rgba(232,0,58,${0.4 - i * 0.12})`,
                  opacity: para.op,
                }}
              >
                {para.text}
              </motion.p>
            ))}
          </div>

          {/* Right: metrics + focus + logic board */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, ease: E }}
              style={{ display: 'flex', gap: '2.5rem' }}
            >
              {METRICS.map((m) => (
                <div key={m.label}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 800, color: 'var(--text-1)', lineHeight: 1, letterSpacing: '-0.03em' }}>
                    <CountUp to={m.value} suffix={m.suffix} />
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.25rem' }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Focus */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease: E }}
            >
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.57rem', letterSpacing: '0.18em', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: '0.9rem' }}>
                Odak Alanları
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {FOCUS.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'var(--accent)', opacity: 0.5, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-2)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Logic Board */}
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            >
              <LogicBoard />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
