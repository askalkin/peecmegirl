import { useEffect, useRef, useState } from 'react'
import { useLocation } from '@tanstack/react-router'

import { portfolioData } from '@/data/portfolio'
import { cn } from '@/lib/utils'

export function SiteNav({ className = '' }: { className?: string }) {
  const links = portfolioData.person.sitemap
  const location = useLocation()
  const pathname = location.pathname

  const [activeIndex, setActiveIndex] = useState(-1)
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false })

  // Which segment is "current": the route for /about, otherwise a scroll-spy
  // over the in-page sections on the home page.
  useEffect(() => {
    if (pathname.startsWith('/about')) {
      setActiveIndex(links.findIndex((link) => link.href.includes('about')))
      return
    }
    if (pathname !== '/') {
      setActiveIndex(-1)
      return
    }

    const onScroll = () => {
      let current = -1
      links.forEach((link, index) => {
        if (!link.href.startsWith('/#')) return
        const section = document.getElementById(link.href.slice(2))
        if (!section) return
        if (section.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          current = index
        }
      })
      setActiveIndex(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname, links])

  // Slide the indicator under the active segment.
  useEffect(() => {
    const update = () => {
      const el = activeIndex >= 0 ? itemRefs.current[activeIndex] : null
      if (el) {
        setIndicator({ left: el.offsetLeft, width: el.offsetWidth, visible: true })
      } else {
        setIndicator((current) => ({ ...current, visible: false }))
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [activeIndex])

  return (
    <nav
      className={cn(
        'relative flex h-11 max-w-full items-stretch gap-1 overflow-x-auto rounded-[4px] border border-border/60 bg-background/55 p-1 text-base backdrop-blur-md transition-all duration-300 hover:bg-background/40 hover:backdrop-blur-xl lg:overflow-visible',
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          'nav-switch-indicator pointer-events-none absolute bottom-1 top-1 rounded-[2px] bg-foreground',
          indicator.visible ? 'opacity-100' : 'opacity-0'
        )}
        style={{ left: indicator.left, width: indicator.width }}
      />
      {links.map((link, index) => (
        <a
          key={link.href}
          ref={(el) => {
            itemRefs.current[index] = el
          }}
          href={link.href}
          className={cn(
            'relative z-10 flex h-full shrink-0 items-center whitespace-nowrap rounded-[2px] px-3 font-display font-bold leading-none transition-colors duration-300 sm:px-4',
            activeIndex === index
              ? 'text-background'
              : 'text-foreground hover:opacity-60'
          )}
        >
          {link.label}
        </a>
      ))}
    </nav>
  )
}
