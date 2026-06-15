import { createFileRoute } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { portfolioData } from '@/data/portfolio'
import { SiteFooter } from '@/components/SiteFooter'
import { Button } from '@/components/ui/button'

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

// Grey placeholders until photos are added. `span` controls the grid footprint.
const photoPlaceholders: { span?: 'wide' | 'tall' }[] = [
  { span: 'wide' },
  {},
  {},
  { span: 'tall' },
  {},
  {},
]

function AboutPage() {
  return (
    <main id="top" className="text-foreground">
      <section className="section-shell py-20 md:py-28">
        <Button asChild variant="ghost" size="sm" className="rounded-full">
          <a href="/">
            <ArrowLeft className="size-4" />
            back home
          </a>
        </Button>

        <h1 className="mt-8 font-display text-5xl font-black lowercase leading-[0.95] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          about me
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/80 md:text-xl">
          {portfolioData.person.intro}
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {photoPlaceholders.map((photo, index) => (
            <div
              key={index}
              aria-hidden
              className={`flex items-center justify-center rounded-2xl border border-border/60 bg-muted text-xs font-medium uppercase tracking-wide text-muted-foreground ${
                photo.span === 'wide'
                  ? 'col-span-2 aspect-[16/9]'
                  : photo.span === 'tall'
                    ? 'row-span-2 aspect-[3/4] md:aspect-auto'
                    : 'aspect-square'
              }`}
            >
              Photo
            </div>
          ))}
        </div>
      </section>

      <SiteFooter backHref="#top" backLabel="Back to top" excludeHrefs={['/cv']} />
    </main>
  )
}
