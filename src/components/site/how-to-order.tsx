import { HeartHandshake, MessageCircleHeart, PackageCheck } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SectionHeader } from "@/components/site/section-header";
import { WhatsAppIcon } from "@/components/icons";
import { CONTACT, STEPS } from "@/lib/site";

const STEP_ICONS = [HeartHandshake, MessageCircleHeart, PackageCheck] as const;

export function HowToOrder() {
  return (
    <section id="como-encomendar" className="scroll-mt-20 bg-blush py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeader
          eyebrow="Como encomendar"
          title="Simples como enviar"
          scriptWord="uma mensagem"
          description="Sem lojas, sem complicações — a tua encomenda começa numa conversa."
        />

        <div className="relative mt-12 md:mt-16">
          <div
            aria-hidden="true"
            className="absolute top-9 right-[16%] left-[16%] hidden border-t-2 border-dashed border-primary/25 md:block"
          />
          <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
            {STEPS.map((step, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <li key={step.title} className="relative">
                  <Reveal
                    delay={i * 140}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="relative z-10 flex size-[4.5rem] items-center justify-center rounded-full border border-primary/15 bg-card shadow-[0_15px_35px_-15px_oklch(0.62_0.17_3/0.5)]">
                      <Icon className="size-8 text-primary" strokeWidth={1.6} />
                      <span className="absolute -top-1.5 -right-1.5 flex size-7 items-center justify-center rounded-full bg-primary font-display text-sm font-semibold text-primary-foreground">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold tracking-tight md:text-[1.35rem]">
                      {step.title}
                    </h3>
                    <p className="mx-auto mt-2.5 max-w-xs text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">
                      {step.description}
                    </p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>

        <Reveal delay={200} className="mt-12 text-center md:mt-14">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-whatsapp px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_-12px_oklch(0.55_0.15_150/0.6)] transition-all hover:scale-[1.04] hover:bg-whatsapp-dark md:text-base"
          >
            <WhatsAppIcon className="size-5" />
            Começar a minha encomenda
          </a>
        </Reveal>
      </div>
    </section>
  );
}
