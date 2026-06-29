import { useEffect, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { cn } from '@/lib/utils'

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
  const brandRef = useRef<HTMLSpanElement>(null)
  const orbRef = useRef<HTMLSpanElement>(null)
  const questionsRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const heroName = nameRef.current
    if (!heroName) return

    let cancelled = false
    let cleanup = () => {}

    // GSAP Flip + ScrollTrigger are browser-only and ship as separate plugin
    // modules, so load them lazily on the client.
    void (async () => {
      const [{ gsap }, { Flip }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/Flip'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return
      gsap.registerPlugin(Flip, ScrollTrigger)

      const wordmark = document.querySelector<HTMLElement>('[data-nav-wordmark]')
      if (!wordmark) return

      // The header wordmark is the element that actually moves. The hero name
      // becomes an invisible layout/measurement target it flips onto — kept in
      // the DOM (transparent, not display:none) so the <h1> heading and its
      // box are preserved for layout and screen readers.
      heroName.style.opacity = '0'

      let flip: GSAPTween | undefined

      // Flip.fit transforms the wordmark to exactly cover the hero name (same
      // font, weight and tracking → a clean uniform scale). Paused at progress
      // 1, that "fitted" state is what shows at the top of the page.
      const buildFlip = () => {
        flip?.kill()
        gsap.set(wordmark, { clearProps: 'transform' })
        flip = Flip.fit(wordmark, heroName, {
          scale: true,
          duration: 1,
          ease: 'none',
        }) as GSAPTween
        flip.pause(1)
      }

      const fadeEls = [brandRef.current, orbRef.current, questionsRef.current]

      const st = ScrollTrigger.create({
        // Drive the morph off the hero section's own geometry: start when its
        // top hits the viewport top, finish as its bottom scrolls past — robust
        // regardless of window.innerHeight quirks.
        trigger: heroRef.current ?? '#main',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        // Rebuild the fit whenever ScrollTrigger recomputes (load, resize), so
        // the target geometry stays correct across breakpoints.
        onRefreshInit: buildFlip,
        onUpdate: (self) => {
          // progress 0 at the top → wordmark fitted over the hero (flip == 1);
          // progress 1 once the hero has scrolled out → wordmark home in header.
          const p = self.progress
          flip?.progress(1 - p)
          // Secondary hero text clears out over the first half of the morph.
          const fade = String(1 - Math.min(1, p / 0.5))
          for (const el of fadeEls) if (el) el.style.opacity = fade
        },
      })

      buildFlip()
      ScrollTrigger.refresh()

      cleanup = () => {
        st.kill()
        flip?.kill()
        gsap.set(wordmark, { clearProps: 'transform' })
        heroName.style.opacity = ''
      }
    })()

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  return (
    <main id="main" className="text-foreground">
      <section ref={heroRef} aria-label="Introduction" className="section-shell relative z-40 flex h-[calc(100dvh-4rem)] flex-col justify-end py-12 md:py-16">
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
            {/* Kept on one line so it shares the header wordmark's aspect
                ratio — GSAP Flip can then scale it uniformly (no distortion). */}
            <span
              ref={nameRef}
              className="block origin-top-left whitespace-nowrap will-change-transform pointer-events-none"
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
  const labels = project.hideLabels
    ? []
    : [project.workType, project.businessSize, project.audience].filter(Boolean)

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
        className={cn(
          'media-loading-surface relative block aspect-video overflow-hidden',
          (hasEmbed ||
            media?.type === 'embed' ||
            coverVideo?.vimeoId ||
            (isFramed && project.embedUrl)) &&
            'bg-black'
        )}
      >
        {isFramed && project.embedUrl ? (
          <VimeoBackground
            url={project.embedUrl}
            title={project.title}
            loopSeconds={4}
            active={hovered}
            grayscale
            offsetX={project.coverOffsetX}
          />
        ) : isFramed && coverVideo?.vimeoId ? (
          <VimeoBackground
            url={vimeoEmbedUrl(coverVideo.vimeoId)}
            title={project.title}
            loopSeconds={4}
            active={hovered}
            grayscale
            offsetX={project.coverOffsetX}
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
