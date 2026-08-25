// Dados do negócio — edite este ficheiro para adaptar o site a outra pastelaria.
export const siteConfig = {
  name: "Doce Alma",
  legalName: "Doce Alma — Pastelaria Artesanal",
  tagline: "Bolos com alma, feitos à mão",
  description:
    "Pastelaria artesanal em Lisboa: bolos de festa por encomenda, tartes, pastéis de nata e doces tradicionais, feitos todos os dias com ingredientes locais e receitas de família.",
  url: "https://docealma.pt",
  founder: "António Correia",
  founded: 2009,
  phone: "+351 912 345 678",
  // Número em formato internacional sem "+" nem espaços, usado nos links wa.me
  whatsapp: "351912345678",
  email: "encomendas@docealma.pt",
  address: {
    street: "Rua das Flores 42",
    postalCode: "1200-192",
    city: "Lisboa",
    country: "PT",
  },
  hours: [
    { days: "Terça a Sexta", time: "08:00 – 19:00" },
    { days: "Sábado e Domingo", time: "08:00 – 14:00" },
    { days: "Segunda-feira", time: "Encerrado" },
  ],
  social: {
    instagram: "https://instagram.com/docealma",
    facebook: "https://facebook.com/docealma",
  },
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const defaultOrderMessage =
  "Olá! Gostaria de fazer uma encomenda na Doce Alma.";
