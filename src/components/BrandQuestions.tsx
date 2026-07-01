import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

// Each question carries explicit line breaks ("\n") so it always reads as two
// rows on lg/xl. The breaks are also where the line wraps on smaller screens.
const questions = [
  "Is our brand\nactually 'us'?",
  "What does 'us'\neven mean?",
  'How do we\nscale?',
  'How do we differentiate\nin the market?',
  'How should we\ncommunicate our growth?',
  'How will non‑designers\nuse this?',
]

const TYPING_SPEED = 45 // ms per character
const HOLD_AFTER_TYPED = 1200 // pause once fully typed, before selecting
const HOLD_SELECTED = 700 // how long the selection highlight shows before delete

type Phase = 'typing' | 'selected'

export function BrandQuestions({ className }: { className?: string }) {
  const textRef = useRef<HTMLParagraphElement>(null)
  const [index, setIndex] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [phase, setPhase] = useState<Phase>('typing')

  const current = questions[index]

  useLayoutEffect(() => {
    const text = textRef.current
    if (!text) return
    let frame = 0

    const fitText = () => {
      text.style.fontSize = ''
      const available = text.parentElement?.clientWidth ?? 0
      const natural = text.scrollWidth
      if (available > 0 && natural > available) {
        const base = Number.parseFloat(getComputedStyle(text).fontSize)
        if (Number.isFinite(base) && base > 0) {
          text.style.fontSize = `${(base * available) / natural}px`
        }
      }
    }

    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(fitText)
    }

    schedule()
    const observer = new ResizeObserver(schedule)
    observer.observe(text)
    if (text.parentElement) observer.observe(text.parentElement)
    void document.fonts?.ready.then(schedule)
    window.addEventListener('resize', schedule)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', schedule)
      text.style.fontSize = ''
    }
  }, [current])

  useEffect(() => {
    if (phase === 'typing') {
      if (charCount < current.length) {
        const timer = setTimeout(() => setCharCount((count) => count + 1), TYPING_SPEED)
        return () => clearTimeout(timer)
      }
      const timer = setTimeout(() => setPhase('selected'), HOLD_AFTER_TYPED)
      return () => clearTimeout(timer)
    }

    // selected: hold the highlight, then "delete" the whole line at once
    // and start typing the next question.
    const timer = setTimeout(() => {
      setCharCount(0)
      setPhase('typing')
      setIndex((current) => (current + 1) % questions.length)
    }, HOLD_SELECTED)
    return () => clearTimeout(timer)
  }, [phase, charCount, current])

  const isSelecting = phase === 'selected'
  const lines = current.split('\n')

  let consumed = 0

  return (
    <p
      ref={textRef}
      className={cn(
        'flex flex-col overflow-hidden font-medium text-foreground',
        className
      )}
    >
      {lines.map((line, lineIndex) => {
        const start = consumed
        // +1 accounts for the "\n" separator between lines.
        consumed += line.length + 1

        const typedInLine = Math.max(0, Math.min(line.length, charCount - start))
        const opaque = line.slice(0, typedInLine)
        const rest = line.slice(typedInLine)
        const caretHere =
          !isSelecting && charCount >= start && charCount <= start + line.length

        return (
          <span key={lineIndex} className="block whitespace-nowrap leading-[1.259]">
            {/* The full line is always laid out — the untyped part is just
                transparent — so typing never reflows the text. */}
            <span
              className={
                isSelecting
                  ? 'box-decoration-clone bg-foreground/15'
                  : undefined
              }
            >
              {opaque}
            </span>
            <span
              aria-hidden
              className="brand-questions-caret ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.12em] bg-foreground align-baseline"
              style={{ visibility: caretHere ? 'visible' : 'hidden' }}
            />
            <span className="text-transparent">{rest}</span>
          </span>
        )
      })}
    </p>
  )
}
