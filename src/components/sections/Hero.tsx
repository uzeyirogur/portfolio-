'use client'

import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { profile } from '@/data/profile'

const ASCIIField = dynamic(() => import('@/components/ui/ASCIIField'), { ssr: false })

const E = [0.16, 1, 0.3, 1] as const

const TICKER_ITEMS = 'ASP.NET CORE · C# · SQL SERVER · ENTITY FRAMEWORK · NEXT.JS · REACT · WEB API · JWT · CLEAN ARCH · EF CORE · TYPESCRIPT · TAILWIND · '

function Ticker({ reverse = false }: { reverse?: boolean }) {
  const doubled = TICKER_ITEMS + TICKER_ITEMS
  return (
    <div
      style={{
        overflow: 'hidden',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '0.55rem 0',
        backgroundColor: 'transparent',
        position: 'relative',
        zIndex: 20,
        flexShrink: 0,
      }}
    >
      <div
        className={reverse ? 'ticker-right' : 'ticker-left'}
        style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}
      >
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: 'var(--text-3)',
              letterSpacing: '0.12em',
              paddingRight: '2rem',
            }}
          >
            {doubled}
          </span>
        ))}
      </div>
    </div>
  )
}

function IntroOverlay() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const seen = sessionStorage.getItem('portfolio-v4-intro')
    if (!seen) {
      setVisible(true)
      sessionStorage.setItem('portfolio-v4-intro', '1')
      const t = setTimeout(() => setVisible(false), 1400)
      return () => clearTimeout(t)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          onClick={() => setVisible(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'var(--bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.4, times: [0, 0.15, 0.85, 1] }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--accent)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            $ RUN PORTFOLIO
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
            >
              _
            </motion.span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Hero() {
  return (
    <>
      <IntroOverlay />

      <section
        id="home"
        style={{
          position: 'relative',
          height: '100dvh',
          minHeight: '600px',
          overflow: 'hidden',
          backgroundColor: 'var(--bg)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top ticker */}
        <Ticker />

        {/* Main canvas area */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {/* ASCII Field — full viewport, mouse-reactive identity */}
          <ASCIIField />

          {/* Vignette for readability */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse 65% 55% at 50% 50%, transparent 25%, rgba(248,248,248,0.55) 100%)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to right, rgba(248,248,248,0.55) 0%, transparent 30%, transparent 70%, rgba(248,248,248,0.55) 100%)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {/* Content layer */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 10,
              padding: 'clamp(1.5rem, 3.5vw, 2.75rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* TOP: first name + info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <motion.h1
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: E }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 12vw, 14rem)',
                  fontWeight: 800,
                  color: 'var(--text-1)',
                  margin: 0,
                  lineHeight: 0.85,
                  letterSpacing: '-0.04em',
                  textTransform: 'uppercase',
                  userSelect: 'none',
                }}
              >
                ÜZEYİR
              </motion.h1>

              {/* Info — top right */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: E }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  alignItems: 'flex-end',
                  paddingTop: '0.5rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.3rem 0.6rem',
                    border: '1px solid rgba(34,197,94,0.28)',
                    borderRadius: 3,
                    backgroundColor: 'rgba(34,197,94,0.07)',
                  }}
                >
                  <span style={{ position: 'relative', display: 'inline-flex', width: 7, height: 7, flexShrink: 0 }}>
                    <span
                      className="animate-ping"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        backgroundColor: '#22C55E',
                        opacity: 0.5,
                      }}
                    />
                    <span style={{ position: 'relative', width: 7, height: 7, borderRadius: '50%', backgroundColor: '#22C55E' }} />
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: '#22C55E', letterSpacing: '0.1em' }}>
                    Open to work
                  </span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.67rem', color: 'var(--text-2)', textAlign: 'right' }}>
                  Computer Engineer
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.67rem', color: 'var(--text-2)', textAlign: 'right' }}>
                  Full Stack .NET Developer
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-3)', textAlign: 'right' }}>
                  İstanbul · Turkey
                </span>
              </motion.div>
            </div>

            {/* BOTTOM: CTAs + last name */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              {/* CTAs — bottom left */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7, ease: E }}
                style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingBottom: '0.35rem' }}
              >
                {[
                  { label: 'projeler_gör()', href: '#projects' },
                  { label: 'iletişime_geç()', href: '#contact' },
                  { label: 'cv_indir()', href: profile.cvUrl, download: true },
                ].map((cta) => (
                  <a
                    key={cta.label}
                    href={cta.href}
                    {...(cta.download ? { download: true } : {})}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'clamp(0.62rem, 1.1vw, 0.75rem)',
                      color: 'var(--accent)',
                      textDecoration: 'none',
                      letterSpacing: '0.06em',
                      opacity: 0.7,
                      transition: 'opacity 0.15s, letter-spacing 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.letterSpacing = '0.1em' }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.letterSpacing = '0.06em' }}
                  >
                    {'> '}{cta.label}
                  </a>
                ))}
              </motion.div>

              {/* Last name — bottom right, MASSIVE */}
              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: E }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(5rem, 27vw, 32rem)',
                  fontWeight: 800,
                  color: 'var(--text-1)',
                  margin: 0,
                  lineHeight: 0.8,
                  letterSpacing: '-0.04em',
                  textTransform: 'uppercase',
                  textAlign: 'right',
                  userSelect: 'none',
                }}
              >
                ÖĞÜR
              </motion.h1>
            </div>
          </div>
        </div>

        {/* Bottom ticker */}
        <Ticker reverse />
      </section>
    </>
  )
}
