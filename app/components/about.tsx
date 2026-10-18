import Image from "next/image";
import { about } from "@/app/content";

export function About() {
  return (
    <section id="o-mnie" aria-labelledby="o-mnie-title" className="overflow-x-clip py-24 lg:py-40">
      <div className="container-site">
        <p className="eyebrow">{about.eyebrow}</p>
        <p className="font-soft reveal mt-6 max-w-[24ch] text-h3 leading-[1.1] tracking-[-0.015em] lg:max-w-[30ch]">
          {about.lead}
        </p>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          {/* Portret: wycięta sylwetka wychodzi ponad piaskowy blok */}
          <figure className="relative mx-auto aspect-[4/5] w-full max-w-md lg:sticky lg:top-28 lg:col-span-5 lg:max-w-none lg:self-start">
            <div className="absolute inset-x-0 bottom-0 top-[30%] overflow-hidden bg-piasek-jasny" aria-hidden="true">
              <p className="font-display absolute -left-[0.04em] bottom-[-0.12em] whitespace-nowrap text-[clamp(4rem,21vw,9rem)] leading-[0.8] text-recznik [writing-mode:vertical-rl] rotate-180">
                {about.watermark.split(" ")[0]}
              </p>
              <p className="font-display absolute -right-[0.06em] top-[0.05em] whitespace-nowrap text-[clamp(4rem,21vw,9rem)] leading-[0.8] text-recznik [writing-mode:vertical-rl]">
                {about.watermark.split(" ")[1]}
              </p>
            </div>
            <Image
              src="/olek.png"
              alt={about.photoAlt}
              width={800}
              height={800}
              quality={80}
              sizes="(min-width: 1024px) 45vw, (min-width: 448px) 500px, 112vw"
              className="absolute bottom-0 left-1/2 h-auto w-[112%] max-w-none -translate-x-1/2"
            />
          </figure>

          <div className="lg:col-span-6 lg:col-start-7">
            <h2 id="o-mnie-title" className="font-display text-h2">
              <span className="block">{about.titleLines[0]}</span>
              <span className="block italic">{about.titleLines[1]}</span>
            </h2>

            <ol className="mt-12 border-t border-linia">
              {about.timeline.map((item, i) => (
                <li key={item.title} className="reveal grid grid-cols-[2.75rem_1fr] gap-x-3 border-b border-linia py-7 lg:py-9">
                  <span className="tabular pt-1.5 text-small text-glina">0{i + 1}</span>
                  <div>
                    <h3 className="font-soft text-h4 leading-tight">{item.title}</h3>
                    <p className="mt-3 max-w-[52ch] text-kamien">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-12 space-y-5 border-l-2 border-olej pl-6 text-kamien lg:mt-16 lg:pl-8">
              {about.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 20)} className="max-w-[60ch]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <ul className="mt-20 grid grid-cols-2 border-t border-orzech lg:mt-28 lg:grid-cols-4">
          {about.facts.map((fact, i) => (
            <li
              key={fact.label}
              className={`flex flex-col gap-2 border-b border-linia py-6 pr-4 lg:border-b-0 lg:py-8 ${i % 2 === 1 ? "border-l pl-4 lg:pl-6" : ""} ${i >= 1 ? "lg:border-l lg:pl-6" : ""}`}
            >
              <span className="tabular text-small text-glina">0{i + 1}</span>
              <span className="font-soft text-[1.375rem] leading-tight lg:text-h4">{fact.label}</span>
              <span className="text-micro font-medium uppercase tracking-[0.16em] text-kamien">{fact.meta}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
