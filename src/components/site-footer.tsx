import Link from "next/link";

import { getDictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import type { Locale } from "@/types/menu";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  // Página estática: o ano fixa-se no momento do build, o que é aceitável aqui.
  const year = new Date().getFullYear();

  return (
    <footer className="on-ink border-t border-cream/15">
      <div className="mx-auto w-full max-w-[110rem] px-5 py-16 sm:px-8 lg:px-12">
        <p className="font-script text-[clamp(3rem,12vw,9rem)] leading-none text-cream">
          {site.name}
        </p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/60">
          {t.footer.tagline}
        </p>

        <div className="mt-14 grid gap-10 border-t border-cream/15 pt-10 sm:grid-cols-3">
          <div>
            <h2 className="text-[0.58rem] font-bold uppercase tracking-[0.3em] text-label">
              {t.visit.addressTitle}
            </h2>
            <address className="mt-3 text-sm not-italic leading-relaxed text-cream/75">
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
              className="mt-3 inline-block text-sm font-semibold text-label underline-offset-4 hover:underline"
            >
              {t.visit.directionsCta}
            </a>
          </div>

          <div>
            <h2 className="text-[0.58rem] font-bold uppercase tracking-[0.3em] text-label">
              {t.visit.hoursTitle}
            </h2>
            <p className="mt-3 text-sm text-cream/75">{t.visit.hoursValue}</p>
          </div>

          <div>
            <h2 className="text-[0.58rem] font-bold uppercase tracking-[0.3em] text-label">
              {t.menu.notesTitle}
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm text-cream/75">
              {t.menu.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="mx-auto flex w-full max-w-[110rem] flex-col gap-3 px-5 py-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>
            © {year} {site.name}. {t.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href={`/${locale === "pt" ? "en" : "pt"}`}
              className="underline-offset-4 hover:text-label hover:underline"
            >
              {t.localeSwitchLabel}
            </Link>
            <a
              href="https://www.livroreclamacoes.pt/"
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:text-label hover:underline"
            >
              {t.footer.complaintsBook}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
