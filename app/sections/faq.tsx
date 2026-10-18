"use client";

import * as React from "react";
import { motion, useReducedMotion, useInView, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/app/components/ui/button";

const easeCinematic = [0.22, 1, 0.36, 1] as const;
const easeSoft = [0.25, 1, 0.5, 1] as const;

function FaqItem({
  faq,
  index,
  isOpen,
  isMotionEnabled,
  fadeUpVariants,
  onToggle,
}: {
  faq: { question: string; answer: string };
  index: number;
  isOpen: boolean;
  isMotionEnabled: boolean;
  fadeUpVariants: {
    hidden: { opacity: number; y: number };
    visible: {
      opacity: number;
      y: number;
      transition: { duration: number; ease: readonly [number, number, number, number] };
    };
  };
  onToggle: () => void;
}) {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const itemInView = useInView(itemRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={itemRef}
      className="relative"
      initial={isMotionEnabled ? "hidden" : false}
      animate={itemInView ? "visible" : "hidden"}
      variants={fadeUpVariants}
      transition={{ delay: 0.2 + index * 0.12 }}
    >
      <motion.div
        className="absolute left-0 top-0 h-px w-full bg-[#2a302a]"
        initial={isMotionEnabled ? { scaleX: 0 } : false}
        animate={itemInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration: 0.8,
          ease: easeCinematic,
          delay: 0.3 + index * 0.12,
        }}
        style={{ originX: 0 }}
      />

      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        className="group flex w-full items-start justify-between gap-6 py-7 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a9a7a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1411] sm:py-8"
      >
        <div className="flex items-start gap-4 sm:gap-6">
          <span className="pt-1.5 font-mono text-xs text-[#8a9a7a]">0{index + 1}</span>
          <h3 className="text-lg font-medium leading-snug text-[#f0eee9] transition-colors duration-300 group-hover:text-[#a3b092] sm:text-xl">
            {faq.question}
          </h3>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: easeCinematic }}
          className="mt-1 shrink-0"
        >
          <Plus
            className="h-5 w-5 text-[#8a9a7a] transition-colors duration-300 group-hover:text-[#f0eee9]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: easeCinematic }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-10 sm:pl-14">
              <p className="max-w-lg text-base font-light leading-relaxed text-[#9ca394]">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Faq() {
  const shouldReduceMotion = useReducedMotion();
  const isMotionEnabled = !shouldReduceMotion;
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
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

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: easeCinematic },
    },
  };

  const faqs = [
    {
      question: "Gdzie dojeżdżasz?",
      answer:
        "Na terenie Sochaczewa i najbliższych okolic. Jeśli mieszkasz trochę dalej, napisz i sprawdzimy, czy damy radę.",
    },
    {
      question: "Jak umówić wizytę?",
      answer:
        "Najłatwiej zadzwonić lub napisać maila lub wiadomość. Zazwyczaj odpisuję tego samego dnia i proponuję kilka terminów.",
    },
    {
      question: "Czy muszę coś przygotować?",
      answer:
        "Nie. Wystarczy wolna przestrzeń, na przykład w salonie lub sypialni. Przywożę własny stół, olejki i wszystko, co potrzebne.",
    },
    {
      question: "Czy masaż jest dopasowany do moich potrzeb?",
      answer:
        "Tak. Zawsze na początku rozmawiamy o tym, co Ci dolega i jakiego efektu oczekujesz. Każda wizyta wygląda nieco inaczej, bo każde ciało jest inne.",
    },
    {
      question: "Ile trwa cała wizyta?",
      answer:
        "Sam masaż trwa od 30 do 90 minut, w zależności od wybranego zabiegu. Z dojazdem i krótką rozmową na początku trzeba doliczyć około 15 do 20 minut.",
    },
  ];

  return (
    <section
      ref={ref}
      aria-label="Najczęściej zadawane pytania"
      id="faq"
      className="relative w-full overflow-hidden bg-[#0f1411] py-24 lg:py-32"
    >
      <div className="relative mx-auto max-w-[90rem] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          {/* Left: sticky header */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <motion.span
              className="mb-5 inline-block text-[11px] font-medium uppercase tracking-[0.25em] text-[#8a9a7a]"
              initial={isMotionEnabled ? "hidden" : false}
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUpVariants}
            >
              Pytania
            </motion.span>

            <h2 className="font-serif text-[#f0eee9]">
              <motion.span
                className="block text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[0.95] tracking-[-0.02em]"
                initial={isMotionEnabled ? "hidden" : false}
                animate={isInView ? "visible" : "hidden"}
                variants={lineVariants}
                transition={{ delay: 0.2 }}
              >
                Odpowiedzi
              </motion.span>
              <motion.span
                className="block text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.02em]"
                initial={isMotionEnabled ? "hidden" : false}
                animate={isInView ? "visible" : "hidden"}
                variants={lineVariants}
                transition={{ delay: 0.38 }}
              >
                na pytania
              </motion.span>
            </h2>

            <motion.p
              className="mt-6 max-w-sm text-base font-light leading-relaxed text-[#9ca394]"
              initial={isMotionEnabled ? "hidden" : false}
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUpVariants}
              transition={{ delay: 0.55 }}
            >
              Jeśli czegoś tu nie ma, napisz lub zadzwoń. Chętnie pomogę.
            </motion.p>
          </div>

          {/* Right: questions */}
          <div className="flex flex-col lg:col-span-7 lg:col-start-6">
            {faqs.map((faq, i) => (
              <FaqItem
                key={faq.question}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                isMotionEnabled={isMotionEnabled}
                fadeUpVariants={fadeUpVariants}
                onToggle={() => toggle(i)}
              />
            ))}

            {/* Final line */}
            <motion.div
              className="h-px w-full bg-[#2a302a]"
              initial={isMotionEnabled ? { scaleX: 0 } : false}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{
                duration: 0.8,
                ease: easeCinematic,
                delay: 0.3 + faqs.length * 0.12,
              }}
              style={{ originX: 0 }}
            />
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mx-auto mt-20 flex max-w-xl flex-col items-center justify-center gap-6 text-center lg:mt-28"
          initial={isMotionEnabled ? "hidden" : false}
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpVariants}
          transition={{ delay: 1.1 }}
        >
          <p className="max-w-sm text-sm font-light leading-relaxed text-[#9ca394]">
            Masz pytania? Chętnie odpowiem.
          </p>

          <motion.div
            whileHover={isMotionEnabled ? { scale: 1.02, y: -2 } : undefined}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              href="#kontakt"
              size="lg"
              aria-label="Skontaktuj się i umów wizytę"
              className="group"
            >
              Skontaktuj się
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
