const slugify = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[/+]/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/**
 * Chave da fotografia de um item da carta.
 *
 * Inclui a secção de propósito: "Omelete simples" existe duas vezes na carta
 * — a sandes a 5,90 € e o prato a 12,00 € — e sem a secção partilhariam a
 * mesma imagem. Qualquer nome repetido no futuro fica igualmente resolvido.
 */
export const dishKey = (sectionId: string, name: string): string =>
  `${sectionId}--${slugify(name)}`;
