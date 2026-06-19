import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Education from '@/components/sections/Education'
import Contact from '@/components/sections/Contact'
import CursorGlow from '@/components/ui/CursorGlow'

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--bg-base)' }}>
      <div className="noise-overlay" aria-hidden />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
