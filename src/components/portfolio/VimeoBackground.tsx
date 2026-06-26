import { useEffect, useRef } from 'react'

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

// Full-bleed Vimeo background player on a black stage. In `background=1` mode
// the video autoplays muted, loops, and covers its container with no controls.
// `loopSeconds` restarts playback at that mark; `active` toggles play/pause so
// card covers can stay paused (and greyscale) until hovered.
export function VimeoBackground({
  url,
  title,
  loopSeconds,
  active = true,
  grayscale = false,
  offsetX,
}: {
  url: string
  title: string
  loopSeconds?: number
  active?: boolean
  grayscale?: boolean
  offsetX?: string
}) {
  const ref = useRef<HTMLIFrameElement>(null)
  const playerRef = useRef<VimeoPlayer | undefined>(undefined)

  useEffect(() => {
    let cancelled = false

    const init = () => {
      if (cancelled || !ref.current || !window.Vimeo) return
      const player = new window.Vimeo.Player(ref.current)
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
  }, [loopSeconds, url])

  useEffect(() => {
    const player = playerRef.current
    if (!player) return
    if (active) player.play().catch(() => {})
    else player.pause().catch(() => {})
  }, [active])

  return (
    <div
      className={cn(
        'absolute inset-0 overflow-hidden',
        grayscale && 'grayscale transition duration-500 group-hover:grayscale-0'
      )}
    >
      {/* 16:9 iframe oversized so the video covers (fills) the container in
          both dimensions instead of letterboxing. */}
      <iframe
        ref={ref}
        src={url}
        title={title}
        className="absolute top-1/2 aspect-video min-h-full min-w-full -translate-y-1/2"
        style={offsetX
          ? { left: `calc(50% + ${offsetX})`, transform: `translateX(-50%) translateY(-50%)` }
          : { left: '50%', transform: 'translateX(-50%) translateY(-50%)' }
        }
        allow="autoplay; fullscreen; picture-in-picture"
      />
    </div>
  )
}
