"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { ArrowLeft, Clock, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";

const easeCinematic = [0.22, 1, 0.36, 1] as const;
const easeSoft = [0.25, 1, 0.5, 1] as const;

const categories = [
  {
    title: "Plecy, barki i kark",
    services: [
      { name: "Masaż relaksacyjny pleców, barków i karku", duration: "60 min", price: "180 zł" },
      { name: "Masaż relaksacyjny pleców i karku", duration: "45 min", price: "150 zł" },
      { name: "Masaż relaksacyjny pleców", duration: "30 min", price: "100 zł" },
      { name: "Masaż relaksacyjny rąk i barków", duration: "45 min", price: "120 zł" },
    ],
  },
  {
    title: "Nogi i całe ciało",
    services: [
      { name: "Masaż relaksacyjny całego ciała", duration: "90 min", price: "240 zł" },
      { name: "Masaż relaksacyjny nogi+plecy", duration: "60 min", price: "150 zł" },
      { name: "Masaż relaksacyjny stóp i łydek", duration: "45 min", price: "150 zł" },
      { name: "Masaż relaksacyjny nóg", duration: "45 min", price: "120 zł" },
      { name: "Masaż dostawowy", duration: "30 min", price: "80 zł" },
    ],
  },
  {
    title: "Twarz",
    services: [
      { name: "Zabieg kobido complex (masaż+lifting)", duration: "90 min", price: "250 zł" },
      { name: "Masaż kobido", duration: "60 min", price: "220 zł" },
    ],
  },
];

function PriceRow({
  service,
  index,
}: {
  service: (typeof categories)[0]["services"][0];
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const isMotionEnabled = !shouldReduceMotion;
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={isMotionEnabled ? { opacity: 0, y: 12 } : false}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.8, ease: easeCinematic, delay: index * 0.1 }}
      className="group flex flex-col gap-1 border-b border-[#2a302a]/60 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
    >
      <span className="text-base font-medium text-[#f0eee9] sm:text-lg">
        {service.name}
      </span>
      <div className="flex items-center gap-6">
        <span className="flex items-center gap-2 text-sm text-[#9ca394]">
          <Clock className="h-4 w-4 text-[#8a9a7a]" strokeWidth={1.5} />
          {service.duration}
        </span>
        <span className="min-w-[5rem] text-right font-serif text-xl font-light text-[#f0eee9]">
          {service.price}
        </span>
      </div>
    </motion.div>
  );
}

export default function CennikPage() {
  const shouldReduceMotion = useReducedMotion();
  const isMotionEnabled = !shouldReduceMotion;
  const headerRef = React.useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

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
      transition: { duration: 1.2, ease: easeCinematic },
    },
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0f1411] pb-20 pt-24 lg:pb-28 lg:pt-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-[10%] top-[5%] h-[30rem] w-[30rem] rounded-full bg-[#8a9a7a]/8 blur-[8rem]" />
        <div className="absolute bottom-[10%] right-[5%] h-[25rem] w-[25rem] rounded-full bg-[#6b8a72]/6 blur-[6rem]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[90rem] px-6 lg:px-12">
        {/* Back link */}
        <motion.div
          initial={isMotionEnabled ? "hidden" : false}
          animate={isHeaderInView ? "visible" : "hidden"}
          variants={fadeUpVariants}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-light text-[#9ca394] transition-colors duration-300 hover:text-[#f0eee9]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1.5} />
            Powrót na stronę główną
          </Link>
        </motion.div>

        {/* Header */}
        <div ref={headerRef} className="mx-auto mt-10 max-w-2xl text-center lg:mt-14">
          <motion.span
            className="mb-5 inline-block text-[11px] font-medium uppercase tracking-[0.25em] text-[#8a9a7a]"
            initial={isMotionEnabled ? "hidden" : false}
            animate={isHeaderInView ? "visible" : "hidden"}
            variants={fadeUpVariants}
          >
            Oferta
          </motion.span>

          <h1 className="font-serif text-[#f0eee9]">
            <motion.span
              className="block text-[clamp(2.5rem,6vw,5rem)] font-light leading-[0.95] tracking-[-0.02em]"
              initial={isMotionEnabled ? "hidden" : false}
              animate={isHeaderInView ? "visible" : "hidden"}
              variants={lineVariants}
              transition={{ delay: 0.2 }}
            >
              Cennik
            </motion.span>
          </h1>

          <motion.p
            className="mt-6 text-base font-light leading-relaxed text-[#9ca394] lg:text-lg"
            initial={isMotionEnabled ? "hidden" : false}
            animate={isHeaderInView ? "visible" : "hidden"}
            variants={fadeUpVariants}
            transition={{ delay: 0.5 }}
          >
            Dziękuję za zainteresowanie moimi usługami. Poniżej znajdziesz szczegółowy cennik wszystkich zabiegów.
          </motion.p>
        </div>

        {/* Price list */}
        <div className="mx-auto mt-16 max-w-3xl lg:mt-24">
          {categories.map((category, ci) => {
            return (
              <motion.div
                key={category.title}
                className="mb-14 lg:mb-20"
                initial={isMotionEnabled ? { opacity: 0, y: 20 } : false}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.9, ease: easeCinematic, delay: ci * 0.15 }}
              >
                <div className="mb-6 flex items-center gap-4">
                  <span className="h-px flex-1 bg-[#2a302a]" />
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#8a9a7a]">
                    {category.title}
                  </span>
                  <span className="h-px flex-1 bg-[#2a302a]" />
                </div>

                <div className="rounded-2xl border border-[#2a302a] bg-[#131813] px-5 py-2 sm:px-8 sm:py-4">
                  {category.services.map((service, si) => (
                    <PriceRow key={service.name} service={service} index={si} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="mx-auto mt-6 flex max-w-xl flex-col items-center gap-6 text-center"
          initial={isMotionEnabled ? "hidden" : false}
          animate={isHeaderInView ? "visible" : "hidden"}
          variants={fadeUpVariants}
          transition={{ delay: 0.9 }}
        >
          <p className="text-base font-light text-[#9ca394]">
            Masz pytania lub chcesz umówić wizytę?
          </p>
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <Button href="tel:+48692094577" size="lg" className="group">
              <Phone className="h-4 w-4" strokeWidth={1.5} />
              692 094 577
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button href="/#kontakt" variant="outline" size="lg">
              Formularz kontaktowy
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
