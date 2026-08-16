"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { getDictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types/menu";

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: `/${locale}/menu`, label: t.nav.menu },
    { href: `/${locale}#historia`, label: t.nav.story },
    { href: `/${locale}#visitar`, label: t.nav.visit },
  ];

  const otherLocale: Locale = locale === "pt" ? "en" : "pt";
  const switchHref = pathname
    ? pathname.replace(/^\/(pt|en)/, `/${otherLocale}`)
    : `/${otherLocale}`;

  return (
    <header className="on-ink sticky top-0 z-50 border-b border-cream/15">
      <div className="mx-auto flex h-16 w-full max-w-[110rem] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <Link
          href={`/${locale}`}
          className="font-script text-2xl text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:text-[1.7rem]"
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-bold uppercase tracking-[0.22em] text-cream/70 transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              {link.label}
            </Link>
          ))}
          <LocaleLink
            href={switchHref}
            locale={otherLocale}
            label={t.localeSwitchLabel}
          />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LocaleLink
            href={switchHref}
            locale={otherLocale}
            label={t.localeSwitchLabel}
          />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="p-2 text-cream transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        className={cn(
          "border-t border-cream/15 md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <ul className="mx-auto w-full max-w-[110rem] px-5 py-3 sm:px-8">
          {links.map((link) => (
            <li key={link.href} className="border-b border-cream/10 last:border-0">
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="shout block py-4 text-3xl text-cream transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function LocaleLink({
  href,
  locale,
  label,
}: {
  href: string;
  locale: Locale;
  label: string;
}) {
  return (
    <Link
      href={href}
      hrefLang={locale}
      className="border border-cream/30 px-2.5 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-cream/70 transition-colors hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      {locale.toUpperCase()}
      <span className="sr-only"> — {label}</span>
    </Link>
  );
}
