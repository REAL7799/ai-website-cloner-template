"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { defaultOrderMessage, whatsappLink } from "@/lib/site";

const links = [
  { href: "#inicio", label: "Início" },
  { href: "#vitrine", label: "Vitrine" },
  { href: "#sobre", label: "Sobre" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contactos", label: "Contactos" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-background/90 shadow-sm shadow-primary/5 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <a
          href="#inicio"
          className="font-handwriting text-3xl font-bold text-primary"
        >
          Fátima Cake
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button
            size="sm"
            className="rounded-full px-4"
            render={
              <a
                href={whatsappLink(defaultOrderMessage)}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <WhatsAppIcon className="size-4" />
            Encomendar
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <div
        id="menu-mobile"
        className={cn(
          "overflow-hidden border-b border-border/60 bg-background/95 backdrop-blur-md transition-all duration-300 md:hidden",
          open
            ? "visible max-h-96 opacity-100"
            : "invisible max-h-0 border-b-0 opacity-0",
        )}
      >
        <ul className="space-y-1 px-4 pb-4 pt-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block rounded-lg px-3 py-2 text-base font-medium text-foreground/80 hover:bg-secondary hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <Button
              className="w-full rounded-full"
              render={
                <a
                  href={whatsappLink(defaultOrderMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <WhatsAppIcon className="size-4" />
              Encomendar no WhatsApp
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
