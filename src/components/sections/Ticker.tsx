'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import styles from './Ticker.module.scss'

const ITEMS = [
  'FULL STACK .NET DEVELOPER',
  'COMPUTER ENGINEER',
  'ISTANBUL, TR',
  'OPEN TO WORK',
  '.NET 8',
  'NEXT.JS 15',
  'REACT 19',
  'TYPESCRIPT',
  'POSTGRESQL',
  'AZURE',
  'DOCKER',
  'GIT',
]

// One copy of all ticker items — rendered twice for seamless loop
function TickerCopy({ hidden }: { hidden?: boolean }) {
  return (
    <span className={styles.copy} aria-hidden={hidden || undefined}>
      {ITEMS.map((item, i) => (
        <span key={i} className={styles.group}>
          <span className={styles.item}>{item}</span>
          <span className={styles.sep} aria-hidden="true">—</span>
        </span>
      ))}
    </span>
  )
}

export default function Ticker() {
  const tickerRef = useRef<HTMLDivElement>(null)
  const trackRef  = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const track = trackRef.current
    if (!track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // track contains 2 identical copies — animate one full copy width for seamless loop
    const singleWidth = track.scrollWidth / 2

    gsap.to(track, {
      x: -singleWidth,
      duration: 32,
      ease: 'none',
      repeat: -1,
    })
  }, { scope: tickerRef })

  return (
    <div
      ref={tickerRef}
      className={styles.ticker}
      data-theme="dark"
      aria-label="Technology stack and availability"
    >
      <div ref={trackRef} className={styles.track}>
        <TickerCopy />
        <TickerCopy hidden />
      </div>
    </div>
  )
}
