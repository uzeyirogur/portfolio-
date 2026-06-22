'use client'

import React from 'react'

// ─── Finance Dashboard — ParamNet ─────────────────────────────────────────────
function ParamNetMockup() {
  const bars = [38, 52, 42, 68, 55, 80, 62, 88, 72, 94, 80, 100]
  return (
    <div style={{ padding: 16, fontFamily: 'var(--font-mono)', height: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 8, letterSpacing: '0.22em', color: '#22D3EE', opacity: 0.75 }}>PARAMNET</span>
        <span style={{ fontSize: 7, color: '#34D399', display: 'flex', alignItems: 'center', gap: 3 }}>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#34D399', display: 'inline-block', boxShadow: '0 0 4px #34D399' }} />
          LIVE
        </span>
      </div>

      {/* Balance hero */}
      <div style={{ background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.12)', borderRadius: 10, padding: '10px 12px' }}>
        <div style={{ fontSize: 7, color: 'rgba(148,163,184,0.45)', marginBottom: 3, letterSpacing: '0.12em' }}>TOPLAM VARLIK</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#EEF2F8', letterSpacing: '-0.04em', fontFamily: 'var(--font-display)', lineHeight: 1 }}>₺ 47,832</div>
        <div style={{ fontSize: 8, color: '#34D399', marginTop: 3 }}>▲ +12.4%  bu ay</div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
        {[
          { label: 'GELİR', value: '₺12,400', color: '#34D399', bg: 'rgba(52,211,153,0.06)', border: 'rgba(52,211,153,0.12)' },
          { label: 'GİDER',  value: '₺8,200',  color: '#F87171', bg: 'rgba(248,113,113,0.05)', border: 'rgba(248,113,113,0.1)' },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 8, padding: '7px 10px' }}>
            <div style={{ fontSize: 7, color: 'rgba(148,163,184,0.4)', marginBottom: 2, letterSpacing: '0.1em' }}>{s.label}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: s.color, fontFamily: 'var(--font-display)' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Mini chart */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 40 }}>
          {bars.map((h, i) => (
            <div key={i} style={{
              flex: 1, height: `${h}%`, borderRadius: '2px 2px 0 0',
              background: i === bars.length - 1 ? '#22D3EE' : `rgba(34,211,238,${0.1 + i * 0.018})`,
              boxShadow: i === bars.length - 1 ? '0 0 10px rgba(34,211,238,0.7)' : 'none',
            }} />
          ))}
        </div>
        <div style={{ height: 1, background: 'rgba(34,211,238,0.1)', margin: '4px 0' }} />
        <div style={{ display: 'flex', gap: 4 }}>
          {['TL', 'EUR', 'USD', 'ALTIN'].map(c => (
            <span key={c} style={{ fontSize: 7, padding: '2px 5px', borderRadius: 3, background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.14)', color: 'rgba(34,211,238,0.65)', letterSpacing: '0.08em' }}>{c}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Sports School Management — AnkaVM ───────────────────────────────────────
function AnkaMockup() {
  const students = [
    { name: 'Ahmet K.',  sport: 'Basketball', ok: true  },
    { name: 'Zeynep M.', sport: 'Volleyball', ok: true  },
    { name: 'Can B.',    sport: 'Gymnastics', ok: false },
    { name: 'Selin A.', sport: 'Basketball', ok: true  },
  ]
  return (
    <div style={{ padding: 16, fontFamily: 'var(--font-mono)', height: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 8, letterSpacing: '0.2em', color: '#818CF8', opacity: 0.85 }}>ANKA SPORTS</span>
        <span style={{ fontSize: 7, color: 'rgba(148,163,184,0.4)' }}>34 şube</span>
      </div>

      {/* Member hero */}
      <div style={{ background: 'rgba(129,140,248,0.06)', border: '1px solid rgba(129,140,248,0.13)', borderRadius: 10, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div>
          <div style={{ fontSize: 7, color: 'rgba(148,163,184,0.4)', marginBottom: 2 }}>AKTİF ÜYE</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#EEF2F8', fontFamily: 'var(--font-display)', lineHeight: 1 }}>847</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ height: 4, background: 'rgba(129,140,248,0.12)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ width: '84.7%', height: '100%', background: '#818CF8', borderRadius: 2, boxShadow: '0 0 8px rgba(129,140,248,0.55)' }} />
          </div>
          <div style={{ fontSize: 7, color: 'rgba(148,163,184,0.35)', marginTop: 3 }}>84.7% kapasite</div>
        </div>
      </div>

      {/* Student rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
        {students.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '5px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.022)', border: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', flexShrink: 0, background: s.ok ? '#34D399' : '#F59E0B', boxShadow: `0 0 5px ${s.ok ? '#34D399' : '#F59E0B'}` }} />
            <span style={{ flex: 1, fontSize: 9, color: 'rgba(238,242,248,0.7)' }}>{s.name}</span>
            <span style={{ fontSize: 8, color: 'rgba(148,163,184,0.4)' }}>{s.sport}</span>
            <span style={{ fontSize: 9, color: s.ok ? '#34D399' : '#F59E0B' }}>{s.ok ? '✓' : '⚠'}</span>
          </div>
        ))}
      </div>

      {/* Payment summary */}
      <div style={{ padding: '7px 10px', background: 'rgba(129,140,248,0.04)', borderRadius: 6, border: '1px solid rgba(129,140,248,0.08)', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 8, color: '#34D399' }}>₺42,350 tahsil</span>
        <span style={{ fontSize: 8, color: '#F59E0B' }}>₺2,100 bekliyor</span>
      </div>
    </div>
  )
}

// ─── Gold Price Tracker ───────────────────────────────────────────────────────
function GoldMockup() {
  const firms = [
    { name: 'Firma A', price: '₺3,842', up: true,  change: '+2.1%' },
    { name: 'Firma B', price: '₺3,836', up: false, change: '-0.4%' },
    { name: 'Firma C', price: '₺3,855', up: true,  change: '+1.8%' },
  ]
  const pts = 'M0,58 C18,52 36,66 54,50 S90,26 108,36 S144,18 162,14 S198,22 216,17'

  return (
    <div style={{ padding: 16, fontFamily: 'var(--font-mono)', height: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 8, letterSpacing: '0.2em', color: '#F59E0B', opacity: 0.9 }}>GOLD TRACKER</span>
        <span style={{ fontSize: 7, color: 'rgba(148,163,184,0.35)' }}>↻ 5 dk</span>
      </div>

      {/* Gold hero */}
      <div style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 10, padding: '10px 12px' }}>
        <div style={{ fontSize: 7, color: 'rgba(148,163,184,0.4)', marginBottom: 2 }}>ALTIN (GRAM)</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#EEF2F8', letterSpacing: '-0.04em', fontFamily: 'var(--font-display)', lineHeight: 1 }}>₺ 3,842</div>
          <div style={{ fontSize: 9, color: '#34D399' }}>▲ +2.1%</div>
        </div>
      </div>

      {/* Sparkline */}
      <div style={{ height: 48, position: 'relative' }}>
        <svg viewBox="0 0 216 70" style={{ width: '100%', height: '100%' }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="gGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${pts} V70 H0 Z`} fill="url(#gGrad)" />
          <path d={pts} fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Company comparison */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
        {firms.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '5px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.02)' }}>
            <span style={{ flex: 1, fontSize: 9, color: 'rgba(148,163,184,0.55)' }}>{f.name}</span>
            <span style={{ fontSize: 10, color: 'rgba(238,242,248,0.85)', fontWeight: 600 }}>{f.price}</span>
            <span style={{ fontSize: 8, color: f.up ? '#34D399' : '#F87171', minWidth: 36, textAlign: 'right' }}>{f.up ? '▲' : '▼'} {f.change}</span>
          </div>
        ))}
      </div>

      {/* Product chips */}
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {['Gram', 'Çeyrek', 'Yarım', 'Tam', 'Cumhuriyet'].map(c => (
          <span key={c} style={{ fontSize: 7, padding: '2px 5px', borderRadius: 3, background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.14)', color: 'rgba(245,158,11,0.7)' }}>{c}</span>
        ))}
      </div>
    </div>
  )
}

// ─── Vehicle Inventory System ─────────────────────────────────────────────────
function VehicleMockup() {
  return (
    <div style={{ padding: 16, fontFamily: 'var(--font-mono)', height: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 8, letterSpacing: '0.2em', color: '#34D399', opacity: 0.9 }}>VEHICLE SYS</span>
        <span style={{ fontSize: 7, color: '#34D399', display: 'flex', alignItems: 'center', gap: 3 }}>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#34D399', display: 'inline-block', boxShadow: '0 0 4px #34D399' }} />
          12 active
        </span>
      </div>

      {/* Vehicle card */}
      <div style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.13)', borderRadius: 10, padding: '10px 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
          <div>
            <div style={{ fontSize: 7, color: 'rgba(148,163,184,0.4)', marginBottom: 2 }}>ARAÇ PLAKA</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#EEF2F8', fontFamily: 'var(--font-display)', lineHeight: 1 }}>06 ABC 123</div>
            <div style={{ fontSize: 8, color: 'rgba(148,163,184,0.45)', marginTop: 2 }}>BMW 3 Series · 2022</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 7, color: 'rgba(148,163,184,0.35)' }}>KM</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#34D399', fontFamily: 'var(--font-display)' }}>47,382</div>
          </div>
        </div>
        <div style={{ height: 3, background: 'rgba(52,211,153,0.1)', borderRadius: 2 }}>
          <div style={{ width: '62%', height: '100%', background: '#34D399', borderRadius: 2, boxShadow: '0 0 6px rgba(52,211,153,0.6)' }} />
        </div>
        <div style={{ fontSize: 7, color: 'rgba(148,163,184,0.3)', marginTop: 2 }}>62% / 75,000 km limit</div>
      </div>

      {/* Driver + trip */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
        {[
          { label: 'ŞOFÖR',    line1: 'Mehmet Y.', line2: '+90 532 ···' },
          { label: 'SEYAHAT', line1: 'Ankara →',  line2: 'İstanbul', ok: true },
        ].map(s => (
          <div key={s.label} style={{ background: 'rgba(255,255,255,0.022)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, padding: '7px 10px' }}>
            <div style={{ fontSize: 7, color: 'rgba(148,163,184,0.35)', marginBottom: 3 }}>{s.label}</div>
            <div style={{ fontSize: 9, color: 'rgba(238,242,248,0.75)' }}>{s.line1}</div>
            <div style={{ fontSize: 8, color: s.ok ? '#34D399' : 'rgba(148,163,184,0.35)', marginTop: 1 }}>{s.line2}</div>
          </div>
        ))}
      </div>

      {/* Maintenance alert */}
      <div style={{ padding: '7px 10px', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.12)', borderRadius: 7, display: 'flex', alignItems: 'center', gap: 7 }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#F59E0B', boxShadow: '0 0 5px #F59E0B', flexShrink: 0 }} />
        <span style={{ fontSize: 8, color: 'rgba(245,158,11,0.85)', flex: 1 }}>Bakım 3 gün içinde gerekli</span>
        <span style={{ fontSize: 7, color: 'rgba(148,163,184,0.3)' }}>Motor yağı</span>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
        {[['12', 'araç'], ['3', 'seyahat'], ['1', 'bakım']].map(([v, l]) => (
          <div key={l} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#EEF2F8', fontFamily: 'var(--font-display)', lineHeight: 1 }}>{v}</div>
            <div style={{ fontSize: 7, color: 'rgba(148,163,184,0.35)', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Ticket System ────────────────────────────────────────────────────────────
function TicketMockup() {
  const tickets = [
    { id: '#TK-2847', title: 'SQL Connection Timeout', p: 'HIGH', pColor: '#F87171', status: 'OPEN',      assignee: 'Üzeyir Ö.' },
    { id: '#TK-2846', title: 'Report Export Failure',  p: 'MED',  pColor: '#F59E0B', status: 'IN REVIEW', assignee: 'Admin'     },
    { id: '#TK-2845', title: 'Login Redirect Bug',     p: 'LOW',  pColor: '#34D399', status: 'RESOLVED',  assignee: 'Üzeyir Ö.' },
  ]

  return (
    <div style={{ padding: 16, fontFamily: 'var(--font-mono)', height: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 8, letterSpacing: '0.2em', color: '#60A5FA', opacity: 0.9 }}>TICKET SYSTEM</span>
        <span style={{ fontSize: 7, color: 'rgba(148,163,184,0.4)' }}>7 roller</span>
      </div>

      {/* Stats overview */}
      <div style={{ background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.12)', borderRadius: 10, padding: '8px 12px', display: 'flex', gap: 16 }}>
        {[{ label: 'OPEN', v: '8', c: '#F87171' }, { label: 'REVIEW', v: '3', c: '#F59E0B' }, { label: 'DONE', v: '47', c: '#34D399' }].map(s => (
          <div key={s.label}>
            <div style={{ fontSize: 6, color: 'rgba(148,163,184,0.35)', marginBottom: 2, letterSpacing: '0.1em' }}>{s.label}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: s.c, fontFamily: 'var(--font-display)', lineHeight: 1 }}>{s.v}</div>
          </div>
        ))}
      </div>

      {/* Ticket list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
        {tickets.map((t, i) => (
          <div key={i} style={{ padding: '6px 9px', borderRadius: 7, background: 'rgba(255,255,255,0.022)', border: `1px solid ${i === 0 ? 'rgba(96,165,250,0.14)' : 'rgba(255,255,255,0.04)'}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
              <span style={{ fontSize: 8, color: 'rgba(96,165,250,0.55)' }}>{t.id}</span>
              <span style={{ fontSize: 7, padding: '1px 5px', borderRadius: 3, background: `${t.pColor}18`, color: t.pColor, letterSpacing: '0.06em' }}>{t.p}</span>
              <span style={{ marginLeft: 'auto', fontSize: 7, color: 'rgba(148,163,184,0.3)', letterSpacing: '0.05em' }}>{t.status}</span>
            </div>
            <div style={{ fontSize: 9, color: 'rgba(238,242,248,0.72)', marginBottom: 2 }}>{t.title}</div>
            <div style={{ fontSize: 7, color: 'rgba(148,163,184,0.3)' }}>→ {t.assignee}</div>
          </div>
        ))}
      </div>

      {/* SLA bar */}
      <div style={{ padding: '7px 9px', background: 'rgba(96,165,250,0.04)', borderRadius: 6, border: '1px solid rgba(96,165,250,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 7, color: 'rgba(148,163,184,0.35)' }}>SLA — TK-2847</span>
          <span style={{ fontSize: 7, color: '#F87171' }}>2h kaldı</span>
        </div>
        <div style={{ height: 3, background: 'rgba(96,165,250,0.1)', borderRadius: 2 }}>
          <div style={{ width: '75%', height: '100%', background: '#F87171', borderRadius: 2, boxShadow: '0 0 6px rgba(248,113,113,0.5)' }} />
        </div>
      </div>
    </div>
  )
}

// ─── Export map ───────────────────────────────────────────────────────────────
export const MOCKUPS: Record<string, React.FC> = {
  'paramnet':           ParamNetMockup,
  'anka-sports':        AnkaMockup,
  'gold-price-tracker': GoldMockup,
  'vehicle-inventory':  VehicleMockup,
  'ticket-system':      TicketMockup,
}
