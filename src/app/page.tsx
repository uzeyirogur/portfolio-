'use client'

import { useState, useCallback } from 'react'
import Loader from '@/components/Loader'
import Hero from '@/components/sections/Hero'
import Ticker from '@/components/sections/Ticker'
import Work from '@/components/sections/Work'
import Statement from '@/components/sections/Statement'
import Stack from '@/components/sections/Stack'
import Experience from '@/components/sections/Experience'
import Contact from '@/components/sections/Contact'

export default function HomePage() {
  const [loaderDone, setLoaderDone] = useState(false)

  const handleLoaderComplete = useCallback(() => {
    setLoaderDone(true)
  }, [])

  return (
    <>
      {!loaderDone && <Loader onComplete={handleLoaderComplete} />}
      <main>
        <Hero loaderDone={loaderDone} />
        <Ticker />
        <Work />
        <Statement />
        <Stack />
        <Experience />
        <Contact />
      </main>
    </>
  )
}
