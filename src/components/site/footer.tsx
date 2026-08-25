import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import {
  FacebookIcon,
  InstagramIcon,
  LogoMark,
  WhatsAppIcon,
} from "@/components/icons";
import { defaultOrderMessage, siteConfig, whatsappLink } from "@/lib/site-config";

const footerNav = [
  { href: "/doces", label: "A Nossa Doçaria" },
  { href: "/sobre", label: "Sobre Nós" },
  { href: "/encomendas", label: "Encomendas" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-secondary/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark />
            <span className="font-heading text-xl font-semibold">
              {siteConfig.name}
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {siteConfig.description}
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram da Doce Alma"
              className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground/70 transition-colors hover:border-primary hover:text-primary"
            >
              <InstagramIcon />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook da Doce Alma"
              className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground/70 transition-colors hover:border-primary hover:text-primary"
            >
              <FacebookIcon />
            </a>
            <a
              href={whatsappLink(defaultOrderMessage)}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp da Doce Alma"
              className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground/70 transition-colors hover:border-primary hover:text-primary"
            >
              <WhatsAppIcon />
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-heading text-base font-semibold">Visite-nos</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                {siteConfig.address.street}
                <br />
                {siteConfig.address.postalCode} {siteConfig.address.city}
              </span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="transition-colors hover:text-foreground"
              >
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
              <a
                href={`mailto:${siteConfig.email}`}
                className="transition-colors hover:text-foreground"
              >
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-base font-semibold">Horário</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {siteConfig.hours.map((slot) => (
              <li key={slot.days} className="flex items-start gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>
                  <span className="font-medium text-foreground/80">
                    {slot.days}:
                  </span>{" "}
                  {slot.time}
                </span>
              </li>
            ))}
          </ul>
          <nav aria-label="Rodapé" className="mt-6">
            <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="border-t border-border/60">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} {siteConfig.legalName}. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
