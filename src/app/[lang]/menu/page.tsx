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
      <section className="on-ink relative isolate overflow-hidden">
        <AzulejoPattern
          id="menu-azulejo"
          className="pointer-events-none absolute inset-0 size-full text-label/25"
          tile={110}
        />
        <div className="relative mx-auto w-full max-w-[110rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.4em] text-label">
            {t.menu.eyebrow}
          </p>
          <h1 className="shout mt-5 text-[clamp(3.5rem,16vw,12rem)] text-cream">
            {t.menu.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/70">
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
                  <span aria-hidden="true" className="text-label">
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
