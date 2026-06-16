import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

const questions = [
  "Is our brand actually 'us'?",
  "What does 'us' even mean?",
  'How do we scale?',
  'How do we differentiate in the market?',
  'How should we communicate our growth?',
  'How will non‑designers use this?',
]

const TYPING_SPEED = 45 // ms per character
const HOLD_AFTER_TYPED = 1200 // pause once fully typed, before selecting
const HOLD_SELECTED = 700 // how long the selection highlight shows before delete

type Phase = 'typing' | 'selected'

export function BrandQuestions({ className }: { className?: string }) {
  const [index, setIndex] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [phase, setPhase] = useState<Phase>('typing')

  const current = questions[index]

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

  const shown = current.slice(0, charCount)
  const isSelecting = phase === 'selected'

  return (
    <p
      className={cn(
        'font-display font-medium leading-tight tracking-tight text-foreground',
        className
      )}
    >
      <span
        className={
          isSelecting
            ? 'box-decoration-clone rounded-[2px] bg-foreground/15'
            : undefined
        }
      >
        {shown}
      </span>
      {!isSelecting ? (
        <span
          aria-hidden
          className="brand-questions-caret ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.12em] bg-foreground align-baseline"
        />
      ) : null}
    </p>
  )
}
