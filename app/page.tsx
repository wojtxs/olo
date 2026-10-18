import { Hero } from "@/app/sections/hero";
import { About } from "@/app/sections/about";
import { Offer } from "@/app/sections/offer";
import { Process } from "@/app/sections/process";
import { Faq } from "@/app/sections/faq";
import { Contact } from "@/app/sections/contact";
import { SectionDivider } from "@/app/components/ui/section-divider";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Offer />
      <SectionDivider />
      <Process />
      <SectionDivider />
      <Faq />
      <SectionDivider />
      <Contact />
    </div>
  );
}
