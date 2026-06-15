import { portfolioData } from '@/data/portfolio'

export function SiteFooter() {
  return (
    <footer className="section-shell py-10">
      <div className="flex items-center justify-center text-sm text-muted-foreground">
        <span>
          &copy; {portfolioData.person.footerYear} {portfolioData.person.name}
        </span>
      </div>
    </footer>
  )
}
