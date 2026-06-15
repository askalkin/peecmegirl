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

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
      {children}
    </span>
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

  const stats = [
    { label: 'Year', value: project.year },
    ...project.highlights
      .filter((highlight) => Boolean(highlight.value))
      .map((highlight) => ({ label: highlight.title, value: highlight.value as string })),
  ].slice(0, 6)

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
      {/* Split hero — media on the left, meta + stats on the right. */}
      <section className="grid min-h-screen lg:grid-cols-2">
        <div className="flex items-center justify-center bg-background p-10 lg:p-16">
          {heroMedia?.type === 'video' ? (
            <video
              className="max-h-[72vh] w-full object-contain"
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
              className="max-h-[72vh] w-full object-contain"
            />
          ) : (
            <div className="aspect-square w-full max-w-md bg-muted" aria-hidden />
          )}
        </div>

        <div className="flex flex-col justify-center gap-10 p-10 lg:border-l lg:border-border lg:p-16">
          <a
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            works
          </a>

          <div>
            <Label>Case study</Label>
            <h1 className="mt-4 font-display text-5xl font-black lowercase leading-[0.95] tracking-tight text-foreground md:text-6xl">
              {project.title}
            </h1>
          </div>

          <p className="max-w-md text-lg leading-relaxed text-foreground/70">
            {project.focus}
          </p>

          <dl className="grid grid-cols-2 gap-x-8 gap-y-7">
            {stats.map((stat) => (
              <div key={`${stat.label}-${stat.value}`}>
                <dt className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {project.liveLink ? (
              <a
                href={project.liveLink.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline-offset-4 transition-opacity hover:opacity-60"
              >
                {project.liveLink.label}
                <ExternalLink className="size-4" />
              </a>
            ) : null}
            <span className="text-sm text-muted-foreground">
              {project.categories.join(' · ')}
            </span>
          </div>
        </div>
      </section>

      <div className="space-y-24 px-10 py-24 lg:px-16">
        {/* Context — asymmetric: narrative left, framing right. */}
        {project.summary.length || project.goals || project.role ? (
          <section className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
            <div className="space-y-5 lg:col-span-7">
              <Label>Context</Label>
              {project.summary.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-lg leading-relaxed text-foreground/80"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="space-y-8 lg:col-span-4 lg:col-start-9">
              {project.goals ? (
                <div>
                  <Label>Problem to solve</Label>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80">
                    {project.goals}
                  </p>
                </div>
              ) : null}
              {project.role ? (
                <div>
                  <Label>Role</Label>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80">
                    {project.role}
                  </p>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {/* Outcomes */}
        {project.highlights.length ? (
          <section className="space-y-10">
            <Label>Outcomes</Label>
            <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {project.highlights.map((highlight) => (
                <article
                  key={`${highlight.title}-${highlight.value ?? ''}`}
                  className="border-t border-border pt-5"
                >
                  {highlight.value ? (
                    <div className="font-display text-4xl font-black tracking-tight text-foreground">
                      {highlight.value}
                    </div>
                  ) : null}
                  <div className="mt-2 text-sm font-medium text-foreground">
                    {highlight.title}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {highlight.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {/* Approach */}
        {project.process.length ? (
          <section className="space-y-10">
            <Label>Approach</Label>
            <div className="grid gap-x-10 gap-y-12 lg:grid-cols-2">
              {project.process.map((step, index) => (
                <article
                  key={step.title}
                  className="flex gap-6 border-t border-border pt-6"
                >
                  <span className="font-display text-2xl font-black tracking-tight text-muted-foreground/40">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
                      {step.title}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-foreground/80">
                      {step.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {/* Selected work — asymmetric media grid. */}
        {galleryItems.length ? (
          <section className="space-y-10">
            <Label>Selected work</Label>
            <div className="grid grid-flow-row-dense gap-4 sm:grid-cols-2 lg:grid-cols-12">
              {galleryItems.map((item) => (
                <MediaTile
                  key={item.src}
                  item={item}
                  onImageClick={() => openImage(item)}
                />
              ))}
            </div>
          </section>
        ) : null}

        {/* Team */}
        {project.team.length ? (
          <section className="space-y-6">
            <Label>Team</Label>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/70">
              {project.team.map((member) => (
                <li key={member} className="border-l border-border pl-3">
                  {member}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>

      {/* More projects */}
      <section className="border-t border-border px-10 py-20 lg:px-16">
        <Label>More projects</Label>
        <div className="mt-6">
          {moreProjects.map((relatedProject) => (
            <a
              key={relatedProject.id}
              href={`/${relatedProject.id}`}
              className="group flex items-baseline justify-between gap-6 border-b border-border py-6"
            >
              <h3 className="font-display text-3xl font-black lowercase tracking-tight text-foreground transition-opacity duration-200 group-hover:opacity-50 md:text-4xl">
                {relatedProject.title}
              </h3>
              <span className="shrink-0 text-sm text-muted-foreground">
                {relatedProject.year}
              </span>
            </a>
          ))}
        </div>
      </section>

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

function MediaTile({
  item,
  onImageClick,
}: {
  item: PortfolioMediaItem
  onImageClick: () => void
}) {
  // Asymmetry comes from the media's own dimensions: wide items take more
  // columns and a landscape ratio, tall items stay narrow and portrait.
  const spanClass = cn(
    'sm:col-span-1 lg:col-span-4',
    item.span === 'wide' && 'sm:col-span-2 lg:col-span-8',
    item.span === 'tall' && 'sm:col-span-1 lg:col-span-4'
  )
  const ratioClass =
    item.span === 'wide'
      ? 'aspect-[16/10]'
      : item.span === 'tall'
        ? 'aspect-[3/4]'
        : 'aspect-[4/5]'

  if (item.type === 'video') {
    return (
      <figure className={spanClass}>
        <div
          className={cn(
            'group relative overflow-hidden bg-muted',
            ratioClass
          )}
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            controls
            muted
            playsInline
            preload="metadata"
          >
            <source src={item.src} />
          </video>
          {item.caption ? (
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--color-overlay-scrim)] via-[var(--color-overlay-scrim-soft)] to-transparent p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <p className="text-sm leading-6 text-[var(--color-overlay-foreground)]">
                {item.caption}
              </p>
            </figcaption>
          ) : null}
        </div>
      </figure>
    )
  }

  return (
    <figure className={spanClass}>
      <button
        type="button"
        onClick={onImageClick}
        className={cn(
          'group relative block w-full overflow-hidden bg-muted text-left',
          ratioClass
        )}
        aria-label={`Open ${item.alt}`}
      >
        <img
          src={item.src}
          alt={item.alt}
          className="absolute inset-0 h-full w-full cursor-zoom-in object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          loading="lazy"
        />
        {item.caption ? (
          <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--color-overlay-scrim)] via-[var(--color-overlay-scrim-soft)] to-transparent p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <p className="text-sm leading-6 text-[var(--color-overlay-foreground)]">
              {item.caption}
            </p>
          </figcaption>
        ) : null}
      </button>
    </figure>
  )
}
