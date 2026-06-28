import { portfolioData } from '@/data/portfolio'

// Sits beneath the contact section (contacts + animation), as the page's
// copyright line — body type, not the display wordmark.
export function SiteFooter() {
  return (
    <footer className="section-shell flex flex-wrap items-center justify-between gap-2 py-6 text-base text-muted-foreground">
      <span>{portfolioData.person.name}</span>
      <span>&copy; {portfolioData.person.footerYear}</span>
    </footer>
  )
}
