"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";

const easeCinematic = [0.22, 1, 0.36, 1] as const;

const navLinks = [
  { label: "O mnie", href: "#o-mnie" },
  { label: "Oferta", href: "#oferta" },
  { label: "Proces", href: "#proces" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#kontakt" },
];

export function Header() {
  const shouldReduceMotion = useReducedMotion();
  const isMotionEnabled = !shouldReduceMotion;
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      if (menuOpen) {
        setHidden(false);
      } else if (currentY > lastScrollY.current && currentY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 top-0 z-50 border-b border-[#2a302a]/50 bg-[#0f1411] transition-all duration-500"
        initial={isMotionEnabled ? { y: -20, opacity: 0 } : false}
        animate={{
          y: hidden ? -100 : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.5, ease: easeCinematic }}
      >
        <div className="mx-auto flex h-20 max-w-[90rem] items-center justify-between px-6 lg:h-24 lg:px-12">
          {/* Logo */}
          <Link href="/" className="group flex flex-col">
            <span className="text-base font-medium tracking-[-0.01em] text-[#f0eee9] transition-colors duration-300 group-hover:text-[#8a9a7a] lg:text-lg">
              Aleksander Pawłowski
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9ca394]">
              Mobilny masażysta
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-10 lg:flex" aria-label="Nawigacja główna">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-sm font-light text-[#f0eee9] transition-colors duration-300 hover:text-[#8a9a7a]"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#8a9a7a] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <motion.div
                whileHover={isMotionEnabled ? { scale: 1.02, y: -1 } : undefined}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  href="#kontakt"
                  size="default"
                  aria-label="Umów masaż"
                  className="group"
                >
                  Umów się
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>
              </motion.div>
            </div>

            <button
              onClick={() => setMenuOpen((p) => !p)}
              aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="inline-flex h-10 w-10 items-center justify-center text-[#f0eee9] transition-colors duration-300 hover:text-[#8a9a7a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a9a7a] lg:hidden"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#0f1411] px-6 lg:hidden"
            initial={isMotionEnabled ? { opacity: 0, y: -20 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: easeCinematic }}
          >
            <nav className="flex flex-col items-center gap-8" aria-label="Nawigacja mobilna">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-serif text-3xl font-light text-[#f0eee9] transition-colors duration-300 hover:text-[#8a9a7a]"
                  initial={isMotionEnabled ? { opacity: 0, y: 20 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: easeCinematic, delay: 0.1 + i * 0.05 }}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                className="mt-8"
                initial={isMotionEnabled ? { opacity: 0, y: 20 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: easeCinematic, delay: 0.4 }}
              >
                <Button
                  href="#kontakt"
                  size="lg"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Umów masaż"
                  className="group"
                >
                  Umów się
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
