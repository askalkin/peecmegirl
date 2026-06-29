import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

declare global {
  interface Window {
    Vimeo?: { Player: new (el: HTMLIFrameElement) => VimeoPlayer }
  }
}

type VimeoPlayer = {
  on: (event: string, cb: (data: { seconds: number }) => void) => void
  setCurrentTime: (seconds: number) => Promise<number>
  play: () => Promise<void>
  pause: () => Promise<void>
  destroy: () => Promise<void>
}

// Full-bleed Vimeo background player. In `background=1` mode the video
// autoplays muted, loops, and covers its container with no controls.
// `loopSeconds` restarts playback at that mark; `active` toggles play/pause so
// card covers can stay paused (and greyscale) until hovered.
// The iframe is deferred until the container enters the viewport (300px margin).
export function VimeoBackground({
  url,
  title,
  loopSeconds,
  active = true,
  grayscale = false,
  offsetX,
  cropScale = 1,
  alignTop = false,
  stageClassName = 'bg-black',
  fit = 'cover',
  aspect = 'aspect-video',
  eager = false,
}: {
  url: string
  title: string
  loopSeconds?: number
  active?: boolean
  grayscale?: boolean
  offsetX?: string
  cropScale?: number
  alignTop?: boolean
  stageClassName?: string
  fit?: 'cover' | 'contain' | 'width'
  /**
   * Aspect ratio of the iframe, as a Tailwind class. Set this to the video's
   * true ratio so `fit="cover"` lands an exact fit with no crop or letterbox
   * bars; defaults to 16:9.
   */
  aspect?: string
  eager?: boolean
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<VimeoPlayer | undefined>(undefined)
  const [inView, setInView] = useState(eager)
  const needsPlayerApi = Boolean(loopSeconds) || !active

  useEffect(() => {
    if (eager) return
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView || !needsPlayerApi) return
    let cancelled = false

    const init = () => {
      if (cancelled || !iframeRef.current || !window.Vimeo) return
      const player = new window.Vimeo.Player(iframeRef.current)
      playerRef.current = player
      if (loopSeconds) {
        player.on('timeupdate', (data) => {
          if (data.seconds >= loopSeconds) player.setCurrentTime(0).catch(() => {})
        })
      }
      if (!active) player.pause().catch(() => {})
    }

    if (window.Vimeo) {
      init()
    } else {
      let script = document.querySelector<HTMLScriptElement>(
        'script[data-vimeo-player]'
      )
      if (!script) {
        script = document.createElement('script')
        script.src = 'https://player.vimeo.com/api/player.js'
        script.async = true
        script.dataset.vimeoPlayer = 'true'
        document.body.appendChild(script)
      }
      script.addEventListener('load', init)
    }

    return () => {
      cancelled = true
      playerRef.current?.destroy().catch(() => {})
      playerRef.current = undefined
    }
  }, [loopSeconds, url, inView])

  useEffect(() => {
    const player = playerRef.current
    if (!player) return
    if (active) player.play().catch(() => {})
    else player.pause().catch(() => {})
  }, [active])

  return (
    <div
      ref={containerRef}
      className={cn(
        'absolute inset-0 overflow-hidden',
        stageClassName,
        grayscale && 'md:grayscale transition duration-500 md:group-hover:grayscale-0'
      )}
    >
      {inView && (
        <iframe
          ref={iframeRef}
          src={url}
          title={title}
          loading="lazy"
          className={cn(
            'pointer-events-none absolute',
            aspect,
            fit === 'cover'
              ? 'h-auto min-h-full w-auto min-w-full'
              : fit === 'width'
                ? 'h-auto w-full'
                : 'h-full max-h-full w-full max-w-full',
            alignTop ? 'top-0' : 'top-1/2'
          )}
          style={{
            left: offsetX ? `calc(50% + ${offsetX})` : '50%',
            transformOrigin: alignTop ? 'top center' : 'center',
            transform: alignTop
              ? `translateX(-50%) scale(${cropScale})`
              : `translate(-50%, -50%) scale(${cropScale})`,
          }}
          allow="autoplay; fullscreen; picture-in-picture"
        />
      )}
    </div>
  )
}
