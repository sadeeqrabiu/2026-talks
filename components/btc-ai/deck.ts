import { computed, reactive } from 'vue'
import { useNav, useSlideContext } from '@slidev/client'

/* Total slides in the AI × Bitcoin talk */
export const BAI_TOTAL = 13

/* Live numbers the canvas backdrop shares with the slides. */
export const baiStats = reactive({ contributors: 1 })

/* Slides poke the persistent backdrop through this: ripples, the fork tear. */
export type BaiSignal = { type: 'ripple', x: number, y: number } | { type: 'fork' }
const listeners = new Set<(s: BaiSignal) => void>()
export const emitBai = (s: BaiSignal) => listeners.forEach(fn => fn(s))
export function onBai(fn: (s: BaiSignal) => void) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

/* Slidev keeps neighbouring slides mounted, so demos start on this, not on mount. */
export function useBaiActive() {
  const { $page } = useSlideContext()
  const nav = useNav()
  return computed(() => nav.currentPage.value === $page.value)
}

/* Same PRNG as the Talk 03 contribution graph: the network grows the same way every run. */
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

/* White pixel icons, drawn by both the backdrop canvas and BaiPixel. */
export const PIXELS: Record<string, string[]> = {
  bot: [
    '..#.....#..',
    '...#...#...',
    '..#######..',
    '.##.###.##.',
    '###########',
    '#.#######.#',
    '#.#.....#.#',
    '...##.##...',
  ],
  person: [
    '...###...',
    '...###...',
    '...###...',
    '.........',
    '..#####..',
    '.#######.',
    '.#######.',
    '.#######.',
  ],
  flask: [
    '..#####..',
    '...#.#...',
    '...#.#...',
    '...#.#...',
    '..#...#..',
    '.#.....#.',
    '.#.###.#.',
    '#.#####.#',
    '.#######.',
  ],
  pin: [
    '..#####..',
    '.##...##.',
    '.#..#..#.',
    '.#.###.#.',
    '.#..#..#.',
    '.##...##.',
    '..##.##..',
    '...###...',
    '....#....',
  ],
  doc: [
    '#####...',
    '#...##..',
    '#...###.',
    '#.....#.',
    '#.###.#.',
    '#.....#.',
    '#.###.#.',
    '#.....#.',
    '#######.',
  ],
  btc: [
    '..#.#....',
    '#######..',
    '.##...##.',
    '.##...##.',
    '.######..',
    '.##...##.',
    '.##...##.',
    '.##...##.',
    '#######..',
    '..#.#....',
  ],
  block: [
    '..#####..',
    '.#.....#.',
    '#######.#',
    '#.....#.#',
    '#.....#.#',
    '#.....#.#',
    '#.....##.',
    '#######..',
  ],
  alert: [
    '....#....',
    '...###...',
    '...#.#...',
    '..##.##..',
    '..##.##..',
    '.#######.',
    '.###.###.',
    '#########',
  ],
  ghost: [
    '..#####..',
    '.#######.',
    '##.###.##',
    '##.###.##',
    '#########',
    '#########',
    '#########',
    '#.##.##.#',
  ],
  gauge: [
    '..#####..',
    '.#.....#.',
    '#.....#.#',
    '#....#..#',
    '#...#...#',
    '#.......#',
    '.#.....#.',
    '..#####..',
  ],
  fork: [
    '.......##',
    '......#..',
    '.....#...',
    '##..#....',
    '..##.....',
    '##..#....',
    '.....#...',
    '......#..',
    '.......##',
  ],
  chat: [
    '#########',
    '#.......#',
    '#.......#',
    '#.......#',
    '#########',
    '..##.....',
    '..#......',
  ],
  plug: [
    '..#.#..',
    '..#.#..',
    '#######',
    '#######',
    '.#####.',
    '..###..',
    '...#...',
    '...#...',
  ],
  key: [
    '.###.......',
    '#...#######',
    '#...#..#.#.',
    '.###.......',
  ],
}

/* Pixel cat from the concept art. # ink, w eye, o nose. */
export const CAT = {
  sit: [
    '..........#...#.',
    '..........##.##.',
    '..........#####.',
    '.........#w###w#',
    '#........#######',
    '##........##o##.',
    '.#.......#####..',
    '.#..##########..',
    '.##############.',
    '..#############.',
    '...###########..',
  ],
  walkA: [
    '..........#...#.',
    '#.........##.##.',
    '#.........#####.',
    '##.......#w###w#',
    '.#.......#######',
    '.##.......##o##.',
    '..#############.',
    '..#############.',
    '..############..',
    '..##.##...##.##.',
    '..#...#...#...#.',
  ],
  walkB: [
    '..........#...#.',
    '.#........##.##.',
    '#.........#####.',
    '#........#w###w#',
    '##.......#######',
    '.#........##o##.',
    '.##############.',
    '..#############.',
    '..############..',
    '...###.....###..',
    '...#.#.....#.#..',
  ],
}
