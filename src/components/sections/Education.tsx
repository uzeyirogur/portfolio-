'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react'
import { education } from '@/data/education'

const ease = [0.16, 1, 0.3, 1] as const

export default function Education() {
  return (
    <section
      id="education"
      className="relative section-y overflow-hidden"
      style={{ backgroundColor: 'var(--bg-surface)' }}
    >
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom right, rgba(129,140,248,0.04) 0%, transparent 65%)' }}
      />

      <div className="container-xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-14"
        >
          <span className="section-label mb-4 block">
            <span className="accent-line" /> 05 &mdash; Education
          </span>
          <div className="overflow-hidden">
            <motion.h2
              className="heading-lg"
              style={{ color: 'var(--text-1)' }}
              initial={{ y: '100%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease }}
            >
              Akademik{' '}
              <span className="gradient-text-cyan">Geçmiş</span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="max-w-2xl space-y-4">
          {education.map((edu, i) => (
            <motion.div
              key={`${edu.institution}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="glass-card group p-6"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    color: 'var(--accent)',
                    backgroundColor: 'var(--accent-dim)',
                    border: '1px solid rgba(34,211,238,0.15)',
                  }}
                >
                  <GraduationCap size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <h3 className="text-base font-black" style={{ color: 'var(--text-1)' }}>{edu.institution}</h3>
                    <div
                      className="flex items-center gap-1.5 text-xs"
                      style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}
                    >
                      <Calendar size={11} /><span>{edu.startYear} — {edu.endYear}</span>
                    </div>
                  </div>
                  <p className="text-sm font-semibold mb-3" style={{ color: 'var(--accent)' }}>
                    {edu.degree} · {edu.field}
                  </p>
                  {edu.description && (
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-2)' }}>
                      {edu.description}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-2">
                    {edu.showGpa && edu.gpa && (
                      <div
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
                        style={{
                          backgroundColor: 'rgba(34,211,238,0.06)',
                          border: '1px solid rgba(34,211,238,0.18)',
                        }}
                      >
                        <Award size={12} style={{ color: 'var(--accent)' }} />
                        <span className="text-xs font-bold" style={{ color: 'var(--accent)' }}>GPA: {edu.gpa.toFixed(2)}</span>
                      </div>
                    )}
                    {edu.highlights?.map((h) => (
                      <span
                        key={h}
                        className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg"
                        style={{
                          color: 'var(--text-3)',
                          backgroundColor: 'var(--bg-elevated)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        <BookOpen size={10} /> {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
