import Image from "next/image";
import { cta, faq } from "@/app/content";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="on-dark bg-grafit py-20 text-kreda lg:py-32">
      <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
          <p className="label text-szafran">{faq.eyebrow}</p>
          <h2 id="faq-title" className="display mt-5 text-[clamp(3.5rem,2rem+6vw,8rem)]">
            <span className="block">{faq.titleLines[0]}</span>
            <span className="block text-szafran">{faq.titleLines[1]}</span>
          </h2>
          <p className="mt-6 max-w-[32ch] text-mgla">{faq.lead}</p>
          <div className="shot relative mt-10 hidden aspect-[4/5] w-60 lg:block">
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src="/images/b/pilka.jpg"
                alt="Piłka do koszykówki na złożonym ręczniku i buteleczka olejku do masażu na parkiecie"
                fill
                quality={70}
                sizes="(min-width: 1024px) 15rem, 0px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <div className="faq-list border-t-2 border-kreda">
            {faq.items.map((item, i) => (
              <details key={item.question} name="faq" className="faq-item group border-b-2 border-linia-jasna">
                <summary className="grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-3 py-6 lg:grid-cols-[3.5rem_1fr_auto] lg:py-8">
                  <span className="label tabular pt-2 text-szafran">0{i + 1}</span>
                  <h3 className="display text-[clamp(1.75rem,1.4rem+1.6vw,3rem)] leading-[0.95] transition-colors group-hover:text-szafran">
                    {item.question}
                  </h3>
                  <span className="relative mt-0.5 grid h-10 w-10 place-items-center border-2 border-szafran text-szafran" aria-hidden="true">
                    <span className="absolute h-[2px] w-4 bg-current" />
                    <span className="faq-icon-v absolute h-4 w-[2px] bg-current" />
                  </span>
                </summary>
                <div className="pb-8 pl-[2.75rem] pr-4 lg:pl-[4.25rem] lg:pr-14">
                  <p className="max-w-[58ch] text-lead text-mgla">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-6">
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
