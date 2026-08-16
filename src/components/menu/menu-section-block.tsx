import { formatPrice } from "@/content/site";
import { cn } from "@/lib/utils";
import type { Locale, MenuItem, MenuSection } from "@/types/menu";

export function MenuSectionBlock({
  section,
  locale,
}: {
  section: MenuSection;
  locale: Locale;
}) {
  const secondary: Locale = locale === "pt" ? "en" : "pt";

  return (
    <section id={section.id} className="scroll-mt-28">
      <header className="border-b-2 border-foreground/80 pb-3">
        <h2 className="text-2xl uppercase tracking-[0.12em] text-foreground sm:text-3xl">
          {section[locale]}
        </h2>
        <p className="mt-1 text-sm italic text-muted-foreground">
          {section[secondary]}
        </p>
      </header>

      <ul className="mt-6 divide-y divide-border/70">
        {section.items.map((item) => (
          <MenuRow
            key={item.pt}
            item={item}
            locale={locale}
            secondary={secondary}
          />
        ))}
      </ul>

      {section.note ? (
        <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
          {section.note[locale]}
        </p>
      ) : null}
    </section>
  );
}

function MenuRow({
  item,
  locale,
  secondary,
}: {
  item: MenuItem;
  locale: Locale;
  secondary: Locale;
}) {
  const single = item.prices.length === 1;

  return (
    <li className="py-4">
      <div
        className={cn(
          "flex items-baseline gap-3",
          single ? "leader-dots" : undefined
        )}
      >
        <p className="bg-background pr-2 text-base font-medium leading-snug text-foreground">
          {item[locale]}
        </p>
        {single ? (
          <p className="ml-auto bg-background pl-2 font-heading text-base font-semibold tabular-nums text-foreground">
            {formatPrice(item.prices[0].value, locale)}
          </p>
        ) : null}
      </div>

      <p className="mt-0.5 text-sm italic text-muted-foreground">
        {item[secondary]}
      </p>

      {!single ? (
        <ul className="mt-2.5 flex flex-wrap gap-x-6 gap-y-1.5">
          {item.prices.map((price) => (
            <li
              key={`${price.value}-${price.pt ?? ""}`}
              className="text-sm text-muted-foreground"
            >
              {price[locale] ? <span>{price[locale]} · </span> : null}
              <span className="font-heading font-semibold tabular-nums text-foreground">
                {formatPrice(price.value, locale)}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      {item.allergens?.length ? (
        <p className="mt-2.5 flex flex-wrap items-center gap-1">
          <span className="sr-only">
            {locale === "pt" ? "Alergénios: " : "Allergens: "}
          </span>
          {item.allergens.map((code) => (
            <span
              key={code}
              className="flex size-5 items-center justify-center rounded-full border border-azulejo/25 bg-azulejo/[0.07] text-[0.6rem] font-semibold tabular-nums text-azulejo/90"
            >
              {code}
            </span>
          ))}
        </p>
      ) : null}
    </li>
  );
}
