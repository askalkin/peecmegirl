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
}

export type PortfolioProject = {
  id: string
  title: string
  navigationLabel: string
  year: string
  categories: string[]
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
  highlights: PortfolioHighlight[]
  process: PortfolioProcessStep[]
  team: string[]
  partners?: PortfolioPartner[]
  gallery: PortfolioMediaItem[]
}

export const portfolioData = {
  person: {
    name: 'Alina Skalkina',
    role: 'Lead Brand Product Designer',
    heroRole: 'Brand Designer',
    tagline:
      'I shape brand systems that turn complex products into clear, expressive experiences across marketing, identity, and product.',
    intro:
      'Lead Brand Product Designer with experience across marketing, product, and brand systems. Focused on turning complex workflows into clear, usable experiences.',
    approach:
      'Berlin, Germany',
    email: 'skalkinalina@gmail.com',
    footerTitle: 'Personal Portfolio Website',
    footerYear: '2026',
    heroImage: '/recovered/computer.png',
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
        href: '/cv',
        label: 'View Current CV',
      },
    ] satisfies PortfolioLink[],
    sitemap: [
      { href: '/#work', label: 'works' },
      { href: '/#about', label: 'about me' },
      { href: '/#contact', label: 'contacts' },
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
      title: 'Alty Rebranding',
      navigationLabel: 'Alty Rebranding',
      year: '2026',
      businessSize: 'Startup',
      workType: 'Brand Design',
      categories: [
        'Brand Identity',
        'Design System',
        'Visual Communication',
      ],
      focus:
        'How do you give a B2B product company a brand that scales across teams without losing coherence?',
      summary: [
        'Led a team of designers in rebuilding Alty\'s B2B brand from the identity foundations up.',
        'Engineered a token-based design-system architecture so the brand stays coherent as the company and its surfaces scale.',
      ],
      goals:
        'Establish a scalable, token-driven brand identity that works across product, marketing, and B2B communication.',
      role: 'Lead Brand Product Designer',
      highlights: [],
      process: [],
      team: ['Alina Skalkina, Lead Brand Product Designer'],
      gallery: [],
    },
    {
      id: 'alty-website',
      title: 'Alty Website',
      navigationLabel: 'Alty Website',
      year: '2026',
      businessSize: 'Startup',
      workType: 'Web Design',
      categories: ['Web Design', 'UI/UX Design', 'Brand'],
      focus:
        'Translating the rebrand into a living website that feels like the brand in motion.',
      summary: [
        'Designed the Alty marketing website as the first full expression of the new brand system.',
        'Carried the token-based design system into responsive web layouts, components, and content patterns.',
      ],
      goals:
        'Ship a brand-accurate, maintainable website that marketing can extend without breaking coherence.',
      role: 'Lead Brand Product Designer',
      highlights: [],
      process: [],
      team: ['Alina Skalkina, Lead Brand Product Designer'],
      gallery: [],
    },
    {
      id: 'ar-apartment-tour',
      title: 'AR Apartment Tour',
      navigationLabel: 'AR Apartment Tour',
      year: '2026',
      company: 'Alty',
      businessSize: 'Startup',
      workType: 'Product Design',
      categories: ['AR / 3D', 'Product Design', 'Proptech'],
      focus: 'A walkable apartment tour, before it exists.',
      summary: [
        'I led the 3D visual prototyping for a new B2B2C apartment tour feature. Partnering with an external vendor and our internal engineering team, I established the visual standards for the 3D environments. I collaborated with our Head of AI on core 3D mechanics, bridging the gap between design and technical execution.',
        'Because the platform served millions of end-users, performance was a critical business requirement. I focused heavily on optimizing the 3D assets, ensuring we delivered a high-end, reliable product for our B2B clients that performed flawlessly at scale and helped them reflect a premium brand experience.',
      ],
      role: 'Product Design, 3D / AR',
      highlights: [],
      process: [],
      team: ['Alina Skalkina, Product Designer'],
      gallery: [],
    },
    {
      id: 'huawei',
      title: 'Huawei',
      navigationLabel: 'Huawei',
      year: '2023',
      company: 'Huawei',
      businessSize: 'Enterprise',
      workType: 'Motion Design',
      categories: ['Motion Design', '3D Design', 'Video'],
      focus: 'The hidden infrastructure powering Ukraine’s resilience.',
      summary: [
        'When communication is a lifeline, the unseen backbone of the network is everything. We crafted a strategic narrative to show that Huawei is much more than a device manufacturer in Ukraine.',
        'By highlighting 25 years of telecom infrastructure development—which now keeps the country connected under fire—alongside their eco-initiatives and inclusivity programs, we shifted the focus to their role as an essential, resilient partner.',
      ],
      role: 'Motion / Video Design',
      highlights: [],
      process: [],
      team: ['Alina Skalkina, Motion Designer'],
      gallery: [],
    },
    {
      id: 'design-engineering-course',
      title: 'Design Engineering Course',
      navigationLabel: 'Design Engineering Course',
      year: '2025',
      businessSize: 'Education',
      workType: 'Design Engineering',
      categories: [
        'Design Engineering',
        'Education',
        'Design Systems',
        'AI Workflows',
      ],
      focus:
        'How do you teach designers to think and build like engineers, and ship real, coherent interfaces?',
      summary: [
        'A course that bridges design and engineering, taking designers from Figma to working, maintainable front-end.',
        'Built around real workflows: design tokens, component thinking, design systems, and AI-assisted implementation loops.',
      ],
      goals:
        'Help designers ship production-ready interfaces and collaborate fluently with engineering.',
      role: 'Curriculum Design, Teaching',
      highlights: [],
      process: [],
      team: ['Alina Skalkina, Author and Instructor'],
      gallery: [],
    },
    {
      id: 'lun-assets',
      title: 'LUN Assets',
      navigationLabel: 'LUN Assets',
      year: '2020',
      businessSize: 'Scale-up',
      workType: 'Marketing Design',
      categories: [
        'Marketing Design',
        'Brand Assets',
        'Social Media',
        'Illustration',
      ],
      focus:
        'A growing library of campaign assets that kept LUN recognisable across every channel.',
      summary: [
        'A collection of marketing and brand assets made for LUN across social media, print, and merch.',
        'Built to stay coherent and on‑brand while moving fast across many channels and campaigns.',
      ],
      role: 'Marketing Design, Illustration',
      highlights: [],
      process: [],
      team: ['Alina Skalkina, Marketing Designer'],
      gallery: [
        {
          src: '/recovered/graphic-design/Lun-redesign.jpg',
          type: 'image',
          alt: 'LUN "Try 3D buildings on the map" campaign asset',
          span: 'wide',
        },
        {
          src: '/recovered/graphic-design/Lun-5.jpg',
          type: 'image',
          alt: 'LUN illustrated social campaign asset',
        },
        {
          src: '/recovered/graphic-design/Lun-4.jpg',
          type: 'image',
          alt: 'LUN branded sticker set',
        },
      ],
    },
    {
      id: 'comfort-map',
      title: 'Comfort Map',
      navigationLabel: 'Comfort Map',
      year: '2021',
      company: 'LUN',
      businessSize: 'Enterprise',
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
        'LUN Misto was an urban research lab working with Taras Shevchenko National University and government bodies to build open-data infrastructure for the city.',
        'The Comfort Map was one product of that: 20 layers of verified urban data covering noise, greenery, air quality, school access, kindergarten queues, price dynamics, and more.',
        'The data was rigorous, but users got overwhelmed and left. The issue was not data quality. The product had not clearly decided what kind of tool it was.',
        'Survey work and interviews with active apartment seekers in Kyiv showed a mental-model mismatch: users arrived expecting a search tool and found a research environment.',
        'I facilitated a cross-functional workshop with R&D, marketing, and editorial teams to map the full apartment-buying journey and identify where the map should fit.',
        'The key insight: users were not overwhelmed by the data itself, but by being asked to interpret it without a clear starting point.',
      ],
      goals:
        'Make a research-grade urban analytics tool useful for someone choosing where to live, without losing the depth that made it credible.',
      role: 'Growth Design, UI/UX, Design System, Product Strategy',
      liveLink: {
        href: 'https://lun.ua/misto',
        label: 'lun.ua/misto',
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
          title: 'Conversion rate',
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
            "Best social IT initiative by Ukraine's largest IT community.",
        },
        {
          title: 'First Lady initiative',
          description:
            'Adopted by Olena Zelenska\'s "Business without Barriers"; LUN signed the national accessibility declaration.',
        },
        {
          title: 'Ministry of Culture',
          description:
            'Co-launched a nationwide accessibility audit for theatres, museums, and libraries with a dedicated map layer built without public funding.',
        },
        {
          title: 'National technology partner',
          description:
            "Official technology partner of the Ministry of Regional Development's barrier-free environment program.",
        },
        {
          title: 'KNU & government',
          description:
            'Research delivered in collaboration with Taras Shevchenko National University and government bodies.',
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
          src: '/recovered/comfort-map-video.mp4',
          type: 'video',
          alt: 'Comfort Map walkthrough video',
          span: 'wide',
        },
        {
          src: '/recovered/comfort-map/desktop-1.png',
          type: 'image',
          alt: 'Comfort Map desktop screen 1',
          span: 'wide',
        },
        {
          src: '/recovered/comfort-map/desktop-2.png',
          type: 'image',
          alt: 'Comfort Map desktop screen 2',
          span: 'wide',
        },
        {
          src: '/recovered/comfort-map/mobile-1.png',
          type: 'image',
          alt: 'Comfort Map mobile screen 1',
        },
        {
          src: '/recovered/comfort-map/mobile-2.png',
          type: 'image',
          alt: 'Comfort Map mobile screen 2',
        },
        {
          src: '/recovered/comfort-map/mobile-3.png',
          type: 'image',
          alt: 'Comfort Map mobile screen 3',
        },
        {
          src: '/recovered/comfort-map/mobile-4.png',
          type: 'image',
          alt: 'Comfort Map mobile screen 4',
        },
        {
          src: '/recovered/visual-design/1.mp4',
          type: 'video',
          alt: 'Comfort Map campaign video 1',
          span: 'wide',
        },
        {
          src: '/recovered/visual-design/3.mp4',
          type: 'video',
          alt: 'Comfort Map campaign video 2',
          span: 'wide',
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
      workType: 'Growth Design',
      focus: 'Turn invisible air data into visible action.',
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
          title: 'Cleaner Air',
          description:
            'In 2022 on average concentration of the PM2.5 in Ukraine fell by 33% compared to 2021.',
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
          title: 'Discovery',
          description:
            'Kyiv ranked first globally for air pollution in 2020, so people needed fast, understandable guidance, not raw metrics.',
        },
        {
          title: 'Research',
          description:
            'I ran product strategy workshops with marketing, mapped personas and journeys, and benchmarked mental models to reduce decision friction.',
        },
        {
          title: 'Development',
          description:
            'We scaled a real-time sensor network from Kyiv to major cities, added visual tips and mascot-based guidance, and built onboarding for AQI literacy. I also designed privacy-safe location handling and offline alerts for high pollution.',
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
          src: '/recovered/air-video.mp4',
          type: 'video',
          alt: 'Air Quality Map walkthrough video',
          span: 'wide',
        },
        {
          src: '/recovered/lun-misto-air/jpg/map-1.jpg',
          type: 'image',
          alt: 'Air Quality map interface 1',
        },
        {
          src: '/recovered/lun-misto-air/jpg/map-2.jpg',
          type: 'image',
          alt: 'Air Quality map interface 2',
        },
        {
          src: '/recovered/lun-misto-air/jpg/map-3.jpg',
          type: 'image',
          alt: 'Air Quality map interface 3',
        },
        {
          src: '/recovered/lun-misto-air/jpg/map-4.jpg',
          type: 'image',
          alt: 'Air Quality map interface 4',
        },
        {
          src: '/recovered/lun-misto-air/jpg/map-5.jpg',
          type: 'image',
          alt: 'Air Quality map interface 5',
        },
        {
          src: '/recovered/lun-misto-air/jpg/air-1.jpg',
          type: 'image',
          alt: 'Air Quality NOW widget — unhealthy air, mascot guidance',
          span: 'tall',
        },
        {
          src: '/recovered/lun-misto-air/jpg/watch.jpg',
          type: 'image',
          alt: 'Air Quality watch widget',
        },
        {
          src: '/recovered/lun-misto-air/jpg/widget-watches-2.jpg',
          type: 'image',
          alt: 'Air Quality watch widgets',
        },
        {
          src: '/recovered/lun-misto-air/jpg/widget-chrome.jpg',
          type: 'image',
          alt: 'Air Quality Chrome widget',
          span: 'wide',
        },
      ],
    },
    {
      id: 'lunie',
      title: 'LUN HR System',
      navigationLabel: 'LUN HR System',
      year: '2018',
      company: 'LUN',
      businessSize: 'Scale-up',
      workType: 'Product Design',
      focus:
        'How we reduced operational cognitive load with a custom HR OS.',
      categories: ['Product Design', 'E2E', 'Design System'],
      summary: [
        'Lunie was an internal HR management system for LUN, a fast-scaling proptech company operating across multiple brands and countries.',
        'The product had to support different permissions, workflows, and interdependent roles without turning HR operations into more friction for employees or the people team.',
      ],
      goals:
        'LUN needed an end-to-end HR system that could scale with hiring, role complexity, and multi-user workflows across the company.',
      role: 'UX design, UI design, Design system, Mascot development',
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
      process: [
        {
          title: 'Discovery',
          description:
            'Rapid hiring and international growth exposed clear limits in off-the-shelf HR tools.',
        },
        {
          title: 'Research',
          description:
            'I interviewed founders, HR, recruiters, accountants, and product teams, then formalized jobs-to-be-done and personas.',
        },
        {
          title: 'Hypothesis',
          description:
            'A unified HRM with role-based access, scheduling tools, team visibility, and recruitment communication would cut friction and improve daily operations.',
        },
        {
          title: 'Development',
          description:
            'I designed the core IA and flows, validated prototypes in iterative research loops, and shipped role-based interfaces across calendar, team, office map, and admin sections. I also created Lunie, an HR assistant persona later integrated with Slack support.',
        },
      ],
      team: [
        'Alina Skalkina, Product Designer',
        'Andrii Stavinsky, Full Stack Developer',
        'Iryna Platonova, Chief People Officer',
      ],
      gallery: [
        {
          src: '/recovered/lunie.mp4',
          type: 'video',
          alt: 'Lunie walkthrough video',
          span: 'wide',
        },
        {
          src: '/recovered/lunie/1.png',
          type: 'image',
          alt: 'LUN HR System screen 1',
        },
        {
          src: '/recovered/lunie/2.png',
          type: 'image',
          alt: 'LUN HR System screen 2',
        },
        {
          src: '/recovered/lunie/3.png',
          type: 'image',
          alt: 'LUN HR System screen 3',
        },
        {
          src: '/recovered/lunie/4.png',
          type: 'image',
          alt: 'LUN HR System screen 4',
        },
        {
          src: '/recovered/lunie/5.png',
          type: 'image',
          alt: 'LUN HR System screen 5',
        },
        {
          src: '/recovered/lunie/6.png',
          type: 'image',
          alt: 'LUN HR System screen 6',
        },
        {
          src: '/recovered/lunie/mobile-1.png',
          type: 'image',
          alt: 'LUN HR System mobile screen 1',
        },
        {
          src: '/recovered/lunie/mobile-2.png',
          type: 'image',
          alt: 'LUN HR System mobile screen 2',
        },
        {
          src: '/recovered/lunie/mobile-3.png',
          type: 'image',
          alt: 'LUN HR System mobile screen 3',
        },
        {
          src: '/recovered/lunie/mobile-4.png',
          type: 'image',
          alt: 'LUN HR System mobile screen 4',
        },
        {
          src: '/recovered/lunie/mobile-5.png',
          type: 'image',
          alt: 'LUN HR System mobile screen 5',
        },
      ],
    },
    {
      id: 'lun-hr-brand',
      title: 'LUN HR Brand',
      navigationLabel: 'LUN HR Brand',
      year: '2019',
      company: 'LUN',
      businessSize: 'Scale-up',
      workType: 'Brand Design',
      focus: 'The hiring game that built a community.',
      categories: [
        'Marketing Design',
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
          title: 'Global game attempts',
          description:
            'The metro banners drove traffic to the game, which unexpectedly went viral globally. Only the top percentile who beat every level reached the final stage: a direct meeting with the team at our weekly open parties.',
        },
        {
          value: '86% → 99%',
          title: 'Target recognition',
          description:
            'Saturated the target engineering market entirely without using a single traditional corporate hiring ad.',
        },
        {
          title: 'Physical IT infrastructure',
          description:
            'Built and launched two major IT hubs, establishing a physical center of gravity that accelerated the growth of the local tech industry.',
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
      gallery: [
        {
          src: '/recovered/lun-hr-brand/educational-hub-3.jpg',
          type: 'image',
          alt: 'LUN HR brand event with the team and candidates',
          span: 'wide',
        },
        {
          src: '/recovered/lun-hr-brand/lun-game-metro-code.png',
          type: 'image',
          alt: 'LUN Game metro ad code puzzle',
          span: 'wide',
        },
        {
          src: '/recovered/lun-hr-brand/lun-game-task-1.jpg',
          type: 'image',
          alt: 'LUN Game challenge screen, task 1',
        },
        {
          src: '/recovered/lun-hr-brand/lun-game-task-7.jpg',
          type: 'image',
          alt: 'LUN Game challenge screen, task 7',
        },
        {
          src: '/recovered/lun-hr-brand/lun-game-chat.jpg',
          type: 'image',
          alt: 'Player chat message about solving LUN Game tasks',
        },
        {
          src: '/recovered/lun-hr-brand/educational-hub-1.jpg',
          type: 'image',
          alt: 'Educational hub created by LUN at Taras Shevchenko University, space view',
        },
        {
          src: '/recovered/lun-hr-brand/educational-hub-2.jpg',
          type: 'image',
          alt: 'Educational hub created by LUN at Taras Shevchenko University, interior',
        },
        {
          src: '/recovered/lun-hr-brand/lunoteka-laptop.jpg',
          type: 'image',
          alt: 'Laptop with a ЛУНОТЕКА branded sticker',
          span: 'wide',
        },
        {
          src: '/recovered/lun-hr-brand/lunoteka-award.jpg',
          type: 'image',
          alt: 'ЛУНОТЕКА award moment with the team and a winner',
        },
        {
          src: '/recovered/lun-hr-brand/lunoteka-event.jpg',
          type: 'image',
          alt: 'Crowd at a ЛУНОТЕКА event in front of the brand wall',
        },
        {
          src: '/recovered/lun-hr-brand/lunoteka-space.jpg',
          type: 'image',
          alt: 'ЛУНОТЕКА educational hub interior with bookshelves and lounge',
          span: 'wide',
        },
      ],
    },
    {
      id: 'farba',
      title: 'Farba',
      navigationLabel: 'Farba',
      year: '2025 - Ongoing',
      company: 'Farba',
      businessSize: 'Startup',
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
        {
          title: 'Curator-first product model',
          description:
            'Users pick color, templates, and components while the system handles complexity across light/dark modes and edge cases.',
        },
      ],
      process: [
        {
          title: 'Experiment Setup',
          description:
            'Farba started as a deliberate R&D bet: stop waiting for ideal system conditions and test whether a themable system could be both flexible and maintainable.',
        },
        {
          title: 'Architecture First',
          description:
            'The team invested heavily in system architecture before scaling features, so future additions would rely on durable rules instead of ad-hoc custom components.',
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
        {
          title: 'System as Creative Environment',
          description:
            'With core system problems largely solved, energy shifted from maintenance overhead to making useful, expressive experiences for portfolios, services, blogs, about pages, and booking flows.',
        },
      ],
      team: [
        'Alina Skalkina, Product and Design System Lead',
        'Maksym Dolynchuk, CTO',
        'ay_seed',
        'Viki Berg',
      ],
      gallery: [],
    },
    {
      id: 'graphic-design',
      title: 'My playground',
      navigationLabel: 'My playground',
      year: '2018-2025',
      businessSize: 'Personal',
      workType: 'Visual Design',
      focus:
        'Design moves fast, and I’ve found that the only way to keep up is to keep playing. This is my lab for visual experiments—a place where I research tools not just to stay current, but to stay inspired.',
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
        {
          src: '/recovered/graphic-design.mov',
          type: 'video',
          alt: 'Graphic Design motion studies reel',
          span: 'wide',
          caption:
            'Experimental motion studies testing transitions, timing curves, and bold campaign composition.',
        },
        {
          src: '/recovered/problematic.mp4',
          type: 'video',
          alt: 'Graphic Design motion clip',
          span: 'wide',
        },
        {
          src: '/recovered/graphic-design/house2.gif',
          type: 'image',
          alt: 'Graphic Design animated house concept',
          span: 'wide',
        },
        {
          src: '/recovered/graphic-design/L-0.jpg',
          type: 'image',
          alt: 'Graphic Design piece L-0',
        },
        {
          src: '/recovered/graphic-design/B-1.jpg',
          type: 'image',
          alt: 'Graphic Design piece B-1',
        },
        {
          src: '/recovered/graphic-design/D-1.jpg',
          type: 'image',
          alt: 'Graphic Design piece D-1',
        },
        {
          src: '/recovered/graphic-design/I-2.jpg',
          type: 'image',
          alt: 'Graphic Design piece I-2',
        },
        {
          src: '/recovered/graphic-design/Lun-redesign.jpg',
          type: 'image',
          alt: 'Graphic Design Lun redesign',
        },
        {
          src: '/recovered/graphic-design/Lun-5.jpg',
          type: 'image',
          alt: 'Graphic Design Lun visual 5',
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

export function getProjectsNewestFirst() {
  return [...portfolioData.projects].sort((a, b) => {
    const markerA = getYearMarkers(a.year)
    const markerB = getYearMarkers(b.year)

    if (markerB.latest !== markerA.latest) {
      return markerB.latest - markerA.latest
    }

    return markerB.earliest - markerA.earliest
  })
}
