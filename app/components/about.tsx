import Image from "next/image";
import { about } from "@/app/content";
import { TensionLine } from "@/app/components/tension-line";

export function About() {
  const ring = `${about.watermark} · ${about.watermark} · `;

  return (
    <section id="o-mnie" aria-labelledby="o-mnie-title" className="bg-skora-2 pb-20 lg:pb-32">
      <TensionLine from={0.06} to={0.04} seed={13} className="h-16 lg:h-24" />
      <div className="container-site grid grid-cols-1 gap-14 pt-10 lg:grid-cols-12 lg:gap-8 lg:pt-14">
        {/* Portret: prawdziwe zdjęcie w spokojnym kole, imię biegnie po okręgu */}
        <figure className="relative mx-auto w-full max-w-md lg:sticky lg:top-24 lg:col-span-5 lg:max-w-none lg:self-start">
          <div className="relative aspect-square">
            <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full text-mut" aria-hidden="true">
              <defs>
                <path id="okrag-imienia" d="M200 200m-182 0a182 182 0 1 1 364 0a182 182 0 1 1 -364 0" />
              </defs>
              <text className="fill-current text-[15px] font-semibold tracking-[0.32em]">
                <textPath href="#okrag-imienia">{ring}</textPath>
              </text>
            </svg>
            <div className="absolute inset-[11%] overflow-hidden rounded-full bg-brzoskwinia">
              <Image
                src="/olek.png"
                alt={about.photoAlt}
                fill
                quality={80}
                sizes="(min-width: 1024px) 32vw, 80vw"
                className="translate-y-[6%] scale-110 object-contain object-bottom"
              />
            </div>
          </div>
        </figure>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="tag">{about.eyebrow}</p>
          <p className="headline mt-5 text-h3">{about.lead}</p>
          <h2 id="o-mnie-title" className="headline mt-12 text-h2">
            {about.titleLines[0]} {about.titleLines[1]}
          </h2>

          <ol className="mt-8 flex flex-col gap-3">
            {about.timeline.map((item, i) => (
              <li key={item.title} className="rise rounded-[1.75rem] bg-skora p-5 lg:p-7">
                <div className="flex items-center gap-3">
                  <span className="tabular grid h-8 w-8 place-items-center rounded-full bg-skora-2 text-small font-semibold text-cegla">
                    {i + 1}
                  </span>
                  <h3 className="headline text-h4">{item.title}</h3>
                </div>
                <p className="mt-3 text-mut">{item.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 space-y-5 text-mut">
            {about.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 20)} className="max-w-[62ch]">
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {about.facts.map((fact) => (
              <li key={fact.label} className="flex flex-col rounded-[1.5rem] border border-linia px-5 py-4">
                <span className="font-semibold">{fact.label}</span>
                <span className="text-small text-mut">{fact.meta}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
