'use client'

import { useEffect, useRef } from 'react'
import styles from './ScrollProgress.module.scss'

export default function ScrollProgress() {
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf: number
    const update = () => {
      const el  = document.documentElement
      const pct = el.scrollTop / (el.scrollHeight - el.clientHeight)
      if (lineRef.current) {
        lineRef.current.style.transform = `scaleY(${Math.min(pct, 1)})`
      }
      raf = requestAnimationFrame(update)
    }
    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className={styles.track} aria-hidden="true">
      <div ref={lineRef} className={styles.fill} />
    </div>
  )
}
