import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import Header from '../components/Header'
import { ThemeProvider } from '../components/theme-provider'

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
        <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
          <Header />
          {children}
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
