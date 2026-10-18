"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, ArrowUp } from "lucide-react";

const easeCinematic = [0.22, 1, 0.36, 1] as const;
const easeSoft = [0.25, 1, 0.5, 1] as const;

const navLinks = [
  { label: "Strona główna", href: "/" },
  { label: "O mnie", href: "#o-mnie" },
  { label: "Oferta", href: "#oferta" },
  { label: "Proces", href: "#proces" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#kontakt" },
];

export function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const isMotionEnabled = !shouldReduceMotion;
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: easeCinematic },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.4, ease: easeSoft },
    },
  };

  return (
    <footer
      ref={ref}
      className="relative w-full overflow-hidden rounded-t-[2.5rem] bg-[#0b0f0d] pt-20 lg:rounded-t-[3.5rem] lg:pt-28"
    >
      {/* Top accent line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8a9a7a]/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[90rem] px-6 lg:px-12">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Brand column */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <motion.div
              initial={isMotionEnabled ? "hidden" : false}
              animate={isInView ? "visible" : "hidden"}
              variants={lineVariants}
            >
              <Link href="/" className="group inline-flex flex-col">
                <span className="font-serif text-3xl font-light tracking-[-0.02em] text-[#f0eee9] transition-colors duration-300 group-hover:text-[#8a9a7a] sm:text-4xl">
                  Aleksander Pawłowski
                </span>
                <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#9ca394]">
                  Mobilny masażysta
                </span>
              </Link>
            </motion.div>

            <motion.p
              className="max-w-sm text-base font-light leading-relaxed text-[#9ca394]"
              initial={isMotionEnabled ? "hidden" : false}
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUpVariants}
              transition={{ delay: 0.25 }}
            >
              Masaż z dojazdem do domu w Sochaczewie i okolicach. Bez zbędnego pośpiechu, w Twoim tempie i komfortowym miejscu.
            </motion.p>
          </div>

          {/* Navigation column */}
          <div className="lg:col-span-3 lg:col-start-7">
            <motion.span
              className="mb-5 block text-xs font-medium uppercase tracking-[0.2em] text-[#8a9a7a]"
              initial={isMotionEnabled ? "hidden" : false}
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUpVariants}
            >
              Nawigacja
            </motion.span>

            <nav className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-1 sm:gap-y-3" aria-label="Nawigacja w stopce">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="group relative inline-flex w-fit text-sm font-light text-[#f0eee9] transition-colors duration-300 hover:text-[#8a9a7a]"
                  initial={isMotionEnabled ? "hidden" : false}
                  animate={isInView ? "visible" : "hidden"}
                  variants={fadeUpVariants}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#8a9a7a] transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Contact column */}
          <div className="lg:col-span-3 lg:col-start-10">
            <motion.span
              className="mb-5 block text-xs font-medium uppercase tracking-[0.2em] text-[#8a9a7a]"
              initial={isMotionEnabled ? "hidden" : false}
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUpVariants}
            >
              Kontakt
            </motion.span>

            <motion.div
              className="flex flex-col gap-5"
              initial={isMotionEnabled ? "hidden" : false}
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUpVariants}
              transition={{ delay: 0.35 }}
            >
              <a
                href="tel:+48692094577"
                className="group inline-flex items-center gap-3"
                aria-label="Zadzwoń pod numer telefonu"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2a302a] text-[#8a9a7a] transition-colors duration-300 group-hover:border-[#8a9a7a] group-hover:bg-[#8a9a7a]/10">
                  <Phone className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <span className="text-base font-light text-[#f0eee9] transition-colors duration-300 group-hover:text-[#8a9a7a]">
                  692 094 577
                </span>
              </a>

              <a
                href="mailto:kontakt@aleksanderpawlowski.pl"
                className="group inline-flex items-center gap-3"
                aria-label="Napisz wiadomość e-mail"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2a302a] text-[#8a9a7a] transition-colors duration-300 group-hover:border-[#8a9a7a] group-hover:bg-[#8a9a7a]/10">
                  <Mail className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <span className="text-base font-light text-[#f0eee9] transition-colors duration-300 group-hover:text-[#8a9a7a]">
                  kontakt@aleksanderpawlowski.pl
                </span>
              </a>

              <div className="inline-flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2a302a] text-[#8a9a7a]">
                  <MapPin className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <span className="text-base font-light text-[#f0eee9]">
                  Sochaczew i okolice
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Separator */}
        <motion.div
          className="relative my-14 h-px w-full overflow-hidden lg:my-20"
          initial={isMotionEnabled ? { scaleX: 0 } : false}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.6, ease: easeCinematic, delay: 0.7 }}
          style={{ originX: 0 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#2a302a] via-[#2a302a] to-transparent" />
        </motion.div>

        {/* Bottom row */}
        <motion.div
          className="flex flex-col items-center justify-between gap-5 pb-10 text-center sm:flex-row sm:text-left"
          initial={isMotionEnabled ? "hidden" : false}
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpVariants}
          transition={{ delay: 1.0 }}
        >
          <p className="text-sm font-light text-[#9ca394]">
            © {new Date().getFullYear()} Aleksander Pawłowski. Wszelkie prawa zastrzeżone.
          </p>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 text-sm font-light text-[#9ca394] transition-colors duration-300 hover:text-[#f0eee9]"
            aria-label="Przewiń do góry"
          >
            Do góry
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#2a302a] transition-all duration-300 group-hover:border-[#8a9a7a] group-hover:bg-[#8a9a7a]/10">
              <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </span>
          </button>
        </motion.div>
      </div>
    </footer>
  );
}
