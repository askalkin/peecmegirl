const HERO_MORPH_DISTANCE_MIN = 520
const HERO_MORPH_DISTANCE_MAX = 820
const HERO_MORPH_DISTANCE_RATIO = 0.74

export function getHeroMorphDistance(viewportHeight: number) {
  return Math.max(
    HERO_MORPH_DISTANCE_MIN,
    Math.min(HERO_MORPH_DISTANCE_MAX, viewportHeight * HERO_MORPH_DISTANCE_RATIO)
  )
}
