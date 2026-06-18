'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Twitter, Download, Send, CheckCircle, ArrowRight } from 'lucide-react'
import { profile } from '@/data/profile'
import { socials } from '@/data/socials'

const ease = [0.16, 1, 0.3, 1]

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

  return (
    <section id="contact" className="relative section-y bg-white overflow-hidden">
      <div aria-hidden className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-300/50 to-transparent" />
      <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.05) 0%, transparent 70%)' }} />

      <div className="container-xl relative">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease }}
          className="text-center mb-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-violet-500" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-violet-600">İletişim</span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-violet-500" />
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
            <span className="text-slate-900">Bir şey mi</span>
            <br />
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              aklında var?
            </span>
          </h2>
          <p className="text-[15px] text-slate-500 leading-[1.8] max-w-xl mx-auto">
            Proje, iş birliği veya yazılım geliştirme süreci hakkında konuşmak istersen
            mesajını bırak. En kısa sürede döneceğim.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease }}
          className="flex flex-wrap justify-center gap-3 mb-16">
          {profile.email !== 'EMAIL@PLACEHOLDER.COM' && (
            <a href={`mailto:${profile.email}`}
              className="group flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all shadow-[0_4px_16px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_24px_rgba(99,102,241,0.45)] hover:-translate-y-0.5">
              <Mail size={15} /> Mail Gönder
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          )}
          <a href={socials.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all">
            <Github size={15} /> GitHub
          </a>
          <a href={socials.linkedin} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm text-blue-600 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-all">
            <Linkedin size={15} /> LinkedIn
          </a>
          {socials.twitter && (
            <a href={socials.twitter} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all">
              <Twitter size={15} /> X / Twitter
            </a>
          )}
          <a href={profile.cvUrl} download
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm text-violet-600 bg-violet-50 border border-violet-200 hover:bg-violet-100 transition-all">
            <Download size={15} /> CV İndir
          </a>
        </motion.div>

        <div className="relative flex items-center gap-4 max-w-2xl mx-auto mb-12">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400 font-medium px-2">veya form ile yaz</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2, ease }}
          className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Ad Soyad</label>
                <input type="text" required value={form.name}
                  onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                  placeholder="Adınız"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">E-posta</label>
                <input type="email" required value={form.email}
                  onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                  placeholder="mail@ornek.com"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Mesaj</label>
              <textarea required rows={4} value={form.message}
                onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                placeholder="Mesajınızı yazın..."
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all resize-none" />
            </div>
            <button type="submit" disabled={sent}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 disabled:opacity-60 transition-all shadow-[0_4px_16px_rgba(99,102,241,0.3)] hover:-translate-y-0.5">
              {sent ? <><CheckCircle size={15} /> Yönlendiriliyor...</> : <><Send size={15} /> Gönder</>}
            </button>
            <p className="text-center text-[11px] text-slate-400">Form, e-posta istemcinizi açar.</p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
