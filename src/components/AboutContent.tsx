import { useState } from 'react'
import { ArrowDown, ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { cvRoles } from '@/data/cv'
import { portfolioData } from '@/data/portfolio'

const cvLink = portfolioData.person.links.find((l) => l.label === 'Download CV')

function DownloadCvLink() {
  return (
    <a
      href={cvLink?.href ?? '/recovered/Alina-Skalkina-CV.pdf'}
      target="_blank"
      rel="noreferrer"
      className="group/cv relative inline-flex w-fit items-center gap-2 text-sm font-medium text-foreground"
    >
      Download CV
      <ArrowDown className="size-4" />
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-0 bg-foreground transition-[width] duration-300 ease-in-out group-hover/cv:w-full"
      />
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
                <span className="pt-1 text-base font-bold tabular-nums text-text-primary">
                  {role.years}
                </span>
                <span>
                  <span className="block text-sm font-medium text-text-secondary">
                    {[role.employment, `${role.company}, ${role.country}`]
                      .filter(Boolean)
                      .join(' · ')}
                  </span>
                  <span className="mt-1 block text-h2 font-semibold text-text-primary">
                    {role.title}
                  </span>
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'mt-1.5 size-5 shrink-0 text-text-secondary transition-transform duration-300',
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
                  <p className="mb-4 max-w-2xl text-base leading-relaxed text-text-secondary">
                    {role.companyAbout}
                  </p>
                  <ul className="space-y-2.5">
                    {role.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex max-w-2xl gap-3 text-base leading-relaxed text-text-primary"
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
    <section className="section-shell section-y">
      {/* Title left, download right; the list sits full-width below. */}
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <h2 className="text-h1 font-black text-text-primary">
          My experience
        </h2>
        <DownloadCvLink />
      </div>

      <div className="mt-12 md:mt-16">
        <ExperienceList />
      </div>

    </section>
  )
}
