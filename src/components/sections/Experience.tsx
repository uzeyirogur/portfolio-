'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/scripts/gsap'
import styles from './Experience.module.scss'

const EXPERIENCE = [
  {
    id:       '01',
    company:  'GMR GENÇ METAL RAFİNERİ',
    role:     'Bilgisayar Mühendisi · Full Stack .NET Geliştirici',
    period:   'OCA 2026 — DEVAM',
    location: 'İSTANBUL, TR',
    isCurrent: true,
    highlights: [
      'Kurumsal .NET uygulama geliştirme',
      'ASP.NET Core MVC ve Web API mimarisi',
      'Entity Framework Core + SQL Server veri katmanı',
      'Yönetim paneli ve admin dashboard geliştirme',
      'İç araç ve süreç otomasyon sistemleri',
    ],
  },
  {
    id:       '02',
    company:  'WEB BEYAZ',
    role:     'Yazılım Mühendisi Stajyeri',
    period:   'AĞU 2025 — OCA 2026',
    location: 'SAMSUN, TR',
    isCurrent: false,
    highlights: [
      'ASP.NET Core web uygulama geliştirme',
      'Veritabanı tabanlı yönetim panelleri',
      'Entity Framework Core operasyonları',
      'Dashboard arayüz ekranları',
      'Git ve GitHub ile versiyon kontrolü',
    ],
  },
]

export default function Experience() {
  const sectionRef  = useRef<HTMLElement>(null)
  const labelRowRef = useRef<HTMLDivElement>(null)
  const entriesRef  = useRef<(HTMLDivElement | null)[]>(Array(EXPERIENCE.length).fill(null))

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

    entriesRef.current.forEach((entry, i) => {
      if (!entry) return
      tl.fromTo(entry,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
        0.2 + i * 0.18
      )
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className={styles.experience}
      data-theme="light"
      id="experience"
      aria-label="Experience"
    >
      <div className={styles.inner}>

        {/* Label row */}
        <div ref={labelRowRef} className={styles.labelRow}>
          <span className={styles.label}>DENEYİM</span>
          <div className={styles.labelRule} aria-hidden="true" />
          <span className={styles.labelIndex}>04</span>
        </div>

        {/* Experience entries */}
        <div className={styles.entries}>
          {EXPERIENCE.map((exp, i) => (
            <div
              key={exp.id}
              ref={el => { entriesRef.current[i] = el }}
              className={styles.entry}
            >
              {/* Entry header: company name + period */}
              <div className={styles.entryHeader}>
                <div className={styles.entryTop}>
                  <span className={styles.entryIndex}>{exp.id}</span>
                  {exp.isCurrent && (
                    <span className={styles.currentBadge} aria-label="Devam eden pozisyon">
                      <span className="pulse-dot" aria-hidden="true" />
                      DEVAM EDİYOR
                    </span>
                  )}
                </div>

                <h2 className={styles.company}>{exp.company}</h2>

                <div className={styles.entryMeta}>
                  <span className={styles.role}>{exp.role}</span>
                  <span className={styles.metaSep} aria-hidden="true" />
                  <span className={styles.period}>{exp.period}</span>
                  <span className={styles.location}>{exp.location}</span>
                </div>
              </div>

              {/* Highlights */}
              <ul className={styles.highlights} aria-label="Temel katkılar">
                {exp.highlights.map(h => (
                  <li key={h} className={styles.highlight}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
