export const siteConfig = {
  name: "Clóset Dayana",
  tagline: "Moda y Estilo",
  description:
    "Loja de roupa feminina em Moçambique. Vestidos, conjuntos, blusas e looks de ocasião especial — encomendas rápidas via WhatsApp, com entrega em todo o país.",
  // Actualize aqui o número real da loja (formato internacional, sem espaços)
  whatsappNumber: "258841234567",
  whatsappDisplay: "+258 84 123 4567",
  email: "closetdayana.moda@gmail.com",
  address: "Maputo, Moçambique",
  hours: "Seg – Sáb · 8h00 às 18h00",
  social: {
    facebook: "https://facebook.com/closetdayana",
    instagram: "https://instagram.com/closetdayana",
    tiktok: "https://tiktok.com/@closetdayana",
  },
};

export function formatPrice(value: number): string {
  return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} MT`;
}

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function productWhatsappLink(name: string, price: number): string {
  return whatsappLink(
    `Olá Clóset Dayana! 👗 Tenho interesse na peça "${name}" (${formatPrice(price)}). Ainda está disponível?`,
  );
}
