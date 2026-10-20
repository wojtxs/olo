import { ViewTransition } from "react";
import { Hero } from "@/app/components/hero";
import { About } from "@/app/components/about";
import { Offer } from "@/app/components/offer";
import { BodyMap } from "@/app/components/body-map";
import { Process } from "@/app/components/process";
import { Faq } from "@/app/components/faq";
import { Contact } from "@/app/components/contact";
import { JsonLd } from "@/app/components/json-ld";
import { faqSchema } from "@/app/lib/schema";

export default function Home() {
  return (
    <ViewTransition
      enter={{ "nav-forward": "page-slide", "nav-back": "page-slide", default: "none" }}
      exit={{ "nav-forward": "page-slide", "nav-back": "page-slide", default: "none" }}
      default="none"
    >
      <div>
        <JsonLd data={faqSchema} />
        <Hero />
        <About />
        <Offer />
        <BodyMap />
        <Process />
        <Faq />
        <Contact />
      </div>
    </ViewTransition>
  );
}
