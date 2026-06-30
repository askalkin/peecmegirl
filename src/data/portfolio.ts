export type MediaType = 'image' | 'video'

export type PortfolioLink = {
  href: string
  label: string
}

export type PortfolioStat = {
  label: string
  value: string
}

export type PortfolioCareerEntry = {
  period: string
  title: string
  details: string[]
}

export type PortfolioSkillGroup = {
  title: string
  items: string[]
}

export type PortfolioPrinciple = {
  title: string
  description: string
}

export type PortfolioHighlight = {
  title: string
  description: string
  value?: string
}

export type PortfolioProcessStep = {
  title: string
  description: string
}

/** Inline link inside a story paragraph. */
export type PortfolioStorySegment = { text: string; href: string }
/** A paragraph: plain text, or a mix of text and inline links. */
export type PortfolioStoryParagraph =
  | string
  | Array<string | PortfolioStorySegment>
/** A titled block of narrative copy in a case study. */
export type PortfolioStorySection = {
  heading?: string
  paragraphs: PortfolioStoryParagraph[]
}

export type PortfolioPartner = {
  name: string
  src: string
}

export type PortfolioMediaItem = {
  alt: string
  src: string
  type: MediaType
  span?: 'wide' | 'tall'
  caption?: string
  /** Width in a 30-column gallery grid. When any item sets this (or `center`),
   *  the gallery renders as a row-based grid instead of masonry. */
  cols?: number
  /** Render this video centred at 70% width with a rounded, cropped frame. */
  center?: boolean
  /** CSS aspect-ratio (e.g. '16/10') for the grid cell. Items sharing a row
   *  with the same aspect + width render at identical heights. */
  aspect?: string
  /** Cap the cell at this share of viewport height (vh), contained & centred. */
  maxVh?: number
  /** Render this item centred at a fixed width (e.g. '58%' to match the hero). */
  frameWidth?: string
  /** How media should fit when an explicit aspect ratio is used. */
  fit?: 'cover' | 'contain'
  /** Assigns this item to a flex-row group. Items sharing the same number render
   *  in a single horizontal row at equal height. Use with `flexGrow`. */
  flexRow?: number
  /** flex-grow value — set to the image's natural aspect ratio (w/h) so all
   *  items in a flex row share the same height with proportional widths. */
  flexGrow?: number
  /** Column span in a 12-column bento grid (1–12). Triggers BentoGridGallery. */
  colSpan?: number
  /** Row span in a 12-column bento grid (default 1). */
  rowSpan?: number
  /** Vimeo video ID — when set, the gallery renders this via Vimeo instead of a local file. */
  vimeoId?: string
  /** Additional image srcs to cycle through in the playground grid slideshow cell. */
  slides?: string[]
  /** Render this item centred beneath the playground grid at its real proportions. */
  playgroundFeature?: boolean
  /** CSS object-position for the media (e.g. 'bottom') when using object-cover. */
  objectPosition?: string
  /** Scale media inside an overflow-hidden frame to crop unwanted edges. */
  cropScale?: number
  /** Horizontal offset for cropped Vimeo media, e.g. '3%'. */
  cropOffsetX?: string
  /** Anchor cropped Vimeo media to the top so extra height is removed at bottom. */
  cropAlignTop?: boolean
}

export type PortfolioProject = {
  id: string
  title: string
  navigationLabel: string
  year: string
  categories: string[]
  /** "blog" projects show as small insight cards and use a 3D scene hero. */
  kind?: 'blog'
  /** Company the work was made for, shown in the case-study label. */
  company?: string
  /** Size of the business the work was made for (e.g. Startup, Scale-up, Enterprise). */
  businessSize?: string
  /** Primary type of work (e.g. Brand Design, Growth Design). */
  workType?: string
  focus: string
  summary: string[]
  goals?: string
  role?: string
  liveLink?: PortfolioLink
  /** 'framed' centres the cover/hero media on a white card (Apple-keynote vibe). */
  cover?: 'framed'
  /** Background-player embed URL (e.g. Vimeo) used as the framed media. */
  embedUrl?: string
  /** Aspect-ratio class for a framed embed, e.g. 'aspect-[4/3]'. */
  embedAspect?: string
  /** Static image used only for the framed case-study hero. */
  framedHeroImageSrc?: string
  framedHeroImageAlt?: string
  /** Dedicated cover/hover image, shown on the card and the hover preview but
   *  not in the case-study gallery. */
  coverSrc?: string
  /** Skip the full-bleed hero; the page opens on its content and gallery. */
  noHero?: boolean
  /** Background for a contained (letterboxed) hero — set to match the video's
   *  own canvas colour so the side gutters blend seamlessly. Accepts any CSS
   *  `background` value (solid colour or gradient). */
  heroBg?: string
  /** Render the gallery as a 3-column square slideshow grid (playground style). */
  playgroundGrid?: boolean
  /** Hide the workType/businessSize chips on the homepage card. */
  hideLabels?: boolean
  /** Audience label shown on the homepage card (e.g. 'B2B', 'B2C'). */
  audience?: string
  /** Horizontal offset for the cover embed/video (e.g. '3%'). Applied on the card. */
  coverOffsetX?: string
  /** Zoom factor for the cover embed on the homepage card (default 1.18). */
  coverCropScale?: number
  /** Anchor the cover embed to the top of the card instead of centring it. */
  coverAlignTop?: boolean
  /** How the cover embed fills the card. 'width' spans the full card width (height by aspect). */
  coverFit?: 'cover' | 'width'
  /** Long-form narrative sections (e.g. My role, Leadership, Result). */
  story?: PortfolioStorySection[]
  highlights: PortfolioHighlight[]
  process: PortfolioProcessStep[]
  team: string[]
  partners?: PortfolioPartner[]
  /** "Super Bowl reactions" collage — layers pop in on top of each other. */
  reactionWall?: ReactionWall
  gallery: PortfolioMediaItem[]
}

/** A single image in a reaction-wall collage, positioned as % of the frame. */
export type ReactionLayer = {
  src: string
  alt: string
  /** Position/size as a percentage of the wall (left, top, width, height). */
  x: number
  y: number
  w: number
  h: number
  /** Resting rotation in degrees for a hand-pinned, scattered look. */
  rotate?: number
}

export type ReactionWall = {
  /** Aspect ratio of the collage frame, e.g. '4491/4177'. */
  aspect: string
  layers: ReactionLayer[]
}

export const portfolioData = {
  person: {
    name: 'Alina Skalkina',
    role: 'Lead Brand Designer',
    heroRole: 'Brand Designer',
    tagline:
      'I shape brand systems that turn complex products into clear, expressive experiences across marketing, identity, and product.',
    intro:
      'B2B Brand Designer by choice, Design Engineer by destiny, and the person asking why this component exists in five different versions.',
    approach:
      'Berlin, Germany',
    email: 'skalkinalina@gmail.com',
    footerTitle: 'Personal Portfolio Website',
    footerYear: '2026',
    heroImage: '/recovered/computer.webp',
    heroImageAlt: 'Recovered hero asset from the original portfolio',
    links: [
      {
        href: 'https://calendly.com/skalkinalina/30min',
        label: 'Schedule a call',
      },
      {
        href: 'https://www.linkedin.com/in/alina-skalkina-852069174',
        label: 'LinkedIn',
      },
      {
        href: '/recovered/Alina-Skalkina-CV-Lead-Brand-Designer.pdf',
        label: 'Download CV',
      },
    ] satisfies PortfolioLink[],
    sitemap: [
      { href: '/#work', label: 'Works' },
      { href: '/#about', label: 'About me' },
      { href: '/#contact', label: 'Contacts' },
    ] satisfies PortfolioLink[],
    stats: [
      { label: 'Experience', value: '6+ years' },
      { label: 'Selected works', value: '7' },
      { label: 'Skill groups', value: '3' },
    ] satisfies PortfolioStat[],
  },
  philosophy: [
    {
      title: 'Context before solution',
      description:
        'Each project starts with the product situation, the user tension, and why the problem mattered to the business.',
    },
    {
      title: 'Problem framing is part of the design work',
      description:
        'I want the case studies to show how the problem was defined, not just how the final screens looked.',
    },
    {
      title: 'Process over performance',
      description:
        'Research, hypotheses, facilitation, and iteration matter more than polished outcome shots on their own.',
    },
    {
      title: 'Constraints and teams stay visible',
      description:
        'The strongest design work is collaborative and shaped by real constraints, so both should stay in the story.',
    },
  ] satisfies PortfolioPrinciple[],
  career: [
    {
      period: '2021 - 2025',
      title: 'Digital Designer, Independent Contractor',
      details: [
        'Founding designer for a booking platform.',
        'Video design for Huawei.',
        'Visual design for LUN.',
        'Market analysis and product strategy for UTC FILM; UI/UX for Malyatko.',
      ],
    },
    {
      period: '2020 - 2021',
      title: 'Product Designer, LUN Misto R&D Team',
      details: [
        'Growth design for LUN Misto Air Map, app, and widgets, contributing to +230% monthly page views.',
        'Hired and mentored junior designers.',
      ],
    },
    {
      period: '2020',
      title: 'Lecture About Design and Frontend Integration',
      details: [
        'Delivered lecture "Moving the button for an hour" at Taras Shevchenko National University of Kyiv.',
      ],
    },
    {
      period: '2020',
      title: 'Visual Designer, LUN Marketing Team',
      details: [
        'Created UI for marketing campaigns.',
        'Designed a B2B CRM dashboard for lead management.',
      ],
    },
    {
      period: '2018 - 2020',
      title: 'Digital Designer, LUN HR Team',
      details: [
        'End-to-end product design for an HR management platform.',
        'Brand identity for a university student coworking hub.',
        'Art direction for corporate events.',
      ],
    },
    {
      period: '2015 - 2019',
      title: 'Taras Shevchenko National University of Kyiv',
      details: [
        'Faculty of Applied Physics, Nanoelectronics, and Computer Technologies.',
      ],
    },
  ] satisfies PortfolioCareerEntry[],
  skills: [
    {
      title: 'UI/UX Design',
      items: [
        'AI enhanced Design workflows',
        'User-centered Design',
        'Data-driven Design',
        'Product Strategy',
        'Atomic Design',
        'Interaction Design',
        'Accessibility',
        'Design Systems',
        'Research',
        'Prototyping',
        'HTML',
        'CSS',
        'React',
      ],
    },
    {
      title: 'Visual Design',
      items: [
        'AI Prototyping',
        '3D Design',
        'Motion Design',
        'Brand Identity',
        'Visual Communication',
        'Data Visualization',
      ],
    },
    {
      title: 'Tools',
      items: [
        'Figma',
        'Sora',
        'ChatGPT',
        'Cursor IDE',
        'Base44',
        'UIzard',
        'Midjouney',
        'WebFlow',
        'Spline 3D',
        'Womp 3D',
        'Cinema 4D',
        'Blender',
        'Adobe Suite',
        'Sketch',
        'Google Analytics',
        'Hotjar',
      ],
    },
  ] satisfies PortfolioSkillGroup[],
  projects: [
    {
      id: 'alty-rebranding',
      title: 'Alty rebranding',
      navigationLabel: 'Alty Rebranding',
      cover: 'framed',
      embedAspect: 'aspect-[1280/737]',
      coverAlignTop: true,
      embedUrl: 'https://player.vimeo.com/video/1205368261?background=1&autopause=0&muted=1&autoplay=1&loop=1&app_id=58479',
      year: '2026',
      businessSize: 'Scale-up',
      audience: 'B2B',
      workType: 'Brand Design',
      categories: [
        'Brand Identity',
        'Design System',
        'Visual Communication',
      ],
      focus:
        'From service provider to transformation partner',
      summary: [
        `Alty was already operating at a mature level: products shaped by the company had reached 60M+ users across 40+ markets, with 50+ clients, a 4.6 average client rating, ISO/IEC 27001 certification, and recognition from Red Dot, iF Design Award, Indigo Design Awards, and industry platforms.`,
        `But the brand had not yet caught up with the company's actual maturity.`,
        `The challenge was to move Alty beyond the perception of a regular outsourcing company or creative agency — and communicate a more accurate role: a digital transformation partner for complex decisions, high stakes, and long-term change in compliance-heavy businesses.`,
      ],
      role: 'Lead Brand Designer, AI-Integrated Workflow Design',
      liveLink: { href: 'https://alty.co', label: 'Try Alty 2.0' },
      highlights: [
        {
          value: '73% → 64%',
          title: 'Bounce rate',
          description: 'Fewer bounces.',
        },
        {
          value: '1.5 → 2.4',
          title: 'Pages / visit',
          description: 'Deeper engagement.',
        },
        {
          value: '0 → 92',
          title: 'GEO score',
          description: 'Agent-Native.',
        },
      ],
      process: [
        {
          title: 'Aligning strategy, execution, and external rebranding',
          description:
            'The website redesign and rebrand were happening at the same time. The challenge was making sure our core vision, the website experience (across UX/UI, visual design, and handoff), and our future growth perfectly matched the new visuals created by our external agency.',
        },
        {
          title: 'Defining the right visual tension',
          description:
            'To make the brand feel mature but not conservative, the challenge was defining two visual identity anchors that created the exact right tension: sharp and alternative, but still mature, structured, and credible.',
        },
        {
          title: 'Building a redesign defence system',
          description:
            'Because the website had to move forward before the identity was finalized, the challenge was creating a scalable foundation built on semantic tokens, adaptive components, and a Figma → Storybook → Claude Code workflow, allowing us to update themes and components without rebuilding the system from scratch.',
        },
        {
          title: 'Fostering systems thinking without limiting creativity',
          description:
            'A big part of the role was mentoring designers in design engineering principles. The challenge was accepting more layout variations than a traditional system allows, giving creativity a reliable structure to reduce repetitive production work without limiting visual experimentation.',
        },
        {
          title: 'Repositioning as a transformation partner',
          description:
            'Alty needed a clearer way to communicate its value. The challenge was shifting the brand perception from a generic outsourcing agency to a transformation partner for complex, high-stakes digital products, which successfully began attracting more relevant client inquiries.',
        },
      ],
      team: [
        'Alina Skalkina, Lead Brand Designer',
        'Kristina Olekh, Marketing Manager',
        'Leonid Goriev, Founder',
        'Mykola Melnyk, Head of Design',
        'Diliara Asanova, UX Director',
        'Maksym Tkhorenko, Frontend Engineer',
        'Dmytro Novikov, UI/UX Designer',
        'Swoon',
      ],
      gallery: [
        // Lead video — pulled into the framed hero, excluded from the grid below.
        {
          src: '/alty/new-products.webm',
          type: 'video',
          alt: 'Alty new products section',
          vimeoId: '1205368261',
        },
        // Exploration pair — two images side by side on lg/xl, stacked below.
        {
          src: '/alty/innovation-exploration.webp',
          type: 'image',
          alt: 'Alty — innovation exploration',
          caption: 'exploration',
          cols: 15,
          aspect: '1/1',
        },
        {
          src: '/alty/architecture-exploration.webp',
          type: 'image',
          alt: 'Alty — architecture exploration',
          caption: 'exploration',
          cols: 15,
          aspect: '1/1',
        },
        // Two videos in one row on lg/xl, stacked below.
        {
          src: '/alty/home.webm',
          type: 'video',
          alt: 'Alty homepage walkthrough',
          cols: 15,
          aspect: '1876/1080',
          vimeoId: '1205368259',
        },
        {
          src: '/alty/cards.webm',
          type: 'video',
          alt: 'Alty cards interaction',
          cols: 15,
          aspect: '1876/1080',
          vimeoId: '1205368260',
        },
        // Slideshow row — three portrait containers crossfading through stills,
        // playground-style, rendered as looping webm.
        {
          src: '/alty/slideshow-1.webm',
          type: 'video',
          alt: 'Alty social concepts slideshow',
          cols: 10,
          aspect: '1080/1350',
        },
        {
          src: '/alty/slideshow-2.webm',
          type: 'video',
          alt: 'Alty social concepts slideshow',
          cols: 10,
          aspect: '1080/1350',
        },
        {
          src: '/alty/slideshow-3.webm',
          type: 'video',
          alt: 'Alty social concepts slideshow',
          cols: 10,
          aspect: '1080/1350',
        },
        // Concepts — centred at the same width as the framed hero (58%).
        {
          src: '/alty/alty-concepts.webp',
          type: 'image',
          alt: 'Alty brand concepts',
          caption: 'alty 2.1 concepts',
          cols: 30,
          frameWidth: '58%',
        },
      ],
    },
    {
      id: 'huawei',
      title: 'Huawei',
      navigationLabel: 'Huawei',
      coverOffsetX: '3%',
      embedUrl:
        'https://player.vimeo.com/video/1204428080?background=1&autopause=0&muted=1&autoplay=1&loop=1&app_id=58479',
      year: '2024',
      company: 'Huawei',
      businessSize: 'Enterprise',
      audience: 'B2B',
      workType: 'Motion Design',
      categories: ['Motion Design', '3D Design', 'Video'],
      focus: 'The hidden infrastructure powering Ukraine’s resilience',
      summary: [
        'When communication is a lifeline, the unseen backbone of the network is everything. We crafted a strategic narrative to show that Huawei is much more than a device manufacturer in Ukraine.',
        'By highlighting 25 years of telecom infrastructure development—which now keeps the country connected under fire—alongside their eco-initiatives and inclusivity programs, we shifted the focus to their role as an essential, resilient partner.',
      ],
      role: 'Motion, Video Design',
      highlights: [],
      process: [],
      team: [
        'Alina Skalkina, Designer',
        'Sofia Sytnik, Creative Lead',
        'Oleksandr Veselov, COO',
        'Oleksandra Lyashenko, Line Producer',
        'Sofia Vorobyova, Creative Copywriter',
      ],
      gallery: [],
    },
    {
      id: 'comfort-map',
      cover: 'framed',
      embedAspect: 'aspect-[1280/878]',
      coverCropScale: 1,
      coverAlignTop: true,
      coverFit: 'width',
      title: 'Comfort Map',
      navigationLabel: 'Comfort Map',
      year: '2021',
      company: 'LUN',
      businessSize: 'Scale-up',
      audience: 'B2B',
      workType: 'Growth Design',
      focus: 'Can apartment hunting build an inclusive city?',
      categories: [
        'Growth Design',
        'UX Research',
        'UI Design',
        'Design System',
        'Product Strategy',
      ],
      summary: [
        'LUN Misto was an urban research lab partnering with Taras Shevchenko National University and government bodies to build open-data infrastructure for the city. One product, the Comfort Map, combined 20 verified urban data layers, including noise, greenery, air quality, school access, kindergarten queues, and price dynamics.',
        'Although the data was rigorous, users felt overwhelmed and left. Research with active apartment seekers in Kyiv revealed the problem: they expected a search tool but entered a research environment.',
        'I facilitated a cross-functional workshop with R&D, marketing, and editorial teams to map the apartment-buying journey and define the map’s role. The key insight was that users were not overwhelmed by the data itself, but by having to interpret it without a clear starting point.',
      ],
      goals:
        'Make a research-grade urban analytics tool useful for someone choosing where to live, without losing the depth that made it credible.',
      role: 'Growth Design, UI/UX, Design System, Product Strategy',
      liveLink: {
        href: 'https://lun.ua/misto',
        label: 'Try it here',
      },
      highlights: [
        {
          value: '+60%',
          title: 'CSAT',
          description:
            'CSAT improved from 20% to 80% after reframing the product entry model.',
        },
        {
          value: '+17%',
          title: 'Conversion Rate',
          description:
            'Conversion increased after adding personalized comfort scoring and street-level context.',
        },
        {
          value: '+230%',
          title: 'Monthly Page Views',
          description:
            'Monthly Page Views grew as the tool became easier to understand and return to.',
        },
        {
          title: 'DOU Award',
          description:
            'Awarded best social IT initiative by Ukraine’s largest IT community for turning urban data into practical, everyday city tools.',
        },
        {
          title: 'National Accessibility & Barrier-Free Initiatives',
          description:
            'Started national urban accessibility initiative with the First Lady Olena Zelenska, Ministry of Culture and Ministry of Regional Development',
        },
        {
          title: 'KNU & Government Collaboration',
          description:
            'Research delivered in collaboration with Taras Shevchenko National University and government bodies, which included the opening of an Urbanist faculty.',
        },
      ],
      process: [
        {
          title: 'Signal vs interpretation',
          description:
            'An 89% bounce rate showed visible friction, but the deeper issue was interpretation: users had no clear frame for turning complex data into a personal decision.',
        },
        {
          title: 'Research and alignment',
          description:
            'Survey work plus Projector Institute interviews with active apartment seekers in Kyiv revealed a mental-model mismatch between expected search behavior and the map experience.',
        },
        {
          title: 'Product decisions',
          description:
            'Three decisions followed: a personalized comfort score as the entry point (with full layers still accessible), street-level search to anchor exploration around known places, and a frosted-glass UI direction to keep precision without a clinical tone.',
        },
        {
          title: 'Outcome framing',
          description:
            'The comfort score did not simplify the data. It translated rigorous research into a personal frame users could act on while preserving credibility and depth.',
        },
      ],
      team: [
        'Alina Skalkina',
        'Anna Denysenko',
        'Serhii Muravjev',
        'Denys Sydilkovsky',
        'PRJCTR students',
        'Sasha Panasyuk',
      ],
      gallery: [
        {
          src: '/recovered/comfort-map-video.webm',
          type: 'video',
          alt: 'Comfort Map walkthrough video',
          span: 'wide',
          vimeoId: '1205293955',
        },
        {
          src: '/recovered/comfort-map/desktop-1.webp',
          type: 'image',
          alt: 'Comfort Map desktop screen 1',
          cols: 15,
          aspect: '1084/743',
          fit: 'contain',
        },
        {
          src: '/recovered/comfort-map/desktop-2.webp',
          type: 'image',
          alt: 'Comfort Map desktop screen 2',
          cols: 15,
          aspect: '1084/743',
          fit: 'contain',
        },
        {
          src: '/recovered/comfort-map/mobile-1.webp',
          type: 'image',
          alt: 'Comfort Map mobile screen 1',
          cols: 10,
          maxVh: 70,
        },
        {
          src: '/recovered/comfort-map/mobile-2.webp',
          type: 'image',
          alt: 'Comfort Map mobile screen 2',
          cols: 10,
          maxVh: 70,
        },
        {
          src: '/recovered/comfort-map/mobile-4.webp',
          type: 'image',
          alt: 'Comfort Map mobile screen 4',
          cols: 10,
          maxVh: 70,
        },
        {
          src: '/recovered/visual-design/1.webm',
          type: 'video',
          alt: 'Comfort Map campaign video 1',
          cols: 15,
          aspect: '16/9',
          vimeoId: '1205294149',
        },
        {
          src: '/recovered/visual-design/3.webm',
          type: 'video',
          alt: 'Comfort Map campaign video 2',
          cols: 15,
          aspect: '16/9',
          vimeoId: '1205294148',
        },
      ],
    },
    {
      id: 'air-quality-map',
      title: 'Air quality map',
      navigationLabel: 'Air quality map',
      year: '2020',
      company: 'LUN',
      businessSize: 'Scale-up',
      audience: 'B2C',
      workType: 'Growth Design',
      focus: 'Turn invisible air data into visible action',
      categories: [
        'Growth Design',
        '3D Design',
        'UI/UX Design',
        'Mobile Design',
        'Widget Design',
      ],
      summary: [
        'LUN Misto Air was built to make real-time air-quality data legible for everyday residents across web, widgets, and mobile surfaces.',
        'The design problem was to translate a technical, invisible issue into something people could understand fast enough to act on in daily life.',
      ],
      goals:
        'The redesign had to grow acquisition and engagement across responsive web and widgets while raising awareness about air pollution.',
      role: 'Growth Design, UI/UX Design, 3D Design',
      liveLink: {
        href: 'https://lun.ua/misto/air-about_en',
        label: 'Try it here',
      },
      highlights: [
        {
          value: '+130%',
          title: 'Monthly Active Users',
          description:
            'Adapted product for rapid network expansion for air quality sensors, covering 20+ biggest cities in Ukraine.',
        },
        {
          value: '-12%',
          title: 'In Bounce Rate',
          description:
            '5k active users on IOS widget, 4 stars rating in App Store, offline notification system in case of poor air quality.',
        },
        {
          value: '+17%',
          title: 'In return visits',
          description:
            'Return visits increased as the product became easier to read across map, widget, and mobile contexts.',
        },
      ],
      process: [
        {
          title: 'Translating invisible data into instant guidance',
          description:
            'Kyiv ranked first globally for air pollution in 2020, so the challenge was turning raw AQI metrics into fast, understandable guidance people could act on at a glance.',
        },
        {
          title: 'Scaling a real-time sensor network',
          description:
            'Growing a live sensor network from Kyiv to 20+ cities while keeping the readings legible across map, widget, and mobile contexts.',
        },
        {
          title: 'Designing for behaviour change',
          description:
            'Building mascot-based guidance, color-coded tips, and AQI-literacy onboarding — plus privacy-safe location handling and offline alerts for high pollution.',
        },
      ],
      team: [
        'Alina Skalkina, Designer',
        'Anna Denysenko, Project Curator',
        'Oleksandr Rak, Urban Data Analyst',
        'Serhii Muravjev, software engineer',
        'Denys Sydilkovsky, CMO',
        'Sasha Panasyuk, PR & Communications',
        'Andriy Mima, Co-Founder',
        'Vyacheslav Boretskij, KNU Associate Professor',
        'Alexander Zagaria, Hardware engineer',
        'Andrii Antonenko, Hardware engineer',
      ],
      gallery: [
        {
          src: '/recovered/visual-design/5.webp',
          type: 'image',
          alt: 'LUN Misto city dashboard with air quality, traffic and weather',
          span: 'wide',
          frameWidth: '70%',
        },
        {
          src: '/recovered/air-video.webm',
          type: 'video',
          alt: 'Air Quality Map walkthrough video',
          span: 'wide',
          vimeoId: '1205293956',
        },
        {
          src: '/recovered/lun-misto-air/jpg/map-1.webp',
          type: 'image',
          alt: 'Air Quality map interface 1',
          cols: 6,
        },
        {
          src: '/recovered/lun-misto-air/jpg/map-2.webp',
          type: 'image',
          alt: 'Air Quality map interface 2',
          cols: 6,
        },
        {
          src: '/recovered/lun-misto-air/jpg/map-3.webp',
          type: 'image',
          alt: 'Air Quality map interface 3',
          cols: 6,
        },
        {
          src: '/recovered/lun-misto-air/jpg/map-4.webp',
          type: 'image',
          alt: 'Air Quality map interface 4',
          cols: 6,
        },
        {
          src: '/recovered/lun-misto-air/jpg/map-5.webp',
          type: 'image',
          alt: 'Air Quality map interface 5',
          cols: 6,
        },
        {
          src: '/recovered/lun-misto-air/jpg/watch.webp',
          type: 'image',
          alt: 'Air Quality watch widget',
          cols: 10,
        },
        {
          src: '/recovered/lun-misto-air/jpg/widget-watches-2.webp',
          type: 'image',
          alt: 'Air Quality watch widgets',
          cols: 10,
        },
        {
          src: '/recovered/lun-misto-air/jpg/widget-chrome.webp',
          type: 'image',
          alt: 'Air Quality Chrome widget',
          cols: 10,
        },
      ],
    },
    {
      id: 'lunie',
      cover: 'framed',
      embedAspect: 'aspect-[1395/907]',
      title: 'LUN HR System',
      navigationLabel: 'LUN HR System',
      year: '2018',
      company: 'LUN',
      businessSize: 'Scale-up',
      audience: 'B2B',
      workType: 'Product Design',
      focus:
        'Reducing operational load with a custom HR OS',
      categories: ['Product Design', 'E2E', 'Design System'],
      summary: [
        'Lunie was an internal HR management system for LUN, a fast-scaling proptech company operating across multiple brands and countries.',
        'The product had to support different permissions, workflows, and interdependent roles without turning HR operations into more friction for employees or the people team.',
      ],
      goals:
        'LUN needed an end-to-end HR system that could scale with hiring, role complexity, and multi-user workflows across the company.',
      role: 'UI/UX design, Design system, Mascot development',
      highlights: [
        {
          title: 'Day-off bookings',
          description:
            'Employees can request vacation, days off, education leave, business trips, and sick leave.',
        },
        {
          title: 'Email manager',
          description:
            'Recruitment flow with templates for candidate communication and offers.',
        },
        {
          title: 'Payroll processing',
          description:
            'Direct exports for accountants, reducing manual errors and processing time.',
        },
        {
          title: 'Multi-user workflow',
          description:
            'Scheduling logic for interdependent roles to coordinate time off.',
        },
        {
          title: 'Access levels',
          description:
            'Role-based permissions improved security and made workflows clearer for each function.',
        },
      ],
      process: [],
      team: [
        'Alina Skalkina, Product Designer',
        'Andrii Stavinsky, Full Stack Developer',
        'Iryna Platonova, Chief People Officer',
      ],
      gallery: [
        {
          src: '/recovered/lunie.webm',
          type: 'video',
          alt: 'Lunie walkthrough video',
          span: 'wide',
          vimeoId: '1205293953',
        },
        {
          src: '/recovered/lunie/1.webp',
          type: 'image',
          alt: 'LUN HR System screen 1',
          cols: 10,
          aspect: '1395/907',
          fit: 'contain',
        },
        {
          src: '/recovered/lunie/2.webp',
          type: 'image',
          alt: 'LUN HR System screen 2',
          cols: 10,
          aspect: '1395/907',
          fit: 'contain',
        },
        {
          src: '/recovered/lunie/3.webp',
          type: 'image',
          alt: 'LUN HR System screen 3',
          cols: 10,
          aspect: '1395/907',
          fit: 'contain',
        },
        {
          src: '/recovered/lunie/4.webp',
          type: 'image',
          alt: 'LUN HR System screen 4',
          cols: 10,
          aspect: '1395/907',
          fit: 'contain',
        },
        {
          src: '/recovered/lunie/5.webp',
          type: 'image',
          alt: 'LUN HR System screen 5',
          cols: 10,
          aspect: '1395/907',
          fit: 'contain',
        },
        {
          src: '/recovered/lunie/6.webp',
          type: 'image',
          alt: 'LUN HR System screen 6',
          cols: 10,
          aspect: '1395/907',
          fit: 'contain',
        },
        {
          src: '/recovered/lunie/mobile-1.webp',
          type: 'image',
          alt: 'LUN HR System mobile screen 1',
          cols: 6,
          aspect: '333/719',
          fit: 'contain',
        },
        {
          src: '/recovered/lunie/mobile-2.webp',
          type: 'image',
          alt: 'LUN HR System mobile screen 2',
          cols: 6,
          aspect: '333/719',
          fit: 'contain',
        },
        {
          src: '/recovered/lunie/mobile-3.webp',
          type: 'image',
          alt: 'LUN HR System mobile screen 3',
          cols: 6,
          aspect: '333/719',
          fit: 'contain',
        },
        {
          src: '/recovered/lunie/mobile-4.webp',
          type: 'image',
          alt: 'LUN HR System mobile screen 4',
          cols: 6,
          aspect: '333/719',
          fit: 'contain',
        },
        {
          src: '/recovered/lunie/mobile-5.webp',
          type: 'image',
          alt: 'LUN HR System mobile screen 5',
          cols: 6,
          aspect: '333/719',
          fit: 'contain',
        },
      ],
    },
    {
      id: 'lun-hr-brand',
      title: 'LUN HR Brand',
      navigationLabel: 'LUN HR Brand',
      year: '2019',
      company: 'LUN',
      coverSrc: '/recovered/lun-hr-brand/lunoteka-sticker.webp',
      // LUN 10 anniversary film — full-bleed background hero.
      embedUrl:
        'https://player.vimeo.com/video/1205441585?background=1&autopause=0&muted=1&autoplay=1&loop=1&app_id=58479',
      businessSize: 'Scale-up',
      audience: 'B2B',
      workType: 'Brand Design',
      focus: 'The hiring game that built a community',
      categories: [
        'Marketing Design',
        'Events Art Direction',
        'Employer Branding',
        'Campaign Design',
        'HR Brand',
      ],
      summary: [
        'LUN already had a mythic, research-lab reputation among Kyiv’s tech universities and 86% brand awareness. We didn’t need standard recruitment ads to get more applications; we needed a filter to attract genuinely curious, technically exceptional people.',
        'We made our internal culture public by developing a multi-level hiring game, building physical spaces for the tech community to gather, and working directly with academia to build the next generation of innovators.',
      ],
      goals:
        'Design a recruitment campaign that functions as a filter for curiosity and technical excellence, turning the hiring process itself into the brand statement.',
      role: 'Marketing Design',
      highlights: [
        {
          value: '1M+',
          title: 'Global coding game attempts',
          description:
            'Viral metro banners linked to an online game. Beating every level unlocked our weekly parties.',
        },
        {
          value: '86% → 99%',
          title: 'Target recognition',
          description:
            'Successfully reached the entire target engineering community without relying on standard corporate job ads.',
        },
        {
          title: 'Lunoteka and Chytalka IT Hubs',
          description:
            'Built two IT hubs on KNU campus, creating physical spaces that helped the local tech scene to connect and thrive.',
        },
      ],
      process: [
        {
          title: 'Building a gamified hiring funnel',
          description:
            'Developing a custom, multi-level web game to filter out casual applicants and attract only those driven by pure curiosity.',
        },
        {
          title: 'A/B testing the physical world',
          description:
            "Placing raw code on physical metro banners to act as entry links to the game, allowing us to A/B test the HR brand's geo-efficiency across different stations.",
        },
        {
          title: 'Managing accidental viral scale',
          description:
            'Keeping servers running and mobilizing our SMM team and colleagues to field a massive flood of game inquiries when a local Kyiv ad test unexpectedly exploded globally with over one million attempts.',
        },
        {
          title: 'Turning company culture into a physical community',
          description:
            'Designing and building two major IT hubs and hosting events to give the Ukrainian tech industry actual physical spaces to gather outside of work.',
        },
        {
          title: 'Integrating with traditional academia',
          description:
            'Navigating the heavy bureaucracy of a traditional institution (KNU University) to fundamentally change their curriculum and successfully open a brand-new Urbanist faculty.',
        },
      ],
      team: [
        'Alina Skalkina, Marketing Design',
        'Iryna Platonova, Chief People Officer',
        'Stas Sklyarovsky, CTO',
        'Volodymyr Kybitsky, AI Team',
        'Dmytro Satanovsky, AI Team',
        'Maksym Dolynchuk, Engineer',
      ],
      reactionWall: {
        aspect: '4491/4177',
        layers: [
          {
            src: '/recovered/lun-hr-brand/reactions/reaction-1.webp',
            alt: 'LUN Game press coverage',
            x: 43.84,
            y: 0,
            w: 30.06,
            h: 31.69,
            rotate: -3,
          },
          {
            src: '/recovered/lun-hr-brand/reactions/reaction-2.webp',
            alt: 'LUN Game shared on iOS',
            x: 0,
            y: 13.68,
            w: 24.05,
            h: 45.99,
            rotate: 2,
          },
          {
            src: '/recovered/lun-hr-brand/reactions/reaction-3.webp',
            alt: 'LUN Game landing screen',
            x: 2.67,
            y: 2.82,
            w: 39.28,
            h: 19.58,
            rotate: -2,
          },
          {
            src: '/recovered/lun-hr-brand/reactions/reaction-4.webp',
            alt: 'LUN Game reaction screenshot',
            x: 52.13,
            y: 34.89,
            w: 32.69,
            h: 25.45,
            rotate: 3,
          },
          {
            src: '/recovered/lun-hr-brand/reactions/reaction-5.webp',
            alt: 'LUN Game shared on iOS',
            x: 2.12,
            y: 67.27,
            w: 27.66,
            h: 26.38,
            rotate: -4,
          },
          {
            src: '/recovered/lun-hr-brand/reactions/reaction-6.webp',
            alt: 'LUN Game reaction screenshot',
            x: 75.8,
            y: 5.17,
            w: 24.2,
            h: 32.05,
            rotate: 4,
          },
          {
            src: '/recovered/lun-hr-brand/reactions/reaction-7.webp',
            alt: 'LUN Game Instagram story reaction',
            x: 77.0,
            y: 45.73,
            w: 24.05,
            h: 49.56,
            rotate: 2,
          },
          {
            src: '/recovered/lun-hr-brand/reactions/reaction-8.webp',
            alt: 'LUN Game Instagram story reaction',
            x: 25.94,
            y: 25.23,
            w: 24.05,
            h: 49.56,
            rotate: -3,
          },
          {
            src: '/recovered/lun-hr-brand/reactions/reaction-9.webp',
            alt: 'LUN Game reaction screenshot',
            x: 42.8,
            y: 66.6,
            w: 32.16,
            h: 24.57,
            rotate: 3,
          },
        ],
      },
      gallery: [
        {
          src: '/recovered/lun-hr-brand/lunoteka-sticker.webp',
          type: 'image',
          alt: 'Lunoteka laptop sticker',
          colSpan: 12,
        },
        {
          src: '/recovered/lun-hr-brand/metro.webp',
          type: 'image',
          alt: 'LUN Game code puzzle on a Kyiv metro banner',
          colSpan: 6,
          objectPosition: 'center',
        },
        {
          src: '/recovered/lun-hr-brand/404.webp',
          type: 'image',
          alt: 'LUN Game challenge screen — 404 task not found',
          colSpan: 6,
        },
        {
          src: '/recovered/lun-hr-brand/educational-hub-3.webp',
          type: 'image',
          alt: 'LUN HR community event at the Educational Hub',
          colSpan: 4,
        },
        {
          src: '/recovered/lun-hr-brand/educational-hub-2.webp',
          type: 'image',
          alt: 'Educational hub at Taras Shevchenko University, interior',
          colSpan: 4,
        },
        {
          src: '/recovered/lun-hr-brand/lunoteka-space.webp',
          type: 'image',
          alt: 'Lunoteka lounge and bookshelves',
          colSpan: 4,
        },
        // Branded merch — one container, slideshow like the playground grid.
        {
          src: '/recovered/lun-hr-brand/t-shirt.webp',
          type: 'image',
          alt: 'LUN HR brand merch',
          colSpan: 4,
          aspect: '1/1',
          slides: [
            '/recovered/lun-hr-brand/merch-hackathon.webp',
            '/recovered/lun-hr-brand/merch-tote.webp',
            '/recovered/lun-hr-brand/merch-mug.webp',
            '/recovered/lun-hr-brand/merch-stickers.webp',
            '/recovered/lun-hr-brand/shoppers.webp',
          ],
        },
        // Ficha the mascot — slideshow.
        {
          src: '/recovered/lun-hr-brand/ficha-on-tv.webp',
          type: 'image',
          alt: 'Ficha the LUN mascot on TV',
          colSpan: 4,
          aspect: '1/1',
          slides: ['/recovered/lun-hr-brand/ficha-birthday.webp'],
        },
        // Office & environmental branding — slideshow.
        {
          src: '/recovered/lun-hr-brand/office-create.webp',
          type: 'image',
          alt: 'LUN office wall — “Hello, stranger! these fellows create.lun.ua”',
          colSpan: 4,
          aspect: '1/1',
          slides: [
            '/recovered/lun-hr-brand/office-fly-me.webp',
            '/recovered/lun-hr-brand/anya-box.webp',
          ],
        },
        {
          src: '/recovered/lun-hr-brand/business-cards.webp',
          type: 'image',
          alt: 'LUN Misto business cards',
          colSpan: 6,
        },
        {
          src: '/recovered/lun-hr-brand/lunoteka-award.webp',
          type: 'image',
          alt: 'Lunoteka award moment',
          colSpan: 6,
        },
        {
          src: '/recovered/lun-hr-brand/frame-25.webp',
          type: 'image',
          alt: 'LUN team group hug at a summer open party',
          colSpan: 4,
          aspect: '1/1',
        },
        {
          src: '/recovered/lun-hr-brand/frame-26.webp',
          type: 'image',
          alt: 'LUN themed party — costumed guests at the dragon set',
          colSpan: 4,
          aspect: '1/1',
        },
        {
          src: '/recovered/lun-hr-brand/team-mem.webp',
          type: 'image',
          alt: 'LUN team as social platforms — LinkedIn, Facebook, Instagram, Tinder meme',
          colSpan: 4,
          aspect: '1/1',
        },
        {
          src: '/recovered/lun-hr-brand/team-lun.webm',
          type: 'video',
          alt: 'LUN team motion reel',
          vimeoId: '1205440887',
          colSpan: 6,
          aspect: '16/9',
          fit: 'cover',
          // Zoom past the black side bars baked into the recording and anchor
          // the top so the page nav stays in frame.
          cropScale: 1.12,
          cropAlignTop: true,
        },
        {
          src: '/recovered/lun-hr-brand/invitation.webm',
          type: 'video',
          alt: 'LUN event invitation animation',
          vimeoId: '1205440886',
          colSpan: 6,
          aspect: '16/9',
          fit: 'cover',
          // Zoom past the black bars baked into the recording and anchor the top.
          cropScale: 1.12,
          cropAlignTop: true,
        },
      ],
    },
    {
      id: 'farba',
      cover: 'framed',
      coverCropScale: 1.77,
      coverAlignTop: true,
      heroBg: 'linear-gradient(to bottom, #f8fafb, #ebedf0)',
      title: 'Farba booking platform',
      navigationLabel: 'Farba',
      year: '2025',
      company: 'Farba',
      businessSize: 'Startup',
      audience: 'B2B',
      workType: 'Design System',
      focus: 'Can strict architecture unlock infinite creativity?',
      categories: [
        'Design System',
        'Product Strategy',
        'Marketing Product',
        'AI Workflow Design',
      ],
      summary: [
        'Farba began as a science-lab style experiment after years of seeing themable systems blocked by technical debt and business constraints.',
        'The goal was to prove a different model: a system that does not restrict creativity, but is still stable and low-maintenance over time.',
        'Two breakthroughs changed the equation: OKLCH for reliable accessible palette generation, and AI-assisted implementation loops after architecture was established.',
      ],
      goals:
        'Create a one-color input system where users can assemble marketing pages from templates and components while the platform guarantees coherent, accessible color and typography decisions.',
      role: 'Design System Architecture, Product Design, AI-Integrated Workflow Design',
      highlights: [
        {
          title: 'One input, full palette',
          description:
            'From a single chosen color, the system derives an accessible, visually coherent ramp for accents, text, hover states, and surfaces.',
        },
        {
          title: 'Built on OKLCH',
          description:
            'Color logic is mathematically grounded and practical for real products, reducing manual contrast checks and palette guesswork.',
        },
        {
          title: 'AI-assisted shipping loop',
          description:
            'After architecture, new feature work shifted from mockup-heavy cycles to supervised prompt-and-validate implementation.',
        },
      ],
      process: [
        {
          title: 'System as Creative Environment',
          description:
            'Farba was an R&D bet on a flexible, maintainable theming system. We prioritized core architecture first so future growth relies on durable rules, not ad-hoc hacks.',
        },
        {
          title: 'OKLCH Color Engine',
          description:
            'OKLCH enabled generation of complete accessible palettes from one source color, keeping outputs both perceptually coherent and WCAG-conscious across contexts.',
        },
        {
          title: 'AI-Integrated Build Loop',
          description:
            'Once architecture stabilized, feature delivery became significantly faster: define intent, generate under developer supervision, evaluate solution quality, iterate.',
        },
      ],
      team: [
        'Alina Skalkina, Founding Designer',
        'Maksym Dolynchuk, CTO',
        'ay_seed',
        'Viki Berg',
      ],
      gallery: [
        {
          src: '/farba/Farba-booking.webm',
          type: 'video',
          alt: 'Farba booking flow',
          fit: 'contain',
          vimeoId: '1204610863',
        },
        {
          src: '/farba/onboarding.webp',
          type: 'image',
          alt: 'Farba onboarding screens',
          cols: 15,
          aspect: '3048/1976',
        },
        {
          src: '/farba/editors.webp',
          type: 'image',
          alt: 'Farba profile and field editors',
          cols: 15,
          aspect: '3048/1976',
        },
        {
          src: '/farba/management.webp',
          type: 'image',
          alt: 'Farba service and schedule management',
          cols: 15,
          aspect: '3048/1976',
        },
        {
          src: '/farba/dialogs.webp',
          type: 'image',
          alt: 'Farba dialogs and modals',
          cols: 15,
          aspect: '3048/1976',
        },
        {
          src: '/farba/farba-demo.webm',
          type: 'video',
          alt: 'Farba booking app walkthrough',
          center: true,
          cropScale: 1.16,
          cropAlignTop: true,
          vimeoId: '1205383073',
        },
      ],
    },
    {
      id: 'my-playground',
      title: 'My playground',
      navigationLabel: 'My playground',
      year: 'Since 2018',
      businessSize: 'Personal',
      workType: 'Visual Design',
      hideLabels: true,
      embedUrl: 'https://player.vimeo.com/video/1205293954?background=1&autopause=0&muted=1&autoplay=1&loop=1&app_id=58479',
      coverSrc: '/recovered/graphic-design/graphic-design.webm',
      noHero: true,
      playgroundGrid: true,
      focus: 'Design moves fast, so I keep playing',
      categories: [
        'Brand Identity',
        'Typography',
        '3D Design',
        'Motion Design',
      ],
      summary: [],
      highlights: [],
      process: [],
      team: [],
      gallery: [
        // Row 1
        {
          type: 'image',
          src: '/recovered/graphic-design/A-0.webp',
          alt: 'Letter A explorations',
          slides: [
            '/recovered/graphic-design/A-1.webp',
            '/recovered/graphic-design/A-2.webp',
            '/recovered/graphic-design/A-3.webp',
          ],
        },
        {
          type: 'image',
          src: '/recovered/graphic-design/I-0.webp',
          alt: 'Letter I explorations',
          slides: [
            '/recovered/graphic-design/I-1.webp',
            '/recovered/graphic-design/I-2.webp',
            '/recovered/graphic-design/I-3.webp',
          ],
        },
        {
          type: 'image',
          src: '/recovered/graphic-design/L-0.webp',
          alt: 'Letter L design',
        },
        // Row 2
        {
          type: 'image',
          src: '/recovered/graphic-design/B-3.webp',
          alt: 'Letter B explorations',
          slides: [
            '/recovered/graphic-design/B-4.webp',
            '/recovered/graphic-design/B-5.webp',
          ],
        },
        {
          type: 'image',
          src: '/recovered/graphic-design/abstract.webp',
          alt: 'Abstract graphic composition',
        },
        {
          type: 'image',
          src: '/recovered/graphic-design/D-0.webp',
          alt: 'Letter D explorations',
          slides: [
            '/recovered/graphic-design/D-1.webp',
            '/recovered/graphic-design/D-2.webp',
          ],
        },
        // Row 3
        {
          type: 'image',
          src: '/recovered/graphic-design/G-1.webp',
          alt: 'Letter G explorations',
          slides: ['/recovered/graphic-design/G-2.webp'],
        },
        {
          type: 'image',
          src: '/recovered/graphic-design/K-0.webp',
          alt: 'Letter K explorations',
          slides: ['/recovered/graphic-design/K-1.webp'],
        },
        {
          type: 'image',
          src: '/recovered/graphic-design/Lun-3.webp',
          alt: 'LUN campaign assets',
          slides: [
            '/recovered/graphic-design/Lun-5.webp',
            '/recovered/graphic-design/Lun-6.webp',
          ],
        },
        // Row 4
        {
          type: 'video',
          src: '/recovered/graphic-design/house2.webm',
          alt: '3D apartment tour walkthrough',
        },
        {
          type: 'image',
          src: '/recovered/graphic-design/Lun-4.webp',
          alt: 'LUN branded sticker set',
        },
        {
          type: 'image',
          src: '/recovered/graphic-design/spilka-1.webp',
          alt: 'Spilka brand identity',
          slides: ['/recovered/graphic-design/spilka-2.webp'],
        },
        // Row 5
        {
          type: 'image',
          src: '/recovered/graphic-design/lun-data-visual.webp',
          alt: 'LUN data visualisation',
        },
        {
          type: 'image',
          src: '/recovered/graphic-design/Lun-redesign.webp',
          alt: 'LUN "Try 3D buildings on the map" campaign',
        },
        {
          type: 'image',
          src: '/recovered/graphic-design/bachelor.webp',
          alt: 'Bachelor dinner poster',
        },
        // Row 6
        {
          type: 'video',
          src: '',
          vimeoId: '1205441064',
          alt: 'Playground motion exploration',
        },
        {
          type: 'video',
          src: '',
          vimeoId: '1205441065',
          alt: 'Playground motion exploration',
        },
      ],
    },
  ] satisfies PortfolioProject[],
}

export function getProjectById(id: PortfolioProject['id']) {
  const project = portfolioData.projects.find((item) => item.id === id)

  if (!project) {
    throw new Error(`Project "${id}" not found`)
  }

  return project
}

function getYearMarkers(yearLabel: string) {
  const years = yearLabel.match(/\d{4}/g)
  if (!years?.length) {
    return { latest: 0, earliest: 0 }
  }

  const values = years.map((value) => Number(value))
  return {
    latest: Math.max(...values),
    earliest: Math.min(...values),
  }
}

export function getProjectsNewestFirst(): PortfolioProject[] {
  return [...portfolioData.projects].sort((a, b) => {
    const markerA = getYearMarkers(a.year)
    const markerB = getYearMarkers(b.year)

    if (markerB.latest !== markerA.latest) {
      return markerB.latest - markerA.latest
    }

    return markerB.earliest - markerA.earliest
  })
}
