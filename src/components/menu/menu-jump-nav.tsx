import { menu } from "@/content/menu";
import { getDictionary } from "@/content/dictionary";
import type { Locale } from "@/types/menu";

export function MenuJumpNav({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <nav aria-label={t.menu.jumpLabel} className="border-y border-border bg-cream">
      <div className="mx-auto w-full max-w-4xl px-5 py-4 sm:px-8">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          {t.menu.jumpLabel}
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
          {menu.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="inline-block rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {section[locale]}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#alergenios"
              className="inline-block rounded-full border border-azulejo/30 bg-azulejo/[0.07] px-3.5 py-1.5 text-xs font-medium text-azulejo transition-colors hover:border-azulejo/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {t.menu.allergensTitle}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
