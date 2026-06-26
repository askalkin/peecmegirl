import type { Ref } from 'react'

import { cn } from '@/lib/utils'

import { VimeoBackground } from './VimeoBackground'

// Apple-keynote style cover: the media floats centred on a surface, shown in
// full (no cropping) with a rounded frame and soft shadow. `frameWidth` caps
// the media width so its full height fits on screen. On cards it stays
// greyscale and paused until hovered; heroes autoplay.
export function CoverMedia({
  videoSrc,
  embedUrl,
  embedAspect = 'aspect-video',
  embedActive = true,
  title,
  rounded = 'rounded-sm',
  videoRef,
  autoPlay = false,
  grayscale = false,
  surface = 'bg-card',
  frameWidth = '75%',
  padding = 'p-6',
  mobileFull = false,
}: {
  videoSrc?: string
  embedUrl?: string
  embedAspect?: string
  embedActive?: boolean
  title: string
  rounded?: string
  videoRef?: Ref<HTMLVideoElement>
  autoPlay?: boolean
  grayscale?: boolean
  surface?: string
  frameWidth?: string
  padding?: string
  mobileFull?: boolean
}) {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center',
        padding,
        surface
      )}
    >
      {embedUrl ? (
        <div
          style={
            mobileFull
              ? ({ '--frame-width': frameWidth } as React.CSSProperties)
              : { width: frameWidth }
          }
          className={cn(
            'media-loading-surface relative max-h-full overflow-hidden transition duration-500 group-hover:scale-[1.03]',
            mobileFull
              ? 'w-full md:w-[var(--frame-width)] md:shadow-[var(--shadow-float)] max-md:rounded-none'
              : 'shadow-[var(--shadow-float)]',
            embedAspect,
            rounded
          )}
        >
          <VimeoBackground
            url={embedUrl}
            title={title}
            active={embedActive}
            grayscale={grayscale}
          />
        </div>
      ) : videoSrc ? (
        <video
          ref={videoRef}
          style={
            mobileFull
              ? ({ '--frame-width': frameWidth } as React.CSSProperties)
              : { maxWidth: frameWidth }
          }
          className={cn(
            'media-loading-surface max-h-full transition duration-500 group-hover:scale-[1.03]',
            mobileFull
              ? 'w-full md:max-w-[var(--frame-width)] md:shadow-[var(--shadow-float)] max-md:rounded-none'
              : 'shadow-[var(--shadow-float)]',
            grayscale && 'grayscale group-hover:grayscale-0',
            rounded
          )}
          autoPlay={autoPlay}
          loop
          muted
          playsInline
          preload="metadata"
          aria-label={`${title} preview`}
        >
          <source src={videoSrc} />
        </video>
      ) : (
        <div
          style={{ width: frameWidth }}
          className={cn(
            'media-loading-surface flex aspect-video max-h-full items-center justify-center text-sm text-muted-foreground shadow-[var(--shadow-float)]',
            rounded
          )}
        >
          video here
        </div>
      )}
    </div>
  )
}
