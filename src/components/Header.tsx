import { SiteNav } from './SiteNav'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md">
      <div className="section-shell flex min-h-16 items-center justify-center gap-4 py-4 sm:justify-between">
        <a
          href="/"
          className="hidden font-display text-sm font-bold lowercase tracking-tight text-foreground transition-opacity duration-200 hover:opacity-60 sm:block"
        >
          alina skalkina
        </a>
        <SiteNav />
      </div>
    </header>
  )
}
