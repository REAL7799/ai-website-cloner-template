export type ProductBadge = "Mais Vendido" | "Novo" | "Promoção";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  imageBack?: string;
  badge?: ProductBadge;
  bestSeller?: boolean;
}

export interface Collection {
  id: string;
  season: string;
  name: string;
  description: string;
  image: string;
  pieces: number;
}

export interface Testimonial {
  quote: string;
  name: string;
  city: string;
}
