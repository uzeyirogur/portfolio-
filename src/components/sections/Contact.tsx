'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Twitter, Download, Send, CheckCircle, ArrowRight } from 'lucide-react'
import { profile } from '@/data/profile'
import { socials } from '@/data/socials'

const ease = [0.16, 1, 0.3, 1] as const

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: '0.75rem',
  fontSize: '0.875rem',
  backgroundColor: 'var(--bg-elevated)',
  color: 'var(--text-1)',
  border: '1px solid var(--border)',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  fontFamily: 'var(--font-sans)',
}

function FocusInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={inputStyle}
      onFocus={e => {
        e.currentTarget.style.borderColor = 'var(--accent)'
        e.currentTarget.style.boxShadow   = '0 0 0 3px rgba(34,211,238,0.1)'
      }}
      onBlur={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.boxShadow   = 'none'
      }}
    />
  )
}

function FocusTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      style={{ ...inputStyle, resize: 'none' } as React.CSSProperties}
      onFocus={e => {
        e.currentTarget.style.borderColor = 'var(--accent)'
        e.currentTarget.style.boxShadow   = '0 0 0 3px rgba(34,211,238,0.1)'
      }}
      onBlur={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.boxShadow   = 'none'
      }}
    />
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent]  = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const sub  = encodeURIComponent(`Portfolyo: ${form.name}`)
    const body = encodeURIComponent(`Ad: ${form.name}\nMail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:${profile.email}?subject=${sub}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section
      id="contact"
      className="relative section-y overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      {/* Top divider */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(34,211,238,0.2), transparent)' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(34,211,238,0.03) 0%, transparent 70%)' }}
      />

      <div className="container-xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <span className="section-label justify-center mb-6 block">
            <span className="accent-line" /> 06 &mdash; Contact
          </span>
          <div className="overflow-hidden mb-6">
            <motion.h2
              className="heading-lg"
              style={{ color: 'var(--text-1)' }}
              initial={{ y: '100%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease }}
            >
              Bir şey mi{' '}
              <span className="gradient-text-cyan">aklında var?</span>
            </motion.h2>
          </div>
          <p className="text-[15px] max-w-xl mx-auto" style={{ color: 'var(--text-2)', lineHeight: 1.8 }}>
            Proje, iş birliği veya yazılım geliştirme süreci hakkında konuşmak istersen
            mesajını bırak. En kısa sürede döneceğim.
          </p>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {profile.email !== 'EMAIL@PLACEHOLDER.COM' && (
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
              style={{ backgroundColor: 'var(--accent)', color: '#07090D', boxShadow: '0 0 20px rgba(34,211,238,0.2)' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#67E8F9')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--accent)')}
            >
              <Mail size={15} /> Mail Gönder
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          )}
          {[
            { href: socials.github,   icon: <Github size={15} />,   label: 'GitHub'    },
            { href: socials.linkedin, icon: <Linkedin size={15} />, label: 'LinkedIn'  },
            ...(socials.twitter ? [{ href: socials.twitter, icon: <Twitter size={15} />, label: 'X / Twitter' }] : []),
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
              style={{ color: 'var(--text-2)', border: '1px solid var(--border)' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'rgba(34,211,238,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-2)'; e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              {icon} {label}
            </a>
          ))}
          <a
            href={profile.cvUrl}
            download
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
            style={{ color: 'var(--text-2)', border: '1px solid var(--border)' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'rgba(34,211,238,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-2)'; e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            <Download size={15} /> CV İndir
          </a>
        </motion.div>

        {/* Divider */}
        <div className="relative flex items-center gap-4 max-w-2xl mx-auto mb-10">
          <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
          <span
            className="text-xs px-2"
            style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}
          >
            veya form ile yaz
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="max-w-lg mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="glass-card p-6 space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-[10px] font-bold uppercase tracking-widest mb-2"
                  style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}
                >
                  Ad Soyad
                </label>
                <FocusInput
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(s => ({ ...s, name: e.target.value }))}
                  placeholder="Adınız"
                />
              </div>
              <div>
                <label
                  className="block text-[10px] font-bold uppercase tracking-widest mb-2"
                  style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}
                >
                  E-posta
                </label>
                <FocusInput
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(s => ({ ...s, email: e.target.value }))}
                  placeholder="mail@ornek.com"
                />
              </div>
            </div>
            <div>
              <label
                className="block text-[10px] font-bold uppercase tracking-widest mb-2"
                style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}
              >
                Mesaj
              </label>
              <FocusTextarea
                required
                rows={4}
                value={form.message}
                onChange={e => setForm(s => ({ ...s, message: e.target.value }))}
                placeholder="Mesajınızı yazın..."
              />
            </div>
            <button
              type="submit"
              disabled={sent}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200"
              style={{
                backgroundColor: sent ? 'rgba(34,211,238,0.6)' : 'var(--accent)',
                color: '#07090D',
                boxShadow: '0 0 20px rgba(34,211,238,0.2)',
              }}
            >
              {sent
                ? <><CheckCircle size={15} /> Yönlendiriliyor...</>
                : <><Send size={15} /> Gönder</>}
            </button>
            <p className="text-center text-[11px]" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
              Form, e-posta istemcinizi açar.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
