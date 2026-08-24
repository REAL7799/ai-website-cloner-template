import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Gallery } from "@/components/sections/gallery";
// A secção de depoimentos está pronta em "@/components/sections/testimonials",
// mas só deve entrar no site com avaliações reais: substituir os exemplos em
// src/lib/site-config.ts pelas avaliações do Google Maps e reativar abaixo.
// import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappButton } from "@/components/whatsapp-button";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Gallery />
        {/* <Testimonials /> — reativar com avaliações reais (ver comentário no import) */}
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
      <WhatsappButton />
    </>
  );
}
