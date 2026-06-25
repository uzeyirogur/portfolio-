'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import Nav from './Nav'
import Cursor from './Cursor'
import { ScrollTrigger } from '@/scripts/gsap'

function Grain() {
  return <div className="grain" aria-hidden="true" />
}

// Keeps GSAP ScrollTrigger in sync with Lenis on every scroll frame.
// Required for ScrollTrigger.pin to work correctly with Lenis smooth scroll.
function ScrollSync() {
  useLenis(() => { ScrollTrigger.update() })
  return null
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      <ScrollSync />
      <Grain />
      <Nav />
      <Cursor />
      {children}
    </ReactLenis>
  )
}
