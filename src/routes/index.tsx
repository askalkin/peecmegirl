import { useEffect, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { getHeroMorphDistance } from '@/lib/heroMorph'

import {
  getProjectsNewestFirst,
  type PortfolioProject,
} from '@/data/portfolio'
import { AboutContent } from '@/components/AboutContent'
import { BrandQuestions } from '@/components/BrandQuestions'
import { VimeoBackground } from '@/components/portfolio/VimeoBackground'
import { ContactSection } from '@/components/ContactSection'
import { SiteFooter } from '@/components/SiteFooter'

export const Route = createFileRoute('/')({ component: PortfolioPage })

const vimeoEmbedUrl = (id: string) =>
  `https://player.vimeo.com/video/${id}?background=1&autopause=0&muted=1&autoplay=1&loop=1&app_id=58479`

const cardVimeoProps = {
  cropScale: 1.18,
  stageClassName: 'bg-card',
}

type CardMedia =
  | { type: 'video'; src: string }
  | { type: 'embed'; vimeoId: string }
  | { type: 'image'; src: string }
  | null

function getCardMedia(project: PortfolioProject): CardMedia {
  if (project.coverSrc) {
    return /\.(mp4|mov|webm)$/i.test(project.coverSrc)
      ? { type: 'video', src: project.coverSrc }
      : { type: 'image', src: project.coverSrc }
  }

  const video = project.gallery.find((item) => item.type === 'video')
  if (video)
    return video.vimeoId
      ? { type: 'embed', vimeoId: video.vimeoId }
      : { type: 'video', src: video.src }

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
  const morphRef = useRef<HTMLSpanElement>(null)
  const brandRef = useRef<HTMLSpanElement>(null)
  const orbRef = useRef<HTMLSpanElement>(null)
  const questionsRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const heroName = nameRef.current
    const morph = morphRef.current
    if (!heroName || !morph) return

    let cancelled = false
    let cleanup = () => {}

    void (async () => {
      const wordmark = document.querySelector<HTMLElement>('[data-nav-wordmark]')
      if (!wordmark) return

      await document.fonts.ready
      if (cancelled) return

      // The visible morphing text is `morph`: a fixed-position overlay rendered
      // as real text. It animates font metrics and position instead of scaling a
      // transformed layer, which avoids the rasterized/pixelated look during the
      // scroll morph.
      //
      // The real <h1> name stays in the DOM for layout/screen readers but is
      // hidden, since the overlay now draws the visible name.
      heroName.style.opacity = '0'
      morph.style.opacity = '1'
      morph.style.transform = 'none'
      morph.style.willChange = 'left, top, font-size, line-height, letter-spacing, opacity'

      const fadeEls = [brandRef.current, orbRef.current, questionsRef.current]
      const lerp = (start: number, end: number, progress: number) =>
        start + (end - start) * progress
      const easeInOut = (value: number) => value * value * (3 - 2 * value)
      const parsePx = (value: string) => {
        const parsed = Number.parseFloat(value)
        return Number.isFinite(parsed) ? parsed : 0
      }

      let metrics = {
        startLeft: 0,
        startTop: 0,
        startFontSize: 0,
        startLineHeight: 0,
        startLetterSpacing: 0,
        endLeft: 0,
        endTop: 0,
        endFontSize: 0,
        endLineHeight: 0,
        endLetterSpacing: 0,
      }
      let progress = 0
      let frame: number | undefined

      const readMetrics = () => {
        const heroRect = heroName.getBoundingClientRect()
        const wordmarkRect = wordmark.getBoundingClientRect()
        const heroStyles = getComputedStyle(heroName)
        const wordmarkStyles = getComputedStyle(wordmark)

        metrics = {
          startLeft: heroRect.left + window.scrollX,
          startTop: heroRect.top + window.scrollY,
          startFontSize: parsePx(heroStyles.fontSize),
          startLineHeight: parsePx(heroStyles.lineHeight),
          startLetterSpacing: parsePx(heroStyles.letterSpacing),
          endLeft: wordmarkRect.left,
          endTop: wordmarkRect.top,
          endFontSize: parsePx(wordmarkStyles.fontSize),
          endLineHeight: parsePx(wordmarkStyles.lineHeight),
          endLetterSpacing: parsePx(wordmarkStyles.letterSpacing),
        }
      }

      const applyMorph = (nextProgress: number) => {
        progress = Math.max(0, Math.min(1, nextProgress))
        const easedProgress = easeInOut(progress)
        morph.style.left = `${lerp(metrics.startLeft, metrics.endLeft, easedProgress)}px`
        morph.style.top = `${lerp(metrics.startTop, metrics.endTop, easedProgress)}px`
        morph.style.fontSize = `${lerp(metrics.startFontSize, metrics.endFontSize, easedProgress)}px`
        morph.style.lineHeight = `${lerp(metrics.startLineHeight, metrics.endLineHeight, easedProgress)}px`
        morph.style.letterSpacing = `${lerp(metrics.startLetterSpacing, metrics.endLetterSpacing, easedProgress)}px`

        // Secondary hero text clears quickly so the moving name never crosses a
        // visible "Brand designer" layer.
        const fade = String(1 - Math.min(1, progress / 0.35))
        for (const el of fadeEls) if (el) el.style.opacity = fade

        // Hand off to the header's own crisp wordmark over the final stretch.
        morph.style.opacity = String(
          1 - Math.min(1, Math.max(0, (progress - 0.82) / 0.13))
        )
      }

      const update = () => {
        frame = undefined
        const distance = getHeroMorphDistance(window.innerHeight || 1)
        applyMorph(window.scrollY / distance)
      }

      const scheduleUpdate = () => {
        if (frame === undefined) frame = window.requestAnimationFrame(update)
      }

      const handleResize = () => {
        readMetrics()
        scheduleUpdate()
      }

      readMetrics()
      update()
      window.addEventListener('scroll', scheduleUpdate, { passive: true })
      window.addEventListener('resize', handleResize)

      cleanup = () => {
        if (frame !== undefined) window.cancelAnimationFrame(frame)
        window.removeEventListener('scroll', scheduleUpdate)
        window.removeEventListener('resize', handleResize)
        morph.removeAttribute('style')
        heroName.style.opacity = ''
        for (const el of fadeEls) if (el) el.style.opacity = ''
      }
    })()

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  return (
    <main id="main" className="text-foreground">
      {/* Fixed overlay that redraws as live text while moving from the hero name
          into the header wordmark. Hidden until the client morph takes over
          (opacity set in the effect), so SSR/no-JS just shows the real <h1>. */}
      <span
        ref={morphRef}
        aria-hidden
        className="text-display font-black text-foreground fixed left-0 top-0 z-50 block origin-top-left whitespace-nowrap pointer-events-none opacity-0"
      >
        Alina Skalkina
      </span>
      <section ref={heroRef} aria-label="Introduction" className="section-shell relative z-40 -mt-16 flex min-h-dvh flex-col justify-end py-12 md:py-16">
        {/* Absolutely positioned so the typing text never shifts the layout. */}
        <div
          ref={questionsRef}
          className="absolute inset-x-0 top-12 flex justify-start sm:justify-end md:top-16"
        >
          <BrandQuestions className="max-w-full text-left sm:text-right lg:max-w-none text-h1" />
        </div>

        <div className="flex w-full flex-col items-start gap-5 sm:flex-row sm:items-end sm:gap-6">
          <span
            ref={orbRef}
            aria-hidden
            className="hero-orb size-[clamp(2.5rem,8vw,8.5rem)] shrink-0 rounded-full bg-foreground sm:order-2"
          />
          <h1 className="text-display font-black text-foreground sm:order-1">
            {/* Kept on one line so the overlay can measure a stable text box. */}
            <span
              ref={nameRef}
              className="block origin-top-left whitespace-nowrap pointer-events-none"
            >
              Alina Skalkina
            </span>
            <span ref={brandRef} className="block">
              Brand designer
            </span>
          </h1>
        </div>
      </section>

      <section id="work" aria-label="Selected works" className="section-shell section-y scroll-mt-20">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:gap-x-8 xl:grid-cols-3">
          {works.map((project, index) => (
            <ProjectCard key={project.id} project={project} staggerIndex={index} />
          ))}
        </div>
      </section>

      <div id="about" role="region" aria-label="About me" className="scroll-mt-24">
        <AboutContent />
      </div>

      <ContactSection id="contact" />

      <SiteFooter />
    </main>
  )
}

function ProjectCard({ project, staggerIndex = 0 }: { project: PortfolioProject; staggerIndex?: number }) {
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

  const colDelay = staggerIndex % 3
  return (
    <div
      className="group flex flex-col overflow-hidden border border-neutral-300 dark:border-neutral-700"
      data-fade
      data-fade-delay={colDelay > 0 ? String(colDelay) : undefined}
    >
      <a
        href={`/${project.id}`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="media-loading-surface relative block aspect-video overflow-hidden"
      >
        {isFramed && project.embedUrl ? (
          <VimeoBackground
            url={project.embedUrl}
            title={project.title}
            loopSeconds={4}
            active={hovered}
            grayscale
            offsetX={project.coverOffsetX}
            {...cardVimeoProps}
          />
        ) : isFramed && coverVideo?.vimeoId ? (
          <VimeoBackground
            url={vimeoEmbedUrl(coverVideo.vimeoId)}
            title={project.title}
            loopSeconds={4}
            active={hovered}
            grayscale
            offsetX={project.coverOffsetX}
            {...cardVimeoProps}
          />
        ) : isFramed && coverVideo ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.04] md:grayscale md:group-hover:grayscale-0"
            loop
            muted
            playsInline
            preload="none"
            aria-label={`${project.title} preview`}
          >
            <source src={coverVideo.src} />
          </video>
        ) : hasEmbed ? (
          <>
            {project.coverSrc &&
              !/\.(mp4|mov|webm)$/i.test(project.coverSrc) && (
                <img
                  src={project.coverSrc}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-all duration-700 md:grayscale md:group-hover:grayscale-0"
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
              {...cardVimeoProps}
            />
          </>
        ) : media?.type === 'embed' ? (
          <VimeoBackground
            url={vimeoEmbedUrl(media.vimeoId)}
            title={project.title}
            loopSeconds={4}
            active={hovered}
            grayscale
            offsetX={project.coverOffsetX}
            {...cardVimeoProps}
          />
        ) : media?.type === 'video' ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.04] md:grayscale md:group-hover:grayscale-0"
            loop
            muted
            playsInline
            preload="none"
            aria-label={`${project.title} preview`}
          >
            <source src={media.src} />
          </video>
        ) : media?.type === 'image' ? (
          <img
            src={media.src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.04] md:grayscale md:group-hover:grayscale-0"
            loading="lazy"
          />
        ) : null}
      </a>

      <a href={`/${project.id}`} className="flex flex-col p-4">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-h3 font-semibold text-text-primary">
            {project.title}
          </h2>
          <span className="shrink-0 text-base tabular-nums text-text-secondary">
            {project.year}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-text-secondary">
          {project.focus}
        </p>
      </a>
    </div>
  )
}
