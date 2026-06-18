'use client'

import { motion } from 'framer-motion'
import { Server, Database, Monitor, Wrench, Bot } from 'lucide-react'
import { skills } from '@/data/skills'
import { cn } from '@/lib/utils'

const ease = [0.16, 1, 0.3, 1]
type ColorKey = 'cyan' | 'indigo' | 'violet' | 'emerald' | 'amber'

const colorStyles: Record<ColorKey, { icon: string; pill: string; border: string; header: string }> = {
  cyan:    { icon: 'bg-cyan-50 border-cyan-200 text-cyan-600',       pill: 'bg-cyan-50 border-cyan-200 text-cyan-700 hover:bg-cyan-100',    border: 'hover:border-cyan-200',    header: 'text-cyan-600' },
  indigo:  { icon: 'bg-indigo-50 border-indigo-200 text-indigo-600', pill: 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100', border: 'hover:border-indigo-200', header: 'text-indigo-600' },
  violet:  { icon: 'bg-violet-50 border-violet-200 text-violet-600', pill: 'bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-100', border: 'hover:border-violet-200', header: 'text-violet-600' },
  emerald: { icon: 'bg-emerald-50 border-emerald-200 text-emerald-600', pill: 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100', border: 'hover:border-emerald-200', header: 'text-emerald-600' },
  amber:   { icon: 'bg-amber-50 border-amber-200 text-amber-600',    pill: 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100', border: 'hover:border-amber-200',   header: 'text-amber-600' },
}
const icons: Record<string, React.ReactNode> = {
  Backend: <Server size={20} />, Database: <Database size={20} />, Frontend: <Monitor size={20} />,
  'Tools & DevOps': <Wrench size={20} />, 'AI & Otomasyon': <Bot size={20} />,
}

export default function Skills() {
  return (
    <section id="skills" className="relative section-y bg-white overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{ backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container-xl relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease }} className="mb-16">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-gradient-to-r from-violet-500 to-transparent" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-violet-600">Yetkinlikler</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
            Teknik{' '}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Arsenal</span>
          </h2>
          <p className="mt-4 text-[15px] text-slate-500 max-w-xl leading-relaxed">
            Projelerimde aktif olarak kullandığım teknolojiler ve araçlar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((cat, i) => {
            const color = cat.color as ColorKey
            const style = colorStyles[color]
            return (
              <motion.div key={cat.category}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className={cn('group p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300', style.border,
                  i === skills.length - 1 && skills.length % 3 !== 0 ? 'sm:col-span-2 lg:col-span-1' : '')}>
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className={cn('w-10 h-10 rounded-xl border flex items-center justify-center', style.icon)}>
                      {icons[cat.category]}
                    </div>
                    <div>
                      <h3 className={cn('text-sm font-bold', style.header)}>{cat.category}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{cat.items.length} beceri</p>
                    </div>
                  </div>
                  <span className="text-lg">{cat.icon}</span>
                </div>
                <div className="w-full h-px bg-slate-100 mb-4" />
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span key={item}
                      className={cn('px-2.5 py-1 text-[11px] font-medium rounded-lg border transition-all cursor-default', style.pill)}>
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
