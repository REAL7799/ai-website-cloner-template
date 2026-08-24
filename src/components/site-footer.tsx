import { ExternalLink, MapPin, Phone } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="bg-espresso text-espresso-foreground">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-heading text-3xl font-semibold">{siteConfig.name}</p>
            <p className="mt-1 text-[10px] tracking-[0.35em] text-gold-soft uppercase">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-espresso-foreground/60">
              O seu cantinho de beleza e bem-estar no coração de Fátima.
            </p>
          </div>

          <div>
            <p className="text-xs tracking-[0.25em] text-espresso-foreground/70 uppercase">
              Navegação
            </p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-gold-soft"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.25em] text-espresso-foreground/70 uppercase">
              Contactos
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex items-center gap-2 transition-colors hover:text-gold-soft"
                >
                  <Phone className="size-4" aria-hidden />
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4" aria-hidden />
                {siteConfig.location.city} — {siteConfig.location.region}
              </li>
              <li>
                <a
                  href={siteConfig.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-gold-soft"
                >
                  <ExternalLink className="size-4" aria-hidden />
                  Google Maps
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-espresso-foreground/10 pt-6 text-xs text-espresso-foreground/70 sm:flex-row">
          <span>
            © {new Date().getFullYear()} {siteConfig.name} — {siteConfig.tagline}
          </span>
          <span>Fátima · Ourém · Portugal</span>
        </div>
      </div>
    </footer>
  );
}
