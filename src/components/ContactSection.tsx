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
      className="contact-section flex min-h-screen w-full scroll-mt-20 flex-col justify-center p-20"
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
          viewBox="0 0 423 555"
          className="hidden h-44 w-auto shrink-0 self-end text-foreground md:block lg:h-56"
        >
          {/* filled half-disc */}
          <path
            d="M268.625 0.686326C353.4 49.9426 382.38 158.544 333.326 243.509C284.272 328.474 175.729 357.678 90.6841 308.888L268.625 0.686326Z"
            fill="currentColor"
            stroke="currentColor"
          />
          {/* outlined right triangle */}
          <path
            d="M1.00329 242L361.267 554H1L1.00329 242Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  )
}
