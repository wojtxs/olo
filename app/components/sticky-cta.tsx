"use client";

import * as React from "react";
import { contact, ui } from "@/app/content";

// Pasek „Zadzwoń / Napisz” na telefonie — od krawędzi do krawędzi, jak tablica wyników.
// Pojawia się po minięciu przycisku z hero i chowa nad sekcją Kontakt.
export function StickyCta() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const hero = document.querySelector("[data-hero-cta]");
    const contactSection = document.getElementById("kontakt");
    const state = { pastHero: !hero, inContact: false };
    const update = () => setVisible(state.pastHero && !state.inContact);

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) {
          state.pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        } else {
          state.inContact = entry.isIntersecting;
        }
      }
      update();
    });
    if (hero) observer.observe(hero);
    if (contactSection) observer.observe(contactSection);
    update();
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t-2 border-grafit bg-grafit pb-[env(safe-area-inset-bottom)] transition-transform duration-300 ease-[var(--ease-snap)] data-[visible=false]:pointer-events-none data-[visible=false]:translate-y-full lg:hidden"
      data-visible={visible}
      inert={!visible}
    >
      <a href={contact.phoneHref} className="label flex h-14 items-center justify-center bg-szafran text-[0.8125rem] text-grafit">
        {ui.call}
      </a>
      <a href={contact.emailHref} className="label flex h-14 items-center justify-center text-[0.8125rem] text-kreda">
        {ui.write}
      </a>
    </div>
  );
}
