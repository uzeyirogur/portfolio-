'use client'

import { useRef } from 'react'
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
  const footerRef   = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

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
      { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.out' }, 0.15
    )
    tl.fromTo(availRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.65
    )
    tl.fromTo(emailRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }, 0.82
    )
    tl.fromTo(footerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' }, 1.1
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
      <div className={styles.inner}>

        {/* Etiket satırı */}
        <div ref={labelRowRef} className={styles.labelRow}>
          <span className={styles.label}>İLETİŞİM</span>
          <div className={styles.labelRule} aria-hidden="true" />
          <span className={styles.labelIndex}>06</span>
        </div>

        {/* Ana CTA bloğu */}
        <div className={styles.ctaBlock}>
          <h2 ref={headlineRef} className={styles.headline}>
            Gerçek bir<br />sistemi birlikte<br />hayata geçirelim.
          </h2>

          <p ref={availRef} className={styles.availability}>
            İŞ GÜCÜNE AÇIĞIM&nbsp;—&nbsp;İSTANBUL, TÜRKİYE
          </p>

          <p className={styles.subtext}>
            Yeni bir proje, iş birliği veya fikir için ulaşabilirsin.
          </p>

          <a
            ref={emailRef}
            href={`mailto:${EMAIL}`}
            className={styles.email}
            aria-label={`${EMAIL} adresine e-posta gönder`}
          >
            <span className={styles.emailArrow} aria-hidden="true">→</span>
            {EMAIL}
          </a>
        </div>

        {/* Footer */}
        <footer ref={footerRef} className={styles.footer}>
          <div className={styles.footerLeft}>
            <span className={styles.footerName}>ÜZEYİR ÖĞÜR</span>
            <span className={styles.footerRole}>Full Stack .NET Developer · Bilgisayar Mühendisi</span>
          </div>

          <div className={styles.footerLinks}>
            <a
              href={GITHUB}
              className={styles.footerLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profili"
            >
              GITHUB ↗
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className={styles.footerLink}
              aria-label="E-posta gönder"
            >
              E-POSTA ↗
            </a>
          </div>

          <span className={styles.footerCopy}>© {new Date().getFullYear()}</span>
        </footer>

      </div>
    </section>
  )
}
