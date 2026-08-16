import Link from "next/link";

import { menu } from "@/content/menu";
import { getDictionary } from "@/content/dictionary";
import type { Locale } from "@/types/menu";

export function MenuPreview({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const secondary: Locale = locale === "pt" ? "en" : "pt";

  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <h2 className="text-3xl leading-tight text-foreground sm:text-4xl">
          {t.menu.title}
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          {t.menu.subtitle}
        </p>

        <ul className="mt-12 grid gap-x-6 gap-y-px sm:grid-cols-2 lg:grid-cols-3">
          {menu.map((section) => (
            <li key={section.id} className="border-b border-border/70">
              <Link
                href={`/${locale}/menu#${section.id}`}
                className="flex items-baseline justify-between gap-4 py-4 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <span>
                  <span className="block font-heading text-lg leading-tight text-foreground">
                    {section[locale]}
                  </span>
                  <span className="mt-0.5 block text-xs italic text-muted-foreground">
                    {section[secondary]}
                  </span>
                </span>
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                  {section.items.length}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
