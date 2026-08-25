import { CalendarDays, Heart, Leaf, Wheat } from "lucide-react";

import { Reveal } from "@/components/site/reveal";

const features = [
  {
    icon: Wheat,
    title: "Ingredientes locais",
    description: "Manteiga, ovos e fruta de produtores portugueses.",
  },
  {
    icon: Heart,
    title: "Feito à mão",
    description: "Massa estendida de madrugada, sem pré-misturas.",
  },
  {
    icon: CalendarDays,
    title: "Encomendas por medida",
    description: "Bolos desenhados consigo para cada ocasião.",
  },
  {
    icon: Leaf,
    title: "Fresco todos os dias",
    description: "O que não se vende ao dia não volta à vitrine.",
  },
];

export function FeatureStrip() {
  return (
    <section aria-label="Porquê a Doce Alma" className="border-y border-border/60 bg-card/60">
      <ul className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {features.map((feature, i) => (
          <Reveal as="li" key={feature.title} delay={i * 90} className="flex gap-3.5">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
              <feature.icon className="size-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-heading font-semibold">
                {feature.title}
              </span>
              <span className="mt-1 block text-sm leading-snug text-muted-foreground">
                {feature.description}
              </span>
            </span>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
