import { portfolioData } from '@/data/portfolio'

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="section-shell grid grid-cols-[3fr_1fr] items-stretch">
        <div className="flex items-center py-8 md:py-12">
          <span className="text-display font-black lowercase text-foreground">
            {portfolioData.person.name}
          </span>
        </div>
        <div className="flex items-center justify-center border-l border-border px-4">
          <span className="text-h2 font-bold text-foreground">
            &copy; {portfolioData.person.footerYear}
          </span>
        </div>
      </div>
    </footer>
  )
}
