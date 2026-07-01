import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

import { Button } from '@/components/ui/button'

// Lightbox-able media: images and local video files.
type LightboxMedia = {
  alt: string
  src: string
  type: 'image' | 'video'
}

type LightboxProps = {
  activeIndex: number | null
  items: LightboxMedia[]
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}

export function Lightbox({
  activeIndex,
  items,
  onClose,
  onNext,
  onPrevious,
}: LightboxProps) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null)
  const activeItem = activeIndex === null ? null : items[activeIndex]

  useEffect(() => {
    if (activeIndex === null) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onNext()
      if (event.key === 'ArrowLeft') onPrevious()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex, onClose, onNext, onPrevious])

  useEffect(() => {
    setLoadedSrc(null)
  }, [activeItem?.src])

  if (activeIndex === null || !activeItem) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-[var(--color-overlay-scrim)] px-4 py-4 sm:px-6 sm:py-6"
      onClick={onClose}
    >
      <div
        className="mx-auto flex h-full w-[90vw] max-w-[90vw] flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between text-base text-[var(--color-overlay-foreground-muted)]">
          <div>
            {activeIndex + 1} / {items.length}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-[var(--color-overlay-foreground)] hover:bg-[var(--border-inverse)] hover:text-[var(--color-overlay-foreground)]"
            aria-label="Close image gallery"
          >
            <X className="size-5" />
          </Button>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center py-6">
          {items.length > 1 ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={onPrevious}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 text-[var(--color-overlay-foreground)] hover:bg-[var(--border-inverse)] hover:text-[var(--color-overlay-foreground)]"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-6" />
            </Button>
          ) : null}

          <div className="flex h-full max-h-full w-full max-w-[90vw] items-center justify-center overflow-hidden">
            {activeItem.type === 'video' ? (
              <video
                key={activeItem.src}
                src={activeItem.src}
                className="h-auto max-h-full w-auto max-w-full object-contain"
                controls
                autoPlay
                loop
                playsInline
              />
            ) : (
              <img
                src={activeItem.src}
                alt={activeItem.alt}
                onLoad={() => setLoadedSrc(activeItem.src)}
                className={`h-auto max-h-full w-auto max-w-full object-contain transition-opacity duration-300 ${
                  loadedSrc === activeItem.src ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
          </div>

          {items.length > 1 ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={onNext}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 text-[var(--color-overlay-foreground)] hover:bg-[var(--border-inverse)] hover:text-[var(--color-overlay-foreground)]"
              aria-label="Next image"
            >
              <ChevronRight className="size-6" />
            </Button>
          ) : null}
        </div>

        <div className="text-base text-[var(--color-overlay-foreground-muted)]">
          {activeItem.alt}
        </div>
      </div>
    </div>
  )
}
