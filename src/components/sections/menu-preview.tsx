import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { menu } from "@/content/menu";
import { getDictionary } from "@/content/dictionary";
import { formatPrice } from "@/content/site";
import type { Locale } from "@/types/menu";

export function MenuPreview({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const secondary: Locale = locale === "pt" ? "en" : "pt";

  return (
    <section className="border-b-2 border-ink bg-cream">
      <div className="mx-auto w-full max-w-[110rem] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <header className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.4em] text-piri">
              {t.menu.eyebrow}
            </p>
            <h2 className="shout mt-5 text-[clamp(2.6rem,8vw,6.5rem)] text-foreground">
              {t.menu.title}
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            {t.menu.subtitle}
          </p>
        </header>

        <ul className="mt-14 border-t-2 border-ink">
          {menu.map((section) => {
            const cheapest = section.items.reduce(
              (min, item) =>
                Math.min(min, ...item.prices.map((price) => price.value)),
              Number.POSITIVE_INFINITY
            );

            return (
              <li key={section.id} className="border-b border-ink/15">
                <Link
                  href={`/${locale}/menu#${section.id}`}
                  className="group flex flex-wrap items-baseline gap-x-6 gap-y-1 py-5 transition-colors hover:text-piri focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:py-6"
                >
                  <span className="shout text-[clamp(1.5rem,4.4vw,3rem)] text-current">
                    {section[locale]}
                  </span>
                  <span className="font-heading text-base italic text-muted-foreground">
                    {section[secondary]}
                  </span>
                  <span className="ml-auto flex items-center gap-4 text-sm font-semibold tabular-nums text-muted-foreground">
                    {t.menu.fromLabel} {formatPrice(cheapest, locale)}
                    <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
