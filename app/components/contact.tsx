import { contact, contactSection } from "@/app/content";
import { AreaMap } from "@/app/components/area-map";
import { ArrowRight } from "@/app/components/icons";

export function Contact() {
  return (
    <section id="kontakt" aria-labelledby="kontakt-title" className="sheet on-dark bg-wino pb-20 text-skora lg:pb-28">
      <div className="container-site pt-16 lg:pt-24">
        <p className="tag">{contactSection.eyebrow}</p>
        <h2 id="kontakt-title" className="headline mt-5 text-[clamp(2.5rem,0.5rem+10vw,11rem)]">
          {contactSection.title}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <p className="max-w-[40ch] text-lead text-mut-jasny">{contactSection.lead}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {contactSection.pills.map((pill) => (
                <li key={pill} className="tag">
                  <span className="h-1.5 w-1.5 rounded-full bg-miod" aria-hidden="true" />
                  {pill}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3">
              <a href={contact.phoneHref} className="group flex items-center justify-between gap-4 rounded-[1.75rem] bg-miod px-6 py-5 text-wino">
                <span>
                  <span className="block text-small font-semibold">{contactSection.labels.phone}</span>
                  <span className="headline tabular mt-1 block text-[clamp(2.25rem,1.5rem+3.5vw,4rem)]">{contact.phoneDisplay}</span>
                </span>
                <ArrowRight className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href={contact.emailHref} className="group flex items-center justify-between gap-4 rounded-[1.75rem] bg-wino-2 px-5 py-5 sm:px-6">
                <span className="min-w-0">
                  <span className="block text-small font-semibold text-mut-jasny">{contactSection.labels.email}</span>
                  <span className="mt-1 block break-words text-[clamp(0.9375rem,0.7rem+1.1vw,1.625rem)] font-semibold">{contact.email}</span>
                </span>
                <ArrowRight className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <div className="rounded-[1.75rem] bg-wino-2 px-6 py-5">
                <span className="block text-small font-semibold text-mut-jasny">{contactSection.labels.area}</span>
                <span className="mt-1 block text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-semibold">{contact.area}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <AreaMap />
          </div>
        </div>
      </div>
    </section>
  );
}
