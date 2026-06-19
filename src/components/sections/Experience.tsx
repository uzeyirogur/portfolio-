'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, CheckCircle2, Building2, Zap } from 'lucide-react'
import { experiences } from '@/data/experiences'

const ease = [0.16, 1, 0.3, 1] as const

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative section-y overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(34,211,238,0.03) 0%, transparent 65%)' }}
      />

      <div className="container-xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-16"
        >
          <span className="section-label mb-4 block">
            <span className="accent-line" /> 04 &mdash; Experience
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
              Çalışma{' '}
              <span className="gradient-text-cyan">Geçmişim</span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl">
          {experiences.map((exp, idx) => (
            <motion.div
              key={`${exp.company}-${idx}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease }}
              className="relative flex gap-6 pb-2"
            >
              {/* Connector line */}
              {idx < experiences.length - 1 && (
                <div
                  className="absolute left-5 top-14 bottom-0 w-px"
                  style={{ background: 'linear-gradient(to bottom, rgba(34,211,238,0.2), transparent)' }}
                />
              )}

              {/* Icon */}
              <div className="flex-shrink-0 flex flex-col items-center pt-1">
                <div
                  className="relative w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300"
                  style={exp.isCurrent ? {
                    backgroundColor: 'rgba(34,211,238,0.08)',
                    borderColor: 'rgba(34,211,238,0.3)',
                    boxShadow: '0 0 20px rgba(34,211,238,0.12)',
                  } : {
                    backgroundColor: 'var(--bg-elevated)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <Building2
                    size={18}
                    style={{ color: exp.isCurrent ? 'var(--accent)' : 'var(--text-3)' }}
                  />
                  {exp.isCurrent && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ backgroundColor: 'var(--accent)' }} />
                      <span className="relative inline-flex h-3 w-3 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                    </span>
                  )}
                </div>
              </div>

              {/* Card */}
              <div className="flex-1 pb-12">
                <div className="glass-card p-6 group">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-black" style={{ color: 'var(--text-1)' }}>{exp.role}</h3>
                        {exp.isCurrent && (
                          <span
                            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                            style={{
                              color: 'var(--accent)',
                              backgroundColor: 'rgba(34,211,238,0.08)',
                              border: '1px solid rgba(34,211,238,0.2)',
                            }}
                          >
                            <Zap size={9} /> Aktif
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-bold" style={{ color: 'var(--accent)' }}>
                        {exp.companyShort ?? exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1.5 sm:items-end flex-shrink-0">
                      <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-3)' }}>
                        <Calendar size={11} />
                        <span style={{ fontFamily: 'var(--font-mono)' }}>{exp.startDate} — {exp.endDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-3)' }}>
                        <MapPin size={11} /><span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm leading-[1.85] mb-5" style={{ color: 'var(--text-2)' }}>
                    {exp.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                    {exp.highlights.map((point) => (
                      <div key={point} className="flex items-start gap-2.5">
                        <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                        <span className="text-xs leading-snug" style={{ color: 'var(--text-3)' }}>{point}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    className="flex flex-wrap gap-1.5 pt-4"
                    style={{ borderTop: '1px solid var(--border)' }}
                  >
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[10px] rounded-lg transition-all duration-200 cursor-default"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--text-3)',
                          backgroundColor: 'var(--bg-elevated)',
                          border: '1px solid var(--border)',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.color = 'var(--accent)'
                          e.currentTarget.style.borderColor = 'rgba(34,211,238,0.25)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.color = 'var(--text-3)'
                          e.currentTarget.style.borderColor = 'var(--border)'
                        }}
                      >
                        {tech}
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
