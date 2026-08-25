import { Quote } from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section className="border-y border-border/60 bg-card/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Quem já provou"
          title="As festas dos nossos clientes falam por nós"
        />
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <Reveal
              as="li"
              key={testimonial.author}
              delay={i * 120}
              className="flex h-full flex-col rounded-3xl border border-border/70 bg-background p-7 shadow-sm"
            >
              <Quote aria-hidden="true" className="size-7 text-primary/40" />
              <blockquote className="mt-4 flex-1 leading-relaxed text-pretty">
                “{testimonial.quote}”
              </blockquote>
              <footer className="mt-6 border-t border-border/60 pt-4">
                <p className="font-heading font-semibold">
                  {testimonial.author}
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {testimonial.context}
                </p>
              </footer>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
