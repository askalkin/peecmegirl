import { useEffect, useRef } from 'react'

import { portfolioData } from '@/data/portfolio'

export function ContactSection({ id }: { id?: string }) {
  const [callLink, linkedInLink] = portfolioData.person.links

  const links = [
    { href: callLink.href, label: 'Book call', external: true },
    { href: `mailto:${portfolioData.person.email}`, label: 'Email', external: false },
    { href: linkedInLink.href, label: 'LinkedIn', external: true },
  ]

  return (
    <section
      id={id}
      className="contact-section relative flex min-h-screen w-full scroll-mt-20 flex-col justify-center overflow-hidden bg-background py-20 text-foreground"
    >
      <ContactFigures />

      <div className="section-shell relative z-10 flex w-full flex-col gap-10">
        {/* Static figures on mobile — disc top-right, triangle lower-left, matching desktop composition. */}
        <div
          aria-hidden
          className="relative h-[55vw] w-full text-foreground md:hidden"
        >
          <svg viewBox="90 0 293 359" className="absolute right-0 top-0 h-auto w-[46%]">
            <path
              d="M268.625 0.686326C353.4 49.9426 382.38 158.544 333.326 243.509C284.272 328.474 175.729 357.678 90.6841 308.888L268.625 0.686326Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <svg viewBox="0 241 363 314" className="absolute bottom-0 left-0 h-auto w-[68%]">
            <path
              d="M1.00329 242L361.267 554H1L1.00329 242Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <ul className="flex flex-col gap-1">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
                className="group/link relative inline-block pb-[0.25em] text-display font-black text-foreground"
              >
                {link.label}
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-[0.06em] w-0 bg-foreground transition-[width] duration-300 ease-in-out group-hover/link:w-full"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// Half-disc + triangle, composed on the right. At rest they sit perfectly
// still. As the cursor nears, they glide away with a gentle spring and a faint
// tilt, then settle back home — restrained, never spinning or piling up.
function ContactFigures() {
  const containerRef = useRef<HTMLDivElement>(null)
  const discRef = useRef<HTMLDivElement>(null)
  const triangleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const discEl = discRef.current
    const triangleEl = triangleRef.current
    if (!container || !discEl || !triangleEl) return

    type Figure = {
      el: HTMLDivElement
      x: number
      y: number
      vx: number
      vy: number
      w: number
      h: number
      radius: number
      homeX: number
      homeY: number
      angle: number
      va: number
      jump: number
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
      homeX: 0,
      homeY: 0,
      angle: 0,
      va: 0,
      jump: 1,
    })
    const disc = make(discEl)
    const triangle = make(triangleEl)
    // Lighter shapes overshoot more when the page slams to a stop.
    disc.jump = 0.85
    triangle.jump = 1.15
    const figures = [disc, triangle]

    // Sibling content block — given a subtler bounce so the whole page reads
    // as recoiling off the bottom of the screen.
    const contentEl =
      (container.parentElement?.querySelector('.section-shell') as HTMLElement | null) ?? null
    let contentY = 0
    let contentVy = 0

    let width = 0
    let height = 0

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const center = (figure: Figure) => ({
      x: figure.x + figure.w / 2,
      y: figure.y + figure.h / 2,
    })

    // Frame-6 geometry (viewBox 423 x 555): disc x[90..383] y[0..358],
    // triangle x[1..361] y[242..554]. Recreate that composition, anchored right.
    const measure = () => {
      width = container.clientWidth
      height = container.clientHeight
      const unit = (0.29 * width) / 423
      discEl.style.width = `${293 * unit}px`
      triangleEl.style.width = `${360 * unit}px`
      disc.w = discEl.offsetWidth
      disc.h = discEl.offsetHeight
      disc.radius = Math.min(disc.w, disc.h) * 0.5
      triangle.w = triangleEl.offsetWidth
      triangle.h = triangleEl.offsetHeight
      triangle.radius = Math.min(triangle.w, triangle.h) * 0.46

      const originX = 0.96 * width - 383 * unit
      const originY = Math.max(0, height * 0.5 - (555 * unit) / 2)
      disc.homeX = originX + 90 * unit
      disc.homeY = originY
      triangle.homeX = originX + 1 * unit
      triangle.homeY = originY + 242 * unit

      for (const figure of figures) {
        // Keep the figure's offset from home across resizes; snap on first run.
        if (figure.x === 0 && figure.y === 0) {
          figure.x = figure.homeX
          figure.y = figure.homeY
          figure.el.style.transform = `translate(${figure.x}px, ${figure.y}px)`
          figure.el.style.opacity = '1'
        }
      }
    }
    measure()

    if (reduceMotion) {
      window.addEventListener('resize', measure)
      return () => window.removeEventListener('resize', measure)
    }

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

    const STIFFNESS = 0.032 // pull back toward home
    const DAMPING = 0.86 // velocity retained per frame (smooth settle)
    const REPEL_RADIUS = 260
    const REPEL_FORCE = 2.2
    const MAX_OFFSET = 260 // headroom for the bounce; pointer motion stays small
    const ROT_FACTOR = 0.00045 // faint tilt tied to horizontal offset

    // Scroll-into-the-floor bounce: when the page reaches the very bottom while
    // scrolling down, the shapes keep moving (inertia) and spring back home.
    let lastScrollY = window.scrollY
    let lastTime = performance.now()
    let wasAtBottom = false
    let bounceCooldown = 0
    const atBottom = () =>
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2

    const triggerBounce = (scrollVel: number) => {
      // scrollVel ~ px/frame downward. Map to an upward kick, capped.
      const impulse = Math.min(26, 6 + scrollVel * 0.45)
      for (const figure of figures) {
        figure.vy -= impulse * figure.jump
        figure.vx += (Math.random() - 0.5) * impulse * 0.4
        figure.va += (Math.random() - 0.5) * 0.06 * figure.jump
      }
      contentVy -= Math.min(10, impulse * 0.45)
    }

    const onScroll = () => {
      const now = performance.now()
      const dt = Math.max(1, now - lastTime)
      const scrollVel = ((window.scrollY - lastScrollY) / dt) * 16
      lastScrollY = window.scrollY
      lastTime = now
      const nowBottom = atBottom()
      if (nowBottom && !wasAtBottom && scrollVel > 4 && bounceCooldown <= 0) {
        triggerBounce(scrollVel)
        bounceCooldown = 30
      }
      wasAtBottom = nowBottom
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Soft, position-only separation so the two shapes never overlap.
    const separate = () => {
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
        const push = (minDistance - distance) / 2
        const nx = dx / distance
        const ny = dy / distance
        disc.x -= nx * push
        disc.y -= ny * push
        triangle.x += nx * push
        triangle.y += ny * push
      }
    }

    let raf = 0
    const tick = () => {
      if (width === 0) measure()
      if (bounceCooldown > 0) bounceCooldown -= 1

      for (const figure of figures) {
        let ax = (figure.homeX - figure.x) * STIFFNESS
        let ay = (figure.homeY - figure.y) * STIFFNESS

        if (pointer.active) {
          const c = center(figure)
          const dx = c.x - pointer.x
          const dy = c.y - pointer.y
          const distance = Math.hypot(dx, dy)
          if (distance < REPEL_RADIUS && distance > 0.01) {
            const falloff = 1 - distance / REPEL_RADIUS
            const strength = falloff * falloff * REPEL_FORCE
            ax += (dx / distance) * strength
            ay += (dy / distance) * strength
          }
        }

        figure.vx = (figure.vx + ax) * DAMPING
        figure.vy = (figure.vy + ay) * DAMPING
        figure.x += figure.vx
        figure.y += figure.vy

        // Clamp displacement from home so shapes stay in their region.
        const ox = figure.x - figure.homeX
        const oy = figure.y - figure.homeY
        const offset = Math.hypot(ox, oy)
        if (offset > MAX_OFFSET) {
          const scale = MAX_OFFSET / offset
          figure.x = figure.homeX + ox * scale
          figure.y = figure.homeY + oy * scale
        }
      }

      separate()

      for (const figure of figures) {
        // Spring the tilt toward its horizontal-offset rest value, with angular
        // velocity so a bounce gives a brief decaying wobble.
        const targetAngle = (figure.x - figure.homeX) * ROT_FACTOR
        figure.va = (figure.va + (targetAngle - figure.angle) * 0.08) * 0.9
        figure.angle += figure.va
        figure.el.style.transform = `translate(${figure.x}px, ${figure.y}px) rotate(${figure.angle}rad)`
      }

      // Subtle whole-content recoil.
      if (contentEl) {
        contentVy = (contentVy + (0 - contentY) * 0.08) * 0.84
        contentY += contentVy
        contentEl.style.transform =
          Math.abs(contentY) < 0.05 && Math.abs(contentVy) < 0.05
            ? ''
            : `translateY(${contentY}px)`
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 hidden text-foreground md:block"
    >
      <div ref={discRef} className="absolute left-0 top-0 will-change-transform" style={{ opacity: 0 }}>
        <svg viewBox="90 0 293 359" className="block h-auto w-full">
          <path
            d="M268.625 0.686326C353.4 49.9426 382.38 158.544 333.326 243.509C284.272 328.474 175.729 357.678 90.6841 308.888L268.625 0.686326Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div ref={triangleRef} className="absolute left-0 top-0 will-change-transform" style={{ opacity: 0 }}>
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
