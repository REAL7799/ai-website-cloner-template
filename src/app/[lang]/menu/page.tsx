import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AzulejoPattern } from "@/components/azulejo";
import { AllergenKey } from "@/components/menu/allergen-key";
import { MenuJumpNav } from "@/components/menu/menu-jump-nav";
import { MenuSectionBlock } from "@/components/menu/menu-section-block";
import { getDictionary, isLocale, locales, metaCopy } from "@/content/dictionary";
import { menu } from "@/content/menu";
import { site } from "@/content/site";
import type { Locale } from "@/types/menu";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const copy = metaCopy[locale];

  return {
    title: copy.menuTitle,
    description: copy.menuDescription,
    alternates: {
      canonical: `/${locale}/menu`,
      languages: {
        "pt-PT": "/pt/menu",
        "en-GB": "/en/menu",
        "x-default": "/pt/menu",
      },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: copy.menuTitle,
      description: copy.menuDescription,
      url: `/${locale}/menu`,
    },
  };
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-cream">
        <AzulejoPattern
          id="menu-azulejo"
          className="pointer-events-none absolute inset-0 size-full text-azulejo/[0.12]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/30 to-background"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <h1 className="font-heading text-4xl uppercase tracking-[0.18em] text-foreground sm:text-5xl">
            {t.menu.title}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t.menu.subtitle}
          </p>
        </div>
      </section>

      <MenuJumpNav locale={lang} />

      <div className="mx-auto w-full max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="space-y-16">
          {menu.map((section) => (
            <MenuSectionBlock key={section.id} section={section} locale={lang} />
          ))}
        </div>

        <div className="mt-16 space-y-8">
          <AllergenKey locale={lang} />

          <section className="rounded-lg border border-border bg-cream p-7 sm:p-9">
            <h2 className="text-xl uppercase tracking-[0.12em] text-foreground">
              {t.menu.notesTitle}
            </h2>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              {t.menu.notes.map((note) => (
                <li key={note} className="flex gap-2.5">
                  <span aria-hidden="true" className="text-azulejo">
                    ·
                  </span>
                  {note}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">
              {t.menu.priceDisclaimer}
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
