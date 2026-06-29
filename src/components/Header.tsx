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
      <div className="section-shell relative flex h-16 items-center justify-between gap-3">
        <a
          href="/"
          aria-hidden={!landed}
          tabIndex={landed ? undefined : -1}
          className={cn(
            'group relative inline-flex shrink-0 items-center rounded-[4px] px-4 py-2 sm:px-5 sm:py-2.5',
            !landed && 'pointer-events-none'
          )}
        >
          {/* Glass pill materialises (scale + fade) once the name has landed. */}
          <span
            aria-hidden
            className={cn(
              'absolute inset-0 rounded-[4px] border border-border/60 bg-background/55 backdrop-blur-md transition-all duration-500 ease-out group-hover:bg-background/40',
              landed ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            )}
          />
          {/* This wordmark is the element GSAP Flip physically moves: at the top
              of the home page it sits scaled-up over the hero name, then flies
              up into the header as you scroll. So it stays visible throughout. */}
          <span
            data-nav-wordmark
            className="relative inline-block origin-top-left font-display text-sm font-black leading-[0.92] tracking-[-0.03em] text-foreground will-change-transform"
          >
            Alina Skalkina
          </span>
        </a>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <SiteNav />
        </div>
      </div>
    </header>
  )
}
