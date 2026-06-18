'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Line =
  | { kind: 'prompt'; cmd: string }
  | { kind: 'json'; text: string; color?: string }
  | { kind: 'git'; hash: string; msg: string }
  | { kind: 'output'; text: string }
  | { kind: 'blank' }
  | { kind: 'cursor' }

const LINES: Line[] = [
  { kind: 'prompt', cmd: 'cat developer.json' },
  { kind: 'json', text: '{', color: 'text-slate-500' },
  { kind: 'json', text: '  "name": ', color: 'text-slate-400' },
  { kind: 'json', text: '    "Üzeyir Öğür",', color: 'text-cyan-300' },
  { kind: 'json', text: '  "role": ', color: 'text-slate-400' },
  { kind: 'json', text: '    "Full Stack .NET Developer",', color: 'text-indigo-300' },
  { kind: 'json', text: '  "stack": ["ASP.NET Core", "C#",', color: 'text-amber-300' },
  { kind: 'json', text: '            "SQL Server", "EF Core"],', color: 'text-amber-300' },
  { kind: 'json', text: '  "status": "available_for_work"', color: 'text-emerald-300' },
  { kind: 'json', text: '}', color: 'text-slate-500' },
  { kind: 'blank' },
  { kind: 'prompt', cmd: 'git log --oneline -3' },
  { kind: 'git', hash: 'a3f9c12', msg: 'feat: add financial dashboard' },
  { kind: 'git', hash: 'b7e2d45', msg: 'fix: optimize sql queries' },
  { kind: 'git', hash: 'c1a8f30', msg: 'feat: implement REST API' },
  { kind: 'blank' },
  { kind: 'cursor' },
]

const DELAY_PER_LINE = 120

export default function CodePanel() {
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    let n = 0
    const id = setInterval(() => {
      n++
      setVisible(n)
      if (n >= LINES.length) clearInterval(id)
    }, DELAY_PER_LINE)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative w-full max-w-lg mx-auto lg:mx-0">
      {/* Ambient glow */}
      <div className="absolute -inset-6 bg-cyan-500/8 rounded-3xl blur-3xl pointer-events-none" />
      <div className="absolute -inset-6 bg-indigo-500/5 rounded-3xl blur-3xl pointer-events-none translate-x-4 translate-y-4" />

      {/* Window */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-white/[0.08]">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#0d1117] border-b border-white/[0.06]">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="ml-3 text-xs font-mono text-slate-500 tracking-wide">
            developer.json — zsh
          </span>
          <div className="ml-auto flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-xs text-cyan-500/70 font-mono">live</span>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 py-4 bg-[#090e1a] font-mono text-[13px] leading-6 min-h-[320px]">
          <p className="text-slate-600 mb-2 text-xs">
            Last login: Mon Jun 17 09:15:23 on ttys001
          </p>

          {LINES.slice(0, visible).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.08 }}
            >
              {line.kind === 'prompt' && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-cyan-400 select-none">❯</span>
                  <span className="text-slate-100">{line.cmd}</span>
                </div>
              )}
              {line.kind === 'json' && (
                <div className={`pl-0 ${line.color ?? 'text-slate-300'}`}>{line.text}</div>
              )}
              {line.kind === 'git' && (
                <div className="pl-0">
                  <span className="text-amber-400">{line.hash}</span>
                  <span className="text-slate-400"> {line.msg}</span>
                </div>
              )}
              {line.kind === 'output' && (
                <div className="text-slate-400 pl-0">{line.text}</div>
              )}
              {line.kind === 'blank' && <div className="h-2" />}
              {line.kind === 'cursor' && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-cyan-400 select-none">❯</span>
                  <span className="inline-block w-[7px] h-[14px] bg-cyan-400 animate-cursor" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
