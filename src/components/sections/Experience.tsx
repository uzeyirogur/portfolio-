'use client'

import { motion } from 'framer-motion'
import { experiences } from '@/data/experiences'
import { education } from '@/data/education'

const E = [0.16, 1, 0.3, 1] as const

export default function Experience() {
  return (
    <section id="experience" className="section-y" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="container-xl">
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label" style={{ display: 'block', marginBottom: '3rem' }}
        >
          // Çalışma Geçmişi
        </motion.p>

        <div style={{ maxWidth: '44rem', display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: E }}
            >
              {/* Log header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase' }}>
                  DEPLOY LOG #{String(i + 1).padStart(2, '0')}
                </span>
                <div style={{ flex: 1, height: 1, backgroundColor: 'rgba(232,0,58,0.15)' }} />
              </div>

              {/* Company + role */}
              <div style={{ marginBottom: '1.25rem' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', fontWeight: 800, color: 'var(--text-1)', margin: 0, letterSpacing: '-0.02em' }}>
                  {exp.company}
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-2)', margin: '0.35rem 0 0' }}>
                  {exp.role}
                </p>
              </div>

              {/* Meta row */}
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-3)' }}>
                  {exp.startDate} – {exp.endDate}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ position: 'relative', display: 'inline-flex', width: 6, height: 6 }}>
                    {exp.isCurrent && (
                      <span className="animate-ping" style={{ position: 'absolute', inset: 0, borderRadius: '50%', backgroundColor: '#34D399', opacity: 0.5 }} />
                    )}
                    <span style={{ position: 'relative', width: 6, height: 6, borderRadius: '50%', backgroundColor: exp.isCurrent ? '#34D399' : 'var(--text-3)' }} />
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: exp.isCurrent ? '#34D399' : 'var(--text-3)' }}>
                    {exp.isCurrent ? 'ACTIVE' : 'COMPLETED'}
                  </span>
                </div>
              </div>

              {/* Highlights */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.25rem' }}>
                {exp.highlights.map((h, j) => (
                  <div key={j} style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#34D399', flexShrink: 0 }}>[✓]</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-2)', lineHeight: 1.6 }}>{h}</span>
                  </div>
                ))}
              </div>

              {/* Stack */}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.9rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-3)' }}>
                  Stack: {exp.technologies.join(' · ')}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: E }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.2em', color: 'var(--text-3)', textTransform: 'uppercase' }}>
                EDUCATION LOG
              </span>
              <div style={{ flex: 1, height: 1, backgroundColor: 'var(--border)' }} />
            </div>

            {education.map((edu, i) => (
              <div key={edu.institution} style={{ marginBottom: i < education.length - 1 ? '1.5rem' : 0 }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2vw, 1.4rem)', fontWeight: 800, color: 'var(--text-1)', margin: 0, letterSpacing: '-0.02em' }}>
                  {edu.institution}
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-2)', margin: '0.3rem 0 0.2rem' }}>
                  {edu.degree} — {edu.field}
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-3)', margin: 0 }}>
                  {edu.startYear} – {edu.endYear} · Mezun
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
