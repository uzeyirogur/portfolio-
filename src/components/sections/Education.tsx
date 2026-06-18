'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react'
import { education } from '@/data/education'

const ease = [0.16, 1, 0.3, 1]

export default function Education() {
  return (
    <section id="education" className="relative section-y bg-slate-50 overflow-hidden">
      <div aria-hidden className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom right, rgba(99,102,241,0.06) 0%, transparent 65%)' }} />

      <div className="container-xl relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease }} className="mb-14">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-gradient-to-r from-indigo-500 to-transparent" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-600">Eğitim</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
            Akademik{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Geçmiş</span>
          </h2>
        </motion.div>

        <div className="max-w-2xl space-y-4">
          {education.map((edu, i) => (
            <motion.div key={`${edu.institution}-${i}`}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-all">
                  <GraduationCap size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <h3 className="text-base font-black text-slate-900">{edu.institution}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Calendar size={11} /><span>{edu.startYear} — {edu.endYear}</span>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-indigo-600 mb-3">{edu.degree} · {edu.field}</p>
                  {edu.description && <p className="text-sm text-slate-500 leading-relaxed mb-4">{edu.description}</p>}
                  <div className="flex flex-wrap items-center gap-2">
                    {edu.showGpa && edu.gpa && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200">
                        <Award size={12} className="text-indigo-600" />
                        <span className="text-xs font-bold text-indigo-600">GPA: {edu.gpa.toFixed(2)}</span>
                      </div>
                    )}
                    {edu.highlights?.map((h) => (
                      <span key={h} className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-white border border-slate-200 text-slate-500">
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
