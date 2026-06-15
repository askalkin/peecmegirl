import { createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, Download, Mail } from 'lucide-react'

import { ContactSection } from '@/components/ContactSection'
import { SiteFooter } from '@/components/SiteFooter'
import { Button } from '@/components/ui/button'
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
    <main className="cv-page pb-20">
      <section className="section-shell cv-page-intro py-12 sm:py-16">
        <a
          href="/#top"
          className="cv-page-backlink inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </a>

        <div className="cv-page-hero mt-10 grid gap-8 rounded-3xl border border-border/80 bg-card p-7 shadow-[var(--shadow-surface)] sm:p-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="cv-page-hero-copy space-y-5">
            <p className="cv-page-label text-sm font-medium text-muted-foreground">
              Curriculum vitae
            </p>
            <h1 className="cv-page-name text-4xl font-semibold tracking-tight text-card-foreground sm:text-5xl">
              {portfolioData.person.name}
            </h1>
            <p className="cv-page-summary max-w-3xl text-lg leading-8 text-foreground/80">
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

          <div className="cv-page-contact space-y-5 rounded-2xl border border-border bg-muted/35 p-6">
            <div className="text-sm font-medium text-muted-foreground">Contact</div>
            <a
              href={`mailto:${portfolioData.person.email}`}
              className="block text-base font-medium text-card-foreground transition-colors hover:text-foreground/75"
            >
              {portfolioData.person.email}
            </a>
            <a
              href={linkedInLink.href}
              target="_blank"
              rel="noreferrer"
              className="cv-page-contact-link hidden text-sm text-muted-foreground"
            >
              {linkedInLink.href.replace('https://', '')}
            </a>
            <div className="cv-page-actions flex flex-wrap gap-3 pt-2">
              <Button asChild variant="outline" className="rounded-full">
                <a
                  href={`mailto:${portfolioData.person.email}`}
                  aria-label="Email Alina Skalkina"
                >
                  <Mail className="size-4" />
                  Email
                </a>
              </Button>
              <Button asChild className="rounded-full">
                <a
                  href="/recovered/Alina-Skalkina-CV-Lead-Brand-Product-Designer.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Download className="size-4" />
                  Download CV
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell cv-page-experience py-20">
        <h2 className="cv-page-section-title text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Experience
        </h2>
        <div className="cv-page-roles mt-8 space-y-3">
          {cvRoles.map((role) => (
            <article
              key={`${role.title}-${role.company}-${role.period}`}
              className="cv-role-card rounded-2xl border border-border/80 bg-card p-6 shadow-[var(--shadow-surface)] sm:p-7"
            >
              <div className="cv-role-header flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="cv-role-copy space-y-2">
                  <h3 className="cv-role-title text-2xl font-semibold tracking-tight text-card-foreground">
                    {role.title}
                  </h3>
                  <p className="cv-role-company text-base text-foreground/80">
                    {role.company}
                  </p>
                </div>
                <div className="cv-role-period text-sm text-muted-foreground sm:text-right">
                  <div>{role.period}</div>
                  {role.location ? <div>{role.location}</div> : null}
                </div>
              </div>

              {role.note ? (
                <p className="cv-role-note mt-5 text-base leading-7 text-foreground/80">
                  {role.note}
                </p>
              ) : null}

              <ul className="cv-role-highlights mt-5 space-y-3">
                {role.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="cv-role-highlight flex gap-3 text-base leading-7 text-foreground/80"
                  >
                    <span className="cv-role-bullet mt-3 inline-block size-1.5 shrink-0 rounded-full bg-muted-foreground/65" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <ContactSection />
      <SiteFooter />
    </main>
  )
}
