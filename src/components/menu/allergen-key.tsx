import { allergens } from "@/content/menu";
import { getDictionary } from "@/content/dictionary";
import type { Locale } from "@/types/menu";

export function AllergenKey({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section id="alergenios" className="scroll-mt-28 rounded-lg border border-border bg-card p-7 sm:p-9">
      <h2 className="text-xl uppercase tracking-[0.12em] text-foreground sm:text-2xl">
        {t.menu.allergensTitle}
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        {t.menu.allergensSubtitle}
      </p>

      <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
        {allergens.map((allergen) => (
          <li key={allergen.code} className="flex items-start gap-3 text-sm">
            <span
              aria-hidden="true"
              className="mt-px flex size-6 shrink-0 items-center justify-center rounded-full border border-label/40 bg-label/10 text-[0.68rem] font-semibold tabular-nums text-label"
            >
              {allergen.code}
            </span>
            <span className="leading-relaxed text-foreground">
              <span className="sr-only">{allergen.code}. </span>
              {allergen[locale]}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
