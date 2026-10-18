"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { GraduationCap, Dumbbell, Heart } from "lucide-react";

const easeCinematic = [0.22, 1, 0.36, 1] as const;
const easeSoft = [0.25, 1, 0.5, 1] as const;

const timeline = [
  {
    icon: GraduationCap,
    title: "Edukacja i praktyka",
    text: "Studiuję fizjoterapię w Akademii Medycznej Nauk Stosowanych i Holistycznych. Jestem też certyfikowanym technikiem masażystą. Wiedza z zajęć i codzienna praca z ludźmi pomagają mi rozwijać warsztat.",
  },
  {
    icon: Dumbbell,
    title: "Doświadczenie ruchowe",
    text: "Od dziecka gram w koszykówkę. Dobrze rozumiem, jak ciało reaguje na wysiłek, gdzie pojawiają się napięcia i jak można je skutecznie rozluźnić.",
  },
  {
    icon: Heart,
    title: "Podejście",
    text: "Nie skupiam się tylko na jednym miejscu bólu. Patrzę na to, jak funkcjonuje całe ciało, bo wszystko jest ze sobą połączone.",
  },
];

const facts = [
  { label: "Student fizjoterapii", meta: "AMNSiH" },
  { label: "Technik masażysta", meta: "Certyfikowany" },
  { label: "Koszykarz", meta: "Życiowa pasja" },
  { label: "Stały rozwój", meta: "Kursy i szkolenia" },
];

export function About() {
  const shouldReduceMotion = useReducedMotion();
  const isMotionEnabled = !shouldReduceMotion;
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const lineVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.4, ease: easeSoft },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: easeCinematic },
    },
  };

  const imageVariants = {
    hidden: { clipPath: "inset(0 100% 0 0)", scale: 1.1 },
    visible: {
      clipPath: "inset(0 0% 0 0)",
      scale: 1,
      transition: { duration: 2.0, ease: easeCinematic, delay: 0.3 },
    },
  };

  return (
    <section
      ref={ref}
      aria-label="O mnie"
      id="o-mnie"
      className="relative w-full overflow-hidden bg-[#0f1411] py-24 lg:py-32"
>
      {/* Giant marquee watermark */}
      <div className="pointer-events-none absolute inset-x-0 top-8 z-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="flex w-max whitespace-nowrap will-change-transform"
          animate={isMotionEnabled ? { x: ["0%", "-50%"] } : undefined}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 55,
              ease: "linear",
            },
          }}
        >
          <span className="select-none pr-32 font-serif text-[14vw] font-light leading-[0.85] tracking-[-0.02em] text-[#f0eee9] opacity-[0.04]">
            ALEKSANDER PAWŁOWSKI
          </span>
          <span className="select-none pr-32 font-serif text-[14vw] font-light leading-[0.85] tracking-[-0.02em] text-[#f0eee9] opacity-[0.04]">
            ALEKSANDER PAWŁOWSKI
          </span>
          <span className="select-none pr-32 font-serif text-[14vw] font-light leading-[0.85] tracking-[-0.02em] text-[#f0eee9] opacity-[0.04]">
            ALEKSANDER PAWŁOWSKI
          </span>
          <span className="select-none pr-32 font-serif text-[14vw] font-light leading-[0.85] tracking-[-0.02em] text-[#f0eee9] opacity-[0.04]">
            ALEKSANDER PAWŁOWSKI
          </span>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-[90rem] px-6 lg:px-12">
        {/* Top intro row */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <motion.span
            className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#8a9a7a]"
            initial={isMotionEnabled ? "hidden" : false}
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariants}
          >
            O mnie
          </motion.span>

          <motion.p
            className="max-w-sm text-right text-sm font-light leading-relaxed text-[#9ca394] lg:text-base"
            initial={isMotionEnabled ? "hidden" : false}
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariants}
            transition={{ delay: 0.25 }}
          >
            Mobilny masażysta. Student fizjoterapii. Koszykarz. Cały czas się uczę.
          </motion.p>
        </div>

        {/* Main grid */}
        <div className="mt-16 grid grid-cols-1 items-start gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          {/* Left: image */}
          <div className="lg:col-span-5 lg:col-start-1 lg:mt-12">
            <motion.div
              className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] lg:rounded-[3rem]"
              initial={isMotionEnabled ? "hidden" : false}
              animate={isInView ? "visible" : "hidden"}
              variants={imageVariants}
            >
              <motion.div
                className="absolute inset-0"
                animate={isMotionEnabled ? { scale: [1, 1.02, 1] } : undefined}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: [0, 0, 1, 1] as const,
                }}
              >
                <Image
                  src="/olek.png"
                  alt="Aleksander Pawłowski"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </motion.div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f1411]/30 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0f1411]/10 via-transparent to-transparent" />
            </motion.div>
          </div>

          {/* Right: timeline + expanded bio */}
          <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7 lg:pt-16">
            <h2 className="font-serif text-[#f0eee9]">
              <motion.span
                className="block text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[0.95] tracking-[-0.02em]"
                initial={isMotionEnabled ? "hidden" : false}
                animate={isInView ? "visible" : "hidden"}
                variants={lineVariants}
                transition={{ delay: 0.2 }}
              >
                Praca
              </motion.span>
              <motion.span
                className="block text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.02em]"
                initial={isMotionEnabled ? "hidden" : false}
                animate={isInView ? "visible" : "hidden"}
                variants={lineVariants}
                transition={{ delay: 0.38 }}
              >
                z ciałem
              </motion.span>
            </h2>

            {/* Timeline */}
            <div className="relative mt-10">
              {/* vertical line */}
              <div className="absolute left-[19px] top-3 hidden h-[calc(100%-24px)] w-px bg-[#2a302a] sm:block" />

              <div className="flex flex-col gap-8 sm:gap-10">
                {timeline.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      className="group relative flex items-start gap-4 sm:gap-6"
                      initial={isMotionEnabled ? "hidden" : false}
                      animate={isInView ? "visible" : "hidden"}
                      variants={fadeUpVariants}
                      transition={{ delay: 0.55 + i * 0.18 }}
                    >
                      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#2a302a] bg-[#0f1411] text-[#8a9a7a] transition-colors duration-300 group-hover:border-[#8a9a7a] group-hover:bg-[#8a9a7a]/10">
                        <Icon className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                      <div className="pt-1">
                        <h3 className="text-base font-medium tracking-[-0.01em] text-[#f0eee9] sm:text-lg">
                          {item.title}
                        </h3>
                        <p className="mt-2 max-w-md text-sm font-light leading-relaxed text-[#9ca394] sm:text-base">
                          {item.text}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Expanded bio */}
            <motion.div
              className="relative mt-12 border-l-2 border-[#8a9a7a]/30 pl-6 sm:mt-14 sm:pl-8"
              initial={isMotionEnabled ? "hidden" : false}
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUpVariants}
              transition={{ delay: 1.1 }}
            >
              <p className="text-sm font-light leading-relaxed text-[#9ca394] sm:text-base">
                Jestem absolwentem Medycznego Studium Zawodowego na kierunku technik masażysta. Podczas tej nauki zdobyłem wiedzę w zakresie masażu klasycznego, relaksacyjnego, centryfugalnego, sportowego oraz podstaw masażu limfatycznego i gorącymi kamieniami.
              </p>
              <p className="mt-4 text-sm font-light leading-relaxed text-[#9ca394] sm:text-base">
                Na co dzień jestem studentem 3 roku fizjoterapii na Akademii Medycznej Nauk Stosowanych i Holistycznych. Jestem osobą ambitną i zdyscyplinowaną, co potwierdza fakt posiadania stypendium rektora tejże uczelni 2 rok z rzędu. Dodatkowo w kontekście masażu opanowałem kurs kobido i cały rytuał kobido complex dzięki specjalnemu szkoleniu.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom facts row */}
        <div className="mt-16 lg:mt-24">
          <motion.div
            className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#2a302a] bg-[#2a302a] lg:grid-cols-4"
            initial={isMotionEnabled ? { opacity: 0, y: 20 } : false}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.2, ease: easeCinematic, delay: 1.0 }}
          >
            {facts.map((fact, i) => (
              <div
                key={fact.label}
                className="group bg-[#0f1411] p-5 text-center transition-colors duration-300 hover:bg-[#131813] sm:p-6"
              >
                <span className="font-mono text-xs text-[#8a9a7a]">0{i + 1}</span>
                <h4 className="mt-2 text-sm font-medium text-[#f0eee9] sm:text-base">
                  {fact.label}
                </h4>
                <p className="mt-1 text-[10px] font-light uppercase tracking-[0.15em] text-[#9ca394] sm:text-xs">
                  {fact.meta}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
