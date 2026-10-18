import Image from "next/image";
import { cta, faq } from "@/app/content";
import { Plus } from "@/app/components/icons";
import { TensionLine } from "@/app/components/tension-line";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="pb-20 lg:pb-32">
      <TensionLine from={0.04} to={0.025} seed={15} className="h-16 lg:h-24" />
      <div className="container-site grid grid-cols-1 gap-12 pt-10 lg:grid-cols-12 lg:gap-8 lg:pt-14">
        <div className="lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
          <p className="tag">{faq.eyebrow}</p>
          <h2 id="faq-title" className="headline mt-5 text-h2">
            {faq.titleLines[0]} {faq.titleLines[1]}
          </h2>
          <p className="mt-6 max-w-[32ch] text-mut">{faq.lead}</p>
          <div className="soften relative mt-10 hidden aspect-[4/5] w-64 overflow-hidden rounded-[2rem] bg-skora-2 lg:block">
            <Image
              src="/images/c/olejek.jpg"
              alt="Złoty olejek do masażu spływający cienką strugą do ceramicznej miseczki"
              fill
              quality={70}
              sizes="(min-width: 1024px) 16rem, 0px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <div className="faq-list flex flex-col gap-3">
            {faq.items.map((item) => (
              <details key={item.question} name="faq" className="faq-item group rounded-[1.75rem] bg-skora-2">
                <summary className="flex items-center justify-between gap-4 px-5 py-5 lg:px-7 lg:py-6">
                  <h3 className="text-[clamp(1.125rem,1rem+0.6vw,1.5rem)] font-semibold leading-snug tracking-[-0.015em]">
                    {item.question}
                  </h3>
                  <span className="faq-icon grid h-11 w-11 shrink-0 place-items-center rounded-full bg-skora text-cegla" aria-hidden="true">
                    <Plus />
                  </span>
                </summary>
                <div className="px-5 pb-6 lg:px-7 lg:pb-7">
                  <p className="max-w-[58ch] text-mut">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <p className="text-lead">{faq.outro}</p>
            <a href="#kontakt" className="btn btn-primary">
              {cta.getInTouch}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
