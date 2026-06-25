'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/scripts/gsap'
import Image from 'next/image'
import { projects } from '@/data/projects'
import styles from './Work.module.scss'

const SLUG_ORDER = [
  'paramnet',
  'anka-sports',
  'gold-price-tracker',
  'vehicle-inventory',
  'ticket-system',
]

const DISPLAY_TITLES: Record<string, string> = {
  'paramnet':           'PARAMNET',
  'anka-sports':        'ANKA SPORTS',
  'gold-price-tracker': 'GOLD TRACKER',
  'vehicle-inventory':  'VEHICLE INVENTORY',
  'ticket-system':      'TICKET SYSTEM',
}

const VISUAL: Record<string, { accentVar: string; subtitle: string; category: string }> = {
  'paramnet':           { accentVar: '--accent-paramnet', subtitle: 'Kişisel Finans ve Gider Takip Platformu',   category: '.NET / PANO'      },
  'anka-sports':        { accentVar: '--accent-anka',     subtitle: 'Spor Akademisi Üye ve İçerik Yönetimi',    category: '.NET / KURUMSAL'  },
  'gold-price-tracker': { accentVar: '--accent-gold',     subtitle: 'Canlı Fiyat Çekme ve Karşılaştırma Panosu', category: '.NET / API / PANO' },
  'vehicle-inventory':  { accentVar: '--accent-vehicle',  subtitle: 'Filo ve Bakım Yönetim Sistemi',             category: '.NET / KURUMSAL'  },
  'ticket-system':      { accentVar: '--accent-ticket',   subtitle: 'N-Tier Kurumsal Destek Talep Sistemi',      category: '.NET / KURUMSAL'  },
}

const WORK_ITEMS = SLUG_ORDER.map((slug, i) => {
  const p = projects.find(pr => pr.slug === slug)!
  const v = VISUAL[slug]
  return {
    index:     String(i + 1).padStart(2, '0'),
    slug,
    title:     DISPLAY_TITLES[slug],
    subtitle:  v.subtitle,
    category:  v.category,
    stack:     p.technologies.slice(0, 4),
    image:     p.image,
    accentVar: v.accentVar,
    demoUrl:   p.demoUrl,
    githubUrl: p.githubUrl,
  }
})

const N = WORK_ITEMS.length


export default function Work() {
  const sectionRef   = useRef<HTMLElement>(null)
  const bgTextRef    = useRef<HTMLDivElement>(null)
  const counterRef   = useRef<HTMLSpanElement>(null)
  const titleCardRef = useRef<HTMLDivElement>(null)
  const carouselRef  = useRef<HTMLDivElement>(null)

  // Desktop: scatter cards
  const cardRefs       = useRef<(HTMLDivElement | null)[]>(Array(N).fill(null))
  // Mobile: poster + info inside scene
  const posterRefs     = useRef<(HTMLDivElement | null)[]>(Array(N).fill(null))
  const mobileInfoRefs = useRef<(HTMLDivElement | null)[]>(Array(N).fill(null))
  const sceneRefs      = useRef<(HTMLDivElement | null)[]>(Array(N).fill(null))
  const dotRefs        = useRef<(HTMLButtonElement | null)[]>(Array(N).fill(null))
  const titleLetterRefs = useRef<(HTMLSpanElement | null)[]>(Array(8).fill(null))


  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 769px)', () => {
      const CARD_OUT    = 0.20
      const CARD_IN     = 0.92
      const PROJ_START  = 0.20
      const PROJ_END    = 0.80
      const SEG         = (PROJ_END - PROJ_START) / N

      const ENTER_END   = 0.25
      const EXIT_START  = 0.62
      const SHOW_END    = 0.88

      // Letter spin constants
      const N_L         = 8
      const STAGGER     = 0.12   // total stagger spread across scroll
      const SPIN        = 0.09   // each letter's spin duration in scroll units

      const cl = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
      const lp = (a: number, b: number, t: number) => a + (b - a) * cl(t, 0, 1)

      if (titleCardRef.current) gsap.set(titleCardRef.current, { opacity: 1 })
      if (bgTextRef.current) gsap.set(bgTextRef.current, { opacity: 0, scale: 2.4, x: 0 })
      titleLetterRefs.current.forEach(l => { if (l) gsap.set(l, { rotationY: 0, opacity: 1 }) })

      cardRefs.current.forEach((card) => {
        if (!card) return
        gsap.set(card, { opacity: 0, rotationY: 70, x: '12%', z: -120, scale: 0.88, zIndex: 0 })
      })

      ScrollTrigger.create({
        id:      'work-pin',
        trigger: sectionRef.current,
        start:   'top top',
        end:     () => `+=${(N * 1.5 + 2) * window.innerHeight}`,
        pin:     true,
        invalidateOnRefresh: true,
        onUpdate(self) {
          const p = self.progress

          // ── Title card background ──
          if (titleCardRef.current) {
            let op = 0
            if (p <= 0.18)       op = 1
            else if (p <= 0.22)  op = 1 - (p - 0.18) / 0.04
            else if (p >= CARD_IN) op = (p - CARD_IN) / (1 - CARD_IN)
            titleCardRef.current.style.opacity = String(cl(op, 0, 1))
          }

          // ── PROJELER letters: stagger Y-rotation ──
          titleLetterRefs.current.forEach((letter, i) => {
            if (!letter) return
            let rotY: number, op: number

            if (p < CARD_OUT) {
              // Exit: letter 0 spins first, letter 7 last
              const start = (i / N_L) * STAGGER
              const end   = start + SPIN
              const t     = cl((p - start) / (end - start), 0, 1)
              rotY = t * 90
              op   = 1 - t
            } else if (p >= CARD_IN) {
              // Enter: letter 7 returns first, letter 0 last (reverse stagger)
              const ri    = N_L - 1 - i
              const rStart = CARD_IN + (ri / N_L) * 0.06
              const rEnd   = rStart + 0.055
              const t      = cl((p - rStart) / (rEnd - rStart), 0, 1)
              rotY = 90 * (1 - t)
              op   = t
            } else {
              rotY = 90
              op   = 0
            }

            gsap.to(letter, {
              rotationY: rotY,
              opacity:   op,
              duration:  0.18,
              ease:      'power2.inOut',
              overwrite: 'auto',
            })
          })

          if (bgTextRef.current) {
            let bgOp = 0, bgSc = 1.0, bgX = 0
            if (p < PROJ_START) {
              bgOp = (p / PROJ_START) * 0.12
              bgSc = lp(2.4, 1.0, p / PROJ_START)
              bgX  = 0
            } else if (p > PROJ_END) {
              bgOp = ((1 - p) / (1 - PROJ_END)) * 0.12
              bgX  = N * -150
            } else {
              bgOp = 0.12
              bgX  = ((p - PROJ_START) / SEG) * -150
            }
            gsap.to(bgTextRef.current, {
              opacity: bgOp, scale: bgSc, x: bgX,
              duration: p < PROJ_START ? 0.25 : 0.6,
              ease: 'none',
              overwrite: 'auto',
            })
          }

          if (p < PROJ_START || p > PROJ_END) {
            cardRefs.current.forEach(card => {
              if (card) gsap.to(card, { opacity: 0, duration: 0.3, overwrite: 'auto' })
            })
            return
          }

          const vi  = (p - PROJ_START) / SEG
          const idx = Math.min(Math.max(Math.floor(vi), 0), N - 1)
          if (counterRef.current) counterRef.current.textContent = `${WORK_ITEMS[idx].index} / 05`
          dotRefs.current.forEach((d, j) => d?.setAttribute('data-active', String(j === idx)))

          cardRefs.current.forEach((card, i) => {
            if (!card) return
            const segStart = PROJ_START + i * SEG
            const t = (p - segStart) / SEG

            let op: number, rotY: number, txPct: number, tz: number, sc: number

            if (t < 0) {
              op = 0; rotY = 70; txPct = 12; tz = -120; sc = 0.88
            } else if (t > 1) {
              op = 0; rotY = -70; txPct = -12; tz = -120; sc = 0.88
            } else if (t <= ENTER_END) {
              const e = t / ENTER_END
              op    = lp(0,    1.0,  e)
              rotY  = lp(70,   0,    e)
              txPct = lp(12,   0,    e)
              tz    = lp(-120, 0,    e)
              sc    = lp(0.88, 1.0,  e)
            } else if (t <= EXIT_START) {
              op = 1; rotY = 0; txPct = 0; tz = 0; sc = 1.0
            } else if (t <= SHOW_END) {
              const e = (t - EXIT_START) / (SHOW_END - EXIT_START)
              op    = lp(1.0,  0,    e)
              rotY  = lp(0,    -70,  e)
              txPct = lp(0,    -12,  e)
              tz    = lp(0,    -120, e)
              sc    = lp(1.0,  0.88, e)
            } else {
              op = 0; rotY = -70; txPct = -12; tz = -120; sc = 0.88
            }

            gsap.to(card, {
              opacity:   op,
              rotationY: rotY,
              x:         `${txPct}%`,
              z:         tz,
              scale:     sc,
              zIndex:    Math.round(op * 10),
              duration:  0.35,
              ease:      'power2.out',
              overwrite: 'auto',
            })
          })
        },
      })
    })

    mm.add('(max-width: 768px)', () => {
      if (titleCardRef.current) titleCardRef.current.style.display = 'none'

      sceneRefs.current.forEach((scene, i) => {
        if (!scene) return
        gsap.set(mobileInfoRefs.current[i],   { opacity: 0, y: 20 })
        gsap.set(posterRefs.current[i],       { opacity: 0, y: 28 })

        ScrollTrigger.create({
          trigger: scene,
          start:   'top 72%',
          once:    true,
          onEnter() {
            const tl = gsap.timeline()
            tl.to(posterRefs.current[i],     { opacity: 1, y: 0, duration: 0.6,  ease: 'power3.out' })
            tl.to(mobileInfoRefs.current[i], { opacity: 1, y: 0, duration: 0.52, ease: 'power3.out' }, '-=0.3')
          },
        })
      })
    })

    return () => mm.revert()
  }, { scope: sectionRef })

  const handleDotClick = (index: number) => {
    const st = ScrollTrigger.getById('work-pin')
    if (!st) return
    const target = (st.start as number) + index * window.innerHeight
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      className={styles.work}
      data-theme="light"
      id="work"
      aria-label="Projeler"
    >
      {/* Letter grid background */}
      <div className={styles.bgClip} aria-hidden="true">
        <div ref={bgTextRef} className={styles.bgText}>
          {Array.from({ length: 10 }, (_, row) => (
            <div key={row} className={`${styles.bgRow} ${styles[`bgShift${row % 4}` as keyof typeof styles]}`}>
              {Array.from({ length: 14 }, (_, col) => (
                <span key={col} className={styles.bgWord}>
                  {'PROJECT'[(col + row) % 7]}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Title card */}
      <div ref={titleCardRef} className={styles.titleCard} aria-hidden="true">
        <div className={styles.titlePillOuter}>
          <div className={styles.titlePill}>
            {'PROJELER'.split('').map((c, i) => (
              <span key={i} ref={el => { titleLetterRefs.current[i] = el }}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Project panel cards (desktop) ── */}
      <div className={styles.carouselWrap} aria-hidden="true">
        <div ref={carouselRef} className={styles.carousel}>
          {WORK_ITEMS.map((item, i) => (
            <div
              key={item.slug}
              ref={el => { cardRefs.current[i] = el }}
              className={styles.carouselCard}
              style={{ '--project-accent': `var(${item.accentVar})` } as React.CSSProperties}
            >
              <div className={styles.projectPanel}>
                {/* Left: project info */}
                <div className={styles.panelInfo}>
                  <span className={styles.panelMeta}>{item.index} — {item.category}</span>
                  <div className={styles.panelRule} />
                  <h2 className={styles.panelTitle}>{item.title}</h2>
                  <p className={styles.panelDesc}>{item.subtitle}</p>
                  <div className={styles.panelStack}>
                    {item.stack.map(t => <span key={t} className={styles.panelTag}>{t}</span>)}
                  </div>
                  {(item.demoUrl || item.githubUrl) && (
                    <a
                      href={item.demoUrl || item.githubUrl}
                      className={styles.panelLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.demoUrl ? '→ PROJEYİ KEŞFET' : '→ GITHUB\'DA GÖR'}
                    </a>
                  )}
                </div>
                {/* Right: browser mockup screenshot */}
                <div className={styles.panelScreen}>
                  <div className={styles.browser} style={{ '--project-accent': `var(${item.accentVar})` } as React.CSSProperties}>
                    <div className={styles.browserChrome}>
                      <div className={styles.browserDots}><span /><span /><span /></div>
                      <div className={styles.browserUrl} />
                    </div>
                    <div className={styles.browserScreen}>
                      <Image
                        src={item.image}
                        alt={`${item.title} ekran görüntüsü`}
                        width={1200}
                        height={675}
                        className={styles.screenshot}
                        priority={i === 0}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Inner: header + mobile layout + nav ── */}
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.headerLabel}>Projeler</span>
          <span ref={counterRef} className={styles.counter} aria-live="polite">01 / 05</span>
        </div>

        {/* Mobile only: poster + info per project */}
        <div className={styles.stage}>
          {WORK_ITEMS.map((item, i) => (
            <div
              key={item.slug}
              ref={el => { sceneRefs.current[i] = el }}
              className={styles.scene}
              style={{ '--project-accent': `var(${item.accentVar})` } as React.CSSProperties}
              aria-hidden={i !== 0}
            >
              <div ref={el => { posterRefs.current[i] = el }} className={styles.posterMobile}>
                <div className={styles.browser} style={{ '--project-accent': `var(${item.accentVar})` } as React.CSSProperties}>
                  <div className={styles.browserChrome}>
                    <div className={styles.browserDots}><span /><span /><span /></div>
                    <div className={styles.browserUrl} />
                  </div>
                  <div className={styles.browserScreen}>
                    <Image
                      src={item.image}
                      alt={`${item.title} ekran görüntüsü`}
                      width={1200}
                      height={675}
                      className={styles.screenshot}
                      priority={i === 0}
                    />
                  </div>
                </div>
              </div>

              <div ref={el => { mobileInfoRefs.current[i] = el }} className={styles.mobileInfo}>
                <div className={styles.rule} />
                <h2 className={styles.title}>{item.title}</h2>
                <div className={styles.projectMeta}>{item.index}&nbsp;—&nbsp;{item.category}</div>
                <p className={styles.subtitle}>{item.subtitle}</p>
                <div className={styles.stack}>
                  {item.stack.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                </div>
                {(item.demoUrl || item.githubUrl) && (
                  <a href={item.demoUrl || item.githubUrl} className={styles.link} target="_blank" rel="noopener noreferrer">
                    {item.demoUrl ? '→ PROJEYİ KEŞFET' : '→ GITHUB\'DA GÖR'}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <nav className={styles.nav} aria-label="Proje navigasyonu">
          {WORK_ITEMS.map((item, i) => (
            <button
              key={item.slug}
              ref={el => { dotRefs.current[i] = el }}
              className={styles.dot}
              data-active={i === 0 ? 'true' : 'false'}
              onClick={() => handleDotClick(i)}
              aria-label={`${item.title} projesini görüntüle`}
            />
          ))}
        </nav>
      </div>
    </section>
  )
}
