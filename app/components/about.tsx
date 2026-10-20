import Image from "next/image";
import { about, brand } from "@/app/content";

export function About() {
  const ring = `${about.watermark} · ${brand.role.toUpperCase()}`;

  return (
    <section id="o-mnie" aria-labelledby="o-mnie-title" className="sheet bg-skora-2 pb-28 lg:pb-44">
      <div className="container-site grid grid-cols-1 gap-14 pt-16 lg:grid-cols-12 lg:gap-8 lg:pt-24">
        {/* Portret: prawdziwe zdjęcie w spokojnym kole. Głowa wychodzi ponad okrąg,
            dół zdjęcia chowa się w łuku, a imię biegnie dolną krawędzią. */}
        <figure className="relative mx-auto w-full max-w-md lg:sticky lg:top-24 lg:col-span-5 lg:max-w-none lg:self-start">
          <div className="relative aspect-square">
            <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full text-mut" aria-hidden="true">
              <defs>
                <path id="luk-imienia" d="M14 200a186 186 0 0 0 372 0" />
              </defs>
              <text className="fill-current text-[14px] font-semibold tracking-[0.3em]">
                <textPath href="#luk-imienia" startOffset="50%" textAnchor="middle">
                  {ring}
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-[11%] rounded-full bg-brzoskwinia" aria-hidden="true" />
            <div className="absolute inset-x-[11%] bottom-[11%] top-[3%] overflow-hidden rounded-b-full">
              <Image
                src="/aleksander-pawlowski.png"
                alt={about.photoAlt}
                fill
                quality={80}
                sizes="(min-width: 1024px) 24vw, 60vw"
                className="object-contain object-bottom"
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
