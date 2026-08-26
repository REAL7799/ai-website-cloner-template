const words = [
  "Bolos de autor",
  "Tartes",
  "Pastéis de nata",
  "Doces finos",
  "Feito à mão",
  "Todos os dias",
];

function Sequence() {
  return (
    <>
      {words.map((word) => (
        <span key={word} className="mx-6 inline-flex items-center gap-6">
          <span className="font-heading text-2xl font-medium tracking-wide text-foreground/90 italic sm:text-3xl">
            {word}
          </span>
          <span aria-hidden="true" className="text-primary">
            ✦
          </span>
        </span>
      ))}
    </>
  );
}

export function Marquee() {
  return (
    <section
      aria-label={words.join(", ")}
      className="overflow-hidden border-y border-border/70 bg-background py-5"
    >
      <div aria-hidden="true" className="animate-marquee flex w-max whitespace-nowrap">
        <Sequence />
        <Sequence />
      </div>
    </section>
  );
}
