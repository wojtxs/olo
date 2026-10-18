"use client";

import * as React from "react";
import Link from "next/link";
import { allServices, cta, ui, zones, type ZoneId } from "@/app/content";
import { ArrowRight } from "@/app/components/icons";

type Side = "front" | "back";

// Sylwetka w viewBox 200×440. Strefy to prostokąty przycięte do konturu ciała,
// dzięki czemu mają organiczne krawędzie, jak na tablicy anatomicznej.
const TORSO =
  "M100 52L107 54L108 67C117 73 136 75 149 84C158 90 160 102 156 113L148 124C144 146 136 166 135 184C134 202 143 218 145 232C130 244 112 248 100 248C88 248 70 244 55 232C57 218 66 202 65 184C64 166 56 146 52 124L44 113C40 102 42 90 51 84C64 75 83 73 92 67L93 54Z";
const ARM_R =
  "M156 108C164 108 169 116 169 130L170 192C171 212 174 234 174 250C174 264 168 270 163 266C159 262 160 250 159 238L156 194C155 172 154 152 154 134C154 120 153 110 156 108Z";
const LEG_R =
  "M101 244L146 234C148 262 145 292 139 318C136 330 135 340 136 352C139 372 137 398 130 416C129 424 133 428 131 434L112 434C111 428 114 424 114 416C111 398 109 372 110 352C110 340 107 328 105 318C102 294 101 268 101 244Z";

const SHOULDER_LINE = 100;
const KNEE_LINE = 346;

const zoneSide: Partial<Record<ZoneId, Side>> = { twarz: "front", plecy: "back" };

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
    <div className="grid grid-cols-1 gap-10 border-t border-orzech pt-10 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0 lg:pt-14">
      <h3 className="font-display text-h3 lg:col-span-5 lg:row-start-1">{ui.bodyMap.title}</h3>

      <div className="flex flex-col items-center lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1">
        <div className="flex rounded-full border border-orzech/25 p-1" role="group" aria-label={`${ui.bodyMap.front} / ${ui.bodyMap.back}`}>
          {(["front", "back"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSide(s)}
              aria-pressed={side === s}
              className="min-h-10 min-w-24 rounded-full px-5 text-small transition-colors aria-pressed:bg-orzech aria-pressed:text-recznik"
            >
              {s === "front" ? ui.bodyMap.front : ui.bodyMap.back}
            </button>
          ))}
        </div>

        <svg viewBox="0 0 200 440" className="mt-6 h-[min(62vh,32rem)] w-auto touch-manipulation" aria-hidden="true">
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
            <line x1="0" x2="200" y1={KNEE_LINE} y2={KNEE_LINE} stroke="var(--kamien)" strokeWidth="1" pointerEvents="none" />
          </g>
          <path d={LEG_R} fill="none" stroke="var(--kamien)" strokeWidth="1.25" pointerEvents="none" />
          <path d={LEG_R} transform="matrix(-1 0 0 1 200 0)" fill="none" stroke="var(--kamien)" strokeWidth="1.25" pointerEvents="none" />

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
              stroke="var(--kamien)"
              strokeWidth="1"
              pointerEvents="none"
            />
            {side === "back" ? (
              <path d="M100 108V236" stroke="var(--kamien)" strokeOpacity="0.45" strokeWidth="1" strokeDasharray="2 4" pointerEvents="none" />
            ) : null}
          </g>
          <path d={TORSO} fill="none" stroke="var(--kamien)" strokeWidth="1.25" pointerEvents="none" />

          {side === "front" ? (
            <ellipse cx="100" cy="30" rx="17" ry="22" {...zoneProps("twarz")} />
          ) : (
            <ellipse cx="100" cy="30" rx="17" ry="22" className="zone-static" />
          )}
        </svg>
      </div>

      <div className="lg:col-span-5 lg:row-start-2">
        <div className="flex flex-wrap gap-2" role="group" aria-label={ui.bodyMap.title}>
          {zones.map((z) => (
            <button
              key={z.id}
              type="button"
              onClick={() => select(z.id)}
              aria-pressed={active === z.id}
              className="min-h-11 rounded-full border border-orzech/25 px-4 text-small transition-colors hover:border-orzech aria-pressed:border-orzech aria-pressed:bg-orzech aria-pressed:text-recznik"
            >
              {z.label}
            </button>
          ))}
        </div>

        <div aria-live="polite" className="mt-10">
          <p className="eyebrow">{ui.bodyMap.matching}</p>
          <p className="font-soft mt-3 text-h4">{zone.label}</p>
          <ul className="mt-5 border-t border-linia">
            {services.map((s) => (
              <li key={s.id} className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-b border-linia py-4">
                <span>{s.name}</span>
                <span className="tabular whitespace-nowrap text-right">
                  <span className="mr-3 text-small text-kamien">{s.duration}</span>
                  <span className="font-soft text-[1.25rem]">{s.price}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href={`/cennik#${zone.category}`} className="link-arrow inline-flex min-h-11 items-center gap-3 font-medium text-glina">
              {cta.fullPricing}
              <ArrowRight className="btn-arrow" />
            </Link>
            <a href="#kontakt" className="link-underline">
              {cta.book}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
