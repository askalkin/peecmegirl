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
}

export type PortfolioProject = {
  id: string
  title: string
  navigationLabel: string
  year: string
  categories: string[]
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
    role: 'Digital Designer',
    intro:
      'I design products, systems, and interfaces by turning ambiguous problems into clear decisions.',
    approach:
      'The work I want this portfolio to show starts before the UI: defining the problem, aligning teams, understanding constraints, and deciding what should be built in the first place.',
    email: 'skalkinalina@gmail.com',
    footerTitle: 'Personal Portfolio Website',
    footerYear: '2025',
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
        href: '/recovered/Alina-Skalkina-CV-Digital-Designer.pdf',
        label: 'Download CV',
      },
    ] satisfies PortfolioLink[],
    stats: [
      { label: 'Experience', value: '6+ years' },
      { label: 'Selected works', value: '5' },
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
        'Founding designer for booking platform.',
        'Video Design for Huawei.',
        'Visual Design for LUN.',
        'Market Analysis and Product Strategy for UTC FILM and UI/UX Design for Malyatko',
      ],
    },
    {
      period: '2020 - 2021',
      title: 'Product Designer, LUN Misto R&D Team',
      details: [
        'Growth Design for LUN Misto interactive Air Quality map and mobile apps and widgets, resulted in 230% growth in Monthly Page Views.',
        'Hiring and mentoring Junior Designers',
      ],
    },
    {
      period: '2020',
      title: 'Lecture About Design and Frontend Integration',
      details: [
        'Delivered lecture "Moving the button for an hour" at Taras Shevchenko National University of Kyiv',
      ],
    },
    {
      period: '2020',
      title: 'Visual Designer, LUN Marketing Team',
      details: [
        'Created UI designs for marketing campaigns',
        'Designed a B2B CRM Dashboard for efficient lead management',
      ],
    },
    {
      period: '2018 - 2020',
      title: 'Digital Designer, LUN HR Team',
      details: [
        'End-to-end Product Design for HR Management platform',
        'University student coworking brand identity',
        'Corporate events Art Direction',
      ],
    },
    {
      period: '2015 - 2019',
      title: 'Taras Shevchenko National University of Kyiv',
      details: [
        'Faculty of Applied Physics, Nanoelectronics, and Computer Technologies. Applied Physics curicculum',
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
      id: 'comfort-map',
      title: 'Comfort Map',
      navigationLabel: 'Comfort Map',
      year: '2021',
      focus:
        'How do you turn an overwhelming, data-heavy map into a decision tool people can actually use when choosing where to live?',
      categories: [
        'Growth Design',
        'UX Research',
        'UI Design',
        'Design System',
        'Product Strategy',
      ],
      summary: [
        'LUN Misto Comfort Map was an R&D product designed to help people choose a neighbourhood using signals beyond listings: greenery, noise, price, air quality, kindergarten access, and other urban-comfort criteria.',
        'The challenge was not the lack of information. It was turning a dense multi-layer product into something people could trust and act on without getting lost in the data.',
      ],
      goals:
        'The product needed to grow acquisition, engagement, article readership, and community participation around the idea of urban comfort.',
      role: 'Growth Design, UI/UX Design, Design System, Product Strategy',
      liveLink: {
        href: 'https://lun.ua/misto',
        label: 'lun.ua/misto',
      },
      highlights: [
        {
          value: '+60%',
          title: 'in CSAT',
          description:
            'Created a interactive map using open data that allows users to explore urban comfort criteria.',
        },
        {
          title: 'First Lady Initiative',
          description:
            'Project is adopted as initiative of First Lady Olena Zelenska "Business without barriers".',
        },
        {
          value: '+17%',
          title: 'in conversion rate',
          description:
            'We involved students of the Product Design Course in Projector Institute for UX research on comfort criteria.',
        },
      ],
      process: [
        {
          title: 'Discovery',
          description:
            'The map has approximately 20 separate layers, our 89% Bounce Rate and 2.4-minute median Session Duration, showed users were quickly overwhelmed, despite initial engagement. We conducted a survey to validate our concerns and it revealed that our CSAT was 20%.',
        },
        {
          title: 'Research',
          description:
            'We received in-depth interviews from PRJCTR students with the target audience and results of testing hypotheses on users. I conducted an analysis of the collected data and developed a Value Proposition Canvas and Personas. As our project offers a unique proposition, it was necessary to create User Flow to guide users without overwhelming them with complex data. To identify key touchpoints, challenges, and retention opportunities across the full apartment-buying experience I facilitated the workshop, where we created a Customer Journey Map, aligning product goals with marketing and future integration.',
        },
        {
          title: 'Hypothesis',
          description:
            'Creating an interactive, minimalistic map that highlights areas of urban comfort based on universal design, health, safety, transportation, and education criteria will help residents of Kyiv to make confident decisions of neighbourhood of their dream. Displaying only positively rated comfort indicators will increase user engagement. Allowing users to search by specific streets will improve discoverability and relevance of comfort information.',
        },
        {
          title: 'Development',
          description:
            'Design System: I developed dark design system (UI components and OSM map styles) to improve experience during prolonged neighborhood comparison and article reading. Comfort scale: we created a comfort gradient for personalized maps, based on user-selected criteria. Users can also explore individual layers and research behind them. Onboarding: we simplified the user\'s experience by guiding them through complex data within the interface and providing clear instructions for sensor installation.',
        },
      ],
      team: [
        'Alina Skalkina, Product Designer',
        'Projector institute students, Product Designers',
        'Anna Denysenko, Project Curator',
        'Serhii Muravjev, Software Engineer',
        'Denys Sydilkovsky, CMO and students curator',
        'Sasha Panasyuk, PR & Communications',
      ],
      gallery: [
        {
          src: '/recovered/comfort-map-video.mp4',
          type: 'video',
          alt: 'Comfort Map walkthrough video',
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
      ],
    },
    {
      id: 'air-quality-map',
      title: 'Air quality map',
      navigationLabel: 'Air quality map',
      year: '2020',
      focus:
        'How do you make an invisible environmental problem understandable quickly enough that people change behaviour?',
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
      role: 'Growth Design, UI/UX Design',
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
          description: 'Collaborating for Cleaner Air. Partners that are using our data.',
        },
      ],
      process: [
        {
          title: 'Discovery',
          description:
            'As Kyiv ranked first in global air pollution in 2020, our aim was to provide clear, accessible air quality data to help residents protect their health.',
        },
        {
          title: 'Research',
          description:
            'We conducted a series of Product Strategy workshops to align product growth with marketing. As a result, I defined key Personas, created a Value Proposition Canvas, mapped the User Journey and analyzed User Flows and Mental Models from well-known services to design an intuitive and friction-free interface.',
        },
        {
          title: 'Development',
          description:
            'Our network: we developed real-time air quality sensors in collaboration with National University of Kyiv and then established a network, initially in Kyiv, and then expanded to major cities across Ukraine, providing these sensors free of charge to local contributors. Tips: numbers are hard to imagine, that\'s why we providing instant visual tips. Our mascot Ficha smiles when air quality is good, growing more concerned as it worsens. This is paired with color-coded tips and recommendations (like "safe to jog" or "close windows") for clear guidance. Onboarding: I created an onboarding page for Lun Misto Air to help users understand what AQI is, how we measure it with our stations. Sensitive data: we prioritize contributor safety by never displaying the exact addresses of our stations. Users, however, will still receive personalized air quality data for their precise locations. Offline: users are now receiving notifications in cases of high air pollution even without Internet connection.',
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
      partners: [
        {
          name: 'IQAir',
          src: '/recovered/lun-misto-air/logos/iq-air.png',
        },
        {
          name: 'World Air Quality Index',
          src: '/recovered/lun-misto-air/logos/World-air-quality-index.png',
        },
        {
          name: 'Ministry of Ecology',
          src: '/recovered/lun-misto-air/logos/Ministry-of-ecology.png',
        },
        {
          name: 'Plume Labs',
          src: '/recovered/lun-misto-air/logos/Plume-labs.png',
        },
        {
          name: 'Air Care',
          src: '/recovered/lun-misto-air/logos/Air-care.png',
        },
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
          alt: 'Air Quality widget 1',
        },
        {
          src: '/recovered/lun-misto-air/jpg/air-2.jpg',
          type: 'image',
          alt: 'Air Quality widget 2',
        },
        {
          src: '/recovered/lun-misto-air/jpg/air-3.jpg',
          type: 'image',
          alt: 'Air Quality widget 3',
        },
        {
          src: '/recovered/lun-misto-air/jpg/air-4.jpg',
          type: 'image',
          alt: 'Air Quality widget 4',
        },
        {
          src: '/recovered/lun-misto-air/jpg/air-5.jpg',
          type: 'image',
          alt: 'Air Quality widget 5',
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
      id: 'visual-design',
      title: 'Visual Design',
      navigationLabel: 'Visual Design',
      year: '2018-2025',
      focus:
        'How do you keep visual communication clear, distinctive, and consistent across interface, campaign, and brand work?',
      categories: ['UI Design', 'Research'],
      summary: [
        'A selection of visual design work across interfaces, campaigns, and communication systems.',
        'What connects these pieces is clarity: finding a visual direction that communicates quickly without flattening the original idea.',
      ],
      highlights: [],
      process: [],
      team: [],
      gallery: [
        {
          src: '/recovered/visual-design/1.mp4',
          type: 'video',
          alt: 'Visual Design reel 1',
          span: 'wide',
        },
        {
          src: '/recovered/visual-design/2.mp4',
          type: 'video',
          alt: 'Visual Design reel 2',
          span: 'wide',
        },
        {
          src: '/recovered/visual-design/3.mp4',
          type: 'video',
          alt: 'Visual Design reel 3',
          span: 'wide',
        },
        {
          src: '/recovered/visual-design/4.png',
          type: 'image',
          alt: 'Visual Design still 1',
        },
        {
          src: '/recovered/visual-design/5.png',
          type: 'image',
          alt: 'Visual Design still 2',
        },
        {
          src: '/recovered/visual-design/6.png',
          type: 'image',
          alt: 'Visual Design still 3',
        },
      ],
    },
    {
      id: 'lunie',
      title: 'LUN HR System',
      navigationLabel: 'LUN HR System',
      year: '2018',
      focus:
        'How do you turn fragmented internal operations into a system multiple roles can rely on without adding more overhead?',
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
            'employees can book: vacation, day-offs, education, business trips, and sick leaves',
        },
        {
          title: 'Email manager',
          description:
            'streamlined recruitment process with email templates for candidate communication and offers',
        },
        {
          title: 'Payroll processing',
          description:
            'direct downloading of the data for accountants, reducing manual errors and saving valuable time',
        },
        {
          title: 'Multi-user workflow',
          description:
            'specifically designed for interdependent employees ("creative couples") to plan day-offs for these critical roles',
        },
        {
          title: 'Access levels',
          description:
            'not only enhances data security but also provides a more tailored user experience for different job functions',
        },
      ],
      process: [
        {
          title: 'Discovery',
          description:
            'The team began to scale rapidly and hire foreign specialists, so LUN needed quite specific optimization of HR Management, that wasn\'t covered with propositions on the market.',
        },
        {
          title: 'Research',
          description:
            'I conducted a series of interviews with founders, recruiters, HR, accountants, product managers, and other representatives from various teams to define their JTBD, gains, and pains, and created two Persona Value Proposition Canvases.',
        },
        {
          title: 'Hypothesis',
          description:
            'Providing employees with intuitive time management and collaboration tools within the HRM system will improve operational efficiency and team effectiveness. Implementing a dedicated conference room booking feature will reduce scheduling problems. Providing clear visibility on teams and colleague locations will improve office navigation and internal communication. Implementing role-based access levels within the HRM system will enhance data security and provide a tailored user experience for different job functions. Introducing a multi-user workflow specifically for interdependent colleagues to plan day-offs will improve team coordination for these critical roles. Developing designed email manager for candidate communication and offers will optimize HR processes, leading to more efficency and reduce mistakes.',
        },
        {
          title: 'Development',
          description:
            'Designed an intuitive sitemap encompassing key sections such as Calendar, Team List, Office Map, FAQ, Account, and Admin pages with role-based access control. Developed low-fidelity prototypes, validated them through contextual inquiry and user interviews, and initiated the design implementation phase. Testing involved continuous feedback loops, in-depth user interviews, and observation of pain points and needs to validate product hypotheses, enabling us to deliver truly intuitive and user-centered solutions. Lunie: I developed Lunie, our friendly mascot and virtual assistant designed to feel like a helpful team member. As part of our HR brand strategy, Lunie supports employee well-being and helps reduce operational stress by guiding users through tasks in a conversational, approachable way. We also integrated Lunie with Slack, allowing employees to ask questions, anonymously if desired, ensuring accessible, always-on support and fostering a culture of openness and care.',
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
      id: 'graphic-design',
      title: 'Graphic Design',
      navigationLabel: 'Graphic Design',
      year: '2018-2025',
      focus:
        'How do you give campaigns and brand systems a distinct point of view while keeping them legible across formats?',
      categories: [
        'Brand Identity',
        'Typography',
        '3D Design',
        'Motion Design',
      ],
      summary: [
        'A selection of graphic design, identity, typography, motion, and 3D work across campaigns and internal initiatives.',
        'These pieces focus on building a recognizable point of view without losing clarity when the work moves across different formats and audiences.',
      ],
      highlights: [],
      process: [],
      team: [],
      gallery: [
        {
          src: '/recovered/graphic-design.mov',
          type: 'video',
          alt: 'Graphic Design reel',
          span: 'wide',
        },
        {
          src: '/recovered/problematic.mp4',
          type: 'video',
          alt: 'Graphic Design motion clip',
          span: 'wide',
        },
        {
          src: '/recovered/graphic-design/A-2.jpg',
          type: 'image',
          alt: 'Graphic Design piece A-2',
        },
        {
          src: '/recovered/graphic-design/I-2.jpg',
          type: 'image',
          alt: 'Graphic Design piece I-2',
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
          src: '/recovered/graphic-design/abstract.png',
          type: 'image',
          alt: 'Graphic Design abstract artwork',
        },
        {
          src: '/recovered/graphic-design/D-1.jpg',
          type: 'image',
          alt: 'Graphic Design piece D-1',
        },
        {
          src: '/recovered/graphic-design/G-2.jpg',
          type: 'image',
          alt: 'Graphic Design piece G-2',
        },
        {
          src: '/recovered/graphic-design/K-1.jpg',
          type: 'image',
          alt: 'Graphic Design piece K-1',
        },
        {
          src: '/recovered/graphic-design/Lun-5.jpg',
          type: 'image',
          alt: 'Graphic Design Lun 5',
        },
        {
          src: '/recovered/graphic-design/house2.gif',
          type: 'image',
          alt: 'Graphic Design animated house asset',
        },
        {
          src: '/recovered/graphic-design/Lun-4.jpg',
          type: 'image',
          alt: 'Graphic Design Lun 4',
        },
        {
          src: '/recovered/graphic-design/spilka-2.png',
          type: 'image',
          alt: 'Graphic Design Spilka asset',
        },
        {
          src: '/recovered/graphic-design/lun-data-visual.png',
          type: 'image',
          alt: 'Graphic Design data visualization',
        },
        {
          src: '/recovered/graphic-design/Lun-redesign.jpg',
          type: 'image',
          alt: 'Graphic Design Lun redesign',
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
