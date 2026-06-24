import { useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

import {
  getProjectsNewestFirst,
  type PortfolioMediaItem,
  type PortfolioProject,
  type PortfolioStoryParagraph,
} from '@/data/portfolio'
import { ApartmentScene } from '@/components/ApartmentScene'
import { ContactSection } from '@/components/ContactSection'
import { SiteFooter } from '@/components/SiteFooter'

import { Lightbox } from './Lightbox'

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-sm font-medium text-muted-foreground">
      {children}
    </span>
  )
}

// Render a story paragraph: plain string, or a mix of text and inline links.
function renderStoryParagraph(paragraph: PortfolioStoryParagraph) {
  if (typeof paragraph === 'string') return paragraph

  return paragraph.map((segment, index) =>
    typeof segment === 'string' ? (
      <span key={index}>{segment}</span>
    ) : (
      <a
        key={index}
        href={segment.href}
        className="font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-60"
      >
        {segment.text}
      </a>
    )
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
        // Walkable 3D apartment as the hero — pulled under the floating header.
        <ApartmentScene className="-mt-16 h-[calc(78vh+4rem)] w-full" />
      ) : heroMedia ? (
        // Hero media, flush to the top with the header floating over it.
        <section className="-mt-16">
          {heroMedia.type === 'video' ? (
            <video
              className="h-[calc(68vh+4rem)] w-full object-cover"
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
              className="h-[calc(68vh+4rem)] w-full object-cover"
            />
          )}
        </section>
      ) : null}

      <div className="section-shell section-y space-y-16 md:space-y-24">
        {/* Description — client + year, then the hook and the situation/task. */}
        <header>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {project.company ?? project.title}
            </span>
            <span>{project.year}</span>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
            <h1 className="text-h1 font-bold text-foreground">
              {project.focus}
            </h1>
            {project.summary.length || project.liveLink ? (
              <div className="max-w-xl space-y-5">
                {project.summary.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-relaxed text-foreground/80"
                  >
                    {paragraph}
                  </p>
                ))}
                {project.liveLink ? (
                  <a
                    href={project.liveLink.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-base font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-60"
                  >
                    {project.liveLink.label}
                    <ArrowUpRight className="size-5" />
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </header>

        {/* Story — long-form narrative (My role, Leadership, Result…). */}
        {project.story?.length ? (
          <section className="space-y-12 md:space-y-16">
            {project.story.map((storySection) => (
              <div
                key={storySection.heading ?? storySection.paragraphs.length}
                className="grid gap-3 border-t border-border pt-8 md:grid-cols-[12rem_1fr] md:gap-12"
              >
                {storySection.heading ? (
                  <h2 className="text-h2 font-bold text-foreground">
                    {storySection.heading}
                  </h2>
                ) : (
                  <div aria-hidden />
                )}
                <div className="max-w-2xl space-y-5">
                  {storySection.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base leading-relaxed text-foreground/80"
                    >
                      {renderStoryParagraph(paragraph)}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </section>
        ) : null}

        {/* Outcomes — results table with uniform hairline dividers. */}
        {project.highlights.length ? (
          <section>
            <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {project.highlights.map((highlight) => (
                <div
                  key={`${highlight.title}-${highlight.value ?? ''}`}
                  className="flex flex-col bg-background p-6 md:p-8"
                >
                  {highlight.value ? (
                    <div className="text-h1 font-black text-foreground">
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

      {/* Visuals — masonry within the shared container; media keeps proportions. */}
      {galleryItems.length ? (
        <section className="section-shell section-y">
          <div className="columns-1 gap-4 sm:columns-2 md:gap-6 lg:columns-3">
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
            <h2 className="text-h1 font-bold text-foreground">
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
                    <h3 className="text-h2 font-semibold text-foreground">
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
    <section className="section-shell section-y border-t border-border">
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
            <h3 className="text-h1 font-bold lowercase text-foreground transition-opacity duration-200 group-hover:opacity-50">
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
      <figure className="mb-4 break-inside-avoid md:mb-6">
        <video
          className="block h-auto max-h-[80vh] w-full bg-muted object-cover"
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
    <figure className="mb-4 break-inside-avoid md:mb-6">
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
          className="block h-auto max-h-[80vh] w-full cursor-zoom-in bg-muted object-cover transition-opacity duration-300 group-hover:opacity-90"
        />
      </button>
    </figure>
  )
}
