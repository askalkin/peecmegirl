import { useEffect, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { cn } from '@/lib/utils'

import {
  getProjectsNewestFirst,
  type PortfolioProject,
} from '@/data/portfolio'
import { AboutContent } from '@/components/AboutContent'
import { BrandQuestions } from '@/components/BrandQuestions'
import { CoverMedia } from '@/components/portfolio/CoverMedia'
import { VimeoBackground } from '@/components/portfolio/VimeoBackground'
import { ContactSection } from '@/components/ContactSection'
import { SiteFooter } from '@/components/SiteFooter'

export const Route = createFileRoute('/')({ component: PortfolioPage })

// Hero → nav wordmark morph mapping (viewport-heights scrolled). The next
// section is 90% on screen at 0.9, where the morph finishes. Header.tsx mirrors
// these so the pill/text hand-off stays in sync.
const MORPH_START = 0.05
const MORPH_END = 0.9
// After the name lands, it cross-fades into the real nav wordmark over this
// much extra scroll (no hard swap → no jump).
const HANDOFF_LEN = 0.06

// easeInOutCubic — smooth acceleration in and settle out.
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

type CardMedia =
  | { type: 'video'; src: string }
  | { type: 'image'; src: string }
  | null

function getCardMedia(project: PortfolioProject): CardMedia {
  if (project.coverSrc) {
    return /\.(mp4|mov|webm)$/i.test(project.coverSrc)
      ? { type: 'video', src: project.coverSrc }
      : { type: 'image', src: project.coverSrc }
  }

  const video = project.gallery.find((item) => item.type === 'video')
  if (video) return { type: 'video', src: video.src }

  const image = project.gallery.find((item) => item.type === 'image')
  if (image) return { type: 'image', src: image.src }

  return null
}

function PortfolioPage() {
  const sortedProjects = getProjectsNewestFirst()
  const works = sortedProjects.filter((project) => project.kind !== 'blog')

  // Scroll-linked hero: as the next section fills the viewport, the secondary
  // text fades and "alina skalkina" shrinks/rises toward the header wordmark.
  const nameRef = useRef<HTMLSpanElement>(null)
  const brandRef = useRef<HTMLSpanElement>(null)
  const orbRef = useRef<HTMLSpanElement>(null)
  const questionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const name = nameRef.current
    if (!name) return

    // Natural (untransformed) geometry of the hero name + its font size.
    let sourceTopDoc = 0
    let sourceLeft = 0
    let sourceFont = 1

    const measure = () => {
      const prev = name.style.transform
      name.style.transform = 'none'
      const rect = name.getBoundingClientRect()
      sourceTopDoc = rect.top + window.scrollY
      sourceLeft = rect.left
      sourceFont = parseFloat(getComputedStyle(name).fontSize) || 1
      name.style.transform = prev
    }

    const onScroll = () => {
      const vh = window.innerHeight || 1
      // The next section fills the viewport by scrollY/vh, so it is 90% on
      // screen at 0.9. Morph from MORPH_START → MORPH_END, eased for a smooth
      // premium settle.
      const raw = Math.min(
        1,
        Math.max(0, (window.scrollY / vh - MORPH_START) / (MORPH_END - MORPH_START))
      )
      const p = easeInOut(raw)

      // Secondary hero text clears out smoothly over the first half.
      const fade = String(1 - easeInOut(Math.min(1, raw / 0.5)))
      if (brandRef.current) brandRef.current.style.opacity = fade
      if (orbRef.current) orbRef.current.style.opacity = fade
      if (questionsRef.current) questionsRef.current.style.opacity = fade

      const targetEl = document.querySelector('[data-nav-wordmark]')
      if (targetEl) {
        const target = targetEl.getBoundingClientRect()
        const targetFont = parseFloat(getComputedStyle(targetEl).fontSize) || 1
        const naturalTop = sourceTopDoc - window.scrollY
        const scaleTarget = targetFont / sourceFont
        const dx = (target.left - sourceLeft) * p
        const dy = (target.top - naturalTop) * p
        const scale = 1 + (scaleTarget - 1) * p
        name.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`
        // Once landed, cross-fade out as the real nav wordmark fades in.
        const handoff = Math.min(
          1,
          Math.max(0, (window.scrollY / vh - MORPH_END) / HANDOFF_LEN)
        )
        name.style.opacity = String(1 - handoff)
      }
    }

    measure()
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', () => {
      measure()
      onScroll()
    })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main id="top" className="text-foreground">
      <section className="section-shell relative z-40 flex h-[calc(100vh-4rem)] flex-col justify-end py-12 md:py-16">
        {/* Absolutely positioned so the typing text never shifts the layout. */}
        <div
          ref={questionsRef}
          className="absolute inset-x-0 top-12 flex justify-start sm:justify-end md:top-16"
        >
          <BrandQuestions className="max-w-full text-left lowercase sm:text-right lg:max-w-none text-h2" />
        </div>

        <div className="flex w-full flex-col items-start gap-5 sm:flex-row sm:items-end sm:gap-6">
          <span
            ref={orbRef}
            aria-hidden
            className="hero-orb size-[clamp(2.5rem,8vw,8.5rem)] shrink-0 rounded-full bg-foreground sm:order-2"
          />
          <h1 className="text-display font-black lowercase text-foreground sm:order-1">
            <span
              ref={nameRef}
              className="block origin-top-left will-change-transform pointer-events-none"
            >
              alina skalkina
            </span>
            <span ref={brandRef} className="block">
              brand designer
            </span>
          </h1>
        </div>
      </section>

      <section id="work" className="section-shell section-y scroll-mt-20">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:gap-x-8 xl:grid-cols-3">
          {works.map((project) => (
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
  const [hovered, setHovered] = useState(false)

  const handleEnter = () => {
    setHovered(true)
    videoRef.current?.play().catch(() => {})
  }

  const handleLeave = () => {
    setHovered(false)
    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = 0
    }
  }

  const isFramed = project.cover === 'framed'
  const hasEmbed = Boolean(project.embedUrl)
  const coverVideo = project.gallery.find((item) => item.type === 'video')
  const labels = project.hideLabels
    ? []
    : [project.workType, project.businessSize, project.audience].filter(Boolean)

  return (
    <a
      href={`/${project.id}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group flex flex-col border border-border bg-background"
    >
      <div
        className={cn(
          'media-loading-surface relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:h-[52vh] xl:h-[56vh]',
          hasEmbed && !isFramed && 'bg-foreground'
        )}
      >
        {isFramed ? (
          <CoverMedia
            videoSrc={coverVideo?.src}
            embedUrl={project.embedUrl}
            embedAspect={project.embedAspect}
            embedActive={hovered}
            title={project.title}
            videoRef={videoRef}
            grayscale
          />
        ) : hasEmbed ? (
          <>
            {project.coverSrc &&
              !/\.(mp4|mov|webm)$/i.test(project.coverSrc) && (
                <img
                  src={project.coverSrc}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                  loading="lazy"
                />
              )}
            <VimeoBackground
              url={project.embedUrl!}
              title={project.title}
              loopSeconds={4}
              active={hovered}
              grayscale
              offsetX={project.coverOffsetX}
            />
          </>
        ) : media?.type === 'video' ? (
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
                className="rounded-full bg-background/85 px-2.5 py-1 text-sm font-medium text-foreground backdrop-blur-sm"
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
