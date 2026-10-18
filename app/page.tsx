import { ViewTransition } from "react";
import { Hero } from "@/app/components/hero";
import { About } from "@/app/components/about";
import { Offer } from "@/app/components/offer";
import { Process } from "@/app/components/process";
import { Faq } from "@/app/components/faq";
import { Contact } from "@/app/components/contact";
import { JsonLd } from "@/app/components/json-ld";
import { faqSchema } from "@/app/lib/schema";

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
        <About />
        <Offer />
        <Process />
        <Faq />
        <Contact />
      </div>
    </ViewTransition>
  );
}
