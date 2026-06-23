'use client'

import { Github, Linkedin, Twitter, ArrowUp } from 'lucide-react'
import { socials } from '@/data/socials'
import { profile } from '@/data/profile'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer
      className="relative"
      style={{ backgroundColor: 'var(--bg-base)', borderTop: '1px solid var(--border)' }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.12), transparent)' }}
      />

      <div className="container-xl py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="text-center sm:text-left">
            <a href="#hero" className="inline-flex items-center gap-2.5 mb-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
                style={{
                  background: '#0A0A0A',
                  color: '#F8F8F8',
                }}
              >
                {profile.initials}
              </div>
              <span className="text-sm font-bold" style={{ color: 'var(--text-2)' }}>{profile.name}</span>
            </a>
            <p className="text-xs" style={{ color: 'var(--text-3)' }}>© {year} {profile.name}. Tüm hakları saklıdır.</p>
            <p
              className="text-xs mt-0.5"
              style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)', opacity: 0.5 }}
            >
              Next.js · TypeScript · Tailwind CSS
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {[
              { href: socials.github,   icon: <Github size={15} />   },
              { href: socials.linkedin, icon: <Linkedin size={15} /> },
              ...(socials.twitter ? [{ href: socials.twitter, icon: <Twitter size={15} /> }] : []),
            ].map(({ href, icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{ color: 'var(--text-3)', border: '1px solid var(--border)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'rgba(232,0,58,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-3)'; e.currentTarget.style.borderColor = 'var(--border)' }}
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 text-xs transition-colors duration-200"
            style={{ color: 'var(--text-3)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
          >
            Yukarı
            <span
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{ border: '1px solid var(--border)' }}
            >
              <ArrowUp size={12} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
