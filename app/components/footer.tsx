import Link from "next/link";
import { brand, contact, footer } from "@/app/content";
import { ArrowUp } from "@/app/components/icons";
import { TensionLine } from "@/app/components/tension-line";

export function Footer() {
  return (
    <footer className="on-dark bg-wino text-skora">
      {/* Na samym dole linia jest już zupełnie spokojna */}
      <TensionLine from={0.04} to={0} height={60} seed={9} className="h-10" />
      <div className="container-site pb-8 pt-12 lg:pt-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Link href="/" prefetch={false} className="inline-flex flex-col">
              <span className="headline text-[clamp(2.5rem,7vw,4.75rem)]">{brand.name}</span>
              <span className="mt-2 text-mut-jasny">{brand.role}</span>
            </Link>
            <p className="mt-6 max-w-md text-mut-jasny">{footer.lead}</p>
          </div>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:col-span-5 lg:col-start-8">
            <div>
              <p className="mb-4 text-small font-semibold text-miod">{footer.navTitle}</p>
              <nav aria-label="Nawigacja w stopce">
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-1">
                  {footer.nav.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} prefetch={false} className="transition-colors hover:text-miod">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div>
              <p className="mb-4 text-small font-semibold text-miod">{footer.contactTitle}</p>
              <ul className="flex flex-col gap-2">
                <li>
                  <a href={contact.phoneHref} className="tabular transition-colors hover:text-miod">
                    {contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={contact.emailHref} className="transition-colors hover:text-miod">
                    {contact.email}
                  </a>
                </li>
                <li className="text-mut-jasny">{contact.area}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-5 border-t border-linia-jasna pt-6 text-small text-mut-jasny sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name}. {footer.rights}
          </p>
          <a href="#" className="group inline-flex items-center gap-3 self-start text-skora hover:text-miod sm:self-auto">
            {footer.toTop}
            <ArrowUp className="transition-transform duration-300 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </footer>
  );
}
