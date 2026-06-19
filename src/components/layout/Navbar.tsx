'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Github, Linkedin, Download } from 'lucide-react'
import { profile } from '@/data/profile'
import { socials } from '@/data/socials'

const navLinks = [
  { href: '#about',      label: 'About'      },
  { href: '#skills',     label: 'Skills'     },
  { href: '#projects',   label: 'Projects'   },
  { href: '#experience', label: 'Experience' },
  { href: '#contact',    label: 'Contact'    },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const borderColor   = scrolled ? 'rgba(255,255,255,0.06)' : 'transparent'
  const bgColor       = scrolled ? 'rgba(7,9,13,0.85)' : 'transparent'
  const backdropBlur  = scrolled ? 'blur(20px)' : 'none'

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{ background: bgColor, backdropFilter: backdropBlur, borderBottom: `1px solid ${borderColor}` }}
    >
      <nav className="container-xl">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#hero" className="group flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #22D3EE 0%, #818CF8 100%)',
                color: '#07090D',
                boxShadow: '0 0 16px rgba(34,211,238,0.2)',
              }}
            >
              {profile.initials}
            </div>
            <span
              className="hidden sm:block text-sm font-semibold transition-colors duration-200"
              style={{ color: 'var(--text-2)' }}
            >
              {profile.name}
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-xs font-medium tracking-wide transition-colors duration-200"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-3)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-1)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            {[
              { href: socials.github,   icon: <Github size={15} /> },
              { href: socials.linkedin, icon: <Linkedin size={15} /> },
            ].map(({ href, icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex w-8 h-8 rounded-lg items-center justify-center transition-all duration-200"
                style={{ color: 'var(--text-3)', border: '1px solid transparent' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'rgba(34,211,238,0.2)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-3)'; e.currentTarget.style.borderColor = 'transparent' }}
              >
                {icon}
              </a>
            ))}
            <a
              href={profile.cvUrl}
              download
              className="hidden sm:flex items-center gap-1.5 ml-2 px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200"
              style={{ backgroundColor: 'var(--accent)', color: '#07090D' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#67E8F9')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--accent)')}
            >
              <Download size={12} /> CV
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
              style={{ color: 'var(--text-2)' }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden absolute inset-x-0 top-16 z-50"
          style={{ background: 'rgba(7,9,13,0.97)', borderBottom: '1px solid var(--border)', backdropFilter: 'blur(20px)' }}
        >
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200"
                style={{ color: 'var(--text-2)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.backgroundColor = 'rgba(34,211,238,0.05)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-2)'; e.currentTarget.style.backgroundColor = 'transparent' }}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 pb-1 flex items-center gap-2 px-2">
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                style={{ color: 'var(--text-3)', border: '1px solid var(--border)' }}
              >
                <Github size={15} />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                style={{ color: 'var(--text-3)', border: '1px solid var(--border)' }}
              >
                <Linkedin size={15} />
              </a>
              <a
                href={profile.cvUrl}
                download
                className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-xl"
                style={{ backgroundColor: 'var(--accent)', color: '#07090D' }}
              >
                <Download size={14} /> CV İndir
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
