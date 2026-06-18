import { useRef, useState, type MouseEvent } from 'react'
import { ArrowDown, ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { cvRoles } from '@/data/cv'

// A marquee photo card with cursor tilt, a moving glare, and a hover flip.
function TiltCard() {
  const tiltRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState('')
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    setTilt(`rotateX(${(0.5 - py) * 14}deg) rotateY(${(px - 0.5) * 14}deg)`)
    setGlare({ x: px * 100, y: py * 100, opacity: 0.5 })
  }

  const handleLeave = () => {
    setTilt('')
    setGlare((current) => ({ ...current, opacity: 0 }))
  }

  return (
    <div aria-hidden className="shrink-0 [perspective:1200px]">
      <div
        ref={tiltRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group/card transition-transform duration-200 ease-out [transform-style:preserve-3d]"
        style={{ transform: tilt }}
      >
        <div className="relative aspect-[4/3] w-[clamp(16rem,30vw,30rem)] transition-transform duration-700 [transform-style:preserve-3d] group-hover/card:[transform:rotateY(180deg)]">
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-muted text-xs font-medium uppercase tracking-wide text-muted-foreground [backface-visibility:hidden]">
            Photo
            <span
              className="pointer-events-none absolute inset-0 transition-opacity duration-200"
              style={{
                opacity: glare.opacity,
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.7), transparent 55%)`,
              }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-foreground text-xs font-medium uppercase tracking-wide text-background [backface-visibility:hidden] [transform:rotateY(180deg)]">
            Photo
          </div>
        </div>
      </div>
    </div>
  )
}

// Self-scrolling photo strip. `direction` sets the travel direction.
function PhotoMarquee({
  direction,
  count,
}: {
  direction: 'left' | 'right'
  count: number
}) {
  const items = Array.from({ length: count })

  return (
    <div className="marquee">
      <div
        className={`marquee-track ${direction === 'right' ? 'marquee-track--reverse' : ''}`}
      >
        {[...items, ...items].map((_, index) => (
          <TiltCard key={index} />
        ))}
      </div>
    </div>
  )
}

function DownloadCvLink() {
  return (
    <a
      href="/recovered/Alina-Skalkina-CV-Lead-Brand-Product-Designer.pdf"
      target="_blank"
      rel="noreferrer"
      className="inline-flex w-fit items-center gap-2 border-b border-foreground pb-1 text-sm font-medium text-foreground transition-opacity hover:opacity-60"
    >
      Download CV
      <ArrowDown className="size-4" />
    </a>
  )
}

// Expandable, swiss-style experience list.
function ExperienceList() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="mt-10">
      {cvRoles.map((role, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={`${role.title}-${role.company}-${role.period}`}
            className="border-t border-border last:border-b"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-6 py-6 text-left"
            >
              <div className="grid flex-1 gap-2 md:grid-cols-[7rem_1fr] md:gap-8">
                <span className="pt-1 text-sm tabular-nums text-muted-foreground">
                  {role.years}
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {role.company}, {role.country}
                  </span>
                  <span className="mt-1 block font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                    {role.title}
                  </span>
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'mt-1.5 size-5 shrink-0 text-muted-foreground transition-transform duration-300',
                  isOpen && 'rotate-180'
                )}
              />
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="pb-8 md:pl-[calc(7rem+2rem)]">
                  <p className="mb-5 max-w-2xl text-base leading-relaxed text-foreground/80">
                    {role.companyAbout}
                  </p>
                  {role.note ? (
                    <p className="mb-3 max-w-2xl text-sm leading-relaxed text-foreground/80">
                      {role.note}
                    </p>
                  ) : null}
                  <ul className="space-y-2.5">
                    {role.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex max-w-2xl gap-3 text-sm leading-relaxed text-foreground/70"
                      >
                        <span className="mt-2 inline-block size-1 shrink-0 rounded-full bg-muted-foreground/60" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function AboutContent() {
  return (
    <>
      <section className="grid w-full lg:grid-cols-2">
        {/* "my experience" sticks to the bottom-left through the CV section. */}
        <div className="p-8 md:p-12">
          <h2 className="font-display text-5xl font-black lowercase leading-[0.95] tracking-tight text-foreground md:text-6xl lg:sticky lg:bottom-12">
            my experience
          </h2>
        </div>

        {/* Download top-right of the list, then the expandable CV. */}
        <div className="border-t border-border p-8 md:p-12 lg:border-l lg:border-t-0">
          <div className="flex justify-end">
            <DownloadCvLink />
          </div>
          <ExperienceList />
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="flex flex-col">
          <PhotoMarquee direction="left" count={5} />
          <PhotoMarquee direction="right" count={5} />
        </div>
      </section>
    </>
  )
}
