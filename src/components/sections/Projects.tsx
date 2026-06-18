'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react'
import { projects, projectCategories, type ProjectStatus } from '@/data/projects'
import { cn } from '@/lib/utils'

const ease = [0.16, 1, 0.3, 1]

const statusConfig: Record<ProjectStatus, { label: string; color: string }> = {
  Geliştiriliyor: { label: 'Geliştiriliyor', color: 'text-violet-600 bg-violet-50 border-violet-200' },
  Demo:           { label: 'Demo',           color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  Tamamlandı:    { label: 'Tamamlandı',     color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  Planlandı:     { label: 'Planlandı',      color: 'text-amber-600 bg-amber-50 border-amber-200' },
  Fikir:         { label: 'Fikir / Planlanan', color: 'text-rose-600 bg-rose-50 border-rose-200' },
}

const projectVisuals: Record<string, { gradient: string; icon: string }> = {
  paramnet:             { gradient: 'from-emerald-400/40 via-teal-400/30 to-cyan-500/40',    icon: '💰' },
  'anka-sports':        { gradient: 'from-violet-500/40 via-purple-400/30 to-indigo-500/40', icon: '🏆' },
  'gold-price-tracker': { gradient: 'from-amber-400/40 via-yellow-400/30 to-orange-400/40', icon: '📈' },
  'vehicle-inventory':  { gradient: 'from-slate-400/40 via-blue-400/30 to-cyan-400/30',     icon: '🚗' },
  'ticket-system':      { gradient: 'from-blue-500/40 via-cyan-400/30 to-indigo-500/40',    icon: '🎫' },
  portfolyox:           { gradient: 'from-rose-400/40 via-pink-400/30 to-violet-400/40',    icon: '🏠' },
}

function ProjectImage({ src, alt, fallback }: { src: string; alt: string; fallback: React.ReactNode }) {
  const [error, setError] = useState(false)
  if (error) return <>{fallback}</>
  return (
    <Image src={src} alt={alt} fill className="object-cover object-top"
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" onError={() => setError(true)} />
  )
}

function ProjectMockup({ gradient, icon }: { gradient: string; icon: string }) {
  return (
    <div className={cn('relative w-full h-full bg-gradient-to-br', gradient, 'overflow-hidden')}>
      <div className="absolute inset-0 opacity-25"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl opacity-50 select-none">{icon}</div>
      <div className="absolute bottom-3 left-3 right-3 space-y-1.5">
        {[65, 40, 80].map((w, i) => (
          <div key={i} className="h-1.5 rounded-full bg-white/30" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('Tümü')
  const filtered = filter === 'Tümü' ? projects : projects.filter((p) => p.category.includes(filter))

  return (
    <section id="projects" className="relative section-y bg-slate-50 overflow-hidden">
      <div aria-hidden className="absolute bottom-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom right, rgba(139,92,246,0.06) 0%, transparent 65%)' }} />

      <div className="container-xl relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease }} className="mb-14">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-gradient-to-r from-violet-500 to-transparent" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-violet-600">Projeler</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight mb-4">
            Yaptığım{' '}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">İşler</span>
          </h2>
          <p className="text-[15px] text-slate-500 max-w-lg leading-relaxed">
            Gerçek iş süreçlerini dijitalleştirmek için geliştirdiğim uygulamalar.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10">
          {projectCategories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={cn(
                'px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200',
                filter === cat
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-transparent shadow-[0_4px_12px_rgba(99,102,241,0.3)]'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
              )}>
              {cat}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((project, i) => {
              const status = statusConfig[project.status]
              const visual = projectVisuals[project.slug] ?? { gradient: 'from-slate-300/40 to-slate-400/40', icon: '💻' }
              return (
                <motion.article key={project.slug}
                  initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease }}
                  className="group relative rounded-2xl bg-white border border-slate-200 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-slate-300">
                  <div className="relative h-40 overflow-hidden">
                    {project.image ? (
                      <ProjectImage src={project.image} alt={project.title}
                        fallback={<ProjectMockup gradient={visual.gradient} icon={visual.icon} />} />
                    ) : (
                      <ProjectMockup gradient={visual.gradient} icon={visual.icon} />
                    )}
                    <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/90 text-slate-900 text-xs font-semibold hover:bg-white transition-colors shadow-sm">
                          <Github size={13} /> Kaynak Kod
                        </a>
                      )}
                      {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold hover:bg-violet-500 transition-colors shadow-sm">
                          <ExternalLink size={13} /> Demo
                        </a>
                      )}
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className={cn('px-2.5 py-1 text-[10px] font-bold rounded-lg border backdrop-blur-sm', status.color)}>
                        {status.label}
                      </span>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-white to-transparent" />
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between mb-1.5">
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
                        {project.title}
                      </h3>
                      <ArrowUpRight size={13} className="text-slate-300 group-hover:text-violet-500 transition-all flex-shrink-0 mt-0.5" />
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">{project.description}</p>
                    <div className="space-y-1 mb-3">
                      {project.features.slice(0, 2).map((f) => (
                        <div key={f} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                          <span className="text-[11px] text-slate-500">{f}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1 pt-3 border-t border-slate-100">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="px-1.5 py-0.5 text-[10px] font-mono rounded-md bg-slate-50 border border-slate-200 text-slate-500">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono rounded-md bg-slate-50 border border-slate-200 text-slate-400">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
