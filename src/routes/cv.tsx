import { createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, Download } from 'lucide-react'

import { ContactSection } from '@/components/ContactSection'
import { SiteFooter } from '@/components/SiteFooter'
import { portfolioData } from '@/data/portfolio'

type CvRole = {
  title: string
  company: string
  period: string
  location?: string
  highlights: string[]
  note?: string
}

const cvRoles: CvRole[] = [
  {
    title: 'Lead Brand Product Designer',
    company: 'Alty · Full-time',
    period: 'Feb 2026 - Present',
    location: 'USA, Remote',
    highlights: [
      'Led a team of designers in the development of B2B brand materials.',
      'Engineered a token-based design-system architecture.',
      'Built modular asset constructors in Figma for social media and B2B presentations for nontechnical stakeholders.',
      'Optimized design-dev handoff with AI-assisted workflows to reduce delivery debt.',
      'Crafted visual solutions for multi-channel campaigns.',
    ],
  },
  {
    title: 'Founding Designer',
    company: 'Farba Booking · Self-employed',
    period: 'Jun 2025 - Present',
    location: 'Berlin, Germany',
    highlights: [
      'Led design vision and strategy from concept to MVP across UX, product strategy, and branding.',
      'Supported development with handoff, prototyping, and implementation-ready specifications.',
    ],
  },
  {
    title: 'Brand Designer',
    company: 'LUN · Contract',
    period: 'May 2023 - Nov 2025',
    location: 'Kyiv, Remote',
    highlights: [
      'Designed brand identity guidelines and a modular asset constructor in Figma for social media.',
      'Delivered assets and animations.',
    ],
  },
  {
    title: 'Brand Designer',
    company: 'UTC FILM Creative Agency · Contract',
    period: 'Aug 2021 - May 2025',
    location: 'Kyiv, Remote',
    highlights: [
      'Led design direction for a B2B website redesign.',
      'Facilitated cross-team workshops to align strategy during fast campaign cycles.',
      'Art-directed and built cohesive brand identities and marketing systems.',
    ],
  },
  {
    title: 'Growth Designer, Marketing Designer',
    company: 'LUN · Full-time',
    period: 'Jul 2018 - Jul 2021',
    location: 'Kyiv',
    note: 'Collaborated with designers, developers, marketers, analysts, product managers, and founders across 10 countries.',
    highlights: [
      'Drove growth design for the LUN Misto air quality map, apps, and widgets, contributing to 230% growth.',
      'Led UI/UX development of the inclusivity award-winning Comfort Map.',
      'Mentored designers and supported team capability growth.',
      'Created marketing campaign UI, B2B lead magnets, and loyalty campaign assets.',
      'Contributed to LUN brand redesign and gave a university lecture on design-frontend collaboration.',
      'Designed end-to-end HR CRM workflows that reduced onboarding time by 40% and manual HR workload by 60%.',
      'Reached 100% employee self-service adoption across teams in 10 countries.',
    ],
  },
]

export const Route = createFileRoute('/cv')({
  head: () => ({
    meta: [
      {
        title: `CV | ${portfolioData.person.name}`,
      },
    ],
  }),
  component: CvPage,
})

function CvPage() {
  const [, linkedInLink] = portfolioData.person.links

  return (
    <main className="cv-page text-foreground">
      <section className="section-shell cv-page-intro py-16 md:py-24">
        <a
          href="/#top"
          className="cv-page-backlink inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          back home
        </a>

        <div className="cv-page-hero mt-12 grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="cv-page-hero-copy space-y-6 md:col-span-8">
            <p className="cv-page-label text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Curriculum vitae
            </p>
            <h1 className="cv-page-name font-display text-5xl font-bold tracking-tight text-foreground md:text-6xl">
              {portfolioData.person.name}
            </h1>
            <p className="cv-page-summary max-w-2xl text-lg leading-relaxed text-foreground/80">
              Lead Brand Product Designer with experience across marketing,
              product, and brand systems. Focused on turning complex workflows
              into clear, usable experiences.
            </p>
            <div className="cv-print-meta">
              <span>{portfolioData.person.role}</span>
              <span>{portfolioData.person.approach}</span>
              <a href={`mailto:${portfolioData.person.email}`}>
                {portfolioData.person.email}
              </a>
              <a href={linkedInLink.href} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>

          <div className="cv-page-contact space-y-4 md:col-span-4 md:col-start-9 md:border-l md:border-border md:pl-10">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Contact
            </p>
            <a
              href={`mailto:${portfolioData.person.email}`}
              className="block text-base text-foreground transition-opacity hover:opacity-60"
            >
              {portfolioData.person.email}
            </a>
            <a
              href={linkedInLink.href}
              target="_blank"
              rel="noreferrer"
              className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {linkedInLink.href.replace('https://', '')}
            </a>
            <div className="cv-page-actions flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm">
              <a
                href={`mailto:${portfolioData.person.email}`}
                className="font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-60"
                aria-label="Email Alina Skalkina"
              >
                Email
              </a>
              <a
                href="/recovered/Alina-Skalkina-CV-Lead-Brand-Product-Designer.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-60"
              >
                <Download className="size-4" />
                Download CV
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell cv-page-experience pb-20 md:pb-28">
        <div className="grid gap-4 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-3">
            <h2 className="cv-page-section-title text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Experience
            </h2>
          </div>
          <div className="cv-page-roles md:col-span-9">
            {cvRoles.map((role) => (
              <article
                key={`${role.title}-${role.company}-${role.period}`}
                className="cv-role-card grid gap-3 border-t border-border py-8 md:grid-cols-[11rem_1fr] md:gap-10"
              >
                <div className="cv-role-period text-sm text-muted-foreground">
                  <div>{role.period}</div>
                  {role.location ? (
                    <div className="mt-1">{role.location}</div>
                  ) : null}
                </div>

                <div>
                  <div className="cv-role-header">
                    <h3 className="cv-role-title font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
                      {role.title}
                    </h3>
                    <p className="cv-role-company mt-1 text-base text-foreground/70">
                      {role.company}
                    </p>
                  </div>

                  {role.note ? (
                    <p className="cv-role-note mt-4 max-w-2xl text-base leading-relaxed text-foreground/80">
                      {role.note}
                    </p>
                  ) : null}

                  <ul className="cv-role-highlights mt-4 space-y-2.5">
                    {role.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="cv-role-highlight flex max-w-2xl gap-3 text-base leading-relaxed text-foreground/80"
                      >
                        <span className="cv-role-bullet mt-2.5 inline-block size-1 shrink-0 rounded-full bg-muted-foreground/60" />
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

      <ContactSection />
      <SiteFooter />
    </main>
  )
}
