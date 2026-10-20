import Image from "next/image";
import { about, brand } from "@/app/content";
import { CourtLines } from "@/app/components/court-lines";

export function About() {
  const [first, last] = about.watermark.split(" ");

  return (
    <section id="o-mnie" aria-labelledby="o-mnie-title" className="py-20 lg:py-32">
      <div className="container-site grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-x-8">
        {/* Karta zawodnika: prawdziwe zdjęcie i fakty z profilu, bez dopisanych statystyk */}
        <div className="lg:col-span-5">
          <p className="label text-szafran-ciemny">{about.eyebrow}</p>
          <figure className="mt-6 border-2 border-grafit bg-kreda shadow-[8px_8px_0_var(--grafit)] lg:sticky lg:top-24">
            <div className="flex items-end justify-between gap-4 bg-grafit px-4 pb-3 pt-4 text-kreda">
              <p className="display text-[clamp(2.25rem,9vw,3.5rem)] leading-[0.82]">
                <span className="block">{first}</span>
                <span className="block text-szafran">{last}</span>
              </p>
              <p className="label max-w-[8rem] text-right text-mgla">{brand.role}</p>
            </div>
            <div className="relative aspect-square overflow-hidden bg-szafran">
              <CourtLines className="absolute inset-0 h-full w-full text-grafit/25" strokeWidth={1.5} />
              <div className="absolute inset-x-0 bottom-0 top-[7%]">
                <Image
                  src="/aleksander-pawlowski.png"
                  alt={about.photoAlt}
                  fill
                  quality={80}
                  sizes="(min-width: 1024px) 22vw, 60vw"
                  className="object-contain object-bottom"
                />
              </div>
            </div>
            <ul>
              {about.facts.map((fact, i) => (
                <li
                  key={fact.label}
                  className="grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-3 border-t-2 border-grafit px-4 py-3"
                >
                  <span className="display tabular text-[1.5rem] text-szafran-ciemny">0{i + 1}</span>
                  <span className="display text-[1.5rem] leading-none">{fact.label}</span>
                  <span className="label text-right text-szary">{fact.meta}</span>
                </li>
              ))}
            </ul>
          </figure>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-12">
          <p className="display text-[clamp(2.25rem,1.6rem+3vw,4.25rem)] leading-[0.9]">{about.lead}</p>

          <h2 id="o-mnie-title" className="display mt-14 text-h2 lg:mt-20">
            <span className="block">{about.titleLines[0]}</span>
            <span className="outline-text outline-szafran-ciemny block">{about.titleLines[1]}</span>
          </h2>

          <ol className="mt-12">
            {about.timeline.map((item, i) => (
              <li key={item.title} className="pop grid grid-cols-[4.5rem_1fr] gap-x-4 border-t-2 border-grafit py-7 lg:grid-cols-[6rem_1fr]">
                <span className="display outline-text-thin tabular text-[3.75rem] leading-[0.8] lg:text-[5rem]" aria-hidden="true">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="display text-h4">{item.title}</h3>
                  <p className="mt-3 max-w-[54ch] text-szary">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 space-y-5 border-l-4 border-szafran pl-5 text-szary lg:pl-7">
            {about.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 20)} className="max-w-[62ch]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
