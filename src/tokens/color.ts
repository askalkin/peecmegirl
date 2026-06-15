type RgbColor = {
  r: number
  g: number
  b: number
}

type OklchColor = {
  l: number
  c: number
  h: number
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function srgbToLinear(value: number) {
  const normalized = value / 255
  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4
}

function linearToSrgb(value: number) {
  const normalized =
    value <= 0.0031308 ? value * 12.92 : 1.055 * value ** (1 / 2.4) - 0.055

  return Math.round(clamp(normalized, 0, 1) * 255)
}

function sanitizeHex(hex: string) {
  const value = hex.replace('#', '').trim()

  if (value.length === 3) {
    return value
      .split('')
      .map((part) => `${part}${part}`)
      .join('')
  }

  return value.slice(0, 6)
}

export function hexToRgb(hex: string): RgbColor {
  const normalized = sanitizeHex(hex)

  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  }
}

export function rgbToHex({ r, g, b }: RgbColor) {
  return `#${[r, g, b]
    .map((channel) => clamp(channel, 0, 255).toString(16).padStart(2, '0'))
    .join('')}`
}

export function hexToOklch(hex: string): OklchColor {
  const { r, g, b } = hexToRgb(hex)

  const lr = srgbToLinear(r)
  const lg = srgbToLinear(g)
  const lb = srgbToLinear(b)

  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb

  const lRoot = Math.cbrt(l)
  const mRoot = Math.cbrt(m)
  const sRoot = Math.cbrt(s)

  const labL =
    0.2104542553 * lRoot + 0.793617785 * mRoot - 0.0040720468 * sRoot
  const labA =
    1.9779984951 * lRoot - 2.428592205 * mRoot + 0.4505937099 * sRoot
  const labB =
    0.0259040371 * lRoot + 0.7827717662 * mRoot - 0.808675766 * sRoot

  return {
    l: labL,
    c: Math.sqrt(labA ** 2 + labB ** 2),
    h: (Math.atan2(labB, labA) * 180) / Math.PI + 360,
  }
}

function oklchToRgb(color: OklchColor): RgbColor {
  const hue = Number.isFinite(color.h) ? color.h : 0
  const angle = (hue * Math.PI) / 180

  const a = color.c * Math.cos(angle)
  const b = color.c * Math.sin(angle)

  const lRoot = color.l + 0.3963377774 * a + 0.2158037573 * b
  const mRoot = color.l - 0.1055613458 * a - 0.0638541728 * b
  const sRoot = color.l - 0.0894841775 * a - 1.291485548 * b

  const l = lRoot ** 3
  const m = mRoot ** 3
  const s = sRoot ** 3

  const lr = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
  const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
  const lb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s

  return {
    r: linearToSrgb(lr),
    g: linearToSrgb(lg),
    b: linearToSrgb(lb),
  }
}

function isInGamut({ r, g, b }: RgbColor) {
  return [r, g, b].every((channel) => channel >= 0 && channel <= 255)
}

export function oklchToHex(color: OklchColor) {
  let candidate = { ...color }
  let rgb = oklchToRgb(candidate)

  if (!isInGamut(rgb)) {
    for (let index = 0; index < 24; index += 1) {
      candidate = { ...candidate, c: candidate.c * 0.92 }
      rgb = oklchToRgb(candidate)

      if (isInGamut(rgb)) break
    }
  }

  return rgbToHex(rgb)
}

export function formatOklch(hex: string, alpha?: number) {
  const color = hexToOklch(hex)
  const base = `oklch(${(color.l * 100).toFixed(2)}% ${color.c.toFixed(4)} ${(
    ((color.h % 360) + 360) %
    360
  ).toFixed(2)}`

  return alpha === undefined ? `${base})` : `${base} / ${alpha})`
}

export function withAlpha(hex: string, alpha: number) {
  return formatOklch(hex, alpha)
}

export function contrastRatio(foregroundHex: string, backgroundHex: string) {
  const fg = hexToRgb(foregroundHex)
  const bg = hexToRgb(backgroundHex)

  const relativeLuminance = ({ r, g, b }: RgbColor) => {
    const [lr, lg, lb] = [r, g, b].map(srgbToLinear)
    return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb
  }

  const foregroundLuminance = relativeLuminance(fg)
  const backgroundLuminance = relativeLuminance(bg)

  const lighter = Math.max(foregroundLuminance, backgroundLuminance)
  const darker = Math.min(foregroundLuminance, backgroundLuminance)

  return (lighter + 0.05) / (darker + 0.05)
}

export function pickAccessibleTextColor(
  backgroundHex: string,
  lightHex: string,
  darkHex: string
) {
  return contrastRatio(lightHex, backgroundHex) >= contrastRatio(darkHex, backgroundHex)
    ? lightHex
    : darkHex
}

export function shiftHue(hue: number, amount: number) {
  return ((hue + amount) % 360 + 360) % 360
}

export function clampOklch(color: OklchColor): OklchColor {
  return {
    l: clamp(color.l, 0, 1),
    c: clamp(color.c, 0, 0.37),
    h: ((color.h % 360) + 360) % 360,
  }
}
