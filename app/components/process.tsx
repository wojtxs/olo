import Image from "next/image";
import { cta, process } from "@/app/content";
import { ArrowRight } from "@/app/components/icons";

export function Process() {
  return (
    <section id="proces" aria-labelledby="proces-title" className="on-dark bg-orzech py-24 text-len lg:py-40">
      <div className="container-site grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <p className="eyebrow">{process.eyebrow}</p>
          <h2 id="proces-title" className="font-display mt-6 text-h2">
            <span className="block">{process.titleLines[0]}</span>
            <span className="block italic text-olej">{process.titleLines[1]}</span>
          </h2>
          <div className="unfold relative mt-12 hidden aspect-[4/5] max-w-sm overflow-hidden bg-orzech-2 lg:block">
            <Image
              src="/images/dojazd.jpg"
              alt="Złożony stół do masażu w torbie i ręczniki z olejkiem przy drzwiach wejściowych mieszkania"
              fill
              quality={70}
              sizes="(min-width: 1024px) 24rem, 0px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ol className="process-steps relative">
            <span className="absolute bottom-6 left-[0.3125rem] top-3 w-px bg-linia-ciemna" aria-hidden="true" />
            <span
              className="process-fill absolute bottom-6 left-[0.3125rem] top-3 w-px origin-top bg-olej"
              aria-hidden="true"
            />
            {process.steps.map((step, i) => (
              <li key={step.title} className="relative grid grid-cols-[0.6875rem_1fr] gap-x-6 pb-14 last:pb-0 lg:gap-x-10 lg:pb-20">
                <span
                  className="process-dot mt-2.5 h-[0.6875rem] w-[0.6875rem] rounded-full border border-olej bg-olej"
                  aria-hidden="true"
                />
                <div>
                  <span className="tabular text-small text-olej">0{i + 1}</span>
                  <h3 className="font-display mt-2 text-h3">{step.title}</h3>
                  <p className="mt-4 max-w-[44ch] text-piasek">{step.description}</p>
                  {i === 1 ? (
                    <div className="relative mt-8 aspect-[4/5] w-4/5 max-w-xs overflow-hidden bg-orzech-2 lg:hidden">
                      <Image
                        src="/images/dojazd.jpg"
                        alt="Złożony stół do masażu w torbie i ręczniki z olejkiem przy drzwiach wejściowych mieszkania"
                        fill
                        quality={70}
                        sizes="(min-width: 1024px) 0px, 80vw"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-16 border-t border-linia-ciemna pt-10 lg:mt-20">
            <p className="max-w-[40ch] text-piasek">{process.outro}</p>
            <a href="#kontakt" className="btn btn-primary mt-8">
              {cta.bookVisit}
              <ArrowRight className="btn-arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
