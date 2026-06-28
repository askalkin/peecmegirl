import { useState } from 'react'
import { ArrowDown, ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { cvEducation, cvKnowledge, cvRoles } from '@/data/cv'
import type { CvEducation, CvKnowledgeEntry } from '@/data/cv'

function DownloadCvLink() {
  return (
    <a
      href="/recovered/Alina-Skalkina-CV-Lead-Brand-Designer.pdf"
      target="_blank"
      rel="noreferrer"
      className="inline-flex w-fit items-center gap-2 border-b border-foreground pb-1 text-sm font-medium text-foreground transition-opacity hover:opacity-60"
    >
      Download CV
      <ArrowDown className="size-4" />
    </a>
  )
}

// Expandable, swiss-style experience list. Collapsed by default.
// Knowledge sharing and education entries follow jobs in the same list.
function ExperienceList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="border-t border-border">
      {cvRoles.map((role, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={`${role.title}-${role.company}-${role.period}`}
            className="border-t border-border first:border-t-0"
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
                  <span className="block text-sm font-medium text-muted-foreground">
                    {[role.employment, `${role.company}, ${role.country}`]
                      .filter(Boolean)
                      .join(' · ')}
                  </span>
                  <span className="mt-1 block text-h2 font-semibold text-foreground">
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

      {cvKnowledge.map((entry: CvKnowledgeEntry) => (
        <div key={entry.title} className="grid gap-2 border-t border-border py-6 md:grid-cols-[7rem_1fr] md:gap-8">
          <span className="pt-1 text-sm tabular-nums text-muted-foreground">
            {entry.year}
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">{entry.title}</p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/70">
              {entry.description}
            </p>
          </div>
        </div>
      ))}

      {cvEducation.map((entry: CvEducation) => (
        <div key={entry.title} className="grid gap-2 border-t border-border py-6 md:grid-cols-[7rem_1fr] md:gap-8">
          <span className="pt-1 text-sm tabular-nums text-muted-foreground">
            {entry.period}
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">{entry.title}</p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/70">
              {entry.note}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function AboutContent() {
  return (
    <section className="section-shell section-y">
      {/* Title left, download right; the list sits full-width below. */}
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <h2 className="text-h1 font-black lowercase text-foreground">
          my experience
        </h2>
        <DownloadCvLink />
      </div>

      <div className="mt-12 md:mt-16">
        <ExperienceList />
      </div>

    </section>
  )
}
