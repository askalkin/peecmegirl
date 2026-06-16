import { createFileRoute } from '@tanstack/react-router'

import { portfolioData } from '@/data/portfolio'
import { AboutContent } from '@/components/AboutContent'
import { SiteFooter } from '@/components/SiteFooter'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      {
        title: `About | ${portfolioData.person.name}`,
      },
    ],
  }),
  component: AboutPage,
})

function AboutPage() {
  return (
    <main id="top" className="text-foreground">
      <AboutContent />
      <SiteFooter />
    </main>
  )
}
