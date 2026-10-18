import { ViewTransition } from "react";
import { Hero } from "@/app/components/hero";
import { Offer } from "@/app/components/offer";
import { BodyMap } from "@/app/components/body-map";
import { Process } from "@/app/components/process";
import { About } from "@/app/components/about";
import { Faq } from "@/app/components/faq";
import { Contact } from "@/app/components/contact";
import { JsonLd } from "@/app/components/json-ld";
import { faqSchema } from "@/app/lib/schema";

// Kolejność stawia masaż na pierwszym miejscu: najpierw co i jak, potem kto.
export default function Home() {
  return (
    <ViewTransition
      enter={{ "nav-forward": "page-fade", "nav-back": "page-fade", default: "none" }}
      exit={{ "nav-forward": "page-fade", "nav-back": "page-fade", default: "none" }}
      default="none"
    >
      <div>
        <JsonLd data={faqSchema} />
        <Hero />
        <Offer />
        <BodyMap />
        <Process />
        <About />
        <Faq />
        <Contact />
      </div>
    </ViewTransition>
  );
}
