"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, siteConfig } from "@/lib/site-config";

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium tracking-wide text-primary-foreground transition-all duration-300 hover:bg-emerald hover:shadow-xl hover:shadow-emerald/20";

function Wordmark() {
  return (
    <span className="flex items-center gap-3">
      <Image
        src="/images/logo-emblema.webp"
        alt=""
        width={44}
        height={44}
        className="size-9 rounded-lg md:size-10"
        aria-hidden
      />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-2xl font-semibold tracking-wide md:text-3xl">
          {siteConfig.name}
        </span>
        <span className="mt-1 hidden text-[10px] tracking-[0.35em] text-gold-text uppercase sm:block">
          {siteConfig.tagline}
        </span>
      </span>
    </span>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const openButton = openButtonRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
      openButton?.focus();
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border/70 bg-background/90 shadow-sm backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
          <Link href="#inicio" aria-label="Annelux — voltar ao início">
            <Wordmark />
          </Link>

          <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide transition-colors hover:text-gold-text"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(primaryButton, "hidden lg:inline-flex")}
            >
              Marcar agora
            </a>
            <button
              ref={openButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              className="inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-gold/10 lg:hidden"
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          className="fixed inset-0 z-[60] flex flex-col bg-background lg:hidden"
        >
          <div className="mx-auto flex h-16 w-full max-w-6xl shrink-0 items-center justify-between px-5 md:h-20 md:px-8">
            <Link href="#inicio" aria-label="Annelux — voltar ao início" onClick={closeMenu}>
              <Wordmark />
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeMenu}
              aria-label="Fechar menu"
              className="inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-gold/10"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <nav
            aria-label="Navegação móvel"
            className="flex flex-1 flex-col justify-center gap-7 px-5 md:px-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="font-heading text-4xl font-medium transition-colors hover:text-gold-text"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="shrink-0 px-5 pb-10 md:px-8">
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className={cn(primaryButton, "w-full px-7 py-3.5")}
            >
              Marcar agora
            </a>
          </div>
        </div>
      )}
    </>
  );
}
