import type { Ref } from 'react'

import { cn } from '@/lib/utils'

import { VideoBackground } from './VideoBackground'

// Apple-keynote style cover: the media floats centred on a surface, shown in
// full (no cropping) with a rounded frame and soft shadow. `frameWidth` caps
// the media width so its full height fits on screen. On cards it stays
// greyscale and paused until hovered; heroes autoplay.
export function CoverMedia({
  imageSrc,
  imageAlt,
  videoSrc,
  embedUrl,
  embedAspect = 'aspect-video',
  embedActive = true,
  embedFit = 'cover',
  embedEager = false,
  embedStageClassName,
  title,
  rounded = 'rounded-sm',
  videoRef,
  autoPlay = false,
  grayscale = false,
  surface = 'bg-card',
  frameWidth = '75%',
  padding = 'p-6',
  mobileFull = false,
  fillHeight = false,
}: {
  imageSrc?: string
  imageAlt?: string
  videoSrc?: string
  embedUrl?: string
  embedAspect?: string
  embedActive?: boolean
  embedFit?: 'cover' | 'contain'
  embedEager?: boolean
  embedStageClassName?: string
  title: string
  rounded?: string
  videoRef?: Ref<HTMLVideoElement>
  autoPlay?: boolean
  grayscale?: boolean
  surface?: string
  frameWidth?: string
  padding?: string
  mobileFull?: boolean
  /**
   * Size the media by height so it fills the surface and every framed hero
   * lands at the same height, while its aspect ratio (proportions) is kept.
   * Falls back to full width on mobile when combined with `mobileFull`.
   */
  fillHeight?: boolean
}) {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center',
        padding,
        surface
      )}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={imageAlt ?? title}
          style={
            fillHeight
              ? undefined
              : mobileFull
                ? ({ '--frame-width': frameWidth } as React.CSSProperties)
                : { maxWidth: frameWidth }
          }
          className={cn(
            'media-loading-surface max-h-full max-w-full object-contain transition duration-500 group-hover:scale-[1.03]',
            fillHeight
              ? 'w-full md:h-full md:w-auto md:shadow-[var(--shadow-float)] max-md:rounded-none'
              : mobileFull
                ? 'w-full md:max-w-[var(--frame-width)] md:shadow-[var(--shadow-float)] max-md:rounded-none'
                : 'shadow-[var(--shadow-float)]',
            grayscale && 'grayscale group-hover:grayscale-0',
            rounded
          )}
        />
      ) : embedUrl ? (
        <div
          style={
            fillHeight
              ? undefined
              : mobileFull
                ? ({ '--frame-width': frameWidth } as React.CSSProperties)
                : { width: frameWidth }
          }
          className={cn(
            'media-loading-surface relative max-h-full max-w-full overflow-hidden transition duration-500 group-hover:scale-[1.03]',
            fillHeight
              ? 'w-full md:h-full md:w-auto md:shadow-[var(--shadow-float)] max-md:rounded-none'
              : mobileFull
                ? 'w-full md:w-[var(--frame-width)] md:shadow-[var(--shadow-float)] max-md:rounded-none'
                : 'shadow-[var(--shadow-float)]',
            embedAspect,
            rounded
          )}
        >
          <VideoBackground
            src={embedUrl}
            title={title}
            active={embedActive}
            grayscale={grayscale}
            fit={embedFit}
            aspect={embedAspect}
            eager={embedEager}
            stageClassName={embedStageClassName ?? surface}
          />
        </div>
      ) : videoSrc ? (
        <video
          ref={videoRef}
          style={
            fillHeight
              ? undefined
              : mobileFull
                ? ({ '--frame-width': frameWidth } as React.CSSProperties)
                : { maxWidth: frameWidth }
          }
          className={cn(
            'media-loading-surface max-h-full max-w-full transition duration-500 group-hover:scale-[1.03]',
            fillHeight
              ? 'w-full md:h-full md:w-auto md:shadow-[var(--shadow-float)] max-md:rounded-none'
              : mobileFull
                ? 'w-full md:max-w-[var(--frame-width)] md:shadow-[var(--shadow-float)] max-md:rounded-none'
                : 'shadow-[var(--shadow-float)]',
            grayscale && 'grayscale group-hover:grayscale-0',
            rounded
          )}
          autoPlay={autoPlay}
          loop
          muted
          playsInline
          preload="auto"
          aria-label={`${title} preview`}
        >
          <source src={videoSrc} />
        </video>
      ) : (
        <div
          style={{ width: frameWidth }}
          className={cn(
            'media-loading-surface flex aspect-video max-h-full items-center justify-center text-base text-muted-foreground shadow-[var(--shadow-float)]',
            rounded
          )}
        >
          video here
        </div>
      )}
    </div>
  )
}
