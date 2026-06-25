import type { Metadata } from 'next'
import { siteConfig } from '@/data/site'
import Providers from '@/components/Providers'
import CursorGlow from '@/components/ui/CursorGlow'

// Fonts via @fontsource — self-hosted, no external requests
import '@fontsource/syne/700.css'
import '@fontsource/syne/800.css'
import '@fontsource/fraunces/300-italic.css'
import '@fontsource/fraunces/400.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'

// Lenis CSS (required for correct scroll behavior)
import 'lenis/dist/lenis.css'

// Global styles
import '../styles/global.scss'

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <CursorGlow />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
