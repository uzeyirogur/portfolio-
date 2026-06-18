'use client'

import { motion } from 'framer-motion'
import { MapPin, Briefcase, Target, Lightbulb, ArrowRight } from 'lucide-react'
import { profile } from '@/data/profile'

const iconMap: Record<string, React.ReactNode> = {
  MapPin: <MapPin size={14} />,
  Briefcase: <Briefcase size={14} />,
  Target: <Target size={14} />,
  Lightbulb: <Lightbulb size={14} />,
}
const stack = ['ASP.NET Core', 'C#', 'Web API', 'EF Core', 'SQL Server', 'MVC', 'REST', 'Git']
const ease = [0.16, 1, 0.3, 1]

export default function About() {
  return (
    <section id="about" className="relative section-y bg-slate-50 overflow-hidden">
      <div aria-hidden className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(99,102,241,0.07) 0%, transparent 65%)' }} />

      <div className="container-xl relative">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease }} className="mb-14">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-gradient-to-r from-violet-500 to-transparent" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-violet-600">Hakkımda</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
            Kim <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Olduğum</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 items-start">
          <div>
            <div className="space-y-5">
              {profile.about.split('\n\n').map((para, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1, ease }}
                  className="text-[15px] text-slate-600 leading-[1.9] max-w-2xl">
                  {para}
                </motion.p>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.25, ease }} className="mt-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3">Çalıştığım Teknolojiler</p>
              <div className="flex flex-wrap gap-2">
                {stack.map((item) => (
                  <span key={item}
                    className="px-3 py-1.5 text-xs font-mono text-violet-700 bg-violet-50 border border-violet-200 rounded-lg hover:border-violet-300 hover:bg-violet-100 transition-all cursor-default">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }} className="mt-7">
              <a href="#projects" className="group inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors">
                Projelerimi gör <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1, ease }} className="space-y-3">
            {profile.infoCards.map((card, i) => (
              <motion.div key={card.label} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease }}
                className="group flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-violet-200 hover:shadow-sm transition-all duration-300">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-600 group-hover:bg-violet-100 transition-colors">
                  {iconMap[card.icon]}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-0.5">{card.label}</p>
                  <p className="text-sm text-slate-700 leading-snug">{card.value}</p>
                </div>
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.5 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <div>
                <p className="text-sm font-semibold text-emerald-700">İş teklifleri için müsait</p>
                <p className="text-xs text-emerald-600 mt-0.5">Freelance &amp; Full-time</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
