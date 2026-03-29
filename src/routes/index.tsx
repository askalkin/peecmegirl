import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  ArrowRight,
  CalendarDays,
  Download,
  Linkedin,
  Mail,
} from 'lucide-react'

import { portfolioData } from '@/data/portfolio'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export const Route = createFileRoute('/')({ component: PortfolioPage })

type HoverPreview = {
  src: string
  title: string
}

function PortfolioPage() {
  const [callLink, linkedInLink, cvLink] = portfolioData.person.links
  const previewRef = useRef<HTMLDivElement | null>(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const [hoveredPreview, setHoveredPreview] = useState<HoverPreview | null>(null)

  useEffect(() => {
    if (!hoveredPreview) return
    positionPreview(previewRef.current, pointerRef.current.x, pointerRef.current.y)
  }, [hoveredPreview])

  function handleWorkHover(
    preview: HoverPreview | null,
    event: MouseEvent<HTMLAnchorElement>
  ) {
    if (!preview || !supportsHoverPreview()) return

    pointerRef.current = { x: event.clientX, y: event.clientY }
    setHoveredPreview(preview)
  }

  function handleWorkMove(event: MouseEvent<HTMLAnchorElement>) {
    if (!hoveredPreview) return

    pointerRef.current = { x: event.clientX, y: event.clientY }
    positionPreview(previewRef.current, event.clientX, event.clientY)
  }

  function handleWorkLeave() {
    setHoveredPreview(null)
  }

  return (
    <main id="top" className="bg-white pb-20">
      <section className="section-shell py-14 sm:py-18">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <div className="space-y-6">
            <p className="text-base text-zinc-500">{portfolioData.person.role}</p>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">
                {portfolioData.person.name}
              </h1>
              <p className="max-w-3xl text-xl leading-9 text-zinc-600">
                {portfolioData.person.intro}
              </p>
              <p className="max-w-3xl text-lg leading-8 text-zinc-600">
                {portfolioData.person.approach}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-6">
                <a href={callLink.href} target="_blank" rel="noreferrer">
                  <CalendarDays className="size-4" />
                  {callLink.label}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                <a href={linkedInLink.href} target="_blank" rel="noreferrer">
                  <Linkedin className="size-4" />
                  {linkedInLink.label}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                <a href={cvLink.href}>
                  <Download className="size-4" />
                  {cvLink.label}
                </a>
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50">
              <img
                src={portfolioData.person.heroImage}
                alt={portfolioData.person.heroImageAlt}
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
            <dl className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
              {portfolioData.person.stats.map((stat) => (
                <div key={stat.label} className="border-t border-zinc-200 pt-4">
                  <dt className="text-sm text-zinc-500">{stat.label}</dt>
                  <dd className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="work" className="section-shell py-20">
        <SectionHeading title="Selected Works" />
        <div className="mt-10 border-y border-zinc-200">
          {portfolioData.projects.map((project) => {
            const previewVideo = project.gallery.find((item) => item.type === 'video')

            return (
              <a
                key={project.id}
                href={`/${project.id}`}
                onBlur={handleWorkLeave}
                onMouseEnter={(event) =>
                  handleWorkHover(
                    previewVideo
                      ? {
                          src: previewVideo.src,
                          title: project.title,
                        }
                      : null,
                    event
                  )
                }
                onMouseLeave={handleWorkLeave}
                onMouseMove={handleWorkMove}
                className="grid gap-4 border-b border-zinc-200 py-6 transition-colors last:border-b-0 hover:text-zinc-950 md:grid-cols-[minmax(0,1fr)_auto]"
              >
                <div className="space-y-3">
                  <h2 className="text-3xl font-semibold tracking-tight text-zinc-950">
                    {project.title}
                  </h2>
                  <p className="text-sm leading-6 text-zinc-500">
                    {project.categories.join(', ')}
                  </p>
                  <p className="max-w-2xl text-base leading-7 text-zinc-600">
                    {project.focus}
                  </p>
                </div>
                <div className="flex items-start gap-4 text-sm text-zinc-500 md:justify-end">
                  <span>{project.year}</span>
                  <ArrowRight className="mt-0.5 size-4" />
                </div>
              </a>
            )
          })}
        </div>
      </section>

      <section className="section-shell py-20">
        <Separator className="bg-zinc-200" />
        <div className="pt-10">
          <SectionHeading title="How I want the work to read" />
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {portfolioData.philosophy.map((principle) => (
              <div key={principle.title} className="border-t border-zinc-200 pt-4">
                <h3 className="text-2xl font-semibold tracking-tight text-zinc-950">
                  {principle.title}
                </h3>
                <p className="mt-3 max-w-xl text-base leading-7 text-zinc-600">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="section-shell py-20">
        <Separator className="bg-zinc-200" />
        <div className="pt-10">
          <SectionHeading title="Career" />
          <div className="mt-10 border-y border-zinc-200">
            {portfolioData.career.map((entry) => (
              <div
                key={`${entry.period}-${entry.title}`}
                className="grid gap-4 border-b border-zinc-200 py-6 last:border-b-0 md:grid-cols-[11rem_minmax(0,1fr)]"
              >
                <div className="text-sm text-zinc-500">{entry.period}</div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold tracking-tight text-zinc-950">
                    {entry.title}
                  </h3>
                  <div className="space-y-2">
                    {entry.details.map((detail) => (
                      <p key={detail} className="leading-7 text-zinc-600">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="capabilities" className="section-shell py-20">
        <Separator className="bg-zinc-200" />
        <div className="pt-10">
          <SectionHeading title="My skill set" />
          <div className="mt-10 grid gap-10 lg:grid-cols-3">
            {portfolioData.skills.map((skillGroup) => (
              <div key={skillGroup.title} className="border-t border-zinc-200 pt-4">
                <h3 className="text-2xl font-semibold tracking-tight text-zinc-950">
                  {skillGroup.title}
                </h3>
                <ul className="mt-5 space-y-2 text-zinc-600">
                  {skillGroup.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section-shell py-20">
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
              <a href="#top">Back to top</a>
            </Button>
          </div>
        </div>
      </section>

      {hoveredPreview ? (
        <div
          ref={previewRef}
          className="pointer-events-none fixed left-0 top-0 z-50 hidden w-[300px] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.16)] lg:block"
          style={{
            transform: getPreviewTransform(pointerRef.current.x, pointerRef.current.y),
          }}
        >
          <video
            key={hoveredPreview.src}
            className="block aspect-video w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label={`${hoveredPreview.title} preview`}
          >
            <source src={hoveredPreview.src} />
          </video>
        </div>
      ) : null}
    </main>
  )
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div>
      <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
        {title}
      </h2>
    </div>
  )
}

function supportsHoverPreview() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )
}

function getPreviewTransform(clientX: number, clientY: number) {
  const width = 300
  const height = 190
  const offset = 24

  return clampPreviewPosition(clientX, clientY, width, height, offset)
}

function positionPreview(
  previewElement: HTMLDivElement | null,
  clientX: number,
  clientY: number
) {
  if (!previewElement) return

  const width = previewElement.offsetWidth || 300
  const height = previewElement.offsetHeight || 190
  const offset = 24

  previewElement.style.transform = clampPreviewPosition(
    clientX,
    clientY,
    width,
    height,
    offset
  )
}

function clampPreviewPosition(
  clientX: number,
  clientY: number,
  width: number,
  height: number,
  offset: number
) {
  if (typeof window === 'undefined') {
    return 'translate3d(0, 0, 0)'
  }

  let x = clientX + offset
  let y = clientY + offset

  if (x + width > window.innerWidth - 16) {
    x = clientX - width - offset
  }

  if (y + height > window.innerHeight - 16) {
    y = clientY - height - offset
  }

  x = Math.max(16, x)
  y = Math.max(16, y)

  return `translate3d(${x}px, ${y}px, 0)`
}
