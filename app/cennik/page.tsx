import type { Metadata } from "next";
import { ViewTransition } from "react";
import Link from "next/link";
import { contact, meta, pricing } from "@/app/content";
import { ArrowLeft, ArrowRight } from "@/app/components/icons";
import { TensionLine } from "@/app/components/tension-line";

export const metadata: Metadata = {
  title: meta.pricingTitle,
  description: meta.description,
  alternates: { canonical: "/cennik" },
  openGraph: { title: meta.pricingTitle, description: meta.description, url: "/cennik" },
};

export default function CennikPage() {
  return (
    <ViewTransition
      enter={{ "nav-forward": "page-fade", "nav-back": "page-fade", default: "none" }}
      exit={{ "nav-forward": "page-fade", "nav-back": "page-fade", default: "none" }}
      default="none"
    >
      <div className="pb-20 lg:pb-32">
        <div className="container-site pt-6 lg:pt-10">
          <Link
            href="/"
            transitionTypes={["nav-back"]}
            className="group inline-flex min-h-11 items-center gap-3 rounded-full bg-skora-2 px-4 text-small font-medium transition-colors hover:bg-brzoskwinia"
          >
            <ArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
            {pricing.back}
          </Link>

          <header className="mt-10 grid grid-cols-1 gap-6 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-6">
              <p className="tag">{pricing.eyebrow}</p>
              <h1 className="headline mt-5 text-hero">{pricing.title}</h1>
            </div>
            <p className="max-w-[40ch] text-lead text-mut lg:col-span-5 lg:col-start-8">{pricing.lead}</p>
          </header>
        </div>

        <TensionLine from={0.3} to={0.08} seed={21} className="my-8 h-20 lg:h-28" />

        <div className="container-site">
          <nav aria-label={pricing.title} className="sticky top-0 z-30 -mx-[var(--gutter)] overflow-x-auto bg-skora px-[var(--gutter)] py-3">
            <ul className="flex gap-2">
              {pricing.categories.map((category) => (
                <li key={category.slug} className="shrink-0">
                  <a
                    href={`#${category.slug}`}
                    className="inline-flex min-h-11 items-center rounded-full bg-skora-2 px-4 text-small font-medium transition-colors hover:bg-brzoskwinia"
                  >
                    {category.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-4 flex flex-col gap-4">
            {pricing.categories.map((category) => (
              <section
                key={category.slug}
                id={category.slug}
                aria-labelledby={`${category.slug}-title`}
                className="grid scroll-mt-28 grid-cols-1 gap-4 rounded-[2.25rem] bg-skora-2 p-5 lg:grid-cols-12 lg:gap-8 lg:p-10"
              >
                <div className="lg:col-span-4">
                  <ViewTransition name={`kategoria-${category.slug}`} share="morph">
                    <h2 id={`${category.slug}-title`} className="headline text-h3">
                      {category.title}
                    </h2>
                  </ViewTransition>
                </div>
                <ul className="lg:col-span-8">
                  {category.services.map((service) => (
                    <li
                      key={service.id}
                      className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-linia py-4 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[1fr_auto_auto]"
                    >
                      <span className="text-lead font-medium leading-snug">{service.name}</span>
                      <span className="tabular order-3 col-span-2 text-small text-mut sm:order-none sm:col-span-1">{service.duration}</span>
                      <span className="tabular min-w-[4.5rem] text-right text-h4 font-semibold">{service.price}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="on-dark mt-10 grid grid-cols-1 gap-8 rounded-[2.5rem] bg-wino p-7 text-skora lg:mt-14 lg:grid-cols-12 lg:items-end lg:p-12">
            <p className="headline text-h3 lg:col-span-7">{pricing.outro}</p>
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              <a href={contact.phoneHref} className="btn btn-primary tabular">
                {contact.phoneDisplay}
                <ArrowRight className="btn-arrow" />
              </a>
              <Link href="/#kontakt" prefetch={false} transitionTypes={["nav-back"]} className="btn btn-soft">
                {pricing.contactButton}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ViewTransition>
  );
}
