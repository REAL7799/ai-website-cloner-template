import Image from "next/image";
import { MapPin } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { CONTACT, NAV_LINKS } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-blush">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.2fr_0.8fr_1fr] md:gap-8 md:px-6 md:py-16">
        <div>
          <a href="#inicio" className="flex items-center gap-3">
            <Image
              src="/images/logo-kitty-flowers.png"
              alt="Logo Kitty Flowers"
              width={48}
              height={48}
              className="size-12 rounded-full shadow-sm"
            />
            <span className="font-display text-xl font-semibold tracking-tight text-rose-deep">
              Kitty Flowers
            </span>
          </a>
          <p className="mt-4 max-w-xs font-script text-2xl leading-tight text-primary">
            Delicadeza em forma de flores.
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Buquês de rosas eternas personalizados, feitos à mão com amor em
            Lisboa. Encomendas por DM ou WhatsApp.
          </p>
        </div>

        <nav aria-label="Navegação do rodapé">
          <h3 className="text-xs font-semibold tracking-[0.2em] text-rose-deep uppercase">
            Navegação
          </h3>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.2em] text-rose-deep uppercase">
            Contactos
          </h3>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <WhatsAppIcon className="size-4 shrink-0 text-primary" />
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <InstagramIcon className="size-4 shrink-0 text-primary" />
                {CONTACT.instagramHandle}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <FacebookIcon className="size-4 shrink-0 text-primary" />
                {CONTACT.facebookName}
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5 text-sm text-muted-foreground">
              <MapPin className="size-4 shrink-0 text-primary" />
              {CONTACT.location}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-center text-xs text-muted-foreground md:flex-row md:px-6 md:text-left">
          <p>
            © {new Date().getFullYear()} Kitty Flowers. Todos os direitos
            reservados.
          </p>
          <p>Feito com ♥ em Lisboa — Prior Velho.</p>
        </div>
      </div>
    </footer>
  );
}
