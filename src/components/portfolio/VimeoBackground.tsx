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
  setMuted: (muted: boolean) => Promise<boolean>
  setVolume: (volume: number) => Promise<number>
  play: () => Promise<void>
  pause: () => Promise<void>
  destroy: () => Promise<void>
}

// Full-bleed Vimeo background player. In `background=1` mode the video
// autoplays muted, loops, and covers its container with no controls.
// `loopSeconds` restarts playback at that mark; `active` toggles play/pause so
// card covers can stay paused (and greyscale) until hovered.
// The iframe loads eagerly so every video is ready as soon as the page loads.
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
  sound = false,
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
  /**
   * When true, render a click-to-unmute button so the otherwise-muted
   * background video can play audio on demand.
   */
  sound?: boolean
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<VimeoPlayer | undefined>(undefined)
  // Load every player up front so all videos are ready the moment the page
  // loads, rather than waiting for each to scroll into view.
  const [inView] = useState(true)
  const [muted, setMuted] = useState(true)
  const needsPlayerApi = Boolean(loopSeconds) || !active || sound

  useEffect(() => {
    if (!inView || !needsPlayerApi) return
    let cancelled = false

    const init = () => {
      if (cancelled || playerRef.current || !iframeRef.current || !window.Vimeo)
        return
      const player = new window.Vimeo.Player(iframeRef.current)
      playerRef.current = player
      if (loopSeconds) {
        player.on('timeupdate', (data) => {
          if (data.seconds >= loopSeconds) player.setCurrentTime(0).catch(() => {})
        })
      }
      if (!active) player.pause().catch(() => {})
      // Apply the current sound choice (the user may have toggled before the
      // player finished loading).
      if (sound) {
        player.setMuted(muted).catch(() => {})
        if (!muted) player.setVolume(1).catch(() => {})
      }
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
      // The script may already be loaded (cached from another player), in which
      // case the `load` event never refires — poll for the global as a fallback.
      script.addEventListener('load', init)
      const poll = window.setInterval(() => {
        if (window.Vimeo) {
          window.clearInterval(poll)
          init()
        }
      }, 100)
      return () => {
        cancelled = true
        window.clearInterval(poll)
        playerRef.current?.destroy().catch(() => {})
        playerRef.current = undefined
      }
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

  const toggleSound = () => {
    const next = !muted
    setMuted(next)
    const player = playerRef.current
    if (!player) return
    player.setMuted(next).catch(() => {})
    if (!next) player.setVolume(1).catch(() => {})
  }

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
          loading="eager"
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
      {sound && inView && (
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? 'Unmute video' : 'Mute video'}
          aria-pressed={!muted}
          className="absolute bottom-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          {muted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M11 5 6 9H2v6h4l5 4z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M11 5 6 9H2v6h4l5 4z" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>
      )}
    </div>
  )
}
