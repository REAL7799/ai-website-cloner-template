"use client";

import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";

import { getDictionary } from "@/content/dictionary";
import { formatPrice } from "@/content/site";
import { allergens } from "@/content/menu";
import { dishImages } from "@/content/dish-images";
import { dishKey } from "@/lib/dish-slug";
import type { Locale, MenuItem } from "@/types/menu";

/**
 * Linha da carta que abre a fotografia do prato ao ser clicada.
 * O gatilho é um `<button>` verdadeiro, por isso funciona com teclado
 * e é anunciado por leitores de ecrã sem trabalho extra.
 */
export function DishDialog({
  item,
  sectionId,
  locale,
  children,
}: {
  item: MenuItem;
  sectionId: string;
  locale: Locale;
  children: React.ReactNode;
}) {
  const t = getDictionary(locale);
  const secondary: Locale = locale === "pt" ? "en" : "pt";
  const key = dishKey(sectionId, item.pt);

  // Sem fotografia não há nada para abrir: fica texto simples, sem botão morto.
  if (!item.image && !dishImages.has(key)) return <>{children}</>;

  const src = `/images/pratos/${item.image ?? `${key}.webp`}`;
  const itemAllergens = allergens.filter((entry) =>
    item.allergens?.includes(entry.code)
  );

  return (
    <Dialog.Root>
      <Dialog.Trigger
        className="group/dish block w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        aria-label={`${item[locale]} — ${t.menu.viewPhoto}`}
      >
        {children}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-ink/85 backdrop-blur-sm transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 flex max-h-[92svh] w-[min(34rem,92vw)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto bg-cream shadow-2xl transition-all duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
          <div className="relative aspect-square w-full shrink-0 bg-secondary">
            <Image
              src={src}
              alt={item[locale]}
              fill
              sizes="(min-width: 640px) 34rem, 92vw"
              // Recortada: mostrar o prato inteiro em vez de o cortar.
              className="object-contain p-6 drop-shadow-[0_14px_24px_rgb(0_0_0/0.18)]"
            />
            <Dialog.Close
              aria-label={t.menu.closePhoto}
              className="absolute right-3 top-3 flex size-10 items-center justify-center bg-ink/70 text-cream backdrop-blur transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <X className="size-5" />
            </Dialog.Close>
          </div>

          <div className="p-6 sm:p-7">
            <Dialog.Title className="shout text-2xl leading-tight text-ink sm:text-3xl">
              {item[locale]}
            </Dialog.Title>
            <Dialog.Description className="mt-1 font-heading text-base italic text-muted-foreground">
              {item[secondary]}
            </Dialog.Description>

            <ul className="mt-5 flex flex-wrap gap-x-7 gap-y-2">
              {item.prices.map((price) => (
                <li
                  key={`${price.value}-${price.pt ?? ""}`}
                  className="flex items-baseline gap-2"
                >
                  <span className="shout text-3xl text-shout">
                    {formatPrice(price.value, locale)}
                  </span>
                  {price[locale] ? (
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {price[locale]}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>

            {itemAllergens.length ? (
              <div className="mt-6 border-t border-ink/15 pt-4">
                <h3 className="text-[0.58rem] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                  {t.menu.allergensTitle}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                  {itemAllergens.map((entry) => (
                    <li
                      key={entry.code}
                      className="flex items-center gap-2 text-sm text-ink"
                    >
                      <span className="flex size-5 items-center justify-center rounded-full border border-label/30 bg-label/8 text-[0.6rem] font-bold tabular-nums text-label">
                        {entry.code}
                      </span>
                      {entry[locale]}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <p className="mt-6 text-[0.68rem] leading-relaxed text-muted-foreground">
              {t.menu.photoDisclaimer}
            </p>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
