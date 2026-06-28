import { useEffect, useState } from 'react'
import { useLocation } from '@tanstack/react-router'

import { cn } from '@/lib/utils'

import { SiteNav } from './SiteNav'

// Must match the hero morph mapping in routes/index.tsx — the name lands at
// MORPH_END, where it cross-fades into this wordmark.
const MORPH_END = 0.9

export default function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  // Off the home page the wordmark is always present; on home it appears once
  // the morphing hero name has landed.
  const [landed, setLanded] = useState(!isHome)

  useEffect(() => {
    if (!isHome) {
      setLanded(true)
      return
    }
    const onScroll = () =>
      setLanded(window.scrollY / (window.innerHeight || 1) >= MORPH_END)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  return (
    <header className="sticky top-0 z-50 h-16">
      <div className="section-shell flex h-16 items-center justify-between gap-3">
        <a
          href="/"
          aria-hidden={!landed}
          tabIndex={landed ? undefined : -1}
          className={cn(
            'group relative inline-flex shrink-0 items-center rounded-full px-4 py-2 sm:px-5 sm:py-2.5',
            !landed && 'pointer-events-none'
          )}
        >
          {/* Glass pill materialises (scale + fade) once the name has landed. */}
          <span
            aria-hidden
            className={cn(
              'absolute inset-0 rounded-full border border-border/60 bg-background/55 shadow-sm backdrop-blur-md transition-all duration-500 ease-out group-hover:bg-background/40 group-hover:shadow-lg',
              landed ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            )}
          />
          {/* Text appears instantly so it cross-fades with the morphing name. */}
          <span
            data-nav-wordmark
            className={cn(
              'relative font-display text-sm font-black leading-[0.92] tracking-[-0.03em] text-foreground',
              landed ? 'opacity-100' : 'opacity-0'
            )}
          >
            Alina Skalkina
          </span>
        </a>
        <SiteNav />
      </div>
    </header>
  )
}
