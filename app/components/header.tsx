"use client";

import * as React from "react";
import Link from "next/link";
import { brand, contact, cta, nav, ui } from "@/app/content";
import { LogoMark } from "@/app/components/logo-mark";

export function Header() {
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const toggleRef = React.useRef<HTMLButtonElement>(null);

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
        className="site-header on-dark sticky top-0 z-50 bg-grafit text-kreda transition-transform duration-300 ease-[var(--ease-snap)] data-[hidden=true]:-translate-y-full"
        data-hidden={hidden && !open}
        style={{ viewTransitionName: "site-header" }}
      >
        <div className="container-site flex h-16 items-center justify-between gap-6">
          <Link href="/" prefetch={false} className="flex items-center gap-3" onClick={close}>
            <LogoMark className="h-9 text-szafran" />
            <span className="flex items-baseline gap-3">
              <span className="display text-[1.625rem] leading-none tracking-[0.01em]">{brand.name}</span>
              <span className="label hidden text-szafran sm:inline">{brand.role}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Nawigacja główna">
            {nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className="label py-2 text-kreda transition-colors hover:text-szafran"
              >
                {link.label}
              </Link>
            ))}
            <a href={contact.phoneHref} className="display tabular text-[1.5rem] leading-none text-szafran">
              {contact.phoneDisplay}
            </a>
            <Link href="/#kontakt" prefetch={false} className="btn btn-primary min-h-11 px-4 text-[0.75rem]">
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
            <span className="relative block h-3.5 w-7" aria-hidden="true">
              <span
                className={`absolute left-0 block h-[3px] w-7 bg-kreda transition-transform duration-200 ${open ? "top-[5px] rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 block h-[3px] bg-szafran transition-all duration-200 ${open ? "top-[5px] w-7 -rotate-45 bg-kreda" : "top-[11px] w-4"}`}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        id="menu-mobilne"
        ref={menuRef}
        hidden={!open}
        className="on-dark fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-grafit text-kreda lg:hidden"
      >
        <nav className="container-site flex min-h-full flex-col pb-10 pt-6" aria-label="Nawigacja mobilna">
          <ul>
            {nav.map((link, i) => (
              <li key={link.href} className="border-b-2 border-linia-jasna">
                <Link
                  href={link.href}
                  prefetch={false}
                  onClick={close}
                  className="flex items-center justify-between py-3"
                >
                  <span className="display text-[3.25rem]">{link.label}</span>
                  <span className="display outline-text-thin outline-szafran tabular text-[2.5rem]" aria-hidden="true">
                    0{i + 1}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-4 pt-10">
            <a href={contact.phoneHref} className="display tabular text-[3rem] text-szafran">
              {contact.phoneDisplay}
            </a>
            <a href={contact.emailHref} className="text-small text-mgla">
              {contact.email}
            </a>
            <Link href="/#kontakt" prefetch={false} onClick={close} className="btn btn-primary mt-2 self-start">
              {cta.book}
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
