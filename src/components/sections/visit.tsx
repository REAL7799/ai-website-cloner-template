import { Clock, MapPin, MessageSquare, Navigation } from "lucide-react";

import { AzulejoPattern } from "@/components/azulejo";
import { getDictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import type { Locale } from "@/types/menu";

export function Visit({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section
      id="visitar"
      className="relative isolate scroll-mt-24 overflow-hidden border-b border-border bg-background"
    >
      <AzulejoPattern
        id="visit-azulejo"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full text-azulejo/10"
        tile={64}
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl leading-tight text-foreground sm:text-4xl">
            {t.visit.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.visit.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6">
            <MapPin className="size-5 text-azulejo" aria-hidden="true" />
            <h3 className="mt-4 font-heading text-lg text-foreground">
              {t.visit.addressTitle}
            </h3>
            <address className="mt-3 text-sm not-italic leading-relaxed text-muted-foreground">
              {site.address.street}
              <br />
              {site.address.locality}
              <br />
              {site.address.postalCode} {site.address.city},{" "}
              {site.address.countryName}
            </address>
            <p className="mt-4 text-xs text-muted-foreground">
              {t.visit.plusCodeLabel}:{" "}
              <span className="font-mono">{site.address.plusCode}</span>
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <Clock className="size-5 text-azulejo" aria-hidden="true" />
            <h3 className="mt-4 font-heading text-lg text-foreground">
              {t.visit.hoursTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t.visit.hoursValue}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <MessageSquare className="size-5 text-azulejo" aria-hidden="true" />
            <h3 className="mt-4 font-heading text-lg text-foreground">
              {t.visit.phoneTitle}
            </h3>
            {site.phone && !site.phoneIsPlaceholder ? (
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="mt-3 inline-block rounded-sm text-sm font-medium text-azulejo underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {site.phone}
              </a>
            ) : (
              <p className="mt-3 text-sm font-medium text-foreground">
                {site.phone}
              </p>
            )}
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t.visit.phoneMissing}
            </p>
          </div>
        </div>

        <a
          href={site.maps.directions}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-azulejo px-7 text-sm font-semibold uppercase tracking-wider text-azulejo-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Navigation className="size-4" />
          {t.visit.directionsCta}
        </a>
      </div>
    </section>
  );
}
