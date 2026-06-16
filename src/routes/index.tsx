import { useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import {
  getProjectsNewestFirst,
  type PortfolioProject,
} from '@/data/portfolio'
import { AboutContent } from '@/components/AboutContent'
import { BrandQuestions } from '@/components/BrandQuestions'
import { ContactSection } from '@/components/ContactSection'
import { SiteFooter } from '@/components/SiteFooter'

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
      <section className="section-shell relative flex h-[calc(100vh-4rem)] flex-col justify-end py-12 md:py-16">
        {/* Absolutely positioned so the typing text never shifts the layout. */}
        <div className="absolute inset-x-0 top-12 flex justify-start sm:justify-end md:top-16">
          <BrandQuestions className="max-w-full text-left lowercase text-5xl sm:text-right md:text-6xl lg:max-w-none lg:text-7xl" />
        </div>

        <div className="flex w-full flex-col items-start gap-5 sm:flex-row sm:items-end sm:gap-6">
          <span
            aria-hidden
            className="hero-orb size-[clamp(2.5rem,8vw,8.5rem)] shrink-0 rounded-full bg-foreground sm:order-2"
          />
          <h1 className="font-display text-[clamp(2.75rem,10vw,11rem)] font-black lowercase leading-[0.95] tracking-tight text-foreground sm:order-1">
            alina skalkina
            <br />
            brand designer
          </h1>
        </div>
      </section>

      <section id="work" className="scroll-mt-20">
        <div className="grid grid-cols-1 gap-px border-y border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
          {sortedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <div id="about" className="scroll-mt-24">
        <AboutContent />
      </div>

      <ContactSection id="contact" />

      <SiteFooter />
    </main>
  )
}

function ProjectCard({ project }: { project: PortfolioProject }) {
  const media = getCardMedia(project)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleEnter = () => {
    videoRef.current?.play().catch(() => {})
  }

  const handleLeave = () => {
    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = 0
    }
  }

  const labels = [project.workType, project.businessSize].filter(Boolean)

  return (
    <a
      href={`/${project.id}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group flex flex-col bg-background transition-colors hover:bg-muted/40"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted lg:aspect-auto lg:h-[52vh] xl:h-[56vh]">
        {media?.type === 'video' ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
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
            className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
            loading="lazy"
          />
        ) : null}

        {labels.length > 0 ? (
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {labels.map((label) => (
              <span
                key={label}
                className="rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-foreground backdrop-blur-sm"
              >
                {label}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="px-4 py-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-base font-semibold tracking-tight text-foreground">
            {project.title}
          </h3>
          <span className="shrink-0 text-sm text-muted-foreground">
            {project.year}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.focus}
        </p>
      </div>
    </a>
  )
}
