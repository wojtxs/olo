import Image from "next/image";
import { cta, faq } from "@/app/content";
import { Plus } from "@/app/components/icons";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-24 lg:py-40">
      <div className="container-site grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <p className="eyebrow">{faq.eyebrow}</p>
          <h2 id="faq-title" className="font-display mt-6 text-h2">
            <span className="block">{faq.titleLines[0]}</span>
            <span className="block italic">{faq.titleLines[1]}</span>
          </h2>
          <p className="mt-8 max-w-[32ch] text-kamien">{faq.lead}</p>
          <div className="relative mt-12 hidden aspect-[4/5] w-56 overflow-hidden bg-piasek-jasny lg:block">
            <Image
              src="/images/detal-olejek.jpg"
              alt="Bursztynowa butelka olejku i złożone ręczniki na drewnianym stołku obok stołu do masażu"
              fill
              quality={70}
              sizes="(min-width: 1024px) 14rem, 0px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="faq-list border-t border-orzech lg:col-span-7 lg:col-start-6">
          {faq.items.map((item, i) => (
            <details key={item.question} className="faq-item group border-b border-linia" name="faq">
              <summary className="grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-3 py-7 lg:grid-cols-[3.5rem_1fr_auto] lg:py-9">
                <span className="tabular pt-2 text-small text-glina">0{i + 1}</span>
                <h3 className="font-soft text-h4 leading-[1.2] transition-colors group-hover:text-glina">{item.question}</h3>
                <span className="faq-icon mt-2 text-glina">
                  <Plus />
                </span>
              </summary>
              <div className="pb-9 pl-[2.75rem] pr-8 lg:pl-[4.25rem]">
                <p className="max-w-[56ch] text-kamien">{item.answer}</p>
              </div>
            </details>
          ))}

          <div className="mt-14 flex flex-col items-start gap-6 lg:mt-20">
            <p className="text-kamien">{faq.outro}</p>
            <a href="#kontakt" className="btn btn-primary">
              {cta.getInTouch}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
