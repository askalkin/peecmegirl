export type CvRole = {
  title: string
  company: string
  period: string
  location?: string
  highlights: string[]
  note?: string
}

export const cvRoles: CvRole[] = [
  {
    title: 'Lead Brand Designer',
    company: 'Alty · Full-time',
    period: 'Feb 2026 - Present',
    location: 'USA, Remote',
    highlights: [
      'Led a team of designers in the development of B2B brand materials.',
      'Engineered a token-based design-system architecture.',
      'Built modular asset constructors in Figma for social media and B2B presentations for nontechnical stakeholders.',
      'Optimized design-dev handoff with AI-assisted workflows to reduce delivery debt.',
      'Crafted visual solutions for multi-channel campaigns.',
      'Developed the visual foundation for the company’s scale-up rebrand, translating complex B2B compliance rules into clear creative parameters for an external execution agency.',
    ],
  },
  {
    title: 'Founding Designer',
    company: 'Farba Booking · Self-employed',
    period: 'Jun 2025 - Present',
    location: 'Berlin, Germany',
    highlights: [
      'Led design vision and strategy from concept to MVP across UX, product strategy, and branding.',
      'Supported development with handoff, prototyping, and implementation-ready specifications.',
    ],
  },
  {
    title: 'Brand Designer',
    company: 'LUN · Contract',
    period: 'May 2023 - Nov 2025',
    location: 'Kyiv, Remote',
    highlights: [
      'Designed brand identity guidelines and a modular asset constructor in Figma for social media.',
      'Delivered assets and animations.',
    ],
  },
  {
    title: 'Brand Designer',
    company: 'UTC FILM Creative Agency · Contract',
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
    company: 'LUN · Full-time',
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
