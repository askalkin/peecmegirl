import { createFileRoute } from '@tanstack/react-router'

import { portfolioData } from '@/data/portfolio'
import { SiteFooter } from '@/components/SiteFooter'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      {
        title: `About | ${portfolioData.person.name}`,
      },
    ],
  }),
  component: AboutPage,
})

// Minimalist swiss-style experience table.
type ExperienceRow = {
  period: string
  role: string
  company: string
  description: string
}

const experience: ExperienceRow[] = [
  {
    period: 'Feb 2026 —',
    role: 'Lead Brand Product Designer',
    company: 'Alty',
    description:
      'Lead a design team on B2B brand materials, a token-based design-system architecture, and modular Figma asset constructors.',
  },
  {
    period: 'Jun 2025 —',
    role: 'Founding Designer',
    company: 'Farba Booking',
    description:
      'Led design vision from concept to MVP across UX, product strategy, and branding, with implementation-ready handoff.',
  },
  {
    period: '2023 – 2025',
    role: 'Brand Designer',
    company: 'LUN',
    description:
      'Designed brand identity guidelines and a modular Figma asset constructor for social media; delivered assets and animations.',
  },
  {
    period: '2021 – 2025',
    role: 'Brand Designer',
    company: 'UTC FILM',
    description:
      'Led design direction for a B2B website redesign and art-directed cohesive brand identities and marketing systems.',
  },
  {
    period: '2018 – 2021',
    role: 'Growth / Marketing Designer',
    company: 'LUN',
    description:
      'Drove growth design for the LUN Misto air map and Comfort Map (+230%) and designed HR CRM workflows that cut onboarding time 40%.',
  },
]

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
            className="flex aspect-[4/3] w-[clamp(16rem,30vw,30rem)] shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-muted text-xs font-medium uppercase tracking-wide text-muted-foreground"
          >
            Photo
          </div>
        ))}
      </div>
    </div>
  )
}

function AboutPage() {
  return (
    <main id="top" className="text-foreground">
      <section className="py-20 md:py-28">
        <div className="flex flex-col gap-4">
          <PhotoMarquee direction="left" count={5} />
          <PhotoMarquee direction="right" count={5} />
        </div>
      </section>

      <section className="flex min-h-screen w-full p-20">
        <div className="grid w-full flex-1 gap-4 lg:grid-cols-2">
          <div className="flex flex-col justify-between border border-border bg-background p-8 md:p-10">
            <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              cv
            </span>
            <h2 className="font-display text-5xl font-black lowercase leading-[0.95] tracking-tight text-foreground md:text-6xl">
              my experience
            </h2>
          </div>

          <div className="bg-foreground p-8 text-background md:p-10">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="text-xs font-medium uppercase tracking-widest text-background/50">
                  <th className="pb-4 font-medium">Year</th>
                  <th className="pb-4 font-medium">Role</th>
                  <th className="pb-4 font-medium">Company</th>
                </tr>
              </thead>
              <tbody>
                {experience.map((row) => (
                  <tr
                    key={`${row.role}-${row.company}-${row.period}`}
                    className="border-t border-background/20 align-top"
                  >
                    <td className="whitespace-nowrap py-5 pr-4 text-sm text-background/60">
                      {row.period}
                    </td>
                    <td className="py-5 pr-6">
                      <span className="font-display text-base font-semibold leading-snug">
                        {row.role}
                      </span>
                      <span className="mt-1.5 block max-w-md text-sm leading-relaxed text-background/55">
                        {row.description}
                      </span>
                    </td>
                    <td className="whitespace-nowrap py-5 text-sm text-background/60">
                      {row.company}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
