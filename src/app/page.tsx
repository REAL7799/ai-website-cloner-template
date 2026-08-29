import { About } from "@/components/site/about";
import { Benefits } from "@/components/site/benefits";
import { Collections } from "@/components/site/collections";
import { Faq } from "@/components/site/faq";
import { FinalCta } from "@/components/site/final-cta";
import { Footer } from "@/components/site/footer";
import { GalleryCarousel } from "@/components/site/gallery-carousel";
import { Hero } from "@/components/site/hero";
import { HowToOrder } from "@/components/site/how-to-order";
import { Marquee } from "@/components/site/marquee";
import { Navbar } from "@/components/site/navbar";
import { CONTACT, FAQS, SITE_URL } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Florist",
      "@id": `${SITE_URL}/#business`,
      name: "Kitty Flowers",
      slogan: "Delicadeza em forma de flores",
      description:
        "Buquês de rosas eternas personalizados, feitos à mão em Lisboa (Prior Velho). Rosas de cetim que nunca murcham, caixas com chocolates e edições especiais.",
      url: SITE_URL,
      image: `${SITE_URL}/seo/og-image.png`,
      logo: `${SITE_URL}/images/logo-kitty-flowers.png`,
      telephone: "+351931420039",
      priceRange: "€€",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Prior Velho",
        addressRegion: "Lisboa",
        addressCountry: "PT",
      },
      areaServed: "Lisboa, Portugal",
      sameAs: [CONTACT.instagram, CONTACT.facebook],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <About />
        <Collections />
        <GalleryCarousel />
        <Benefits />
        <HowToOrder />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
