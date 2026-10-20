import type { CSSProperties } from "react";
import { MARK_BOX, markHand, markShoulders, markSpine, markStill, type MarkBox, type MarkPart } from "@/app/components/hero-mark-paths";

const [VX, VY, VW, VH] = MARK_BOX;

// Pozycja części w procentach całego znaku
const place = ([x, y, w, h]: MarkBox): CSSProperties => ({
  left: `${((x - VX) / VW) * 100}%`,
  top: `${((y - VY) / VH) * 100}%`,
  width: `${(w / VW) * 100}%`,
  height: `${(h / VH) * 100}%`,
});

function Shape({ part, className = "" }: { part: MarkPart; className?: string }) {
  return (
    <svg viewBox={part.box.join(" ")} preserveAspectRatio="none" className={className}>
      <path d={part.d} fillRule="evenodd" />
    </svg>
  );
}

// Znak z logo rozłożony na warstwy, żeby mógł „masować”: dłoń sunie w górę pleców,
// ciepło biegnie po kręgosłupie od dołu do góry, a barki na końcu lekko opadają — ulga.
// Każda ruchoma część to osobna warstwa animowana tylko przez transform i opacity,
// więc pętla nie przemalowuje znaku. Ruch jest w globals.css („Znak w hero”).
export function HeroMark() {
  const n = markSpine.length;

  return (
    <div className="hero-mark" data-vy={VY} data-vh={VH} aria-hidden="true">
      <div className="mark-part mark-still" style={place(markStill.box)}>
        <Shape part={markStill} />
      </div>
      <div className="mark-part mark-shoulders" style={place(markShoulders.box)}>
        <Shape part={markShoulders} />
      </div>
      {markHand.map((part, i) => (
        <div key={i} className="mark-part mark-hand" style={{ ...place(part.box), "--o": i } as CSSProperties}>
          <Shape part={part} />
        </div>
      ))}
      {markSpine.map((part, i) => (
        <div
          key={i}
          className="mark-part mark-vert"
          data-cy={part.box[1] + part.box[3] / 2}
          style={{ ...place(part.box), "--i": i, "--up": n - 1 - i } as CSSProperties}
        >
          <Shape part={part} />
          <Shape part={part} className="mark-warm" />
          <Shape part={part} className="mark-heat" />
        </div>
      ))}
    </div>
  );
}
