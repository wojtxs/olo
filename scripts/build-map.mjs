// Generuje uproszczoną mapę Sochaczewa i okolic z danych OpenStreetMap
// (© współtwórcy OpenStreetMap, licencja ODbL) do app/components/map-data.ts.
// Uruchom ręcznie: node scripts/build-map.mjs

import { writeFileSync } from "node:fs";

const BBOX = { south: 52.17, west: 20.12, north: 52.29, east: 20.36 };
const CITY = { lat: 52.2295, lon: 20.2384 };
const WIDTH = 1000;

const query = `
[out:json][timeout:90];
(
  way["highway"~"^(motorway|trunk|primary|secondary)$"](${BBOX.south},${BBOX.west},${BBOX.north},${BBOX.east});
  way["highway"="tertiary"](52.205,20.19,52.255,20.29);
  way["waterway"="river"](${BBOX.south},${BBOX.west},${BBOX.north},${BBOX.east});
  way["railway"="rail"]["service"!~"."](${BBOX.south},${BBOX.west},${BBOX.north},${BBOX.east});
);
out geom;
`;

const res = await fetch("https://overpass-api.de/api/interpreter", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
    "User-Agent": "aleksanderpawlowski-site-map/1.0 (build script)",
  },
  body: "data=" + encodeURIComponent(query),
});
if (!res.ok) throw new Error(`Overpass ${res.status}`);
const data = await res.json();

const k = Math.cos((CITY.lat * Math.PI) / 180);
const spanX = (BBOX.east - BBOX.west) * k;
const spanY = BBOX.north - BBOX.south;
const HEIGHT = Math.round((WIDTH * spanY) / spanX);
const project = ({ lat, lon }) => [
  ((lon - BBOX.west) * k * WIDTH) / spanX,
  ((BBOX.north - lat) * HEIGHT) / spanY,
];

function simplify(points, tolerance) {
  if (points.length < 3) return points;
  const [a, b] = [points[0], points[points.length - 1]];
  let maxD = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const [x, y] = points[i];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy) || 1;
    const d = Math.abs(dy * x - dx * y + b[0] * a[1] - b[1] * a[0]) / len;
    if (d > maxD) {
      maxD = d;
      index = i;
    }
  }
  if (maxD <= tolerance) return [a, b];
  return [...simplify(points.slice(0, index + 1), tolerance).slice(0, -1), ...simplify(points.slice(index), tolerance)];
}

const layers = { major: [], minor: [], river: [], rail: [] };
for (const el of data.elements) {
  if (!el.geometry) continue;
  const t = el.tags ?? {};
  const layer = t.waterway
    ? "river"
    : t.railway
      ? "rail"
      : ["motorway", "trunk", "primary"].includes(t.highway)
        ? "major"
        : "minor";
  const pts = simplify(el.geometry.map(project), layer === "river" ? 0.8 : 1.2);
  if (pts.length < 2) continue;
  layers[layer].push("M" + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L"));
}

const [cx, cy] = project(CITY);
const out = `// Wygenerowane przez scripts/build-map.mjs. Dane: © współtwórcy OpenStreetMap (ODbL).
export const mapData = {
  width: ${WIDTH},
  height: ${HEIGHT},
  city: { x: ${cx.toFixed(1)}, y: ${cy.toFixed(1)} },
  major: ${JSON.stringify(layers.major.join(""))},
  minor: ${JSON.stringify(layers.minor.join(""))},
  river: ${JSON.stringify(layers.river.join(""))},
  rail: ${JSON.stringify(layers.rail.join(""))},
} as const;
`;
writeFileSync(new URL("../app/components/map-data.ts", import.meta.url), out);
console.log("map-data.ts", Math.round(out.length / 1024) + " KB", layers);
