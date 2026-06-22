'use client'
import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.innerWidth < 1024) return

    document.body.classList.add('custom-cursor')

    const s = { mx: -999, my: -999, rx: -999, ry: -999, hovering: false }

    const onMove = (e: MouseEvent) => { s.mx = e.clientX; s.my = e.clientY }
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      s.hovering = !!el.closest('a,button,[role="button"],input,textarea,select,[tabindex]')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    let raf: number

    const tick = () => {
      const { mx, my, hovering } = s

      if (dotRef.current && mx !== -999) {
        dotRef.current.style.transform = `translate3d(${mx - 5}px,${my - 5}px,0)`
        dotRef.current.style.opacity = '1'
      }

      s.rx = lerp(s.rx, mx, 0.12)
      s.ry = lerp(s.ry, my, 0.12)

      if (ringRef.current && mx !== -999) {
        const size = hovering ? 56 : 36
        ringRef.current.style.transform = `translate3d(${s.rx - size / 2}px,${s.ry - size / 2}px,0)`
        ringRef.current.style.width  = `${size}px`
        ringRef.current.style.height = `${size}px`
        ringRef.current.style.borderColor = hovering ? 'rgba(34,211,238,0.9)' : 'rgba(34,211,238,0.45)'
        ringRef.current.style.boxShadow   = hovering
          ? '0 0 24px rgba(34,211,238,0.3), inset 0 0 10px rgba(34,211,238,0.08)'
          : '0 0 10px rgba(34,211,238,0.12)'
      }

      if (glowRef.current && mx !== -999) {
        glowRef.current.style.background = `radial-gradient(circle 500px at ${mx}px ${my}px, rgba(34,211,238,0.05) 0%, transparent 100%)`
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.body.classList.remove('custom-cursor')
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          width: 10, height: 10,
          background: '#22D3EE',
          boxShadow: '0 0 14px rgba(34,211,238,1), 0 0 5px rgba(34,211,238,1)',
          willChange: 'transform',
          opacity: 0,
          transition: 'opacity 0.2s',
        }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full"
        style={{
          border: '1.5px solid rgba(34,211,238,0.45)',
          willChange: 'transform',
          transition: 'width 0.22s ease, height 0.22s ease, border-color 0.15s, box-shadow 0.15s',
        }}
      />
      <div
        ref={glowRef}
        className="pointer-events-none fixed inset-0 z-[1]"
        aria-hidden
      />
    </>
  )
}
