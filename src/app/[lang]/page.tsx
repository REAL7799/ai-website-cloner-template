import { notFound } from "next/navigation";

import { BusinessJsonLd } from "@/components/json-ld";
import { FactsStrip } from "@/components/sections/facts-strip";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { MenuPreview } from "@/components/sections/menu-preview";
import { Signature } from "@/components/sections/signature";
import { Story } from "@/components/sections/story";
import { Visit } from "@/components/sections/visit";
import { isLocale, locales } from "@/content/dictionary";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <>
      <BusinessJsonLd locale={lang} />
      <Hero locale={lang} />
      <Marquee locale={lang} />
      <FactsStrip locale={lang} />
      <Signature locale={lang} />
      <Story locale={lang} />
      <MenuPreview locale={lang} />
      <Visit locale={lang} />
    </>
  );
}
