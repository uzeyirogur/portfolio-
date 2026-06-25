'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/scripts/gsap'
import styles from './Statement.module.scss'

const PILLARS = [
  {
    num: '01',
    title: ['Kurumsal', 'Yazılım'],
    body: '.NET ekosisteminde sıfırdan kurumsal sistemler. Katmanlı mimari, net sorumluluk, uzun vadeli bakım.',
    accent: '#CC1133',
    tag: 'BACKEND',
  },
  {
    num: '02',
    title: ['Görünür', 'Çıktı'],
    body: 'Demo değil, gerçek kullanıcılar için çalışan sistemler. Production\'a minimum sürtünme ile geçiş.',
    accent: '#C8960A',
    tag: 'DELIVERY',
  },
  {
    num: '03',
    title: ['Temiz', 'Kod'],
    body: 'SOLID prensipleri, DRY yapı, test edilebilir katmanlar. Bugün yazılan kod yarın da okunabilir.',
    accent: '#F0EDE6',
    tag: 'QUALITY',
  },
]

export default function Statement() {
  const sectionRef    = useRef<HTMLElement>(null)
  const panelRefs     = useRef<(HTMLDivElement | null)[]>(Array(PILLARS.length).fill(null))
  const currentPanel  = useRef(0)

  useGSAP(() => {
    if (!sectionRef.current) return

    // All panels except first start off-screen below
    panelRefs.current.forEach((p, i) => {
      if (!p || i === 0) return
      gsap.set(p, { yPercent: 100 })
    })

    const showPanel = (idx: number) => {
      if (idx === currentPanel.current) return
      const forward  = idx > currentPanel.current
      const entering = panelRefs.current[idx]
      const leaving  = panelRefs.current[currentPanel.current]
      if (!entering) return

      gsap.fromTo(entering,
        { yPercent: forward ? 100 : -15, opacity: forward ? 1 : 0 },
        { yPercent: 0, opacity: 1, duration: 0.85, ease: 'power3.inOut' }
      )
      if (leaving) {
        gsap.to(leaving, {
          yPercent: forward ? -15 : 100,
          opacity: forward ? 0 : 1,
          duration: 0.85,
          ease: 'power3.inOut',
        })
      }
      currentPanel.current = idx
    }

    // Section is 400vh; sticky sticks for 300vh (400-100).
    // Each panel gets 100vh → triggers at 25% and 50% of section height.
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: '25% top',
      onEnter:     () => showPanel(1),
      onLeaveBack: () => showPanel(0),
    })
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: '50% top',
      onEnter:     () => showPanel(2),
      onLeaveBack: () => showPanel(1),
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className={styles.statement}
      data-theme="dark"
      id="about"
      aria-label="Yaklaşım"
    >
      <div className={styles.sticky}>
        {PILLARS.map((p, i) => (
          <div
            key={p.num}
            ref={el => { panelRefs.current[i] = el }}
            className={styles.panel}
            style={{ '--accent': p.accent } as React.CSSProperties}
          >
            <div className={styles.panelGrid}>

              {/* ── Left: content ───────────────────── */}
              <div className={styles.left}>
                <div className={styles.topRow}>
                  <span className={styles.eyebrow}>YAKLAŞIM</span>
                  <div className={styles.rule} aria-hidden="true" />
                  <span className={styles.idx}>{p.num}</span>
                </div>

                <div className={styles.content}>
                  <span className={styles.tag}>{p.tag}</span>

                  <h2 className={styles.title}>
                    {p.title.map((line, j) => (
                      <span key={j} className={styles.titleLine}>{line}</span>
                    ))}
                  </h2>

                  <p className={styles.body}>{p.body}</p>
                </div>

                {/* Pillar dots nav */}
                <div className={styles.dots} aria-hidden="true">
                  {PILLARS.map((_, di) => (
                    <span
                      key={di}
                      className={`${styles.dot} ${di === i ? styles.dotActive : ''}`}
                    />
                  ))}
                </div>
              </div>

              {/* ── Right: huge number ──────────────── */}
              <div className={styles.right} aria-hidden="true">
                <span className={styles.numBig}>{p.num}</span>
                <div className={styles.accentLine} />
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
