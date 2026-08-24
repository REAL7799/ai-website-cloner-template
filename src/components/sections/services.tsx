import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { services, siteConfig } from "@/lib/site-config";

export function Services() {
  return (
    <section id="servicos" className="bg-secondary/50 py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Serviços"
          title="Rituais de beleza à sua medida"
          subtitle="Do clássico verniz gel ao olhar de sonho — cuidamos de cada detalhe, num só lugar."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={(index % 3) * 120}>
              <article className="group h-full overflow-hidden rounded-3xl border border-border/70 bg-card transition-all duration-500 hover:border-gold/50 hover:shadow-xl hover:shadow-gold/10">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 md:p-7">
                  <h3 className="font-heading text-2xl font-medium">{service.title}</h3>
                  <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {service.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-center gap-2 text-xs tracking-wide text-foreground/80"
                      >
                        <Check className="size-3.5 shrink-0 text-gold" aria-hidden />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 text-center">
          <p className="text-muted-foreground">
            Tem alguma questão ou um pedido especial? Fale connosco — teremos todo o gosto em
            ajudar.
          </p>
          <div className="mt-6">
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition-all duration-300 hover:bg-emerald hover:shadow-xl hover:shadow-emerald/20"
            >
              Pedir informações
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
