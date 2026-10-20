import Link from "next/link";
import { brand, contact, footer } from "@/app/content";
import { ArrowUp } from "@/app/components/icons";
import { LogoMark } from "@/app/components/logo-mark";

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-grafit pt-16 text-kreda lg:pt-24">
      <div className="container-site">
        {/* Znak: monogram i nazwa, jak logo w stopce */}
        <Link href="/" prefetch={false} className="group inline-flex items-center gap-4">
          <LogoMark className="h-16 text-szafran transition-transform duration-200 group-hover:-translate-y-0.5" />
          <span className="flex flex-col">
            <span className="display text-[clamp(1.75rem,1.4rem+1.5vw,2.5rem)] leading-none">
              {brand.name.split(" ")[0]} <span className="text-szafran">{brand.name.split(" ").slice(1).join(" ")}</span>
            </span>
            <span className="label mt-1.5 text-mgla">{brand.role}</span>
          </span>
        </Link>

        <div className="mt-14 grid grid-cols-1 gap-12 border-t-2 border-linia-jasna pt-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <p className="max-w-md text-mgla lg:col-span-5">{footer.lead}</p>
          <div className="lg:col-span-3 lg:col-start-7">
            <p className="label mb-5 text-szafran">{footer.navTitle}</p>
            <nav aria-label="Nawigacja w stopce">
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                {footer.nav.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} prefetch={false} className="transition-colors hover:text-szafran">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="lg:col-span-3 lg:col-start-10">
            <p className="label mb-5 text-szafran">{footer.contactTitle}</p>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={contact.phoneHref} className="display tabular text-[1.75rem] leading-none transition-colors hover:text-szafran">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={contact.emailHref} className="transition-colors hover:text-szafran">
                  {contact.email}
                </a>
              </li>
              <li className="text-mgla">{contact.area}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t-2 border-linia-jasna py-8 text-small text-mgla sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name}. {footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <p>
              {footer.credit.label} <a href={footer.credit.href} target="_blank" rel="noopener" className="font-bold text-kreda transition-colors hover:text-szafran">
                {footer.credit.studio}
              </a>
            </p>
            <a href="#" className="label group inline-flex items-center gap-3 text-kreda hover:text-szafran">
              {footer.toTop}
              <ArrowUp className="transition-transform duration-200 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
