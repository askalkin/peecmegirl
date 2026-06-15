import { useMemo, useState } from 'react'
import { ArrowLeft, ExternalLink } from 'lucide-react'

import {
  getProjectsNewestFirst,
  type PortfolioMediaItem,
  type PortfolioProject,
} from '@/data/portfolio'
import { ContactSection } from '@/components/ContactSection'
import { SiteFooter } from '@/components/SiteFooter'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { Lightbox } from './Lightbox'

export function ProjectPage({ project }: { project: PortfolioProject }) {
  const leadVideo =
    project.gallery.find(
      (item): item is PortfolioMediaItem & { type: 'video' } => item.type === 'video'
    ) ?? null
  const galleryItems = leadVideo
    ? project.gallery.filter((item) => item.src !== leadVideo.src)
    : project.gallery
  const imageItems = useMemo(
    () =>
      project.gallery.filter(
        (item): item is PortfolioMediaItem & { type: 'image' } =>
          item.type === 'image'
      ),
    [project.gallery]
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
    <main className="pb-16">
      <section className="section-shell py-12 sm:py-16">
        <a
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to selected works
        </a>

        <div className="mt-10 grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <aside className="space-y-4 self-start lg:sticky lg:top-24">
            <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-[var(--shadow-surface)]">
              <p className="text-sm text-muted-foreground">{project.year}</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-card-foreground sm:text-4xl">
                {project.title}
              </h1>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full border border-border bg-muted/35 px-3 py-1 text-xs text-muted-foreground"
                  >
                    {category}
                  </span>
                ))}
              </div>
              {project.liveLink ? (
                <Button asChild variant="outline" className="mt-5 rounded-full">
                  <a href={project.liveLink.href} target="_blank" rel="noreferrer">
                    {project.liveLink.label}
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              ) : null}
            </div>
          </aside>

          <div className="space-y-8">
            {leadVideo ? (
              <figure className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-surface)]">
                <video
                  className="h-full w-full object-cover"
                  autoPlay
                  controls
                  loop
                  muted
                  playsInline
                  preload="auto"
                >
                  <source src={leadVideo.src} />
                </video>
              </figure>
            ) : null}

            <section className="rounded-3xl border border-border/80 bg-card p-6 shadow-[var(--shadow-surface)] sm:p-8">
              <div className="text-sm font-medium text-muted-foreground">Case-study focus</div>
              <p className="mt-3 max-w-3xl text-xl leading-8 text-foreground/80 sm:text-2xl">
                {project.focus}
              </p>
            </section>

            {project.summary.length || project.goals || project.role ? (
              <section className="rounded-3xl border border-border/80 bg-card p-6 shadow-[var(--shadow-surface)] sm:p-8">
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-muted-foreground">Context</div>
                    {project.summary.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="rounded-xl border border-border/80 bg-muted/35 px-4 py-3 text-base leading-7 text-foreground/80"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {project.goals ? (
                      <div className="rounded-xl border border-border/80 bg-muted/35 p-4">
                        <div className="text-sm font-medium text-muted-foreground">
                          Problem to solve
                        </div>
                        <p className="mt-2 text-base leading-7 text-foreground/80">
                          {project.goals}
                        </p>
                      </div>
                    ) : null}
                    {project.role ? (
                      <div className="rounded-xl border border-border/80 bg-muted/35 p-4">
                        <div className="text-sm font-medium text-muted-foreground">Role</div>
                        <p className="mt-2 text-base leading-7 text-foreground/80">
                          {project.role}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </section>
            ) : null}

            {project.highlights.length ? (
              <section className="space-y-4 rounded-3xl border border-border/80 bg-card p-6 shadow-[var(--shadow-surface)] sm:p-8">
                <div className="text-sm font-medium text-muted-foreground">Outcomes</div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                  {project.highlights.map((highlight) => (
                    <article
                      key={`${highlight.title}-${highlight.value ?? ''}`}
                      className="rounded-2xl border border-border bg-muted/35 p-5"
                    >
                      {highlight.value ? (
                        <div className="text-3xl font-semibold tracking-tight text-card-foreground">
                          {highlight.value}
                        </div>
                      ) : null}
                      <div className="mt-2 text-sm text-muted-foreground">
                        {highlight.title}
                      </div>
                      <p className="mt-3 text-base leading-7 text-foreground/75">
                        {highlight.description}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            {project.process.length ? (
              <section className="space-y-4 rounded-3xl border border-border/80 bg-card p-6 shadow-[var(--shadow-surface)] sm:p-8">
                <div className="text-sm font-medium text-muted-foreground">
                  How I approached it
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  {project.process.map((step, index) => (
                    <article
                      key={step.title}
                      className="rounded-2xl border border-border bg-muted/35 p-5"
                    >
                      <p className="text-xs font-medium text-muted-foreground">
                        Step {index + 1}
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-card-foreground">
                        {step.title}
                      </h2>
                      <p className="mt-3 text-base leading-7 text-foreground/80">
                        {step.description}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            {galleryItems.length ? (
              <section className="space-y-4 rounded-3xl border border-border/80 bg-card p-6 shadow-[var(--shadow-surface)] sm:p-8">
                <div className="text-sm font-medium text-muted-foreground">Media</div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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

            {project.team.length ? (
              <section className="space-y-4 rounded-3xl border border-border/80 bg-card p-6 shadow-[var(--shadow-surface)] sm:p-8">
                <div className="text-sm font-medium text-muted-foreground">Team</div>
                <ul className="flex flex-wrap gap-2">
                  {project.team.map((member) => (
                    <li
                      key={member}
                      className="rounded-full border border-border bg-muted/35 px-3 py-1.5 text-sm text-foreground/80"
                    >
                      {member}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          More Projects
        </h2>
        <div className="mt-8 space-y-3">
          {moreProjects.map((relatedProject) => (
            <a
              key={relatedProject.id}
              href={`/${relatedProject.id}`}
              className="grid gap-3 rounded-2xl border border-border/80 bg-card px-5 py-6 transition-colors hover:border-foreground/30 md:grid-cols-[minmax(0,1fr)_auto] md:px-6"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-semibold tracking-tight text-card-foreground sm:text-2xl">
                  {relatedProject.title}
                </h3>
                <p className="max-w-2xl text-base leading-7 text-foreground/80">
                  {relatedProject.focus}
                </p>
              </div>
              <div className="text-sm text-muted-foreground md:pt-1">{relatedProject.year}</div>
            </a>
          ))}
        </div>
      </section>

      <ContactSection />
      <SiteFooter backHref="/#top" backLabel="Back to home" />

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
  const spanClass = cn(
    item.span === 'wide' && 'sm:col-span-2 xl:col-span-2',
    item.span === 'tall' && 'sm:row-span-2'
  )

  if (item.type === 'video') {
    return (
      <figure className={spanClass}>
        <div className="group relative media-tile overflow-hidden rounded-2xl border border-border bg-card">
          <video
            className="h-full w-full object-cover"
            controls
            muted
            playsInline
            preload="metadata"
          >
            <source src={item.src} />
          </video>
          {item.caption ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--color-overlay-scrim)] via-[var(--color-overlay-scrim-soft)] to-transparent p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <p className="text-sm leading-6 text-[var(--color-overlay-foreground)]">{item.caption}</p>
            </div>
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
        className="group relative media-tile overflow-hidden rounded-2xl border border-border bg-card text-left transition-transform hover:scale-[1.01]"
        aria-label={`Open ${item.alt}`}
      >
        <img
          src={item.src}
          alt={item.alt}
          className="h-full w-full cursor-zoom-in object-cover"
          loading="lazy"
        />
        {item.caption ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--color-overlay-scrim)] via-[var(--color-overlay-scrim-soft)] to-transparent p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <p className="text-sm leading-6 text-[var(--color-overlay-foreground)]">{item.caption}</p>
          </div>
        ) : null}
      </button>
    </figure>
  )
}
