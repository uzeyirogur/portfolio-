'use client'

import { useEffect, useRef } from 'react'
import styles from './Cursor.module.scss'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only activate on pointer:fine devices (desktop)
    if (!window.matchMedia('(pointer: fine)').matches) return

    const cursor = cursorRef.current
    if (!cursor) return

    const label = cursor.querySelector(`.${styles.cursorLabel}`) as HTMLSpanElement | null

    // Lerp position tracking
    const pos   = { x: -100, y: -100 }
    const mouse = { x: -100, y: -100 }
    let rafId: number

    const loop = () => {
      pos.x += (mouse.x - pos.x) * 0.12
      pos.y += (mouse.y - pos.y) * 0.12
      // Two chained transforms: move to mouse position then self-center
      cursor.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`
      rafId = requestAnimationFrame(loop)
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      cursor.classList.add(styles.cursorVisible)
    }

    const onMouseOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('a, button, [data-cursor-label]')
      if (el) {
        cursor.classList.add(styles.cursorHover)
        if (label) label.textContent = el.getAttribute('data-cursor-label') || ''
      }
    }

    // Use relatedTarget: only deactivate when the mouse is heading to a
    // non-interactive area (avoids flicker when crossing child elements inside a link)
    const onMouseOut = (e: MouseEvent) => {
      const goingTo = e.relatedTarget as HTMLElement | null
      if (!goingTo?.closest('a, button, [data-cursor-label]')) {
        cursor.classList.remove(styles.cursorHover)
        if (label) label.textContent = ''
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div ref={cursorRef} className={styles.cursor} aria-hidden="true">
      <span className={styles.cursorLabel} />
    </div>
  )
}
