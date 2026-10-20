import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { cta, offer, pricing } from "@/app/content";
import { ArrowRight } from "@/app/components/icons";

export function Offer() {
  return (
    <section id="oferta" aria-labelledby="oferta-title" className="bg-kreda-2 py-20 lg:py-32">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label text-szafran-ciemny">{offer.eyebrow}</p>
            <h2 id="oferta-title" className="display mt-5 text-h2">
              <span className="block">{offer.titleLines[0]}</span>
              <span className="outline-text block">{offer.titleLines[1]}</span>
            </h2>
          </div>
          <p className="max-w-[42ch] text-lead text-szary lg:col-span-4 lg:col-start-9">{offer.lead}</p>
        </div>

        <div className="mt-16 flex flex-col gap-16 lg:mt-24 lg:gap-24">
          {offer.categories.map((category, i) => {
            const services = pricing.categories.find((c) => c.slug === category.slug)?.services ?? [];
            return (
              <article key={category.slug} className="border-t-4 border-grafit pt-6 lg:pt-8">
                <div className="flex items-start justify-between gap-6">
                  <ViewTransition name={`kategoria-${category.slug}`} share="morph">
                    <h3 className="display text-h3">{category.title}</h3>
                  </ViewTransition>
                  <span className="display outline-text outline-szafran-ciemny tabular text-[4.5rem] leading-[0.75] lg:text-[8rem]" aria-hidden="true">
                    0{i + 1}
                  </span>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
                  <div className="shot wipe mr-[10px] aspect-[4/5] lg:col-span-4">
                    <div className="relative h-full w-full overflow-hidden bg-grafit">
                      <Image
                        src={category.image.src}
                        alt={category.image.alt}
                        fill
                        quality={70}
                        sizes="(min-width: 1024px) 30vw, 95vw"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-4">
                    <p className="text-lead leading-[1.5]">{category.description}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {category.features.map((feature) => (
                        <li key={feature} className="label border-2 border-grafit px-3 py-2">
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/cennik#${category.slug}`}
                      transitionTypes={["nav-forward"]}
                      className="label link-arrow mt-8 inline-flex min-h-11 items-center gap-3 text-szafran-ciemny"
                      aria-label={`${cta.details}: ${category.title}`}
                    >
                      {cta.details}
                      <ArrowRight className="btn-arrow" />
                    </Link>
                  </div>

                  {/* Tablica wyników: warianty z cennika */}
                  <ul className="on-dark self-start bg-grafit p-5 text-kreda lg:col-span-4">
                    {services.map((service) => (
                      <li
                        key={service.id}
                        className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-b border-linia-jasna py-3 first:pt-0 last:border-b-0 last:pb-0"
                      >
                        <span className="text-small">{service.name}</span>
                        <span className="display tabular row-span-2 text-[1.875rem] normal-case leading-none text-szafran">{service.price}</span>
                        <span className="label text-mgla">{service.duration}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-5 border-t-4 border-grafit pt-10 lg:mt-24">
          <Link href="/cennik" transitionTypes={["nav-forward"]} className="btn btn-primary">
            {cta.fullPricing}
            <ArrowRight className="btn-arrow" />
          </Link>
          <a href="#kontakt" className="btn btn-ghost">
            {cta.book}
          </a>
        </div>
      </div>
    </section>
  );
}
