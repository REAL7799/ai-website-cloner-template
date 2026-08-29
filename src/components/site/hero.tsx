import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import {
  ButterflyIcon,
  SparkleIcon,
  PetalIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { CONTACT } from "@/lib/site";
import { cn } from "@/lib/utils";

const PETALS = [
  { left: "4%", delay: "0s", duration: "15s", size: "size-4", opacity: 0.55, drift: "3rem", spin: "320deg" },
  { left: "14%", delay: "3.5s", duration: "18s", size: "size-3", opacity: 0.45, drift: "-2rem", spin: "-300deg" },
  { left: "26%", delay: "7s", duration: "14s", size: "size-5", opacity: 0.5, drift: "4rem", spin: "360deg" },
  { left: "38%", delay: "1.5s", duration: "19s", size: "size-3", opacity: 0.4, drift: "-3rem", spin: "-340deg" },
  { left: "52%", delay: "5s", duration: "16s", size: "size-4", opacity: 0.45, drift: "2.5rem", spin: "330deg" },
  { left: "64%", delay: "9s", duration: "15s", size: "size-3", opacity: 0.5, drift: "-2.5rem", spin: "-310deg" },
  { left: "74%", delay: "2.5s", duration: "17s", size: "size-5", opacity: 0.4, drift: "3.5rem", spin: "350deg" },
  { left: "84%", delay: "6.5s", duration: "14s", size: "size-4", opacity: 0.55, drift: "-3rem", spin: "-330deg" },
  { left: "93%", delay: "4s", duration: "18s", size: "size-3", opacity: 0.45, drift: "2rem", spin: "340deg" },
  { left: "46%", delay: "11s", duration: "16s", size: "size-4", opacity: 0.35, drift: "-4rem", spin: "-360deg" },
] as const;

const HERO_CARDS = [
  {
    src: "/images/bouquet-pink-purple.webp",
    alt: "Buquê de rosas eternas rosa e lilás Kitty Flowers",
    label: "Buquê Eterno",
    className: "left-0 top-12 z-10 w-[52%] -rotate-[8deg]",
    floatDelay: "0s",
    floatDuration: "7s",
  },
  {
    src: "/images/bouquet-pink-cream.webp",
    alt: "Buquê de rosas eternas rosa e champanhe Kitty Flowers",
    label: "Mais amado ♥",
    className: "left-1/2 top-0 z-20 w-[56%] -translate-x-1/2 rotate-2",
    floatDelay: "0.8s",
    floatDuration: "6.5s",
  },
  {
    src: "/images/bouquet-red-glitter-butterfly.webp",
    alt: "Rosas vermelhas com glitter e borboleta dourada Kitty Flowers",
    label: "Edição Especial",
    className: "right-0 top-16 z-10 w-[52%] rotate-[10deg]",
    floatDelay: "1.6s",
    floatDuration: "7.5s",
  },
] as const;

export function Hero() {
  return (
    <section id="inicio" className="kf-hero-bg relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {PETALS.map((petal, i) => (
          <PetalIcon
            key={i}
            className={cn(
              "kf-petal absolute -top-8 text-primary/50",
              petal.size
            )}
            style={
              {
                left: petal.left,
                "--petal-delay": petal.delay,
                "--petal-duration": petal.duration,
                "--petal-opacity": petal.opacity,
                "--petal-drift": petal.drift,
                "--petal-spin": petal.spin,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="mx-auto grid min-h-svh max-w-6xl items-center gap-14 px-4 pt-28 pb-16 md:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pt-24 lg:pb-10">
        <div className="max-w-xl lg:max-w-none">
          <span
            className="kf-enter inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/70 px-4 py-1.5 text-xs font-medium tracking-wide text-rose-deep shadow-sm backdrop-blur-sm md:text-sm"
            style={{ "--enter-delay": "0s" } as CSSProperties}
          >
            <SparkleIcon className="size-3.5 text-gold" />
            Feito à mão em Lisboa · Prior Velho
          </span>

          <h1
            className="kf-enter mt-6 font-display text-[2.75rem] leading-[1.08] font-semibold tracking-tight text-balance md:text-6xl lg:text-[4.15rem]"
            style={{ "--enter-delay": "0.12s" } as CSSProperties}
          >
            Rosas eternas para momentos{" "}
            <span className="font-script block pt-3 pb-2 text-6xl leading-none font-normal text-primary md:text-7xl lg:text-[5.25rem]">
              inesquecíveis
            </span>
          </h1>

          <p
            className="kf-enter mt-5 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
            style={{ "--enter-delay": "0.24s" } as CSSProperties}
          >
            Buquês de cetim personalizados, dobrados pétala a pétala. Flores que
            nunca murcham — como as memórias que celebram.
          </p>

          <div
            className="kf-enter mt-8 flex flex-wrap items-center gap-3"
            style={{ "--enter-delay": "0.36s" } as CSSProperties}
          >
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_18px_40px_-12px_oklch(0.62_0.17_3/0.65)] transition-all hover:scale-[1.04] hover:bg-primary/90 md:text-base"
            >
              <WhatsAppIcon className="size-5" />
              Encomendar no WhatsApp
            </a>
            <a
              href="#criacoes"
              className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card/60 px-6 py-3.5 text-sm font-semibold text-rose-deep backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-accent md:text-base"
            >
              Ver criações
              <ArrowRight className="size-4" />
            </a>
          </div>

          <div
            className="kf-enter mt-9 flex items-center gap-4"
            style={{ "--enter-delay": "0.48s" } as CSSProperties}
          >
            <div className="flex -space-x-3">
              {[
                "/images/bouquet-pink-mini.webp",
                "/images/bouquet-blue-pearls.webp",
                "/images/box-ferrero-heart.webp",
              ].map((src) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 rounded-full border-2 border-background object-cover shadow-sm"
                />
              ))}
            </div>
            <p className="text-sm leading-snug text-muted-foreground">
              <span className="font-semibold text-foreground">
                +20 criações únicas
              </span>
              <br />
              100% artesanal · Encomendas por DM
            </p>
          </div>
        </div>

        <div
          className="kf-enter relative mx-auto w-full max-w-105"
          style={{ "--enter-delay": "0.3s" } as CSSProperties}
        >
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -z-10 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl md:size-105"
          />

          <div className="relative h-105 md:h-130">
            {HERO_CARDS.map((card) => (
              <div key={card.src} className={cn("absolute", card.className)}>
                <div
                  className="kf-float rounded-2xl bg-card p-2 pb-3 shadow-[0_30px_70px_-25px_oklch(0.45_0.13_5/0.45)] ring-1 ring-rose-deep/5"
                  style={
                    {
                      "--float-delay": card.floatDelay,
                      "--float-duration": card.floatDuration,
                    } as CSSProperties
                  }
                >
                  <div className="relative aspect-3/4 overflow-hidden rounded-xl">
                    <Image
                      src={card.src}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 768px) 55vw, 240px"
                      loading="eager"
                      fetchPriority="high"
                      className="object-cover"
                    />
                  </div>
                  <p className="pt-2 text-center font-script text-xl leading-none text-rose-deep">
                    {card.label}
                  </p>
                </div>
              </div>
            ))}

            <ButterflyIcon
              aria-hidden="true"
              className="kf-float absolute -top-4 right-6 z-30 size-10 text-gold drop-shadow-[0_6px_12px_oklch(0.78_0.11_85/0.5)] md:size-12"
              style={
                {
                  "--float-delay": "0.4s",
                  "--float-duration": "5s",
                } as CSSProperties
              }
            />
            <ButterflyIcon
              aria-hidden="true"
              className="kf-float absolute bottom-2 -left-2 z-30 size-8 -rotate-12 text-primary/70 md:size-9"
              style={
                {
                  "--float-delay": "1.8s",
                  "--float-duration": "6s",
                } as CSSProperties
              }
            />
            <SparkleIcon
              aria-hidden="true"
              className="kf-sparkle absolute top-10 -left-3 size-5 text-gold"
              style={{ "--sparkle-delay": "0.5s" } as CSSProperties}
            />
            <SparkleIcon
              aria-hidden="true"
              className="kf-sparkle absolute -right-2 bottom-24 size-4 text-primary"
              style={{ "--sparkle-delay": "1.4s" } as CSSProperties}
            />
            <SparkleIcon
              aria-hidden="true"
              className="kf-sparkle absolute top-1/3 right-8 z-30 size-3.5 text-gold"
              style={{ "--sparkle-delay": "2.2s" } as CSSProperties}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
