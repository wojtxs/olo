import Link from "next/link";
import { brand, contact, footer } from "@/app/content";
import { ArrowUp } from "@/app/components/icons";

export function Footer() {
  return (
    <footer className="on-dark relative bg-orzech pt-20 text-len lg:pt-28">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Link href="/" className="inline-flex flex-col">
              <span className="font-display text-[clamp(2.75rem,8vw,5.5rem)] text-len">{brand.name}</span>
              <span className="mt-3 text-micro font-medium uppercase tracking-[0.2em] text-piasek">{brand.role}</span>
            </Link>
            <p className="mt-8 max-w-md text-piasek">{footer.lead}</p>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:col-span-5 lg:col-start-8">
            <div>
              <p className="eyebrow mb-5">{footer.navTitle}</p>
              <nav aria-label="Nawigacja w stopce">
                <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-1">
                  {footer.nav.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} prefetch={false} className="text-len transition-colors hover:text-olej">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div>
              <p className="eyebrow mb-5">{footer.contactTitle}</p>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href={contact.phoneHref} className="tabular text-len transition-colors hover:text-olej">
                    {contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={contact.emailHref} className="text-len transition-colors hover:text-olej">
                    {contact.email}
                  </a>
                </li>
                <li className="text-piasek">{contact.area}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-linia-ciemna py-8 text-small text-piasek sm:flex-row sm:items-center sm:justify-between lg:mt-24">
          <p>
            © {new Date().getFullYear()} {brand.name}. {footer.rights}
          </p>
          <a href="#" className="group inline-flex items-center gap-3 self-start text-len hover:text-olej sm:self-auto">
            {footer.toTop}
            <ArrowUp className="transition-transform duration-300 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </footer>
  );
}
