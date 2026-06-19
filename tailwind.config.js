/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        sans:    ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glow-cyan':     '0 0 24px rgba(34,211,238,0.15), 0 0 48px rgba(34,211,238,0.05)',
        'glow-cyan-sm':  '0 0 12px rgba(34,211,238,0.12)',
        'card':          '0 1px 3px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
        'card-hover':    '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08), 0 0 20px rgba(34,211,238,0.06)',
        'glow-amber':    '0 0 30px rgba(245,158,11,0.2)',
        'glow-amber-sm': '0 0 16px rgba(245,158,11,0.3)',
      },
      keyframes: {
        float:       { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        'pulse-slow':{ '0%,100%': { opacity: '0.4' }, '50%': { opacity: '1' } },
        slideUp:     { '0%': { transform: 'translateY(24px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        fadeIn:      { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        gradientX:   { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
      },
      animation: {
        float:       'float 6s ease-in-out infinite',
        'pulse-slow':'pulse-slow 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'slide-up':  'slideUp 0.6s ease-out forwards',
        'fade-in':   'fadeIn 0.5s ease-out forwards',
        'gradient-x':'gradientX 6s ease infinite',
      },
    },
  },
  plugins: [],
}
