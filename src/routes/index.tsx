import { createFileRoute } from '@tanstack/react-router'

import {
  getProjectsNewestFirst,
  type PortfolioProject,
} from '@/data/portfolio'
import { ContactSection } from '@/components/ContactSection'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteNav } from '@/components/SiteNav'

export const Route = createFileRoute('/')({ component: PortfolioPage })

type CardMedia =
  | { type: 'video'; src: string }
  | { type: 'image'; src: string }
  | null

function getCardMedia(project: PortfolioProject): CardMedia {
  const video = project.gallery.find((item) => item.type === 'video')
  if (video) return { type: 'video', src: video.src }

  const image = project.gallery.find((item) => item.type === 'image')
  if (image) return { type: 'image', src: image.src }

  return null
}

function PortfolioPage() {
  const sortedProjects = getProjectsNewestFirst()

  return (
    <main id="top" className="text-foreground">
      <section className="section-shell flex min-h-[calc(100vh-8rem)] items-center py-20">
        <div className="flex w-full items-end gap-6 sm:gap-10">
          <h1 className="font-display text-5xl font-black lowercase leading-[0.95] tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-[7.5rem]">
            alina skalkina
            <br />
            brand designer
          </h1>
          <span
            aria-hidden
            className="mb-[0.12em] hidden aspect-square w-[14vw] max-w-40 shrink-0 rounded-full bg-muted sm:block"
          />
        </div>
      </section>

      <section id="work" className="scroll-mt-20">
        <div className="grid grid-cols-1 gap-px border-y border-border bg-border md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <div className="py-16 md:py-20">
        <SiteNav />
      </div>

      <ContactSection id="contact" />

      <SiteFooter backHref="#top" backLabel="back to top" />
    </main>
  )
}

function ProjectCard({ project }: { project: PortfolioProject }) {
  const media = getCardMedia(project)

  return (
    <a
      href={`/${project.id}`}
      className="group flex flex-col bg-background transition-colors hover:bg-muted/40"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {media?.type === 'video' ? (
          <video
            className="absolute inset-0 h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-[1.04]"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label={`${project.title} preview`}
          >
            <source src={media.src} />
          </video>
        ) : media?.type === 'image' ? (
          <img
            src={media.src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-[1.04]"
            loading="lazy"
          />
        ) : null}
      </div>

      <div className="px-4 py-4">
        <h3 className="font-display text-base font-semibold tracking-tight text-foreground">
          {project.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.focus}
        </p>
      </div>
    </a>
  )
}
