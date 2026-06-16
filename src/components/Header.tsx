import { SiteNav } from './SiteNav'

export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="section-shell flex min-h-16 items-center justify-between gap-3 py-4">
        <a
          href="/"
          className="inline-flex shrink-0 rounded-full border border-border/60 bg-background/55 px-4 py-2 font-display text-xs font-bold lowercase tracking-tight text-foreground shadow-sm backdrop-blur-md transition-opacity duration-200 hover:opacity-60 sm:px-5 sm:py-2.5 sm:text-sm"
        >
          alina skalkina
        </a>
        <SiteNav />
      </div>
    </header>
  )
}
