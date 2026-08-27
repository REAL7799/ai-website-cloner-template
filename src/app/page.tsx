import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Vitrine } from "@/components/site/vitrine";
import { Explosao } from "@/components/site/explosao";
import { Sobre } from "@/components/site/sobre";
import { Depoimentos } from "@/components/site/depoimentos";
import { Faq } from "@/components/site/faq";
import { Contactos } from "@/components/site/contactos";
import { Footer } from "@/components/site/footer";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: site.name,
  description:
    "Pastelaria artesanal — bolos de aniversário, bolos de casamento e tartes tradicionais feitos à mão, por encomenda.",
  url: site.url,
  image: `${site.url}/images/hero-cake.webp`,
  telephone: site.phoneDisplay,
  email: site.email,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressCountry: "PT",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "09:00",
      closes: "13:00",
    },
  ],
  sameAs: [
    `https://instagram.com/${site.instagram}`,
    `https://facebook.com/${site.facebook}`,
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Vitrine />
        <Explosao />
        <Sobre />
        <Depoimentos />
        <Faq />
        <Contactos />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
