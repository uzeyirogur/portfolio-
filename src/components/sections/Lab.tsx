'use client'

import { useRef, useState, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, Draggable } from '@/scripts/gsap'
import styles from './Lab.module.scss'

// ── XOX game logic ────────────────────────────────────────────────────────────

type Cell = 'X' | 'O' | null

const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6],             // diagonals
]

function checkWinner(board: Cell[]): { winner: Cell; line: number[] | null } {
  for (const line of WIN_LINES) {
    const [a, b, c] = line
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line }
    }
  }
  return { winner: null, line: null }
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Lab() {
  const sectionRef = useRef<HTMLElement>(null)
  const panelRef   = useRef<HTMLDivElement>(null)
  const labelRef   = useRef<HTMLDivElement>(null)

  const [board, setBoard]   = useState<Cell[]>(Array(9).fill(null))
  const [isX, setIsX]       = useState(true)
  const [scores, setScores] = useState({ X: 0, O: 0 })

  const { winner, line: winLine } = checkWinner(board)
  const isDraw = !winner && board.every(c => c !== null)

  const handleCell = useCallback((index: number) => {
    if (board[index] || winner) return
    const next = [...board]
    next[index] = isX ? 'X' : 'O'
    const result = checkWinner(next)
    if (result.winner) {
      setScores(s => ({ ...s, [result.winner as string]: s[result.winner as 'X' | 'O'] + 1 }))
    }
    setBoard(next)
    setIsX(x => !x)
  }, [board, winner, isX])

  const handleRestart = useCallback(() => {
    setBoard(Array(9).fill(null))
    setIsX(true)
  }, [])

  // GSAP: section reveal + Draggable
  useGSAP(() => {
    if (!sectionRef.current || !panelRef.current) return

    // Label reveal
    gsap.fromTo(labelRef.current,
      { opacity: 0, y: 14 },
      {
        opacity: 1, y: 0, duration: 0.55, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
      }
    )

    // Panel entrance
    gsap.fromTo(panelRef.current,
      { opacity: 0, scale: 0.92, y: 24 },
      {
        opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true },
      }
    )

    // Make panel draggable
    Draggable.create(panelRef.current, {
      type: 'x,y',
      bounds: sectionRef.current,
      cursor: 'grab',
      activeCursor: 'grabbing',
    })
  }, { scope: sectionRef })

  const status = winner
    ? `${winner} KAZANDI`
    : isDraw
    ? 'BERABERE'
    : `${isX ? 'X' : 'O'} OYNUYOR`

  return (
    <section
      ref={sectionRef}
      className={styles.lab}
      data-theme="dark"
      id="lab"
      aria-label="Mini Lab — İnteraktif"
    >
      {/* Background atmosphere */}
      <div className={styles.bgText} aria-hidden="true">
        <span className={styles.bgWord}>LAB</span>
      </div>

      <div className={styles.inner}>

        {/* Label row */}
        <div ref={labelRef} className={styles.labelRow}>
          <span className={styles.label}>MİNİ LAB</span>
          <div className={styles.labelRule} aria-hidden="true" />
          <span className={styles.labelIndex}>05</span>
        </div>

        {/* Draggable panel */}
        <div ref={panelRef} className={styles.panel} role="application" aria-label="XOX game">

          {/* Window chrome */}
          <div className={styles.chrome} aria-hidden="true">
            <div className={styles.dots}>
              <span className={styles.dot} data-color="red" />
              <span className={styles.dot} data-color="yellow" />
              <span className={styles.dot} data-color="green" />
            </div>
            <span className={styles.chromeTitle}>MİNİ LAB — XOX.EXE</span>
            <span className={styles.hint}>SÜRÜKLE</span>
          </div>

          {/* Game area */}
          <div className={styles.gameArea}>

            {/* Status bar */}
            <div className={styles.statusBar}>
              <span className={styles.statusLabel}>STATUS</span>
              <span className={`${styles.statusValue} ${winner ? styles.statusWin : ''}`}>
                {status}
              </span>
            </div>

            {/* Board */}
            <div
              className={styles.board}
              role="grid"
              aria-label="Game board"
            >
              {board.map((cell, i) => (
                <button
                  key={i}
                  className={`${styles.cell} ${winLine?.includes(i) ? styles.cellWin : ''}`}
                  onClick={() => handleCell(i)}
                  aria-label={`Cell ${i + 1}: ${cell ?? 'empty'}`}
                  disabled={!!cell || !!winner}
                >
                  {cell && (
                    <span className={styles.mark} data-mark={cell}>
                      {cell}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Score + restart */}
            <div className={styles.footer}>
              <div className={styles.scores}>
                <span className={styles.scoreLabel}>X</span>
                <span className={styles.scoreValue}>{scores.X}</span>
                <span className={styles.scoreSep}>/</span>
                <span className={styles.scoreValue}>{scores.O}</span>
                <span className={styles.scoreLabel}>O</span>
              </div>

              <button
                className={styles.restartBtn}
                onClick={handleRestart}
                aria-label="Oyunu yeniden başlat"
              >
                ↺ YENİDEN
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
