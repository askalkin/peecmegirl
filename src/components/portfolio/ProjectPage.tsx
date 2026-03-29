import { useMemo, useState } from 'react'
import { ArrowLeft, ExternalLink, Mail } from 'lucide-react'

import {
  portfolioData,
  type PortfolioMediaItem,
  type PortfolioProject,
} from '@/data/portfolio'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
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

  const moreProjects = portfolioData.projects.filter(
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
    <main className="bg-white pb-20">
      <section className="section-shell py-12 sm:py-16">
        <a
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-950"
        >
          <ArrowLeft className="size-4" />
          Back to selected works
        </a>

        <div className="mt-10 grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)]">
          <div className="space-y-4">
            <div className="text-sm text-zinc-500">{project.year}</div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              {project.title}
            </h1>
            <p className="text-sm leading-6 text-zinc-500">
              {project.categories.join(', ')}
            </p>
            {project.liveLink ? (
              <Button asChild variant="outline" className="rounded-full">
                <a href={project.liveLink.href} target="_blank" rel="noreferrer">
                  {project.liveLink.label}
                  <ExternalLink className="size-4" />
                </a>
              </Button>
            ) : null}
          </div>

          <div className="space-y-10">
            {leadVideo ? (
              <figure className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50">
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

            <div className="border-t border-zinc-200 pt-4">
              <div className="text-sm text-zinc-500">Case-study focus</div>
              <p className="mt-3 max-w-3xl text-xl leading-9 text-zinc-700">
                {project.focus}
              </p>
            </div>

            {project.summary.length || project.goals || project.role ? (
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
                <div className="space-y-4 border-t border-zinc-200 pt-4">
                  <div className="text-sm text-zinc-500">Context</div>
                  {project.summary.map((paragraph) => (
                    <p key={paragraph} className="max-w-3xl leading-8 text-zinc-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="space-y-6">
                  {project.goals ? (
                    <div className="border-t border-zinc-200 pt-4">
                      <div className="text-sm text-zinc-500">Problem to solve</div>
                      <p className="mt-2 text-base leading-7 text-zinc-600">
                        {project.goals}
                      </p>
                    </div>
                  ) : null}
                  {project.role ? (
                    <div className="border-t border-zinc-200 pt-4">
                      <div className="text-sm text-zinc-500">Role</div>
                      <p className="mt-2 text-base leading-7 text-zinc-600">
                        {project.role}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            {project.highlights.length ? (
              <div className="space-y-4">
                <div className="text-sm text-zinc-500">Outcomes</div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                  {project.highlights.map((highlight) => (
                    <div key={`${highlight.title}-${highlight.value ?? ''}`}>
                      {highlight.value ? (
                        <div className="text-3xl font-semibold tracking-tight text-zinc-950">
                          {highlight.value}
                        </div>
                      ) : null}
                      <div className="mt-2 text-sm text-zinc-500">
                        {highlight.title}
                      </div>
                      <p className="mt-3 text-base leading-7 text-zinc-600">
                        {highlight.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {project.process.length ? (
              <div className="space-y-4">
                <div className="text-sm text-zinc-500">How I approached it</div>
                <div className="grid gap-8 lg:grid-cols-2">
                  {project.process.map((step) => (
                    <div key={step.title} className="border-t border-zinc-200 pt-4">
                      <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
                        {step.title}
                      </h2>
                      <p className="mt-3 text-base leading-7 text-zinc-600">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {galleryItems.length ? (
              <div className="space-y-4">
                <div className="text-sm text-zinc-500">Media</div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {galleryItems.map((item) => (
                    <MediaTile
                      key={item.src}
                      item={item}
                      onImageClick={() => openImage(item)}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {project.partners?.length ? (
              <div className="space-y-4">
                <div className="text-sm text-zinc-500">
                  Collaborating for Cleaner Air
                </div>
                <div className="flex flex-wrap gap-8 border-t border-zinc-200 pt-6">
                  {project.partners.map((partner) => (
                    <div key={partner.name} className="flex h-10 items-center">
                      <img
                        src={partner.src}
                        alt={partner.name}
                        className="max-h-10 w-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {project.team.length ? (
              <div className="space-y-4">
                <div className="text-sm text-zinc-500">Team</div>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {project.team.map((member) => (
                    <li key={member} className="text-base leading-7 text-zinc-600">
                      {member}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <Separator className="bg-zinc-200" />
        <div className="pt-10">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-950">
            More Projects
          </h2>
          <div className="mt-10 border-y border-zinc-200">
            {moreProjects.map((relatedProject) => (
              <a
                key={relatedProject.id}
                href={`/${relatedProject.id}`}
                className="grid gap-3 border-b border-zinc-200 py-6 transition-colors last:border-b-0 hover:text-zinc-950 md:grid-cols-[minmax(0,1fr)_auto]"
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold tracking-tight text-zinc-950">
                    {relatedProject.title}
                  </h3>
                  <p className="max-w-2xl text-base leading-7 text-zinc-600">
                    {relatedProject.focus}
                  </p>
                </div>
                <div className="text-sm text-zinc-500">{relatedProject.year}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <Separator className="bg-zinc-200" />
        <div className="flex flex-col gap-8 pt-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <h2 className="text-4xl font-semibold tracking-tight text-zinc-950">
              {portfolioData.person.name}
            </h2>
            <p className="text-base leading-7 text-zinc-600">
              {portfolioData.person.footerTitle}
              <br />
              &copy; {portfolioData.person.footerYear}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" size="lg" className="rounded-full px-6">
              <a href={`mailto:${portfolioData.person.email}`}>
                <Mail className="size-4" />
                {portfolioData.person.email}
              </a>
            </Button>
            <Button asChild size="lg" className="rounded-full px-6">
              <a href="/#top">Back to home</a>
            </Button>
          </div>
        </div>
      </section>

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
  if (item.type === 'video') {
    return (
      <figure
        className={cn(
          'media-tile overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50',
          item.span === 'wide' && 'sm:col-span-2 xl:col-span-2',
          item.span === 'tall' && 'sm:row-span-2'
        )}
      >
        <video
          className="h-full w-full object-cover"
          controls
          muted
          playsInline
          preload="metadata"
        >
          <source src={item.src} />
        </video>
      </figure>
    )
  }

  return (
    <button
      type="button"
      onClick={onImageClick}
      className={cn(
        'media-tile overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 text-left transition-transform hover:scale-[1.01]',
        item.span === 'wide' && 'sm:col-span-2 xl:col-span-2',
        item.span === 'tall' && 'sm:row-span-2'
      )}
      aria-label={`Open ${item.alt}`}
    >
      <img
        src={item.src}
        alt={item.alt}
        className="h-full w-full cursor-zoom-in object-cover"
        loading="lazy"
      />
    </button>
  )
}
