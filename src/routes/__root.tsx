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
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:title',
        content: 'Alina Skalkina | Lead Brand Designer portfolio',
      },
      {
        property: 'og:description',
        content:
          'Helping B2B products explain themselves better, make visuals less generic, and design systems less likely to become archaeological sites.',
      },
      {
        property: 'og:image',
        content: '/og-image.png',
      },
      {
        property: 'og:image:width',
        content: '1200',
      },
      {
        property: 'og:image:height',
        content: '630',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: 'Alina Skalkina | Lead Brand Designer portfolio',
      },
      {
        name: 'twitter:description',
        content:
          'Helping B2B products explain themselves better, make visuals less generic, and design systems less likely to become archaeological sites.',
      },
      {
        name: 'twitter:image',
        content: '/og-image.png',
      },
    ],
    links: [
      {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href: '/fonts/inter/inter-variable.woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href: '/fonts/outfit-var/outfit-variable.woff2',
        crossOrigin: 'anonymous',
      },
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
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
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
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-sm focus:bg-foreground focus:px-4 focus:py-2 focus:text-base focus:font-medium focus:text-background focus:outline-none"
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
