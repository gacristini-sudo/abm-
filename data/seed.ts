// Deterministic PRNG so mock data is identical between server and client renders.
export function mulberry32(seed: number) {
  let a = seed;
  return function rand() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createRng(seed = 42) {
  const rand = mulberry32(seed);
  return {
    float: (min = 0, max = 1) => min + rand() * (max - min),
    int: (min: number, max: number) => Math.floor(min + rand() * (max - min + 1)),
    pick<T>(arr: readonly T[]): T {
      return arr[Math.floor(rand() * arr.length)];
    },
    pickMultiple<T>(arr: readonly T[], count: number): T[] {
      // Fisher-Yates, not `sort(() => rand() - 0.5)` — a sort comparator's call
      // count is engine-defined, so that trick desyncs Node's V8 vs the browser's,
      // breaking SSR/CSR determinism for everything drawn from the rng afterward.
      const shuffled = [...arr];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled.slice(0, count);
    },
    bool: (probability = 0.5) => rand() < probability,
    raw: rand,
  };
}

export const rng = createRng(7);

export function daysAgoIso(days: number): string {
  const d = new Date("2026-07-16T12:00:00Z");
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

export function daysFromNowIso(days: number): string {
  const d = new Date("2026-07-16T12:00:00Z");
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

export function series(length: number, base: number, volatility: number, r = rng): number[] {
  const out: number[] = [];
  let value = base;
  for (let i = 0; i < length; i++) {
    value = Math.max(0, value + r.float(-volatility, volatility));
    out.push(Math.round(value));
  }
  return out;
}
