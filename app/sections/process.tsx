"use client";

import * as React from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";

const easeCinematic = [0.22, 1, 0.36, 1] as const;
const easeSoft = [0.25, 1, 0.5, 1] as const;

function ProcessStep({
  step,
  index,
  isMotionEnabled,
  fadeUpVariants,
}: {
  step: { title: string; description: string };
  index: number;
  isMotionEnabled: boolean;
  fadeUpVariants: {
    hidden: { opacity: number; y: number };
    visible: {
      opacity: number;
      y: number;
      transition: { duration: number; ease: readonly [number, number, number, number] };
    };
  };
}) {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const itemInView = useInView(itemRef, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={itemRef} className="relative mb-12 sm:mb-20">
      <motion.div
        className="absolute left-4 top-1 z-10 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-[#8a9a7a] bg-[#0c110e] sm:left-1/2"
        initial={isMotionEnabled ? { scale: 0, opacity: 0 } : false}
        animate={itemInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.6, ease: easeCinematic, delay: 0.1 }}
      />

      <motion.div
        className={`
          pl-12 sm:w-1/2 sm:pl-0
          ${isLeft ? "sm:pr-16 sm:text-right" : "sm:pl-16 sm:ml-auto sm:text-left"}
        `}
        initial={isMotionEnabled ? "hidden" : false}
        animate={itemInView ? "visible" : "hidden"}
        variants={fadeUpVariants}
        transition={{ delay: 0.2 + index * 0.12 }}
      >
        <span className="inline-block font-mono text-xs text-[#8a9a7a]">0{index + 1}</span>
        <h3 className="mt-1 font-serif text-2xl font-light tracking-[-0.01em] text-[#f0eee9] sm:text-3xl">
          {step.title}
        </h3>
        <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-[#9ca394] sm:text-base">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}

export function Process() {
  const shouldReduceMotion = useReducedMotion();
  const isMotionEnabled = !shouldReduceMotion;
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const lineVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
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
      transition: { duration: 1.0, ease: easeCinematic },
    },
  };

  const steps = [
    {
      title: "Rezerwacja",
      description: "Umawiamy dogodny termin. Jestem elastyczny, więc zazwyczaj znajdziemy coś, co pasuje do Twojego grafiku.",
    },
    {
      title: "Dojazd",
      description: "Przyjeżdżam pod wskazany adres ze wszystkim, czego potrzebuję. Ty nie musisz nic przygotowywać.",
    },
    {
      title: "Konsultacja",
      description: "Przed masażem rozmawiamy krótko o tym, jak się czujesz i gdzie czujesz napięcie.",
    },
    {
      title: "Sesja",
      description: "Masaż trwa tyle, ile ustaliliśmy. Pracuję bez pośpiechu, dostosowując się do tego, co mówi Twoje ciało.",
    },
    {
      title: "Zakończenie",
      description: "Po zabiegu krótkie podsumowanie i ewentualne wskazówki. Możesz wrócić do swojego dnia z lżejszym ciałem.",
    },
  ];

  return (
    <section
      ref={ref}
      aria-label="Jak wygląda wizyta"
      id="proces"
      className="relative w-full overflow-hidden bg-[#0c110e] py-24 lg:py-32"
    >
      <div className="relative mx-auto max-w-[80rem] px-6 lg:px-12">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            className="mb-5 inline-block text-[11px] font-medium uppercase tracking-[0.25em] text-[#8a9a7a]"
            initial={isMotionEnabled ? "hidden" : false}
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariants}
          >
            Jak to działa
          </motion.span>

          <h2 className="font-serif text-[#f0eee9]">
            <motion.span
              className="block text-[clamp(2.5rem,6vw,4rem)] font-light leading-[0.95] tracking-[-0.02em]"
              initial={isMotionEnabled ? "hidden" : false}
              animate={isInView ? "visible" : "hidden"}
              variants={lineVariants}
              transition={{ delay: 0.2 }}
            >
              Jak wygląda
            </motion.span>
            <motion.span
              className="block text-[clamp(2.5rem,6vw,4rem)] font-medium leading-[0.95] tracking-[-0.02em]"
              initial={isMotionEnabled ? "hidden" : false}
              animate={isInView ? "visible" : "hidden"}
              variants={lineVariants}
              transition={{ delay: 0.38 }}
            >
              wizyta
            </motion.span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto mt-16 max-w-4xl lg:mt-24">
          {/* Vertical line */}
          <motion.div
            className="absolute left-4 top-0 bottom-0 w-px bg-[#2a302a] sm:left-1/2 sm:-translate-x-1/2"
            initial={isMotionEnabled ? { scaleY: 0 } : false}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, ease: easeCinematic, delay: 0.4 }}
            style={{ originY: 0 }}
          />

          {steps.map((step, i) => (
            <ProcessStep
              key={step.title}
              step={step}
              index={i}
              isMotionEnabled={isMotionEnabled}
              fadeUpVariants={fadeUpVariants}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mx-auto mt-14 flex max-w-xl flex-col items-center justify-center gap-6 text-center lg:mt-20"
          initial={isMotionEnabled ? "hidden" : false}
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpVariants}
          transition={{ delay: 0.9 }}
        >
          <p className="max-w-sm text-sm font-light leading-relaxed text-[#9ca394]">
            Całość jest prosta i wygodna. Od umówienia terminu po zakończenie masażu.
          </p>

          <motion.div
            whileHover={isMotionEnabled ? { scale: 1.02, y: -2 } : undefined}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              href="#kontakt"
              size="lg"
              aria-label="Umów wizytę"
              className="group"
            >
              Umów wizytę
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
