import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import {
  DEFAULT_THEME_ACCENT,
  DEFAULT_THEME_APPEARANCE,
  type ResolvedAppearance,
  type ThemeAppearance,
  buildThemeSnapshot,
  getResolvedAppearanceForColor,
} from '@/tokens/theme'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: ThemeAppearance
  defaultAccent?: string
  storageKey?: string
}

type ThemeProviderState = {
  appearance: ThemeAppearance
  resolvedAppearance: ResolvedAppearance
  accentHex: string
  setAppearance: (appearance: ThemeAppearance) => void
  setAccentHex: (accentHex: string, options?: { activateColorMode?: boolean }) => void
}

type StoredThemeState = {
  appearance?: ThemeAppearance
  accentHex?: string
}

const initialState: ThemeProviderState = {
  appearance: 'system',
  resolvedAppearance: 'light',
  accentHex: DEFAULT_THEME_ACCENT,
  setAppearance: () => null,
  setAccentHex: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

function isAppearance(value: string): value is ThemeAppearance {
  return value === 'light' || value === 'dark' || value === 'system' || value === 'color'
}

function normalizeAccentHex(value?: string) {
  if (!value) return DEFAULT_THEME_ACCENT
  return value.startsWith('#') ? value : `#${value}`
}

function getSystemAppearance(): ResolvedAppearance {
  if (typeof window === 'undefined') return 'light'

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function readStoredTheme(storageKey: string): StoredThemeState {
  if (typeof window === 'undefined') {
    return {}
  }

  const rawValue = window.localStorage.getItem(storageKey)
  if (!rawValue) {
    return {}
  }

  try {
    const parsedValue = JSON.parse(rawValue) as StoredThemeState
    return {
      appearance: parsedValue.appearance,
      accentHex: parsedValue.accentHex,
    }
  } catch {
    if (isAppearance(rawValue)) {
      return { appearance: rawValue }
    }

    return {}
  }
}

export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME_APPEARANCE,
  defaultAccent = DEFAULT_THEME_ACCENT,
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const storedTheme = readStoredTheme(storageKey)
  const [appearance, setAppearance] = useState<ThemeAppearance>(() => {
    return storedTheme.appearance ?? defaultTheme
  })
  const [accentHex, setAccentHex] = useState<string>(() => {
    return normalizeAccentHex(storedTheme.accentHex ?? defaultAccent)
  })
  const [systemAppearance, setSystemAppearance] = useState<ResolvedAppearance>(() =>
    getSystemAppearance()
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const updateSystemAppearance = () => {
      setSystemAppearance(mediaQuery.matches ? 'dark' : 'light')
    }

    updateSystemAppearance()
    mediaQuery.addEventListener('change', updateSystemAppearance)

    return () => mediaQuery.removeEventListener('change', updateSystemAppearance)
  }, [])

  const resolvedAppearance =
    appearance === 'system'
      ? systemAppearance
      : appearance === 'color'
        ? getResolvedAppearanceForColor(accentHex)
        : appearance

  const themeSnapshot = useMemo(
    () =>
      buildThemeSnapshot({
        appearance: resolvedAppearance,
        accentHex,
        mode: appearance === 'color' ? 'color' : 'monochrome',
      }),
    [resolvedAppearance, accentHex, appearance]
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        appearance,
        accentHex,
      })
    )
  }, [accentHex, appearance, storageKey])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const root = window.document.documentElement

    root.classList.toggle('dark', resolvedAppearance === 'dark')
    root.dataset.appearance = themeSnapshot.resolvedAppearance
    root.dataset.themeMode = themeSnapshot.mode
    root.style.colorScheme = resolvedAppearance

    for (const [name, value] of Object.entries(themeSnapshot.cssVariables)) {
      root.style.setProperty(name, value)
    }
  }, [resolvedAppearance, themeSnapshot])

  const value = {
    appearance,
    resolvedAppearance,
    accentHex,
    setAppearance,
    setAccentHex: (
      nextAccentHex: string,
      options?: { activateColorMode?: boolean }
    ) => {
      if (options?.activateColorMode !== false) {
        setAppearance('color')
      }
      setAccentHex(normalizeAccentHex(nextAccentHex))
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
