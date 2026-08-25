import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/site/reveal";
import { buttonVariants } from "@/components/ui/button";
import { values } from "@/lib/content";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function AboutPreview() {
  return (
    <section className="bg-dots border-y border-border/60 bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="overflow-hidden rounded-4xl border border-border/70 shadow-xl shadow-primary/10">
            <Image
              src={images.pasteleiro}
              alt={`${siteConfig.founder}, mestre pasteleiro da ${siteConfig.name}, a decorar um bolo`}
              sizes="(max-width: 1024px) 100vw, 480px"
              className="h-auto w-full object-cover"
            />
          </div>
          <figure className="absolute -right-3 -bottom-6 max-w-56 rounded-2xl border border-border/70 bg-card px-5 py-4 shadow-lg sm:-right-6">
            <blockquote className="font-heading text-sm leading-snug text-pretty">
              “Um bolo bom começa muito antes do forno.”
            </blockquote>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              {siteConfig.founder}, mestre pasteleiro
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-sm font-semibold tracking-[0.18em] uppercase text-primary">
            A nossa história
          </p>
          <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance sm:text-4xl">
            Quinze anos de forno aceso e balcão cheio
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            A {siteConfig.name} nasceu em {siteConfig.founded}, quando o{" "}
            {siteConfig.founder} trocou a cozinha de um hotel pelos cadernos de
            receitas da família. Hoje somos a pastelaria do bairro — a das
            manhãs de pastel de nata e a dos bolos que marcam as datas grandes.
          </p>
          <ul className="mt-8 space-y-5">
            {values.map((value) => (
              <li key={value.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-1.5 inline-block size-2.5 shrink-0 rounded-full bg-primary"
                />
                <div>
                  <h3 className="font-heading text-base font-semibold">
                    {value.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/sobre"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "mt-8 h-11 rounded-full px-6"
            )}
          >
            Conhecer a nossa história
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
