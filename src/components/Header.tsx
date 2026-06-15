import { SiteNav } from './SiteNav'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md">
      <div className="section-shell flex min-h-16 items-center justify-center py-4">
        <SiteNav />
      </div>
    </header>
  )
}
