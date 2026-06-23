import { useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

import {
  getProjectsNewestFirst,
  type PortfolioMediaItem,
  type PortfolioProject,
} from '@/data/portfolio'
import { ApartmentScene } from '@/components/ApartmentScene'
import { ContactSection } from '@/components/ContactSection'
import { SiteFooter } from '@/components/SiteFooter'
import { cn } from '@/lib/utils'

import { Lightbox } from './Lightbox'

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </span>
  )
}

export function ProjectPage({ project }: { project: PortfolioProject }) {
  const imageItems = useMemo(
    () =>
      project.gallery.filter(
        (item): item is PortfolioMediaItem & { type: 'image' } =>
          item.type === 'image'
      ),
    [project.gallery]
  )

  const leadVideo =
    project.gallery.find(
      (item): item is PortfolioMediaItem & { type: 'video' } =>
        item.type === 'video'
    ) ?? null
  const usesApartmentScene = project.id === 'ar-apartment-tour'
  const heroMedia = usesApartmentScene ? null : leadVideo ?? imageItems[0] ?? null
  const galleryItems = project.gallery.filter(
    (item) => item.src !== heroMedia?.src
  )

  const imageIndexBySrc = useMemo(
    () => new Map(imageItems.map((item, index) => [item.src, index])),
    [imageItems]
  )
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)

  const moreProjects = getProjectsNewestFirst().filter(
    (currentProject) => currentProject.id !== project.id
  )

  const roleTags = project.role
    ? project.role.split(',').map((part) => part.trim())
    : []

  function openImage(item: PortfolioMediaItem) {
    const imageIndex = imageIndexBySrc.get(item.src)
    if (imageIndex === undefined) return
    setActiveImageIndex(imageIndex)
  }

  function showPreviousImage() {
    setActiveImageIndex((currentIndex) => {
      if (currentIndex === null || imageItems.length === 0) return currentIndex
      return (currentIndex - 1 + imageItems.length) % imageItems.length
    })
  }

  function showNextImage() {
    setActiveImageIndex((currentIndex) => {
      if (currentIndex === null || imageItems.length === 0) return currentIndex
      return (currentIndex + 1) % imageItems.length
    })
  }

  return (
    <main className="text-foreground">
      {usesApartmentScene ? (
        // Walkable 3D apartment as the hero.
        <ApartmentScene className="h-[78vh] w-full" />
      ) : heroMedia ? (
        // Hero media — first section; ~68vh leaves the title visible on load.
        <section>
          {heroMedia.type === 'video' ? (
            <video
              className="h-[68vh] w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src={heroMedia.src} />
            </video>
          ) : (
            <img
              src={heroMedia.src}
              alt={heroMedia.alt}
              className="h-[68vh] w-full object-cover"
            />
          )}
        </section>
      ) : null}

      <div className="section-shell space-y-16 py-12 md:space-y-24 md:py-16">
        {/* Description — name, role labels, the hook, and the situation/task. */}
        <header>
          <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {project.company
                ? `${project.title}, ${project.company}`
                : project.title}
            </span>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {roleTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-0.5 text-sm lowercase text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
              <span className="text-sm text-muted-foreground">{project.year}</span>
            </div>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
            <h1 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-foreground md:text-4xl">
              {project.focus}
            </h1>
            {project.summary.length || project.liveLink ? (
              <div className="max-w-xl space-y-5">
                {project.summary.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-relaxed text-foreground/80 md:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
                {project.liveLink ? (
                  <a
                    href={project.liveLink.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-base font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-60 md:text-lg"
                  >
                    {project.liveLink.label}
                    <ArrowUpRight className="size-5" />
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </header>

        {/* Outcomes — results dashboard. */}
        {project.highlights.length ? (
          <section className="space-y-8">
            <Label>Outcomes</Label>
            <div className="grid grid-cols-1 border-t border-border sm:grid-cols-2 lg:grid-cols-4">
              {project.highlights.map((highlight, index) => (
                <div
                  key={`${highlight.title}-${highlight.value ?? ''}`}
                  className={cn(
                    'flex flex-col border-border py-8 lg:px-8 lg:first:pl-0',
                    index > 0 && 'border-t lg:border-l lg:border-t-0'
                  )}
                >
                  {highlight.value ? (
                    <div className="font-display text-4xl font-black tracking-tight text-foreground md:text-5xl">
                      {highlight.value}
                    </div>
                  ) : null}
                  <div className="mt-3 text-sm font-semibold text-foreground">
                    {highlight.title}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>

      {/* Visuals — full-width masonry; media keeps its proportions. */}
      {galleryItems.length ? (
        <section className="w-full pb-16 md:pb-24">
          <div className="columns-1 gap-2 sm:columns-2 md:gap-3 lg:columns-3">
            {galleryItems.map((item) => (
              <MasonryTile
                key={item.src}
                item={item}
                onImageClick={() => openImage(item)}
              />
            ))}
          </div>
        </section>
      ) : null}

      <div className="section-shell space-y-20 pb-16 md:space-y-28 md:pb-24">
        {/* Challenges — the approach / actions, as its own heading. */}
        {project.process.length ? (
          <section className="space-y-10">
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              Challenges
            </h2>
            <div className="space-y-10">
              {project.process.map((step, index) => (
                <article
                  key={step.title}
                  className="grid gap-2 border-t border-border pt-6 md:grid-cols-[3rem_1fr] md:gap-8"
                >
                  <span className="text-sm tabular-nums text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/80">
                      {step.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {project.team.length ? (
          <section className="space-y-5">
            <Label>shout-out to my team!</Label>
            <ul className="flex flex-wrap gap-x-8 gap-y-2 text-base text-foreground/70">
              {project.team.map((member) => (
                <li key={member}>{member}</li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>

      <MoreProjects projects={moreProjects} />

      <ContactSection />
      <SiteFooter />

      <Lightbox
        activeIndex={activeImageIndex}
        images={imageItems}
        onClose={() => setActiveImageIndex(null)}
        onNext={showNextImage}
        onPrevious={showPreviousImage}
      />
    </main>
  )
}

// First video (else first image) of a project — used for the hover preview.
function getPreviewMedia(project: PortfolioProject) {
  const video = project.gallery.find((item) => item.type === 'video')
  if (video) return { type: 'video' as const, src: video.src }
  const image = project.gallery.find((item) => item.type === 'image')
  if (image) return { type: 'image' as const, src: image.src }
  return null
}

// "More projects" list with a cursor-following media preview on hover.
function MoreProjects({ projects }: { projects: PortfolioProject[] }) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const active = activeId
    ? projects.find((project) => project.id === activeId) ?? null
    : null
  const media = active ? getPreviewMedia(active) : null

  return (
    <section className="section-shell border-t border-border py-16 md:py-20">
      <Label>More projects</Label>
      <div className="mt-6">
        {projects.map((relatedProject) => (
          <a
            key={relatedProject.id}
            href={`/${relatedProject.id}`}
            onMouseEnter={() => setActiveId(relatedProject.id)}
            onMouseMove={(event) =>
              setPosition({ x: event.clientX, y: event.clientY })
            }
            onMouseLeave={() =>
              setActiveId((current) =>
                current === relatedProject.id ? null : current
              )
            }
            className="group flex items-baseline justify-between gap-6 border-b border-border py-6"
          >
            <h3 className="font-display text-2xl font-bold lowercase tracking-tight text-foreground transition-opacity duration-200 group-hover:opacity-50 md:text-4xl">
              {relatedProject.title}
            </h3>
            <span className="shrink-0 text-sm text-muted-foreground">
              {relatedProject.year}
            </span>
          </a>
        ))}
      </div>

      {media ? (
        <div
          aria-hidden
          className="pointer-events-none fixed z-40 hidden w-64 overflow-hidden shadow-[var(--shadow-surface)] md:block"
          style={{
            left: position.x,
            top: position.y,
            transform: 'translate(-50%, -112%)',
          }}
        >
          {media.type === 'video' ? (
            <video
              key={media.src}
              className="block aspect-[4/3] w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={media.src} />
            </video>
          ) : (
            <img
              key={media.src}
              src={media.src}
              alt=""
              className="block aspect-[4/3] w-full object-cover"
            />
          )}
        </div>
      ) : null}
    </section>
  )
}

function MasonryTile({
  item,
  onImageClick,
}: {
  item: PortfolioMediaItem
  onImageClick: () => void
}) {
  if (item.type === 'video') {
    return (
      <figure className="mb-2 break-inside-avoid md:mb-3">
        <video
          className="block h-auto w-full bg-muted"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label={item.alt}
        >
          <source src={item.src} />
        </video>
      </figure>
    )
  }

  return (
    <figure className="mb-2 break-inside-avoid md:mb-3">
      <button
        type="button"
        onClick={onImageClick}
        aria-label={`Open ${item.alt}`}
        className="group block w-full"
      >
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          className="block h-auto w-full cursor-zoom-in bg-muted transition-opacity duration-300 group-hover:opacity-90"
        />
      </button>
    </figure>
  )
}
