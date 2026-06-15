import { useEffect, useRef } from 'react'

import { portfolioData } from '@/data/portfolio'

export function ContactSection({ id }: { id?: string }) {
  const [callLink, linkedInLink] = portfolioData.person.links

  const links = [
    { href: callLink.href, label: 'book call', external: true },
    { href: `mailto:${portfolioData.person.email}`, label: 'email', external: false },
    { href: linkedInLink.href, label: 'linkedin', external: true },
  ]

  return (
    <section
      id={id}
      className="contact-section relative flex min-h-screen w-full scroll-mt-20 flex-col justify-center overflow-hidden py-20"
    >
      <ContactFigures />

      <div className="section-shell relative z-10 flex w-full">
        <ul className="flex flex-col gap-1">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
                className="font-display text-5xl font-black lowercase leading-[1.02] tracking-tight text-foreground transition-opacity duration-200 hover:opacity-50 sm:text-6xl md:text-7xl"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// Two floating figures (half-disc + triangle) that drift, bounce off the
// section edges, and are pushed away from the cursor. Together they read as
// the ~35vw mark from the old footer illustration.
function ContactFigures() {
  const containerRef = useRef<HTMLDivElement>(null)
  const discRef = useRef<HTMLDivElement>(null)
  const triangleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const discEl = discRef.current
    const triangleEl = triangleRef.current
    if (!container || !discEl || !triangleEl) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let width = container.clientWidth
    let height = container.clientHeight

    const figures = [
      { el: discEl, x: width * 0.6, y: height * 0.22, vx: 1.2, vy: 0.9, w: 0, h: 0 },
      { el: triangleEl, x: width * 0.72, y: height * 0.55, vx: -1, vy: 1.1, w: 0, h: 0 },
    ]

    const measure = () => {
      width = container.clientWidth
      height = container.clientHeight
      for (const figure of figures) {
        figure.w = figure.el.offsetWidth
        figure.h = figure.el.offsetHeight
        figure.x = Math.min(figure.x, Math.max(0, width - figure.w))
        figure.y = Math.min(figure.y, Math.max(0, height - figure.h))
      }
    }
    measure()

    const pointer = { x: -9999, y: -9999, active: false }
    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active =
        pointer.x >= 0 &&
        pointer.x <= rect.width &&
        pointer.y >= 0 &&
        pointer.y <= rect.height
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('resize', measure)

    const REPEL_RADIUS = 280
    const REPEL_FORCE = 1.1
    const FRICTION = 0.99
    const MIN_SPEED = 0.4
    const MAX_SPEED = 11

    let raf = 0
    const tick = () => {
      if (width === 0 || height === 0) measure()

      for (const figure of figures) {
        const centerX = figure.x + figure.w / 2
        const centerY = figure.y + figure.h / 2

        if (pointer.active) {
          const dx = centerX - pointer.x
          const dy = centerY - pointer.y
          const distance = Math.hypot(dx, dy)
          if (distance < REPEL_RADIUS && distance > 0.01) {
            const strength = (1 - distance / REPEL_RADIUS) * REPEL_FORCE
            figure.vx += (dx / distance) * strength
            figure.vy += (dy / distance) * strength
          }
        }

        figure.vx *= FRICTION
        figure.vy *= FRICTION

        let speed = Math.hypot(figure.vx, figure.vy)
        if (speed > MAX_SPEED) {
          figure.vx = (figure.vx / speed) * MAX_SPEED
          figure.vy = (figure.vy / speed) * MAX_SPEED
        } else if (speed < MIN_SPEED) {
          const angle =
            speed > 0.0001
              ? Math.atan2(figure.vy, figure.vx)
              : Math.random() * Math.PI * 2
          figure.vx = Math.cos(angle) * MIN_SPEED
          figure.vy = Math.sin(angle) * MIN_SPEED
        }

        figure.x += figure.vx
        figure.y += figure.vy

        // Keep the figures clear of the left-aligned contact links.
        const minX = width * 0.45
        const maxX = Math.max(minX, width - figure.w)
        const maxY = Math.max(0, height - figure.h)
        if (figure.x < minX) {
          figure.x = minX
          figure.vx = Math.abs(figure.vx)
        } else if (figure.x > maxX) {
          figure.x = maxX
          figure.vx = -Math.abs(figure.vx)
        }
        if (figure.y < 0) {
          figure.y = 0
          figure.vy = Math.abs(figure.vy)
        } else if (figure.y > maxY) {
          figure.y = maxY
          figure.vy = -Math.abs(figure.vy)
        }

        figure.el.style.transform = `translate(${figure.x}px, ${figure.y}px)`
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 hidden text-foreground md:block"
    >
      <div ref={discRef} className="absolute left-0 top-0 w-[18vw] will-change-transform">
        <svg viewBox="90 0 293 359" className="block h-auto w-full">
          <path
            d="M268.625 0.686326C353.4 49.9426 382.38 158.544 333.326 243.509C284.272 328.474 175.729 357.678 90.6841 308.888L268.625 0.686326Z"
            fill="currentColor"
            stroke="currentColor"
          />
        </svg>
      </div>
      <div ref={triangleRef} className="absolute left-0 top-0 w-[20vw] will-change-transform">
        <svg viewBox="0 241 363 314" className="block h-auto w-full">
          <path
            d="M1.00329 242L361.267 554H1L1.00329 242Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
