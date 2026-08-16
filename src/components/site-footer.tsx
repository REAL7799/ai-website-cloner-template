import Link from "next/link";
import { MapPin } from "lucide-react";

import { Wordmark } from "@/components/wordmark";
import { getDictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import type { Locale } from "@/types/menu";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  // Página estática: o ano fixa-se no momento do build, o que é aceitável aqui.
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-cream">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <Wordmark
            className="text-3xl text-foreground"
            withSince
            sinceLabel={
              locale === "pt" ? `desde ${site.since}` : `since ${site.since}`
            }
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {t.footer.tagline}
          </p>
        </div>

        <div className="text-sm">
          <h2 className="font-heading text-base text-foreground">
            {t.visit.addressTitle}
          </h2>
          <address className="mt-3 not-italic leading-relaxed text-muted-foreground">
            {site.address.street}
            <br />
            {site.address.locality}
            <br />
            {site.address.postalCode} {site.address.city}
          </address>
          <a
            href={site.maps.directions}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 rounded-sm font-medium text-azulejo underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <MapPin className="size-4" />
            {t.visit.directionsCta}
          </a>
        </div>

        <div className="text-sm">
          <h2 className="font-heading text-base text-foreground">
            {t.visit.hoursTitle}
          </h2>
          <p className="mt-3 text-muted-foreground">{t.visit.hoursValue}</p>
          <ul className="mt-5 space-y-1.5 text-muted-foreground">
            {t.menu.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {year} {site.name}. {t.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link
              href={`/${locale === "pt" ? "en" : "pt"}`}
              className="rounded-sm underline-offset-4 hover:text-foreground hover:underline"
            >
              {t.localeSwitchLabel}
            </Link>
            <a
              href="https://www.livroreclamacoes.pt/"
              target="_blank"
              rel="noreferrer"
              className="rounded-sm underline-offset-4 hover:text-foreground hover:underline"
            >
              {t.footer.complaintsBook}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
