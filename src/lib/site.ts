// ⚠️ DADOS FICTÍCIOS de demonstração — substituir pelos contactos reais
// da Fátima Cake antes de publicar o site.
export const site = {
  name: "Fátima Cake",
  slogan: "Bolos artesanais feitos à mão, com amor",
  url: "https://fatimacake.pt",
  phoneDisplay: "+351 912 345 678",
  whatsappNumber: "351912345678",
  email: "ola@fatimacake.pt",
  address: {
    street: "Rua das Flores, 123",
    city: "1200-192 Lisboa",
  },
  instagram: "fatimacake.pt",
  facebook: "fatimacake.pt",
  foundedYear: 2012,
  hours: [
    { days: "Terça a Sexta", time: "09h00 — 19h00" },
    { days: "Sábado e Domingo", time: "09h00 — 13h00" },
    { days: "Segunda-feira", time: "Encerrado" },
  ],
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const defaultOrderMessage = `Olá, Fátima Cake! 🎂 Gostaria de fazer uma encomenda.`;
