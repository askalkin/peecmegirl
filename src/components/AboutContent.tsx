import { ArrowDown } from 'lucide-react'

import { cvRoles } from '@/data/cv'

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
          <div
            key={index}
            aria-hidden
            className="flex aspect-[4/3] w-[clamp(16rem,30vw,30rem)] shrink-0 items-center justify-center bg-muted text-xs font-medium uppercase tracking-wide text-muted-foreground"
          >
            Photo
          </div>
        ))}
      </div>
    </div>
  )
}

export function AboutContent() {
  return (
    <>
      {/* CV — full-bleed; sticky left panel, full experience scrolls on the right. */}
      <section className="w-full">
        <div className="grid w-full lg:grid-cols-2 lg:items-start">
          <div className="flex min-h-screen flex-col justify-between gap-12 p-8 md:p-12 lg:sticky lg:top-0">
            <a
              href="/recovered/Alina-Skalkina-CV-Lead-Brand-Product-Designer.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 border-b border-foreground pb-1 text-sm font-medium text-foreground transition-opacity hover:opacity-60"
            >
              Download CV
              <ArrowDown className="size-4" />
            </a>
            <h2 className="font-display text-5xl font-black lowercase leading-[0.95] tracking-tight text-foreground md:text-6xl">
              my experience
            </h2>
          </div>

          <div className="border-t border-border bg-background p-8 text-foreground md:p-12 lg:border-l lg:border-t-0">
            {cvRoles.map((role) => (
              <article
                key={`${role.title}-${role.company}-${role.period}`}
                className="grid gap-3 border-t border-border py-8 first:border-t-0 first:pt-0 md:grid-cols-[10rem_1fr] md:gap-8"
              >
                <div className="text-sm text-muted-foreground">
                  <div className="whitespace-nowrap">{role.period}</div>
                  {role.location ? (
                    <div className="mt-1">{role.location}</div>
                  ) : null}
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
                    {role.title}
                  </h3>
                  <p className="mt-1 text-base text-foreground/70">
                    {role.company}
                  </p>

                  {role.note ? (
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/80">
                      {role.note}
                    </p>
                  ) : null}

                  <ul className="mt-4 space-y-2.5">
                    {role.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex max-w-2xl gap-3 text-sm leading-relaxed text-foreground/80"
                      >
                        <span className="mt-2 inline-block size-1 shrink-0 rounded-full bg-muted-foreground/60" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
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
