import Image from "next/image";
import { cta, process } from "@/app/content";
import { ArrowRight } from "@/app/components/icons";
import { TensionLine } from "@/app/components/tension-line";
import { easingTensionPath } from "@/app/lib/tension";

// Napięcie maleje krok po kroku: od rezerwacji do zakończenia linia się uspokaja.
const STEP_FROM = 0.34;
const STEP_TO = 0.06;

export function Process() {
  const n = process.steps.length;

  return (
    <section id="proces" aria-labelledby="proces-title" className="pb-20 lg:pb-32">
      <TensionLine from={0.4} to={0.34} seed={11} className="h-24 lg:h-32" />
      <div className="container-site grid grid-cols-1 gap-12 pt-10 lg:grid-cols-12 lg:gap-8 lg:pt-14">
        <div className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
          <p className="tag">{process.eyebrow}</p>
          <h2 id="proces-title" className="headline mt-5 text-h2">
            {process.titleLines[0]} {process.titleLines[1]}
          </h2>
          <div className="soften relative mt-10 hidden aspect-[4/5] max-w-sm overflow-hidden rounded-[2rem] bg-skora-2 lg:block">
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
          <ol>
            {process.steps.map((step, i) => {
              const from = STEP_FROM + ((STEP_TO - STEP_FROM) * i) / n;
              const to = STEP_FROM + ((STEP_TO - STEP_FROM) * (i + 1)) / n;
              const d = easingTensionPath(from, to, { width: 1200, height: 120, segments: 12, seed: 20 + i, vertical: true });
              return (
                <li key={step.title} className="relative grid grid-cols-[3.5rem_1fr] gap-x-4">
                  <svg
                    viewBox="0 0 120 1200"
                    preserveAspectRatio="none"
                    className="absolute bottom-0 left-0 top-0 h-full w-14 overflow-visible"
                    aria-hidden="true"
                  >
                    <path d={d} pathLength={1} className="tension-path process-draw" vectorEffect="non-scaling-stroke" />
                  </svg>
                  <span className="tabular relative z-10 grid h-14 w-14 place-items-center rounded-full bg-cegla text-[1.25rem] font-semibold text-skora">
                    {i + 1}
                  </span>
                  <div className="rise pb-12 pt-3 lg:pb-16">
                    <h3 className="headline text-h4">{step.title}</h3>
                    <p className="mt-3 max-w-[44ch] text-mut">{step.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-2 rounded-[2rem] bg-skora-2 p-6 lg:p-8">
            <p className="max-w-[40ch] text-lead">{process.outro}</p>
            <a href="#kontakt" className="btn btn-primary mt-6">
              {cta.bookVisit}
              <ArrowRight className="btn-arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
