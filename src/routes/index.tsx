import { useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import {
  getProjectsNewestFirst,
  type PortfolioProject,
} from '@/data/portfolio'
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
      <section className="section-shell flex min-h-[calc(100vh-4rem)] flex-col justify-between py-12 md:py-16">
        <div className="flex justify-end">
          <BrandQuestions className="max-w-xl text-right text-2xl md:text-3xl lg:text-4xl" />
        </div>

        <div className="flex w-full items-end gap-6 sm:gap-10">
          <h1 className="font-display text-5xl font-black lowercase leading-[0.95] tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-[7.5rem]">
            alina skalkina
            <br />
            brand designer
          </h1>
          <span
            aria-hidden
            className="hidden aspect-square w-[clamp(7rem,16vw,14rem)] shrink-0 self-end rounded-full bg-foreground sm:block"
          />
        </div>
      </section>

      <section id="work" className="scroll-mt-20">
        <div className="grid grid-cols-1 gap-px border-y border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
          {sortedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

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
