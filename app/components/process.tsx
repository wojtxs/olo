import { cta, process } from "@/app/content";
import { ArrowRight } from "@/app/components/icons";
import { CourtLines } from "@/app/components/court-lines";

// Pozycje kroków na połowie boiska: od rezerwacji pod własnym koszem aż po „rzut” przy obręczy.
const markers = [
  { x: 90, y: 410 },
  { x: 410, y: 340 },
  { x: 250, y: 262 },
  { x: 110, y: 150 },
  { x: 250, y: 84 },
];
const PLAY = "M90 410C190 440 380 410 410 340S300 250 250 262S90 220 110 150S220 70 250 84";

export function Process() {
  return (
    <section id="proces" aria-labelledby="proces-title" className="play-section py-20 lg:py-32">
      <div className="container-site">
        <p className="label text-szafran-ciemny">{process.eyebrow}</p>
        <h2 id="proces-title" className="display mt-5 text-h2">
          <span className="block">{process.titleLines[0]}</span>
          <span className="block text-szafran-ciemny">{process.titleLines[1]}</span>
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-x-8">
          {/* Rozpiska akcji: linia rysuje się w trakcie przewijania */}
          <div className="lg:col-span-5">
            <div className="play-diagram relative mx-auto aspect-[500/470] max-w-md border-2 border-grafit bg-kreda lg:sticky lg:top-24 lg:max-w-none">
              <CourtLines className="absolute inset-0 h-full w-full text-grafit/35" strokeWidth={1.5} />
              <svg viewBox="0 0 500 470" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <defs>
                  <mask id="play-mask" maskUnits="userSpaceOnUse">
                    <path d={PLAY} pathLength={1} className="play-path" fill="none" stroke="white" strokeWidth="14" />
                  </mask>
                  <marker id="play-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M0 0L10 5L0 10z" fill="var(--szafran-ciemny)" />
                  </marker>
                </defs>
                <path
                  d={PLAY}
                  fill="none"
                  stroke="var(--szafran-ciemny)"
                  strokeWidth="4"
                  strokeDasharray="10 9"
                  strokeLinecap="round"
                  mask="url(#play-mask)"
                  markerEnd="url(#play-arrow)"
                />
                {markers.map((m, i) => (
                  <g key={i}>
                    <circle cx={m.x} cy={m.y} r="22" fill="var(--grafit)" />
                    <text
                      x={m.x}
                      y={m.y + 9}
                      textAnchor="middle"
                      fill="var(--kreda)"
                      style={{ font: "800 26px var(--font-display)" }}
                    >
                      {i + 1}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ol>
              {process.steps.map((step, i) => (
                <li key={step.title} className="pop grid grid-cols-[3.5rem_1fr] gap-x-5 border-t-2 border-grafit py-7 lg:py-9">
                  <span className="display tabular grid h-14 w-14 place-items-center rounded-full bg-grafit text-[1.75rem] text-kreda">
                    {i + 1}
                  </span>
                  <div>
                    <span className="label tabular text-szafran-ciemny">0{i + 1}</span>
                    <h3 className="display mt-1 text-h4">{step.title}</h3>
                    <p className="mt-3 max-w-[46ch] text-szary">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-4 border-t-4 border-grafit pt-8">
              <p className="max-w-[40ch] text-lead">{process.outro}</p>
              <a href="#kontakt" className="btn btn-primary mt-8">
                {cta.bookVisit}
                <ArrowRight className="btn-arrow" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
