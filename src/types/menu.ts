export type Locale = "pt" | "en";

export type AllergenCode =
  | 1 | 2 | 3 | 4 | 5 | 6 | 7
  | 8 | 9 | 10 | 11 | 12 | 13 | 14;

/** Um preço com uma variante opcional (dose, capacidade, tipo de pão). */
export interface MenuPrice {
  value: number;
  pt?: string;
  en?: string;
}

export interface MenuItem {
  pt: string;
  en: string;
  prices: MenuPrice[];
  allergens?: AllergenCode[];
  /** Leitura ambígua na fotografia da carta — confirmar com o proprietário. */
  needsCheck?: boolean;
}

export interface MenuSection {
  id: string;
  pt: string;
  en: string;
  note?: { pt: string; en: string };
  items: MenuItem[];
}
