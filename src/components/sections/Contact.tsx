'use client'

import { useRef, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/scripts/gsap'
import styles from './Contact.module.scss'

const EMAIL  = 'uzeyirogur52@outlook.com'
const GITHUB = 'https://github.com/uzeyirogur'

export default function Contact() {
  const sectionRef  = useRef<HTMLElement>(null)
  const labelRowRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const availRef    = useRef<HTMLParagraphElement>(null)
  const emailRef    = useRef<HTMLAnchorElement>(null)
  const fillRef     = useRef<HTMLSpanElement>(null)
  const footerRef   = useRef<HTMLDivElement>(null)

  // Liquid fill on email hover
  const onEmailEnter = useCallback(() => {
    gsap.to(fillRef.current, { scaleX: 1, duration: 0.45, ease: 'power3.out', transformOrigin: 'left center' })
    gsap.to(emailRef.current, { color: '#09090C', duration: 0.45 })
  }, [])
  const onEmailLeave = useCallback(() => {
    gsap.to(fillRef.current, { scaleX: 0, duration: 0.38, ease: 'power3.in', transformOrigin: 'right center' })
    gsap.to(emailRef.current, { color: '', duration: 0.38 })
  }, [])

  useGSAP(() => {
    if (!sectionRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Set fill initial state
    gsap.set(fillRef.current, { scaleX: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 72%',
        once: true,
      },
    })

    tl.fromTo(labelRowRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 0
    )
    tl.fromTo(headlineRef.current,
      { clipPath: 'inset(0 0 100% 0)' },
      { clipPath: 'inset(0 0 0% 0)', duration: 1.0, ease: 'power3.out' }, 0.15
    )
    tl.fromTo(availRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.7
    )
    tl.fromTo(emailRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.9
    )
    tl.fromTo(footerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' }, 1.2
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className={styles.contact}
      data-theme="dark"
      id="contact"
      aria-label="İletişim"
    >
      {/* Ambient background layers */}
      <div className={styles.orb}     aria-hidden="true" />
      <div className={styles.rings}   aria-hidden="true" />
      <div className={styles.bgWord}  aria-hidden="true">LET&apos;S<br />TALK</div>

      <div className={styles.inner}>

        <div ref={labelRowRef} className={styles.labelRow}>
          <span className={styles.label}>İLETİŞİM</span>
          <div className={styles.labelRule} aria-hidden="true" />
          <span className={styles.labelIndex}>05</span>
        </div>

        <div className={styles.ctaBlock}>
          <h2 ref={headlineRef} className={styles.headline}>
            Gerçek bir<br />sistemi birlikte<br />hayata geçirelim.
          </h2>

          <p ref={availRef} className={styles.availability}>
            <span className={styles.dot} aria-hidden="true" />
            İŞ GÜCÜNE AÇIĞIM — İSTANBUL, TÜRKİYE
          </p>

          <a
            ref={emailRef}
            href={`mailto:${EMAIL}`}
            className={styles.email}
            onMouseEnter={onEmailEnter}
            onMouseLeave={onEmailLeave}
            aria-label={`${EMAIL} adresine e-posta gönder`}
          >
            <span ref={fillRef} className={styles.emailFill} aria-hidden="true" />
            <span className={styles.emailArrow} aria-hidden="true">→</span>
            <span className={styles.emailText}>{EMAIL}</span>
          </a>
        </div>

        <footer ref={footerRef} className={styles.footer}>
          <div className={styles.footerLeft}>
            <span className={styles.footerName}>ÜZEYİR ÖĞÜR</span>
            <span className={styles.footerRole}>Full Stack .NET Developer · Bilgisayar Mühendisi</span>
          </div>

          <div className={styles.footerLinks}>
            <a href={GITHUB} className={styles.footerLink} target="_blank" rel="noopener noreferrer">GITHUB ↗</a>
            <a href={`mailto:${EMAIL}`} className={styles.footerLink}>E-POSTA ↗</a>
          </div>

          <span className={styles.footerCopy}>© 2026</span>
        </footer>

      </div>
    </section>
  )
}
