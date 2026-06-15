import { portfolioData } from '@/data/portfolio'

export function SiteNav({ className = '' }: { className?: string }) {
  return (
    <nav
      className={`flex items-center justify-center gap-8 text-sm text-foreground sm:gap-10 ${className}`}
    >
      {portfolioData.person.sitemap.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="transition-opacity duration-200 hover:opacity-50"
        >
          {link.label}
        </a>
      ))}
    </nav>
  )
}
