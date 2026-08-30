import { PetalIcon } from "@/components/icons";

const WORDS = [
  "Rosas Eternas",
  "Feitas à Mão",
  "Buquês Personalizados",
  "Caixas com Chocolates",
  "Entregas em Lisboa",
] as const;

function MarqueeCopy() {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12">
      {[...WORDS, ...WORDS].map((word, i) => (
        <span key={i} className="flex items-center gap-8 md:gap-12">
          <span className="font-display text-lg font-medium tracking-wide whitespace-nowrap text-rose-deep/80 md:text-xl">
            {word}
          </span>
          <PetalIcon aria-hidden="true" className="size-3 shrink-0 text-primary/60" />
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="kf-marquee overflow-hidden border-y border-primary/10 bg-card/60 py-4 md:py-5">
      <p className="sr-only">{WORDS.join(" · ")}</p>
      <div aria-hidden="true" className="kf-marquee-track flex w-max">
        <MarqueeCopy />
        <MarqueeCopy />
      </div>
    </div>
  );
}
