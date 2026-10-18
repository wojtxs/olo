import { getImageProps } from "next/image";
import { cta, hero } from "@/app/content";
import { ArrowRight } from "@/app/components/icons";
import { HeroVideo } from "@/app/components/hero-video";

const alt = "Kobieta leżąca na stole do masażu w słonecznym salonie z parkietem, przykryta lnianym prześcieradłem";

export function Hero() {
  const common = { alt, quality: 70, sizes: "(min-width: 1024px) 50vw, 100vw" };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: "/images/hero.jpg", width: 2400, height: 1590 });
  const { props: mobileProps } = getImageProps({
    ...common,
    src: "/images/hero-mobile.jpg",
    width: 1200,
    height: 1500,
    loading: "eager",
    fetchPriority: "high",
  });

  return (
    <section aria-labelledby="hero-title" className="lg:grid lg:min-h-[min(calc(100dvh-5rem),62rem)] lg:grid-cols-2">
      <div className="flex flex-col justify-center px-[var(--gutter)] pb-12 pt-8 lg:py-20 lg:pl-[max(var(--gutter),calc((100vw-90rem)/2+var(--gutter)))] lg:pr-12">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 id="hero-title" className="font-display mt-6 text-hero lg:text-[min(7.2vw,8.75rem)]">
          <span className="block">{hero.titleLines[0]}</span>
          <span className="block pl-[0.9em] italic text-kamien">{hero.titleLines[1]}</span>
          <span className="block">{hero.titleLines[2]}</span>
        </h1>
        <p className="mt-8 max-w-[36ch] text-lead leading-[1.5] text-kamien lg:mt-10">{hero.lead}</p>
        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5" data-hero-cta>
          <a href="#kontakt" className="btn btn-primary">
            {cta.book}
            <ArrowRight className="btn-arrow" />
          </a>
          <a href="#oferta" className="link-underline text-orzech">
            {hero.secondaryLink}
          </a>
        </div>
      </div>

      <div className="relative ml-[var(--gutter)] aspect-[4/5] overflow-hidden bg-piasek-jasny sm:aspect-[5/4] lg:ml-0 lg:aspect-auto lg:h-full">
        <picture>
          <source media="(min-width: 640px)" srcSet={desktopSrcSet} sizes={common.sizes} />
          {/* eslint-disable-next-line jsx-a11y/alt-text -- alt jest w mobileProps */}
          <img {...mobileProps} className="absolute inset-0 h-full w-full object-cover object-[50%_45%]" />
        </picture>
        <HeroVideo
          mobile={{ mp4: "/video/hero-mobile.mp4", webm: "/video/hero-mobile.webm" }}
          desktop={{ mp4: "/video/hero-desktop.mp4", webm: "/video/hero-desktop.webm" }}
        />
      </div>
    </section>
  );
}
