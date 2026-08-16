import { menu } from "@/content/menu";
import { site } from "@/content/site";
import type { Locale } from "@/types/menu";

/**
 * Dados estruturados schema.org. O Café Fátima não tem website nem telefone
 * na ficha do Google, por isso este bloco é a principal fonte estruturada
 * sobre a casa para motores de busca e assistentes.
 */
export function BusinessJsonLd({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "@id": `${site.url}#business`,
    name: site.name,
    url: `${site.url}/${locale}`,
    foundingDate: String(site.since),
    servesCuisine: "Portuguese",
    priceRange: "€€",
    currenciesAccepted: "EUR",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.latitude,
      longitude: site.address.longitude,
    },
    hasMap: site.maps.place,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: site.hours.days,
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
    // Um número por preencher não entra nos dados estruturados.
    ...(site.phone && !site.phoneIsPlaceholder
      ? { telephone: site.phone }
      : {}),
    hasMenu: {
      "@type": "Menu",
      url: `${site.url}/${locale}/menu`,
      inLanguage: [locale === "pt" ? "pt-PT" : "en-GB"],
      hasMenuSection: menu.map((section) => ({
        "@type": "MenuSection",
        name: section[locale],
        hasMenuItem: section.items.map((item) => ({
          "@type": "MenuItem",
          name: item[locale],
          offers: item.prices.map((price) => ({
            "@type": "Offer",
            price: price.value.toFixed(2),
            priceCurrency: "EUR",
          })),
        })),
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      // Conteúdo estático próprio, sem input de utilizador.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
