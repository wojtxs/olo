import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { cta, offer } from "@/app/content";
import { ArrowRight } from "@/app/components/icons";
import { BodyMap } from "@/app/components/body-map";

export function Offer() {
  return (
    <section id="oferta" aria-labelledby="oferta-title" className="bg-recznik py-24 lg:py-40">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="eyebrow">{offer.eyebrow}</p>
            <h2 id="oferta-title" className="font-display mt-6 text-h2">
              <span className="block">{offer.titleLines[0]}</span>
              <span className="block pl-[0.6em] italic">{offer.titleLines[1]}</span>
            </h2>
          </div>
          <p className="max-w-[42ch] text-lead leading-[1.5] text-kamien lg:col-span-5 lg:col-start-8">{offer.lead}</p>
        </div>

        <div className="mt-20 flex flex-col gap-24 lg:mt-32 lg:gap-40">
          {offer.categories.map((category, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={category.slug} className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
                <div
                  className={`unfold relative aspect-[4/5] w-[88%] overflow-hidden bg-piasek-jasny lg:w-full ${
                    flip ? "ml-auto lg:col-span-5 lg:col-start-8" : "lg:col-span-5"
                  }`}
                >
                  <Image
                    src={category.image.src}
                    alt={category.image.alt}
                    fill
                    quality={70}
                    sizes="(min-width: 1024px) 38vw, 88vw"
                    className="object-cover"
                  />
                </div>
                <div className={flip ? "lg:col-span-5 lg:col-start-2 lg:row-start-1" : "lg:col-span-5 lg:col-start-7"}>
                  <span className="tabular text-small text-glina">0{i + 1}</span>
                  <ViewTransition name={`kategoria-${category.slug}`} share="morph">
                    <h3 className="font-display mt-3 text-h3 leading-[1]">{category.title}</h3>
                  </ViewTransition>
                  <p className="mt-6 max-w-[48ch] text-kamien">{category.description}</p>
                  <ul className="mt-8 grid grid-cols-1 border-t border-linia sm:grid-cols-2 sm:gap-x-8">
                    {category.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 border-b border-linia py-3 text-small">
                        <span className="h-px w-4 bg-glina" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/cennik#${category.slug}`}
                    transitionTypes={["nav-forward"]}
                    className="link-arrow mt-8 inline-flex min-h-11 items-center gap-3 font-medium text-glina"
                    aria-label={`${cta.details}: ${category.title}`}
                  >
                    {cta.details}
                    <ArrowRight className="btn-arrow" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-28 lg:mt-40">
          <BodyMap />
        </div>

        <div className="mt-20 flex flex-wrap items-center gap-4 lg:mt-28">
          <Link href="/cennik" transitionTypes={["nav-forward"]} className="btn btn-primary">
            {cta.fullPricing}
            <ArrowRight className="btn-arrow" />
          </Link>
          <a href="#kontakt" className="btn btn-outline">
            {cta.book}
          </a>
        </div>
      </div>
    </section>
  );
}
