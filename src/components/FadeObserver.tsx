import { useEffect } from 'react'

export function FadeObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
    )

    const observeAll = () => {
      document.querySelectorAll('[data-fade]:not(.is-visible)').forEach((el) =>
        observer.observe(el)
      )
    }

    observeAll()

    // Re-scan after route transitions add new [data-fade] nodes
    const mutObs = new MutationObserver(observeAll)
    mutObs.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutObs.disconnect()
    }
  }, [])

  return null
}
