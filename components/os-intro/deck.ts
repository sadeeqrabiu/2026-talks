/* Total slides in open-source-intro */
export const OS_TOTAL = 20

/* One switch for the costume layer — flip to false after Halloween. */
export const HALLOWEEN = true

/* Deterministic PRNG so the contribution graph looks the same every run. */
export function seeded(seed = 7) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* Critically-damped-ish spring stepper shared by the rail and counters. */
export function springStep(x: number, v: number, target: number, dt: number, k = 170, c = 24) {
  const a = k * (target - x) - c * v
  v += a * dt
  x += v * dt
  return [x, v] as const
}
