"use client";

import * as React from "react";
import Link from "next/link";
import { allServices, cta, ui, zones, type ZoneId } from "@/app/content";
import { ArrowRight } from "@/app/components/icons";

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

// Mapa napięć jako tablica taktyczna: wskazujesz strefę, dostajesz zabiegi z cennika.
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
    <section aria-labelledby="mapa-napiec-title" className="on-dark relative overflow-hidden bg-grafit py-20 text-kreda lg:py-28">
      {/* Siatka tablicy taktycznej */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--kreda) 1px, transparent 1px), linear-gradient(90deg, var(--kreda) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />
      <div className="container-site relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
        <h2 id="mapa-napiec-title" className="display text-[clamp(3rem,1.8rem+6vw,7.5rem)] lg:col-span-6 lg:row-start-1">
          {ui.bodyMap.title}
        </h2>

        <div className="flex flex-col items-center lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
          <div className="grid grid-cols-2 border-2 border-kreda" role="group" aria-label={`${ui.bodyMap.front} / ${ui.bodyMap.back}`}>
            {(["front", "back"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSide(s)}
                aria-pressed={side === s}
                className="label min-h-11 min-w-28 px-5 transition-colors aria-pressed:bg-kreda aria-pressed:text-grafit"
              >
                {s === "front" ? ui.bodyMap.front : ui.bodyMap.back}
              </button>
            ))}
          </div>

          <svg viewBox="0 0 200 440" className="mt-8 h-[min(62vh,32rem)] w-auto touch-manipulation" aria-hidden="true">
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
              <line x1="0" x2="200" y1={KNEE_LINE} y2={KNEE_LINE} stroke="var(--kreda)" strokeWidth="1" strokeDasharray="3 3" pointerEvents="none" />
            </g>
            <path d={LEG_R} fill="none" stroke="var(--kreda)" strokeWidth="1.5" pointerEvents="none" />
            <path d={LEG_R} transform="matrix(-1 0 0 1 200 0)" fill="none" stroke="var(--kreda)" strokeWidth="1.5" pointerEvents="none" />

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
                stroke="var(--kreda)"
                strokeWidth="1"
                strokeDasharray="3 3"
                pointerEvents="none"
              />
              {side === "back" ? (
                <path d="M100 108V236" stroke="var(--kreda)" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2 4" pointerEvents="none" />
              ) : null}
            </g>
            <path d={TORSO} fill="none" stroke="var(--kreda)" strokeWidth="1.5" pointerEvents="none" />

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
                className="label min-h-11 border-2 border-kreda/40 px-4 transition-colors hover:border-kreda aria-pressed:border-szafran aria-pressed:bg-szafran aria-pressed:text-grafit"
              >
                {z.label}
              </button>
            ))}
          </div>

          <div aria-live="polite" className="mt-10 border-t-2 border-kreda pt-6">
            <div className="flex items-baseline justify-between gap-4">
              <p className="label text-szafran">{ui.bodyMap.matching}</p>
              <p className="display text-h4">{zone.label}</p>
            </div>
            <ul className="mt-4">
              {services.map((s) => (
                <li key={s.id} className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-b border-linia-jasna py-3">
                  <span>{s.name}</span>
                  <span className="display tabular row-span-2 text-[1.875rem] normal-case leading-none text-szafran">{s.price}</span>
                  <span className="label text-mgla">{s.duration}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href={`/cennik#${zone.category}`} className="btn btn-primary">
                {cta.fullPricing}
                <ArrowRight className="btn-arrow" />
              </Link>
              <a href="#kontakt" className="label link-arrow inline-flex min-h-11 items-center gap-3 hover:text-szafran">
                {cta.book}
                <ArrowRight className="btn-arrow" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
