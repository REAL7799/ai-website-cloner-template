import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Benefits } from "@/components/benefits";
import { CollectionsSection } from "@/components/collections-section";
import { BestSellers } from "@/components/best-sellers";
import { NewArrivals } from "@/components/new-arrivals";
import { HowToOrder } from "@/components/how-to-order";
import { AboutSection } from "@/components/about-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { siteConfig, whatsappLink } from "@/lib/site";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: siteConfig.name,
  description: siteConfig.description,
  image: "/images/logo.jpg",
  telephone: siteConfig.whatsappDisplay,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Maputo",
    addressCountry: "MZ",
  },
  priceRange: "650 MT – 3.450 MT",
  currenciesAccepted: "MZN",
  paymentAccepted: "M-Pesa, e-Mola, Numerário",
  url: whatsappLink(),
  sameAs: [
    siteConfig.social.facebook,
    siteConfig.social.instagram,
    siteConfig.social.tiktok,
  ],
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Benefits />
        <CollectionsSection />
        <BestSellers />
        <NewArrivals />
        <HowToOrder />
        <AboutSection />
        <TestimonialsSection />
      </main>
      <SiteFooter />
      <WhatsAppFab />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
