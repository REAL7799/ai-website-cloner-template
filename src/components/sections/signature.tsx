import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { DishImage } from "@/components/dish-image";
import { getDictionary } from "@/content/dictionary";
import { formatPrice } from "@/content/site";
import { dishImageFile, getSignatureItems } from "@/lib/menu";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types/menu";

export function Signature({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const dishes = getSignatureItems();
  const secondary: Locale = locale === "pt" ? "en" : "pt";

  return (
    <section className="border-b-2 border-ink bg-background">
      <div className="mx-auto w-full max-w-[110rem] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <header className="max-w-4xl">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.4em] text-piri">
            {t.signature.eyebrow}
          </p>
          <h2 className="shout mt-5 text-[clamp(2.6rem,8vw,6.5rem)] text-foreground">
            {t.signature.title}
          </h2>
          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            {t.signature.subtitle}
          </p>
        </header>

        <ol className="mt-16 space-y-16 sm:mt-20 sm:space-y-24">
          {dishes.map(({ section, item, blurb }, index) => (
            <li
              key={`${section.id}-${item.pt}`}
              className="reveal-up grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
            >
              <div
                className={cn(
                  "relative",
                  index % 2 === 1 ? "lg:order-2" : undefined
                )}
              >
                <DishImage
                  src={dishImageFile(section.id, item)}
                  name={item[locale]}
                  sizes="(min-width: 1024px) 46vw, 92vw"
                  className="aspect-[5/4] w-full"
                />
                <span
                  aria-hidden="true"
                  className="absolute -top-6 left-4 shout text-[clamp(3.5rem,9vw,7rem)] text-piri"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className={cn(index % 2 === 1 ? "lg:order-1" : undefined)}>
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.34em] text-azulejo">
                  {section[locale]}
                </p>
                <h3 className="shout mt-4 text-[clamp(1.9rem,5vw,3.6rem)] text-foreground">
                  {item[locale]}
                </h3>
                <p className="mt-2 font-heading text-lg italic text-muted-foreground">
                  {item[secondary]}
                </p>
                <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/80">
                  {blurb[locale]}
                </p>

                <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                  {item.prices.map((price) => (
                    <p
                      key={`${price.value}-${price.pt ?? ""}`}
                      className="flex items-baseline gap-2"
                    >
                      <span className="shout text-4xl text-piri sm:text-5xl">
                        {formatPrice(price.value, locale)}
                      </span>
                      {price[locale] ? (
                        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          {price[locale]}
                        </span>
                      ) : null}
                    </p>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <Link
          href={`/${locale}/menu`}
          className="group mt-20 inline-flex items-center gap-4 border-b-2 border-ink pb-2 text-sm font-bold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-piri hover:text-piri focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          {t.signature.cta}
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
