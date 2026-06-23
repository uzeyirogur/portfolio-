'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Download, Send, CheckCircle } from 'lucide-react'
import { profile } from '@/data/profile'
import { socials } from '@/data/socials'

const E = [0.16, 1, 0.3, 1] as const

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.65rem 0',
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--border)',
  color: 'var(--text-1)',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.78rem',
  outline: 'none',
  transition: 'border-color 0.2s',
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const sub = encodeURIComponent(`Portfolyo: ${form.name}`)
    const body = encodeURIComponent(`Ad: ${form.name}\nMail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:${profile.email}?subject=${sub}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  const LINKS = [
    { command: 'mail send',    label: profile.email,              href: `mailto:${profile.email}`, Icon: Mail },
    { command: 'github open',  label: 'github.com/uzeyirogur',   href: socials.github, Icon: Github, external: true },
    { command: 'linkedin',     label: 'linkedin/uzeyirogur',     href: socials.linkedin, Icon: Linkedin, external: true },
    { command: 'cv download',  label: 'uzeyir-ogur-cv.pdf',      href: profile.cvUrl, Icon: Download, download: true },
  ]

  return (
    <section id="contact" className="section-y" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="container-xl">
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label" style={{ display: 'block', marginBottom: '3rem' }}
        >
          // İletişim
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 24rem), 1fr))', gap: 'clamp(2.5rem, 6vw, 6rem)', maxWidth: '56rem' }}>
          {/* Left: command palette */}
          <div>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-3)', marginBottom: '2rem' }}
            >
              $ contact --mode=interactive
            </motion.p>

            <div>
              {LINKS.map((item, i) => (
                <motion.a
                  key={item.command}
                  href={item.href}
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  {...(item.download ? { download: true } : {})}
                  initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: E }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1.25rem',
                    padding: '0.85rem 0', borderBottom: '1px solid var(--border)',
                    textDecoration: 'none', transition: 'padding-left 0.18s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = '0.5rem')}
                  onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = '0')}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', flexShrink: 0, minWidth: '7.5rem' }}>
                    {'> '}{item.command}
                  </span>
                  <span style={{ flex: 1, borderBottom: '1px dotted rgba(255,255,255,0.07)', alignSelf: 'center' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-3)' }}>
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-3)', marginTop: '2.25rem', fontStyle: 'italic' }}
            >
              // Bir sistem birlikte inşa edelim.
            </motion.p>
          </div>

          {/* Right: minimal form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2, ease: E }}
          >
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.57rem', letterSpacing: '0.18em', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: '1.75rem' }}>
              VEYA MESAJ BIRAK
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { type: 'text', placeholder: 'Ad Soyad', key: 'name' as const },
                { type: 'email', placeholder: 'E-posta', key: 'email' as const },
              ].map((f) => (
                <input
                  key={f.key}
                  type={f.type}
                  required
                  value={form[f.key]}
                  onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(232,0,58,0.4)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                />
              ))}
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                placeholder="Mesajınız"
                style={{ ...inputStyle, resize: 'none' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(232,0,58,0.4)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
              <button
                type="submit"
                disabled={sent}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: sent ? '#34D399' : 'var(--accent)',
                  backgroundColor: 'transparent',
                  border: `1px solid ${sent ? '#34D399' : 'rgba(232,0,58,0.3)'}`,
                  borderRadius: 3, padding: '0.65rem 1.5rem',
                  cursor: sent ? 'default' : 'pointer',
                  alignSelf: 'flex-start', transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                }}
                onMouseEnter={(e) => { if (!sent) e.currentTarget.style.borderColor = 'rgba(232,0,58,0.5)' }}
                onMouseLeave={(e) => { if (!sent) e.currentTarget.style.borderColor = 'rgba(232,0,58,0.3)' }}
              >
                {sent ? <><CheckCircle size={12} /> Gönderildi</> : <><Send size={12} /> Gönder</>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
