'use client'

import { useRef, useState, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/scripts/gsap'
import styles from './Experience.module.scss'

// ── Data ─────────────────────────────────────────────────────────────────────

interface Exp {
  id: string
  company: string
  theme: 'metal' | 'code'
  accent: string
  year: string
  role: string
  period: string
  location: string
  isCurrent: boolean
  highlights: string[]
  tags: string[]
}

const EXPERIENCES: Exp[] = [
  {
    id: '01',
    company: 'GMR GENÇ METAL RAFİNERİ',
    theme: 'metal',
    accent: '#C9A84C',
    year: '2026',
    role: 'Bilgisayar Mühendisi · Full Stack .NET Geliştirici',
    period: 'OCA 2026 — DEVAM',
    location: 'İSTANBUL, TR',
    isCurrent: true,
    highlights: [
      'Kurumsal .NET uygulama geliştirme',
      'ASP.NET Core MVC ve Web API mimarisi',
      'Entity Framework Core + SQL Server veri katmanı',
      'Yönetim paneli ve admin dashboard geliştirme',
      'İç araç ve süreç otomasyon sistemleri',
    ],
    tags: ['ASP.NET Core MVC', 'Web API', 'Entity Framework Core', 'SQL Server', 'Admin Dashboard', 'Process Automation'],
  },
  {
    id: '02',
    company: 'WEB BEYAZ',
    theme: 'code',
    accent: '#5B8DB8',
    year: '2025',
    role: 'Yazılım Mühendisi Stajyeri',
    period: 'AĞU 2025 — OCA 2026',
    location: 'SAMSUN, TR',
    isCurrent: false,
    highlights: [
      'ASP.NET Core web uygulama geliştirme',
      'Veritabanı tabanlı yönetim panelleri',
      'Entity Framework Core operasyonları',
      'Dashboard arayüz ekranları',
      'Git ve GitHub ile versiyon kontrolü',
    ],
    tags: ['ASP.NET Core', 'Entity Framework Core', 'SQL Server', 'Dashboard', 'Git', 'GitHub'],
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function Experience() {
  const sectionRef  = useRef<HTMLElement>(null)
  const labelRef    = useRef<HTMLDivElement>(null)
  const showcaseRef = useRef<HTMLDivElement>(null)
  const entryRefs   = useRef<(HTMLDivElement | null)[]>(Array(EXPERIENCES.length).fill(null))
  const cardRefs    = useRef<(HTMLDivElement | null)[]>(Array(EXPERIENCES.length).fill(null))
  const activeRef   = useRef<number>(0)
  const [activeIdx, setActiveIdx] = useState(0)

  // ── Card switch ────────────────────────────────────────────────────────────

  const switchTo = useCallback((next: number) => {
    if (next === activeRef.current) return
    const prev = activeRef.current
    const prevCard = cardRefs.current[prev]
    const nextCard = cardRefs.current[next]
    if (!prevCard || !nextCard) return

    gsap.to(prevCard, {
      opacity: 0,
      y: -20,
      rotateX: 5,
      duration: 0.38,
      ease: 'power3.in',
      overwrite: true,
    })

    gsap.fromTo(
      nextCard,
      { opacity: 0, y: 24, rotateX: -5 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.55,
        ease: 'power3.out',
        delay: 0.08,
        overwrite: true,
      }
    )

    activeRef.current = next
    setActiveIdx(next)
  }, [])

  // ── Mouse tilt ─────────────────────────────────────────────────────────────

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRefs.current[activeRef.current]
    if (!card) return
    const rect = card.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    gsap.to(card, {
      rotateY: dx * 12,
      rotateX: -dy * 7,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: true,
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRefs.current[activeRef.current]
    if (!card) return
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
      overwrite: true,
    })
  }, [])

  // ── GSAP animations ────────────────────────────────────────────────────────

  useGSAP(() => {
    if (!sectionRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.fromTo(
      labelRef.current,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      }
    )

    gsap.fromTo(
      showcaseRef.current,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
      }
    )

    entryRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.fromTo(
        el,
        { opacity: 0, x: -28 },
        {
          opacity: i === 0 ? 1 : 0.42,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
          delay: i * 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      )
    })

    entryRefs.current.forEach((el, i) => {
      if (!el) return
      ScrollTrigger.create({
        trigger:     el,
        start:       'top 58%',
        end:         'bottom 42%',
        onEnter:     () => switchTo(i),
        onEnterBack: () => switchTo(i),
      })
    })
  }, { scope: sectionRef, dependencies: [] })

  // Sync entry opacity with active index
  useGSAP(() => {
    entryRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.to(el, {
        opacity: i === activeIdx ? 1 : 0.42,
        duration: 0.3,
        ease: 'power2.out',
      })
    })
  }, { scope: sectionRef, dependencies: [activeIdx] })

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <section
      ref={sectionRef}
      className={styles.experience}
      data-theme="light"
      id="experience"
      aria-label="Deneyim"
    >
      <div className={styles.bgGrid} aria-hidden="true" />

      <div className={styles.inner}>
        <div ref={labelRef} className={styles.labelRow}>
          <span className={styles.labelText}>DENEYİM</span>
          <div className={styles.labelRule} aria-hidden="true" />
          <span className={styles.labelIdx}>04</span>
        </div>

        <div className={styles.body}>
          {/* LEFT: vertical timeline */}
          <div className={styles.timeline}>
            {EXPERIENCES.map((exp, i) => (
              <div
                key={exp.id}
                ref={el => { entryRefs.current[i] = el }}
                className={styles.entry}
                data-active={i === activeIdx ? 'true' : 'false'}
                onClick={() => switchTo(i)}
                role="button"
                tabIndex={0}
                aria-pressed={i === activeIdx}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') switchTo(i) }}
              >
                <div className={styles.entryMark} aria-hidden="true" />

                <div className={styles.entryTop}>
                  <span className={styles.entryId}>{exp.id}</span>
                  {exp.isCurrent && (
                    <span className={styles.badge}>
                      <span className={styles.badgeDot} aria-hidden="true" />
                      DEVAM EDİYOR
                    </span>
                  )}
                </div>

                <h2 className={styles.entryCompany}>{exp.company}</h2>
                <p className={styles.entryRole}>{exp.role}</p>

                <div className={styles.entryMeta}>
                  <span className={styles.entryPeriod}>{exp.period}</span>
                  <span className={styles.entryMetaDot} aria-hidden="true">·</span>
                  <span className={styles.entryLocation}>{exp.location}</span>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: sticky card showcase */}
          <div
            ref={showcaseRef}
            className={styles.showcase}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.cardStack}>
              {EXPERIENCES.map((exp, i) => (
                <div
                  key={exp.id}
                  ref={el => { cardRefs.current[i] = el }}
                  className={`${styles.card} ${exp.theme === 'metal' ? styles.card_metal : styles.card_code}`}
                  style={{ '--accent': exp.accent } as React.CSSProperties}
                  aria-hidden={i !== activeIdx}
                >
                  <div className={styles.cardBgGrid} aria-hidden="true" />
                  <div className={styles.cardGhostYear} aria-hidden="true">{exp.year}</div>

                  <div className={styles.cTL} aria-hidden="true" />
                  <div className={styles.cTR} aria-hidden="true" />
                  <div className={styles.cBL} aria-hidden="true" />
                  <div className={styles.cBR} aria-hidden="true" />

                  <div className={styles.cardContent}>
                    <div className={styles.cardTopRow}>
                      <span className={styles.cardId}>{exp.id} / 02</span>
                      <span className={styles.cardPeriod}>{exp.period}</span>
                    </div>

                    <div className={styles.cardEmblem} aria-hidden="true">
                      {exp.company.split(' ').map(w => w[0]).join('').slice(0, 3)}
                    </div>

                    <h3 className={styles.cardCompany}>{exp.company}</h3>
                    <p className={styles.cardRole}>{exp.role}</p>

                    <div className={styles.cardDivider} aria-hidden="true" />

                    <ul className={styles.cardHighlights}>
                      {exp.highlights.map(h => (
                        <li key={h} className={styles.cardHighlight}>
                          <span className={styles.cardBullet} aria-hidden="true" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className={styles.cardFooter}>
                      <div className={styles.cardTags}>
                        {exp.tags.map(t => (
                          <span key={t} className={styles.cardTag}>{t}</span>
                        ))}
                      </div>
                      <div className={styles.cardLocation}>
                        <span aria-hidden="true">◎</span>
                        {exp.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
