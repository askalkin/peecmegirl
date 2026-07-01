import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from '@tanstack/react-router'

import { portfolioData } from '@/data/portfolio'
import { cn } from '@/lib/utils'

export function SiteNav({ className = '' }: { className?: string }) {
  // "Home" only exists below lg, where the morphing wordmark is hidden; it sits
  // in the same nav block as the section links and jumps back to the hero.
  const links = [
    { href: '/', label: 'Home', mobileOnly: true },
    ...portfolioData.person.sitemap.map((link) => ({ ...link, mobileOnly: false })),
  ]
  const location = useLocation()
  const pathname = location.pathname

  const navRef = useRef<HTMLElement>(null)
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
      // At the very top no section is current — highlight the Home tab.
      if (current === -1) {
        current = links.findIndex((link) => link.mobileOnly)
      }
      setActiveIndex(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname, links])

  // Fit the whole nav to its container: every dimension (text, padding, gaps,
  // height) is expressed in `em`, so a single font-size scales the nav as one
  // unit. When the tabs would overflow their container (narrow viewports) we
  // shrink that font-size just enough to fit — no cropping, no horizontal
  // scroll — and never grow past the natural `text-base` size.
  useLayoutEffect(() => {
    const nav = navRef.current
    if (!nav) return
    let frame = 0

    const fit = () => {
      nav.style.fontSize = ''
      // The width-constraining box is the header's section shell, not the
      // shrink-to-fit wrapper that centers the nav.
      const shell = nav.closest<HTMLElement>('.section-shell')
      const available = shell?.clientWidth ?? nav.parentElement?.clientWidth ?? 0
      const natural = nav.scrollWidth
      if (available > 0 && natural > available) {
        const base = Number.parseFloat(getComputedStyle(nav).fontSize)
        if (Number.isFinite(base) && base > 0) {
          nav.style.fontSize = `${(base * available) / natural}px`
        }
      }
    }

    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(fit)
    }

    schedule()
    const shell = nav.closest<HTMLElement>('.section-shell')
    const observer = new ResizeObserver(schedule)
    if (shell) observer.observe(shell)
    void document.fonts?.ready.then(schedule)
    window.addEventListener('resize', schedule)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', schedule)
      nav.style.fontSize = ''
    }
  }, [links.length])

  // Slide the indicator under the active segment. A ResizeObserver keeps it
  // aligned when the fit above rescales the nav (which fires no resize event).
  useEffect(() => {
    const update = () => {
      const el = activeIndex >= 0 ? itemRefs.current[activeIndex] : null
      // offsetWidth is 0 for the lg-hidden Home tab, so it never draws there.
      if (el && el.offsetWidth > 0) {
        setIndicator({ left: el.offsetLeft, width: el.offsetWidth, visible: true })
      } else {
        setIndicator((current) => ({ ...current, visible: false }))
      }
    }
    update()
    const observer = new ResizeObserver(update)
    if (navRef.current) observer.observe(navRef.current)
    window.addEventListener('resize', update)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [activeIndex])

  return (
    <nav
      ref={navRef}
      className={cn(
        'relative flex h-[2.75em] max-w-full items-stretch gap-[0.25em] overflow-x-auto border border-border/60 bg-background/55 p-[0.25em] text-base backdrop-blur-md transition-all duration-300 hover:bg-background/40 hover:backdrop-blur-xl lg:overflow-visible',
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          'nav-switch-indicator pointer-events-none absolute bottom-[0.25em] top-[0.25em] bg-foreground',
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
            'relative z-10 flex h-full shrink-0 items-center whitespace-nowrap rounded-[2px] px-[0.75em] font-display font-bold leading-none transition-colors duration-300 sm:px-[1em]',
            link.mobileOnly && 'lg:hidden',
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
