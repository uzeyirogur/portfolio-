'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './Nav.module.scss'

type NavTheme = 'dark' | 'light' | 'grey'

const LINKS = [
  { label: 'PROJELER',  href: '#work' },
  { label: 'YETKİNLİK', href: '#stack' },
  { label: 'HAKKIMDA',  href: '#about' },
  { label: 'İLETİŞİM',  href: '#contact' },
]

function getThemeClass(theme: NavTheme): string {
  if (theme === 'light') return styles.navLight
  if (theme === 'grey')  return styles.navGrey
  return styles.navDark
}

export default function Nav() {
  const [scrolled, setScrolled]       = useState(false)
  const [theme, setTheme]             = useState<NavTheme>('dark')
  const [mobileOpen, setMobileOpen]   = useState(false)

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  // ── Scroll detection: border visibility + section theme ──────────────────
  useEffect(() => {
    let rafId: number

    const detect = () => {
      setScrolled(window.scrollY > 50)

      // Find which section the nav bar (top 64px) is currently sitting over
      const sections = document.querySelectorAll<HTMLElement>('[data-theme]')
      for (const section of sections) {
        const { top, bottom } = section.getBoundingClientRect()
        if (top <= 64 && bottom > 0) {
          const t = (section.dataset.theme as NavTheme) || 'dark'
          setTheme(t)
          return
        }
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(detect)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    detect() // run once on mount
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // ── Mobile: body scroll lock + ESC key ───────────────────────────────────
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobile()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeMobile])

  const navClass = [
    styles.nav,
    getThemeClass(theme),
    scrolled ? styles.navScrolled : '',
  ].filter(Boolean).join(' ')

  const hamClass = [
    styles.hamburger,
    mobileOpen ? styles.hamburgerOpen : '',
  ].filter(Boolean).join(' ')

  return (
    <>
      {/* ── Fixed header bar ── */}
      <header className={navClass} aria-label="Site navigation">
        <div className={styles.inner}>
          {/* Logomark */}
          <a href="#" className={styles.logo} aria-label="Üzeyir Öğür — back to top">
            ÜZO
          </a>

          {/* Desktop links */}
          <nav className={styles.links} aria-label="Primary">
            {LINKS.map(({ label, href }) => (
              <a key={label} href={href} className={styles.link}>
                {label}
              </a>
            ))}
          </nav>

          {/* Hamburger — mobile only */}
          <button
            className={hamClass}
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            data-cursor-label={mobileOpen ? 'CLOSE' : 'MENU'}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* ── Mobile fullscreen overlay ── */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav className={styles.overlayLinks}>
            {LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={styles.overlayLink}
                onClick={closeMobile}
              >
                {label}
              </a>
            ))}
          </nav>
          <p className={styles.overlayFooter}>ISTANBUL, TR</p>
        </div>
      )}
    </>
  )
}
