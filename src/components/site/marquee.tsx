import { PetalIcon } from "@/components/icons";

const WORDS = [
  "Rosas Eternas",
  "Feitas à Mão",
  "Buquês Personalizados",
  "Caixas com Chocolates",
  "Entregas em Lisboa",
] as const;

function MarqueeContent() {
  return (
    <>
      {WORDS.map((word) => (
        <span key={word} className="flex items-center gap-8 md:gap-12">
          <span className="font-display text-lg font-medium tracking-wide whitespace-nowrap text-rose-deep/80 md:text-xl">
            {word}
          </span>
          <PetalIcon aria-hidden="true" className="size-3 shrink-0 text-primary/60" />
        </span>
      ))}
    </>
  );
}

export function Marquee() {
  return (
    <div className="kf-marquee overflow-hidden border-y border-primary/10 bg-card/60 py-4 md:py-5">
      <div className="kf-marquee-track flex w-max items-center gap-8 md:gap-12">
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </div>
  );
}
