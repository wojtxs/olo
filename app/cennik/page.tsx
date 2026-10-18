import type { Metadata } from "next";
import { ViewTransition } from "react";
import Link from "next/link";
import { contact, meta, pricing } from "@/app/content";
import { ArrowLeft, ArrowRight } from "@/app/components/icons";

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
      <div className="container-site pb-24 pt-8 lg:pb-40 lg:pt-14">
        <Link
          href="/"
          transitionTypes={["nav-back"]}
          className="group inline-flex min-h-11 items-center gap-3 text-small text-kamien transition-colors hover:text-orzech"
        >
          <ArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
          {pricing.back}
        </Link>

        <header className="mt-10 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="eyebrow">{pricing.eyebrow}</p>
            <h1 className="font-display mt-6 text-hero">{pricing.title}</h1>
          </div>
          <p className="max-w-[40ch] text-lead leading-[1.5] text-kamien lg:col-span-5 lg:col-start-8">{pricing.lead}</p>
        </header>

        <nav
          aria-label={pricing.title}
          className="sticky top-0 z-30 -mx-[var(--gutter)] mt-14 overflow-x-auto bg-len/95 px-[var(--gutter)] py-3 backdrop-blur-sm lg:mt-20"
        >
          <ul className="flex gap-2">
            {pricing.categories.map((category) => (
              <li key={category.slug} className="shrink-0">
                <a
                  href={`#${category.slug}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-orzech/25 px-4 text-small transition-colors hover:border-orzech hover:bg-orzech hover:text-recznik"
                >
                  {category.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 border-t border-orzech">
          {pricing.categories.map((category) => (
            <section
              key={category.slug}
              id={category.slug}
              aria-labelledby={`${category.slug}-title`}
              className="grid grid-cols-1 scroll-mt-36 gap-6 border-b border-linia py-12 lg:grid-cols-12 lg:gap-8 lg:py-20"
            >
              <div className="lg:col-span-4">
                <ViewTransition name={`kategoria-${category.slug}`} share="morph">
                  <h2 id={`${category.slug}-title`} className="font-display text-h3 leading-[1] lg:sticky lg:top-40">
                    {category.title}
                  </h2>
                </ViewTransition>
              </div>
              <ul className="lg:col-span-7 lg:col-start-6">
                {category.services.map((service) => (
                  <li
                    key={service.id}
                    className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-linia py-5 first:pt-0 last:border-b-0 sm:grid-cols-[1fr_auto_auto]"
                  >
                    <span className="text-lead leading-snug">{service.name}</span>
                    <span className="tabular order-3 col-span-2 text-small text-kamien sm:order-none sm:col-span-1">
                      {service.duration}
                    </span>
                    <span className="font-soft tabular min-w-[4.5rem] text-right text-h4">{service.price}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 lg:mt-28 lg:grid-cols-12 lg:items-end">
          <p className="font-display text-h3 leading-[1.05] lg:col-span-6">{pricing.outro}</p>
          <div className="flex flex-wrap gap-4 lg:col-span-5 lg:col-start-8 lg:justify-end">
            <a href={contact.phoneHref} className="btn btn-primary tabular">
              {contact.phoneDisplay}
              <ArrowRight className="btn-arrow" />
            </a>
            <Link href="/#kontakt" transitionTypes={["nav-back"]} className="btn btn-outline">
              {pricing.contactButton}
            </Link>
          </div>
        </div>
      </div>
    </ViewTransition>
  );
}
