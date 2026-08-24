import { Clock, ExternalLink, MapPin, Phone } from "lucide-react";
import { WhatsappIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/site-config";

export function Contact() {
  return (
    <section id="contactos" className="bg-secondary/50 py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Contactos"
          title="Marque o seu momento Annelux"
          subtitle="Estamos em Fátima, à distância de uma mensagem."
        />
        <div className="grid items-stretch gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="h-full space-y-8 rounded-3xl border border-border/70 bg-card p-8 md:p-10">
              <div className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent">
                  <Phone className="size-5 text-espresso" aria-hidden />
                </span>
                <div>
                  <p className="text-xs tracking-[0.25em] text-muted-foreground uppercase">
                    Telefone &amp; WhatsApp
                  </p>
                  <a
                    href={siteConfig.phoneHref}
                    className="font-heading text-2xl transition-colors hover:text-gold-text"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent">
                  <MapPin className="size-5 text-espresso" aria-hidden />
                </span>
                <div>
                  <p className="text-xs tracking-[0.25em] text-muted-foreground uppercase">
                    Localização
                  </p>
                  <p className="font-medium">
                    {siteConfig.location.city} — {siteConfig.location.region}
                  </p>
                  <a
                    href={siteConfig.location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-gold-text underline-offset-4 hover:underline"
                  >
                    Abrir no Google Maps
                    <ExternalLink className="size-3.5" aria-hidden />
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent">
                  <Clock className="size-5 text-espresso" aria-hidden />
                </span>
                <div className="flex-1">
                  <p className="text-xs tracking-[0.25em] text-muted-foreground uppercase">
                    Horário
                  </p>
                  <dl className="mt-2">
                    {siteConfig.hours.map((row) => (
                      <div
                        key={row.days}
                        className="flex justify-between gap-8 border-b border-border/50 py-1 text-sm last:border-0"
                      >
                        <dt className="text-muted-foreground">{row.days}</dt>
                        <dd className="font-medium">{row.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

            </div>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-2">
            <div className="flex h-full flex-col rounded-3xl bg-espresso p-8 text-espresso-foreground md:p-10">
              <h3 className="font-heading text-3xl leading-tight font-medium md:text-4xl">
                Vamos cuidar de si?
              </h3>
              <p className="mt-4 leading-relaxed text-espresso-foreground/70">
                Envie-nos uma mensagem no WhatsApp e combinamos o horário perfeito para o seu
                ritual de beleza.
              </p>
              <div className="min-h-8 flex-1" aria-hidden />
              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium tracking-wide text-espresso transition-all duration-300 hover:bg-gold-soft hover:shadow-xl hover:shadow-espresso/20"
              >
                <WhatsappIcon className="size-5" />
                Marcar por WhatsApp
              </a>
              <p className="mt-4 text-center text-xs text-espresso-foreground/70">
                Respondemos rapidamente em horário de funcionamento.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
