/**
 * Dados do negócio. Tudo o que está aqui foi confirmado na ficha do Google Maps
 * do Café Fátima, exceto os campos assinalados com TODO, que dependem do
 * proprietário. Este é o único ficheiro a editar quando os dados mudarem.
 */
export const site = {
  name: "Café Fátima",
  since: 1952,
  /** Domínio final do site — trocar quando estiver registado. */
  url: "https://cafefatima.pt",
  address: {
    street: "R. de São José 6",
    locality: "Cova da Iria",
    postalCode: "2495-434",
    city: "Fátima",
    country: "PT",
    countryName: "Portugal",
    plusCode: "J8JF+QM Fátima",
    /** Coordenadas do plus code J8JF+QM (Cova da Iria, Fátima). */
    latitude: 39.6297,
    longitude: -8.6719,
  },
  maps: {
    /** Ficha do Google Maps partilhada pelo proprietário. */
    place: "https://maps.app.goo.gl/eaMvh2rb6PepseLf6",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=Caf%C3%A9+F%C3%A1tima%2C+R.+de+S%C3%A3o+Jos%C3%A9+6%2C+2495-434+F%C3%A1tima",
  },
  rating: { value: 4.0, count: 207 },
  /** Intervalo médio por pessoa indicado no Google Maps. */
  priceRange: { min: 10, max: 15 },
  /**
   * TODO: número real por indicar. Enquanto `phoneIsPlaceholder` for `true`, o
   * site mostra o texto sem o transformar em link de chamada — um `tel:` para
   * um número falso só faz o cliente marcar para lado nenhum.
   */
  phone: "+351 xxxxxxxxx",
  phoneIsPlaceholder: true,
  /** Confirmado no Google Maps: sete dias por semana, 08:00 às 00:00. */
  hours: {
    opens: "08:00",
    closes: "00:00",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  features: {
    /** Confirmado no Google Maps ("Comer no local"). */
    dineIn: true,
    /** Confirmado pela carta impressa, que anuncia a rede do café. */
    wifi: true,
  },
} as const;

export const formatPrice = (value: number, locale: "pt" | "en") =>
  new Intl.NumberFormat(locale === "pt" ? "pt-PT" : "en-GB", {
    style: "currency",
    currency: "EUR",
  }).format(value);
