import { ArrowUp } from 'lucide-react'

import { portfolioData } from '@/data/portfolio'

export function SiteFooter({
  backHref,
  backLabel,
}: {
  backHref: string
  backLabel: string
  /** @deprecated kept for call-site compatibility */
  excludeHrefs?: string[]
}) {
  return (
    <footer className="section-shell border-t border-border py-10">
      <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-5">
          <span>
            &copy; {portfolioData.person.footerYear} {portfolioData.person.name}
          </span>
          <a
            href="/cv"
            className="transition-opacity duration-200 hover:opacity-50"
          >
            cv
          </a>
        </div>
        <a
          href={backHref}
          className="inline-flex items-center gap-2 transition-opacity duration-200 hover:opacity-50"
        >
          <ArrowUp className="size-4" />
          {backLabel}
        </a>
      </div>
    </footer>
  )
}
