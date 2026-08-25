import Link from "next/link";

import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { buttonVariants } from "@/components/ui/button-variants";
import { orderSteps } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Steps() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Encomendar é simples"
          title="Do primeiro contacto à mesa da festa"
          lead="Três passos, sem complicações. Nós tratamos do resto — incluindo a montagem no local para bolos de festa."
        />
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {orderSteps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 120}
              className="relative rounded-3xl border border-border/70 bg-card p-7 shadow-sm"
            >
              <span
                aria-hidden="true"
                className="font-heading text-5xl font-semibold text-primary/20"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-heading text-xl font-semibold">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </Reveal>
          ))}
        </ol>
        <div className="mt-12 text-center">
          <Link
            href="/encomendas"
            className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full px-7 text-base")}
          >
            Começar a minha encomenda
          </Link>
        </div>
      </div>
    </section>
  );
}
