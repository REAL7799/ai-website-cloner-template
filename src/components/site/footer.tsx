import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { defaultOrderMessage, site, whatsappLink } from "@/lib/site";

const footerLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#vitrine", label: "Vitrine" },
  { href: "#sobre", label: "Sobre" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "FAQ" },
  { href: "#contactos", label: "Contactos" },
];

export function Footer() {
  return (
    <footer className="bg-[oklch(0.24_0.04_260)] text-[oklch(0.9_0.01_250)]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div className="max-w-xs">
            <p className="font-handwriting text-4xl text-[oklch(0.82_0.08_250)]">
              Fátima Cake
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[oklch(0.72_0.02_254)]">
              {site.slogan}. Bolos de aniversário, casamento e tartes
              tradicionais, por encomenda.
            </p>
          </div>

          <nav aria-label="Links do rodapé">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-end">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[oklch(0.72_0.02_254)] transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-center gap-3 md:justify-end">
              <a
                href={whatsappLink(defaultOrderMessage)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da Fátima Cake"
                className="flex size-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary"
              >
                <WhatsAppIcon className="size-4" />
              </a>
              <a
                href={`https://instagram.com/${site.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Fátima Cake"
                className="flex size-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href={`https://facebook.com/${site.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook da Fátima Cake"
                className="flex size-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary"
              >
                <FacebookIcon className="size-4" />
              </a>
            </div>
          </nav>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-[oklch(0.6_0.02_254)]">
            © {new Date().getFullYear()} {site.name} — feito à mão, com amor e
            açúcar. {site.address.street}, {site.address.city}
          </p>
        </div>
      </div>
    </footer>
  );
}
