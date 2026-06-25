'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/scripts/gsap'
import styles from './Stack.module.scss'

const ROWS = [
  {
    id: 'backend',
    dir: 1 as const,
    speed: 32,
    items: ['.NET CORE 8', 'ASP.NET', 'C# 12', 'WEB API', 'MVC', 'JWT AUTH', 'BACKGROUND SERVICES', 'N-TIER MİMARİ'],
  },
  {
    id: 'ml',
    dir: -1 as const,
    speed: 26,
    items: ['MACHINE LEARNING', 'DEEP LEARNING', 'OPENCV', 'LLM', 'NLP', 'PYTHON', 'NEURAL NETWORKS', 'COMPUTER VISION'],
  },
  {
    id: 'data',
    dir: 1 as const,
    speed: 29,
    items: ['SQL SERVER', 'ENTITY FRAMEWORK CORE', 'LINQ', 'T-SQL', 'SQLITE', 'REST API', 'MIDDLEWARE', 'BACKGROUND SERVICES'],
  },
  {
    id: 'frontend',
    dir: -1 as const,
    speed: 22,
    items: ['JAVASCRIPT', 'SCSS / CSS3', 'HTML5', 'CHART.JS', 'REACT', 'GIT', 'SWAGGER', 'POSTMAN'],
  },
]

export default function Stack() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)
  const rowRefs    = useRef<(HTMLDivElement | null)[]>(Array(ROWS.length).fill(null))

  useGSAP(() => {
    if (!sectionRef.current) return

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      )
    }

    rowRefs.current.forEach((row, i) => {
      if (!row) return
      const { dir, speed } = ROWS[i]

      const tween = dir === 1
        ? gsap.fromTo(row, { xPercent: 0 },   { xPercent: -50, duration: speed, ease: 'none', repeat: -1 })
        : gsap.fromTo(row, { xPercent: -50 }, { xPercent: 0,   duration: speed, ease: 'none', repeat: -1 })

      const wrapper = row.parentElement
      if (wrapper) {
        wrapper.addEventListener('mouseenter', () => tween.timeScale(0.2))
        wrapper.addEventListener('mouseleave', () => tween.timeScale(1))
      }
    })
  }, { scope: sectionRef })

  const CATEGORY_LABELS = ['BACKEND', 'ML / AI', 'VERİ', 'ARAYÜZ']

  return (
    <section
      ref={sectionRef}
      className={styles.stack}
      data-theme="grey"
      id="stack"
      aria-label="Teknoloji Yetkinliği"
    >
      <div ref={headerRef} className={styles.header}>
        <div className={styles.labelRow}>
          <span className={styles.label}>YETKİNLİK</span>
          <div className={styles.rule} aria-hidden="true" />
          <span className={styles.idx}>03</span>
        </div>
      </div>

      <div className={styles.rows} aria-label="Teknoloji yetkinlikleri">
        {ROWS.map((row, i) => (
          <div key={row.id} className={styles.rowWrap}>
            <div
              ref={el => { rowRefs.current[i] = el }}
              className={styles.row}
            >
              {[...row.items, ...row.items].map((item, j) => (
                <span
                  key={j}
                  className={`${styles.item} ${j % 4 === 2 ? styles.itemOutline : ''}`}
                >
                  {item}
                  <span className={styles.sep} aria-hidden="true">·</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.catRow} aria-hidden="true">
        {CATEGORY_LABELS.map((cat, i) => (
          <span key={cat} className={styles.catLabel}>
            {i > 0 && <span className={styles.catSep}>·</span>}
            {cat}
          </span>
        ))}
      </div>
    </section>
  )
}
