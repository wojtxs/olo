"use client";

import * as React from "react";
import Link from "next/link";
import { allServices, cta, ui, zones, type ZoneId } from "@/app/content";
import { ArrowRight } from "@/app/components/icons";
import { TensionLine } from "@/app/components/tension-line";

type Side = "front" | "back";

// Sylwetka w viewBox 200×440. Strefy to prostokąty przycięte do konturu ciała.
const TORSO =
  "M100 52L107 54L108 67C117 73 136 75 149 84C158 90 160 102 156 113L148 124C144 146 136 166 135 184C134 202 143 218 145 232C130 244 112 248 100 248C88 248 70 244 55 232C57 218 66 202 65 184C64 166 56 146 52 124L44 113C40 102 42 90 51 84C64 75 83 73 92 67L93 54Z";
const ARM_R =
  "M156 108C164 108 169 116 169 130L170 192C171 212 174 234 174 250C174 264 168 270 163 266C159 262 160 250 159 238L156 194C155 172 154 152 154 134C154 120 153 110 156 108Z";
const LEG_R =
  "M101 244L146 234C148 262 145 292 139 318C136 330 135 340 136 352C139 372 137 398 130 416C129 424 133 428 131 434L112 434C111 428 114 424 114 416C111 398 109 372 110 352C110 340 107 328 105 318C102 294 101 268 101 244Z";

const SHOULDER_LINE = 100;
const KNEE_LINE = 346;

const zoneSide: Partial<Record<ZoneId, Side>> = { twarz: "front", plecy: "back" };

// Mapa napięć: wskazujesz, gdzie boli, i od razu widzisz pasujące zabiegi z cennika.
export function BodyMap() {
  const [active, setActive] = React.useState<ZoneId>("kark-barki");
  const [side, setSide] = React.useState<Side>("back");
  const uid = React.useId().replace(/:/g, "");

  const zone = zones.find((z) => z.id === active)!;
  const services = zone.services.map((id) => allServices.find((s) => s.id === id)!);

  const select = (id: ZoneId) => {
    setActive(id);
    const required = zoneSide[id];
    if (required) setSide(required);
  };

  const zoneProps = (id: ZoneId) => ({
    className: "zone",
    "data-active": active === id,
    onClick: () => select(id),
  });

  return (
    <section aria-labelledby="mapa-napiec-title" className="on-dark bg-wino pb-20 text-skora lg:pb-28">
      <TensionLine from={0.5} to={0.4} seed={7} className="h-24 lg:h-32" />
      <div className="container-site grid grid-cols-1 gap-12 pt-10 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0 lg:pt-14">
        <h2 id="mapa-napiec-title" className="headline text-h2 lg:col-span-6 lg:row-start-1">
          {ui.bodyMap.title}
        </h2>

        <div className="flex flex-col items-center rounded-[2.5rem] bg-wino-2 px-4 py-8 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
          <div className="flex rounded-full bg-wino p-1" role="group" aria-label={`${ui.bodyMap.front} / ${ui.bodyMap.back}`}>
            {(["front", "back"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSide(s)}
                aria-pressed={side === s}
                className="min-h-10 min-w-24 rounded-full px-5 text-small font-medium transition-colors aria-pressed:bg-skora aria-pressed:text-wino"
              >
                {s === "front" ? ui.bodyMap.front : ui.bodyMap.back}
              </button>
            ))}
          </div>

          <svg viewBox="0 0 200 440" className="mt-6 h-[min(60vh,30rem)] w-auto touch-manipulation" aria-hidden="true">
            <defs>
              <clipPath id={`${uid}-torso`}>
                <path d={TORSO} />
              </clipPath>
              <clipPath id={`${uid}-legs`}>
                <path d={LEG_R} />
                <path d={LEG_R} transform="matrix(-1 0 0 1 200 0)" />
              </clipPath>
            </defs>

            <path d={ARM_R} {...zoneProps("rece")} />
            <path d={ARM_R} transform="matrix(-1 0 0 1 200 0)" {...zoneProps("rece")} />

            <g clipPath={`url(#${uid}-legs)`}>
              <rect x="0" y="230" width="200" height={KNEE_LINE - 230} {...zoneProps("nogi")} style={{ stroke: "none" }} />
              <rect x="0" y={KNEE_LINE} width="200" height={440 - KNEE_LINE} {...zoneProps("stopy-lydki")} style={{ stroke: "none" }} />
              <line x1="0" x2="200" y1={KNEE_LINE} y2={KNEE_LINE} stroke="var(--mut-jasny)" strokeWidth="1" pointerEvents="none" />
            </g>
            <path d={LEG_R} fill="none" stroke="var(--mut-jasny)" strokeWidth="1.25" pointerEvents="none" />
            <path d={LEG_R} transform="matrix(-1 0 0 1 200 0)" fill="none" stroke="var(--mut-jasny)" strokeWidth="1.25" pointerEvents="none" />

            <g clipPath={`url(#${uid}-torso)`}>
              <rect x="0" y="40" width="200" height={SHOULDER_LINE - 40} {...zoneProps("kark-barki")} style={{ stroke: "none" }} />
              {side === "back" ? (
                <rect x="0" y={SHOULDER_LINE} width="200" height={250 - SHOULDER_LINE} {...zoneProps("plecy")} style={{ stroke: "none" }} />
              ) : (
                <rect x="0" y={SHOULDER_LINE} width="200" height={250 - SHOULDER_LINE} className="zone-static" style={{ stroke: "none" }} />
              )}
              <path
                d={`M0 ${SHOULDER_LINE}C60 ${SHOULDER_LINE + 6} 140 ${SHOULDER_LINE + 6} 200 ${SHOULDER_LINE}`}
                fill="none"
                stroke="var(--mut-jasny)"
                strokeWidth="1"
                pointerEvents="none"
              />
              {side === "back" ? (
                <path d="M100 108V236" stroke="var(--mut-jasny)" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2 4" pointerEvents="none" />
              ) : null}
            </g>
            <path d={TORSO} fill="none" stroke="var(--mut-jasny)" strokeWidth="1.25" pointerEvents="none" />

            {side === "front" ? (
              <ellipse cx="100" cy="30" rx="17" ry="22" {...zoneProps("twarz")} />
            ) : (
              <ellipse cx="100" cy="30" rx="17" ry="22" className="zone-static" />
            )}
          </svg>
        </div>

        <div className="lg:col-span-6 lg:row-start-2 lg:pt-10">
          <div className="flex flex-wrap gap-2" role="group" aria-label={ui.bodyMap.title}>
            {zones.map((z) => (
              <button
                key={z.id}
                type="button"
                onClick={() => select(z.id)}
                aria-pressed={active === z.id}
                className="min-h-11 rounded-full bg-wino-2 px-4 text-small font-medium transition-colors hover:bg-brzoskwinia hover:text-wino aria-pressed:bg-brzoskwinia aria-pressed:text-wino"
              >
                {z.label}
              </button>
            ))}
          </div>

          <div aria-live="polite" className="mt-8 rounded-[2rem] bg-wino-2 p-5 lg:p-7">
            <p className="text-small font-semibold text-miod">{ui.bodyMap.matching}</p>
            <p className="headline mt-2 text-h4">{zone.label}</p>
            <ul className="mt-4">
              {services.map((s) => (
                <li key={s.id} className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-b border-linia-jasna py-3 last:border-b-0">
                  <span>{s.name}</span>
                  <span className="tabular whitespace-nowrap text-right">
                    <span className="mr-3 text-small text-mut-jasny">{s.duration}</span>
                    <span className="text-[1.25rem] font-semibold">{s.price}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href={`/cennik#${zone.category}`} className="btn btn-primary">
              {cta.fullPricing}
              <ArrowRight className="btn-arrow" />
            </Link>
            <a href="#kontakt" className="btn btn-soft">
              {cta.book}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
