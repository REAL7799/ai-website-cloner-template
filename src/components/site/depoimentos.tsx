"use client";

import { Star } from "lucide-react";
import { Sprinkles } from "@/components/site/sprinkles";
import { useSectionReveal } from "@/hooks/use-section-reveal";

const depoimentos = [
  {
    quote:
      "O bolo de casamento superou tudo o que imaginámos. Os convidados ainda falam dele — lindo por fora, divinal por dentro!",
    name: "Mariana S.",
    detail: "Bolo de Casamento Elegance",
  },
  {
    quote:
      "Encomendei pelo WhatsApp de manhã e à tarde tinha o bolo de aniversário da minha filha, fresquinho e perfeito. Serviço impecável.",
    name: "João P.",
    detail: "Bolo Aniversário Azul Céu",
  },
  {
    quote:
      "A tarte de amêndoa é a melhor que já comi — e sou do Algarve! Sabe-se que é tudo feito à mão, com ingredientes a sério.",
    name: "Carla M.",
    detail: "Tarte de Amêndoa",
  },
];

export function Depoimentos() {
  const sectionRef = useSectionReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="depoimentos"
      aria-label="Depoimentos de clientes"
      className="relative bg-background pb-24 pt-24"
    >
      <Sprinkles />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p data-reveal className="font-handwriting text-3xl text-primary">
            palavras doces
          </p>
          <h2
            data-reveal
            className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Quem provou, recomenda
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {depoimentos.map((dep) => (
            <figure
              key={dep.name}
              data-reveal
              className="flex flex-col rounded-3xl border border-border/70 bg-card p-7 shadow-sm"
            >
              <p className="sr-only">Avaliação: 5 de 5 estrelas</p>
              <div aria-hidden="true" className="flex gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                “{dep.quote}”
              </blockquote>
              <figcaption className="mt-5 border-t border-border/60 pt-4">
                <p className="font-handwriting text-2xl leading-none text-primary">
                  {dep.name}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {dep.detail}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
