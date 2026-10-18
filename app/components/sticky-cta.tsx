"use client";

import * as React from "react";
import { contact, ui } from "@/app/content";

// Pasek „Zadzwoń / Napisz” na telefonie. Pojawia się po minięciu przycisku z hero
// i chowa nad sekcją Kontakt, żeby jej nie dublować.
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
      className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-40 grid grid-cols-[1.4fr_1fr] gap-2 transition-[translate,opacity] duration-500 ease-[var(--ease-calm)] data-[visible=false]:pointer-events-none data-[visible=false]:translate-y-[150%] data-[visible=false]:opacity-0 lg:hidden"
      data-visible={visible}
      inert={!visible}
    >
      <a
        href={contact.phoneHref}
        className="flex h-14 items-center justify-center rounded-full bg-cegla font-semibold text-skora shadow-[0_10px_30px_-12px_rgba(61,21,19,0.6)] active:scale-[0.97]"
      >
        {ui.call}
      </a>
      <a
        href={contact.emailHref}
        className="flex h-14 items-center justify-center rounded-full bg-wino font-semibold text-skora shadow-[0_10px_30px_-12px_rgba(61,21,19,0.6)] active:scale-[0.97]"
      >
        {ui.write}
      </a>
    </div>
  );
}
