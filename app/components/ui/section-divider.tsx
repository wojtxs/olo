"use client";

import * as React from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";

const easeCinematic = [0.22, 1, 0.36, 1] as const;

export function SectionDivider() {
  const shouldReduceMotion = useReducedMotion();
  const isMotionEnabled = !shouldReduceMotion;
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      className="relative h-px w-full overflow-hidden bg-transparent"
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8a9a7a]/20 to-transparent"
        initial={isMotionEnabled ? { scaleX: 0, opacity: 0 } : false}
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 1.2, ease: easeCinematic }}
        style={{ originX: 0.5 }}
      />
      {/* Soft glow center */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-8 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8a9a7a]/10 blur-xl"
        initial={isMotionEnabled ? { opacity: 0, scale: 0.8 } : false}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1.5, ease: easeCinematic, delay: 0.2 }}
      />
    </div>
  );
}
