"use client";

import * as React from "react";
import Link from "next/link";
import { brand, contact, cta, nav, ui } from "@/app/content";

export function Header() {
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const toggleRef = React.useRef<HTMLButtonElement>(null);

  // Chowa się przy przewijaniu w dół, wraca przy przewijaniu w górę.
  React.useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setHidden(y > 160 && y > lastY);
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    menuRef.current?.querySelector("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className="site-header sticky top-0 z-50 bg-len transition-transform duration-500 ease-[var(--ease-out-soft)] data-[hidden=true]:-translate-y-full"
        data-hidden={hidden && !open}
        style={{ viewTransitionName: "site-header" }}
      >
        <div className="container-site flex h-16 items-center justify-between lg:h-20">
          <Link href="/" className="group flex flex-col leading-none" onClick={close}>
            <span className="font-soft text-[1.3125rem] tracking-[-0.01em] text-orzech lg:text-[1.5rem]">
              {brand.name}
            </span>
            <span className="mt-1 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-kamien">
              {brand.role}
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Nawigacja główna">
            {nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className="text-small text-orzech transition-colors hover:text-glina"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/#kontakt" prefetch={false} className="btn btn-primary min-h-11 px-6 text-small">
              {cta.book}
            </Link>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobilne"
            aria-label={open ? ui.closeMenu : ui.openMenu}
            className="-mr-2 grid h-11 w-11 place-items-center lg:hidden"
          >
            <span className="relative block h-3 w-7" aria-hidden="true">
              <span
                className={`absolute left-0 block h-px w-7 bg-orzech transition-transform duration-300 ${open ? "top-1.5 rotate-[20deg]" : "top-0"}`}
              />
              <span
                className={`absolute left-0 block h-px bg-orzech transition-all duration-300 ${open ? "top-1.5 w-7 -rotate-[20deg]" : "top-3 w-5"}`}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        id="menu-mobilne"
        ref={menuRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-len lg:hidden"
      >
        <nav className="container-site flex min-h-full flex-col pb-10 pt-8" aria-label="Nawigacja mobilna">
          <ul className="flex flex-col">
            {nav.map((link, i) => (
              <li key={link.href} className="border-b border-linia">
                <Link
                  href={link.href}
                  onClick={close}
                  className="flex items-baseline gap-4 py-4 font-display text-[2.5rem] text-orzech"
                >
                  <span className="font-sans text-micro tabular text-kamien">0{i + 1}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3 pt-10">
            <a href={contact.phoneHref} className="font-display text-[2rem] text-orzech">
              {contact.phoneDisplay}
            </a>
            <a href={contact.emailHref} className="text-small text-kamien">
              {contact.email}
            </a>
            <Link href="/#kontakt" prefetch={false} onClick={close} className="btn btn-primary mt-4 self-start">
              {cta.book}
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
