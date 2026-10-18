"use client";

import * as React from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin, Clock, Car } from "lucide-react";

const easeCinematic = [0.22, 1, 0.36, 1] as const;
const easeSoft = [0.25, 1, 0.5, 1] as const;

export function Contact() {
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
      transition: { duration: 1.2, ease: easeSoft },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: easeCinematic },
    },
  };

  return (
    <section
      ref={ref}
      aria-label="Kontakt"
      id="kontakt"
      className="relative w-full overflow-hidden bg-[#0a0e0c] py-24 lg:py-32"
    >
      <div className="relative z-10 mx-auto max-w-[90rem] px-6 lg:px-12">
        {/* Top header row */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-24">
          <div>
            <motion.span
              className="mb-5 inline-block text-[11px] font-medium uppercase tracking-[0.25em] text-[#8a9a7a]"
              initial={isMotionEnabled ? "hidden" : false}
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUpVariants}
            >
              Kontakt
            </motion.span>

            <h2 className="font-serif text-[#f0eee9]">
              <motion.span
                className="block text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[0.95] tracking-[-0.02em]"
                initial={isMotionEnabled ? "hidden" : false}
                animate={isInView ? "visible" : "hidden"}
                variants={lineVariants}
                transition={{ delay: 0.15 }}
              >
                Porozmawiajmy
              </motion.span>
            </h2>
          </div>

          <div className="flex flex-col justify-end">
            <motion.p
              className="max-w-md text-base font-light leading-relaxed text-[#9ca394] lg:text-lg"
              initial={isMotionEnabled ? "hidden" : false}
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUpVariants}
              transition={{ delay: 0.35 }}
            >
              Zadzwoń lub napisz. Zazwyczaj odpisuję w ciągu kilku godzin i szybko ustalimy dogodny termin.
            </motion.p>

            {/* Trust pills */}
            <motion.div
              className="mt-6 flex flex-wrap gap-3"
              initial={isMotionEnabled ? "hidden" : false}
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUpVariants}
              transition={{ delay: 0.55 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#2a302a] px-4 py-2 text-sm font-light text-[#9ca394]">
                <Clock className="h-3.5 w-3.5 text-[#8a9a7a]" strokeWidth={1.5} />
                Szybka odpowiedź
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#2a302a] px-4 py-2 text-sm font-light text-[#9ca394]">
                <Car className="h-3.5 w-3.5 text-[#8a9a7a]" strokeWidth={1.5} />
                Dojazd gratis
              </span>
            </motion.div>
          </div>
        </div>

        {/* Bottom row: contact details + map */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:mt-24 lg:grid-cols-2 lg:gap-16">
          {/* Left: contact details */}
          <div className="flex flex-col justify-center">
            {/* Phone */}
            <motion.div
              className="group border-b border-[#2a302a] py-8"
              initial={isMotionEnabled ? "hidden" : false}
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUpVariants}
              transition={{ delay: 0.45 }}
            >
              <a href="tel:+48692094577" className="flex items-start justify-between gap-6">
                <div className="flex items-start gap-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#2a302a] text-[#8a9a7a] transition-colors duration-300 group-hover:border-[#8a9a7a] group-hover:bg-[#8a9a7a]/10">
                    <Phone className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <div>
                    <span className="block text-[10px] font-medium uppercase tracking-[0.15em] text-[#8a9a7a]">
                      Telefon
                    </span>
                    <span className="mt-1 block font-serif text-3xl font-light tracking-[-0.01em] text-[#f0eee9] transition-colors duration-300 group-hover:text-[#8a9a7a] sm:text-4xl">
                      692 094 577
                    </span>
                  </div>
                </div>
                <ArrowRight className="mt-3 h-5 w-5 -rotate-45 text-[#8a9a7a] opacity-0 transition-all duration-300 group-hover:rotate-0 group-hover:opacity-100" strokeWidth={1.5} />
              </a>
            </motion.div>

            {/* Email */}
            <motion.div
              className="group border-b border-[#2a302a] py-8"
              initial={isMotionEnabled ? "hidden" : false}
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUpVariants}
              transition={{ delay: 0.6 }}
            >
              <a href="mailto:kontakt@aleksanderpawlowski.pl" className="flex items-start justify-between gap-6">
                <div className="flex items-start gap-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#2a302a] text-[#8a9a7a] transition-colors duration-300 group-hover:border-[#8a9a7a] group-hover:bg-[#8a9a7a]/10">
                    <Mail className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <div>
                    <span className="block text-[10px] font-medium uppercase tracking-[0.15em] text-[#8a9a7a]">
                      E-mail
                    </span>
                    <span className="mt-1 block text-xl font-light tracking-[-0.01em] text-[#f0eee9] transition-colors duration-300 group-hover:text-[#8a9a7a] sm:text-2xl">
                      kontakt@aleksanderpawlowski.pl
                    </span>
                  </div>
                </div>
                <ArrowRight className="mt-3 h-5 w-5 -rotate-45 text-[#8a9a7a] opacity-0 transition-all duration-300 group-hover:rotate-0 group-hover:opacity-100" strokeWidth={1.5} />
              </a>
            </motion.div>

            {/* Location */}
            <motion.div
              className="group border-b border-[#2a302a] py-8"
              initial={isMotionEnabled ? "hidden" : false}
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUpVariants}
              transition={{ delay: 0.75 }}
            >
              <div className="flex items-start gap-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#2a302a] text-[#8a9a7a]">
                  <MapPin className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <div>
                  <span className="block text-[10px] font-medium uppercase tracking-[0.15em] text-[#8a9a7a]">
                    Dojazd
                  </span>
                  <span className="mt-1 block text-xl font-light tracking-[-0.01em] text-[#f0eee9] sm:text-2xl">
                    Sochaczew i okolice
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: map */}
          <motion.div
            className="relative min-h-[320px] overflow-hidden rounded-2xl border border-[#2a302a] lg:min-h-full"
            initial={isMotionEnabled ? "hidden" : false}
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariants}
            transition={{ delay: 0.6 }}
          >
            <iframe
              title="Mapa Sochaczew"
              src="https://www.openstreetmap.org/export/embed.html?bbox=20.20%2C52.21%2C20.27%2C52.24&amp;layer=mapnik&amp;marker=52.2295%2C20.2384"
              className="absolute inset-0 h-full w-full border-0 grayscale-[100%] invert-[90%] contrast-[85%]"
              loading="lazy"
            />
            {/* Overlay gradient for seamless edges */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_40px_rgba(10,14,12,0.8)]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
