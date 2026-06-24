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
  'anka-sports':        'ANKA SPOR',
  'gold-price-tracker': 'ALTIN TAKİP',
  'vehicle-inventory':  'ARAÇ ENVANTERİ',
  'ticket-system':      'DESTEK SİSTEMİ',
}

const VISUAL: Record<string, {
  accentVar: string
  subtitle: string
  category: string
}> = {
  'paramnet': {
    accentVar: '--accent-paramnet',
    subtitle: 'Kişisel Finans ve Gider Takip Platformu',
    category: '.NET / PANO',
  },
  'anka-sports': {
    accentVar: '--accent-anka',
    subtitle: 'Spor Akademisi Üye ve İçerik Yönetimi',
    category: '.NET / KURUMSAL',
  },
  'gold-price-tracker': {
    accentVar: '--accent-gold',
    subtitle: 'Canlı Fiyat Çekme ve Karşılaştırma Panosu',
    category: '.NET / API / PANO',
  },
  'vehicle-inventory': {
    accentVar: '--accent-vehicle',
    subtitle: 'Filo ve Bakım Yönetim Sistemi',
    category: '.NET / KURUMSAL',
  },
  'ticket-system': {
    accentVar: '--accent-ticket',
    subtitle: 'N-Tier Kurumsal Destek Talep Sistemi',
    category: '.NET / KURUMSAL',
  },
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

  const titleRefs  = useRef<(HTMLHeadingElement | null)[]>(Array(N).fill(null))
  const ruleRefs   = useRef<(HTMLDivElement | null)[]>(Array(N).fill(null))
  const posterRefs = useRef<(HTMLDivElement | null)[]>(Array(N).fill(null))
  const detailRefs = useRef<(HTMLDivElement | null)[]>(Array(N).fill(null))
  const sceneRefs  = useRef<(HTMLDivElement | null)[]>(Array(N).fill(null))
  const dotRefs    = useRef<(HTMLButtonElement | null)[]>(Array(N).fill(null))

  const activeIndexRef  = useRef(0)
  const sectionTopRef   = useRef(0)
  const transitionTlRef = useRef<gsap.core.Timeline | null>(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 769px)', () => {
      // First project visible at rest; all others hidden off-right
      WORK_ITEMS.forEach((_, i) => {
        const first = i === 0
        gsap.set(titleRefs.current[i],  { clipPath: first ? 'inset(0% 0 0% 0)' : 'inset(100% 0 0 0)' })
        gsap.set(ruleRefs.current[i],   { scaleX: first ? 1 : 0, transformOrigin: 'left center' })
        gsap.set(posterRefs.current[i], {
          opacity:              first ? 1 : 0,
          x:                    first ? 0 : 80,
          y:                    first ? 0 : 24,
          scale:                first ? 1 : 0.92,
          rotationY:            first ? 2 : 10,
          transformPerspective: 1000,
        })
        gsap.set(detailRefs.current[i], { opacity: first ? 1 : 0, y: first ? 0 : 14 })
      })

      if (titleCardRef.current) {
        titleCardRef.current.style.transform = 'translateY(0)'
      }
      // bgText starts zoomed OUT — will zoom in as title card slides up
      if (bgTextRef.current) {
        gsap.set(bgTextRef.current, { transformOrigin: 'center center', scale: 0.38 })
      }

      sectionTopRef.current =
        (sectionRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY

      // Project slide transition — LEFT/RIGHT (not zoom)
      const runTransition = (from: number, to: number, dir: number) => {
        transitionTlRef.current?.kill()
        const tl = gsap.timeline()
        transitionTlRef.current = tl

        tl.to(titleRefs.current[from], {
          clipPath: dir > 0 ? 'inset(100% 0 0 0)' : 'inset(0 0 100% 0)',
          duration: 0.36, ease: 'power2.in',
        }, 0)
        tl.to(ruleRefs.current[from], {
          scaleX: 0, transformOrigin: dir > 0 ? 'right center' : 'left center',
          duration: 0.26, ease: 'power2.in',
        }, 0)
        tl.to(posterRefs.current[from], {
          opacity: 0, x: dir > 0 ? -70 : 70, y: -20,
          scale: 0.84, rotationY: dir > 0 ? -18 : 18,
          duration: 0.38, ease: 'power2.in',
        }, 0)
        tl.to(detailRefs.current[from], {
          opacity: 0, y: dir > 0 ? -12 : 12,
          duration: 0.24, ease: 'power2.in',
        }, 0)

        tl.set(titleRefs.current[to], {
          clipPath: dir > 0 ? 'inset(0 0 100% 0)' : 'inset(100% 0 0 0)',
        }, 0.22)
        tl.set(posterRefs.current[to], {
          x: dir > 0 ? 110 : -110, y: 24,
          opacity: 0, scale: 0.88, rotationY: dir > 0 ? 20 : -20,
        }, 0.22)

        tl.to(ruleRefs.current[to], {
          scaleX: 1, transformOrigin: 'left center',
          duration: 0.44, ease: 'power2.out',
        }, 0.28)
        tl.to(titleRefs.current[to], {
          clipPath: 'inset(0% 0 0% 0)',
          duration: 0.54, ease: 'power3.out',
        }, 0.3)
        tl.to(posterRefs.current[to], {
          opacity: 1, x: 0, y: 0, scale: 1, rotationY: 2,
          duration: 0.74, ease: 'power3.out',
        }, 0.3)
        tl.to(detailRefs.current[to], {
          opacity: 1, y: 0,
          duration: 0.4, ease: 'power2.out',
        }, 0.46)

        if (counterRef.current) {
          counterRef.current.textContent = `${WORK_ITEMS[to].index} / 05`
        }
        dotRefs.current.forEach((d, i) =>
          d?.setAttribute('data-active', String(i === to))
        )
      }

      ScrollTrigger.create({
        id:      'work-pin',
        trigger: sectionRef.current,
        start:   'top top',
        end:     () => `+=${N * window.innerHeight}`,
        pin:     true,
        scrub:   0.6,
        invalidateOnRefresh: true,
        onUpdate(self) {
          const p = self.progress

          // Title card: slide UP on entry (0→16%), slide DOWN on exit (84→100%)
          if (titleCardRef.current) {
            let ty = -200
            if (p <= 0.16)  ty = -(p / 0.16) * 100
            else if (p >= 0.84) ty = -((1 - p) / 0.16) * 100
            titleCardRef.current.style.transform = `translateY(${ty}vh)`
          }

          // bgText: ZOOM IN on entry (0.38→1.0), hold at 1.0, ZOOM OUT on exit (1.0→0.38)
          // This creates "flying into the PROJECT letters" effect
          if (bgTextRef.current) {
            let bgScale = 1.0
            if (p <= 0.16)       bgScale = 0.38 + (p / 0.16) * 0.62
            else if (p >= 0.84)  bgScale = 0.38 + ((1 - p) / 0.16) * 0.62
            bgTextRef.current.style.transform = `translateY(${-(p * 6)}%) scale(${bgScale})`
          }

          const newIdx = Math.min(Math.floor(p * N), N - 1)
          if (newIdx !== activeIndexRef.current) {
            runTransition(
              activeIndexRef.current,
              newIdx,
              newIdx > activeIndexRef.current ? 1 : -1
            )
            activeIndexRef.current = newIdx
          }
        },
        onRefresh() {
          sectionTopRef.current =
            (sectionRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY
        },
      })
    })

    mm.add('(max-width: 768px)', () => {
      if (titleCardRef.current) titleCardRef.current.style.display = 'none'

      sceneRefs.current.forEach((scene, i) => {
        if (!scene) return
        gsap.set(titleRefs.current[i],  { clipPath: 'inset(100% 0 0 0)' })
        gsap.set(ruleRefs.current[i],   { scaleX: 0, transformOrigin: 'left center' })
        gsap.set(posterRefs.current[i], { opacity: 0, y: 28 })
        gsap.set(detailRefs.current[i], { opacity: 0, y: 16 })

        ScrollTrigger.create({
          trigger: scene,
          start:   'top 72%',
          once:    true,
          onEnter() {
            const tl = gsap.timeline()
            tl.to(posterRefs.current[i], { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
            tl.to(ruleRefs.current[i],   { scaleX: 1, duration: 0.4, ease: 'power2.out' }, '-=0.3')
            tl.to(titleRefs.current[i],  { clipPath: 'inset(0% 0 0% 0)', duration: 0.52, ease: 'power3.out' }, '-=0.25')
            tl.to(detailRefs.current[i], { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
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
      {/* Background letter grid — huge crimson rows, matching reference structure */}
      <div ref={bgTextRef} className={styles.bgText} aria-hidden="true">
        {['P','R','O','J','E','C','T','P','R','O','J','E'].map((letter, row) => (
          <div
            key={row}
            className={`${styles.bgRow} ${styles[`bgShift${row % 4}` as keyof typeof styles]}`}
          >
            {Array.from({ length: 6 }, (_, j) => (
              <span key={j} className={styles.bgWord}>{letter}</span>
            ))}
          </div>
        ))}
      </div>

      {/* Title card — light bg, dark pill + outer ring, slides up on scroll */}
      <div ref={titleCardRef} className={styles.titleCard} aria-hidden="true">
        <div className={styles.titlePillOuter}>
          <div className={styles.titlePill}>
            {'PROJELER'.split('').map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.inner}>

        {/* Section header */}
        <div className={styles.header}>
          <span className={styles.headerLabel}>Projeler</span>
          <span ref={counterRef} className={styles.counter} aria-live="polite">
            01 / 05
          </span>
        </div>

        {/* Stage — all scenes stacked, GSAP manages visibility */}
        <div className={styles.stage}>
          {WORK_ITEMS.map((item, i) => (
            <div
              key={item.slug}
              ref={el => { sceneRefs.current[i] = el }}
              className={styles.scene}
              style={{ '--project-accent': `var(${item.accentVar})` } as React.CSSProperties}
              aria-hidden={i !== 0}
            >
              {/* Left: project info */}
              <div className={styles.info}>
                <span className={styles.sceneNum} aria-hidden="true">{item.index}</span>

                <div ref={el => { ruleRefs.current[i] = el }} className={styles.rule} aria-hidden="true" />
                <h2 ref={el => { titleRefs.current[i] = el }} className={styles.title}>
                  {item.title}
                </h2>
                <div ref={el => { detailRefs.current[i] = el }} className={styles.details}>
                  <div className={styles.projectMeta}>
                    {item.index}&nbsp;—&nbsp;{item.category}
                  </div>
                  <p className={styles.subtitle}>{item.subtitle}</p>
                  <div className={styles.stack}>
                    {item.stack.map(t => (
                      <span key={t} className={styles.tag}>{t}</span>
                    ))}
                  </div>
                  {(item.demoUrl || item.githubUrl) && (
                    <a
                      href={item.demoUrl || item.githubUrl}
                      className={styles.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-label={item.demoUrl ? 'ZİYARET ET' : 'GITHUB'}
                    >
                      {item.demoUrl ? '→ PROJEYİ KEŞFET' : '→ GITHUB\'DA GÖR'}
                    </a>
                  )}
                </div>
              </div>

              {/* Right: browser chrome mockup */}
              <div ref={el => { posterRefs.current[i] = el }} className={styles.poster}>
                <div
                  className={styles.browser}
                  style={{ '--project-accent': `var(${item.accentVar})` } as React.CSSProperties}
                >
                  <div className={styles.browserChrome}>
                    <div className={styles.browserDots}>
                      <span /><span /><span />
                    </div>
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
          ))}
        </div>

        {/* Dot navigation */}
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
