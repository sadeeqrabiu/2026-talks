<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useNav } from '@slidev/client'
import { baiStats, onBai, PIXELS, seeded } from './deck'

/*
  One canvas behind every slide, so nothing resets between them. Tiles walk the grid
  to their next spot, wires redraw, cells misfire on the risk slide, and the closing
  slide grows a contributor network. The pointer heats cells as it passes.
*/
const W = 980
const H = 551.25
const COLS = 16
const ROWS = 9
const CELL = W / COLS

const nav = useNav()
const canvas = ref<HTMLCanvasElement>()
const fm = computed<Record<string, any>>(() => nav.currentSlideRoute.value?.meta?.slide?.frontmatter ?? {})

type Spot = [c: number, r: number, s: number]
interface Scene { glitch?: boolean, tiles: Record<string, Spot>, wires: number[][][] }

const ICONS: Record<string, string> = {
  bot: 'bot',
  btc: 'btc',
  chat: 'chat',
  doc: 'doc',
  plug: 'plug',
  key: 'key',
  block: 'block',
  person: 'person',
}

/* Most slides only need tiles along the top and bottom rows, wired in sequence. */
type Band = [id: string, c: number][]
function band(top: Band, bottom: Band = [], glitch = false): Scene {
  const tiles: Record<string, Spot> = {}
  Object.keys(ICONS).forEach((id, i) => (tiles[id] = [1 + i * 2, 10, 1]))
  top.forEach(([id, c]) => (tiles[id] = [c, 0, 1]))
  bottom.forEach(([id, c]) => (tiles[id] = [c, 8, 1]))
  const link = (row: Band, y: number) =>
    row.slice(1).map(([, c], i) => [[row[i][1] + 1, y], [c, y]])
  return { glitch, tiles, wires: [...link(top, 0.5), ...link(bottom, 8.5)] }
}

const SCENES: Record<string, Scene> = {
  title: {
    tiles: {
      bot: [12, 1, 2],
      btc: [10, 5, 2],
      doc: [9, 0, 1],
      block: [12, 4, 1],
      plug: [15, 4, 1],
      key: [14, 7, 1],
      chat: [14, 5, 1],
      person: [15, 1, 1],
    },
    wires: [
      [[9.5, 1], [9.5, 2], [12, 2]],
      [[12.5, 3], [12.5, 4]],
      [[12.5, 5], [12.5, 6], [12, 6]],
      [[15.5, 4], [15.5, 2.5], [14, 2.5]],
      [[14, 7.5], [11, 7.5], [11, 7]],
      [[15, 1.5], [14, 1.5]],
    ],
  },
  gate: {
    tiles: {
      doc: [8, 0, 1],
      plug: [10, 0, 1],
      bot: [13, 0, 1],
      person: [0, 8, 1],
      btc: [6, 8, 1],
      block: [10, 8, 1],
      chat: [12, 8, 1],
      key: [15, 8, 1],
    },
    wires: [
      [[9, 0.5], [10, 0.5]],
      [[11, 0.5], [13, 0.5]],
      [[1, 8.5], [6, 8.5]],
      [[7, 8.5], [10, 8.5]],
      [[13, 8.5], [15, 8.5]],
    ],
  },
  uses: {
    tiles: {
      block: [5, 0, 1],
      doc: [8, 0, 1],
      bot: [10, 0, 1],
      btc: [13, 0, 1],
      person: [0, 8, 1],
      key: [2, 8, 1],
      chat: [-2, 4, 1],
      plug: [17, 4, 1],
    },
    wires: [
      [[6, 0.5], [8, 0.5]],
      [[9, 0.5], [10, 0.5]],
      [[11, 0.5], [13, 0.5]],
      [[1, 8.5], [2, 8.5]],
    ],
  },
  risks: band([['key', 8], ['block', 10], ['bot', 13]], [], true),
  whoami: band([['doc', 8], ['plug', 10], ['bot', 13]], [['person', 0], ['btc', 6], ['block', 11], ['key', 15]]),
  join: band([['btc', 7], ['chat', 13]], [['person', 0], ['plug', 3], ['key', 7]]),
  open: band([['btc', 10], ['block', 13]]),
  map: band([['plug', 8], ['chat', 10], ['key', 13]]),
  change: band([['doc', 9], ['block', 11], ['btc', 13]]),
  funds: band([['key', 8], ['person', 11], ['btc', 13]]),
  review: band([['bot', 11], ['person', 13]]),
  rules: band([['doc', 8], ['person', 10], ['block', 13]]),
  closing: {
    tiles: {
      bot: [14, 7, 1],
      btc: [17, 0, 1],
      doc: [17, 2, 1],
      block: [17, 4, 1],
      plug: [17, 6, 1],
      key: [17, 8, 1],
      chat: [-2, 2, 1],
      person: [-2, 6, 1],
    },
    wires: [],
  },
}

const sceneKey = computed(() => (SCENES[fm.value.scene] ? fm.value.scene as string : 'title'))

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)
const back = (t: number) => 1 + 2.4 * (t - 1) ** 3 + 1.4 * (t - 1) ** 2
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/* A polyline in cell units, sampled with rounded corners so it can be trimmed by length. */
function buildWire(pts: number[][], radius = 9) {
  const px = pts.map(([c, r]) => [c * CELL, r * CELL])
  const out: number[][] = [px[0]]
  for (let i = 1; i < px.length - 1; i++) {
    const [a, b, c] = [px[i - 1], px[i], px[i + 1]]
    const la = Math.hypot(b[0] - a[0], b[1] - a[1])
    const lc = Math.hypot(c[0] - b[0], c[1] - b[1])
    const rr = Math.min(radius, la / 2, lc / 2)
    const p0 = [b[0] + ((a[0] - b[0]) / la) * rr, b[1] + ((a[1] - b[1]) / la) * rr]
    const p1 = [b[0] + ((c[0] - b[0]) / lc) * rr, b[1] + ((c[1] - b[1]) / lc) * rr]
    for (let k = 0; k <= 6; k++) {
      const t = k / 6
      out.push([
        (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * b[0] + t ** 2 * p1[0],
        (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * b[1] + t ** 2 * p1[1],
      ])
    }
  }
  if (px.length > 1) out.push(px[px.length - 1])
  const len = [0]
  for (let i = 1; i < out.length; i++) len.push(len[i - 1] + Math.hypot(out[i][0] - out[i - 1][0], out[i][1] - out[i - 1][1]))
  return { pts: out, len, total: len[len.length - 1] }
}
type Wire = ReturnType<typeof buildWire>

function along(w: Wire, d: number) {
  let i = 1
  while (i < w.len.length - 1 && w.len[i] < d) i++
  const t = (d - w.len[i - 1]) / Math.max(0.001, w.len[i] - w.len[i - 1])
  return [lerp(w.pts[i - 1][0], w.pts[i][0], clamp(t)), lerp(w.pts[i - 1][1], w.pts[i][1], clamp(t))]
}

/* Field decoration: soft lighter squares, as in the concept art */
const rnd0 = seeded(21)
const PATCHES = Array.from({ length: 18 }, () => ({
  c: Math.floor(rnd0() * COLS),
  r: Math.floor(rnd0() * ROWS),
  s: rnd0() > 0.72 ? 2 : 1,
  a: 0.035 + rnd0() * 0.055,
}))

const calm = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

const heat = new Float32Array(COLS * ROWS)
const ripples: { x: number, y: number, t0: number }[] = []
let tear = 0 // 0..1 fissure across the field after a fork
let shake = 0

/* ── Tiles ── */
interface Tile { id: string, x: number, y: number, s: number, a: number, f: number[], to: number[], t0: number, dur: number }
const tiles: Tile[] = Object.keys(ICONS).map((id) => {
  const [c, r, s] = SCENES.title.tiles[id]
  return { id, x: c, y: r, s, a: 1, f: [c, r, s, 1], to: [c, r, s, 1], t0: 0, dur: 1 }
})

/* ── Wires ── */
let wires: { w: Wire, t0: number, phase: number }[] = []
let oldWires: typeof wires = []
let oldT0 = 0

function enterScene(key: string, now: number) {
  const scene = SCENES[key]
  tiles.forEach((t, i) => {
    const [c, r, s] = scene.tiles[t.id]
    t.f = [t.x, t.y, t.s, t.a]
    t.to = [c, r, s, 1]
    t.t0 = now + i * 55
    t.dur = calm ? 1 : 950
  })
  oldWires = wires
  oldT0 = now
  wires = scene.wires.map((pts, i) => ({ w: buildWire(pts), t0: now + 750 + i * 110, phase: i * 0.37 }))
  if (key === 'closing') resetGrowth(now)
}

/* ── Contributor network (closing slide) ── */
interface Node { c: number, r: number, born: number }
interface Branch { w: Wire, born: number }
let nodes: Node[] = []
let branches: Branch[] = []
let pending = 0
let nextGrow = 0
let rnd = seeded(5)
const SEED = { c: 12, r: 4 }
let botWire: Wire | null = null

function resetGrowth(now: number) {
  rnd = seeded(5)
  nodes = [{ c: SEED.c, r: SEED.r, born: now + 900 }]
  branches = []
  pending = 11
  nextGrow = now + 1500
  baiStats.contributors = 1
  botWire = buildWire([[14.5, 7], [14.5, 4.5], [13, 4.5]])
}

// The network routes around the statement, the hint, the counter and the AI tile.
const blocked = (c: number, r: number) =>
  c < 0 || c >= COLS || r < 0 || r >= ROWS
  || (c < 10 && r >= 1 && r <= 7)
  || (c < 3 && r === 0)
  || (c >= 14 && r === 0)
  || (c < 6 && r === 8)
  || (c === 14 && r === 7)

function grow(now: number) {
  // Prefer roomy spots; once those run out, packing tiles side by side is fine.
  for (let tries = 0; tries < 240; tries++) {
    const spacing = tries < 80 ? 1 : 0
    const from = nodes[Math.floor(rnd() * nodes.length)]
    const [dx, dy] = [[1, 0], [-1, 0], [0, 1], [0, -1]][Math.floor(rnd() * 4)]
    const a = (spacing ? 2 : 1) + Math.floor(rnd() * 2)
    const b = rnd() > 0.5 ? Math.floor(rnd() * 5) - 2 : 0
    const mid = { c: from.c + dx * a, r: from.r + dy * a }
    const end = { c: mid.c + (dy ? b : 0), r: mid.r + (dx ? b : 0) }
    if (blocked(mid.c, mid.r) || blocked(end.c, end.r)) continue
    if (nodes.some(n => Math.abs(n.c - end.c) <= spacing && Math.abs(n.r - end.r) <= spacing)) continue
    const pts = [[from.c + 0.5, from.r + 0.5], [mid.c + 0.5, mid.r + 0.5]]
    if (b) pts.push([end.c + 0.5, end.r + 0.5])
    const w = buildWire(pts)
    const born = now + w.total * 1.6
    branches.push({ w, born: now })
    nodes.push({ c: end.c, r: end.r, born })
    setTimeout(() => (baiStats.contributors = nodes.length), w.total * 1.6)
    return
  }
  pending = 0 // Every cell is taken
}

/* ── Drawing ── */
function drawIcon(ctx: CanvasRenderingContext2D, name: string, cx: number, cy: number, px: number) {
  const g = PIXELS[name]
  const x0 = cx - (g[0].length * px) / 2
  const y0 = cy - (g.length * px) / 2
  for (let y = 0; y < g.length; y++) {
    for (let x = 0; x < g[y].length; x++) {
      if (g[y][x] === '#') ctx.fillRect(x0 + x * px, y0 + y * px, px + 0.2, px + 0.2)
    }
  }
}

function strokeTrim(ctx: CanvasRenderingContext2D, w: Wire, upto: number) {
  ctx.beginPath()
  ctx.moveTo(w.pts[0][0], w.pts[0][1])
  for (let i = 1; i < w.pts.length; i++) {
    if (w.len[i] <= upto) {
      ctx.lineTo(w.pts[i][0], w.pts[i][1])
    }
    else {
      const [x, y] = along(w, upto)
      ctx.lineTo(x, y)
      break
    }
  }
  ctx.stroke()
}


function draw(ctx: CanvasRenderingContext2D, now: number, dt: number) {
  tear = Math.max(0, tear - dt * 0.62)
  shake *= Math.exp(-dt * 7)

  const sx = shake ? (Math.sin(now * 0.09) * shake) : 0
  const sy = shake ? (Math.cos(now * 0.11) * shake) : 0

  // Field
  const g = ctx.createRadialGradient(W * 0.42, H * 0.56, 40, W * 0.5, H * 0.5, W * 0.72)
  g.addColorStop(0, 'rgb(232,68,4)')
  g.addColorStop(0.55, 'rgb(255,92,12)')
  g.addColorStop(1, 'rgb(255,122,26)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)

  ctx.save()
  ctx.translate(sx, sy)

  // Soft patches
  for (const p of PATCHES) {
    ctx.fillStyle = `rgba(255,255,255,${p.a})`
    ctx.fillRect(p.c * CELL, p.r * CELL, p.s * CELL, p.s * CELL)
  }

  // Pointer heat + ripples
  const decay = Math.exp(-dt * 1.9)
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const i = r * COLS + c
      heat[i] *= decay
      let v = heat[i]
      const cx = (c + 0.5) * CELL
      const cy = (r + 0.5) * CELL
      for (const rp of ripples) {
        const age = (now - rp.t0) / 1000
        const radius = age * 620
        const d = Math.max(Math.abs(cx - rp.x), Math.abs(cy - rp.y))
        const band = 1 - clamp(Math.abs(d - radius) / 62)
        v += band * Math.max(0, 1 - age / 1.1) * 0.9
      }
      if (v > 0.012) {
        ctx.fillStyle = `rgba(255,255,255,${clamp(v) * 0.3})`
        ctx.fillRect(c * CELL, r * CELL, CELL, CELL)
      }
    }
  }
  for (let i = ripples.length - 1; i >= 0; i--) {
    if (now - ripples[i].t0 > 1500) ripples.splice(i, 1)
  }

  // Grid: on a fork the field tears open along the middle
  const gap = ease(clamp(tear)) * 26
  ctx.lineWidth = 1
  ctx.strokeStyle = `rgba(255,205,160,0.46)`
  ctx.beginPath()
  const mid = H / 2
  for (let c = 0; c <= COLS; c++) {
    const x = c * CELL + 0.5
    const lean = gap ? Math.sin(c * 1.7) * gap * 0.4 : 0
    ctx.moveTo(x, 0)
    ctx.lineTo(x + lean, mid - gap)
    ctx.moveTo(x - lean, mid + gap)
    ctx.lineTo(x, H)
  }
  for (let r = 0; r <= ROWS; r++) {
    const base = r * CELL + 0.5
    const y = base + (base < mid ? -1 : 1) * gap * (1 - Math.abs(base - mid) / mid)
    ctx.moveTo(0, y)
    ctx.lineTo(W, y)
  }
  ctx.stroke()
  if (gap > 0.5) {
    ctx.fillStyle = `rgba(255,255,235,${clamp(tear * 1.2) * 0.9})`
    ctx.beginPath()
    ctx.moveTo(0, mid)
    for (let c = 0; c <= COLS; c++) ctx.lineTo(c * CELL, mid - gap * (0.25 + 0.2 * Math.sin(c * 2.3)))
    for (let c = COLS; c >= 0; c--) ctx.lineTo(c * CELL, mid + gap * (0.25 + 0.2 * Math.cos(c * 1.9)))
    ctx.fill()
  }

  // Risk slide: a few cells misfire
  if (SCENES[sceneKey.value].glitch && !calm && Math.random() < dt * 9) {
    heat[Math.floor(Math.random() * heat.length)] = 0.8 + Math.random() * 0.8
  }

  // Scene wires
  const inkLine = `rgba(255,255,255`
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  const oldA = 1 - clamp((now - oldT0) / 380)
  if (oldA > 0) {
    ctx.strokeStyle = `${inkLine},${oldA * 0.9})`
    for (const o of oldWires) strokeTrim(ctx, o.w, o.w.total)
  }
  for (const wr of wires) {
    const p = calm ? 1 : ease(clamp((now - wr.t0) / 650))
    if (p <= 0) continue
    ctx.strokeStyle = `${inkLine},0.92)`
    strokeTrim(ctx, wr.w, wr.w.total * p)
    ctx.fillStyle = `${inkLine},1)`
    const [hx, hy] = along(wr.w, wr.w.total * p)
    ctx.fillRect(wr.w.pts[0][0] - 2.5, wr.w.pts[0][1] - 2.5, 5, 5)
    ctx.fillRect(hx - 2.5, hy - 2.5, 5, 5)
    if (p === 1 && !calm) {
      const loop = ((now / 1000) * 0.42 + wr.phase) % 1
      const [px, py] = along(wr.w, wr.w.total * loop)
      ctx.fillRect(px - 2, py - 2, 4, 4)
    }
  }

  // Contributor network
  if (sceneKey.value === 'closing') drawGrowth(ctx, now)

  // Tiles
  for (const t of tiles) {
    const p = clamp((now - t.t0) / t.dur)
    // Walk the grid: along the row first, then the column
    t.x = lerp(t.f[0], t.to[0], ease(clamp(p / 0.55)))
    t.y = lerp(t.f[1], t.to[1], ease(clamp((p - 0.45) / 0.55)))
    t.s = lerp(t.f[2], t.to[2], ease(p))
    t.a = t.to[3]
    const size = t.s * CELL
    let alpha = 1
    if (sceneKey.value === 'closing' && t.id === 'bot') alpha = botFade()
    const x = t.x * CELL
    const y = t.y * CELL
    ctx.fillStyle = `rgba(255,255,255,${0.18 * alpha + 0.02})`
    ctx.fillRect(x, y, size, size)
    ctx.fillStyle = `rgba(255,255,255,${alpha})`
    drawIcon(ctx, ICONS[t.id], x + size / 2, y + size / 2, t.s > 1.4 ? 3.4 : 2.4)
  }

  ctx.restore()
}

const botFade = () => clamp(1 - (nodes.length - 1) / 16, 0.16, 1)

function drawGrowth(ctx: CanvasRenderingContext2D, now: number) {
  if (pending > 0 && now > nextGrow && nodes.length < 54) {
    grow(now)
    pending--
    nextGrow = now + (calm ? 0 : 340)
  }
  // The AI link: dashed, thinning as the network stands on its own
  if (botWire && now > nodes[0].born) {
    const alpha = botFade()
    ctx.save()
    ctx.setLineDash([4, 6])
    ctx.lineDashOffset = -now * 0.02
    ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.95})`
    ctx.lineWidth = 1.5
    strokeTrim(ctx, botWire, botWire.total)
    ctx.restore()
  }
  ctx.lineWidth = 1
  ctx.strokeStyle = 'rgba(255,255,255,0.9)'
  for (const b of branches) strokeTrim(ctx, b.w, clamp((now - b.born) / 1.6, 0, b.w.total))
  for (const n of nodes) {
    const p = clamp((now - n.born) / 420)
    if (p <= 0) continue
    const k = back(p)
    const size = CELL * k
    const cx = (n.c + 0.5) * CELL
    const cy = (n.r + 0.5) * CELL
    ctx.fillStyle = n === nodes[0] ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.2)'
    ctx.fillRect(cx - size / 2, cy - size / 2, size, size)
    ctx.fillStyle = n === nodes[0] ? '#ff5c0a' : '#ffffff'
    drawIcon(ctx, 'person', cx, cy, 2.4 * k)
  }
}

/* ── Loop ── */
let raf = 0
let last = 0
let ctx2d: CanvasRenderingContext2D | null = null
let rect = { left: 0, top: 0, width: W, height: H }

function frame(now: number) {
  const el = canvas.value
  if (el && ctx2d) {
    const b = el.getBoundingClientRect()
    rect = b
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const bw = Math.max(1, Math.round(b.width * dpr))
    const bh = Math.max(1, Math.round(b.height * dpr))
    if (el.width !== bw || el.height !== bh) {
      el.width = bw
      el.height = bh
    }
    ctx2d.setTransform(bw / W, 0, 0, bh / H, 0, 0)
    draw(ctx2d, now, Math.min(0.05, (now - last) / 1000))
  }
  last = now
  raf = requestAnimationFrame(frame)
}

const toSlide = (e: PointerEvent) => [((e.clientX - rect.left) / rect.width) * W, ((e.clientY - rect.top) / rect.height) * H]

function onMove(e: PointerEvent) {
  const [x, y] = toSlide(e)
  const c = Math.floor(x / CELL)
  const r = Math.floor(y / CELL)
  if (c < 0 || c >= COLS || r < 0 || r >= ROWS) return
  heat[r * COLS + c] = 1
}

function onDown(e: PointerEvent) {
  // Nav bar and on-slide controls keep their own click; everything else is fair game
  if ((e.target as HTMLElement)?.closest?.('button, a, nav, .cat')) return
  const [x, y] = toSlide(e)
  if (x < 0 || x > W || y < 0 || y > H) return
  ripples.push({ x, y, t0: performance.now() })
  if (sceneKey.value === 'closing') pending += 3
}

let offBus: (() => void) | undefined

watch(sceneKey, k => enterScene(k, performance.now()))

onMounted(() => {
  ctx2d = canvas.value?.getContext('2d') ?? null
  last = performance.now()
  enterScene(sceneKey.value, last)
  raf = requestAnimationFrame(frame)
  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerdown', onDown)
  offBus = onBai((s) => {
    const now = performance.now()
    if (s.type === 'ripple') {
      ripples.push({ x: s.x, y: s.y, t0: now })
    }
    else {
      tear = 1
      shake = calm ? 0 : 9
      ripples.push({ x: W / 2, y: H / 2, t0: now })
    }
  })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerdown', onDown)
  offBus?.()
})
</script>

<template>
  <canvas ref="canvas" class="absolute inset-0 w-full h-full block" aria-hidden="true" />
</template>
