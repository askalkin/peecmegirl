import { useMemo, useState } from 'react'
import { ArrowLeft, ExternalLink } from 'lucide-react'

import {
  getProjectsNewestFirst,
  type PortfolioMediaItem,
  type PortfolioProject,
} from '@/data/portfolio'
import { ContactSection } from '@/components/ContactSection'
import { SiteFooter } from '@/components/SiteFooter'
import { cn } from '@/lib/utils'

import { Lightbox } from './Lightbox'

// Projects that lead with a full-bleed cinematic hero, with the project info
// following beneath it. Everyone else shows media + info together in one view.
const FULL_BLEED_HERO = new Set(['air-quality-map', 'huawei'])

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </span>
  )
}

// One calm editorial row: a quiet label on the left, content on the right.
function Row({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <section className="grid gap-4 md:grid-cols-12 md:gap-12">
      <div className="md:col-span-3">
        <Label>{label}</Label>
      </div>
      <div className="md:col-span-9">{children}</div>
    </section>
  )
}

// Title, description and the data + achievements grid. Shared by both hero modes.
function ProjectMeta({ project }: { project: PortfolioProject }) {
  const stats = [
    { label: 'Year', value: project.year },
    ...project.highlights
      .filter((highlight) => Boolean(highlight.value))
      .map((highlight) => ({
        label: highlight.title,
        value: highlight.value as string,
      })),
  ].slice(0, 6)

  return (
    <div className="flex flex-col gap-8">
      <a
        href="/#work"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        works
      </a>

      <div>
        <Label>Case study</Label>
        <h1 className="mt-4 font-display text-4xl font-bold lowercase leading-[1.02] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          {project.title}
        </h1>
      </div>

      <p className="max-w-2xl text-lg leading-relaxed text-foreground/70 md:text-xl">
        {project.focus}
      </p>

      <dl className="grid grid-cols-2 gap-x-8 gap-y-7">
        {stats.map((stat) => (
          <div key={`${stat.label}-${stat.value}`}>
            <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {stat.label}
            </dt>
            <dd className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      {project.role ? (
        <div>
          <Label>Role</Label>
          <p className="mt-1.5 max-w-md text-sm leading-relaxed text-foreground/80">
            {project.role}
          </p>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex flex-wrap gap-2">
          {project.categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-wide text-muted-foreground"
            >
              {category}
            </span>
          ))}
        </div>
        {project.liveLink ? (
          <a
            href={project.liveLink.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-60"
          >
            {project.liveLink.label}
            <ExternalLink className="size-4" />
          </a>
        ) : null}
      </div>
    </div>
  )
}

export function ProjectPage({ project }: { project: PortfolioProject }) {
  const leadVideo =
    project.gallery.find(
      (item): item is PortfolioMediaItem & { type: 'video' } => item.type === 'video'
    ) ?? null

  const imageItems = useMemo(
    () =>
      project.gallery.filter(
        (item): item is PortfolioMediaItem & { type: 'image' } =>
          item.type === 'image'
      ),
    [project.gallery]
  )

  const heroMedia = leadVideo ?? imageItems[0] ?? null
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

  const useSplitHero = !FULL_BLEED_HERO.has(project.id) && heroMedia !== null

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
      {useSplitHero ? (
        // Media + project info together in one viewport.
        <section className="grid min-h-screen lg:grid-cols-2">
          <div className="flex items-center justify-center p-8 lg:p-12">
            {heroMedia?.type === 'video' ? (
              <video
                className="max-h-[80vh] w-full object-contain"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src={heroMedia.src} />
              </video>
            ) : heroMedia ? (
              <img
                src={heroMedia.src}
                alt={heroMedia.alt}
                className="max-h-[80vh] w-full object-contain"
              />
            ) : null}
          </div>
          <div className="flex flex-col justify-center p-8 lg:border-l lg:border-border lg:p-12">
            <ProjectMeta project={project} />
          </div>
        </section>
      ) : (
        // Full-bleed hero, then the description beneath it.
        <>
          {heroMedia?.type === 'video' ? (
            <video
              className="h-[80vh] max-h-[90vh] w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src={heroMedia.src} />
            </video>
          ) : heroMedia ? (
            <img
              src={heroMedia.src}
              alt={heroMedia.alt}
              className="h-[80vh] max-h-[90vh] w-full object-cover"
            />
          ) : null}
          <section className={cn('section-shell', heroMedia ? 'py-16 md:py-24' : 'pb-16 pt-16 md:pb-24 md:pt-28')}>
            <ProjectMeta project={project} />
          </section>
        </>
      )}

      <div className="section-shell space-y-20 py-16 md:space-y-28 md:py-24">
        {/* Overview — narrative, with the old process steps folded in. */}
        {project.summary.length || project.process.length ? (
          <Row label="Overview">
            <div className="max-w-3xl space-y-5">
              {project.summary.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-lg leading-relaxed text-foreground/80"
                >
                  {paragraph}
                </p>
              ))}
              {project.process.map((step) => (
                <p
                  key={step.title}
                  className="text-lg leading-relaxed text-foreground/80"
                >
                  <span className="font-medium text-foreground">
                    {step.title}.
                  </span>{' '}
                  {step.description}
                </p>
              ))}
            </div>
          </Row>
        ) : null}

        {/* Outcomes — the full achievements with their descriptions. */}
        {project.highlights.length ? (
          <Row label="Outcomes">
            <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {project.highlights.map((highlight) => (
                <article key={`${highlight.title}-${highlight.value ?? ''}`}>
                  <div className="text-base font-medium text-foreground">
                    {highlight.value ? (
                      <span className="mr-2 font-display font-semibold">
                        {highlight.value}
                      </span>
                    ) : null}
                    {highlight.title}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {highlight.description}
                  </p>
                </article>
              ))}
            </div>
          </Row>
        ) : null}

        {/* Selected work — clean grid; wide items break full width for rhythm. */}
        {galleryItems.length ? (
          <section className="space-y-8">
            <Label>Selected work</Label>
            <div className="grid items-start gap-6 md:grid-cols-2 md:gap-8">
              {galleryItems.map((item) => (
                <MediaTile
                  key={item.src}
                  item={item}
                  className={item.span === 'wide' ? 'md:col-span-2' : undefined}
                  onImageClick={() => openImage(item)}
                />
              ))}
            </div>
          </section>
        ) : null}

        {/* Team */}
        {project.team.length ? (
          <Row label="Team">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-base text-foreground/70">
              {project.team.map((member) => (
                <li key={member}>{member}</li>
              ))}
            </ul>
          </Row>
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

function MediaTile({
  item,
  className,
  onImageClick,
}: {
  item: PortfolioMediaItem
  className?: string
  onImageClick: () => void
}) {
  if (item.type === 'video') {
    return (
      <figure className={className}>
        <video
          className="block h-auto max-h-[90vh] w-full bg-muted object-contain"
          controls
          muted
          playsInline
          preload="metadata"
        >
          <source src={item.src} />
        </video>
        {item.caption ? (
          <figcaption className="mt-3 text-sm leading-6 text-muted-foreground">
            {item.caption}
          </figcaption>
        ) : null}
      </figure>
    )
  }

  return (
    <figure className={className}>
      <button
        type="button"
        onClick={onImageClick}
        className="group block w-full text-left"
        aria-label={`Open ${item.alt}`}
      >
        <img
          src={item.src}
          alt={item.alt}
          className="block h-auto max-h-[90vh] w-full cursor-zoom-in bg-muted object-contain transition-opacity duration-300 group-hover:opacity-90"
          loading="lazy"
        />
      </button>
      {item.caption ? (
        <figcaption className="mt-3 text-sm leading-6 text-muted-foreground">
          {item.caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
