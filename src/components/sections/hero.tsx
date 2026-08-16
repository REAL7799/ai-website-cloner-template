import Link from "next/link";
import { ArrowDown, MapPin, Star } from "lucide-react";

import { AzulejoPattern } from "@/components/azulejo";
import { DishImage } from "@/components/dish-image";
import { getDictionary } from "@/content/dictionary";
import { formatPrice, site } from "@/content/site";
import { dishImageFile, getSignatureItems } from "@/lib/menu";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types/menu";

export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const lead = getSignatureItems()[0];
  const rating = site.rating.value.toLocaleString(
    locale === "pt" ? "pt-PT" : "en-GB",
    { minimumFractionDigits: 1 }
  );

  return (
    <section className="on-ink relative isolate overflow-hidden">
      <AzulejoPattern
        id="hero-azulejo"
        className="pointer-events-none absolute inset-0 size-full text-label/25"
        tile={110}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,transparent_20%,var(--ink)_78%)]"
      />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[110rem] flex-col px-5 pb-10 pt-24 sm:px-8 sm:pt-28 lg:px-12">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.68rem] font-semibold uppercase tracking-[0.4em] text-cream/60 sm:text-xs">
              <span className="inline-block size-1.5 rounded-full bg-cta" />
              {t.hero.eyebrow}
            </p>

            <h1 className="mt-7 flex flex-col">
              <span className="font-script text-[clamp(3.4rem,11vw,8.5rem)] leading-[0.9] text-cream">
                {site.name}
              </span>
              <span className="shout shout-outline mt-3 text-[clamp(2.6rem,10.5vw,8rem)] text-label">
                {t.hero.since}
              </span>
            </h1>

            <p className="mt-9 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
              {t.hero.tagline}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={`/${locale}/menu`}
                className="group inline-flex h-14 items-center justify-center gap-3 bg-cta px-9 text-sm font-bold uppercase tracking-[0.18em] text-cta-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                {t.hero.primaryCta}
              </Link>
              <a
                href={site.maps.directions}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-14 items-center justify-center gap-2 border border-cream/25 px-9 text-sm font-bold uppercase tracking-[0.18em] text-cream transition-colors hover:border-cream/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                <MapPin className="size-4" />
                {t.hero.secondaryCta}
              </a>
            </div>

            <p className="mt-9 flex items-center gap-2.5 text-sm text-cream/60">
              <Star className="size-4 fill-shout text-shout" aria-hidden="true" />
              <span>
                <strong className="font-bold text-cream">{rating}</strong>{" "}
                {t.hero.ratingLabel} · {site.rating.count} {t.hero.reviewsLabel}
              </span>
            </p>
          </div>

          {lead ? (
            <div className="relative hidden lg:block">
              <DishImage
                src={dishImageFile(lead.section.id, lead.item)}
                name={lead.item[locale]}
                priority
                sizes="(min-width: 1024px) 40vw, 0px"
                className="aspect-square w-full rounded-full bg-cream"
              />
              <PriceStar
                value={lead.item.prices[0].value}
                locale={locale}
                className="absolute bottom-2 -left-6"
              />
            </div>
          ) : null}
        </div>

        <p className="mt-12 flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-cream/40">
          <ArrowDown className="size-3.5" aria-hidden="true" />
          {t.hero.scrollCue}
        </p>
      </div>
    </section>
  );
}

function PriceStar({
  value,
  locale,
  className,
}: {
  value: number;
  locale: Locale;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "price-star flex size-32 items-center justify-center bg-cta text-center",
        className
      )}
    >
      <span className="shout text-2xl text-cta-foreground">
        {formatPrice(value, locale)}
      </span>
    </span>
  );
}
