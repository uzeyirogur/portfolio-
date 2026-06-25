'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, Draggable } from '@/scripts/gsap'
import styles from './Hero.module.scss'

// ── XOX / AI logic ────────────────────────────────────────────────────────────

type Cell = 'X' | 'O' | null

const WIN_LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
]

function checkWinner(board: Cell[]): { winner: Cell; line: number[] | null } {
  for (const ln of WIN_LINES) {
    const [a,b,c] = ln
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return { winner: board[a], line: ln }
  }
  return { winner: null, line: null }
}

function minimax(board: Cell[], depth: number, isMax: boolean): number {
  const { winner } = checkWinner(board)
  if (winner === 'O') return 10 - depth
  if (winner === 'X') return depth - 10
  if (board.every(c => c !== null)) return 0

  if (isMax) {
    let best = -Infinity
    for (let i = 0; i < 9; i++) {
      if (!board[i]) { board[i] = 'O'; best = Math.max(best, minimax(board, depth+1, false)); board[i] = null }
    }
    return best
  } else {
    let best = Infinity
    for (let i = 0; i < 9; i++) {
      if (!board[i]) { board[i] = 'X'; best = Math.min(best, minimax(board, depth+1, true));  board[i] = null }
    }
    return best
  }
}

function getBestMove(board: Cell[]): number {
  let bestVal = -Infinity, bestMove = -1
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = 'O'
      const val = minimax(board, 0, false)
      board[i] = null
      if (val > bestVal) { bestVal = val; bestMove = i }
    }
  }
  return bestMove
}

// ── Deterministic particle positions ─────────────────────────────────────────

const PARTICLES = [
  { x:  8, y: 15, s: 3, d:  7.0, dl:  0.0, c: '#CC1133',              k: 1 },
  { x: 22, y: 68, s: 2, d: 10.0, dl: -2.1, c: 'rgba(255,255,255,0.55)', k: 2 },
  { x: 35, y: 42, s: 4, d:  6.0, dl: -4.5, c: '#B89132',              k: 3 },
  { x: 48, y: 82, s: 2, d:  9.0, dl: -1.2, c: '#CC1133',              k: 1 },
  { x: 58, y: 25, s: 3, d: 13.0, dl: -6.0, c: 'rgba(255,255,255,0.45)', k: 2 },
  { x: 72, y: 55, s: 2, d:  8.0, dl: -3.3, c: '#B89132',              k: 3 },
  { x: 85, y: 38, s: 4, d: 11.0, dl: -5.0, c: '#CC1133',              k: 1 },
  { x: 15, y: 88, s: 2, d:  7.5, dl: -0.8, c: 'rgba(255,255,255,0.35)', k: 2 },
  { x: 62, y: 72, s: 3, d:  9.5, dl: -2.9, c: '#B89132',              k: 3 },
  { x: 91, y: 18, s: 2, d: 12.0, dl: -7.0, c: '#CC1133',              k: 1 },
  { x: 44, y: 10, s: 3, d:  6.5, dl: -3.7, c: 'rgba(255,255,255,0.5)',  k: 2 },
  { x: 78, y: 90, s: 2, d: 14.0, dl: -1.5, c: '#B89132',              k: 3 },
  { x:  3, y: 52, s: 4, d:  8.5, dl: -5.2, c: '#CC1133',              k: 1 },
  { x: 55, y: 62, s: 2, d: 10.5, dl: -4.0, c: 'rgba(255,255,255,0.4)',  k: 2 },
  { x: 30, y: 30, s: 3, d:  7.0, dl: -6.5, c: '#B89132',              k: 3 },
  { x: 68, y: 85, s: 2, d:  9.0, dl: -1.8, c: '#CC1133',              k: 1 },
  { x: 18, y: 45, s: 3, d: 11.5, dl: -3.0, c: 'rgba(255,255,255,0.3)',  k: 3 },
  { x: 94, y: 65, s: 2, d:  8.0, dl: -5.8, c: '#B89132',              k: 2 },
] as const

// ── Component ─────────────────────────────────────────────────────────────────

interface HeroProps { loaderDone: boolean }

export default function Hero({ loaderDone }: HeroProps) {
  const sectionRef   = useRef<HTMLElement>(null)
  const metaRef      = useRef<HTMLDivElement>(null)
  const ruleRef      = useRef<HTMLDivElement>(null)
  const roleRef      = useRef<HTMLDivElement>(null)
  const statementRef = useRef<HTMLParagraphElement>(null)
  const gameRef      = useRef<HTMLDivElement>(null)
  const chromeRef    = useRef<HTMLDivElement>(null)

  // ── XOX state ──
  const [board, setBoard]           = useState<Cell[]>(Array(9).fill(null))
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [scores, setScores]         = useState({ player: 0, ai: 0 })

  const { winner, line: winLine } = checkWinner(board)
  const isDraw = !winner && board.every(c => c !== null)

  const handleCell = useCallback((i: number) => {
    if (board[i] || winner || !isPlayerTurn) return
    const next = [...board]
    next[i] = 'X'
    const result = checkWinner(next)
    if (result.winner) setScores(s => ({ ...s, player: s.player + 1 }))
    setBoard(next)
    setIsPlayerTurn(false)
  }, [board, winner, isPlayerTurn])

  // AI responds after 450ms
  useEffect(() => {
    if (isPlayerTurn || winner || isDraw) return
    const t = setTimeout(() => {
      const move = getBestMove([...board])
      if (move === -1) return
      const next = [...board]
      next[move] = 'O'
      const result = checkWinner(next)
      if (result.winner) setScores(s => ({ ...s, ai: s.ai + 1 }))
      setBoard(next)
      setIsPlayerTurn(true)
    }, 450)
    return () => clearTimeout(t)
  }, [board, isPlayerTurn, winner, isDraw])

  const handleRestart = useCallback(() => {
    setBoard(Array(9).fill(null))
    setIsPlayerTurn(true)
  }, [])

  // Auto-restart 1.5s after game ends
  useEffect(() => {
    if (!winner && !isDraw) return
    const t = setTimeout(handleRestart, 1500)
    return () => clearTimeout(t)
  }, [winner, isDraw, handleRestart])

  const status = winner
    ? (winner === 'X' ? 'KAZANDIN! 🎉' : 'AI KAZANDI')
    : isDraw    ? 'BERABERE'
    : isPlayerTurn ? 'SEN OYNUYORSUN'
    : 'AI DÜŞÜNÜYOR...'

  // ── GSAP: initial hidden states ──
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.set(metaRef.current,      { opacity: 0, y: -10 })
    gsap.set(ruleRef.current,      { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(roleRef.current,      { opacity: 0, y: 16 })
    gsap.set(statementRef.current, { opacity: 0, y: 12 })
    gsap.set(gameRef.current,      { opacity: 0, y: 20 })
  }, { scope: sectionRef, dependencies: [] })

  // ── GSAP: reveal after loader + setup Draggable ──
  useGSAP(() => {
    if (!loaderDone) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tl = gsap.timeline({ delay: 0.1 })
    tl.to(metaRef.current,      { opacity: 1, y: 0,      duration: 0.65, ease: 'power2.out' })
    tl.to(ruleRef.current,      { scaleX: 1,             duration: 0.65, ease: 'power2.out' }, '-=0.2')
    tl.to(roleRef.current,      { opacity: 1, y: 0,      duration: 0.55, ease: 'power2.out' }, '-=0.35')
    tl.to(statementRef.current, { opacity: 1, y: 0,      duration: 0.5,  ease: 'power2.out' }, '-=0.2')
    tl.to(gameRef.current,      { opacity: 1, y: 0,      duration: 0.6,  ease: 'power3.out' }, '-=0.1')

    if (gameRef.current && chromeRef.current && sectionRef.current) {
      Draggable.create(gameRef.current, {
        type:          'x,y',
        bounds:        sectionRef.current,
        trigger:       chromeRef.current,
        cursor:        'grab',
        activeCursor:  'grabbing',
      })
    }
  }, { scope: sectionRef, dependencies: [loaderDone] })

  return (
    <section
      ref={sectionRef}
      className={styles.hero}
      data-theme="dark"
      id="hero"
      aria-label="Introduction"
    >
      {/* Ambient layers */}
      <div className={styles.aurora}    aria-hidden="true" />
      <div className={styles.grid}      aria-hidden="true" />
      <div className={styles.ring}      aria-hidden="true" />
      <div className={styles.particles} aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={`${styles.particle} ${styles[`pk${p.k}` as 'pk1'|'pk2'|'pk3']}`}
            style={{
              left:              `${p.x}%`,
              top:               `${p.y}%`,
              width:             `${p.s}px`,
              height:            `${p.s}px`,
              background:        p.c,
              boxShadow:         `0 0 ${p.s * 4}px ${Math.ceil(p.s / 2)}px ${p.c}`,
              animationDuration: `${p.d}s`,
              animationDelay:    `${p.dl}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Main content */}
      <div className={styles.inner}>
        <div ref={metaRef} className={styles.topRow}>
          <span className={styles.label}>İSTANBUL, TÜRKİYE</span>
        </div>

        <div className={styles.spacer} aria-hidden="true" />

        <div className={styles.nameBlock}>
          <div className={styles.nameLine}>ÜZEYİR</div>
          <div className={styles.nameLine}>ÖĞÜR</div>
        </div>

        <div ref={ruleRef} className={styles.rule} aria-hidden="true" />

        <div ref={roleRef} className={styles.roleBlock}>
          <span className={styles.roleItem}>Full Stack .NET Developer</span>
          <span className={styles.roleSep} aria-hidden="true">/</span>
          <span className={styles.roleItem}>Bilgisayar Mühendisi</span>
        </div>

        <p ref={statementRef} className={styles.statement}>
          Gerçek iş problemleri için web tabanlı sistemler geliştiriyorum.
        </p>
      </div>

      {/* ── XOX Floating Game Panel ── */}
      <div ref={gameRef} className={styles.gamePanel} role="application" aria-label="XOX — Sen vs AI">

        {/* Window chrome — drag handle only */}
        <div ref={chromeRef} className={styles.chrome}>
          <div className={styles.chromeDots}>
            <span data-c="r" /><span data-c="y" /><span data-c="g" />
          </div>
          <span className={styles.chromeTitle}>XOX.EXE — SEN vs AI</span>
          <span className={styles.chromeHint}>SÜRÜKLE</span>
        </div>

        {/* Status */}
        <div className={styles.gameStatus}>
          <span className={styles.gameStatusLabel}>STATUS</span>
          <span className={`${styles.gameStatusVal} ${winner ? (winner === 'X' ? styles.statusWinPlayer : styles.statusWinAi) : ''}`}>
            {status}
          </span>
        </div>

        {/* Board */}
        <div className={styles.board} role="grid" aria-label="Oyun tahtası">
          {board.map((cell, i) => (
            <button
              key={i}
              className={`${styles.cell} ${winLine?.includes(i) ? styles.cellWin : ''}`}
              onClick={() => handleCell(i)}
              disabled={!!cell || !!winner || !isPlayerTurn}
              aria-label={`Hücre ${i + 1}: ${cell ?? 'boş'}`}
            >
              {cell && <span className={styles.mark} data-mark={cell}>{cell}</span>}
            </button>
          ))}
        </div>

        {/* Footer: score + restart */}
        <div className={styles.gameFooter}>
          <div className={styles.scores}>
            <span className={styles.scoreLabel}>SEN</span>
            <span className={styles.scoreVal}>{scores.player}</span>
            <span className={styles.scoreSep}>/</span>
            <span className={styles.scoreVal}>{scores.ai}</span>
            <span className={styles.scoreLabel}>AI</span>
          </div>
          <button className={styles.restartBtn} onClick={handleRestart} aria-label="Yeniden başlat">
            ↺ YENİDEN
          </button>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollLine} />
      </div>
    </section>
  )
}
