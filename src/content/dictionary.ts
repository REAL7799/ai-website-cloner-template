import type { Locale } from "@/types/menu";

export const locales: Locale[] = ["pt", "en"];
export const defaultLocale: Locale = "pt";

export const isLocale = (value: string): value is Locale =>
  (locales as string[]).includes(value);

const dictionary = {
  pt: {
    localeName: "Português",
    localeSwitchLabel: "English",
    nav: {
      home: "Início",
      menu: "Ementa",
      story: "A casa",
      visit: "Visitar",
      openMenu: "Abrir menu de navegação",
      closeMenu: "Fechar menu de navegação",
    },
    hero: {
      eyebrow: "Cova da Iria · Fátima",
      since: "desde 1952",
      tagline:
        "Um café de família no coração de Fátima. Pequenos-almoços cedo, pratos do dia a preço honesto e a mesma bifana que serve peregrinos há mais de setenta anos.",
      primaryCta: "Ver a ementa",
      secondaryCta: "Como chegar",
      ratingLabel: "no Google",
      reviewsLabel: "avaliações",
    },
    facts: {
      addressLabel: "Onde estamos",
      hoursLabel: "Horário",
      hoursValue: "Todos os dias, 08:00 – 00:00",
      priceLabel: "Preço médio",
      priceValue: "10 – 15 € por pessoa",
      serviceLabel: "Serviço",
      serviceValue: "Comer no local · Wi-Fi grátis",
    },
    story: {
      title: "Setenta anos à mesma esquina",
      lead: "O Café Fátima abriu em 1952, quando Cova da Iria ainda era um punhado de casas à volta do santuário.",
      body: [
        "Desde então, servimos a mesma coisa a quem passa: café bem tirado, sopa feita de manhã, pratos portugueses sem invenções e um balcão onde toda a gente cabe. Peregrinos de meio mundo, gente da terra que vem sempre à mesma hora, camionistas, famílias ao domingo.",
        "A carta é simples de propósito. Bifanas, pregos, bitoques, arroz de pato, bacalhau à Brás — comida que se reconhece. Está tudo traduzido em inglês, porque nesta rua isso faz falta.",
      ],
      badgeTitle: "Casa aberta desde",
      badgeSubtitle: "Cova da Iria, Fátima",
    },
    signature: {
      title: "O que se pede mais",
      subtitle: "Alguns dos pratos que saem todos os dias da nossa cozinha.",
      cta: "Ver a ementa completa",
    },
    menu: {
      title: "Ementa",
      subtitle:
        "A carta completa da casa, em português e inglês. IVA incluído à taxa legal em vigor.",
      jumpLabel: "Ir para",
      allergensTitle: "Mapa de alergénios",
      allergensSubtitle:
        "Os números junto a cada prato correspondem a esta lista. Fale connosco se tiver alguma alergia.",
      notesTitle: "Informações",
      notes: [
        "Serviço de mesa, por produto: + 0,20 €",
        "IVA incluído à taxa legal em vigor",
        "Existe livro de reclamações",
        "Wi-Fi grátis para clientes",
      ],
      priceDisclaimer:
        "Os preços podem ser alterados sem aviso prévio. Em caso de dúvida, prevalece a carta afixada no estabelecimento.",
    },
    visit: {
      title: "Venha visitar-nos",
      subtitle:
        "Estamos na Rua de São José, a poucos minutos a pé do Santuário de Fátima.",
      addressTitle: "Morada",
      hoursTitle: "Horário",
      hoursValue: "Todos os dias, 08:00 – 00:00",
      directionsCta: "Abrir no Google Maps",
      plusCodeLabel: "Plus code",
      phoneTitle: "Contacto",
      phoneMissing: "Passe pelo café ou envie-nos mensagem pelo Google Maps.",
    },
    footer: {
      tagline: "Café de família em Cova da Iria, Fátima, desde 1952.",
      rights: "Todos os direitos reservados.",
      legal: "IVA incluído à taxa legal em vigor · Existe livro de reclamações",
      complaintsBook: "Livro de reclamações",
    },
  },
  en: {
    localeName: "English",
    localeSwitchLabel: "Português",
    nav: {
      home: "Home",
      menu: "Menu",
      story: "Our story",
      visit: "Visit",
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu",
    },
    hero: {
      eyebrow: "Cova da Iria · Fátima",
      since: "since 1952",
      tagline:
        "A family café in the heart of Fátima. Early breakfasts, honest home cooking and the same pork steak sandwich we have served pilgrims for over seventy years.",
      primaryCta: "See the menu",
      secondaryCta: "Get directions",
      ratingLabel: "on Google",
      reviewsLabel: "reviews",
    },
    facts: {
      addressLabel: "Where we are",
      hoursLabel: "Opening hours",
      hoursValue: "Every day, 08:00 – 00:00",
      priceLabel: "Average price",
      priceValue: "€10 – €15 per person",
      serviceLabel: "Service",
      serviceValue: "Dine-in · Free Wi-Fi",
    },
    story: {
      title: "Seventy years on the same corner",
      lead: "Café Fátima opened in 1952, when Cova da Iria was still a handful of houses around the sanctuary.",
      body: [
        "We have served the same thing ever since: proper coffee, soup made fresh each morning, Portuguese plates without fuss, and a counter with room for everyone. Pilgrims from all over the world, locals who arrive at the same hour every day, lorry drivers, families on a Sunday.",
        "The menu is deliberately simple. Bifanas, pregos, bitoques, duck rice, codfish à Brás — food you recognise. Everything is written in English too, because on this street that matters.",
      ],
      badgeTitle: "Serving since",
      badgeSubtitle: "Cova da Iria, Fátima",
    },
    signature: {
      title: "What people order",
      subtitle: "A few of the plates that leave our kitchen every single day.",
      cta: "See the full menu",
    },
    menu: {
      title: "Menu",
      subtitle:
        "Our full menu, in Portuguese and English. VAT included at the legal rate.",
      jumpLabel: "Jump to",
      allergensTitle: "Allergen map",
      allergensSubtitle:
        "The numbers next to each dish match this list. Please tell us about any allergy.",
      notesTitle: "Good to know",
      notes: [
        "Table service, per product: + €0.20",
        "VAT included at the legal rate",
        "Complaint book available",
        "Free Wi-Fi for customers",
      ],
      priceDisclaimer:
        "Prices may change without notice. The menu displayed in the café always takes precedence.",
    },
    visit: {
      title: "Come and find us",
      subtitle:
        "We are on Rua de São José, a few minutes' walk from the Sanctuary of Fátima.",
      addressTitle: "Address",
      hoursTitle: "Opening hours",
      hoursValue: "Every day, 08:00 – 00:00",
      directionsCta: "Open in Google Maps",
      plusCodeLabel: "Plus code",
      phoneTitle: "Contact",
      phoneMissing: "Drop by the café or message us through Google Maps.",
    },
    footer: {
      tagline: "A family café in Cova da Iria, Fátima, since 1952.",
      rights: "All rights reserved.",
      legal: "VAT included at the legal rate · Complaint book available",
      complaintsBook: "Complaint book",
    },
  },
} as const;

export type Dictionary = (typeof dictionary)[Locale];

export const getDictionary = (locale: Locale): Dictionary => dictionary[locale];

export const metaCopy = {
  pt: {
    title: "Café Fátima — café de família em Cova da Iria desde 1952",
    description:
      "Café Fátima, na Rua de São José, Cova da Iria. Pequenos-almoços, sandes, pratos tradicionais portugueses e sobremesas caseiras a poucos minutos do Santuário de Fátima. Ementa completa e morada.",
    menuTitle: "Ementa — Café Fátima, Fátima",
    menuDescription:
      "Ementa completa do Café Fátima: cafetaria, sandes, bifanas, pratos combinados, pratos tradicionais, sobremesas, bebidas e vinhos, com preços e mapa de alergénios.",
  },
  en: {
    title: "Café Fátima — a family café in Cova da Iria since 1952",
    description:
      "Café Fátima on Rua de São José, Cova da Iria. Breakfast, sandwiches, traditional Portuguese dishes and homemade desserts, minutes from the Sanctuary of Fátima. Full menu and address.",
    menuTitle: "Menu — Café Fátima, Fátima, Portugal",
    menuDescription:
      "The full Café Fátima menu: coffee shop, sandwiches, burgers, mixed dishes, traditional Portuguese plates, desserts, drinks and wines, with prices and allergen map.",
  },
} as const;
