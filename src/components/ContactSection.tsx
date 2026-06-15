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
                className="font-display text-5xl font-black lowercase leading-[0.95] tracking-tight text-foreground transition-opacity duration-200 hover:opacity-50 sm:text-7xl md:text-8xl lg:text-[7.5rem]"
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

// Half-disc + triangle. They sit still in their original composition until the
// cursor comes near, then they're pushed around, bounce off the section edges,
// and collide with each other before friction settles them.
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

    type Figure = {
      el: HTMLDivElement
      x: number
      y: number
      vx: number
      vy: number
      w: number
      h: number
    }
    const disc: Figure = { el: discEl, x: 0, y: 0, vx: 0, vy: 0, w: 0, h: 0 }
    const triangle: Figure = { el: triangleEl, x: 0, y: 0, vx: 0, vy: 0, w: 0, h: 0 }
    const figures = [disc, triangle]

    let width = 0
    let height = 0
    let activated = false

    // Frame-6 geometry (viewBox 423 x 555): the disc occupies x[90..383] y[0..358],
    // the triangle x[1..361] y[242..554]. Recreate that composition, anchored right.
    const measure = (resetPositions: boolean) => {
      width = container.clientWidth
      height = container.clientHeight
      const unit = (0.38 * width) / 423
      discEl.style.width = `${293 * unit}px`
      triangleEl.style.width = `${360 * unit}px`
      disc.w = discEl.offsetWidth
      disc.h = discEl.offsetHeight
      triangle.w = triangleEl.offsetWidth
      triangle.h = triangleEl.offsetHeight

      if (resetPositions) {
        const originX = 0.96 * width - 383 * unit
        const originY = Math.max(0, height * 0.5 - (555 * unit) / 2)
        disc.x = originX + 90 * unit
        disc.y = originY
        triangle.x = originX + 1 * unit
        triangle.y = originY + 242 * unit
        disc.vx = disc.vy = triangle.vx = triangle.vy = 0
        for (const figure of figures) {
          figure.el.style.transform = `translate(${figure.x}px, ${figure.y}px)`
        }
      }
    }
    measure(true)

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
    const onResize = () => measure(!activated)

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('resize', onResize)

    const REPEL_RADIUS = 280
    const REPEL_FORCE = 1.1
    const FRICTION = 0.99
    const MAX_SPEED = 12
    const STOP_SPEED = 0.05

    const center = (figure: Figure) => ({
      x: figure.x + figure.w / 2,
      y: figure.y + figure.h / 2,
    })

    const collide = () => {
      const a = center(disc)
      const b = center(triangle)
      const ra = Math.min(disc.w, disc.h) * 0.5
      const rb = Math.min(triangle.w, triangle.h) * 0.45
      let dx = b.x - a.x
      let dy = b.y - a.y
      let distance = Math.hypot(dx, dy)
      const minDistance = ra + rb
      if (distance === 0) {
        dx = 1
        dy = 0
        distance = 1
      }
      if (distance < minDistance) {
        const nx = dx / distance
        const ny = dy / distance
        const overlap = (minDistance - distance) / 2
        disc.x -= nx * overlap
        disc.y -= ny * overlap
        triangle.x += nx * overlap
        triangle.y += ny * overlap
        // Equal-mass elastic response: swap velocity components along the normal.
        const approach = (disc.vx - triangle.vx) * nx + (disc.vy - triangle.vy) * ny
        if (approach > 0) {
          disc.vx -= approach * nx
          disc.vy -= approach * ny
          triangle.vx += approach * nx
          triangle.vy += approach * ny
        }
      }
    }

    let raf = 0
    const tick = () => {
      if (width === 0) measure(!activated)

      if (!activated && pointer.active) {
        for (const figure of figures) {
          const c = center(figure)
          if (Math.hypot(c.x - pointer.x, c.y - pointer.y) < REPEL_RADIUS) {
            activated = true
            break
          }
        }
      }

      if (activated) {
        for (const figure of figures) {
          if (pointer.active) {
            const c = center(figure)
            const dx = c.x - pointer.x
            const dy = c.y - pointer.y
            const distance = Math.hypot(dx, dy)
            if (distance < REPEL_RADIUS && distance > 0.01) {
              const strength = (1 - distance / REPEL_RADIUS) * REPEL_FORCE
              figure.vx += (dx / distance) * strength
              figure.vy += (dy / distance) * strength
            }
          }

          figure.vx *= FRICTION
          figure.vy *= FRICTION
          if (Math.abs(figure.vx) < STOP_SPEED) figure.vx = 0
          if (Math.abs(figure.vy) < STOP_SPEED) figure.vy = 0

          const speed = Math.hypot(figure.vx, figure.vy)
          if (speed > MAX_SPEED) {
            figure.vx = (figure.vx / speed) * MAX_SPEED
            figure.vy = (figure.vy / speed) * MAX_SPEED
          }

          figure.x += figure.vx
          figure.y += figure.vy
        }

        collide()

        for (const figure of figures) {
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
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 hidden text-foreground md:block"
    >
      <div ref={discRef} className="absolute left-0 top-0 will-change-transform">
        <svg viewBox="90 0 293 359" className="block h-auto w-full">
          <path
            d="M268.625 0.686326C353.4 49.9426 382.38 158.544 333.326 243.509C284.272 328.474 175.729 357.678 90.6841 308.888L268.625 0.686326Z"
            fill="currentColor"
            stroke="currentColor"
          />
        </svg>
      </div>
      <div ref={triangleRef} className="absolute left-0 top-0 will-change-transform">
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
