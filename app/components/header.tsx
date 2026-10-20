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
        className="site-header sticky top-0 z-50 bg-skora transition-transform duration-500 ease-[var(--ease-calm)] data-[hidden=true]:-translate-y-full"
        data-hidden={hidden && !open}
        style={{ viewTransitionName: "site-header" }}
      >
        <div className="container-site flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          <Link href="/" prefetch={false} className="flex items-center gap-3" onClick={close}>
            <LogoMark className="h-10 text-cegla" />
            <span className="flex flex-col leading-tight">
              <span className="text-[1.125rem] font-semibold tracking-[-0.02em]">{brand.name}</span>
              <span className="text-[0.8125rem] text-mut">{brand.role}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Nawigacja główna">
            {nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className="rounded-full px-4 py-2 text-small font-medium transition-colors hover:bg-skora-2"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/#kontakt" prefetch={false} className="btn btn-primary ml-3 min-h-11 px-5 text-small">
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
            className="grid h-11 w-11 place-items-center rounded-full bg-skora-2 lg:hidden"
          >
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden="true">
              {open ? (
                <path d="M4 1l14 12M18 1L4 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              ) : (
                <path d="M1 4c3.5-3 6.5 3 10 0s6.5-3 10 0M1 11c3.5-2 6.5 2 10 0s6.5-2 10 0" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </header>

      <div id="menu-mobilne" ref={menuRef} hidden={!open} className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-skora lg:hidden">
        <nav className="container-site flex min-h-full flex-col pb-10 pt-6" aria-label="Nawigacja mobilna">
          <ul className="flex flex-col gap-2">
            {nav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  prefetch={false}
                  onClick={close}
                  className="headline block rounded-[1.5rem] bg-skora-2 px-5 py-4 text-[2rem]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3 pt-10">
            <a href={contact.phoneHref} className="headline tabular text-[2.25rem]">
              {contact.phoneDisplay}
            </a>
            <a href={contact.emailHref} className="text-mut">
              {contact.email}
            </a>
            <Link href="/#kontakt" prefetch={false} onClick={close} className="btn btn-primary mt-3 self-start">
              {cta.book}
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
