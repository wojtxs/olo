"use client";

import * as React from "react";
import { ui } from "@/app/content";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

// Sekcja hero z animowanym znakiem: przycisk pauzy (pętla trwa dłużej niż 5 s),
// zatrzymanie ruchu poza ekranem, a przy myszce lekkie przechylenie znaku w stronę
// kursora i rozgrzewanie kręgów, nad którymi jest kursor.
export function MarkStage({ children, className = "", labelledBy }: { children: React.ReactNode; className?: string; labelledBy: string }) {
  const ref = React.useRef<HTMLElement>(null);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      el.dataset.offscreen = String(!entry.isIntersecting);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    const el = ref.current;
    const mark = el?.querySelector<HTMLElement>(".hero-mark");
    if (!el || !mark) return;
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    const heats = [...mark.querySelectorAll<HTMLElement>(".mark-vert")].map((vert) => ({
      cy: Number(vert.dataset.cy),
      layer: vert.querySelector<SVGSVGElement>(".mark-heat"),
    }));
    const vy = Number(mark.dataset.vy);
    const vh = Number(mark.dataset.vh);
    let frame = 0;
    let px = 0;
    let py = 0;
    let inside = false;

    const update = () => {
      frame = 0;
      const box = mark.getBoundingClientRect();
      const nx = clamp((px - (box.left + box.width / 2)) / box.width, -1, 1);
      const ny = clamp((py - (box.top + box.height / 2)) / box.height, -1, 1);
      el.style.setProperty("--mark-ry", inside ? `${(nx * 9).toFixed(2)}deg` : "0deg");
      el.style.setProperty("--mark-rx", inside ? `${(-ny * 6).toFixed(2)}deg` : "0deg");

      // Kręgi „pod dłonią”: im bliżej kursora w pionie, tym jaśniej; tylko gdy kursor jest blisko znaku
      const near = px > box.left - box.width * 0.6 && px < box.right + box.width * 0.2;
      const uy = vy + ((py - box.top) / box.height) * vh;
      for (const { cy, layer } of heats) {
        const value = inside && near ? clamp(1 - Math.abs(uy - cy) / 34, 0, 1) : 0;
        if (layer) layer.style.opacity = value.toFixed(2);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px = e.clientX;
      py = e.clientY;
      inside = true;
      schedule();
    };
    const onLeave = () => {
      inside = false;
      schedule();
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={ref} aria-labelledby={labelledBy} className={className} data-paused={paused}>
      {children}
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? ui.playVideo : ui.pauseVideo}
        aria-pressed={paused}
        className="absolute bottom-4 right-[var(--gutter)] z-10 grid h-11 w-11 place-items-center border-2 border-kreda bg-grafit text-kreda transition-colors hover:bg-szafran hover:text-grafit motion-reduce:hidden"
      >
        {paused ? (
          <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true">
            <path d="M1 1l10 6-10 6z" fill="currentColor" />
          </svg>
        ) : (
          <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true">
            <path d="M2 1v12M10 1v12" stroke="currentColor" strokeWidth="2" />
          </svg>
        )}
      </button>
    </section>
  );
}
