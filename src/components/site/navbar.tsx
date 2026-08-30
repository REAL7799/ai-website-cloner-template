"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { CONTACT, NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-background/85 shadow-[0_8px_30px_-12px_oklch(0.62_0.17_3/0.25)] backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-[4.5rem] md:px-6"
      >
        <a href="#inicio" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo-kitty-flowers.png"
            alt="Logo Kitty Flowers"
            width={44}
            height={44}
            className="size-10 rounded-full shadow-sm md:size-11"
          />
          <span className="font-display text-lg font-semibold tracking-tight text-rose-deep md:text-xl">
            Kitty Flowers
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_25px_-10px_oklch(0.55_0.15_150/0.7)] transition-all hover:scale-[1.03] hover:bg-whatsapp-dark lg:inline-flex"
          >
            <WhatsAppIcon className="size-4" />
            Encomendar
          </a>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <div
        id="menu-mobile"
        hidden={!open}
        className="border-t border-border/60 bg-background/95 backdrop-blur-md lg:hidden"
      >
        <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-sm font-semibold text-white"
            >
              <WhatsAppIcon className="size-4" />
              Encomendar no WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
