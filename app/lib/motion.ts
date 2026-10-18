"use client";

import * as React from "react";
import { type Transition, useReducedMotion } from "framer-motion";

export const easeCinematic = [0.22, 1, 0.36, 1] as const;
export const easeSoft = [0.25, 1, 0.5, 1] as const;

const MOTION_MEDIA_QUERIES = [
  "(max-width: 1024px)",
  "(hover: none)",
  "(pointer: coarse)",
] as const;

export function useMotionMode() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [isLiteMotion, setIsLiteMotion] = React.useState(true);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQueries = MOTION_MEDIA_QUERIES.map((query) => window.matchMedia(query));
    const updateMotionMode = () => {
      setIsLiteMotion(mediaQueries.some((query) => query.matches));
    };

    updateMotionMode();

    mediaQueries.forEach((query) => query.addEventListener("change", updateMotionMode));

    return () => {
      mediaQueries.forEach((query) => query.removeEventListener("change", updateMotionMode));
    };
  }, []);

  const usesLiteMotion = shouldReduceMotion || isLiteMotion;

  return {
    isMotionEnabled: !shouldReduceMotion,
    isLiteMotion: usesLiteMotion,
    allowHoverMotion: !usesLiteMotion,
    allowContinuousMotion: !usesLiteMotion,
  };
}

export function createFadeUpVariants(isLiteMotion: boolean, distance = 24) {
  return {
    hidden: { opacity: 0, y: Math.max(12, Math.round(distance * (isLiteMotion ? 0.6 : 1))) },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isLiteMotion ? 0.65 : 1.0,
        ease: easeCinematic,
      },
    },
  };
}

export function createLineVariants(isLiteMotion: boolean, distance = 48) {
  return {
    hidden: { opacity: 0, y: Math.max(16, Math.round(distance * (isLiteMotion ? 0.55 : 1))) },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isLiteMotion ? 0.75 : 1.25,
        ease: easeSoft,
      },
    },
  };
}

export function createRevealVariants(isLiteMotion: boolean) {
  return {
    hidden: { opacity: 0, y: isLiteMotion ? 18 : 32, scale: isLiteMotion ? 1.01 : 1.03 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: isLiteMotion ? 0.75 : 1.2,
        ease: easeCinematic,
      },
    },
  };
}

export function createTimedTransition(
  isLiteMotion: boolean,
  fullDuration: number,
  liteDuration: number,
  ease: Transition["ease"] = easeCinematic,
): Transition {
  return {
    duration: isLiteMotion ? liteDuration : fullDuration,
    ease,
  };
}
