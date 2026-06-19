'use client'

import { motion } from 'framer-motion'
import { Server, Database, Monitor, Wrench, Bot } from 'lucide-react'
import { skills } from '@/data/skills'

const ease = [0.16, 1, 0.3, 1] as const

const icons: Record<string, React.ReactNode> = {
  Backend:          <Server size={16} />,
  Database:         <Database size={16} />,
  Frontend:         <Monitor size={16} />,
  'Tools & DevOps': <Wrench size={16} />,
  'AI & Otomasyon': <Bot size={16} />,
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative section-y overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div className="absolute inset-0 pointer-events-none dot-grid opacity-40" />

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
            <span className="accent-line" /> 02 &mdash; Skills
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
              Teknik{' '}
              <span className="gradient-text-cyan">Arsenal</span>
            </motion.h2>
          </div>
          <p className="mt-5 text-[15px] max-w-xl" style={{ color: 'var(--text-2)', lineHeight: 1.8 }}>
            Projelerimde aktif olarak kullandığım teknolojiler ve araçlar.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className={`glass-card group p-6 ${i === skills.length - 1 && skills.length % 3 !== 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              {/* Card header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{
                      color: 'var(--accent)',
                      backgroundColor: 'var(--accent-dim)',
                      border: '1px solid rgba(34,211,238,0.15)',
                    }}
                  >
                    {icons[cat.category] ?? <Server size={16} />}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold" style={{ color: 'var(--text-1)' }}>{cat.category}</h3>
                    <p
                      className="text-[10px] mt-0.5"
                      style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}
                    >
                      {cat.items.length} skills
                    </p>
                  </div>
                </div>
                <span className="text-lg select-none opacity-50">{cat.icon}</span>
              </div>

              {/* Divider */}
              <div className="w-full h-px mb-4" style={{ backgroundColor: 'var(--border)' }} />

              {/* Pills */}
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 text-[11px] rounded-lg cursor-default transition-all duration-200"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-3)',
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--bg-elevated)',
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
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
