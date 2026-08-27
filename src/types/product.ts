export type ProductCategory = "bolos" | "tartes" | "especialidades";

export interface Product {
  id: string;
  name: string;
  description: string;
  /** Preço formatado em euros, ex.: "32,00 €" ou "desde 150 €" */
  price: string;
  category: ProductCategory;
  image: string;
  imageAlt: string;
  badge?: string;
}
