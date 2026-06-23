'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Hakkımda', href: '#about' },
  { label: 'Projeler', href: '#projects' },
  { label: 'Beceriler', href: '#skills' },
  { label: 'Deneyim', href: '#experience' },
  { label: 'İletişim', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['about', 'projects', 'skills', 'experience', 'contact']
    const observers = ids.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          backgroundColor: scrolled ? 'rgba(248,248,248,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: 'background-color 0.3s, border-color 0.3s',
        }}
      >
        <div
          style={{
            maxWidth: '88rem',
            margin: '0 auto',
            padding: '0 clamp(1.5rem, 4vw, 3.5rem)',
            height: '3.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Monogram logo */}
          <a
            href="#home"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              fontWeight: 800,
              color: 'var(--text-1)',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            ÜÖ
          </a>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="hidden lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.href.slice(1)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.63rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--accent)' : 'var(--text-2)',
                    textDecoration: 'none',
                    transition: 'color 0.15s',
                    position: 'relative',
                    paddingBottom: '2px',
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--text-1)' }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--text-2)' }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: -1,
                        left: 0,
                        right: 0,
                        height: 1,
                        backgroundColor: 'var(--accent)',
                      }}
                    />
                  )}
                </a>
              )
            })}
          </nav>

          {/* Mobile burger */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: 3,
              padding: '0.35rem 0.55rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: 18,
                  height: 1.5,
                  backgroundColor: 'var(--text-2)',
                  transition: 'transform 0.2s, opacity 0.2s',
                  transformOrigin: 'center',
                  transform: mobileOpen
                    ? i === 0 ? 'rotate(45deg) translate(3.5px, 3.5px)'
                      : i === 2 ? 'rotate(-45deg) translate(3.5px, -3.5px)'
                      : 'scaleX(0)'
                    : 'none',
                  opacity: mobileOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              borderTop: '1px solid var(--border)',
              backgroundColor: 'rgba(248,248,248,0.97)',
              backdropFilter: 'blur(16px)',
              padding: '1.25rem clamp(1.5rem, 4vw, 3.5rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: activeId === link.href.slice(1) ? 'var(--accent)' : 'var(--text-2)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </motion.header>
    </>
  )
}
