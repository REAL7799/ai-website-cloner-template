import { menu, signatureDishes } from "@/content/menu";
import { formatPrice } from "@/content/site";
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

/** Pratos em destaque na homepage, já resolvidos e sem entradas em falta. */
export const getSignatureItems = () =>
  signatureDishes
    .map(({ sectionId, itemPt }) => getItem(sectionId, itemPt))
    .filter((entry): entry is { section: MenuSection; item: MenuItem } =>
      Boolean(entry)
    );

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
