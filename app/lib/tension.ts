// Linia napięcia: przy t = 1 poszarpana i nieregularna jak spięty mięsień,
// przy t = 0 spokojna, prosta. Każda ścieżka ma tę samą liczbę segmentów,
// więc CSS może płynnie przejść z jednej w drugą (właściwość `d`).

export const TENSION_WIDTH = 1200;

type Options = { width?: number; height?: number; segments?: number; seed?: number; vertical?: boolean };

// Deterministyczny pseudolosowy szum, żeby serwer i przeglądarka rysowały to samo.
const noise = (i: number, seed: number) => {
  const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const round = (n: number) => Math.round(n * 10) / 10;

function points(tensionAt: (u: number) => number, { width = TENSION_WIDTH, height = 160, segments = 24, seed = 1 }: Options) {
  const mid = height / 2;
  const maxAmp = height * 0.42;
  const dx = width / segments;
  return Array.from({ length: segments + 1 }, (_, i) => {
    const t = tensionAt(i / segments);
    const edge = i === 0 || i === segments ? 0 : 1;
    // Przy dużym napięciu szczyty są nierówne i rozstawione nieregularnie (splątany mięsień,
    // nie zapis EKG); przy małym linia staje się równą, spokojną falą.
    const jitter = 1 + (noise(i, seed) - 0.5) * 1.3 * t;
    const shift = (noise(i + 101, seed) - 0.5) * 0.7 * t * edge;
    const amp = maxAmp * Math.pow(t, 0.9) * Math.max(0.15, jitter) * edge;
    return { x: (i + shift) * dx, y: mid + (i % 2 ? -amp : amp), t, dx };
  });
}

function toPath(pts: ReturnType<typeof points>, vertical = false) {
  // W wariancie pionowym zamieniamy osie: linia biegnie z góry na dół.
  const p = (x: number, y: number) => (vertical ? `${round(y)} ${round(x)}` : `${round(x)} ${round(y)}`);
  let d = `M${p(pts[0].x, pts[0].y)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    // Napięta linia ma ostre załamania (krótkie uchwyty), rozluźniona — łagodne łuki.
    const h = 0.5 - 0.38 * Math.max(a.t, b.t);
    d += `C${p(a.x + a.dx * h, a.y)} ${p(b.x - a.dx * h, b.y)} ${p(b.x, b.y)}`;
  }
  return d;
}

/** Linia o stałym napięciu t (0–1). */
export function tensionPath(t: number, options: Options = {}) {
  return toPath(points(() => t, options), options.vertical);
}

/** Linia, której napięcie maleje od `from` do `to` wzdłuż szerokości. */
export function easingTensionPath(from: number, to: number, options: Options = {}) {
  return toPath(points((u) => from + (to - from) * u, options), options.vertical);
}
