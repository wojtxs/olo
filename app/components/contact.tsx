import { contact, contactSection } from "@/app/content";
import { AreaMap } from "@/app/components/area-map";
import { ArrowRight } from "@/app/components/icons";

export function Contact() {
  return (
    <section id="kontakt" aria-labelledby="kontakt-title" className="bg-recznik py-24 lg:py-40">
      <div className="container-site">
        <p className="eyebrow">{contactSection.eyebrow}</p>
        <h2 id="kontakt-title" className="font-display mt-6 text-[clamp(2.75rem,0.6rem+9.6vw,10.5rem)] leading-[0.88]">
          {contactSection.title}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-12">
          <p className="max-w-[40ch] text-lead leading-[1.5] text-kamien lg:col-span-6">{contactSection.lead}</p>
          <ul className="flex flex-wrap items-start gap-x-6 gap-y-2 lg:col-span-5 lg:col-start-8 lg:justify-end lg:pt-2">
            {contactSection.pills.map((pill) => (
              <li key={pill} className="flex items-center gap-3 text-micro font-medium uppercase tracking-[0.16em] text-orzech">
                <span className="h-1.5 w-1.5 rounded-full bg-olej" aria-hidden="true" />
                {pill}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <div className="border-t border-orzech lg:col-span-6">
            <a href={contact.phoneHref} className="group flex items-end justify-between gap-6 border-b border-linia py-8">
              <span>
                <span className="eyebrow block">{contactSection.labels.phone}</span>
                <span className="font-display tabular mt-4 block text-[clamp(2.5rem,1.6rem+4vw,4.75rem)] transition-colors group-hover:text-glina">
                  {contact.phoneDisplay}
                </span>
              </span>
              <ArrowRight className="mb-4 shrink-0 text-glina transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href={contact.emailHref} className="group flex items-end justify-between gap-6 border-b border-linia py-8">
              <span className="min-w-0">
                <span className="eyebrow block">{contactSection.labels.email}</span>
                <span className="font-soft mt-4 block break-words text-[clamp(1.0625rem,0.75rem+1.4vw,2rem)] transition-colors group-hover:text-glina">
                  {contact.email}
                </span>
              </span>
              <ArrowRight className="mb-2 shrink-0 text-glina transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <div className="border-b border-linia py-8">
              <span className="eyebrow block">{contactSection.labels.area}</span>
              <span className="font-soft mt-4 block text-[clamp(1.25rem,1rem+1.2vw,2rem)]">{contact.area}</span>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <AreaMap />
          </div>
        </div>
      </div>
    </section>
  );
}
