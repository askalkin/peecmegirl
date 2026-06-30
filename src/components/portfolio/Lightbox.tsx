import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

import { Button } from '@/components/ui/button'

type LightboxImage = {
  alt: string
  src: string
}

type LightboxProps = {
  activeIndex: number | null
  images: LightboxImage[]
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}

export function Lightbox({
  activeIndex,
  images,
  onClose,
  onNext,
  onPrevious,
}: LightboxProps) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null)
  const activeImage = activeIndex === null ? null : images[activeIndex]

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
  }, [activeImage?.src])

  if (activeIndex === null || !activeImage) return null

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
            {activeIndex + 1} / {images.length}
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

        <div className="relative flex flex-1 items-center justify-center py-6">
          {images.length > 1 ? (
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

          <div className="flex h-[75vh] max-h-[75vh] w-full max-w-[90vw] items-center justify-center overflow-hidden">
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              onLoad={() => setLoadedSrc(activeImage.src)}
              className={`h-[75vh] w-auto max-w-full object-contain transition-opacity duration-300 ${
                loadedSrc === activeImage.src ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>

          {images.length > 1 ? (
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
          {activeImage.alt}
        </div>
      </div>
    </div>
  )
}
