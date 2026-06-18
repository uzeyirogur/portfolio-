'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, CheckCircle2, Building2, Zap } from 'lucide-react'
import { experiences } from '@/data/experiences'

const ease = [0.16, 1, 0.3, 1]

export default function Experience() {
  return (
    <section id="experience" className="relative section-y bg-white overflow-hidden">
      <div aria-hidden className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(99,102,241,0.05) 0%, transparent 65%)' }} />

      <div className="container-xl relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease }} className="mb-16">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-gradient-to-r from-violet-500 to-transparent" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-violet-600">Deneyim</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
            Çalışma{' '}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Geçmişim</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl">
          {experiences.map((exp, idx) => (
            <motion.div key={`${exp.company}-${idx}`}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.7, delay: idx * 0.1, ease }}
              className="relative flex gap-6 pb-2">
              {idx < experiences.length - 1 && (
                <div className="absolute left-5 top-14 bottom-0 w-px bg-gradient-to-b from-violet-300/60 via-violet-200/30 to-transparent" />
              )}
              <div className="flex-shrink-0 flex flex-col items-center pt-1">
                <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                  exp.isCurrent ? 'bg-violet-50 border-violet-300 shadow-[0_0_16px_rgba(139,92,246,0.2)]' : 'bg-white border-slate-200'
                }`}>
                  <Building2 size={18} className={exp.isCurrent ? 'text-violet-600' : 'text-slate-400'} />
                  {exp.isCurrent && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-60" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-violet-500" />
                    </span>
                  )}
                </div>
              </div>

              <div className="flex-1 pb-14">
                <div className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-violet-200 hover:shadow-md transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-black text-slate-900">{exp.role}</h3>
                        {exp.isCurrent && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-50 border border-violet-200 text-[10px] font-bold text-violet-600">
                            <Zap size={9} /> Aktif
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-bold text-violet-600">{exp.companyShort ?? exp.company}</p>
                    </div>
                    <div className="flex flex-col gap-1.5 sm:items-end flex-shrink-0">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Calendar size={11} /><span className="font-medium">{exp.startDate} — {exp.endDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <MapPin size={11} /><span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-[1.8] mb-5">{exp.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                    {exp.highlights.map((point) => (
                      <div key={point} className="flex items-start gap-2.5">
                        <CheckCircle2 size={13} className="text-violet-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-slate-500 leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 text-[10px] font-mono rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:border-violet-200 hover:text-violet-600 transition-all">
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
