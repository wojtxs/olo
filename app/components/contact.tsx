import { contact, contactSection } from "@/app/content";
import { AreaMap } from "@/app/components/area-map";
import { ArrowRight } from "@/app/components/icons";

export function Contact() {
  return (
    <section id="kontakt" aria-labelledby="kontakt-title" className="on-szafran bg-szafran py-20 text-grafit lg:py-32">
      <div className="container-site">
        <p className="label">{contactSection.eyebrow}</p>
        <h2 id="kontakt-title" className="display mt-4 text-[clamp(3rem,12.6vw,17rem)] leading-[0.8]">
          {contactSection.title}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-6">
            <p className="max-w-[40ch] text-lead font-medium">{contactSection.lead}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {contactSection.pills.map((pill) => (
                <li key={pill} className="label bg-grafit px-3 py-2 text-kreda">
                  {pill}
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t-4 border-grafit">
              <a href={contact.phoneHref} className="group flex items-end justify-between gap-4 border-b-2 border-grafit py-6">
                <span>
                  <span className="label block">{contactSection.labels.phone}</span>
                  <span className="display tabular mt-2 block text-[clamp(3.25rem,1.5rem+8vw,7.5rem)] leading-[0.85]">
                    {contact.phoneDisplay}
                  </span>
                </span>
                <ArrowRight className="mb-3 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a href={contact.emailHref} className="group flex items-end justify-between gap-4 border-b-2 border-grafit py-6">
                <span className="min-w-0">
                  <span className="label block">{contactSection.labels.email}</span>
                  <span className="mt-2 block break-words text-[clamp(1.0625rem,0.8rem+1.2vw,1.75rem)] font-bold">
                    {contact.email}
                  </span>
                </span>
                <ArrowRight className="mb-2 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <div className="border-b-2 border-grafit py-6">
                <span className="label block">{contactSection.labels.area}</span>
                <span className="display mt-2 block text-[clamp(2rem,1.5rem+2vw,3.25rem)]">{contact.area}</span>
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
