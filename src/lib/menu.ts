import { menu, signatureDishes } from "@/content/menu";
import { dishImages } from "@/content/dish-images";
import { formatPrice } from "@/content/site";
import { dishKey } from "@/lib/dish-slug";
import type { Locale, MenuItem, MenuSection } from "@/types/menu";

export const getSection = (id: string): MenuSection | undefined =>
  menu.find((section) => section.id === id);

export const getItem = (
  sectionId: string,
  itemPt: string
): { section: MenuSection; item: MenuItem } | undefined => {
  const section = getSection(sectionId);
  const item = section?.items.find((entry) => entry.pt === itemPt);
  return section && item ? { section, item } : undefined;
};

interface SignatureEntry {
  section: MenuSection;
  item: MenuItem;
  blurb: { pt: string; en: string };
}

/** Pratos em destaque na homepage, já resolvidos e sem entradas em falta. */
export const getSignatureItems = (): SignatureEntry[] =>
  signatureDishes
    .map(({ sectionId, itemPt, blurb }) => {
      const found = getItem(sectionId, itemPt);
      return found ? { ...found, blurb } : undefined;
    })
    .filter((entry): entry is SignatureEntry => Boolean(entry));

/** O preço mais baixo do prato, para os cartões de destaque. */
export const getLeadPrice = (item: MenuItem, locale: Locale) => {
  const lowest = item.prices.reduce(
    (min, price) => (price.value < min.value ? price : min),
    item.prices[0]
  );
  return formatPrice(lowest.value, locale);
};

export const localised = <T extends { pt: string; en: string }>(
  entry: T,
  locale: Locale
) => entry[locale];

/**
 * Ficheiro da fotografia de um item, ou undefined se ainda não existir —
 * assim os componentes desenham o marcador gráfico em vez de uma imagem 404.
 */
export const dishImageFile = (
  sectionId: string,
  item: MenuItem
): string | undefined => {
  if (item.image) return item.image;
  const key = dishKey(sectionId, item.pt);
  return dishImages.has(key) ? `${key}.webp` : undefined;
};
