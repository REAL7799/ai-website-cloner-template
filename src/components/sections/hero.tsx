import Link from "next/link";
import { MapPin, Star, UtensilsCrossed } from "lucide-react";

import { AzulejoPattern } from "@/components/azulejo";
import { getDictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import type { Locale } from "@/types/menu";

export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const rating = site.rating.value.toLocaleString(
    locale === "pt" ? "pt-PT" : "en-GB",
    { minimumFractionDigits: 1 }
  );

  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-cream">
      <AzulejoPattern
        id="hero-azulejo"
        className="pointer-events-none absolute inset-0 size-full text-azulejo/[0.13]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-20 text-center sm:px-8 sm:py-28 lg:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-muted-foreground sm:text-sm">
          {t.hero.eyebrow}
        </p>

        <h1 className="mt-7 flex flex-col items-center leading-none">
          <span className="font-script text-6xl text-foreground sm:text-7xl lg:text-8xl">
            {site.name}
          </span>
          <span className="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.5em] text-primary sm:text-xs">
            {t.hero.since}
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t.hero.tagline}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={`/${locale}/menu`}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary px-7 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:w-auto"
          >
            <UtensilsCrossed className="size-4" />
            {t.hero.primaryCta}
          </Link>
          <a
            href={site.maps.directions}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-7 text-sm font-semibold uppercase tracking-wider text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:w-auto"
          >
            <MapPin className="size-4" />
            {t.hero.secondaryCta}
          </a>
        </div>

        <p className="mt-9 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Star className="size-4 fill-current text-primary" aria-hidden="true" />
          <span>
            <strong className="font-semibold text-foreground">{rating}</strong>{" "}
            {t.hero.ratingLabel} · {site.rating.count} {t.hero.reviewsLabel}
          </span>
        </p>
      </div>
    </section>
  );
}
