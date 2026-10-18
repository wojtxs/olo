"use client";

import * as React from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { ArrowRight, Heart, Sparkles, Armchair } from "lucide-react";
import { Button } from "@/app/components/ui/button";

const easeCinematic = [0.22, 1, 0.36, 1] as const;
const easeSoft = [0.25, 1, 0.5, 1] as const;

const offerings = [
  {
    icon: Armchair,
    title: "Plecy, barki i kark",
    description:
      "Ulga w najbardziej napiętych partiach górnego odcinka ciała. Od szybkiego 30-minutowego masażu pleców, po kompleksowy 60-minutowy zabieg pleców, barków i karku.",
    features: ["plecy + barki + kark", "plecy + kark", "same plecy", "ręce i barki"],
  },
  {
    icon: Heart,
    title: "Nogi i całe ciało",
    description:
      "Pełen relaks dla zmęczonych nóg lub całego ciała. Dostosowane do Twoich potrzeb – od celowanego masażu stóp i łydek, przez nogi z plecami, aż po 90-minutowy relaks całego ciała.",
    features: ["całe ciało", "nogi + plecy", "stopy i łydki", "masaż dostawowy"],
  },
  {
    icon: Sparkles,
    title: "Twarz",
    description:
      "Japoński masaż twarzy Kobido – naturalny lifting bez skalpela. Dostępny zarówno w klasycznym 60-minutowym wariancie, jak i rozszerzonym zabiegu complex z liftingiem.",
    features: ["kobido classic", "kobido complex + lifting"],
  },
];

export function Offer() {
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

  return (
    <section
      ref={ref}
      aria-label="Oferta"
      id="oferta"
      className="relative w-full overflow-hidden bg-[#0f1411] py-24 lg:py-32"
    >
      <div className="relative mx-auto max-w-[90rem] px-6 lg:px-12">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            className="mb-5 inline-block text-[11px] font-medium uppercase tracking-[0.25em] text-[#8a9a7a]"
            initial={isMotionEnabled ? "hidden" : false}
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariants}
          >
            Oferta
          </motion.span>

          <h2 className="font-serif text-[#f0eee9]">
            <motion.span
              className="block text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[0.95] tracking-[-0.02em]"
              initial={isMotionEnabled ? "hidden" : false}
              animate={isInView ? "visible" : "hidden"}
              variants={lineVariants}
              transition={{ delay: 0.2 }}
            >
              Rodzaje
            </motion.span>
            <motion.span
              className="block text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.02em]"
              initial={isMotionEnabled ? "hidden" : false}
              animate={isInView ? "visible" : "hidden"}
              variants={lineVariants}
              transition={{ delay: 0.38 }}
            >
              masażu
            </motion.span>
          </h2>

          <motion.p
            className="mt-6 text-base font-light leading-relaxed text-[#9ca394] lg:text-lg"
            initial={isMotionEnabled ? "hidden" : false}
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariants}
            transition={{ delay: 0.55 }}
          >
            Wszystkie zabiegi dostosowuję do Twoich potrzeb. Niezależnie od tego, czy potrzebujesz głębokiego relaksu, czy szybkiej ulgi w napiętych partiach ciała.
          </motion.p>
        </div>

        {/* Offerings grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:items-start">
          {offerings.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={isMotionEnabled ? "hidden" : false}
                animate={isInView ? "visible" : "hidden"}
                variants={fadeUpVariants}
                transition={{ delay: 0.5 + i * 0.15 }}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-[#2a302a] bg-[#131813] p-6 transition-colors duration-300 hover:border-[#8a9a7a]/40 hover:bg-[#161b16] sm:p-8 ${i === 1 ? 'lg:mt-12' : ''}`}
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#2a302a] text-[#8a9a7a] transition-colors duration-300 group-hover:border-[#8a9a7a] group-hover:bg-[#8a9a7a]/10">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>

                <h3 className="font-serif text-2xl font-light tracking-[-0.01em] text-[#f0eee9] sm:text-3xl">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm font-light leading-relaxed text-[#9ca394] sm:text-base">
                  {item.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {item.features.map((feature) => (
                    <li
                      key={feature}
                      className="rounded-full border border-[#2a302a] px-3 py-1 text-xs font-medium text-[#9ca394] transition-colors duration-300 group-hover:border-[#8a9a7a]/30 group-hover:text-[#f0eee9]/80"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-4">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-[#8a9a7a] transition-transform duration-300 group-hover:translate-x-1">
                    Sprawdź szczegóły
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </div>

                {/* Invisible link covering the card */}
                <a href="/cennik" className="absolute inset-0" aria-label={`Sprawdź szczegóły kategorii ${item.title}`} />
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row lg:mt-20"
          initial={isMotionEnabled ? "hidden" : false}
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpVariants}
          transition={{ delay: 1.1 }}
        >
          <motion.div
            whileHover={isMotionEnabled ? { scale: 1.02, y: -2 } : undefined}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              href="/cennik"
              size="lg"
              aria-label="Zobacz pełny cennik"
              className="group"
            >
              Pełny cennik
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Button>
          </motion.div>

          <Button
            href="#kontakt"
            variant="outline"
            size="lg"
            aria-label="Przejdź do formularza kontaktowego"
          >
            Umów się
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
