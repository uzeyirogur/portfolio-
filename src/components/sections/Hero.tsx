'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Download, ExternalLink, Github, Linkedin, Twitter, ChevronDown, Code2 } from 'lucide-react'
import Image from 'next/image'
import { profile } from '@/data/profile'
import { socials } from '@/data/socials'

const ease = [0.16, 1, 0.3, 1]
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
})

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Orb 1 – violet, top-right */}
      <div
        className="absolute rounded-full animate-float-slow"
        style={{
          width: 600, height: 600,
          top: '-15%', right: '-10%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)',
          filter: 'blur(1px)',
        }}
      />
      {/* Orb 2 – indigo, middle-left */}
      <div
        className="absolute rounded-full animate-float-slow2"
        style={{
          width: 500, height: 500,
          top: '20%', left: '-8%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)',
          filter: 'blur(1px)',
        }}
      />
      {/* Orb 3 – cyan, bottom-center */}
      <div
        className="absolute rounded-full animate-float-slow3"
        style={{
          width: 400, height: 400,
          bottom: '-5%', left: '35%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.10) 0%, transparent 70%)',
          filter: 'blur(1px)',
        }}
      />
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(circle, #c7d2fe 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  )
}

const chips = [
  { label: 'ASP.NET Core', pos: { top: '-22px', left: '10px' } },
  { label: 'C# / .NET',    pos: { top: '8px',   right: '-95px' } },
  { label: 'SQL Server',   pos: { bottom: '30px', right: '-95px' } },
  { label: 'Web API',      pos: { bottom: '-18px', left: '20px' } },
  { label: 'EF Core',      pos: { bottom: '70px',  left: '-90px' } },
]

function ProfilePhoto() {
  const [error, setError] = useState(false)
  return (
    <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] mx-auto">
      {/* Spinning gradient ring */}
      <div className="absolute -inset-1.5 rounded-full opacity-60 animate-spin-slow"
        style={{ background: 'conic-gradient(from 0deg, #6366f1, #a78bfa, #c084fc, #6366f1)', filter: 'blur(4px)' }} />
      <div className="absolute inset-0 rounded-full border border-slate-200" />
      <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-100 shadow-xl">
        {!error ? (
          <Image src="/images/profile.jpg" alt={profile.avatarAlt} fill sizes="320px"
            className="object-cover" style={{ objectPosition: 'center 60%' }} priority onError={() => setError(true)} />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-violet-50 to-indigo-50">
            <Code2 size={48} className="text-violet-300" />
            <p className="text-[10px] text-slate-400 font-mono">profile.jpg</p>
          </div>
        )}
      </div>

      {/* Floating tech chips */}
      {chips.map((chip, i) => (
        <motion.div key={chip.label}
          className="absolute px-3 py-1.5 text-[11px] font-mono font-semibold rounded-xl bg-white border border-slate-200 text-slate-600 shadow-md whitespace-nowrap z-10"
          style={chip.pos as React.CSSProperties}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5 + i * 0.4, delay: i * 0.7, repeat: Infinity, ease: 'easeInOut' }}>
          {chip.label}
        </motion.div>
      ))}

      {/* Currently building badge */}
      <motion.div
        className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-lg whitespace-nowrap text-xs z-10"
        animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
        </span>
        <span className="text-slate-500">Building:</span>
        <span className="font-bold text-violet-600">{profile.currentlyBuilding}</span>
      </motion.div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white">
      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 lg:gap-8 items-center">

          {/* LEFT */}
          <div className="space-y-6">

            {/* Status chip */}
            <motion.div {...fadeUp(0.05)}>
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-violet-200 bg-violet-50 text-xs font-semibold text-violet-700">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
                </span>
                Geliştiriliyor: {profile.currentlyBuilding}
                <span className="w-px h-3 bg-violet-200" />
                <span className="text-violet-400 font-medium">İş teklifleri açık</span>
              </span>
            </motion.div>

            {/* Name */}
            <motion.div {...fadeUp(0.1)}>
              <p className="text-slate-400 text-sm font-semibold tracking-[0.25em] uppercase mb-3">Merhaba, ben</p>
              <h1 className="font-black leading-[0.92] tracking-tight">
                <span className="block text-[72px] sm:text-[88px] lg:text-[100px] bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Üzeyir
                </span>
                <span className="block text-[72px] sm:text-[88px] lg:text-[100px] text-slate-900">
                  Öğür
                </span>
              </h1>
            </motion.div>

            {/* Title */}
            <motion.p {...fadeUp(0.18)} className="text-xl sm:text-2xl font-semibold text-slate-700">
              Computer Engineer &amp;{' '}
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Full Stack .NET Developer
              </span>
            </motion.p>

            {/* Bio */}
            <motion.p {...fadeUp(0.24)} className="text-[15px] text-slate-500 leading-[1.85] max-w-[500px]">
              ASP.NET Core MVC, Web API, Entity Framework Core ve SQL Server teknolojileriyle
              ölçeklenebilir, sürdürülebilir ve kullanıcı odaklı web uygulamaları geliştiriyorum.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.3)} className="flex flex-wrap items-center gap-3">
              <a href="#projects"
                className="group inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 shadow-[0_4px_20px_rgba(99,102,241,0.35)] hover:shadow-[0_6px_28px_rgba(99,102,241,0.5)] hover:-translate-y-0.5">
                Projeleri İncele
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200">
                <Mail size={15} /> İletişime Geç
              </a>
              <div className="inline-flex rounded-xl border border-slate-200 overflow-hidden text-sm font-semibold">
                <a href={profile.cvUrl} download
                  className="inline-flex items-center gap-1.5 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all border-r border-slate-200">
                  <Download size={14} /> İndir
                </a>
                <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all">
                  <ExternalLink size={14} /> CV Görüntüle
                </a>
              </div>
            </motion.div>

            {/* Socials */}
            <motion.div {...fadeUp(0.36)} className="flex items-center gap-4">
              <a href={socials.github} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50 transition-all">
                <Github size={16} />
              </a>
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all">
                <Linkedin size={16} />
              </a>
              {socials.twitter && (
                <a href={socials.twitter} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50 transition-all">
                  <Twitter size={16} />
                </a>
              )}
              <div className="w-px h-5 bg-slate-200" />
              <span className="text-xs text-slate-400">İstanbul, TR</span>
            </motion.div>

            {/* Stats */}
            <motion.div {...fadeUp(0.42)} className="grid grid-cols-3 gap-3 max-w-xs pt-1">
              {[{ v: '3+', l: 'Aktif Proje' }, { v: '.NET', l: 'Core Stack' }, { v: 'Full Stack', l: '2026' }].map((s) => (
                <div key={s.l}
                  className="text-center py-3 px-2 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-violet-200 hover:shadow-violet-50 transition-all">
                  <p className="text-base font-extrabold text-slate-900 leading-tight">{s.v}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider">{s.l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="hidden lg:flex items-center justify-center pb-10">
            <ProfilePhoto />
          </motion.div>
        </div>
      </div>

      <motion.div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-300"
        animate={{ y: [0, 6, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  )
}
