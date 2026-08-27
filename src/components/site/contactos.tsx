"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { defaultOrderMessage, site, whatsappLink } from "@/lib/site";
import { Sprinkles } from "@/components/site/sprinkles";
import { DripDivider } from "@/components/site/drip-divider";
import { useSectionReveal } from "@/hooks/use-section-reveal";

export function Contactos() {
  const sectionRef = useSectionReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="contactos"
      aria-label="Contactos e localização"
      className="relative bg-background pb-28"
    >
      <Sprinkles />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div
          data-reveal
          className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-14 text-center text-primary-foreground shadow-2xl shadow-primary/30 sm:px-12"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-10 -top-10 size-44 rounded-full bg-primary-foreground/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-14 -right-8 size-56 rounded-full bg-primary-foreground/10"
          />
          <p className="font-handwriting text-3xl sm:text-4xl">
            vamos fazer magia juntos?
          </p>
          <h2 className="mx-auto mt-3 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
            O bolo dos seus sonhos está a uma mensagem de distância
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-primary-foreground/85 sm:text-base">
            Conte-nos a ocasião, o sabor favorito e o número de fatias — nós
            tratamos do resto.
          </p>
          <Button
            variant="secondary"
            className="mt-8 h-12 rounded-full bg-card px-8 text-base font-semibold text-primary shadow-lg hover:bg-card/90"
            render={
              <a
                href={whatsappLink(defaultOrderMessage)}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <WhatsAppIcon className="size-5" />
            Falar no WhatsApp
          </Button>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <div data-reveal className="rounded-3xl border border-border/70 bg-card p-7 shadow-sm">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
              <MapPin className="size-5" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">Onde estamos</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {site.address.street}
              <br />
              {site.address.city}
            </p>
          </div>

          <div data-reveal className="rounded-3xl border border-border/70 bg-card p-7 shadow-sm">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
              <Clock className="size-5" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">Horário</h3>
            <ul className="mt-2 space-y-1 text-sm leading-relaxed text-muted-foreground">
              {site.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4">
                  <span>{h.days}</span>
                  <span className="font-medium text-foreground/80">
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="rounded-3xl border border-border/70 bg-card p-7 shadow-sm">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
              <Phone className="size-5" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">Fale connosco</h3>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href={`tel:${site.phoneDisplay.replaceAll(" ", "")}`}
                  className="transition-colors hover:text-primary"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 transition-colors hover:text-primary"
                >
                  <Mail className="size-3.5" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3 pt-1">
                <a
                  href={`https://instagram.com/${site.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram da Fátima Cake"
                  className="flex size-9 items-center justify-center rounded-full bg-secondary text-foreground/70 transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <InstagramIcon className="size-4" />
                </a>
                <a
                  href={`https://facebook.com/${site.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook da Fátima Cake"
                  className="flex size-9 items-center justify-center rounded-full bg-secondary text-foreground/70 transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <FacebookIcon className="size-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <DripDivider className="text-background" />
    </section>
  );
}
