'use client'

import { useEffect, useRef } from 'react'
import styles from './CursorGlow.module.scss'

export default function CursorGlow() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // only on fine-pointer (mouse) devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let x = -100, y = -100
    let rx = -100, ry = -100
    let isPointer = false

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY

      const target = e.target as Element
      const hover  = !!target?.closest('a, button, [role="button"], [tabindex]')
      if (hover !== isPointer) {
        isPointer = hover
        ringRef.current?.classList.toggle(styles.hovered, hover)
        dotRef.current?.classList.toggle(styles.hovered, hover)
      }
    }

    const onEnter = () => {
      dotRef.current?.classList.add(styles.visible)
      ringRef.current?.classList.add(styles.visible)
    }
    const onLeave = () => {
      dotRef.current?.classList.remove(styles.visible)
      ringRef.current?.classList.remove(styles.visible)
    }

    document.addEventListener('mousemove',  onMove,  { passive: true })
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseleave', onLeave)

    let raf: number
    const tick = () => {
      // dot: instant
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`
      }
      // ring: lerp (lag effect)
      rx += (x - rx) * 0.14
      ry += (y - ry) * 0.14
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className={styles.dot}  aria-hidden="true" />
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
    </>
  )
}
