import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { testimonials } from "@/lib/products";

export function TestimonialsSection() {
  return (
    <section className="border-y border-border bg-card py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="O que dizem de nós"
          title="Clientas felizes, sempre"
          description="A confiança de quem já encomendou é o nosso melhor cartão de visita."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex flex-col rounded-3xl border border-border bg-background p-6"
            >
              <Quote className="size-7 text-gold/70" aria-hidden="true" />
              <div
                className="mt-4 flex gap-0.5"
                role="img"
                aria-label="Avaliação de 5 estrelas"
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="size-4 fill-gold text-gold"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="mt-4 grow text-sm leading-relaxed text-muted-foreground">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <p className="text-sm font-semibold">{testimonial.name}</p>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {testimonial.city}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
