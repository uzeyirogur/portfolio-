'use client'

import { Github, Linkedin, ArrowUp } from 'lucide-react'
import { socials } from '@/data/socials'
import { profile } from '@/data/profile'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative bg-slate-50 border-t border-slate-200">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-300/40 to-transparent" />
      <div className="container-xl py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <a href="#hero" className="inline-flex items-center gap-2.5 mb-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-xs font-black">
                {profile.initials}
              </div>
              <span className="text-sm font-bold text-slate-700">{profile.name}</span>
            </a>
            <p className="text-xs text-slate-400">© {year} {profile.name}. Tüm hakları saklıdır.</p>
            <p className="text-xs text-slate-300 mt-0.5 font-mono">Next.js · TypeScript · Tailwind CSS</p>
          </div>
          <div className="flex items-center gap-2">
            <a href={socials.github} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-800 hover:border-slate-300 transition-all">
              <Github size={15} />
            </a>
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all">
              <Linkedin size={15} />
            </a>
          </div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 text-xs text-slate-400 hover:text-slate-700 transition-colors">
            Yukarı
            <span className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center group-hover:border-violet-300 group-hover:text-violet-500 transition-all">
              <ArrowUp size={12} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
