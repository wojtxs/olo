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
      enter={{ "nav-forward": "page-slide", "nav-back": "page-slide", default: "none" }}
      exit={{ "nav-forward": "page-slide", "nav-back": "page-slide", default: "none" }}
      default="none"
    >
      <div className="container-site pb-20 pt-8 lg:pb-32 lg:pt-12">
        <Link
          href="/"
          transitionTypes={["nav-back"]}
          className="label group inline-flex min-h-11 items-center gap-3 text-szary transition-colors hover:text-grafit"
        >
          <ArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1" />
          {pricing.back}
        </Link>

        <header className="mt-8 grid grid-cols-1 gap-6 border-b-4 border-grafit pb-10 lg:mt-12 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <p className="label text-szafran-ciemny">{pricing.eyebrow}</p>
            <h1 className="display mt-4 text-[clamp(6rem,3rem+18vw,18rem)] leading-[0.78]">{pricing.title}</h1>
          </div>
          <p className="max-w-[40ch] text-lead text-szary lg:col-span-4 lg:col-start-9">{pricing.lead}</p>
        </header>

        <nav aria-label={pricing.title} className="sticky top-0 z-30 -mx-[var(--gutter)] overflow-x-auto bg-kreda px-[var(--gutter)] py-3">
          <ul className="flex gap-2">
            {pricing.categories.map((category, i) => (
              <li key={category.slug} className="shrink-0">
                <a
                  href={`#${category.slug}`}
                  className="label inline-flex min-h-11 items-center gap-2 border-2 border-grafit px-3 transition-colors hover:bg-grafit hover:text-kreda"
                >
                  <span className="tabular text-szafran-ciemny">0{i + 1}</span>
                  {category.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 flex flex-col gap-12 lg:gap-16">
          {pricing.categories.map((category) => (
            <section key={category.slug} id={category.slug} aria-labelledby={`${category.slug}-title`} className="scroll-mt-32">
              <div className="on-dark flex items-end justify-between gap-4 bg-grafit px-4 py-4 text-kreda lg:px-6">
                <ViewTransition name={`kategoria-${category.slug}`} share="morph">
                  <h2 id={`${category.slug}-title`} className="display text-[clamp(2.25rem,1.6rem+3vw,4.5rem)]">
                    {category.title}
                  </h2>
                </ViewTransition>
              </div>
              <ul className="border-x-2 border-b-2 border-grafit">
                {category.services.map((service) => (
                  <li
                    key={service.id}
                    className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 border-b-2 border-grafit/15 px-4 py-4 last:border-b-0 lg:grid-cols-[1fr_8rem_8rem] lg:px-6"
                  >
                    <span className="text-lead font-medium leading-snug">{service.name}</span>
                    <span className="label tabular order-3 text-szary lg:order-none lg:text-right">{service.duration}</span>
                    <span className="display tabular row-span-2 text-right text-[2.25rem] normal-case leading-none text-szafran-ciemny lg:row-span-1">
                      {service.price}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="on-dark mt-16 grid grid-cols-1 gap-8 bg-grafit p-6 text-kreda lg:mt-24 lg:grid-cols-12 lg:items-end lg:p-10">
          <p className="display text-[clamp(2.5rem,1.8rem+3vw,5rem)] leading-[0.92] lg:col-span-7">{pricing.outro}</p>
          <div className="flex flex-wrap gap-4 lg:col-span-5 lg:justify-end">
            <a href={contact.phoneHref} className="btn btn-primary tabular">
              {contact.phoneDisplay}
              <ArrowRight className="btn-arrow" />
            </a>
            <Link href="/#kontakt" prefetch={false} transitionTypes={["nav-back"]} className="btn btn-ghost">
              {pricing.contactButton}
            </Link>
          </div>
        </div>
      </div>
    </ViewTransition>
  );
}
