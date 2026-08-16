import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getDictionary } from "@/content/dictionary";
import { getLeadPrice, getSignatureItems } from "@/lib/menu";
import type { Locale } from "@/types/menu";

export function Signature({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const dishes = getSignatureItems();
  const secondary: Locale = locale === "pt" ? "en" : "pt";

  return (
    <section className="border-b border-border bg-cream">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl leading-tight text-foreground sm:text-4xl">
            {t.signature.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.signature.subtitle}</p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dishes.map(({ section, item }) => (
            <li
              key={`${section.id}-${item.pt}`}
              className="flex flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-azulejo">
                {section[locale]}
              </p>
              <h3 className="mt-3 text-xl leading-snug text-foreground">
                {item[locale]}
              </h3>
              <p className="mt-1 text-sm italic text-muted-foreground">
                {item[secondary]}
              </p>
              <p className="mt-5 font-heading text-lg font-semibold tabular-nums text-primary">
                {getLeadPrice(item, locale)}
              </p>
            </li>
          ))}
        </ul>

        <Link
          href={`/${locale}/menu`}
          className="group mt-10 inline-flex items-center gap-2 rounded-sm text-sm font-semibold uppercase tracking-wider text-foreground underline-offset-8 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          {t.signature.cta}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
