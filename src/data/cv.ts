export type CvRole = {
  title: string
  company: string
  /** Country shown next to the company in the experience list label. */
  country: string
  /** Short description of the company, shown when a role is expanded. */
  companyAbout: string
  /** Years-only label for the experience list (e.g. "2023 – 2025"). */
  years: string
  /** Full month/year range, used on the printable /cv page. */
  period: string
  location?: string
  highlights: string[]
  note?: string
}

export const cvRoles: CvRole[] = [
  {
    title: 'Lead Brand Designer',
    company: 'Alty',
    country: 'USA',
    companyAbout:
      'Digital transformation partner for complex products, platforms, and compliance-heavy business environments.',
    years: '2026',
    period: 'Feb 2026 - Present',
    location: 'USA, Remote',
    highlights: [
      "Led Alty's scale-up rebrand across brand strategy, visual identity, website experience, and scalable system development.",
      'Reframed the company from service provider to digital transformation partner, turning complex B2B and compliance-heavy positioning into clear creative direction.',
      'Built a token-based brand system with semantic tokens, adaptive components, reusable patterns, modular Figma constructors, and AI-assisted design-dev workflows.',
      'Mentored designers in design engineering and scalable brand-system thinking.',
    ],
  },
  {
    title: 'Founding Designer',
    company: 'Farba Booking',
    country: 'Germany',
    companyAbout:
      'An early-stage booking platform, shaped from concept to MVP.',
    years: '2025',
    period: 'Jun 2025 - Present',
    location: 'Berlin, Germany',
    highlights: [
      'Led design vision and strategy from concept to MVP across PMF, UI/UX and branding.',
      'Supported development with handoff, prototyping, and implementation-ready specifications.',
    ],
  },
  {
    title: 'Brand Designer',
    company: 'LUN',
    country: 'Ukraine',
    companyAbout:
      "Ukraine's innovative leader in proptech, with global presence.",
    years: '2023 – 2025',
    period: 'May 2023 - Nov 2025',
    location: 'Kyiv, Remote',
    highlights: [
      'Designed brand identity guidelines and a modular asset constructor in Figma for social media.',
      'Delivered assets and animations.',
    ],
  },
  {
    title: 'Brand Designer',
    company: 'UTC FILM Creative Agency',
    country: 'Ukraine',
    companyAbout:
      'A creative agency producing brand campaigns and video content.',
    years: '2021 – 2025',
    period: 'Aug 2021 - May 2025',
    location: 'Kyiv, Remote',
    highlights: [
      'Led design direction for a B2B website redesign.',
      'Facilitated cross-team workshops to align strategy during fast campaign cycles.',
      'Art-directed and built cohesive brand identities and marketing systems.',
    ],
  },
  {
    title: 'Growth Designer, Marketing Designer',
    company: 'LUN',
    country: 'Ukraine',
    companyAbout:
      "Ukraine's innovative leader in proptech, with global presence.",
    years: '2018 – 2021',
    period: 'Jul 2018 - Jul 2021',
    location: 'Kyiv',
    note: 'Collaborated with designers, developers, marketers, analysts, product managers, and founders across 10 countries.',
    highlights: [
      'Drove growth design for the LUN Misto air quality map, apps, and widgets, contributing to 230% growth.',
      'Led UI/UX development of the inclusivity award-winning Comfort Map.',
      'Mentored designers and supported team capability growth.',
      'Created marketing campaign UI, B2B lead magnets, and loyalty campaign assets.',
      'Contributed to LUN brand redesign and gave a university lecture on design-frontend collaboration.',
      'Designed end-to-end HR CRM workflows that reduced onboarding time by 40% and manual HR workload by 60%.',
      'Reached 100% employee self-service adoption across teams in 10 countries.',
    ],
  },
]
