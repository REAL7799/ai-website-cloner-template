import Image from "next/image";
import type { CSSProperties } from "react";
import { ButterflyIcon, SparkleIcon } from "@/components/icons";
import { Reveal } from "@/components/site/reveal";

const STATS = [
  { value: "100%", label: "feito à mão" },
  { value: "+20", label: "criações únicas" },
  { value: "∞", label: "duram para sempre" },
] as const;

export function About() {
  return (
    <section id="sobre" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 md:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal className="relative mx-auto w-fit">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 scale-125 rounded-full bg-accent/80 blur-2xl"
          />
          <div className="rounded-full border border-primary/15 bg-card p-3 shadow-[0_30px_70px_-30px_oklch(0.45_0.13_5/0.4)] md:p-4">
            <Image
              src="/images/logo-kitty-flowers.png"
              alt="Logo Kitty Flowers — delicadeza em forma de flores"
              width={320}
              height={320}
              className="size-56 rounded-full md:size-72"
            />
          </div>
          <ButterflyIcon
            aria-hidden="true"
            className="kf-float absolute -top-2 -right-3 size-10 text-gold drop-shadow-md md:size-12"
            style={{ "--float-duration": "5.5s" } as CSSProperties}
          />
          <SparkleIcon
            aria-hidden="true"
            className="kf-sparkle absolute -bottom-1 -left-4 size-5 text-primary"
          />
        </Reveal>

        <div>
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.22em] text-primary uppercase md:text-sm">
              Sobre nós
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-[2.6rem] md:leading-[1.15]">
              Delicadeza em forma{" "}
              <span className="font-script block pt-2 text-[2.6rem] leading-none font-normal text-primary md:text-[3.4rem]">
                de flores
              </span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground md:text-lg">
              Cada criação Kitty Flowers nasce em Lisboa, das mãos da Larissa.
              Rosas de cetim dobradas uma a uma, laços escolhidos ao detalhe e
              borboletas douradas que dão vida a buquês pensados para durar —
              tal como os momentos que celebram.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground md:text-lg">
              Do mini buquê ao coração recheado de chocolates, tudo é
              personalizado contigo, com amor em cada pétala.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <dl className="mt-8 grid grid-cols-3 gap-4 md:max-w-lg">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-primary/10 bg-card px-3 py-4 text-center shadow-sm"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-2xl font-semibold text-primary md:text-3xl">
                    {stat.value}
                  </dd>
                  <dd className="mt-1 text-xs text-muted-foreground md:text-sm">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
