'use client'

import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/scripts/gsap'
import Image from 'next/image'
import styles from './ProjectsWodniackArchive.module.scss'

// ── Archive data ──────────────────────────────────────────────────────────────
const ITEMS = [
  {
    slug:        'paramnet',
    index:       '01',
    title:       'ParamNet',
    type:        'Finance Dashboard',
    archiveCode: '#fin-0001/05',
    stackShort:  '.NET · SQL · AI Workflow',
    description: 'Gelir, gider, borç, varlık, taksit ve çoklu para birimi değerlerini takip etmek için geliştirilen kişisel finans platformu.',
    tech:        ['ASP.NET Core', 'Entity Framework Core', 'SQL Server', 'SQLite'],
    image:       '/images/projects/paramnet.png',
    demo:        '',
    github:      '',
  },
  {
    slug:        'anka-sports',
    index:       '02',
    title:       'Anka Sports School',
    type:        'Management System',
    archiveCode: '#ops-0002/05',
    stackShort:  'ASP.NET Core · SQL Server',
    description: 'Veli, öğrenci, üyelik, aidat ve ödeme takibi için geliştirilen spor okulu yönetim sistemi.',
    tech:        ['ASP.NET Core MVC', 'Web API', 'Entity Framework Core', 'SQL Server'],
    image:       '/images/projects/anka-sports.png',
    demo:        'https://ankavm.com',
    github:      '',
  },
  {
    slug:        'gold-price-tracker',
    index:       '03',
    title:       'Genç Altın Tracker',
    type:        'Data Dashboard',
    archiveCode: '#dat-0003/05',
    stackShort:  'Web API · Chart · Automation',
    description: 'Firma ve ürün bazlı altın fiyatlarını takip etmek, filtrelemek ve grafiklerle karşılaştırmak için geliştirilen dashboard sistemi.',
    tech:        ['ASP.NET Core', 'Background Service', 'SQLite', 'Chart.js'],
    image:       '/images/projects/gold-tracker.png',
    demo:        '',
    github:      '',
  },
  {
    slug:        'vehicle-inventory',
    index:       '04',
    title:       'Vehicle Inventory System',
    type:        'Operations Tool',
    archiveCode: '#veh-0004/05',
    stackShort:  'EF Core · SQL Server',
    description: 'Araç, sürücü, sefer, bakım, kilometre ve operasyonel süreçleri takip etmek için geliştirilen iç yönetim sistemi.',
    tech:        ['ASP.NET Core MVC', 'Entity Framework Core', 'SQL Server'],
    image:       '/images/projects/vehicle-inventory.png',
    demo:        '',
    github:      '',
  },
  {
    slug:        'ticket-system',
    index:       '05',
    title:       'Ticket System',
    type:        'Support System',
    archiveCode: '#sup-0005/05',
    stackShort:  'Dashboard · Workflow',
    description: 'Kurumsal destek taleplerini, öncelikleri ve çözüm durumlarını takip etmek için geliştirilen ticket yönetim sistemi.',
    tech:        ['ASP.NET Core 8', 'Entity Framework Core', 'SQLite', 'JWT', 'AutoMapper'],
    image:       '/images/projects/ticket-system.png',
    demo:        '',
    github:      'https://github.com/uzeyirogur/Ticket-System',
  },
]

// ── Component ─────────────────────────────────────────────────────────────────
export default function ProjectsWodniackArchive() {
  const sectionRef  = useRef<HTMLElement>(null)
  const previewRef  = useRef<HTMLDivElement>(null)
  const headRef     = useRef<HTMLDivElement>(null)
  const rowRefs     = useRef<(HTMLDivElement | null)[]>(Array(ITEMS.length).fill(null))
  const expandRefs  = useRef<(HTMLDivElement | null)[]>(Array(ITEMS.length).fill(null))
  const isDesktop   = useRef(false)

  const [activeSlug, setActiveSlug] = useState<string | null>(null)

  // ── Cursor preview mouse tracking (desktop only) ───────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return
    isDesktop.current = window.matchMedia('(min-width: 769px)').matches
    if (!isDesktop.current) return

    const preview = previewRef.current
    if (!preview) return

    gsap.set(preview, { x: -400, y: -400, scale: 0.9, opacity: 0 })

    const setX = gsap.quickSetter(preview, 'x', 'px') as (v: number) => void
    const setY = gsap.quickSetter(preview, 'y', 'px') as (v: number) => void

    const onMove = (e: MouseEvent) => {
      setX(e.clientX + 28)
      setY(e.clientY - 80)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // ── Scroll reveal + expand init ────────────────────────────────────────────
  useGSAP(() => {
    // Always set expand panels hidden
    expandRefs.current.forEach(el => {
      if (el) gsap.set(el, { height: 0, opacity: 0 })
    })

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Header
    if (headRef.current) {
      gsap.from(headRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 82%', once: true },
      })
    }

    // Rows stagger
    rowRefs.current.forEach((row, i) => {
      if (!row) return
      gsap.from(row, {
        opacity: 0,
        y: 22,
        duration: 0.65,
        ease: 'power3.out',
        delay: i * 0.06,
        scrollTrigger: { trigger: row, start: 'top 88%', once: true },
      })
    })
  }, { scope: sectionRef })

  // ── Hover preview show/hide ────────────────────────────────────────────────
  const handleRowEnter = (image: string) => {
    if (!isDesktop.current) return
    const preview = previewRef.current
    if (!preview) return
    preview.style.backgroundImage = `url(${image})`
    gsap.to(preview, { opacity: 1, scale: 1, duration: 0.28, ease: 'power2.out' })
  }

  const handleRowLeave = () => {
    if (!isDesktop.current) return
    gsap.to(previewRef.current, { opacity: 0, scale: 0.92, duration: 0.22, ease: 'power2.in' })
  }

  // ── Expand / collapse ──────────────────────────────────────────────────────
  const handleToggle = (slug: string, idx: number) => {
    const panel = expandRefs.current[idx]
    if (!panel) return

    if (activeSlug === slug) {
      gsap.to(panel, { height: 0, opacity: 0, duration: 0.42, ease: 'power3.inOut' })
      rowRefs.current.forEach(r => r && gsap.to(r, { opacity: 1, duration: 0.3 }))
      setActiveSlug(null)
    } else {
      // Close previous panel
      if (activeSlug !== null) {
        const prevIdx = ITEMS.findIndex(it => it.slug === activeSlug)
        const prev = expandRefs.current[prevIdx]
        if (prev) gsap.to(prev, { height: 0, opacity: 0, duration: 0.32, ease: 'power3.in' })
      }
      // Open new panel
      gsap.to(panel, { height: 'auto', opacity: 1, duration: 0.55, ease: 'power3.out' })
      // Dim other rows
      rowRefs.current.forEach((r, i) => {
        if (!r) return
        gsap.to(r, { opacity: i === idx ? 1 : 0.32, duration: 0.3 })
      })
      setActiveSlug(slug)
    }
  }

  return (
    <section ref={sectionRef} className={styles.archive} id="work" aria-label="Selected Systems">
      <div className={styles.inner}>

        {/* Top binary texture */}
        <div className={styles.binaryBar} aria-hidden="true">
          <span>GET /api/systems HTTP/1.1 · 200 OK · Content-Type: application/json · 5 entries</span>
          <span>1 0 0 1 · 1 0 1 0 · 0 1 1 1 · 0 1 0 0 · 1 1 0 0 · 1 0 1 1 · 0 0 1 0 · 1 1 0 1</span>
        </div>

        {/* Section header */}
        <div ref={headRef} className={styles.sectionHead}>
          <div className={styles.headTitle}>
            <span>SELECTED</span>
            <span>SYSTEMS</span>
          </div>
          <div className={styles.headMeta}>
            <span className={styles.headCounter}>005 / systems</span>
            <span className={styles.headYear}>2024—2025</span>
          </div>
        </div>

        {/* Top divider */}
        <div className={styles.divider} aria-hidden="true" />

        {/* Project list */}
        <div className={styles.projectList}>
          {ITEMS.map((item, i) => (
            <article key={item.slug} className={styles.projectEntry}>

              {/* Clickable row */}
              <div
                ref={el => { rowRefs.current[i] = el }}
                className={styles.rowMain}
                role="button"
                tabIndex={0}
                aria-expanded={activeSlug === item.slug}
                onClick={() => handleToggle(item.slug, i)}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleToggle(item.slug, i)}
                onMouseEnter={() => handleRowEnter(item.image)}
                onMouseLeave={handleRowLeave}
              >
                <span className={styles.rowNum} aria-hidden="true">{item.index}</span>

                <div className={styles.rowCenter}>
                  <h3 className={styles.rowTitle}>{item.title}</h3>
                  <span className={styles.rowType}>{item.type}</span>
                </div>

                <div className={styles.rowRight}>
                  <span className={styles.rowCode}>{item.archiveCode}</span>
                  <span className={styles.rowStack}>{item.stackShort}</span>
                </div>

                <span
                  className={styles.rowToggle}
                  style={{ color: activeSlug === item.slug ? '#CC1133' : undefined }}
                  aria-hidden="true"
                >
                  {activeSlug === item.slug ? '×' : '+'}
                </span>
              </div>

              {/* Expand panel */}
              <div
                ref={el => { expandRefs.current[i] = el }}
                className={styles.expandPanel}
                aria-hidden={activeSlug !== item.slug}
              >
                <div className={styles.expandInner}>
                  <div className={styles.expandLeft}>
                    <p className={styles.expandDesc}>{item.description}</p>
                    <div className={styles.expandTech}>
                      {item.tech.map(t => (
                        <span key={t} className={styles.expandTag}>{t}</span>
                      ))}
                    </div>
                    {(item.demo || item.github) && (
                      <div className={styles.expandLinks}>
                        {item.demo && (
                          <a
                            href={item.demo}
                            className={styles.expandLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            → DEMO
                          </a>
                        )}
                        {item.github && (
                          <a
                            href={item.github}
                            className={styles.expandLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            → GITHUB
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <div className={styles.expandImgWrap}>
                    <Image
                      src={item.image}
                      alt={`${item.title} ekran görüntüsü`}
                      width={800}
                      height={450}
                      className={styles.expandImg}
                    />
                  </div>
                </div>
              </div>

            </article>
          ))}
        </div>

        {/* Bottom binary texture */}
        <div className={styles.binaryBottom} aria-hidden="true">
          <span>SELECT * FROM [dbo].[Systems] ORDER BY index ASC</span>
          <span>// 005 systems compiled · build: OK · deploy: production · env: live</span>
        </div>

      </div>

      {/* Cursor preview — desktop only, follows mouse */}
      <div ref={previewRef} className={styles.cursorPreview} aria-hidden="true" />
    </section>
  )
}
