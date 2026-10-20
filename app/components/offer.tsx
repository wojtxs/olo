import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { cta, offer, pricing } from "@/app/content";
import { ArrowRight } from "@/app/components/icons";

export function Offer() {
  return (
    <section id="oferta" aria-labelledby="oferta-title" className="sheet bg-skora-2 pb-28 lg:pb-44">
      <div className="container-site pt-16 lg:pt-24">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <p className="tag">{offer.eyebrow}</p>
            <h2 id="oferta-title" className="headline mt-5 text-h2">
              {offer.titleLines[0]} {offer.titleLines[1]}
            </h2>
          </div>
          <p className="max-w-[42ch] text-lead text-mut lg:col-span-5">{offer.lead}</p>
        </div>

        {/* Karty układają się jedna na drugiej jak złożone ręczniki (na desktopie) */}
        <div className="mt-12 flex flex-col gap-6 lg:mt-16 lg:gap-10">
          {offer.categories.map((category, i) => {
            const services = pricing.categories.find((c) => c.slug === category.slug)?.services ?? [];
            return (
              <article
                key={category.slug}
                className="rounded-[2.25rem] bg-skora p-3 shadow-[0_-24px_48px_-36px_rgba(61,21,19,0.45)] sm:p-4 lg:sticky lg:p-5"
                style={{ top: `calc(5.5rem + ${i * 1.5}rem)` }}
              >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
                  <div className="soften relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-skora-2 lg:col-span-5 lg:aspect-auto lg:min-h-[30rem]">
                    <Image
                      src={category.image.src}
                      alt={category.image.alt}
                      fill
                      quality={70}
                      sizes="(min-width: 1024px) 38vw, 100vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col px-2 pb-3 sm:px-3 lg:col-span-7 lg:py-4 lg:pr-6">
                    <div className="flex items-center gap-3">
                      <span className="tabular grid h-9 w-9 place-items-center rounded-full bg-cegla text-small font-semibold text-skora">
                        {i + 1}
                      </span>
                      <ViewTransition name={`kategoria-${category.slug}`} share="morph">
                        <h3 className="headline text-h3">{category.title}</h3>
                      </ViewTransition>
                    </div>
                    <p className="mt-5 max-w-[52ch] text-lead text-mut">{category.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {category.features.map((feature) => (
                        <li key={feature} className="tag bg-skora-2">
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-6 border-t border-linia">
                      {services.map((service) => (
                        <li key={service.id} className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-b border-linia py-3">
                          <span>{service.name}</span>
                          <span className="tabular whitespace-nowrap text-right">
                            <span className="mr-3 text-small text-mut">{service.duration}</span>
                            <span className="text-[1.25rem] font-semibold">{service.price}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/cennik#${category.slug}`}
                      transitionTypes={["nav-forward"]}
                      className="link-arrow mt-6 inline-flex min-h-11 items-center gap-3 self-start font-semibold text-cegla"
                      aria-label={`${cta.details}: ${category.title}`}
                    >
                      {cta.details}
                      <ArrowRight className="btn-arrow" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3 lg:mt-16">
          <Link href="/cennik" transitionTypes={["nav-forward"]} className="btn btn-primary">
            {cta.fullPricing}
            <ArrowRight className="btn-arrow" />
          </Link>
          <a href="#kontakt" className="btn btn-soft bg-skora">
            {cta.book}
          </a>
        </div>
      </div>
    </section>
  );
}
