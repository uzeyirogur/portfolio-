'use client'

import { useRef, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/scripts/gsap'
import styles from './Statement.module.scss'

const PILLARS = [
  {
    num: '01',
    title: 'Kurumsal\nYazılım',
    body: '.NET ekosisteminde sıfırdan kurumsal sistemler. Katmanlı mimari, net sorumluluk, uzun vadeli bakım.',
    accent: '#C8960A',
  },
  {
    num: '02',
    title: 'Görünür\nÇıktı',
    body: 'Demo değil, gerçek kullanıcılar için çalışan sistemler. Staging\'den production\'a minimum sürtünme.',
    accent: '#CC1133',
  },
  {
    num: '03',
    title: 'Temiz\nKod',
    body: 'SOLID prensipleri, DRY yapı, test edilebilir katmanlar. Bugün yazılan kod yarın da okunabilir.',
    accent: '#C8960A',
  },
]

export default function Statement() {
  const sectionRef  = useRef<HTMLElement>(null)
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([])

  // 3D tilt on mouse move
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const card = cardRefs.current[i]
    if (!card) return
    const rect   = card.getBoundingClientRect()
    const cx     = rect.left + rect.width  / 2
    const cy     = rect.top  + rect.height / 2
    const dx     = (e.clientX - cx) / (rect.width  / 2)   // -1 .. 1
    const dy     = (e.clientY - cy) / (rect.height / 2)   // -1 .. 1
    gsap.to(card, {
      rotateY:  dx * 14,
      rotateX: -dy * 10,
      scale:    1.03,
      duration: 0.35,
      ease:     'power2.out',
      transformPerspective: 900,
    })
  }, [])

  const onMouseLeave = useCallback((i: number) => {
    const card = cardRefs.current[i]
    if (!card) return
    gsap.to(card, {
      rotateY: 0, rotateX: 0, scale: 1,
      duration: 0.6, ease: 'elastic.out(1, 0.5)',
      transformPerspective: 900,
    })
  }, [])

  // Scroll reveal — cards fly in from 3D depth
  useGSAP(() => {
    if (!sectionRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cards = cardRefs.current.filter(Boolean)

    gsap.fromTo(cards,
      { opacity: 0, z: -160, rotateY: 25, scale: 0.88 },
      {
        opacity: 1, z: 0, rotateY: 0, scale: 1,
        duration: 0.9,
        stagger: 0.18,
        ease: 'power3.out',
        transformPerspective: 900,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          once: true,
        },
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className={styles.statement}
      data-theme="dark"
      id="about"
      aria-label="Yaklaşım"
    >
      <div className={styles.inner}>

        <div className={styles.topRow}>
          <span className={styles.eyebrow}>YAKLAŞIM</span>
          <div className={styles.rule} aria-hidden="true" />
          <span className={styles.idx}>02</span>
        </div>

        <div className={styles.grid}>
          {PILLARS.map((p, i) => (
            <div
              key={p.num}
              className={styles.cardWrap}
            >
              <div
                ref={el => { cardRefs.current[i] = el }}
                className={styles.card}
                onMouseMove={e => onMouseMove(e, i)}
                onMouseLeave={() => onMouseLeave(i)}
                style={{ '--card-accent': p.accent } as React.CSSProperties}
              >
                {/* Glowing top edge */}
                <div className={styles.cardGlow} aria-hidden="true" />

                <span className={styles.num}>{p.num}</span>
                <div className={styles.divider} aria-hidden="true" />

                <h2 className={styles.title}>
                  {p.title.split('\n').map((line, j) => (
                    <span key={j} className={styles.titleLine}>{line}</span>
                  ))}
                </h2>

                <p className={styles.body}>{p.body}</p>

                {/* 3D "depth" layer behind card */}
                <div className={styles.cardShadowLayer} aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
