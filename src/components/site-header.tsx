"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Truck, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { siteConfig, whatsappLink } from "@/lib/site";

const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#colecoes", label: "Coleções" },
  { href: "#mais-vendidos", label: "Mais Vendidos" },
  { href: "#novidades", label: "Novidades" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contacto", label: "Contacto" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-[11px] font-medium uppercase tracking-[0.18em] sm:text-xs">
          <Truck className="size-3.5 shrink-0" aria-hidden="true" />
          <span>
            Entregas em todo Moçambique
            <span className="hidden sm:inline">
              {" "}
              · Encomendas rápidas pelo WhatsApp
            </span>
          </span>
        </div>
      </div>

      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="#inicio"
            className="flex items-center gap-3"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/images/logo.jpg"
              alt={`Logótipo ${siteConfig.name}`}
              width={48}
              height={48}
              className="size-11 rounded-full border border-gold/30 object-cover shadow-sm"
              priority
            />
            <span className="leading-tight">
              <span className="block font-serif text-xl font-semibold tracking-tight">
                {siteConfig.name}
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.32em] text-gold">
                {siteConfig.tagline}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Menu principal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink(
                "Olá Clóset Dayana! 👗 Gostaria de fazer uma encomenda.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-whatsapp-dark sm:inline-flex"
            >
              <WhatsAppIcon className="size-4" />
              Encomendar
            </a>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground lg:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav
            className="border-t border-border bg-background lg:hidden"
            aria-label="Menu móvel"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={whatsappLink(
                  "Olá Clóset Dayana! 👗 Gostaria de fazer uma encomenda.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-sm font-semibold text-white"
              >
                <WhatsAppIcon className="size-4" />
                Encomendar pelo WhatsApp
              </a>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
