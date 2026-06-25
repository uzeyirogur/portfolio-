'use client'

import { useRef, useState, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/scripts/gsap'
import styles from './Stack.module.scss'

const STACK = [
  {
    id: '01',
    category: 'RUNTIME',
    label: 'Çalışma Zamanı',
    techs: ['ASP.NET Core 8', 'C# 12', '.NET 8', 'Background Services', 'Middleware'],
    accent: '#7FBA00',
  },
  {
    id: '02',
    category: 'WEB LAYER',
    label: 'Web Katmanı',
    techs: ['MVC', 'Web API', 'Razor Pages', 'JWT Auth', 'AutoMapper', 'N-Tier'],
    accent: '#4A90D9',
  },
  {
    id: '03',
    category: 'DATA',
    label: 'Veri Katmanı',
    techs: ['SQL Server', 'SQLite', 'EF Core', 'LINQ', 'T-SQL'],
    accent: '#C89B3C',
  },
  {
    id: '04',
    category: 'FRONTEND',
    label: 'Arayüz',
    techs: ['HTML5', 'CSS3 / SCSS', 'JavaScript', 'Bootstrap 5', 'Chart.js', 'DataTables'],
    accent: '#E07B35',
  },
  {
    id: '05',
    category: 'TOOLCHAIN',
    label: 'Araç Zinciri',
    techs: ['Git', 'GitHub', 'Visual Studio', 'VS Code', 'Postman', 'IIS'],
    accent: '#9B59B6',
  },
]

export default function Stack() {
  const sectionRef  = useRef<HTMLElement>(null)
  const labelRowRef = useRef<HTMLDivElement>(null)
  const panelRef    = useRef<HTMLDivElement>(null)
  const rowsRef     = useRef<(HTMLDivElement | null)[]>(Array(STACK.length).fill(null))

  const [activeIdx, setActiveIdx] = useState(0)

  const handleModuleClick = useCallback((idx: number) => {
    if (idx === activeIdx) return
    const newRow = rowsRef.current[idx]
    if (newRow) {
      const tags = newRow.querySelectorAll(`.${styles.tag}`)
      gsap.fromTo(
        tags,
        { opacity: 0, x: -8 },
        { opacity: 1, x: 0, duration: 0.32, stagger: 0.045, ease: 'power2.out' }
      )
    }
    setActiveIdx(idx)
  }, [activeIdx])

  useGSAP(() => {
    if (!sectionRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 72%',
        once: true,
      },
    })

    tl.fromTo(labelRowRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
      0
    )

    tl.fromTo(panelRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      0.2
    )

    rowsRef.current.forEach((row, i) => {
      if (!row) return
      tl.fromTo(row,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' },
        0.35 + i * 0.08
      )
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className={styles.stack}
      data-theme="grey"
      id="stack"
      aria-label="Teknoloji Yetkinliği"
    >
      <div className={styles.inner}>

        {/* Label row */}
        <div ref={labelRowRef} className={styles.labelRow}>
          <span className={styles.label}>YETKİNLİK MATRİSİ</span>
          <div className={styles.labelRule} aria-hidden="true" />
          <span className={styles.labelIndex}>03</span>
        </div>

        {/* System terminal panel */}
        <div ref={panelRef} className={styles.terminal}>

          {/* Terminal chrome header */}
          <div className={styles.termChrome} aria-hidden="true">
            <div className={styles.termDots}>
              <span className={styles.termDot} />
              <span className={styles.termDot} />
              <span className={styles.termDot} />
            </div>
            <span className={styles.termTitle}>STACK_MANIFEST.cfg</span>
            <span className={styles.termStatus}>● OPERASYONEL</span>
          </div>

          {/* Module rows */}
          <div className={styles.modules}>
            {STACK.map((item, i) => (
              <div
                key={item.id}
                ref={el => { rowsRef.current[i] = el }}
                className={`${styles.module} ${i === activeIdx ? styles.moduleActive : ''}`}
                style={{ '--accent': item.accent } as React.CSSProperties}
                onClick={() => handleModuleClick(i)}
                role="button"
                tabIndex={0}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleModuleClick(i)}
                aria-pressed={i === activeIdx}
              >
                {/* Left: module meta */}
                <div className={styles.moduleMeta}>
                  <span className={styles.moduleIndex} aria-hidden="true">{item.id}</span>
                  <div className={styles.moduleNames}>
                    <span className={styles.moduleCategory}>{item.category}</span>
                    <span className={styles.moduleLabel}>{item.label}</span>
                  </div>
                  <div className={styles.moduleBar} aria-hidden="true">
                    <div className={styles.moduleBarFill} />
                  </div>
                </div>

                {/* Right: tech tags */}
                <ul className={styles.tags} aria-label={`${item.label} teknolojileri`}>
                  {item.techs.map(tech => (
                    <li key={tech} className={styles.tag}>{tech}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Terminal footer */}
          <div className={styles.termFooter} aria-hidden="true">
            <span className={styles.termCmd}>
              {'>'} AKTİF: {STACK[activeIdx].label.toUpperCase()} — {STACK[activeIdx].techs.length} TEKNOLOJİ
            </span>
            <span className={styles.termCursor} />
          </div>

        </div>

      </div>
    </section>
  )
}
