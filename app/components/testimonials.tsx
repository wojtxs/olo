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
    <section aria-labelledby="opinie-title" className="py-24 lg:py-40">
      <div className="container-site">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id="opinie-title" className="font-display mt-6 text-h2">
          {title}
        </h2>
        <ul className="mt-16 grid grid-cols-1 gap-12 border-t border-orzech pt-12 lg:grid-cols-12 lg:gap-8">
          {items.map((item, i) => (
            <li key={item.author} className={i % 2 === 0 ? "lg:col-span-6" : "lg:col-span-5 lg:col-start-8 lg:mt-24"}>
              <figure>
                <blockquote className="font-soft text-h4 leading-[1.35]">„{item.quote}”</blockquote>
                <figcaption className="mt-6 text-small text-kamien">
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
