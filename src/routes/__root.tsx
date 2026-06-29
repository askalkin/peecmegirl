import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import Header from '../components/Header'
import { ThemeProvider } from '../components/theme-provider'
import { FadeObserver } from '../components/FadeObserver'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Alina Skalkina | Lead Brand Designer portfolio',
      },
      {
        name: 'description',
        content:
          '6+ years in UI/UX, Visual & Mobile Design, creating experiences in prop-tech, marketing, environmental, and employer branding.',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-sm focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background focus:outline-none"
        >
          Skip to content
        </a>
        <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
          <FadeObserver />
          <Header />
          {children}
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
