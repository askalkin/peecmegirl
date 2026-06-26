import { useMemo, useState } from 'react'
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  getProjectsNewestFirst,
  type PortfolioMediaItem,
  type PortfolioProject,
  type PortfolioStoryParagraph,
  type PortfolioStorySection,
} from '@/data/portfolio'
import { ContactSection } from '@/components/ContactSection'
import { SiteFooter } from '@/components/SiteFooter'

import { CoverMedia } from './CoverMedia'
import { VimeoBackground } from './VimeoBackground'
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

// Long-form narrative as an expandable, swiss-style list (closed by default).
function StorySections({ sections }: { sections: PortfolioStorySection[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="border-t border-border">
      {sections.map((storySection, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={storySection.heading ?? index}
            className={cn(index > 0 && 'border-t border-border')}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <h2 className="text-h2 font-bold text-foreground">
                {storySection.heading}
              </h2>
              <ChevronDown
                className={cn(
                  'size-5 shrink-0 text-muted-foreground transition-transform duration-300',
                  isOpen && 'rotate-180'
                )}
              />
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="max-w-2xl space-y-5 pb-8">
                  {storySection.paragraphs.map((paragraph, paragraphIndex) => (
                    <p
                      key={paragraphIndex}
                      className="text-base leading-relaxed text-foreground/80"
                    >
                      {renderStoryParagraph(paragraph)}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}

function MetricValue({ value }: { value: string }) {
  const [from, to] = value.split('→').map((part) => part.trim())

  if (!to) {
    return <div className="text-h1 font-black text-foreground">{value}</div>
  }

  return (
    <div className="flex flex-wrap items-center gap-x-2 text-h1 font-black leading-none text-foreground">
      <span>{from}</span>
      <ArrowRight
        aria-hidden="true"
        strokeWidth={1.5}
        className="size-[0.72em] shrink-0"
      />
      <span>{to}</span>
    </div>
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
  const isFramed = project.cover === 'framed'
  const hasEmbed = Boolean(project.embedUrl)
  // Some projects open straight on their content + gallery (no full-bleed hero).
  const noHero = project.noHero ?? false
  const heroMedia =
    isFramed || hasEmbed || noHero
      ? null
      : leadVideo ?? imageItems[0] ?? null
  // For framed covers the lead video is shown in the frame, so keep it out of
  // the gallery below — unless the frame shows an embed, in which case the
  // gallery video stays.
  const framedVideoSrc = isFramed && !hasEmbed ? leadVideo?.src : undefined
  const galleryItems = project.gallery.filter(
    (item) =>
      item.src !== heroMedia?.src &&
      item.src !== framedVideoSrc &&
      item.src !== project.coverSrc
  )

  const imageIndexBySrc = useMemo(
    () => new Map(imageItems.map((item, index) => [item.src, index])),
    [imageItems]
  )
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)

  const moreProjects = getProjectsNewestFirst().filter(
    (currentProject) =>
      currentProject.id !== project.id && currentProject.kind !== 'blog'
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
      {isFramed ? (
        // Framed keynote-style hero on the shared page surface, padded clear
        // of the nav and narrow enough to fit on screen.
        <section className="w-full md:-mt-16 md:h-[calc(64vh+4rem)]">
          <CoverMedia
            videoSrc={framedVideoSrc}
            embedUrl={project.embedUrl}
            embedAspect={project.embedAspect}
            title={project.title}
            rounded="rounded-xl"
            autoPlay
            surface="bg-background"
            frameWidth="58%"
            padding="pt-8 pb-12 md:px-6 md:pb-6 md:pt-[5.5rem]"
            mobileFull
          />
        </section>
      ) : hasEmbed ? (
        // Full-bleed background video hero (e.g. Huawei), under the header.
        <section className="relative -mt-16 h-[calc(68vh+4rem)] w-full">
          <VimeoBackground url={project.embedUrl!} title={project.title} />
        </section>
      ) : heroMedia ? (
        // Hero media, flush to the top with the header floating over it.
        <section className="-mt-16">
          {heroMedia.type === 'video' ? (
            <video
              className="media-loading-surface h-[calc(68vh+4rem)] w-full object-cover"
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
              className="media-loading-surface h-[calc(68vh+4rem)] w-full object-cover"
            />
          )}
        </section>
      ) : null}

      <div className={`section-shell space-y-16 md:space-y-24 ${noHero ? 'section-y-sm' : 'section-y'}`}>
        {/* Description — client + year, then the hook and the situation/task. */}
        <header>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {project.company ?? project.title}
            </span>
            <span>{project.year}</span>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-24 xl:gap-32">
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

        {/* Outcomes — results table with uniform hairline dividers. */}
        {project.highlights.length ? (
          <section>
            <div className="grid grid-cols-1 border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
              {project.highlights.map((highlight) => (
                <div
                  key={`${highlight.title}-${highlight.value ?? ''}`}
                  className="flex flex-col border-b border-r border-border bg-background p-6 md:p-8"
                >
                  {highlight.value ? (
                    <MetricValue value={highlight.value} />
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

      {/* Visuals — flex bento rows, a 30-col grid, or masonry depending on data. */}
      {galleryItems.length ? (
        <section className="section-shell pb-[var(--space-section)]">
          {galleryItems.some((item) => item.flexRow != null) ? (
            <FlexBentoGallery items={galleryItems} onImageClick={openImage} />
          ) : galleryItems.some((item) => item.cols || item.center) ? (
            <div className="gallery-grid">
              {galleryItems.map((item) => {
                const span = item.center ? 30 : item.cols ?? 30
                const spanStyle = { '--span': span } as React.CSSProperties

                if (item.center) {
                  // Centred, cropped feature video (e.g. Farba walkthrough).
                  return (
                    <div
                      key={item.src}
                      style={spanStyle}
                      className="flex justify-center"
                    >
                      <div className="media-loading-surface aspect-video w-[70%] overflow-hidden rounded-xl shadow-[var(--shadow-float)]">
                        <video
                          className="h-full w-full origin-top scale-[1.12] object-cover"
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          aria-label={item.alt}
                        >
                          <source src={item.src} />
                        </video>
                      </div>
                    </div>
                  )
                }

                // Equal-height rows via a fixed aspect; a vh-capped, centred
                // cell; or a fixed-width centred frame. Otherwise natural height.
                const capped = item.maxVh != null
                const framed = item.frameWidth != null
                const centred = capped || framed
                const cellStyle = {
                  ...spanStyle,
                  ...(item.aspect ? { aspectRatio: item.aspect } : {}),
                } as React.CSSProperties
                // Dynamic vh/width can't be Tailwind classes (purged) — inline.
                const mediaStyle = capped
                  ? ({ maxHeight: `${item.maxVh}vh` } as React.CSSProperties)
                  : framed
                    ? ({ width: item.frameWidth } as React.CSSProperties)
                    : undefined
                const objectFit = item.fit === 'contain' ? 'object-contain' : 'object-cover'
                const mediaFit = item.aspect
                  ? `h-full w-full ${objectFit}`
                  : capped
                    ? 'mx-auto h-auto w-auto max-w-full object-contain'
                    : framed
                      ? 'h-auto max-w-full'
                      : 'w-full'

                return item.type === 'video' ? (
                  <div
                    key={item.src}
                    style={cellStyle}
                    className={centred ? 'flex justify-center' : undefined}
                  >
                    <video
                      className={`media-loading-surface block rounded-sm ${mediaFit}`}
                      style={mediaStyle}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      aria-label={item.alt}
                    >
                      <source src={item.src} />
                    </video>
                  </div>
                ) : (
                  <div key={item.src} style={cellStyle}>
                    <button
                      type="button"
                      onClick={() => openImage(item)}
                      className={`group/img block ${centred ? 'flex w-full justify-center' : 'w-full'} ${item.aspect ? 'h-full' : ''}`}
                      aria-label={`Open ${item.alt}`}
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        style={mediaStyle}
                        className={`media-loading-surface block cursor-zoom-in rounded-sm transition-opacity duration-300 group-hover/img:opacity-90 ${mediaFit}`}
                      />
                    </button>
                    {item.caption ? (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {item.caption}
                      </p>
                    ) : null}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="columns-1 gap-4 sm:columns-2 md:gap-6 lg:columns-3">
              {galleryItems.map((item) => (
                <MasonryTile
                  key={item.src}
                  item={item}
                  onImageClick={() => openImage(item)}
                />
              ))}
            </div>
          )}
        </section>
      ) : null}

      {/* Story — long-form narrative as an expandable list (closed by default). */}
      {project.story?.length ? (
        <section className="section-shell pb-[var(--space-section)]">
          <StorySections sections={project.story} />
        </section>
      ) : null}

      {project.process.length || project.team.length > 1 ? (
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

        {project.team.length > 1 ? (
          <section className="space-y-5">
            <Label>Shout-out to my team!</Label>
            <ul className="flex flex-wrap gap-x-8 gap-y-2 text-base text-foreground/70">
              {project.team.map((member) => (
                <li key={member}>{member}</li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
      ) : null}

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

// Dedicated cover, else first video (else first image) — used for the hover preview.
function getPreviewMedia(project: PortfolioProject) {
  if (project.coverSrc) {
    return /\.(mp4|mov|webm)$/i.test(project.coverSrc)
      ? { type: 'video' as const, src: project.coverSrc }
      : { type: 'image' as const, src: project.coverSrc }
  }
  if (project.embedUrl) return { type: 'embed' as const, src: project.embedUrl }
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
    <section className="section-shell section-y">
      <div>
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
          className="media-loading-surface pointer-events-none fixed z-40 hidden w-64 overflow-hidden rounded-lg shadow-[var(--shadow-surface)] md:block"
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
          ) : media.type === 'embed' ? (
            <iframe
              key={media.src}
              src={media.src}
              title=""
              className="block aspect-video w-full"
              allow="autoplay; fullscreen; picture-in-picture"
            />
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

function FlexBentoGallery({
  items,
  onImageClick,
}: {
  items: PortfolioMediaItem[]
  onImageClick: (item: PortfolioMediaItem) => void
}) {
  const rowMap = new Map<number, PortfolioMediaItem[]>()
  for (const item of items) {
    const r = item.flexRow ?? 0
    if (!rowMap.has(r)) rowMap.set(r, [])
    rowMap.get(r)!.push(item)
  }
  const rows = Array.from(rowMap.entries()).sort(([a], [b]) => a - b)

  return (
    <div className="flex flex-col gap-1">
      {rows.map(([rowIndex, rowItems]) => (
        <div
          key={rowIndex}
          className="flex gap-1"
          style={{ height: 'clamp(180px, 22vw, 340px)' }}
        >
          {rowItems.map((item) => (
            <div
              key={item.src}
              className="overflow-hidden"
              style={{ flex: item.flexGrow ?? 1 }}
            >
              {item.type === 'image' ? (
                <button
                  type="button"
                  onClick={() => onImageClick(item)}
                  aria-label={`Open ${item.alt}`}
                  className="group/img block h-full w-full"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="block h-full w-full cursor-zoom-in object-cover transition-opacity duration-300 group-hover/img:opacity-90"
                  />
                </button>
              ) : (
                <video
                  className="block h-full w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label={item.alt}
                >
                  <source src={item.src} />
                </video>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
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
          className="media-loading-surface block h-auto max-h-[80vh] w-full object-cover"
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
          className="media-loading-surface block h-auto max-h-[80vh] w-full cursor-zoom-in object-cover transition-opacity duration-300 group-hover:opacity-90"
        />
      </button>
    </figure>
  )
}
