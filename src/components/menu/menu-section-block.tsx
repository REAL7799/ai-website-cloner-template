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
    <section id={section.id} className="scroll-mt-24">
      <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b-2 border-ink pb-3">
        <h2 className="shout text-[clamp(1.8rem,5.5vw,3.4rem)] text-foreground">
          {section[locale]}
        </h2>
        <p className="font-heading text-lg italic text-muted-foreground">
          {section[secondary]}
        </p>
      </header>

      <ul className="mt-5 divide-y divide-ink/12">
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
        <p className="mt-5 border-l-2 border-piri pl-4 text-xs leading-relaxed text-muted-foreground">
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
        <p className="bg-background pr-2 text-base font-semibold leading-snug text-foreground sm:text-lg">
          {item[locale]}
        </p>
        {single ? (
          <p className="ml-auto bg-background pl-2 shout text-xl text-piri sm:text-2xl">
            {formatPrice(item.prices[0].value, locale)}
          </p>
        ) : null}
      </div>

      <p className="mt-0.5 font-heading text-sm italic text-muted-foreground">
        {item[secondary]}
      </p>

      {!single ? (
        <ul className="mt-2.5 flex flex-wrap gap-x-7 gap-y-1.5">
          {item.prices.map((price) => (
            <li
              key={`${price.value}-${price.pt ?? ""}`}
              className="flex items-baseline gap-2 text-sm text-muted-foreground"
            >
              {price[locale] ? <span>{price[locale]}</span> : null}
              <span className="shout text-lg text-piri">
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
              className="flex size-5 items-center justify-center rounded-full border border-azulejo/30 bg-azulejo/8 text-[0.6rem] font-bold tabular-nums text-azulejo"
            >
              {code}
            </span>
          ))}
        </p>
      ) : null}
    </li>
  );
}
