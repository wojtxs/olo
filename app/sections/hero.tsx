"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";

const easeCinematic = [0.22, 1, 0.36, 1] as const;
const easeSoft = [0.25, 1, 0.5, 1] as const;

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const isMotionEnabled = !shouldReduceMotion;

  const lineVariants = {
    hidden: { opacity: 0, y: 100, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.6, ease: easeSoft },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: easeCinematic },
    },
  };

  const imageRevealVariants = {
    hidden: { clipPath: "inset(0 100% 0 0)", scale: 1.15 },
    visible: {
      clipPath: "inset(0 0% 0 0)",
      scale: 1,
      transition: { duration: 2.2, ease: easeCinematic, delay: 0.4 },
    },
  };

  const floatTransition = {
    duration: 28,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: [0, 0, 1, 1] as const,
  };

  const breatheTransition = {
    duration: 20,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: [0, 0, 1, 1] as const,
  };

  return (
    <section
      aria-label="Wprowadzenie"
      className="relative min-h-dvh w-full overflow-hidden bg-[#0f1411]"
    >
      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Atmospheric orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute -left-[10%] top-[20%] h-[50rem] w-[50rem] rounded-full bg-[#8a9a7a]/10 blur-[8rem]"
          animate={isMotionEnabled ? { x: [0, 60, 0], y: [0, -40, 0] } : undefined}
          transition={floatTransition}
        />
        <motion.div
          className="absolute bottom-[10%] right-[20%] h-[40rem] w-[40rem] rounded-full bg-[#6b8a72]/8 blur-[6rem]"
          animate={isMotionEnabled ? { x: [0, -40, 0], y: [0, 30, 0] } : undefined}
          transition={{ ...floatTransition, duration: 32 }}
        />
      </div>

      {/* Desktop image portal — full height, bleeding right */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-full lg:block" aria-hidden="true">
        <motion.div
          className="absolute inset-y-0 right-0 w-[65vw] overflow-hidden"
          initial={isMotionEnabled ? "hidden" : false}
          animate="visible"
          variants={imageRevealVariants}
        >
          <motion.div
            className="absolute inset-0"
            animate={isMotionEnabled ? { scale: [1, 1.03, 1] } : undefined}
            transition={breatheTransition}
          >
            <Image
              src="https://images.pexels.com/photos/5473182/pexels-photo-5473182.jpeg?auto=compress&cs=tinysrgb&w=1400&dpr=2"
              alt="Profesjonalny masaż mężczyzny w ciemnej, klimatycznej atmosferze"
              fill
              className="object-cover"
              sizes="65vw"
              loading="eager"
              priority
            />
          </motion.div>

          {/* Cinematic gradients for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f1411] via-[#0f1411]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1411]/60 via-transparent to-[#0f1411]/20" />
        </motion.div>
      </div>

      {/* Content — bottom-left aligned */}
      <div className="relative z-10 mx-auto flex min-h-dvh max-w-[100rem] flex-col justify-end px-6 pb-20 pt-32 lg:pb-32 lg:pl-12">
        <div className="max-w-2xl lg:max-w-xl">
          <motion.span
            className="mb-6 inline-block text-[11px] font-medium uppercase tracking-[0.3em] text-[#8a9a7a]"
            initial={isMotionEnabled ? "hidden" : false}
            animate="visible"
            variants={fadeUpVariants}
          >
            Mobilny masażysta
          </motion.span>

          <h1 className="font-serif text-[#f0eee9]">
            <motion.span
              className="block text-[clamp(3rem,10vw,7.5rem)] font-light leading-[0.9] tracking-[-0.03em]"
              initial={isMotionEnabled ? "hidden" : false}
              animate="visible"
              variants={lineVariants}
              transition={{ delay: 0.25 }}
            >
              Ulga,
            </motion.span>
            <motion.span
              className="block text-[clamp(3rem,10vw,7.5rem)] font-light italic leading-[0.9] tracking-[-0.02em] text-[#9ca394]"
              initial={isMotionEnabled ? "hidden" : false}
              animate="visible"
              variants={lineVariants}
              transition={{ delay: 0.45 }}
            >
              która
            </motion.span>
            <motion.span
              className="block text-[clamp(3rem,10vw,7.5rem)] font-medium leading-[0.9] tracking-[-0.03em]"
              initial={isMotionEnabled ? "hidden" : false}
              animate="visible"
              variants={lineVariants}
              transition={{ delay: 0.65 }}
            >
              przyjeżdża
            </motion.span>
          </h1>

          <motion.p
            className="mt-10 max-w-md text-base font-light leading-relaxed text-[#9ca394] lg:text-lg"
            initial={isMotionEnabled ? "hidden" : false}
            animate="visible"
            variants={fadeUpVariants}
            transition={{ delay: 1.0 }}
          >
            Masaż w Twoim domu, bez zbędnego biegania i bez pośpiechu. Po prostu czas dla siebie i profesjonalna pomoc w rozluźnieniu napięcia.
          </motion.p>

          <motion.div
            className="mt-12 flex flex-col items-start gap-6"
            initial={isMotionEnabled ? "hidden" : false}
            animate="visible"
            variants={fadeUpVariants}
            transition={{ delay: 1.2 }}
          >
            <motion.div
              whileHover={isMotionEnabled ? { scale: 1.02, y: -2 } : undefined}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                href="#kontakt"
                size="lg"
                aria-label="Umów masaż — przejdź do formularza kontaktowego"
                className="group"
              >
                Umów się
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Button>
            </motion.div>

            <motion.a
              href="#oferta"
              className="group inline-flex items-center gap-2 text-sm font-medium text-[#8a9a7a] transition-colors hover:text-[#f0eee9]"
              whileHover={isMotionEnabled ? { x: 4 } : undefined}
              transition={{ duration: 0.3 }}
            >
              <span className="relative">
                Zobacz, co oferuję
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
              </span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </motion.a>
          </motion.div>
        </div>

        {/* Mobile image portal */}
        <motion.div
          className="relative mt-16 aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] lg:hidden"
          initial={isMotionEnabled ? { clipPath: "inset(0 0 100% 0)", scale: 1.1 } : false}
          animate={{ clipPath: "inset(0 0 0% 0)", scale: 1 }}
          transition={{ duration: 1.8, ease: easeCinematic, delay: 0.6 }}
        >
          <motion.div
            className="absolute inset-0"
            animate={isMotionEnabled ? { scale: [1, 1.03, 1] } : undefined}
            transition={breatheTransition}
          >
            <Image
              src="https://images.pexels.com/photos/5473182/pexels-photo-5473182.jpeg?auto=compress&cs=tinysrgb&w=1200&dpr=2"
              alt="Profesjonalny masaż mężczyzny w ciemnej, klimatycznej atmosferze"
              fill
              className="object-cover"
              sizes="100vw"
              loading="eager"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1411]/90 via-[#0f1411]/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
