'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Github, Linkedin, Download } from 'lucide-react'
import { profile } from '@/data/profile'
import { socials } from '@/data/socials'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '#about',      label: 'Hakkımda' },
  { href: '#skills',     label: 'Yetkinlikler' },
  { href: '#projects',   label: 'Projeler' },
  { href: '#experience', label: 'Deneyim' },
  { href: '#contact',    label: 'İletişim' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={cn(
      'fixed inset-x-0 top-0 z-50 transition-all duration-500',
      scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm' : 'bg-transparent'
    )}>
      <nav className="container-xl">
        <div className="flex items-center justify-between h-16">
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-md group-hover:shadow-violet-200 transition-shadow">
              {profile.initials}
            </div>
            <span className="hidden sm:block text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
              {profile.name}
            </span>
          </a>

          <div className="hidden md:flex items-center">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors group">
                {link.label}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-violet-500 rounded-full group-hover:w-4 transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <a href={socials.github} target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex w-8 h-8 rounded-lg items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-all">
              <Github size={16} />
            </a>
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex w-8 h-8 rounded-lg items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
              <Linkedin size={16} />
            </a>
            <a href={profile.cvUrl} download
              className="hidden sm:flex items-center gap-1.5 ml-2 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90 transition-all shadow-[0_4px_12px_rgba(99,102,241,0.3)]">
              <Download size={12} /> CV İndir
            </a>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-all">
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-3 pb-5 border-t border-slate-100">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className="flex items-center px-3 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all">
                {link.label}
              </a>
            ))}
            <a href={profile.cvUrl} download
              className="mt-3 mx-2 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
              <Download size={14} /> CV İndir
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}
