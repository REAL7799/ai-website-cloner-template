import Image from "next/image";
import { Clock, Mail, MapPin } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { siteConfig, whatsappLink } from "@/lib/site";

const shopLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#colecoes", label: "Coleções" },
  { href: "#mais-vendidos", label: "Mais Vendidos" },
  { href: "#novidades", label: "Novidades" },
  { href: "#sobre", label: "Sobre nós" },
];

const helpLinks = [
  { href: "#como-comprar", label: "Como encomendar" },
  { href: "#como-comprar", label: "Entregas 24–72h" },
  { href: "#como-comprar", label: "Trocas em até 48h" },
  { href: "#como-comprar", label: "M-Pesa · e-Mola · Numerário" },
];

const socialLinks = [
  {
    href: siteConfig.social.facebook,
    label: "Facebook da Clóset Dayana",
    icon: FacebookIcon,
  },
  {
    href: siteConfig.social.instagram,
    label: "Instagram da Clóset Dayana",
    icon: InstagramIcon,
  },
  {
    href: siteConfig.social.tiktok,
    label: "TikTok da Clóset Dayana",
    icon: TikTokIcon,
  },
];

export function SiteFooter() {
  return (
    <footer id="contacto" className="scroll-mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_0.8fr_1fr_1.1fr] lg:gap-8 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.jpg"
              alt={`Logótipo ${siteConfig.name}`}
              width={56}
              height={56}
              className="size-14 rounded-full border-2 border-gold/40 object-cover"
            />
            <p className="leading-tight">
              <span className="block font-serif text-2xl font-semibold">
                {siteConfig.name}
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.32em] text-gold">
                {siteConfig.tagline}
              </span>
            </p>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
            Moda feminina com elegância e preço justo. Encomende pelo WhatsApp
            e receba em qualquer ponto de Moçambique.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <social.icon className="size-6" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Links da loja">
          <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            Loja
          </h3>
          <ul className="mt-5 space-y-3">
            {shopLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-primary-foreground/75 hover:text-primary-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Apoio ao cliente">
          <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            Apoio ao Cliente
          </h3>
          <ul className="mt-5 space-y-3">
            {helpLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-primary-foreground/75 hover:text-primary-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            Contactos
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-primary-foreground/75">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              {siteConfig.address}
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-primary-foreground"
              >
                <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-gold" />
                {siteConfig.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-start gap-3 hover:text-primary-foreground"
              >
                <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              {siteConfig.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-center text-xs text-primary-foreground/60 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {siteConfig.name} — {siteConfig.tagline}
            . Todos os direitos reservados.
          </p>
          <p>Loja online · Encomendas via WhatsApp</p>
        </div>
      </div>
    </footer>
  );
}
