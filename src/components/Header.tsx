export default function Header() {
  const links = [
    { href: '/#work', label: 'Work' },
    { href: '/#experience', label: 'Career' },
    { href: '/#capabilities', label: 'Skills' },
    { href: '/#contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <a
          href="/"
          className="text-lg font-semibold tracking-tight text-zinc-950"
        >
          Alina Skalkina
        </a>

        <nav className="flex flex-wrap items-center gap-5 text-sm text-zinc-600">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-zinc-950"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
