// Sekcja opinii — przygotowana, ale NIE renderowana, dopóki nie będzie prawdziwych opinii
// klientów (za ich zgodą). Żeby ją włączyć: uzupełnij `items` i dodaj <Testimonials />
// w app/page.tsx (np. między <Process /> a <Faq />). Nagłówki trzeba dopisać razem z treścią.

export type Testimonial = { quote: string; author: string; detail?: string };

export function Testimonials({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: readonly Testimonial[];
}) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="opinie-title" className="py-20 lg:py-32">
      <div className="container-site">
        <p className="label text-szafran-ciemny">{eyebrow}</p>
        <h2 id="opinie-title" className="display mt-5 text-h2">
          {title}
        </h2>
        <ul className="mt-16 grid grid-cols-1 gap-12 border-t-4 border-grafit pt-12 lg:grid-cols-12 lg:gap-8">
          {items.map((item, i) => (
            <li key={item.author} className={i % 2 === 0 ? "lg:col-span-6" : "lg:col-span-5 lg:col-start-8 lg:mt-24"}>
              <figure>
                <blockquote className="text-lead font-medium leading-[1.45]">„{item.quote}”</blockquote>
                <figcaption className="label mt-6 text-szary">
                  {item.author}
                  {item.detail ? ` · ${item.detail}` : null}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
