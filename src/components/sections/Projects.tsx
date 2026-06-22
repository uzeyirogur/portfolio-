'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MOCKUPS } from '@/components/ui/ProjectMockup'
import { projects } from '@/data/projects'

const E = [0.16, 1, 0.3, 1] as const

const DISPLAY_PROJECTS = projects.filter((p) => p.status !== 'Fikir')

const PROJECT_META: Record<string, { category: string; stack: string; accent: string }> = {
  paramnet:           { category: 'Finance Dashboard',     stack: '.NET / SQL / EF Core',  accent: '#22D3EE' },
  'anka-sports':      { category: 'Management System',     stack: 'ASP.NET Core / MVC',    accent: '#818CF8' },
  'gold-price-tracker': { category: 'Data Dashboard',      stack: 'Web API / Scraper',     accent: '#F59E0B' },
  'vehicle-inventory':  { category: 'Operations Tool',     stack: 'EF Core / SQL Server',  accent: '#34D399' },
  'ticket-system':      { category: 'Support System',      stack: '.NET 8 / JWT / N-Tier', accent: '#60A5FA' },
}

export default function Projects() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${e.clientX + 16}px, ${e.clientY - 30}px)`
    }
  }

  return (
    <section
      id="projects"
      className="section-y"
      style={{ backgroundColor: 'var(--bg)' }}
      onMouseMove={handleMouseMove}
    >
      {/* Custom cursor label for project hover */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9000,
          pointerEvents: 'none',
          opacity: hoveredIdx !== null && openIdx === null ? 1 : 0,
          transition: 'opacity 0.15s',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.58rem',
          color: 'var(--accent)',
          letterSpacing: '0.1em',
          backgroundColor: 'rgba(8,8,8,0.85)',
          padding: '0.3rem 0.6rem',
          border: '1px solid var(--border)',
          borderRadius: 3,
          whiteSpace: 'nowrap',
          willChange: 'transform',
        }}
      >
        EXPAND →
      </div>

      <div className="container-xl">
        {/* Section header */}
        <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-label"
            style={{ display: 'block', marginBottom: '1.25rem' }}
          >
            // Selected Systems
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: E }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.85rem, 1.4vw, 0.95rem)',
              color: 'var(--text-3)',
              maxWidth: '38rem',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            .NET, SQL ve AI destekli geliştirme süreçleriyle inşa edilmiş dashboardlar, yönetim panelleri ve iş odaklı sistemler.
          </motion.p>
        </div>

        {/* Project list */}
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {DISPLAY_PROJECTS.map((project, idx) => {
            const meta = PROJECT_META[project.slug] ?? { category: project.category[0] ?? '', stack: project.technologies.slice(0, 3).join(' / '), accent: '#22D3EE' }
            const isOpen = openIdx === idx
            const Mockup = MOCKUPS[project.slug]
            const num = String(idx + 1).padStart(2, '0')

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07, ease: E }}
              >
                {/* Row */}
                <div
                  className={`project-row${isOpen ? ' active' : ''}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'clamp(1rem, 3vw, 2.5rem)',
                      padding: 'clamp(1rem, 2.5vw, 1.5rem) 1rem',
                      transition: 'opacity 0.2s',
                      opacity: openIdx !== null && !isOpen ? 0.35 : 1,
                    }}
                  >
                    {/* Number */}
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        color: isOpen ? meta.accent : 'var(--text-3)',
                        flexShrink: 0,
                        minWidth: '1.8rem',
                        transition: 'color 0.2s',
                      }}
                    >
                      {num}
                    </span>

                    {/* Project name */}
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.25rem, 3.5vw, 2.75rem)',
                        fontWeight: 800,
                        color: isOpen ? meta.accent : 'var(--text-1)',
                        letterSpacing: '-0.02em',
                        lineHeight: 1,
                        flex: 1,
                        transition: 'color 0.2s',
                      }}
                    >
                      {project.title}
                    </span>

                    {/* Spacer line */}
                    <div
                      style={{
                        flex: 1,
                        height: 1,
                        backgroundColor: 'var(--border)',
                        maxWidth: 'clamp(2rem, 10vw, 8rem)',
                        display: 'none',
                      }}
                      className="hidden md:block"
                    />

                    {/* Category */}
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: 'var(--text-3)',
                        letterSpacing: '0.1em',
                        flexShrink: 0,
                        display: 'none',
                      }}
                      className="hidden sm:inline"
                    >
                      {meta.category}
                    </span>

                    {/* Stack */}
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        color: 'var(--text-3)',
                        flexShrink: 0,
                        display: 'none',
                      }}
                      className="hidden lg:inline"
                    >
                      {meta.stack}
                    </span>

                    {/* Arrow */}
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: isOpen ? meta.accent : 'var(--text-3)',
                        flexShrink: 0,
                        transition: 'color 0.2s, transform 0.3s',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                        display: 'inline-block',
                      }}
                    >
                      →
                    </span>
                  </div>
                </div>

                {/* Expand panel */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: E }}
                      style={{ overflow: 'hidden', borderBottom: '1px solid var(--border)' }}
                    >
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))',
                          gap: 'clamp(1.5rem, 4vw, 3rem)',
                          padding: 'clamp(1.5rem, 4vw, 2.5rem) 1rem',
                          backgroundColor: 'rgba(255,255,255,0.012)',
                        }}
                      >
                        {/* Info col */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                          <div>
                            <div
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                padding: '0.2rem 0.55rem',
                                border: `1px solid ${meta.accent}30`,
                                borderRadius: 3,
                                marginBottom: '0.75rem',
                              }}
                            >
                              <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: meta.accent, flexShrink: 0 }} />
                              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: meta.accent, letterSpacing: '0.1em' }}>
                                {project.status}
                              </span>
                            </div>
                            <p
                              style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '0.9rem',
                                color: 'var(--text-2)',
                                lineHeight: 1.7,
                                margin: 0,
                              }}
                            >
                              {project.longDescription ?? project.description}
                            </p>
                          </div>

                          {/* Features */}
                          <div>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.57rem', letterSpacing: '0.18em', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                              Özellikler
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                              {project.features.slice(0, 5).map((f, fi) => (
                                <div key={fi} style={{ display: 'flex', gap: '0.55rem', alignItems: 'flex-start' }}>
                                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: meta.accent, flexShrink: 0, marginTop: '0.05rem' }}>[✓]</span>
                                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-2)', lineHeight: 1.5 }}>{f}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tech tags */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                            {project.technologies.map((t) => (
                              <span
                                key={t}
                                style={{
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '0.6rem',
                                  color: 'var(--text-3)',
                                  padding: '0.2rem 0.5rem',
                                  border: '1px solid var(--border)',
                                  borderRadius: 3,
                                  letterSpacing: '0.05em',
                                }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          {/* Links */}
                          <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.5rem' }}>
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', textDecoration: 'none', letterSpacing: '0.08em' }}
                              >
                                GitHub →
                              </a>
                            )}
                            {project.demoUrl && (
                              <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-2)', textDecoration: 'none', letterSpacing: '0.08em' }}
                              >
                                Demo →
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Mockup col */}
                        {Mockup && (
                          <div
                            style={{
                              backgroundColor: 'var(--bg-elevated)',
                              border: `1px solid ${meta.accent}18`,
                              borderRadius: 8,
                              overflow: 'hidden',
                              minHeight: 260,
                              maxHeight: 320,
                              boxShadow: `0 0 40px ${meta.accent}08`,
                            }}
                          >
                            <Mockup />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
