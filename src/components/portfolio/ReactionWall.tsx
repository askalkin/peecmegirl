import { useEffect, useRef, useState } from 'react'

import type { ReactionWall as ReactionWallData } from '@/data/portfolio'

/**
 * "Super Bowl reactions" collage — a wall of social screenshots where each
 * layer pops in on top of the previous one with a quick, bouncy stagger,
 * mimicking the way socials light up the moment an ad drops.
 */
export function ReactionWall({ wall }: { wall: ReactionWallData }) {
  const ref = useRef<HTMLDivElement>(null)
  const [played, setPlayed] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || played) return

    // Respect reduced-motion: show everything immediately, no popping.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPlayed(true)
      return
    }

    // Scroll/rAF visibility check (more robust than IntersectionObserver,
    // which can stay silent in some embedded/headless contexts). Plays once
    // the wall is ~15% into the viewport.
    let raf = 0
    const check = () => {
      const rect = node.getBoundingClientRect()
      // Require the section to actually be scrolled into the viewport:
      // its top must have risen above ~75% of the viewport height, and the
      // section must still be on screen.
      const inView =
        rect.top < window.innerHeight * 0.75 && rect.bottom > 0
      if (inView) {
        setPlayed(true)
        cleanup()
      }
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(check)
    }
    const cleanup = () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    // Check once in case the section is already in view on mount (e.g. a
    // short page with no scroll room, or a deep-link landing inside it).
    check()
    return cleanup
  }, [played])

  return (
    <div
      ref={ref}
      className="reaction-wall relative w-full"
      style={{ aspectRatio: wall.aspect }}
    >
      {wall.layers.map((layer, index) => (
        <img
          key={layer.src}
          src={layer.src}
          alt={layer.alt}
          loading="lazy"
          decoding="async"
          className="reaction-wall__layer absolute rounded-xl shadow-2xl"
          data-played={played}
          style={
            {
              left: `${layer.x}%`,
              top: `${layer.y}%`,
              width: `${layer.w}%`,
              height: `${layer.h}%`,
              '--rest-rotate': `${layer.rotate ?? 0}deg`,
              // Stack in source order; pop in one after another.
              zIndex: index + 1,
              transitionDelay: `${index * 110}ms`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
