import { useEffect, useState } from 'react'
import { useLocation } from '@tanstack/react-router'

import { cn } from '@/lib/utils'

import { SiteNav } from './SiteNav'

export default function Header() {
  const location = useLocation()
  const [heroActive, setHeroActive] = useState(false)

  // The wordmark is the "hero" tab: active (solid) while the hero is in view,
  // before the works grid scrolls up — mirroring the nav scroll-spy.
  useEffect(() => {
    if (location.pathname !== '/') {
      setHeroActive(false)
      return
    }
    const onScroll = () => {
      const work = document.getElementById('work')
      setHeroActive(
        !work || work.getBoundingClientRect().top > window.innerHeight * 0.4
      )
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-50">
      <div className="section-shell flex min-h-16 items-center justify-between gap-3 py-4">
        <a
          href="/"
          className={cn(
            'inline-flex shrink-0 rounded-full border px-4 py-2 font-display text-xs font-bold lowercase tracking-tight shadow-sm backdrop-blur-md transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-sm',
            heroActive
              ? 'border-foreground bg-foreground text-background'
              : 'border-border/60 bg-background/55 text-foreground hover:bg-background/40 hover:shadow-lg hover:backdrop-blur-xl'
          )}
        >
          alina skalkina
        </a>
        <SiteNav />
      </div>
    </header>
  )
}
