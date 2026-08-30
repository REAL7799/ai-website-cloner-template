import type { CSSProperties } from "react";
import {
  ButterflyIcon,
  InstagramIcon,
  SparkleIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { Reveal } from "@/components/site/reveal";
import { CONTACT } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="px-4 pb-20 md:px-6 md:pb-28">
      <Reveal className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary via-primary to-rose-deep px-6 py-16 text-center shadow-[0_40px_90px_-35px_oklch(0.45_0.13_5/0.7)] md:rounded-[3rem] md:px-12 md:py-20">
          <div
            aria-hidden="true"
            className="absolute -top-20 -left-16 size-64 rounded-full bg-primary-foreground/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -right-20 -bottom-24 size-72 rounded-full bg-rose-deep/40 blur-3xl"
          />
          <ButterflyIcon
            aria-hidden="true"
            className="kf-float absolute top-8 left-[12%] size-9 text-gold/90 md:size-11"
            style={{ "--float-duration": "5.5s" } as CSSProperties}
          />
          <ButterflyIcon
            aria-hidden="true"
            className="kf-float absolute right-[10%] bottom-10 size-8 text-primary-foreground/50 md:size-10"
            style={
              {
                "--float-delay": "1.4s",
                "--float-duration": "6.5s",
              } as CSSProperties
            }
          />
          <SparkleIcon
            aria-hidden="true"
            className="kf-sparkle absolute top-1/3 right-[18%] size-4 text-gold"
          />
          <SparkleIcon
            aria-hidden="true"
            className="kf-sparkle absolute bottom-1/4 left-[20%] size-3.5 text-primary-foreground/70"
            style={{ "--sparkle-delay": "1.2s" } as CSSProperties}
          />

          <h2 className="relative font-display text-3xl font-semibold tracking-tight text-balance text-primary-foreground md:text-5xl">
            Pronta para eternizar
            <span className="font-script block pt-3 text-[2.75rem] leading-none font-normal text-primary-foreground md:text-[3.75rem]">
              um momento?
            </span>
          </h2>
          <p className="relative mx-auto mt-5 max-w-md text-base leading-relaxed text-primary-foreground md:text-lg">
            Conta-nos a tua ideia — nós fazemos o resto, pétala a pétala.
          </p>

          <div className="relative mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-whatsapp px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.04] hover:bg-whatsapp-dark md:text-base"
            >
              <WhatsAppIcon className="size-5" />
              Falar no WhatsApp
            </a>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-primary-foreground/40 px-7 py-3.5 text-sm font-semibold text-primary-foreground backdrop-blur-sm transition-all hover:border-primary-foreground hover:bg-primary-foreground/10 md:text-base"
            >
              <InstagramIcon className="size-5" />
              Seguir {CONTACT.instagramHandle}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
