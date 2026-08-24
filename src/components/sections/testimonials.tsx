import { Star } from "lucide-react";
import { testimonials } from "@/lib/site-config";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="relative overflow-hidden bg-espresso py-20 text-espresso-foreground md:py-28"
    >
      {/* Depoimentos de exemplo — substituir por avaliações reais do Google */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
      />
      <div className="relative mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading
          tone="dark"
          eyebrow="Depoimentos"
          title="O que dizem as nossas clientes"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 120}>
              <div className="flex h-full flex-col rounded-3xl border border-gold-soft/15 bg-espresso-foreground/5 p-8">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }, (_, star) => (
                    <Star key={star} className="size-4 fill-gold text-gold" aria-hidden />
                  ))}
                  <span className="sr-only">5 estrelas</span>
                </div>
                <blockquote className="mt-5 flex-1 font-heading text-xl italic leading-relaxed">
                  «{testimonial.quote}»
                </blockquote>
                <footer className="mt-6">
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.2em] text-espresso-foreground/60">
                    {testimonial.service}
                  </p>
                </footer>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
