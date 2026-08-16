"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { Wordmark } from "@/components/wordmark";
import { getDictionary } from "@/content/dictionary";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types/menu";

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: `/${locale}`, label: t.nav.home },
    { href: `/${locale}/menu`, label: t.nav.menu },
    { href: `/${locale}#historia`, label: t.nav.story },
    { href: `/${locale}#visitar`, label: t.nav.visit },
  ];

  const otherLocale: Locale = locale === "pt" ? "en" : "pt";
  const switchHref = pathname
    ? pathname.replace(/^\/(pt|en)/, `/${otherLocale}`)
    : `/${otherLocale}`;

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:h-20 sm:px-8">
        <Link
          href={`/${locale}`}
          className="rounded-sm text-2xl text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:text-3xl"
        >
          <Wordmark />
          <span className="sr-only">{t.nav.home}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
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

        <div className="flex items-center gap-1 md:hidden">
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
            className="rounded-md p-2 text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-t border-border/70 bg-background md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <ul className="mx-auto flex w-full max-w-6xl flex-col px-5 py-2 sm:px-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
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
      className="ml-1 rounded-md border border-border px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {locale.toUpperCase()}
      <span className="sr-only"> — {label}</span>
    </Link>
  );
}
