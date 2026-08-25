import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";

export function Visit() {
  return (
    <section className="pb-20 sm:pb-28" id="visite-nos">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Visite-nos"
          title="A loja fica no coração do bairro"
          lead="Passe para um café e um pastel de nata acabado de sair — ou para conversar sobre o bolo da sua festa."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="overflow-hidden rounded-4xl border border-border/70 shadow-lg">
            <Image
              src={images.interior}
              alt="Interior da Doce Alma, com a vitrine de doces e o balcão de madeira"
              sizes="(max-width: 1024px) 100vw, 680px"
              className="h-full max-h-[26rem] w-full object-cover"
            />
          </Reveal>
          <Reveal
            delay={120}
            className="flex flex-col justify-center gap-6 rounded-4xl border border-border/70 bg-card p-8"
          >
            <div className="flex gap-3.5">
              <MapPin className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="font-heading font-semibold">Morada</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {siteConfig.address.street}, {siteConfig.address.postalCode}{" "}
                  {siteConfig.address.city}
                </p>
              </div>
            </div>
            <div className="flex gap-3.5">
              <Clock className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="font-heading font-semibold">Horário</h3>
                <ul className="mt-1 space-y-0.5 text-sm leading-relaxed text-muted-foreground">
                  {siteConfig.hours.map((slot) => (
                    <li key={slot.days}>
                      {slot.days}: {slot.time}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex gap-3.5">
              <Phone className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="font-heading font-semibold">Telefone</h3>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {siteConfig.phone}
                </a>
              </div>
            </div>
            <div className="flex gap-3.5">
              <Mail className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="font-heading font-semibold">E-mail</h3>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
