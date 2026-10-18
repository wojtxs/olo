// Dane strukturalne schema.org — wyłącznie informacje widoczne na stronie.
import { brand, contact, faq, meta, pricing } from "@/app/content";
import { siteUrl } from "@/app/lib/site";

const priceValue = (price: string) => price.replace(/[^\d]/g, "");

const prices = pricing.categories.flatMap((c) => c.services.map((s) => Number(priceValue(s.price))));

export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "@id": `${siteUrl}/#business`,
  name: brand.name,
  description: meta.description,
  url: siteUrl,
  image: `${siteUrl}/images/og.jpg`,
  telephone: contact.phoneHref.replace("tel:", ""),
  email: contact.email,
  areaServed: { "@type": "Place", name: contact.area },
  priceRange: `${Math.min(...prices)}–${Math.max(...prices)} zł`,
  founder: { "@type": "Person", name: brand.name, jobTitle: brand.role },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: pricing.title,
    itemListElement: pricing.categories.map((category) => ({
      "@type": "OfferCatalog",
      name: category.title,
      itemListElement: category.services.map((service) => ({
        "@type": "Offer",
        price: priceValue(service.price),
        priceCurrency: "PLN",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.duration,
        },
      })),
    })),
  },
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};
