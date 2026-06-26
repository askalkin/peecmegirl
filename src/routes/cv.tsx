import { createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, Download } from 'lucide-react'

import { ContactSection } from '@/components/ContactSection'
import { SiteFooter } from '@/components/SiteFooter'
import { cvEducation, cvKnowledge, cvRoles } from '@/data/cv'
import { portfolioData } from '@/data/portfolio'

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
            <p className="cv-page-label text-sm font-medium text-muted-foreground">
              Curriculum vitae
            </p>
            <h1 className="cv-page-name text-h1 font-bold text-foreground">
              {portfolioData.person.name}
            </h1>
            <p className="cv-page-summary max-w-2xl text-base leading-relaxed text-foreground/80">
              B2B Brand Designer by choice, Design Engineer by destiny, and the
              person asking why this component exists in five different
              versions. Helping B2B products explain themselves better, make
              visuals less generic, and design systems less likely to become
              archaeological sites.
              <br />
              <br />
              Currently exploring how AI-native workflows, design engineering,
              and brand systems are changing the way modern teams build
              identity, websites, and creative pipelines.
            </p>
            <div className="cv-print-meta">
              <span>{portfolioData.person.role}</span>
              <span>{portfolioData.person.approach}</span>
              <a href={`mailto:${portfolioData.person.email}`}>email</a>
              <a href={linkedInLink.href} target="_blank" rel="noreferrer">
                linkedin
              </a>
            </div>
          </div>

          <div className="cv-page-contact space-y-4 md:col-span-4 md:col-start-9 md:border-l md:border-border md:pl-10">
            <p className="text-sm font-medium text-muted-foreground">
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
                href="/recovered/Alina-Skalkina-CV-Lead-Brand-Designer.pdf"
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
          <div className="md:col-span-3" />
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
                    <h3 className="cv-role-title text-h2 font-bold text-foreground">
                      {role.title}
                    </h3>
                    <p className="cv-role-company mt-1 text-base text-foreground/70">
                      {role.employment
                        ? `${role.company} · ${role.employment}`
                        : role.company}
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

      <section className="section-shell cv-page-experience pb-20 md:pb-28">
        <div className="grid gap-4 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-3">
            <h2 className="cv-page-section-title text-sm font-medium text-muted-foreground">
              Knowledge Sharing
            </h2>
          </div>
          <div className="cv-page-roles md:col-span-9">
            {cvKnowledge.map((entry) => (
              <article
                key={entry.title}
                className="cv-role-card grid gap-3 border-t border-border py-8 md:grid-cols-[11rem_1fr] md:gap-10"
              >
                <div className="cv-role-period text-sm text-muted-foreground">
                  {entry.year}
                </div>
                <div>
                  <h3 className="cv-role-title text-h2 font-bold text-foreground">
                    {entry.title}
                  </h3>
                  <p className="cv-role-note mt-3 max-w-2xl text-base leading-relaxed text-foreground/80">
                    {entry.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell cv-page-experience pb-20 md:pb-28">
        <div className="grid gap-4 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-3">
            <h2 className="cv-page-section-title text-sm font-medium text-muted-foreground">
              Education
            </h2>
          </div>
          <div className="cv-page-roles md:col-span-9">
            {cvEducation.map((entry) => (
              <article
                key={entry.title}
                className="cv-role-card grid gap-3 border-t border-border py-8 md:grid-cols-[11rem_1fr] md:gap-10"
              >
                <div className="cv-role-period text-sm text-muted-foreground">
                  {entry.period}
                </div>
                <div>
                  <h3 className="cv-role-title text-h2 font-bold text-foreground">
                    {entry.title}
                  </h3>
                  <p className="cv-role-note mt-3 max-w-2xl text-base leading-relaxed text-foreground/80">
                    {entry.note}
                  </p>
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
