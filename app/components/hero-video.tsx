"use client";

import * as React from "react";
import { ui } from "@/app/content";

type Sources = { mp4: string; webm: string };

// Pętla wideo nakładana na zdjęcie hero dopiero po załadowaniu strony, więc
// nie konkuruje z LCP. Pomijana przy prefers-reduced-motion i trybie oszczędzania danych.
export function HeroVideo({ mobile, desktop }: { mobile: Sources; desktop: Sources }) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [src, setSrc] = React.useState<Sources | null>(null);
  const [playing, setPlaying] = React.useState(false);
  const [userPaused, setUserPaused] = React.useState(false);

  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) return;

    const start = () => {
      const isDesktop = window.matchMedia("(min-width: 640px)").matches;
      setSrc(isDesktop ? desktop : mobile);
    };
    const schedule = () => {
      const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200));
      idle(start);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => window.removeEventListener("load", schedule);
  }, [mobile, desktop]);

  // Wstrzymanie poza ekranem i w tle oszczędza baterię telefonu.
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !userPaused) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [src, userPaused]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setUserPaused(false);
      video.play().catch(() => {});
    } else {
      setUserPaused(true);
      video.pause();
    }
  };

  if (!src) return null;

  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[1600ms] ease-[var(--ease-calm)] data-[playing=true]:opacity-100"
        data-playing={playing}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        aria-hidden="true"
        onPlaying={() => setPlaying(true)}
      >
        <source src={src.webm} type="video/webm" />
        <source src={src.mp4} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={userPaused ? ui.playVideo : ui.pauseVideo}
        aria-pressed={userPaused}
        className="absolute bottom-4 right-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-skora/90 text-wino transition-colors hover:bg-skora"
      >
        {userPaused ? (
          <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true">
            <path d="M1 1l10 6-10 6z" fill="currentColor" />
          </svg>
        ) : (
          <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true">
            <path d="M2 1v12M10 1v12" stroke="currentColor" strokeWidth="2" />
          </svg>
        )}
      </button>
    </>
  );
}
