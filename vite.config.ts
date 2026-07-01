import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  server: {
    port: Number(process.env.PORT) || 3000,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    // The devtools event bus binds a fixed port, so allow opting out (e.g. to
    // run a second dev server alongside one that's already running).
    ...(process.env.NO_DEVTOOLS ? [] : [devtools()]),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        // Route discovery covers app pages; link crawling can corrupt binary
        // assets by writing fetched PDF/video/image responses as text.
        crawlLinks: false,
      },
    }),
    viteReact(),
  ],
})

export default config
