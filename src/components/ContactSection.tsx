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

      <div className="section-shell relative z-10 flex w-full flex-col gap-10">
        <ul className="flex flex-col gap-1">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
                className="font-display text-[clamp(2.75rem,10vw,11rem)] font-black lowercase leading-[0.95] tracking-tight text-foreground transition-opacity duration-200 hover:opacity-50"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Static figures on mobile (cursor interaction needs a pointer):
            beneath the links, ~80% of the width, left-aligned, not cropped. */}
        <div
          aria-hidden
          className="flex w-[80vw] max-w-full items-end gap-3 self-start text-foreground md:hidden"
        >
          <svg viewBox="0 241 363 314" className="h-auto w-[55%]">
            <path
              d="M1.00329 242L361.267 554H1L1.00329 242Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          <svg viewBox="90 0 293 359" className="h-auto w-[42%]">
            <path
              d="M268.625 0.686326C353.4 49.9426 382.38 158.544 333.326 243.509C284.272 328.474 175.729 357.678 90.6841 308.888L268.625 0.686326Z"
              fill="currentColor"
              stroke="currentColor"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}

// Half-disc + triangle. They sit still in their original composition until the
// cursor comes near, then they behave like real objects: gravity, spin, bouncy
// collisions with the section edges and with each other.
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
      radius: number
      boundRadius: number
      angle: number
      spin: number
    }
    const make = (el: HTMLDivElement): Figure => ({
      el,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      w: 0,
      h: 0,
      radius: 0,
      boundRadius: 0,
      angle: 0,
      spin: 0,
    })
    const disc = make(discEl)
    const triangle = make(triangleEl)
    const figures = [disc, triangle]

    let width = 0
    let height = 0
    let activated = false

    // Frame-6 geometry (viewBox 423 x 555): the disc occupies x[90..383] y[0..358],
    // the triangle x[1..361] y[242..554]. Recreate that composition, anchored right.
    // 1.3x smaller than before -> composition spans ~0.29 of the width.
    const measure = (resetPositions: boolean) => {
      width = container.clientWidth
      height = container.clientHeight
      const unit = (0.29 * width) / 423
      discEl.style.width = `${293 * unit}px`
      triangleEl.style.width = `${360 * unit}px`
      disc.w = discEl.offsetWidth
      disc.h = discEl.offsetHeight
      disc.radius = Math.min(disc.w, disc.h) * 0.5
      disc.boundRadius = Math.hypot(disc.w, disc.h) / 2
      triangle.w = triangleEl.offsetWidth
      triangle.h = triangleEl.offsetHeight
      triangle.radius = Math.min(triangle.w, triangle.h) * 0.46
      triangle.boundRadius = Math.hypot(triangle.w, triangle.h) / 2

      if (resetPositions) {
        const originX = 0.96 * width - 383 * unit
        const originY = Math.max(0, height * 0.5 - (555 * unit) / 2)
        disc.x = originX + 90 * unit
        disc.y = originY
        triangle.x = originX + 1 * unit
        triangle.y = originY + 242 * unit
        for (const figure of figures) {
          figure.vx = figure.vy = figure.spin = figure.angle = 0
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

    const GRAVITY = 0.18
    const AIR = 0.984
    const SPIN_FRICTION = 0.94
    const RESTITUTION = 0.6 // bounciness off walls
    const GROUND_FRICTION = 0.88
    const REST_SPEED = 0.7
    const REPEL_RADIUS = 260
    const REPEL_FORCE = 0.8
    const MAX_SPEED = 7.5
    const MAX_SPIN = 0.045 // rad/frame — keeps rotation slow and soft

    const center = (figure: Figure) => ({
      x: figure.x + figure.w / 2,
      y: figure.y + figure.h / 2,
    })

    const collide = () => {
      const a = center(disc)
      const b = center(triangle)
      let dx = b.x - a.x
      let dy = b.y - a.y
      let distance = Math.hypot(dx, dy)
      const minDistance = disc.radius + triangle.radius
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

        const approach = (disc.vx - triangle.vx) * nx + (disc.vy - triangle.vy) * ny
        if (approach > 0) {
          // Equal-mass bouncy response along the normal.
          const impulse = approach * RESTITUTION
          disc.vx -= impulse * nx
          disc.vy -= impulse * ny
          triangle.vx += impulse * nx
          triangle.vy += impulse * ny
          // Tangential slip imparts spin, like real objects scraping past.
          const tx = -ny
          const ty = nx
          const tangential =
            (disc.vx - triangle.vx) * tx + (disc.vy - triangle.vy) * ty
          disc.spin += (tangential / disc.radius) * 0.12
          triangle.spin -= (tangential / triangle.radius) * 0.12
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
              figure.spin += (dy / distance) * strength * 0.015
            }
          }

          figure.vy += GRAVITY
          figure.vx *= AIR
          figure.vy *= AIR

          const speed = Math.hypot(figure.vx, figure.vy)
          if (speed > MAX_SPEED) {
            figure.vx = (figure.vx / speed) * MAX_SPEED
            figure.vy = (figure.vy / speed) * MAX_SPEED
          }

          figure.x += figure.vx
          figure.y += figure.vy
          figure.spin *= SPIN_FRICTION
          figure.spin = Math.max(-MAX_SPIN, Math.min(MAX_SPIN, figure.spin))
          figure.angle += figure.spin
        }

        collide()

        for (const figure of figures) {
          // Bounce on the figure's circumscribed circle so rotation never
          // pushes a corner past the edge (no cropping). Edges of the section
          // (full screen width) are the bounce surfaces.
          const r = figure.boundRadius
          const minLeftX = r - figure.w / 2
          const maxLeftX = width - r - figure.w / 2
          const minTopY = r - figure.h / 2
          const maxBottomY = height - r - figure.h / 2

          if (figure.x < minLeftX) {
            figure.x = minLeftX
            figure.vx = Math.abs(figure.vx) * RESTITUTION
            figure.spin += (figure.vy / figure.radius) * 0.15
          } else if (figure.x > maxLeftX) {
            figure.x = maxLeftX
            figure.vx = -Math.abs(figure.vx) * RESTITUTION
            figure.spin -= (figure.vy / figure.radius) * 0.15
          }

          if (figure.y < minTopY) {
            figure.y = minTopY
            figure.vy = Math.abs(figure.vy) * RESTITUTION
          } else if (figure.y > maxBottomY) {
            figure.y = maxBottomY
            // Bounce, or settle and roll along the floor.
            if (Math.abs(figure.vy) > REST_SPEED) {
              figure.vy = -Math.abs(figure.vy) * RESTITUTION
            } else {
              figure.vy = 0
            }
            figure.vx *= GROUND_FRICTION
            figure.spin = (figure.vx / figure.radius) * 0.4
          }

          figure.el.style.transform = `translate(${figure.x}px, ${figure.y}px) rotate(${figure.angle}rad)`
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
