'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const E = [0.16, 1, 0.3, 1] as const

const LAYERS = [
  {
    key: 'UI LAYER',
    color: '#22D3EE',
    items: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'HTML / CSS'],
    desc: 'Frontend ve kullanıcı arayüzü teknolojileri',
  },
  {
    key: 'API LAYER',
    color: '#818CF8',
    items: ['ASP.NET Core', 'Web API', 'REST', 'JWT', 'Swagger / OpenAPI', 'Minimal API'],
    desc: 'Backend API geliştirme ve kimlik doğrulama',
  },
  {
    key: 'LOGIC LAYER',
    color: '#F59E0B',
    items: ['C#', 'Clean Architecture', 'Repository Pattern', 'UnitOfWork', 'SOLID', 'DTO / AutoMapper'],
    desc: 'İş mantığı, mimari pattern ve tasarım prensipleri',
  },
  {
    key: 'DATA LAYER',
    color: '#34D399',
    items: ['SQL Server', 'SQLite', 'Entity Framework Core', 'LINQ', 'Migrations', 'Stored Procedures'],
    desc: 'Veritabanı tasarımı, ORM ve veri yönetimi',
  },
  {
    key: 'TOOLS LAYER',
    color: '#94A3B8',
    items: ['Git', 'GitHub', 'Visual Studio', 'VS Code', 'Swagger UI', 'IIS'],
    desc: 'Geliştirme araçları ve deployment',
  },
  {
    key: 'AI WORKFLOW',
    color: '#C084FC',
    items: ['Claude Code', 'N8n', 'AI-assisted dev', 'Prompt Engineering', 'Deep Learning (temel)', 'Otomasyon'],
    desc: 'Yapay zeka destekli geliştirme ve otomasyon',
  },
]

export default function Skills() {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)

  return (
    <section id="skills" className="section-y" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="container-xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label"
          style={{ display: 'block', marginBottom: '3rem' }}
        >
          // Teknoloji Yığını
        </motion.p>

        {/* Layer map */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1px solid var(--border)' }}>
          {LAYERS.map((layer, i) => {
            const isHovered = hoveredKey === layer.key
            return (
              <motion.div
                key={layer.key}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: E }}
                className="skill-layer"
                style={{
                  borderBottom: '1px solid var(--border)',
                  padding: isHovered ? 'clamp(1rem, 2vw, 1.25rem) clamp(1rem, 2vw, 1.5rem)' : 'clamp(0.9rem, 1.8vw, 1.1rem) 0',
                  cursor: 'default',
                  '--skill-border': isHovered ? layer.color : 'transparent',
                } as React.CSSProperties}
                onMouseEnter={() => setHoveredKey(layer.key)}
                onMouseLeave={() => setHoveredKey(null)}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(1rem, 3vw, 2.5rem)', flexWrap: 'wrap' }}>
                  {/* Layer label */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0, minWidth: '9rem' }}>
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: layer.color,
                        flexShrink: 0,
                        boxShadow: isHovered ? `0 0 8px ${layer.color}` : 'none',
                        transition: 'box-shadow 0.2s',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.14em',
                        color: isHovered ? layer.color : 'var(--text-3)',
                        textTransform: 'uppercase',
                        transition: 'color 0.2s',
                        fontWeight: isHovered ? 700 : 400,
                      }}
                    >
                      {layer.key}
                    </span>
                  </div>

                  {/* Items */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem 1.5rem', flex: 1 }}>
                    {layer.items.map((item, j) => (
                      <span
                        key={item}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'clamp(0.72rem, 1.3vw, 0.82rem)',
                          color: isHovered ? 'var(--text-1)' : 'var(--text-2)',
                          transition: 'color 0.2s',
                          transitionDelay: isHovered ? `${j * 0.02}s` : '0s',
                        }}
                      >
                        {item}
                        {j < layer.items.length - 1 && (
                          <span style={{ color: 'var(--text-3)', marginLeft: '1.5rem', marginRight: '-1.5rem' }}> ·</span>
                        )}
                      </span>
                    ))}
                  </div>

                  {/* Description on hover */}
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        color: 'var(--text-3)',
                        flexShrink: 0,
                        display: 'none',
                      }}
                      className="hidden xl:inline"
                    >
                      {layer.desc}
                    </motion.span>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
