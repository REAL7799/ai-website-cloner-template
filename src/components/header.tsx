"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const navLinks = [{ label: "Sabores", href: "#sabores" }];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-10">
        <a
          href="#top"
          className="font-heading text-2xl tracking-wide text-white uppercase"
        >
          Pedras
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button
          size="sm"
          className="hidden rounded-full bg-white px-5 text-neutral-900 hover:bg-white/90 md:inline-flex"
        >
          Onde Comprar
        </Button>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="text-white md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/10 bg-black/80 px-6 py-4 backdrop-blur-md md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 text-base font-medium text-white/90"
            >
              {link.label}
            </a>
          ))}
          <Button
            size="sm"
            className="mt-2 w-full rounded-full bg-white text-neutral-900 hover:bg-white/90"
          >
            Onde Comprar
          </Button>
        </nav>
      )}
    </header>
  );
}
