import { portfolioData } from '@/data/portfolio'

export function ContactSection({ id }: { id?: string }) {
  const [callLink, linkedInLink] = portfolioData.person.links

  const links = [
    { href: callLink.href, label: 'book call', external: true },
    { href: `mailto:${portfolioData.person.email}`, label: 'email', external: false },
    { href: linkedInLink.href, label: 'linkedin', external: true },
  ]

  return (
    <section
      id={id}
      className="contact-section section-shell scroll-mt-20 py-20 md:py-28"
    >
      <div className="flex items-end justify-between gap-8">
        <ul className="flex flex-col gap-1">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
                className="font-display text-5xl font-black lowercase leading-[1.02] tracking-tight text-foreground transition-opacity duration-200 hover:opacity-50 sm:text-6xl md:text-7xl"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <svg
          aria-hidden
          viewBox="0 0 200 200"
          className="hidden h-32 w-32 shrink-0 text-foreground md:block lg:h-44 lg:w-44"
        >
          {/* filled half-disc */}
          <path d="M120 0 A100 100 0 0 1 120 200 Z" fill="currentColor" />
          {/* outlined right triangle */}
          <path
            d="M10 60 L10 190 L140 190 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </section>
  )
}
