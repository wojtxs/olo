import type { CSSProperties } from "react";
import { TENSION_WIDTH, tensionPath } from "@/app/lib/tension";

// Odcinek jednej linii, która biegnie przez całą stronę. Kiedy wjeżdża na ekran,
// rozluźnia się z napięcia `from` do `to` — tak jak mięsień pod dłonią.
export function TensionLine({
  from,
  to,
  height = 160,
  seed = 1,
  hero = false,
  className = "",
}: {
  from: number;
  to: number;
  height?: number;
  seed?: number;
  hero?: boolean;
  className?: string;
}) {
  const tense = tensionPath(from, { height, seed });
  const calm = tensionPath(to, { height, seed });
  const style = { "--d-from": `path("${tense}")`, "--d-to": `path("${calm}")` } as CSSProperties;

  return (
    <div className={`tension ${hero ? "tension-hero" : ""} ${className}`} aria-hidden="true">
      <svg viewBox={`0 0 ${TENSION_WIDTH} ${height}`} preserveAspectRatio="none" className="block h-full w-full overflow-visible">
        <path d={tense} className="tension-path" style={style} vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
