import { getSection } from "@/lib/menu";
import type { Locale } from "@/types/menu";

/**
 * Faixa vermelha com os pratos da casa a correr. Duplicamos a lista e
 * animamos até -50% para o ciclo fechar sem salto.
 */
export function Marquee({ locale }: { locale: Locale }) {
  const words = ["pratos-tradicionais", "pratos-combinados", "sandes"]
    .flatMap((id) => getSection(id)?.items.slice(0, 6) ?? [])
    .map((item) => item[locale]);

  return (
    <div
      aria-hidden="true"
      className="flex overflow-hidden border-y-2 border-ink bg-ink py-3.5 select-none"
    >
      <div className="marquee-track flex shrink-0 items-center gap-8 pr-8">
        {[...words, ...words].map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="flex shrink-0 items-center gap-8 text-sm font-bold uppercase tracking-[0.22em] text-cream sm:text-base"
          >
            {word}
            <span className="text-label">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
