'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from '@/scripts/gsap'
import styles from './Nav.module.scss'

type NavTheme = 'dark' | 'light' | 'grey'

const LINKS = [
  { label: 'PROJELER',  href: '#work' },
  { label: 'YETKİNLİK', href: '#stack' },
  { label: 'HAKKIMDA',  href: '#about' },
  { label: 'İLETİŞİM',  href: '#contact' },
]

const MAGNET_RADIUS = 72   // px — how close before magnet kicks in
const MAGNET_PULL   = 0.38 // 0..1 — how much it pulls

function getThemeClass(theme: NavTheme): string {
  if (theme === 'light') return styles.navLight
  if (theme === 'grey')  return styles.navGrey
  return styles.navDark
}

export default function Nav() {
  const [scrolled, setScrolled]     = useState(false)
  const [theme, setTheme]           = useState<NavTheme>('dark')
  const [mobileOpen, setMobileOpen] = useState(false)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  // ── Magnetic nav links ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const onMove = (e: MouseEvent) => {
      linkRefs.current.forEach(el => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const cx   = rect.left + rect.width  / 2
        const cy   = rect.top  + rect.height / 2
        const dx   = e.clientX - cx
        const dy   = e.clientY - cy
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < MAGNET_RADIUS) {
          const pull = (1 - dist / MAGNET_RADIUS) * MAGNET_PULL
          gsap.to(el, {
            x: dx * pull,
            y: dy * pull,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        } else {
          gsap.to(el, {
            x: 0, y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.4)',
            overwrite: 'auto',
          })
        }
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // ── Scroll detection ───────────────────────────────────────────────────────
  useEffect(() => {
    let rafId: number
    const detect = () => {
      setScrolled(window.scrollY > 50)
      const sections = document.querySelectorAll<HTMLElement>('[data-theme]')
      for (const section of sections) {
        const { top, bottom } = section.getBoundingClientRect()
        if (top <= 64 && bottom > 0) {
          setTheme((section.dataset.theme as NavTheme) || 'dark')
          return
        }
      }
    }
    const onScroll = () => { cancelAnimationFrame(rafId); rafId = requestAnimationFrame(detect) }
    window.addEventListener('scroll', onScroll, { passive: true })
    detect()
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafId) }
  }, [])

  // ── Mobile scroll lock ─────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMobile() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeMobile])

  const navClass = [styles.nav, getThemeClass(theme), scrolled ? styles.navScrolled : ''].filter(Boolean).join(' ')
  const hamClass = [styles.hamburger, mobileOpen ? styles.hamburgerOpen : ''].filter(Boolean).join(' ')

  return (
    <>
      <header className={navClass} aria-label="Site navigation">
        <div className={styles.inner}>
          <a href="#" className={styles.logo} aria-label="Üzeyir Öğür — back to top">ÜZO</a>

          <nav className={styles.links} aria-label="Primary">
            {LINKS.map(({ label, href }, i) => (
              <a
                key={label}
                href={href}
                ref={el => { linkRefs.current[i] = el }}
                className={styles.link}
              >
                {label}
              </a>
            ))}
          </nav>

          <button
            className={hamClass}
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <span aria-hidden="true" /><span aria-hidden="true" />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div id="mobile-nav" className={styles.overlay} role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <nav className={styles.overlayLinks}>
            {LINKS.map(({ label, href }) => (
              <a key={label} href={href} className={styles.overlayLink} onClick={closeMobile}>{label}</a>
            ))}
          </nav>
          <p className={styles.overlayFooter}>ISTANBUL, TR</p>
        </div>
      )}
    </>
  )
}
