import { useEffect, useState } from 'react'
import { useLocation } from '@tanstack/react-router'

import { cn } from '@/lib/utils'
import { getHeroMorphDistance } from '@/lib/heroMorph'

import { SiteNav } from './SiteNav'

const HEADER_WORDMARK_REVEAL_PROGRESS = 0.92

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
    const update = () => {
      const distance = getHeroMorphDistance(window.innerHeight || 1)
      setLanded(window.scrollY >= distance * HEADER_WORDMARK_REVEAL_PROGRESS)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [isHome])

  return (
    <header className="sticky top-0 z-50 h-16">
      <div className="section-shell relative flex h-16 items-center gap-2 sm:gap-3">
        <a
          href="/"
          aria-hidden={!landed}
          tabIndex={landed ? undefined : -1}
          className={cn(
            // Hidden below lg, where the nav's own "Home" tab replaces it.
            'group relative hidden h-11 shrink-0 items-center px-4 lg:inline-flex sm:px-5',
            !landed && 'pointer-events-none'
          )}
        >
          {/* Glass pill materialises (scale + fade) once the name has landed. */}
          <span
            aria-hidden
            className={cn(
              'absolute inset-0 border border-border/60 bg-background/55 backdrop-blur-md transition-all duration-500 ease-out group-hover:bg-background/40',
              landed ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            )}
          />
          {/* The crisp, native-size landed wordmark. The hero morph is drawn by
              a separate fixed text overlay until it hands off to this element. */}
          <span
            data-nav-wordmark
            className={cn(
              'relative inline-block origin-top-left font-display text-base font-bold leading-none tracking-[0.03em] text-foreground transition-opacity duration-200',
              landed ? 'opacity-100' : 'opacity-0'
            )}
          >
            Alina Skalkina
          </span>
        </a>
        <div
          className={cn(
            // Below lg the nav is centered in flow (no wordmark beside it); on
            // lg it stays centered in the header as before.
            'flex min-w-0 mx-auto justify-center lg:absolute lg:left-1/2 lg:top-1/2 lg:mx-0 lg:-translate-x-1/2 lg:-translate-y-1/2'
          )}
        >
          <SiteNav />
        </div>
      </div>
    </header>
  )
}
