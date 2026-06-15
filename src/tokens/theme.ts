import colorPrimitives from './primitives/color-primitives.json'
import layoutTokens from './primitives/layout.json'
import bgTokens from './semantic/bg.json'
import borderTokens from './semantic/border.json'
import iconsTokens from './semantic/icons.json'
import textTokens from './semantic/text.json'
import {
  clampOklch,
  formatOklch,
  hexToOklch,
  oklchToHex,
  pickAccessibleTextColor,
  shiftHue,
  withAlpha,
} from './color'

export type ThemeAppearance = 'light' | 'dark' | 'system' | 'color'
export type ResolvedAppearance = 'light' | 'dark'
export type ThemeMode = 'monochrome' | 'color'

export const DEFAULT_THEME_APPEARANCE: ThemeAppearance = 'light'
export const DEFAULT_THEME_ACCENT = '#000000'

type TokenLeaf = {
  css: string
  hex?: string
}

type PrimitiveBranch = {
  absolute: Record<string, string>
  neutral: Record<string, string>
  brand: Record<string, string>
  feedback: Record<string, Record<string, string>>
}

type ThemeSnapshot = {
  resolvedAppearance: ResolvedAppearance
  mode: ThemeMode
  cssVariables: Record<string, string>
}

const BRAND_TONES: Record<string, { lightness: number; chromaFactor: number }> = {
  0: { lightness: 0.995, chromaFactor: 0.02 },
  50: { lightness: 0.985, chromaFactor: 0.05 },
  100: { lightness: 0.962, chromaFactor: 0.1 },
  200: { lightness: 0.92, chromaFactor: 0.16 },
  300: { lightness: 0.84, chromaFactor: 0.28 },
  400: { lightness: 0.75, chromaFactor: 0.48 },
  500: { lightness: 0.66, chromaFactor: 0.68 },
  600: { lightness: 0.58, chromaFactor: 0.82 },
  700: { lightness: 0.49, chromaFactor: 0.72 },
  800: { lightness: 0.39, chromaFactor: 0.54 },
  900: { lightness: 0.29, chromaFactor: 0.32 },
  950: { lightness: 0.2, chromaFactor: 0.18 },
}

const NEUTRAL_TONES: Record<string, { lightness: number; chromaFactor: number }> = {
  0: { lightness: 0.995, chromaFactor: 0.12 },
  50: { lightness: 0.985, chromaFactor: 0.16 },
  100: { lightness: 0.962, chromaFactor: 0.2 },
  200: { lightness: 0.91, chromaFactor: 0.28 },
  300: { lightness: 0.84, chromaFactor: 0.36 },
  400: { lightness: 0.73, chromaFactor: 0.46 },
  500: { lightness: 0.62, chromaFactor: 0.58 },
  600: { lightness: 0.5, chromaFactor: 0.64 },
  700: { lightness: 0.39, chromaFactor: 0.58 },
  800: { lightness: 0.28, chromaFactor: 0.44 },
  900: { lightness: 0.18, chromaFactor: 0.3 },
  950: { lightness: 0.1, chromaFactor: 0.2 },
}

const SEMANTIC_SOURCES = {
  bg: bgTokens,
  text: textTokens,
  icons: iconsTokens,
  border: borderTokens,
} as const

function reverseIfDark(lightness: number, appearance: ResolvedAppearance) {
  return appearance === 'light' ? lightness : 1 - lightness
}

function generateScale(
  appearance: ResolvedAppearance,
  hue: number,
  maxChroma: number,
  toneMap: Record<string, { lightness: number; chromaFactor: number }>
) {
  return Object.fromEntries(
    Object.entries(toneMap).map(([step, tone]) => {
      const lightness = reverseIfDark(tone.lightness, appearance)
      const color = clampOklch({
        l: lightness,
        c: maxChroma * tone.chromaFactor,
        h: hue,
      })

      return [step, oklchToHex(color)]
    })
  )
}

function buildPrimitives(
  appearance: ResolvedAppearance,
  accentHex: string,
  mode: ThemeMode
): PrimitiveBranch {
  const baseBranch = colorPrimitives[appearance] as PrimitiveBranch
  if (mode === 'monochrome') {
    // Primitives are already pure grayscale, with `brand` anchored toward
    // black (light) / white (dark) so the accent reads as strong B&W.
    return baseBranch
  }

  const accent = hexToOklch(accentHex)
  const hue = Number.isFinite(accent.h) ? accent.h : 320
  const brandChroma = Math.min(Math.max(accent.c, 0.14), 0.25)
  const neutralChroma = Math.min(Math.max(brandChroma * 0.12, 0.01), 0.028)

  return {
    ...baseBranch,
    brand: generateScale(appearance, hue, brandChroma, BRAND_TONES),
    neutral: generateScale(appearance, shiftHue(hue, -8), neutralChroma, NEUTRAL_TONES),
  }
}

export function getResolvedAppearanceForColor(accentHex: string): ResolvedAppearance {
  const accent = hexToOklch(accentHex)

  return accent.l >= 0.62 ? 'light' : 'dark'
}

function getPrimitiveValue(primitives: PrimitiveBranch, reference: string) {
  const parts = reference.split('.')

  if (parts.length === 2) {
    const [family, step] = parts

    if (family === 'absolute') {
      return primitives.absolute[step]
    }

    if (family === 'neutral') {
      return primitives.neutral[step]
    }

    if (family === 'brand') {
      return primitives.brand[step]
    }
  }

  if (parts.length === 3 && parts[0] === 'feedback') {
    return primitives.feedback[parts[1]]?.[parts[2]]
  }

  return undefined
}

function getResolvedLeaf(
  resolved: Record<string, Record<string, TokenLeaf>>,
  reference: string
) {
  const [group, ...path] = reference.split('.')
  const key = path.join('.')
  return resolved[group]?.[key]
}

function resolveExpression(
  value: string,
  primitives: PrimitiveBranch,
  resolved: Record<string, Record<string, TokenLeaf>>
): TokenLeaf {
  if (value.startsWith('{') && value.endsWith('}')) {
    const leaf = getResolvedLeaf(resolved, value.slice(1, -1))
    if (!leaf) {
      throw new Error(`Unknown semantic token reference: ${value}`)
    }

    return leaf
  }

  if (value.startsWith('alpha(') && value.endsWith(')')) {
    const [target, alpha] = value.slice(6, -1).split(',').map((part) => part.trim())
    const resolvedTarget = resolveExpression(target, primitives, resolved)

    if (!resolvedTarget.hex) {
      throw new Error(`alpha() requires an opaque color reference: ${value}`)
    }

    return {
      css: withAlpha(resolvedTarget.hex, Number(alpha)),
      hex: resolvedTarget.hex,
    }
  }

  if (value.startsWith('auto(') && value.endsWith(')')) {
    const target = value.slice(5, -1).trim()
    const resolvedTarget = resolveExpression(`{${target}}`, primitives, resolved)

    if (!resolvedTarget.hex) {
      throw new Error(`auto() requires an opaque semantic background token: ${value}`)
    }

    const chosen = pickAccessibleTextColor(
      resolvedTarget.hex,
      primitives.absolute.white,
      primitives.absolute.black
    )

    return { css: formatOklch(chosen), hex: chosen }
  }

  const primitive = getPrimitiveValue(primitives, value)
  if (!primitive) {
    throw new Error(`Unknown primitive token reference: ${value}`)
  }

  return { css: formatOklch(primitive), hex: primitive }
}

function flattenSemanticGroup(
  groupName: string,
  source: unknown,
  primitives: PrimitiveBranch,
  resolved: Record<string, Record<string, TokenLeaf>>,
  prefix = ''
) {
  if (typeof source === 'string') {
    const key = prefix
    resolved[groupName][key] = resolveExpression(source, primitives, resolved)
    return
  }

  if (!source || typeof source !== 'object') return

  for (const [key, value] of Object.entries(source)) {
    flattenSemanticGroup(
      groupName,
      value,
      primitives,
      resolved,
      prefix ? `${prefix}.${key}` : key
    )
  }
}

function compileSemanticTokens(primitives: PrimitiveBranch) {
  const resolved: Record<string, Record<string, TokenLeaf>> = {
    bg: {},
    text: {},
    icons: {},
    border: {},
  }

  for (const [groupName, groupSource] of Object.entries(SEMANTIC_SOURCES)) {
    flattenSemanticGroup(groupName, groupSource, primitives, resolved)
  }

  return resolved
}

function createLayoutVariables(resolvedAppearance: ResolvedAppearance) {
  const shadowAlpha = resolvedAppearance === 'dark' ? 0.3 : 0.09
  const floatShadowAlpha = resolvedAppearance === 'dark' ? 0.42 : 0.16

  return {
    '--radius': layoutTokens.radii.lg,
    '--radius-sm': layoutTokens.radii.sm,
    '--radius-md': layoutTokens.radii.md,
    '--radius-lg': layoutTokens.radii.lg,
    '--radius-xl': layoutTokens.radii.xl,
    '--radius-2xl': layoutTokens.radii['2xl'],
    '--radius-pill': layoutTokens.radii.pill,
    '--space-section-x': layoutTokens.spacing.sectionX,
    '--space-section-x-sm': layoutTokens.spacing.sectionXSm,
    '--space-section-x-lg': layoutTokens.spacing.sectionXLg,
    '--font-sans': layoutTokens.typography.fontFamilySans,
    '--font-display': layoutTokens.typography.fontFamilyDisplay,
    '--shadow-surface': `${layoutTokens.shadows.sm} ${withAlpha('#05060a', shadowAlpha)}`,
    '--shadow-surface-lg': `${layoutTokens.shadows.md} ${withAlpha('#05060a', floatShadowAlpha)}`,
    '--shadow-float': `${layoutTokens.shadows.lg} ${withAlpha('#05060a', floatShadowAlpha)}`
  }
}

function createLegacyAliases(
  semantic: Record<string, Record<string, TokenLeaf>>
): Record<string, string> {
  return {
    '--background': semantic.bg['canvas.base'].css,
    '--foreground': semantic.text.primary.css,
    '--card': semantic.bg['surface.base'].css,
    '--card-foreground': semantic.text.primary.css,
    '--popover': semantic.bg['surface.base'].css,
    '--popover-foreground': semantic.text.primary.css,
    '--primary': semantic.bg['accent.base'].css,
    '--primary-foreground': semantic.text.onAccent.css,
    '--secondary': semantic.bg['surface.subtle'].css,
    '--secondary-foreground': semantic.text.primary.css,
    '--muted': semantic.bg['surface.subtle'].css,
    '--muted-foreground': semantic.text.muted.css,
    '--accent': semantic.bg['accent.subtle'].css,
    '--accent-foreground': semantic.text.accent.css,
    '--destructive': semantic.bg['feedback.danger'].css,
    '--destructive-foreground': semantic.text.onDanger.css,
    '--border': semantic.border.default.css,
    '--input': semantic.border.strong.css,
    '--ring': semantic.border.focus.css,
    '--color-overlay-scrim': semantic.bg['surface.overlay'].css,
    '--color-overlay-scrim-soft': withAlpha('#05060a', 0.58),
    '--color-overlay-foreground': semantic.text.onOverlay.css,
    '--color-overlay-foreground-muted': withAlpha('#ffffff', 0.76)
  }
}

function flattenSemanticVariables(semantic: Record<string, Record<string, TokenLeaf>>) {
  const variables: Record<string, string> = {}

  for (const [groupName, groupValues] of Object.entries(semantic)) {
    for (const [tokenName, leaf] of Object.entries(groupValues)) {
      variables[`--${groupName}-${tokenName.replaceAll('.', '-')}`] = leaf.css
    }
  }

  return variables
}

export function buildThemeSnapshot(input: {
  appearance: ResolvedAppearance
  accentHex: string
  mode: ThemeMode
}): ThemeSnapshot {
  const primitives = buildPrimitives(input.appearance, input.accentHex, input.mode)
  const semantic = compileSemanticTokens(primitives)

  return {
    resolvedAppearance: input.appearance,
    mode: input.mode,
    cssVariables: {
      ...flattenSemanticVariables(semantic),
      ...createLegacyAliases(semantic),
      ...createLayoutVariables(input.appearance),
    },
  }
}
