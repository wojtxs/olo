import { cta, hero } from "@/app/content";
import { ArrowRight } from "@/app/components/icons";
import { HeroMark } from "@/app/components/hero-mark";
import { MarkStage } from "@/app/components/mark-stage";

export function Hero() {
  return (
    <MarkStage labelledBy="hero-title" className="on-dark relative overflow-hidden bg-grafit text-kreda">
      <div className="container-site relative grid grid-cols-1 pb-20 pt-8 lg:min-h-[min(calc(100dvh-4rem),58rem)] lg:grid-cols-12 lg:gap-x-8 lg:py-16">
        {/* Znak z logo jako plakat: plecy, kręgosłup i dłoń — hero mówi o masażu, nie o boisku.
            Na telefonie stoi w całości nad nagłówkiem, na desktopie obok niego. */}
        <div className="mark-tilt pointer-events-none relative mx-auto aspect-[232/359] w-[min(60vw,18rem)] text-szafran lg:absolute lg:right-[4%] lg:top-1/2 lg:mx-0 lg:h-[86%] lg:w-auto lg:-translate-y-1/2">
          <HeroMark />
        </div>

        <div className="mt-10 text-[21vw] lg:col-span-8 lg:mt-0 lg:self-center lg:text-[clamp(7rem,11.2vw,13rem)]">
          <p className="label mb-5 text-szafran lg:mb-8">{hero.eyebrow}</p>
          <h1 id="hero-title" className="display rise">
            <span className="block">{hero.titleLines[0]}</span>
            <span className="outline-text block">{hero.titleLines[1]}</span>
            <span className="block text-szafran">{hero.titleLines[2]}</span>
          </h1>
          <div className="text-body">
            <p className="mt-8 max-w-[40ch] text-lead text-mgla">{hero.lead}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5" data-hero-cta>
              <a href="#kontakt" className="btn btn-primary">
                {cta.book}
                <ArrowRight className="btn-arrow" />
              </a>
              <a href="#oferta" className="label link-arrow inline-flex min-h-11 items-center gap-3 text-kreda hover:text-szafran">
                {hero.secondaryLink}
                <ArrowRight className="btn-arrow" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </MarkStage>
  );
}
