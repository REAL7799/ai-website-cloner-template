import { Clock, MapPin, Navigation, Phone } from "lucide-react";

import { AzulejoPattern } from "@/components/azulejo";
import { getDictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import type { Locale } from "@/types/menu";

export function Visit({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const phoneIsReal = Boolean(site.phone) && !site.phoneIsPlaceholder;

  const cards = [
    {
      icon: MapPin,
      title: t.visit.addressTitle,
      lines: [
        site.address.street,
        site.address.locality,
        `${site.address.postalCode} ${site.address.city}`,
      ],
      foot: `${t.visit.plusCodeLabel}: ${site.address.plusCode}`,
    },
    {
      icon: Clock,
      title: t.visit.hoursTitle,
      lines: [t.visit.hoursValue],
      foot: t.visit.hoursFoot,
    },
    {
      icon: Phone,
      title: t.visit.phoneTitle,
      lines: [site.phone],
      foot: t.visit.phoneMissing,
    },
  ];

  return (
    <section
      id="visitar"
      className="on-ink relative isolate scroll-mt-20 overflow-hidden"
    >
      <AzulejoPattern
        id="visit-azulejo"
        className="pointer-events-none absolute inset-0 size-full text-label/18"
        tile={110}
      />

      <div className="relative mx-auto w-full max-w-[110rem] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.4em] text-label">
          {t.visit.eyebrow}
        </p>
        <h2 className="shout mt-5 max-w-4xl text-[clamp(2.6rem,8.5vw,7rem)] text-cream">
          {t.visit.title}
        </h2>
        <p className="mt-7 max-w-lg text-base text-cream/70 sm:text-lg">
          {t.visit.subtitle}
        </p>

        <dl className="mt-16 grid gap-px border-t border-cream/15 md:grid-cols-3">
          {cards.map(({ icon: Icon, title, lines, foot }) => (
            <div key={title} className="border-b border-cream/15 py-8 md:pr-10">
              <Icon className="size-6 text-label" aria-hidden="true" />
              <dt className="mt-5 text-[0.6rem] font-bold uppercase tracking-[0.3em] text-cream/45">
                {title}
              </dt>
              <dd className="mt-3">
                {lines.map((line) => (
                  <span
                    key={line}
                    className="block font-heading text-xl leading-snug text-cream"
                  >
                    {line}
                  </span>
                ))}
                {foot ? (
                  <span className="mt-3 block text-sm text-cream/55">
                    {foot}
                  </span>
                ) : null}
                {title === t.visit.phoneTitle && phoneIsReal && site.phone ? (
                  <a
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    className="mt-3 inline-block text-sm font-semibold text-label underline-offset-4 hover:underline"
                  >
                    {site.phone}
                  </a>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>

        <a
          href={site.maps.directions}
          target="_blank"
          rel="noreferrer"
          className="mt-12 inline-flex h-16 items-center gap-4 bg-cta px-10 text-sm font-bold uppercase tracking-[0.2em] text-cta-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <Navigation className="size-5" />
          {t.visit.directionsCta}
        </a>
      </div>
    </section>
  );
}
