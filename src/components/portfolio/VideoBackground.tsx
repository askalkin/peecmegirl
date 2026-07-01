import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

// Full-bleed local video background player. In the default (muted, looping)
// mode the video autoplays and covers its container with no controls.
// `loopSeconds` restarts playback at that mark; `active` toggles play/pause so
// card covers can stay paused (and greyscale) until hovered. The video loads
// eagerly so every clip is ready as soon as the page loads.
export function VideoBackground({
  src,
  title,
  loopSeconds,
  active = true,
  grayscale = false,
  offsetX,
  cropScale = 1,
  alignTop = false,
  stageClassName = 'bg-black',
  fit = 'cover',
  sound = false,
  hoverZoom = false,
}: {
  src: string
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
   * Kept for API parity with the media items; the aspect ratio no longer needs
   * to be declared because a native <video> with object-cover never letterboxes.
   */
  aspect?: string
  eager?: boolean
  /**
   * When true, render a click-to-unmute button so the otherwise-muted
   * background video can play audio on demand.
   */
  sound?: boolean
  /**
   * When true, the whole video scales up slightly on group-hover, matching the
   * zoom used on plain <video>/<img> card covers so every card behaves alike.
   */
  hoverZoom?: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  // Play/pause follows `active` so paused card covers stay on their first frame
  // until hovered. `muted` is applied on the element here (React can't set it
  // reliably via the attribute alone) *before* calling play(), otherwise the
  // browser blocks autoplay on a momentarily-unmuted video.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = muted
    if (active) video.play().catch(() => {})
    else video.pause()
  }, [active, muted])

  const toggleSound = () => {
    const next = !muted
    setMuted(next)
    const video = videoRef.current
    if (!video) return
    video.muted = next
    if (!next) video.volume = 1
  }

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (!video || !loopSeconds) return
    if (video.currentTime >= loopSeconds) {
      video.currentTime = 0
    }
  }

  return (
    <div
      className={cn(
        'absolute inset-0 overflow-hidden',
        stageClassName,
        (grayscale || hoverZoom) && 'transition duration-500 ease-out',
        grayscale && 'md:grayscale md:group-hover:grayscale-0',
        hoverZoom && 'md:group-hover:scale-[1.04]'
      )}
    >
      <video
        ref={videoRef}
        title={title}
        aria-label={title}
        autoPlay={active}
        muted
        loop={!loopSeconds}
        playsInline
        preload="auto"
        onTimeUpdate={loopSeconds ? handleTimeUpdate : undefined}
        className={cn(
          'pointer-events-none absolute',
          fit === 'width'
            ? 'left-0 top-0 h-auto w-full'
            : cn(
                'inset-0 h-full w-full',
                fit === 'cover' ? 'object-cover' : 'object-contain'
              )
        )}
        style={{
          objectPosition: alignTop ? 'center top' : 'center',
          transformOrigin: alignTop ? 'top center' : 'center',
          transform: `${offsetX ? `translateX(${offsetX}) ` : ''}scale(${cropScale})`,
        }}
      >
        <source src={src} type="video/webm" />
      </video>
      {sound && (
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
