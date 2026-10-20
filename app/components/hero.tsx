import Image from "next/image";
import { cta, hero } from "@/app/content";
import { ArrowRight } from "@/app/components/icons";
import { HeroVideo } from "@/app/components/hero-video";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pb-24 lg:pb-36">
      <div className="container-site grid grid-cols-1 pt-6 lg:grid-cols-12 lg:gap-x-8 lg:pt-10">
        <div className="lg:col-span-7 lg:row-start-1">
          <p className="tag">{hero.eyebrow}</p>
          <h1 id="hero-title" className="headline mt-6 max-w-[14ch] text-hero">
            {hero.titleLines[0]} {hero.titleLines[1]} <span className="text-cegla">{hero.titleLines[2]}</span>
          </h1>
        </div>

        <div className="mt-8 lg:col-span-6 lg:row-start-2 lg:mt-0 lg:self-end lg:pt-16">
          <p className="max-w-[36ch] text-lead text-mut">{hero.lead}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3" data-hero-cta>
            <a href="#kontakt" className="btn btn-primary">
              {cta.book}
              <ArrowRight className="btn-arrow" />
            </a>
            <a href="#oferta" className="btn btn-soft">
              {hero.secondaryLink}
            </a>
          </div>
        </div>

        <div className="relative mt-10 aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-skora-2 sm:aspect-[4/3] lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:aspect-[4/5] lg:self-center">
          <Image
            src="/images/c/bark-mobile.jpg"
            alt="Zbliżenie rozluźnionego barku z kroplami złotego olejku do masażu na skórze"
            fill
            quality={70}
            preload
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="object-cover"
          />
          <HeroVideo
            mobile={{ mp4: "/video/hero-c-mobile.mp4", webm: "/video/hero-c-mobile.webm" }}
            desktop={{ mp4: "/video/hero-c-hd.mp4", webm: "/video/hero-c-hd.webm" }}
          />
        </div>
      </div>
    </section>
  );
}
